/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest, context: { params: Promise<{ unitcode: string; id: string }> }) {
  try {
    const resolvedParams = await context.params;
    const { unitcode, id } = resolvedParams;

    const response = await fetch(`https://admin-hidatha.vercel.app/api/public/${unitcode}/berita/${id}`, { cache: 'no-store' });
    const result = await response.json();

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ status: 0, message: error.message }, { status: 500 });
  }
}