import { db } from './db';

export interface RateLimitRule {
  maxTokens: number;
  windowMs: number;
}

export const RATE_LIMIT_RULES: Record<string, RateLimitRule> = {
  reservations_book: { maxTokens: 5, windowMs: 10 * 60 * 1000 }, // 5 per 10 mins
  cart_checkout: { maxTokens: 3, windowMs: 60 * 1000 }, // 3 per min
  newsletter_subscribe: { maxTokens: 2, windowMs: 60 * 1000 }, // 2 per min
  menu_api: { maxTokens: 60, windowMs: 60 * 1000 }, // 60 per min
  slots_api: { maxTokens: 30, windowMs: 60 * 1000 }, // 30 per min
};

export class RateLimiter {
  /**
   * Checks whether the given IP is within rate limits for a specific endpoint.
   * Utilizes an in-database token bucket with continuous refill.
   */
  static check(
    ip: string,
    endpointKey: string
  ): {
    allowed: boolean;
    remaining: number;
    resetInSeconds: number;
  } {
    const rule = RATE_LIMIT_RULES[endpointKey] || { maxTokens: 30, windowMs: 60 * 1000 };
    const sanitizedIp = ip.replace(/[^0-9a-f.:]/gi, '').slice(0, 45) || '127.0.0.1';
    const now = Date.now();

    const existing = db.rateLimitBuckets.findOne(
      (b: any) => b.ip === sanitizedIp && b.endpoint === endpointKey
    );

    if (!existing) {
      db.rateLimitBuckets.insert({
        ip: sanitizedIp,
        endpoint: endpointKey,
        tokens: rule.maxTokens - 1,
        last_refill: now.toString(),
      });
      return {
        allowed: true,
        remaining: rule.maxTokens - 1,
        resetInSeconds: Math.ceil(rule.windowMs / 1000),
      };
    }

    const lastRefill = parseInt(existing.last_refill, 10);
    const elapsed = Math.max(0, now - lastRefill);
    const refilledTokens = (elapsed / rule.windowMs) * rule.maxTokens;
    const currentTokens = Math.min(rule.maxTokens, existing.tokens + refilledTokens);

    if (currentTokens < 1) {
      db.rateLimitBuckets.update(
        (b: any) => b.ip === sanitizedIp && b.endpoint === endpointKey,
        (b: any) => ({ ...b, tokens: 0, last_refill: now.toString() })
      );
      const remainingTime = Math.max(1, Math.ceil((rule.windowMs - elapsed) / 1000));
      return {
        allowed: false,
        remaining: 0,
        resetInSeconds: remainingTime,
      };
    }

    const newTokens = currentTokens - 1;
    db.rateLimitBuckets.update(
      (b: any) => b.ip === sanitizedIp && b.endpoint === endpointKey,
      (b: any) => ({ ...b, tokens: newTokens, last_refill: now.toString() })
    );

    return {
      allowed: true,
      remaining: Math.floor(newTokens),
      resetInSeconds: Math.ceil(rule.windowMs / 1000),
    };
  }

  /**
   * Cleans expired rate limit buckets.
   */
  static cleanup(): void {
    const cutoff = Date.now() - 24 * 3600 * 1000;
    db.rateLimitBuckets.delete((b: any) => parseInt(b.last_refill, 10) < cutoff);
  }
}
