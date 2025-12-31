/**
 * D1-based DabbaMenuService
 * Uses Cloudflare D1 database instead of in-memory storage
 */
import { D1Service } from '../database/d1.service';
import { DabbaMenu } from './entities/dabba-menu.entity';
import { DabbaItem } from './entities/dabba-item.entity';

export class DabbaMenuServiceD1 {
  constructor(private d1: D1Service) {}

  /**
   * Get today's menu
   */
  async getTodayMenu(): Promise<{ menu: DabbaMenu; items: DabbaItem[] } | null> {
    const today = this.getTodayDateString();
    
    const menuRow = await this.d1.first<{
      id: string;
      date: string;
      time_slot: string;
      theme: string;
      is_active: number;
      created_at: string;
      updated_at: string;
    }>(
      `SELECT * FROM dabba_menus 
       WHERE date = ? AND is_active = 1 
       LIMIT 1`,
      today
    );

    if (!menuRow) {
      return null;
    }

    const menu: DabbaMenu = {
      id: menuRow.id,
      date: menuRow.date,
      timeSlot: menuRow.time_slot as 'LUNCH' | 'SNACKS' | 'DINNER',
      theme: menuRow.theme,
      isActive: menuRow.is_active === 1,
      createdAt: new Date(menuRow.created_at),
      updatedAt: new Date(menuRow.updated_at),
    };

    const items = await this.d1.all<{
      id: string;
      menu_id: string;
      name: string;
      description: string;
      price: number;
      type: string;
      quantity_limit: number | null;
    }>(
      `SELECT * FROM dabba_items WHERE menu_id = ?`,
      menu.id
    );

    const menuItems: DabbaItem[] = items.map((item) => ({
      id: item.id,
      menuId: item.menu_id,
      name: item.name,
      description: item.description,
      price: item.price,
      type: item.type as 'COMFORT' | 'BOWL' | 'LIGHT' | 'SURPRISE',
      quantityLimit: item.quantity_limit || undefined,
    }));

    return { menu, items: menuItems };
  }

  /**
   * Get tomorrow's menu (teaser only)
   */
  async getTomorrowMenu(): Promise<DabbaMenu | null> {
    const tomorrow = this.getTomorrowDateString();
    
    const menuRow = await this.d1.first<{
      id: string;
      date: string;
      time_slot: string;
      theme: string;
      is_active: number;
      created_at: string;
      updated_at: string;
    }>(
      `SELECT * FROM dabba_menus 
       WHERE date = ? AND is_active = 1 
       LIMIT 1`,
      tomorrow
    );

    if (!menuRow) {
      return null;
    }

    return {
      id: menuRow.id,
      date: menuRow.date,
      timeSlot: menuRow.time_slot as 'LUNCH' | 'SNACKS' | 'DINNER',
      theme: menuRow.theme,
      isActive: menuRow.is_active === 1,
      createdAt: new Date(menuRow.created_at),
      updatedAt: new Date(menuRow.updated_at),
    };
  }

  /**
   * Get menu status (time-based logic)
   */
  getMenuStatus(): {
    isOrderingOpen: boolean;
    currentTime: string;
    orderingClosesAt: string;
    deliveryWindow: string;
  } {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;

    const orderingStartHour = 11;
    const orderingStartMinute = 0;
    const orderingEndHour = 12;
    const orderingEndMinute = 30;

    const isOrderingOpen =
      (currentHour > orderingStartHour || 
       (currentHour === orderingStartHour && currentMinute >= orderingStartMinute)) &&
      (currentHour < orderingEndHour || 
       (currentHour === orderingEndHour && currentMinute <= orderingEndMinute));

    return {
      isOrderingOpen,
      currentTime,
      orderingClosesAt: '12:30',
      deliveryWindow: '1:00 PM - 3:00 PM',
    };
  }

  /**
   * Get menu by date and time slot
   */
  async getMenuByDateAndSlot(
    date: string,
    timeSlot: 'LUNCH' | 'SNACKS' | 'DINNER'
  ): Promise<{ menu: DabbaMenu; items: DabbaItem[] } | null> {
    const menuRow = await this.d1.first<{
      id: string;
      date: string;
      time_slot: string;
      theme: string;
      is_active: number;
      created_at: string;
      updated_at: string;
    }>(
      `SELECT * FROM dabba_menus 
       WHERE date = ? AND time_slot = ? AND is_active = 1 
       LIMIT 1`,
      date,
      timeSlot
    );

    if (!menuRow) {
      return null;
    }

    const menu: DabbaMenu = {
      id: menuRow.id,
      date: menuRow.date,
      timeSlot: menuRow.time_slot as 'LUNCH' | 'SNACKS' | 'DINNER',
      theme: menuRow.theme,
      isActive: menuRow.is_active === 1,
      createdAt: new Date(menuRow.created_at),
      updatedAt: new Date(menuRow.updated_at),
    };

    const items = await this.d1.all<{
      id: string;
      menu_id: string;
      name: string;
      description: string;
      price: number;
      type: string;
      quantity_limit: number | null;
    }>(`SELECT * FROM dabba_items WHERE menu_id = ?`, menu.id);

    const menuItems: DabbaItem[] = items.map((item) => ({
      id: item.id,
      menuId: item.menu_id,
      name: item.name,
      description: item.description,
      price: item.price,
      type: item.type as 'COMFORT' | 'BOWL' | 'LIGHT' | 'SURPRISE',
      quantityLimit: item.quantity_limit || undefined,
    }));

    return { menu, items: menuItems };
  }

  private getTodayDateString(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  private getTomorrowDateString(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }
}

