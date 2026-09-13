import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/server/db';
import { ServerSanitizer } from '@/lib/security/ServerSanitizer';
import { RateLimiter } from '@/lib/server/rateLimiter';

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const rate = RateLimiter.check(ip, 'slots_api');
  if (!rate.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many lookup requests. Please slow down.' },
      { status: 429, headers: { 'Retry-After': String(rate.resetInSeconds) } }
    );
  }

  const { searchParams } = new URL(request.url);
  const ref = ServerSanitizer.sanitizeQueryParam(searchParams.get('ref') || '', 40).toUpperCase();
  const email = ServerSanitizer.sanitizeQueryParam(searchParams.get('email') || '', 254).toLowerCase();

  if (!ref && !email) {
    return NextResponse.json(
      { success: false, error: 'Booking reference or email is required.' },
      { status: 400 }
    );
  }

  const booking = db.reservations.findOne((r: any) => {
    if (ref && r.bookingReference === ref) return true;
    if (email && r.guestEmail === email) return true;
    return false;
  });

  if (!booking) {
    return NextResponse.json(
      { success: false, error: 'No reservation found matching the provided reference.' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    booking,
  });
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const rate = RateLimiter.check(ip, 'slots_api');
  if (!rate.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many lookup requests. Please slow down.' },
      { status: 429, headers: { 'Retry-After': String(rate.resetInSeconds) } }
    );
  }

  let body: any = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const ref = ServerSanitizer.sanitizeQueryParam(body.ref || body.reference || '', 40).toUpperCase();
  const email = ServerSanitizer.sanitizeQueryParam(body.email || '', 254).toLowerCase();

  if (!ref && !email) {
    return NextResponse.json(
      { success: false, error: 'Booking reference or email is required.' },
      { status: 400 }
    );
  }

  const booking = db.reservations.findOne((r: any) => {
    if (ref && r.bookingReference === ref) return true;
    if (email && r.guestEmail === email) return true;
    return false;
  });

  if (!booking) {
    return NextResponse.json(
      { success: false, error: 'No reservation found matching the provided reference.' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    booking,
  });
}
