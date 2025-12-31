import { NextRequest, NextResponse } from 'next/server';
import { DabbaMenuServiceD1 } from '@/lib/dabba-menu/dabba-menu.service.d1';
import { D1Service } from '@/lib/database/d1.service';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const db = (process.env as any).DB;
    
    if (!db) {
      return NextResponse.json(
        { success: false, message: 'Database not available' },
        { status: 500 }
      );
    }

    const d1Service = new D1Service(db);
    const menuService = new DabbaMenuServiceD1(d1Service);
    const status = menuService.getMenuStatus();

    return NextResponse.json({ success: true, data: status });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

