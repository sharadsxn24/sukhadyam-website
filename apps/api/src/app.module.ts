import { Module } from '@nestjs/common';
import { DabbaMenuModule } from './dabba-menu/dabba-menu.module';
import { DabbaOrderModule } from './dabba-order/dabba-order.module';

@Module({
  imports: [DabbaMenuModule, DabbaOrderModule],
})
export class AppModule {}

