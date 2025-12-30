import { Module } from '@nestjs/common';
import { DabbaOrderController } from './dabba-order.controller';
import { DabbaOrderService } from './dabba-order.service';
import { DabbaMenuModule } from '../dabba-menu/dabba-menu.module';

@Module({
  imports: [DabbaMenuModule],
  controllers: [DabbaOrderController],
  providers: [DabbaOrderService],
})
export class DabbaOrderModule {}

