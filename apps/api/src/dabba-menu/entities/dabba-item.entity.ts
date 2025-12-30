/**
 * DabbaItem Entity
 * Represents a food item in a menu
 */
export class DabbaItem {
  id: string;
  menuId: string;
  name: string;
  description: string;
  price: number;
  type: 'COMFORT' | 'BOWL' | 'LIGHT' | 'SURPRISE';
  quantityLimit?: number; // Optional limit on how many can be ordered
}

