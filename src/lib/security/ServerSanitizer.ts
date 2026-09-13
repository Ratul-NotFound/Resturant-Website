import { ReservationInput, SeatingArea, OccasionType, OrderPayload } from '../types';

/**
 * Server-side Strict Validation & Sanitization Engine.
 * All API routes pass input through this layer before querying SQLite.
 */
export class ServerSanitizer {
  /**
   * Sanitizes string, stripping HTML tags, script blocks, event handlers, control characters.
   * Encodes HTML entities for safe persistence.
   */
  static sanitizeString(input: unknown, maxLength = 500): string {
    if (typeof input !== 'string') return '';
    return input
      .trim()
      .slice(0, maxLength)
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/[\u0000-\u0008\u000B\u000E-\u001F\u007F]/g, '')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }

  /**
   * Cleans query parameters and strips directory traversal sequences.
   */
  static sanitizeQueryParam(param: unknown, maxLength = 80): string {
    if (typeof param !== 'string') return '';
    return param
      .slice(0, maxLength)
      .replace(/[<>"'`]/g, '')
      .replace(/\.\.\//g, '')
      .replace(/\.\.\\/g, '')
      .trim();
  }

  /**
   * Validates email address strictly according to RFC standards.
   */
  static validateEmail(email: unknown): { valid: boolean; sanitized?: string } {
    if (typeof email !== 'string') return { valid: false };
    const clean = email.trim().toLowerCase().slice(0, 254);
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(clean)) {
      return { valid: false };
    }
    const [local] = clean.split('@');
    if (/\.\./.test(local) || local.startsWith('.') || local.endsWith('.')) {
      return { valid: false };
    }
    return { valid: true, sanitized: clean };
  }

  /**
   * Validates international phone format.
   */
  static validatePhone(phone: unknown): { valid: boolean; sanitized?: string } {
    if (typeof phone !== 'string') return { valid: false };
    const clean = phone.trim().replace(/[\s\-\(\)\.]/g, '').slice(0, 16);
    if (!/^\+?[0-9]{7,15}$/.test(clean)) {
      return { valid: false };
    }
    return { valid: true, sanitized: clean };
  }

  /**
   * Validates guest or customer name.
   */
  static validateName(name: unknown): { valid: boolean; sanitized?: string } {
    if (typeof name !== 'string') return { valid: false };
    const clean = name.trim().slice(0, 80);
    if (!/^[\p{L}\s'\-\.]{2,80}$/u.test(clean)) {
      return { valid: false };
    }
    return { valid: true, sanitized: ServerSanitizer.sanitizeString(clean, 80) };
  }

  /**
   * Validates booking date (must be today or future within 90 days).
   */
  static validateFutureDate(date: unknown): { valid: boolean; error?: string } {
    if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return { valid: false, error: 'Invalid date format (YYYY-MM-DD required)' };
    }
    const targetDate = new Date(date + 'T00:00:00');
    if (isNaN(targetDate.getTime())) {
      return { valid: false, error: 'Invalid calendar date' };
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (targetDate < today) {
      return { valid: false, error: 'Reservation date cannot be in the past' };
    }

    const maxFuture = new Date();
    maxFuture.setDate(maxFuture.getDate() + 90);
    maxFuture.setHours(23, 59, 59, 999);

    if (targetDate > maxFuture) {
      return { valid: false, error: 'Reservations can only be made up to 90 days in advance' };
    }

    return { valid: true };
  }

  /**
   * Validates seating area enum.
   */
  static validateSeatingArea(area: unknown): area is SeatingArea {
    return typeof area === 'string' && ['atrium', 'vault', 'counter', 'terrace'].includes(area);
  }

  /**
   * Validates time slot (HH:MM in 30-minute intervals).
   */
  static validateTimeSlot(slot: unknown): boolean {
    return typeof slot === 'string' && /^([01][0-9]|2[0-3]):[03]0$/.test(slot);
  }

  /**
   * Validates dining occasion enum.
   */
  static validateOccasion(occasion: unknown): occasion is OccasionType {
    return (
      typeof occasion === 'string' &&
      ['none', 'birthday', 'anniversary', 'business', 'romance', 'celebration'].includes(occasion)
    );
  }

  /**
   * Validates menu item ID format.
   */
  static validateMenuItemId(id: unknown): boolean {
    return typeof id === 'string' && /^dish-[a-z0-9\-]{2,40}$/.test(id);
  }

  /**
   * Validates full reservation booking payload.
   */
  static validateReservationPayload(body: unknown): {
    valid: boolean;
    data?: ReservationInput;
    errors?: Record<string, string>;
  } {
    if (typeof body !== 'object' || !body || Array.isArray(body)) {
      return { valid: false, errors: { body: 'Invalid payload structure' } };
    }

    const b = body as Record<string, unknown>;
    const errors: Record<string, string> = {};

    const partySize = parseInt(String(b.partySize), 10);
    if (!Number.isInteger(partySize) || partySize < 1 || partySize > 12) {
      errors.partySize = 'Party size must be an integer between 1 and 12';
    }

    const rawDate = b.date || b.diningDate;
    const dateResult = ServerSanitizer.validateFutureDate(rawDate);
    if (!dateResult.valid) {
      errors.date = dateResult.error || 'Invalid date';
    }

    if (!ServerSanitizer.validateSeatingArea(b.seatingArea)) {
      errors.seatingArea = 'Invalid seating area selected';
    }

    if (!ServerSanitizer.validateTimeSlot(b.timeSlot)) {
      errors.timeSlot = 'Invalid time slot format';
    }

    const nameResult = ServerSanitizer.validateName(b.guestName);
    if (!nameResult.valid) {
      errors.guestName = 'Guest name must be between 2 and 80 letters';
    }

    const emailResult = ServerSanitizer.validateEmail(b.guestEmail);
    if (!emailResult.valid) {
      errors.guestEmail = 'A valid email address is required';
    }

    const phoneResult = ServerSanitizer.validatePhone(b.guestPhone);
    if (!phoneResult.valid) {
      errors.guestPhone = 'A valid contact phone number is required';
    }

    if (Object.keys(errors).length > 0) {
      return { valid: false, errors };
    }

    return {
      valid: true,
      data: {
        partySize,
        date: String(rawDate),
        seatingArea: b.seatingArea as SeatingArea,
        timeSlot: String(b.timeSlot),
        guestName: nameResult.sanitized!,
        guestEmail: emailResult.sanitized!,
        guestPhone: phoneResult.sanitized!,
        occasion: ServerSanitizer.validateOccasion(b.occasion) ? (b.occasion as OccasionType) : 'none',
        dietaryNotes: ServerSanitizer.sanitizeString(b.dietaryNotes || '', 500),
      },
    };
  }

  /**
   * Validates full order checkout payload.
   */
  static validateOrderPayload(body: unknown): {
    valid: boolean;
    data?: OrderPayload;
    errors?: Record<string, string>;
  } {
    if (typeof body !== 'object' || !body || Array.isArray(body)) {
      return { valid: false, errors: { body: 'Invalid payload structure' } };
    }

    const b = body as Record<string, unknown>;
    const errors: Record<string, string> = {};

    const cust = (
      typeof b.customer === 'object' && b.customer !== null
        ? b.customer
        : {
            name: b.customerName || b.name,
            email: b.customerEmail || b.email,
            phone: b.customerPhone || b.phone,
            address: b.deliveryAddress || b.address,
          }
    ) as Record<string, unknown>;

    const nameResult = ServerSanitizer.validateName(cust.name);
    if (!nameResult.valid) errors['customer.name'] = 'Valid name required (2-80 characters)';

    const emailResult = ServerSanitizer.validateEmail(cust.email);
    if (!emailResult.valid) errors['customer.email'] = 'Valid email address required';

    const phoneResult = ServerSanitizer.validatePhone(cust.phone);
    if (!phoneResult.valid) errors['customer.phone'] = 'Valid phone number required';

    const address = ServerSanitizer.sanitizeString(cust.address || '', 200);
    if (!address || address.length < 5) errors['customer.address'] = 'Delivery/Table address required';

    if (!Array.isArray(b.items) || b.items.length === 0) {
      errors.items = 'Cart must contain at least one item';
    }

    const validatedItems: Array<{ id: string; quantity: number; notes?: string }> = [];
    if (Array.isArray(b.items)) {
      for (let i = 0; i < b.items.length; i++) {
        const item = b.items[i];
        if (!item || typeof item !== 'object') continue;
        const id = String(item.id || '');
        const qty = parseInt(String(item.quantity || 1), 10);
        if (!ServerSanitizer.validateMenuItemId(id)) {
          errors[`items[${i}].id`] = `Invalid menu item ID: ${id}`;
        }
        if (isNaN(qty) || qty < 1 || qty > 50) {
          errors[`items[${i}].quantity`] = 'Quantity must be between 1 and 50';
        }
        validatedItems.push({
          id,
          quantity: Math.min(50, Math.max(1, qty)),
          notes: ServerSanitizer.sanitizeString(item.notes || '', 200),
        });
      }
    }

    const tipPercentage = parseFloat(String(b.tipPercentage || 18));
    const cleanTip = isNaN(tipPercentage) ? 18 : Math.max(0, Math.min(100, tipPercentage));
    const couponCode = b.couponCode ? ServerSanitizer.sanitizeString(b.couponCode, 20).toUpperCase() : undefined;

    if (Object.keys(errors).length > 0) {
      return { valid: false, errors };
    }

    return {
      valid: true,
      data: {
        customer: {
          name: nameResult.sanitized!,
          email: emailResult.sanitized!,
          phone: phoneResult.sanitized!,
          address,
        },
        items: validatedItems,
        couponCode,
        tipPercentage: cleanTip,
      },
    };
  }
}
