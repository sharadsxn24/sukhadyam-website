/**
 * Create Order DTO
 * Used for order creation validation
 */

export interface CreateOrderDto {
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

/**
 * Validate order DTO
 * Basic validation without class-validator
 */
export function validateCreateOrderDto(dto: any): dto is CreateOrderDto {
  if (!dto || typeof dto !== 'object') return false;
  
  if (!dto.customerName || typeof dto.customerName !== 'string' || dto.customerName.trim().length === 0) {
    return false;
  }
  
  if (!dto.phone || typeof dto.phone !== 'string' || dto.phone.trim().length === 0) {
    return false;
  }
  
  if (!dto.officeName || typeof dto.officeName !== 'string' || dto.officeName.trim().length === 0) {
    return false;
  }
  
  if (!dto.deliveryLocation || typeof dto.deliveryLocation !== 'string' || dto.deliveryLocation.trim().length === 0) {
    return false;
  }
  
  if (!Array.isArray(dto.items) || dto.items.length === 0 || dto.items.length > 4) {
    return false;
  }
  
  for (const item of dto.items) {
    if (!item.itemId || typeof item.itemId !== 'string') return false;
    if (typeof item.quantity !== 'number' || item.quantity < 1 || item.quantity > 4) return false;
  }
  
  if (!['LUNCH', 'SNACKS', 'DINNER'].includes(dto.timeSlot)) {
    return false;
  }
  
  return true;
}
