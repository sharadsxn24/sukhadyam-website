import { Injectable } from '@nestjs/common';
import { DabbaMenu } from './entities/dabba-menu.entity';
import { DabbaItem } from './entities/dabba-item.entity';

/**
 * In-memory storage for menus and items
 * In production, this would be replaced with a database (PostgreSQL, MongoDB, etc.)
 */
@Injectable()
export class DabbaMenuService {
  private menus: DabbaMenu[] = [];
  private items: DabbaItem[] = [];

  constructor() {
    // Seed initial data
    this.seedData();
  }

  /**
   * Get today's menu
   * Returns menu for current date
   */
  getTodayMenu(): { menu: DabbaMenu; items: DabbaItem[] } | null {
    const today = this.getTodayDateString();
    const menu = this.menus.find((m) => m.date === today && m.isActive);
    
    if (!menu) {
      return null;
    }

    const menuItems = this.items.filter((item) => item.menuId === menu.id);
    return { menu, items: menuItems };
  }

  /**
   * Get tomorrow's menu (teaser only - no items)
   * Used for /kal-ka-dabba page
   */
  getTomorrowMenu(): DabbaMenu | null {
    const tomorrow = this.getTomorrowDateString();
    return this.menus.find((m) => m.date === tomorrow && m.isActive) || null;
  }

  /**
   * Get menu status
   * Returns whether ordering is currently open
   * Backend is single source of truth for time-based logic
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

    // Ordering window: 11:00 AM - 12:30 PM
    // Convert to 24-hour format for comparison
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
  getMenuByDateAndSlot(date: string, timeSlot: 'LUNCH' | 'SNACKS' | 'DINNER'): { menu: DabbaMenu; items: DabbaItem[] } | null {
    const menu = this.menus.find(
      (m) => m.date === date && m.timeSlot === timeSlot && m.isActive,
    );
    
    if (!menu) {
      return null;
    }

    const menuItems = this.items.filter((item) => item.menuId === menu.id);
    return { menu, items: menuItems };
  }

  /**
   * Seed initial menu data
   * In production, this would be managed by admin or API
   */
  private seedData() {
    const today = this.getTodayDateString();
    const tomorrow = this.getTomorrowDateString();

    // Today's Lunch Menu
    const todayLunchMenu: DabbaMenu = {
      id: 'menu-today-lunch',
      date: today,
      timeSlot: 'LUNCH',
      theme: 'Comfort',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.menus.push(todayLunchMenu);

    // Today's Lunch Items
    this.items.push(
      {
        id: 'item-1',
        menuId: 'menu-today-lunch',
        name: 'Dal Chawal with Sabzi',
        description: 'Homestyle dal, steamed rice, and seasonal vegetable',
        price: 120,
        type: 'COMFORT',
      },
      {
        id: 'item-2',
        menuId: 'menu-today-lunch',
        name: 'Rajma Rice Bowl',
        description: 'Kidney beans curry with rice, pickle, and papad',
        price: 130,
        type: 'BOWL',
      },
      {
        id: 'item-3',
        menuId: 'menu-today-lunch',
        name: 'Light Thali',
        description: 'Roti, dal, sabzi, salad - perfect for light eaters',
        price: 110,
        type: 'LIGHT',
      },
      {
        id: 'item-4',
        menuId: 'menu-today-lunch',
        name: "Chef's Special",
        description: 'Surprise dish - changes daily!',
        price: 150,
        type: 'SURPRISE',
        quantityLimit: 20,
      },
    );

    // Tomorrow's Menu (teaser)
    const tomorrowLunchMenu: DabbaMenu = {
      id: 'menu-tomorrow-lunch',
      date: tomorrow,
      timeSlot: 'LUNCH',
      theme: 'Light & Fresh',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.menus.push(tomorrowLunchMenu);
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

