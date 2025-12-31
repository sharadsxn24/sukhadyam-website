import { NextRequest, NextResponse } from 'next/server';
import { DabbaOrderServiceD1 } from '@/lib/dabba-order/dabba-order.service.d1';
import { DabbaMenuServiceD1 } from '@/lib/dabba-menu/dabba-menu.service.d1';
import { D1Service } from '@/lib/database/d1.service';
import { validateCreateOrderDto } from '@/lib/dabba-order/dto/create-order.dto';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const db = (process.env as any).DB;

    if (!db) {
      return NextResponse.json({ success: false, message: 'Database not available' }, { status: 500 });
    }

    const body = await request.json();

    // Validate request body
    if (!validateCreateOrderDto(body)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid order data. Please check all fields are filled correctly.',
        },
        { status: 400 }
      );
    }

    const d1Service = new D1Service(db);
    const menuService = new DabbaMenuServiceD1(d1Service);
    const orderService = new DabbaOrderServiceD1(d1Service, menuService);

    const order = await orderService.createOrder(body);

    return NextResponse.json(
      {
        success: true,
        message: 'Order placed successfully! 🎉',
        data: order,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to place order',
      },
      { status: 400 }
    );
  }
}
