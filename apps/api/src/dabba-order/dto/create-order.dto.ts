import { IsString, IsNotEmpty, IsArray, IsPhoneNumber, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @Min(1)
  @Max(4)
  quantity: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  officeName: string;

  @IsString()
  @IsNotEmpty()
  deliveryLocation: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsString()
  @IsNotEmpty()
  timeSlot: 'LUNCH' | 'SNACKS' | 'DINNER';
}

