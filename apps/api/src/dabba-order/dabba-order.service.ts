import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { DabbaOrder } from './entities/dabba-order.entity';
import { DabbaMenuService } from '../dabba-menu/dabba-menu.service';

/**
 * Order Service
 * Handles order creation with strict validation based on backend time
 */
@Injectable()
export class DabbaOrderService {
  private orders: DabbaOrder[] = [];

  constructor(private readonly menuService: DabbaMenuService) {}

  /**
   * Create a new order
   * Validates:
   * 1. Ordering window is open (11 AM - 12:30 PM)
   * 2. Menu is active
   * 3. Items exist and are valid
   * 4. Max 4 items per order
   */
  async createOrder(createOrderDto: CreateOrderDto): Promise<DabbaOrder> {
    // Check ordering window - BACKEND IS SINGLE SOURCE OF TRUTH
    const status = this.menuService.getMenuStatus();
    if (!status.isOrderingOpen) {
      throw new BadRequestException(
        'Orders closed. Kal ka Dabba 10:30 AM ko milega 👀',
      );
    }

    // Get today's menu
    const todayMenu = this.menuService.getTodayMenu();
    if (!todayMenu) {
      throw new BadRequestException('No menu available for today');
    }

    // Validate menu is active
    if (!todayMenu.menu.isActive) {
      throw new BadRequestException('Menu is currently inactive');
    }

    // Validate time slot matches
    if (createOrderDto.timeSlot !== todayMenu.menu.timeSlot) {
      throw new BadRequestException(
        `Invalid time slot. Today's menu is for ${todayMenu.menu.timeSlot}`,
      );
    }

    // Validate max 4 items
    if (createOrderDto.items.length === 0 || createOrderDto.items.length > 4) {
      throw new BadRequestException('Order must have 1-4 items');
    }

    // Validate items exist and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const orderItem of createOrderDto.items) {
      const menuItem = todayMenu.items.find((item) => item.id === orderItem.itemId);
      
      if (!menuItem) {
        throw new BadRequestException(`Item ${orderItem.itemId} not found in menu`);
      }

      // Check quantity limit if exists
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

    // Create order
    const order: DabbaOrder = {
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      customerName: createOrderDto.customerName,
      phone: createOrderDto.phone,
      officeName: createOrderDto.officeName,
      deliveryLocation: createOrderDto.deliveryLocation,
      items: orderItems,
      totalAmount,
      status: 'PLACED',
      createdAt: new Date(),
      menuDate: todayMenu.menu.date,
      timeSlot: createOrderDto.timeSlot,
    };

    this.orders.push(order);
    return order;
  }

  /**
   * Get all orders (for admin use later)
   */
  getAllOrders(): DabbaOrder[] {
    return this.orders;
  }
}

