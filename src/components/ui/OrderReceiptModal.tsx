'use client';

import React from 'react';
import { OrderCalculation, CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatting';
import { X, CheckCircle2, Download, ChefHat } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/restaurantConfig';

interface OrderReceiptModalProps {
  isOpen: boolean;
  orderId: string | null;
  calculation: OrderCalculation | null;
  currency: CurrencyCode;
  onClose: () => void;
}

export function OrderReceiptModal({
  isOpen,
  orderId,
  calculation,
  currency,
  onClose,
}: OrderReceiptModalProps) {
  if (!isOpen || !orderId || !calculation) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-lg my-auto rounded-3xl bg-white border border-neutral-200 shadow-2xl p-6 sm:p-8 animate-slide-up text-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 border border-neutral-300 transition-colors"
          aria-label="Close receipt"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Brand Receipt Header */}
        <div className="text-center pb-6 border-b border-neutral-200">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs uppercase tracking-wider font-bold mb-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Order Dispatched to Kitchen
          </div>
          <h2 className="font-serif text-3xl font-black tracking-[0.2em] text-neutral-900">A U R A</h2>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-red mt-1 font-bold">
            Haute Gastronomie · Order Receipt
          </p>
        </div>

        {/* Order Details Body */}
        <div className="py-6 space-y-5 text-xs font-medium">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-bold">Order Reference</span>
              <span className="font-mono text-xs font-bold text-brand-red">{orderId}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-bold">Timestamp</span>
              <span className="text-neutral-700 font-mono">{new Date().toLocaleDateString()} · {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Dining Allocation Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
            <div className="flex items-center justify-between text-neutral-900 font-bold">
              <span className="flex items-center gap-1.5 text-xs">
                <ChefHat className="h-4 w-4 text-brand-red" /> Culinary Brigade Preparation
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600">Confirmed</span>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed font-normal">
              Your flame-grilled culinary selections have been sent to Executive Chef Gabriel Moreau. Freshly prepared to order.
            </p>

            <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-500 font-medium">
              <span>432 Park Avenue · 30th Floor</span>
              <span>White-Glove Valet on 56th St</span>
            </div>
          </div>

          {/* Bill Calculation Breakdown */}
          <div className="space-y-2 pt-2 border-t border-neutral-200">
            <div className="flex justify-between text-neutral-600">
              <span>Dishes Subtotal</span>
              <span className="font-mono font-bold text-neutral-900">{formatCurrency(calculation.subtotal, currency)}</span>
            </div>
            {calculation.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Promotional Discount ({calculation.discountPercentage}%)</span>
                <span className="font-mono font-bold">- {formatCurrency(calculation.discount, currency)}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-600">
              <span>Hospitality Sales Tax (8.875%)</span>
              <span className="font-mono font-bold text-neutral-900">{formatCurrency(calculation.tax, currency)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Brigade Gratuity</span>
              <span className="font-mono font-bold text-neutral-900">{formatCurrency(calculation.tip, currency)}</span>
            </div>
            <div className="flex justify-between text-sm pt-3 border-t border-neutral-200 text-neutral-900">
              <span className="font-serif font-bold">Grand Total</span>
              <span className="font-serif text-brand-red text-lg font-black">
                {formatCurrency(calculation.grandTotal, currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all hover:scale-105 active:scale-95"
          >
            <Download className="h-4 w-4" /> Print / Save Receipt
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-800 text-xs font-bold uppercase tracking-wider transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
