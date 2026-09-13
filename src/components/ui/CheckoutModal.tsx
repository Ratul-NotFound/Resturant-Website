'use client';

import React, { useState } from 'react';
import { CartItem, OrderCalculation, CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatting';
import { PROMO_COUPONS } from '@/data/restaurantConfig';
import { X, CheckCircle2, ShieldCheck, Tag, CreditCard, ArrowRight, Loader2, Sparkles } from 'lucide-react';
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
        `Coupon ${clean} applied (${PROMO_COUPONS[clean].discountPercent}% discount)!`,
        'success',
        'Promotion Active'
      );
    } else {
      showToast('Invalid or expired code. Try AURA20, VIP10, or CHEFVIP', 'error', 'Invalid Coupon');
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
        showToast('Your culinary order has been confirmed.', 'success', 'Order Confirmed');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-2xl my-auto rounded-3xl bg-white border border-neutral-200 shadow-2xl p-6 sm:p-8 animate-slide-up text-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 border border-neutral-300 transition-colors"
          aria-label="Close checkout"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-brand-red font-bold mb-1">
            <ShieldCheck className="h-4 w-4" /> Secure Order Checkout ({currency})
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">Finalize Your Order</h2>
          <p className="text-xs text-neutral-500 mt-1">
            Freshly prepared flame-grilled dishes delivered straight to your table or penthouse.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder} className="space-y-6">
          {/* Customer Details */}
          <div className="grid sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1 font-bold">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Julian Montgomery"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-300 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1 font-bold">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="concierge@harrington.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={254}
                className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-300 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1 font-bold">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+1 (555) 019-2831"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={16}
                className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-300 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1 font-bold">
                Delivery / Table Destination *
              </label>
              <input
                type="text"
                required
                placeholder="432 Park Ave, Penthouse A / Table 14"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                maxLength={200}
                className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-300 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
              />
            </div>
          </div>

          {/* Promo Coupon Section */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-2 font-bold">
              Promotional Discount Code
            </span>
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 px-4">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-emerald-600" />
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-800">{appliedCoupon}</span>
                    <span className="text-xs text-emerald-700 font-medium ml-2">({discountPercent}% Discount Applied)</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="text-xs text-neutral-500 hover:text-brand-red font-bold"
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
                  className="flex-1 px-4 py-2.5 rounded-2xl bg-white border border-neutral-300 text-xs font-mono uppercase text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 transition-all"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-6 py-2.5 rounded-2xl bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Gratuity / Sommelier Tip Selector */}
          <div>
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-2 font-bold">
              Culinary Brigade Gratuity
            </span>
            <div className="grid grid-cols-4 gap-2">
              {[15, 18, 20, 25].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setTipPercent(pct)}
                  className={`py-2.5 rounded-2xl text-xs font-bold border transition-all ${
                    tipPercent === pct
                      ? 'bg-brand-red text-white border-brand-red shadow-md shadow-brand-red/30'
                      : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Bill Calculation Summary */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs font-medium">
            <div className="flex justify-between text-neutral-600">
              <span>Dishes Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
              <span className="font-mono font-bold text-neutral-900">{formatCurrency(subtotal, currency)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Promotional Discount ({discountPercent}%)</span>
                <span className="font-mono font-bold">- {formatCurrency(discountAmount, currency)}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-600">
              <span>NYC Hospitality Sales Tax (8.875%)</span>
              <span className="font-mono text-neutral-900">{formatCurrency(tax, currency)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Brigade Gratuity ({tipPercent}%)</span>
              <span className="font-mono text-neutral-900">{formatCurrency(tip, currency)}</span>
            </div>
            <div className="flex justify-between text-sm pt-3 border-t border-neutral-200 text-neutral-900">
              <span className="font-serif font-bold">Grand Total</span>
              <span className="font-serif text-brand-red text-lg font-black">{formatCurrency(grandTotal, currency)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Verifying Order Allocation...
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
