'use client';

import React from 'react';
import Image from 'next/image';
import { CartItem, CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatting';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  subtotal: number;
  currency?: CurrencyCode;
  onClose: () => void;
  onUpdateQty: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  subtotal,
  currency = 'USD',
  onClose,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#141210] border-l border-gold-primary/30 shadow-2xl flex flex-col justify-between animate-slide-up">
          
          {/* Header */}
          <div className="p-6 border-b border-gold-primary/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="h-5 w-5 text-gold-primary" />
              <div>
                <h3 className="font-serif text-lg font-bold text-champagne">Your Tasting Order</h3>
                <p className="text-[11px] text-[#91887b]">
                  {items.length === 0 ? 'No courses added yet' : `${items.length} unique courses selected`}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#1c1916] text-neutral-400 hover:text-white border border-gold-primary/20 transition-colors"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Items Scrollable List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="p-4 rounded-full bg-neutral-800/50 border border-neutral-700/50 text-neutral-500 mb-4">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h4 className="font-serif text-base font-semibold text-neutral-300 mb-1">Your Order is Empty</h4>
                <p className="text-xs text-neutral-500 max-w-xs leading-relaxed mb-6">
                  Explore our 30 Michelin-caliber signature dishes and add your selections.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl gold-button-outline text-xs font-semibold uppercase tracking-wider"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              items.map(({ item, quantity, notes }) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3.5 rounded-2xl bg-[#0c0b0a] border border-gold-primary/20 hover:border-gold-primary/40 transition-all"
                >
                  {/* Dish Thumbnail */}
                  <div className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0 bg-[#1c1916]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-sm font-semibold text-champagne truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#91887b] hover:text-rose-400 transition-colors p-0.5"
                          title="Remove course"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-xs font-bold text-gold-primary">
                        {formatCurrency(item.price, currency)}
                      </span>
                    </div>

                    {notes && (
                      <p className="text-[10px] text-[#91887b] italic line-clamp-1">
                        Note: {notes}
                      </p>
                    )}

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gold-primary/10">
                      <div className="flex items-center gap-2 bg-[#1c1916] rounded-lg p-1 border border-gold-primary/20">
                        <button
                          onClick={() => onUpdateQty(item.id, quantity - 1)}
                          className="p-1 rounded text-[#91887b] hover:text-white transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-bold text-champagne w-5 text-center">{quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, quantity + 1)}
                          className="p-1 rounded text-[#91887b] hover:text-white transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-xs font-mono font-bold text-neutral-200">
                        {formatCurrency(item.price * quantity, currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-[#0c0b0a] border-t border-gold-primary/20 space-y-4">
              <div className="space-y-1.5 text-xs font-sans">
                <div className="flex justify-between text-[#91887b]">
                  <span>Courses Subtotal</span>
                  <span className="font-medium text-neutral-200">{formatCurrency(subtotal, currency)}</span>
                </div>
                <div className="flex justify-between text-[#91887b]">
                  <span>Estimated Tax & Service</span>
                  <span className="text-[#91887b]">Calculated at Checkout</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gold-primary/15">
                  <span className="font-serif font-bold text-champagne">Estimated Total</span>
                  <span className="font-serif font-bold text-gold-primary text-base">
                    {formatCurrency(subtotal, currency)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl gold-button text-xs font-bold uppercase tracking-wider shadow-gold-glow"
              >
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
