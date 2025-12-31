/**
 * DabbaMenu Entity
 * Represents a daily menu for a specific time slot (LUNCH, SNACKS, DINNER)
 */
export class DabbaMenu {
  id: string;
  date: string; // YYYY-MM-DD format
  timeSlot: 'LUNCH' | 'SNACKS' | 'DINNER';
  theme: string; // e.g., "Comfort", "Light", "Chef's Choice"
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

