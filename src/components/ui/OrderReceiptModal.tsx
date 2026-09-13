'use client';

import React from 'react';
import { OrderCalculation, CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatting';
import { X, CheckCircle2, Download, ChefHat, Clock, Sparkles, Receipt } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-lg my-auto rounded-3xl bg-[#141210] border border-gold-primary/30 shadow-2xl p-6 sm:p-8 animate-slide-up text-[#cfc8bc]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          aria-label="Close receipt"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand Receipt Header */}
        <div className="text-center pb-6 border-b border-gold-primary/20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] uppercase tracking-widest font-semibold mb-2">
            <CheckCircle2 className="h-3 w-3" /> Order Dispatched to Kitchen
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-widest text-champagne">A U R A</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold-light mt-0.5">
            Haute Gastronomie · Order Receipt
          </p>
        </div>

        {/* Order Details Body */}
        <div className="py-6 space-y-5 text-xs font-sans">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-neutral-500 uppercase block">Order Reference</span>
              <span className="font-mono text-sm font-bold text-gold-primary">{orderId}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-neutral-500 uppercase block">Timestamp</span>
              <span className="text-neutral-300">{new Date().toLocaleDateString()} · {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Kitchen Timeline */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0c0b0a] border border-gold-primary/20 space-y-3">
            <div className="flex items-center justify-between text-gold-light font-semibold">
              <span className="flex items-center gap-1.5 text-xs">
                <ChefHat className="h-4 w-4 text-gold-primary" /> Brigade Status
              </span>
              <span className="text-[11px] font-mono text-gold-primary">Est. {calculation.estimatedPrepMinutes} Mins</span>
            </div>

            {/* 4-Stage Brigade Progress Steps */}
            <div className="grid grid-cols-4 gap-1.5 pt-1 text-center">
              <div className="space-y-1">
                <div className="h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[9px] uppercase font-bold text-emerald-400 block">Received</span>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 rounded-full bg-gold-primary animate-pulse" />
                <span className="text-[9px] uppercase font-bold text-gold-light block">Sous Prep</span>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 rounded-full bg-[#24201c]" />
                <span className="text-[9px] uppercase text-[#91887b] block">Plating</span>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 rounded-full bg-[#24201c]" />
                <span className="text-[9px] uppercase text-[#91887b] block">Dispatched</span>
              </div>
            </div>

            <p className="text-[11px] text-[#91887b]">
              Your courses have entered our hearth kitchen queue under Executive Chef Gabriel Moreau.
            </p>
          </div>

          {/* Bill Calculation Breakdown */}
          <div className="space-y-2 pt-2 border-t border-neutral-800">
            <div className="flex justify-between text-neutral-400">
              <span>Courses Subtotal</span>
              <span className="font-mono text-neutral-200">{formatCurrency(calculation.subtotal, currency)}</span>
            </div>
            {calculation.discount > 0 && (
              <div className="flex justify-between text-gold-light">
                <span>Promotional Courtesy ({calculation.discountPercentage}%)</span>
                <span className="font-mono">- {formatCurrency(calculation.discount, currency)}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-400">
              <span>Hospitality Sales Tax (8.875%)</span>
              <span className="font-mono text-neutral-200">{formatCurrency(calculation.tax, currency)}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Brigade Gratuity</span>
              <span className="font-mono text-neutral-200">{formatCurrency(calculation.tip, currency)}</span>
            </div>
            <div className="flex justify-between text-base font-bold pt-3 border-t border-neutral-800 text-champagne">
              <span className="font-serif">Grand Total</span>
              <span className="font-serif text-gold-primary text-lg">
                {formatCurrency(calculation.grandTotal, currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl gold-button text-xs font-bold uppercase tracking-wider shadow-gold-glow"
          >
            <Download className="h-4 w-4" /> Print / Save Receipt
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl gold-button-outline text-xs font-bold uppercase tracking-wider"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
