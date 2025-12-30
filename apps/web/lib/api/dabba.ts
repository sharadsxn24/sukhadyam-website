/**
 * Dabba API Client
 * Handles all API calls to the backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface DabbaMenu {
  id: string;
  date: string;
  timeSlot: 'LUNCH' | 'SNACKS' | 'DINNER';
  theme: string;
  isActive: boolean;
}

export interface DabbaItem {
  id: string;
  menuId: string;
  name: string;
  description: string;
  price: number;
  type: 'COMFORT' | 'BOWL' | 'LIGHT' | 'SURPRISE';
  quantityLimit?: number;
}

export interface MenuStatus {
  isOrderingOpen: boolean;
  currentTime: string;
  orderingClosesAt: string;
  deliveryWindow: string;
}

export interface TodayMenuResponse {
  success: boolean;
  data?: {
    menu: DabbaMenu;
    items: DabbaItem[];
  };
  message?: string;
}

export interface TomorrowMenuResponse {
  success: boolean;
  data?: {
    theme: string;
    timeSlot: string;
    date: string;
  };
  message?: string;
}

export interface StatusResponse {
  success: boolean;
  data: MenuStatus;
}

export interface CreateOrderRequest {
  customerName: string;
  phone: string;
  officeName: string;
  deliveryLocation: string;
  items: Array<{
    itemId: string;
    quantity: number;
  }>;
  timeSlot: 'LUNCH' | 'SNACKS' | 'DINNER';
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Fetch today's menu
 */
export async function getTodayMenu(): Promise<TodayMenuResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/dabba/today`);
    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch menu. Please try again.',
    };
  }
}

/**
 * Fetch tomorrow's menu (teaser)
 */
export async function getTomorrowMenu(): Promise<TomorrowMenuResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/dabba/tomorrow`);
    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch tomorrow\'s menu.',
    };
  }
}

/**
 * Get ordering status
 */
export async function getMenuStatus(): Promise<StatusResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/dabba/status`);
    return await response.json();
  } catch (error) {
    return {
      success: false,
      data: {
        isOrderingOpen: false,
        currentTime: '00:00',
        orderingClosesAt: '12:30',
        deliveryWindow: '1:00 PM - 3:00 PM',
      },
    };
  }
}

/**
 * Create an order
 */
export async function createOrder(order: CreateOrderRequest): Promise<OrderResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/dabba/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: 'Failed to place order. Please try again.',
    };
  }
}

