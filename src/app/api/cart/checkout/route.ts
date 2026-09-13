import { NextRequest, NextResponse } from 'next/server';
import { OrderRepository } from '@/lib/server/repositories/OrderRepository';
import { ServerSanitizer } from '@/lib/security/ServerSanitizer';
import { RateLimiter } from '@/lib/server/rateLimiter';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const rate = RateLimiter.check(ip, 'cart_checkout');
  if (!rate.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many checkout attempts. Please wait a moment.',
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

  const validation = ServerSanitizer.validateOrderPayload(body);
  if (!validation.valid || !validation.data) {
    return NextResponse.json(
      {
        success: false,
        error: 'Order validation failed',
        details: validation.errors,
      },
      { status: 400 }
    );
  }

  try {
    const result = OrderRepository.createOrder(validation.data);

    return NextResponse.json(
      {
        success: true,
        orderId: result.orderId,
        calculation: result.calculation,
        message: 'Your culinary order has been accepted and is being prepared.',
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('[CHECKOUT ERROR]', err);
    return NextResponse.json(
      {
        success: false,
        error: 'Unable to process checkout. Please try again.',
      },
      { status: 500 }
    );
  }
}
