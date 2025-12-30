import { Module } from '@nestjs/common';
import { DabbaMenuController } from './dabba-menu.controller';
import { DabbaMenuService } from './dabba-menu.service';

@Module({
  controllers: [DabbaMenuController],
  providers: [DabbaMenuService],
  exports: [DabbaMenuService],
})
export class DabbaMenuModule {}

