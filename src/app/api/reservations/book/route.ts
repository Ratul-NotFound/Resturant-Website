import { NextRequest, NextResponse } from 'next/server';
import { ReservationRepository } from '@/lib/server/repositories/ReservationRepository';
import { ServerSanitizer } from '@/lib/security/ServerSanitizer';
import { RateLimiter } from '@/lib/server/rateLimiter';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const rate = RateLimiter.check(ip, 'reservations_book');
  if (!rate.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many booking attempts. Please wait before reserving again.',
      },
      { status: 429, headers: { 'Retry-After': String(rate.resetInSeconds) } }
    );
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Malformed JSON payload' }, { status: 400 });
  }

  const validation = ServerSanitizer.validateReservationPayload(body);
  if (!validation.valid || !validation.data) {
    return NextResponse.json(
      {
        success: false,
        error: 'Validation failed',
        details: validation.errors,
      },
      { status: 400 }
    );
  }

  const data = validation.data;
  const year = new Date().getFullYear();
  const randNum = Math.floor(1000 + Math.random() * 9000);
  const bookingReference = `AURA-${year}-${randNum}`;

  const qrData = Buffer.from(
    JSON.stringify({
      ref: bookingReference,
      guest: data.guestName,
      date: data.date,
      time: data.timeSlot,
      area: data.seatingArea,
      party: data.partySize,
    })
  ).toString('base64');

  try {
    const booking = ReservationRepository.createBooking({
      ...data,
      bookingReference,
      qrData,
    });

    return NextResponse.json(
      {
        success: true,
        booking,
        message: 'Your table at AURA has been reserved.',
      },
      { status: 201 }
    );
  } catch (err: any) {
    if (err.message === 'SLOT_FULL') {
      const alternatives = ReservationRepository.getAvailableSlots(data.date, data.partySize, data.seatingArea)
        .filter((s) => s.status !== 'WAITLIST')
        .slice(0, 3);

      return NextResponse.json(
        {
          success: false,
          error: 'The requested time slot is fully committed.',
          alternativeSlots: alternatives,
        },
        { status: 409 }
      );
    }

    console.error('[BOOKING ERROR]', err);
    return NextResponse.json(
      {
        success: false,
        error: 'We were unable to process your reservation. Please contact our concierge.',
      },
      { status: 500 }
    );
  }
}
