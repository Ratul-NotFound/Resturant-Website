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
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-neutral-200 shadow-2xl flex flex-col justify-between animate-slide-up">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-brand-red text-white shadow-md shadow-brand-red/30">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-neutral-900 tracking-wide">Your Order</h3>
                <p className="text-xs text-neutral-500 font-medium">
                  {items.length === 0 ? 'No courses added yet' : `${items.length} selected dishes`}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 border border-neutral-200 transition-colors"
              aria-label="Close cart"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Items Scrollable List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3.5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="p-5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-400 mb-4">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h4 className="font-serif text-lg font-bold text-neutral-900 mb-1">Your Order is Empty</h4>
                <p className="text-xs text-neutral-500 max-w-xs leading-relaxed mb-6">
                  Explore our flame-grilled specialties and chef signatures to add your favorites.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-brand-red/30 transition-all hover:scale-105 active:scale-95"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              items.map(({ item, quantity, notes }) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 transition-all shadow-sm"
                >
                  {/* Dish Thumbnail */}
                  <div className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0 bg-neutral-200 border border-neutral-300">
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
                        <h4 className="font-serif text-sm font-bold text-neutral-900 truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-400 hover:text-red-600 transition-colors p-0.5"
                          title="Remove dish"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="text-xs font-mono font-bold text-brand-red">
                        {formatCurrency(item.price, currency)}
                      </span>
                    </div>

                    {notes && (
                      <p className="text-[10px] text-neutral-500 italic line-clamp-1">
                        Note: {notes}
                      </p>
                    )}

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-200">
                      <div className="flex items-center gap-2 bg-white rounded-xl px-2 py-0.5 border border-neutral-300 shadow-sm">
                        <button
                          onClick={() => onUpdateQty(item.id, quantity - 1)}
                          className="p-1 rounded text-neutral-600 hover:text-neutral-900 transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-neutral-900 w-5 text-center">{quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, quantity + 1)}
                          className="p-1 rounded text-neutral-600 hover:text-neutral-900 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-xs font-mono font-bold text-neutral-900">
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
            <div className="p-6 bg-neutral-50 border-t border-neutral-200 space-y-4">
              <div className="space-y-1.5 text-xs font-medium">
                <div className="flex justify-between text-neutral-600">
                  <span>Dishes Subtotal</span>
                  <span className="text-neutral-900 font-mono font-bold">{formatCurrency(subtotal, currency)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Taxes &amp; Gratuity</span>
                  <span className="text-neutral-500">Calculated at Checkout</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-neutral-200">
                  <span className="font-serif font-bold text-neutral-900">Estimated Total</span>
                  <span className="font-serif font-black text-brand-red text-lg">
                    {formatCurrency(subtotal, currency)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all hover:scale-105 active:scale-95"
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
