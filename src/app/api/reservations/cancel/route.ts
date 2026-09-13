import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/server/db';
import { ServerSanitizer } from '@/lib/security/ServerSanitizer';
import { RateLimiter } from '@/lib/server/rateLimiter';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const rate = RateLimiter.check(ip, 'reservations_book');
  if (!rate.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please wait a moment.' },
      { status: 429, headers: { 'Retry-After': String(rate.resetInSeconds) } }
    );
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Malformed JSON payload' }, { status: 400 });
  }

  const ref = ServerSanitizer.sanitizeQueryParam(body.bookingReference || '', 40).toUpperCase();
  const email = ServerSanitizer.sanitizeQueryParam(body.guestEmail || '', 254).toLowerCase();

  if (!ref || !email) {
    return NextResponse.json(
      { success: false, error: 'Booking reference and guest email are required for cancellation.' },
      { status: 400 }
    );
  }

  const existing = db.reservations.findOne(
    (r: any) => r.bookingReference === ref && r.guestEmail === email
  );

  if (!existing) {
    return NextResponse.json(
      { success: false, error: 'No matching active reservation found with these credentials.' },
      { status: 404 }
    );
  }

  if (existing.status === 'CANCELLED') {
    return NextResponse.json(
      { success: false, error: 'This reservation has already been cancelled.' },
      { status: 400 }
    );
  }

  // Atomically update status to CANCELLED
  db.reservations.update(
    (r: any) => r.bookingReference === ref,
    (r: any) => ({
      ...r,
      status: 'CANCELLED',
      updatedAt: new Date().toISOString(),
    })
  );

  return NextResponse.json({
    success: true,
    message: `Reservation #${ref} has been cancelled successfully. Your table allocation has been released.`,
  });
}
