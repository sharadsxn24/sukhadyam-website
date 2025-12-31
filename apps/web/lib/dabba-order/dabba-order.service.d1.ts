/**
 * D1-based DabbaOrderService
 * Uses Cloudflare D1 database for order storage
 */
import { DabbaOrder } from './entities/dabba-order.entity';
import { D1Service } from '../database/d1.service';
import { DabbaMenuServiceD1 } from '../dabba-menu/dabba-menu.service.d1';
import { CreateOrderDto } from './dto/create-order.dto';

class BadRequestException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestException';
  }
}

export class DabbaOrderServiceD1 {
  constructor(
    private readonly d1: D1Service,
    private readonly menuService: DabbaMenuServiceD1,
  ) {}

  /**
   * Create a new order
   */
  async createOrder(createOrderDto: CreateOrderDto): Promise<DabbaOrder> {
    // Check ordering window
    const status = this.menuService.getMenuStatus();
    if (!status.isOrderingOpen) {
      throw new BadRequestException(
        'Orders closed. Kal ka Dabba 10:30 AM ko milega 👀',
      );
    }

    // Get today's menu
    const todayMenu = await this.menuService.getTodayMenu();
    if (!todayMenu) {
      throw new BadRequestException('No menu available for today');
    }

    if (!todayMenu.menu.isActive) {
      throw new BadRequestException('Menu is currently inactive');
    }

    if (createOrderDto.timeSlot !== todayMenu.menu.timeSlot) {
      throw new BadRequestException(
        `Invalid time slot. Today's menu is for ${todayMenu.menu.timeSlot}`,
      );
    }

    if (createOrderDto.items.length === 0 || createOrderDto.items.length > 4) {
      throw new BadRequestException('Order must have 1-4 items');
    }

    // Validate items and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const orderItem of createOrderDto.items) {
      const menuItem = todayMenu.items.find((item) => item.id === orderItem.itemId);
      
      if (!menuItem) {
        throw new BadRequestException(`Item ${orderItem.itemId} not found in menu`);
      }

      if (menuItem.quantityLimit && orderItem.quantity > menuItem.quantityLimit) {
        throw new BadRequestException(
          `Maximum ${menuItem.quantityLimit} allowed for ${menuItem.name}`,
        );
      }

      const itemTotal = menuItem.price * orderItem.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        itemId: menuItem.id,
        itemName: menuItem.name,
        quantity: orderItem.quantity,
        price: menuItem.price,
      });
    }

    // Create order ID
    const orderId = `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();

    // Insert order
    await this.d1.run(
      `INSERT INTO dabba_orders 
       (id, customer_name, phone, office_name, delivery_location, total_amount, status, menu_date, time_slot, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      orderId,
      createOrderDto.customerName,
      createOrderDto.phone,
      createOrderDto.officeName,
      createOrderDto.deliveryLocation,
      totalAmount,
      'PLACED',
      todayMenu.menu.date,
      createOrderDto.timeSlot,
      now
    );

    // Insert order items
    const itemStatements = orderItems.map((item, index) => {
      const itemId = `order-item-${orderId}-${index}`;
      return this.d1.prepare(
        `INSERT INTO order_items (id, order_id, item_id, item_name, quantity, price)
         VALUES (?, ?, ?, ?, ?, ?)`
      ).bind(itemId, orderId, item.itemId, item.itemName, item.quantity, item.price);
    });

    await this.d1.batch(itemStatements);

    // Return created order
    const orderRow = await this.d1.first<{
      id: string;
      customer_name: string;
      phone: string;
      office_name: string;
      delivery_location: string;
      total_amount: number;
      status: string;
      menu_date: string;
      time_slot: string;
      created_at: string;
    }>(`SELECT * FROM dabba_orders WHERE id = ?`, orderId);

    if (!orderRow) {
      throw new BadRequestException('Failed to create order');
    }

    // Get order items
    const dbOrderItems = await this.d1.all<{
      item_id: string;
      item_name: string;
      quantity: number;
      price: number;
    }>(`SELECT item_id, item_name, quantity, price FROM order_items WHERE order_id = ?`, orderId);

    const order: DabbaOrder = {
      id: orderRow.id,
      customerName: orderRow.customer_name,
      phone: orderRow.phone,
      officeName: orderRow.office_name,
      deliveryLocation: orderRow.delivery_location,
      items: dbOrderItems.map((item) => ({
        itemId: item.item_id,
        itemName: item.item_name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: orderRow.total_amount,
      status: orderRow.status as 'PLACED' | 'CONFIRMED' | 'REJECTED' | 'DELIVERED',
      createdAt: new Date(orderRow.created_at),
      menuDate: orderRow.menu_date,
      timeSlot: orderRow.time_slot as 'LUNCH' | 'SNACKS' | 'DINNER',
    };

    return order;
  }

  /**
   * Get all orders
   */
  async getAllOrders(): Promise<DabbaOrder[]> {
    const orders = await this.d1.all<{
      id: string;
      customer_name: string;
      phone: string;
      office_name: string;
      delivery_location: string;
      total_amount: number;
      status: string;
      menu_date: string;
      time_slot: string;
      created_at: string;
    }>(`SELECT * FROM dabba_orders ORDER BY created_at DESC`);

    const result: DabbaOrder[] = [];

    for (const orderRow of orders) {
      const items = await this.d1.all<{
        item_id: string;
        item_name: string;
        quantity: number;
        price: number;
      }>(`SELECT item_id, item_name, quantity, price FROM order_items WHERE order_id = ?`, orderRow.id);

      result.push({
        id: orderRow.id,
        customerName: orderRow.customer_name,
        phone: orderRow.phone,
        officeName: orderRow.office_name,
        deliveryLocation: orderRow.delivery_location,
        items: items.map((item) => ({
          itemId: item.item_id,
          itemName: item.item_name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: orderRow.total_amount,
        status: orderRow.status as 'PLACED' | 'CONFIRMED' | 'REJECTED' | 'DELIVERED',
        createdAt: new Date(orderRow.created_at),
        menuDate: orderRow.menu_date,
        timeSlot: orderRow.time_slot as 'LUNCH' | 'SNACKS' | 'DINNER',
      });
    }

    return result;
  }
}

