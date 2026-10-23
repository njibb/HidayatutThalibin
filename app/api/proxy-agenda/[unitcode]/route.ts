/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from 'next/server';

interface RouteParams {
  params: Promise<{
    unitcode: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteParams) {
  try {
    const resolvedParams = await context.params;
    const unitCode = resolvedParams.unitcode;

    // Proxy mengambil data dari rute publik Admin (port 3000)
    const response = await fetch(`https://admin-hidatha.vercel.app/api/public/${unitCode}/agendas`, {
      cache: 'no-store'
    });
    const result = await response.json();

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ status: 0, message: error.message }, { status: 500 });
  }
}