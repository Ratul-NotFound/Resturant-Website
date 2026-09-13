import { NextRequest, NextResponse } from 'next/server';
import { ServerSanitizer } from '@/lib/security/ServerSanitizer';
import { RateLimiter } from '@/lib/server/rateLimiter';
import { db } from '@/lib/server/db';

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

  const nameResult = ServerSanitizer.validateName(body.name || body.contactName);
  const emailResult = ServerSanitizer.validateEmail(body.email || body.contactEmail);
  const phoneResult = ServerSanitizer.validatePhone(body.phone || body.contactPhone);

  if (!nameResult.valid || !emailResult.valid || !phoneResult.valid) {
    return NextResponse.json(
      { success: false, error: 'Please check your name, email, and phone format.' },
      { status: 400 }
    );
  }

  const date = ServerSanitizer.sanitizeQueryParam(body.preferredDate || body.date || '', 20);
  const partySize = parseInt(String(body.partySize || body.guestCount || 10), 10);
  const salon = ServerSanitizer.sanitizeQueryParam(body.salonPreference || body.salon || 'vault', 40);
  const budget = ServerSanitizer.sanitizeQueryParam(body.estimatedBudget || body.budget || '', 50);
  const message = ServerSanitizer.sanitizeString(body.message || body.specialRequests || '', 500);

  const inquiryId = `EVT-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Save inquiry to orders / inquiries
  const inquiryRecord = {
    id: inquiryId,
    name: nameResult.sanitized,
    email: emailResult.sanitized,
    phone: phoneResult.sanitized,
    date,
    partySize,
    salon,
    budget,
    message,
    status: 'RECEIVED',
    createdAt: new Date().toISOString(),
  };

  try {
    // Stored in orders table for unified record-keeping
    db.orders.insert({
      id: inquiryId,
      customer_name: nameResult.sanitized,
      customer_email: emailResult.sanitized,
      customer_phone: phoneResult.sanitized,
      delivery_address: `PRIVATE EVENT: ${salon} (Party of ${partySize})`,
      items_json: JSON.stringify(inquiryRecord),
      coupon_code: null,
      tip_percentage: 0,
      subtotal: 0,
      discount: 0,
      tax: 0,
      tip_amount: 0,
      grand_total: 0,
      status: 'INQUIRY_RECEIVED',
      estimated_prep: 0,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      inquiryId,
      message: 'Your private dining inquiry has been delivered to our Head Concierge & Sommelier team.',
    });
  } catch (err) {
    console.error('[EVENT INQUIRY ERROR]', err);
    return NextResponse.json(
      { success: false, error: 'Unable to submit event inquiry. Please contact us directly.' },
      { status: 500 }
    );
  }
}
