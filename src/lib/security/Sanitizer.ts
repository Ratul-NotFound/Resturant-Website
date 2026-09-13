/**
 * Client-side Sanitizer & Validation Utilities.
 * Used before state changes and UI submissions to protect against basic XSS and bad formatting.
 */
export class Sanitizer {
  /**
   * Sanitizes generic user text strings, stripping HTML tags, scripts, and control characters.
   */
  static cleanText(input: string, maxLength = 500): string {
    if (typeof input !== 'string') return '';
    return input
      .trim()
      .slice(0, maxLength)
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/[\u0000-\u0008\u000B\u000E-\u001F\u007F]/g, '')
      .replace(/[\u200B-\u200D\uFEFF]/g, '');
  }

  /**
   * Validates email format using RFC 5322 regex.
   */
  static validateEmail(email: string): boolean {
    if (typeof email !== 'string') return false;
    const trimmed = email.trim().toLowerCase();
    if (trimmed.length < 5 || trimmed.length > 254) return false;
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed);
  }

  /**
   * Validates international and domestic phone number patterns.
   */
  static validatePhone(phone: string): boolean {
    if (typeof phone !== 'string') return false;
    const cleaned = phone.trim().replace(/[\s\-\(\)\.]/g, '');
    return /^\+?[0-9]{7,15}$/.test(cleaned);
  }

  /**
   * Validates names (letters, spaces, hyphens, and apostrophes only).
   */
  static validateName(name: string): boolean {
    if (typeof name !== 'string') return false;
    const trimmed = name.trim();
    return /^[\p{L}\s'\-\.]{2,80}$/u.test(trimmed);
  }

  /**
   * Normalizes coupon code entries.
   */
  static sanitizeCouponCode(code: string): string {
    if (typeof code !== 'string') return '';
    return code.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 20);
  }
}
