import { NextRequest, NextResponse } from 'next/server';
import { NewsletterRepository } from '@/lib/server/repositories/NewsletterRepository';
import { ServerSanitizer } from '@/lib/security/ServerSanitizer';
import { RateLimiter } from '@/lib/server/rateLimiter';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const rate = RateLimiter.check(ip, 'newsletter_subscribe');
  if (!rate.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many subscription requests. Please try again later.',
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

  // Honeypot check for bots
  if (body.website_hp && String(body.website_hp).trim().length > 0) {
    // Silently return success to deceive spam bot
    return NextResponse.json({ success: true, message: 'Subscribed successfully.' });
  }

  const emailCheck = ServerSanitizer.validateEmail(body.email);
  if (!emailCheck.valid || !emailCheck.sanitized) {
    return NextResponse.json(
      {
        success: false,
        error: 'Please enter a valid email address.',
      },
      { status: 400 }
    );
  }

  const isDup = NewsletterRepository.isDuplicate(emailCheck.sanitized);
  if (!isDup) {
    NewsletterRepository.subscribe(emailCheck.sanitized);
  }

  // Constant-time response to prevent email enumeration
  return NextResponse.json({
    success: true,
    message: isDup
      ? 'Welcome back! You are already subscribed to the AURA Gastronomy Journal.'
      : 'You have been enrolled in the AURA Gastronomy Journal.',
  });
}
