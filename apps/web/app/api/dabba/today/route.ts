import { NextRequest, NextResponse } from 'next/server';
import { DabbaMenuServiceD1 } from '@/lib/dabba-menu/dabba-menu.service.d1';
import { D1Service } from '@/lib/database/d1.service';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    // Get D1 database from Cloudflare environment
    // In Cloudflare Pages with Next.js, D1 is available via process.env.DB
    const db = (process.env as any).DB;
    
    if (!db) {
      return NextResponse.json(
        { success: false, message: 'Database not available' },
        { status: 500 }
      );
    }

    const d1Service = new D1Service(db);
    const menuService = new DabbaMenuServiceD1(d1Service);
    const result = await menuService.getTodayMenu();

    if (!result) {
      return NextResponse.json(
        { success: false, message: 'No menu available for today' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

