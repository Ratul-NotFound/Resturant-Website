import { NextRequest, NextResponse } from 'next/server';
import { ServerSanitizer } from '@/lib/security/ServerSanitizer';
import { RateLimiter } from '@/lib/server/rateLimiter';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const rate = RateLimiter.check(ip, 'contact_inquiry');
  if (!rate.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many inquiries sent. Please try again in a few moments.',
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

  const { name, email, phone, message } = body;

  const nameCheck = ServerSanitizer.validateName(name);
  if (!nameCheck.valid) {
    return NextResponse.json(
      { success: false, error: 'Please provide a valid full name (2–80 letters).' },
      { status: 400 }
    );
  }

  const emailCheck = ServerSanitizer.validateEmail(email);
  if (!emailCheck.valid) {
    return NextResponse.json(
      { success: false, error: 'Please provide a valid email address.' },
      { status: 400 }
    );
  }

  const phoneCheck = ServerSanitizer.validatePhone(phone);
  if (!phoneCheck.valid) {
    return NextResponse.json(
      { success: false, error: 'Please provide a valid contact phone number.' },
      { status: 400 }
    );
  }

  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    return NextResponse.json(
      { success: false, error: 'Please include your inquiry message (at least 5 characters).' },
      { status: 400 }
    );
  }

  const inquiryId = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;

  return NextResponse.json({
    success: true,
    message: "Thank you for reaching out. We'll contact you shortly regarding your inquiry.",
    inquiryId,
  });
}
