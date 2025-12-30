import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { DabbaOrderService } from './dabba-order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('dabba/orders')
export class DabbaOrderController {
  constructor(private readonly orderService: DabbaOrderService) {}

  /**
   * POST /dabba/orders
   * Create a new order
   * Backend validates ordering window and menu availability
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await this.orderService.createOrder(createOrderDto);
      return {
        success: true,
        message: 'Order placed successfully! 🎉',
        data: order,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to place order',
      };
    }
  }
}

