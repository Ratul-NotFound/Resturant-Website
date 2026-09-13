import { NextRequest, NextResponse } from 'next/server';
import { MenuRepository } from '@/lib/server/repositories/MenuRepository';
import { ServerSanitizer } from '@/lib/security/ServerSanitizer';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!ServerSanitizer.validateMenuItemId(id)) {
    return NextResponse.json({ success: false, error: 'Invalid dish identifier' }, { status: 400 });
  }

  const item = MenuRepository.getById(id);
  if (!item) {
    return NextResponse.json({ success: false, error: 'Menu item not found' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    item,
  });
}
