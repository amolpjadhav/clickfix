import { NextRequest, NextResponse } from 'next/server';
import { getDesignById, updateDesign } from '@/lib/designStore';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const design = getDesignById(id);
  if (!design) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(design);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const updated = updateDesign(id, body);
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}
