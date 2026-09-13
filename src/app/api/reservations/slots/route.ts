import { NextRequest, NextResponse } from 'next/server';
import { ReservationRepository } from '@/lib/server/repositories/ReservationRepository';
import { ServerSanitizer } from '@/lib/security/ServerSanitizer';
import { RateLimiter } from '@/lib/server/rateLimiter';

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const rate = RateLimiter.check(ip, 'slots_api');
  if (!rate.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please slow down.' },
      { status: 429, headers: { 'Retry-After': String(rate.resetInSeconds) } }
    );
  }

  const { searchParams } = new URL(request.url);
  const rawDate = searchParams.get('date') || '';
  const rawArea = searchParams.get('area') || 'atrium';
  const partySize = parseInt(searchParams.get('partySize') || '2', 10);

  const dateCheck = ServerSanitizer.validateFutureDate(rawDate);
  if (!dateCheck.valid) {
    return NextResponse.json({ success: false, error: dateCheck.error || 'Invalid date' }, { status: 400 });
  }

  if (!ServerSanitizer.validateSeatingArea(rawArea)) {
    return NextResponse.json({ success: false, error: 'Invalid seating area' }, { status: 400 });
  }

  const validPartySize = Math.min(12, Math.max(1, isNaN(partySize) ? 2 : partySize));
  const slots = ReservationRepository.getAvailableSlots(rawDate, validPartySize, rawArea);

  return NextResponse.json({
    success: true,
    date: rawDate,
    area: rawArea,
    partySize: validPartySize,
    slots,
  });
}
