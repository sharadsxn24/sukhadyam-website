/**
 * DabbaOrder Entity
 * Represents a customer order
 */
export class DabbaOrder {
  id: string;
  customerName: string;
  phone: string;
  officeName: string;
  deliveryLocation: string;
  items: Array<{
    itemId: string;
    itemName: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'PLACED' | 'CONFIRMED' | 'REJECTED' | 'DELIVERED';
  createdAt: Date;
  menuDate: string; // YYYY-MM-DD
  timeSlot: 'LUNCH' | 'SNACKS' | 'DINNER';
}

