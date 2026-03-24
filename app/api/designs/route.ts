import { NextRequest, NextResponse } from 'next/server';
import { getDesigns, createDesign } from '@/lib/designStore';

export async function GET() {
  const designs = getDesigns();
  return NextResponse.json(designs);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const design = createDesign(body);
  return NextResponse.json(design, { status: 201 });
}
