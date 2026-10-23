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

    // Memanggil API publik dari Admin CMS (Port 3000)
    // Pastikan folder di admin bernama 'structure' (pakai c)
    const response = await fetch(`https://admin-hidatha.vercel.app/api/public/${unitCode}/structure`, {
      cache: 'no-store'
    });
    const result = await response.json();

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ status: 0, message: error.message }, { status: 500 });
  }
}