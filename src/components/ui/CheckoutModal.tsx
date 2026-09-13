'use client';

import React, { useState } from 'react';
import { CartItem, OrderCalculation, CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatting';
import { PROMO_COUPONS } from '@/data/restaurantConfig';
import { X, CheckCircle2, ShieldCheck, Tag, Sparkles, CreditCard, ArrowRight, Loader2 } from 'lucide-react';
import { fireCelebrationConfetti } from '@/lib/utils/confetti';
import { useToast } from './Toast';
import { Sanitizer } from '@/lib/security/Sanitizer';

interface CheckoutModalProps {
  isOpen: boolean;
  items: CartItem[];
  subtotal: number;
  currency?: CurrencyCode;
  onClose: () => void;
  onOrderSuccess: (orderId: string, calc: OrderCalculation) => void;
}

export function CheckoutModal({
  isOpen,
  items,
  subtotal,
  currency = 'USD',
  onClose,
  onOrderSuccess,
}: CheckoutModalProps) {
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [tipPercent, setTipPercent] = useState(18);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Real-time calculation preview
  const discountAmount = (subtotal * discountPercent) / 100;
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const tax = discountedSubtotal * 0.08875; // 8.875% NYC tax
  const tip = (discountedSubtotal * tipPercent) / 100;
  const grandTotal = discountedSubtotal + tax + tip;

  const handleApplyCoupon = () => {
    const clean = Sanitizer.sanitizeCouponCode(couponInput);
    if (!clean) return;

    if (PROMO_COUPONS[clean]) {
      setAppliedCoupon(clean);
      setDiscountPercent(PROMO_COUPONS[clean].discountPercent);
      showToast(
        `Coupon ${clean} applied (${PROMO_COUPONS[clean].discountPercent}% courtesy)!`,
        'success',
        'Promotion Active'
      );
    } else {
      showToast('Invalid or expired promotional code. Try AURA20, VIP10, or CHEFVIP', 'error', 'Invalid Coupon');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountPercent(0);
    setCouponInput('');
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!Sanitizer.validateName(name)) {
      showToast('Please enter a valid full name (2–80 letters).', 'error', 'Validation');
      return;
    }
    if (!Sanitizer.validateEmail(email)) {
      showToast('Please enter a valid email address.', 'error', 'Validation');
      return;
    }
    if (!Sanitizer.validatePhone(phone)) {
      showToast('Please enter a valid phone number.', 'error', 'Validation');
      return;
    }
    if (address.trim().length < 5) {
      showToast('Please provide your delivery or table destination address.', 'error', 'Validation');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/cart/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            name: Sanitizer.cleanText(name, 80),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            address: Sanitizer.cleanText(address, 200),
          },
          items: items.map((i) => ({
            id: i.item.id,
            quantity: i.quantity,
            notes: i.notes || '',
          })),
          couponCode: appliedCoupon || undefined,
          tipPercentage: tipPercent,
          currency,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        fireCelebrationConfetti();
        showToast('Your culinary order has been accepted!', 'success', 'Order Confirmed');
        onOrderSuccess(data.orderId, data.calculation);
        onClose();
      } else {
        showToast(data.error || 'Checkout failed. Please try again.', 'error', 'Checkout Error');
      }
    } catch {
      showToast('A network error occurred. Please check connection.', 'error', 'Network Failure');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-2xl my-auto rounded-3xl bg-obsidian-900 border border-gold-primary/30 shadow-2xl p-6 sm:p-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
          aria-label="Close checkout"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold-light font-semibold mb-1">
            <ShieldCheck className="h-4 w-4 text-gold-primary" /> Zero-Trust Verified Checkout ({currency})
          </div>
          <h2 className="font-serif text-2xl font-bold text-champagne">Finalize Culinary Order</h2>
          <p className="text-xs text-neutral-400">
            Authoritative prices re-verified against our Michelin cellar repository.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder} className="space-y-6">
          {/* Customer Details */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Lord Harrington"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-gold-primary"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="concierge@harrington.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={254}
                className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-gold-primary"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+1 (555) 019-2831"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={16}
                className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-gold-primary"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-1">
                Delivery / Table Destination *
              </label>
              <input
                type="text"
                required
                placeholder="432 Park Ave, Penthouse A / Table 14"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                maxLength={200}
                className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-gold-primary"
              />
            </div>
          </div>

          {/* Promo Coupon Section */}
          <div className="p-4 rounded-2xl bg-obsidian-950/70 border border-neutral-800">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
              Promotional Courtesy Code
            </span>
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-gold-primary/10 border border-gold-primary/30">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gold-primary" />
                  <div>
                    <span className="text-xs font-mono font-bold text-gold-hover">{appliedCoupon}</span>
                    <span className="text-[11px] text-gold-light ml-2">({discountPercent}% Courtesy Applied)</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="text-xs text-neutral-400 hover:text-rose-400"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code (e.g. AURA20, VIP10, CHEFVIP)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  maxLength={20}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-obsidian-900 border border-neutral-700 text-xs font-mono text-neutral-200 uppercase placeholder-neutral-600 focus:outline-none focus:border-gold-primary"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 rounded-xl gold-button-outline text-xs font-semibold uppercase tracking-wider"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Gratuity / Sommelier Tip Selector */}
          <div>
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
              Sommelier & Brigade Gratuity
            </span>
            <div className="grid grid-cols-4 gap-2">
              {[15, 18, 20, 25].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setTipPercent(pct)}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    tipPercent === pct
                      ? 'bg-gold-primary/20 border-gold-primary text-gold-hover shadow-gold-sm'
                      : 'bg-obsidian-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Bill Calculation Summary */}
          <div className="p-4 rounded-2xl bg-obsidian-950 border border-neutral-800 space-y-2 text-xs">
            <div className="flex justify-between text-neutral-400">
              <span>Courses Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
              <span className="font-mono text-neutral-200">{formatCurrency(subtotal, currency)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-gold-light">
                <span>Promotional Courtesy ({discountPercent}%)</span>
                <span className="font-mono">- {formatCurrency(discountAmount, currency)}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-400">
              <span>NYC Hospitality Sales Tax (8.875%)</span>
              <span className="font-mono text-neutral-200">{formatCurrency(tax, currency)}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Brigade Gratuity ({tipPercent}%)</span>
              <span className="font-mono text-neutral-200">{formatCurrency(tip, currency)}</span>
            </div>
            <div className="flex justify-between text-base font-bold pt-3 border-t border-neutral-800 text-champagne">
              <span className="font-serif">Grand Total</span>
              <span className="font-serif text-gold-primary text-lg">{formatCurrency(grandTotal, currency)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl gold-button text-xs font-bold uppercase tracking-wider shadow-gold-glow disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Verifying Order Security...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4" /> Place Order ({formatCurrency(grandTotal, currency)})
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
