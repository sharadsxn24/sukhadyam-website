import { Controller, Get } from '@nestjs/common';
import { DabbaMenuService } from './dabba-menu.service';

@Controller('dabba')
export class DabbaMenuController {
  constructor(private readonly menuService: DabbaMenuService) {}

  /**
   * GET /dabba/today
   * Returns today's menu with all items
   */
  @Get('today')
  getToday() {
    const result = this.menuService.getTodayMenu();
    if (!result) {
      return {
        success: false,
        message: 'No menu available for today',
      };
    }
    return {
      success: true,
      data: result,
    };
  }

  /**
   * GET /dabba/tomorrow
   * Returns tomorrow's menu (teaser only - no items)
   */
  @Get('tomorrow')
  getTomorrow() {
    const menu = this.menuService.getTomorrowMenu();
    if (!menu) {
      return {
        success: false,
        message: 'No menu available for tomorrow',
      };
    }
    // Return only theme, no items
    return {
      success: true,
      data: {
        theme: menu.theme,
        timeSlot: menu.timeSlot,
        date: menu.date,
      },
    };
  }

  /**
   * GET /dabba/status
   * Returns ordering window status
   * Backend is single source of truth for time
   */
  @Get('status')
  getStatus() {
    return {
      success: true,
      data: this.menuService.getMenuStatus(),
    };
  }
}

