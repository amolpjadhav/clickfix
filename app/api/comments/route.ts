import { NextRequest, NextResponse } from 'next/server';
import { getComments, createComment } from '@/lib/designStore';

export async function GET(req: NextRequest) {
  const designId = req.nextUrl.searchParams.get('designId');
  if (!designId) return NextResponse.json({ error: 'designId required' }, { status: 400 });
  return NextResponse.json(getComments(designId));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.designId || !body.content) {
    return NextResponse.json({ error: 'designId and content required' }, { status: 400 });
  }
  const comment = createComment(body);
  return NextResponse.json(comment, { status: 201 });
}
