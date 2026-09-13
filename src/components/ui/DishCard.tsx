'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MenuItem, CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatting';
import { Plus, Check, Eye, Sparkles } from 'lucide-react';

interface DishCardProps {
  item: MenuItem;
  currency?: CurrencyCode;
  onSelect: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
}

type PortionSize = 'solo' | 'duo' | 'feast';

export function DishCard({ item, currency = 'USD', onSelect, onAddToCart }: DishCardProps) {
  const [portion, setPortion] = useState<PortionSize>('solo');
  const [isAddedAnim, setIsAddedAnim] = useState(false);

  // Dynamic portion multiplier
  const portionConfig = {
    solo: { label: '1P', fullLabel: 'Single', factor: 1.0 },
    duo: { label: '2P', fullLabel: 'Duo', factor: 1.85 },
    feast: { label: '4P', fullLabel: 'Feast', factor: 3.5 },
  };

  const current = portionConfig[portion];
  const calculatedPrice = Math.round(item.price * current.factor);
  const originalPrice = Math.round(calculatedPrice * 1.3);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddedAnim(true);
    setTimeout(() => setIsAddedAnim(false), 800);

    onAddToCart({
      ...item,
      name: portion === 'solo' ? item.name : `${item.name} (${current.fullLabel})`,
      price: calculatedPrice,
    });
  };

  return (
    <div
      onClick={() => onSelect(item)}
      className="group relative flex flex-col justify-between h-full bg-white rounded-3xl p-6 border border-neutral-100 hover:border-brand-red/30 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(232,48,42,0.1)] transition-all duration-400 cursor-pointer overflow-hidden"
    >
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between gap-2 mb-3 z-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400 group-hover:text-brand-red transition-colors">
          {item.terroirBadge?.split('·')[0] || item.category.replace('-', ' ')}
        </span>

        {item.isChefSpecial ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-red-50 text-brand-red border border-red-100">
            <Sparkles className="h-2.5 w-2.5" /> Signature
          </span>
        ) : item.dietary.includes('halal') ? (
          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100">
            100% Halal
          </span>
        ) : null}
      </div>

      {/* Creative Floating Circular Food Artwork */}
      <div className="relative mx-auto my-3 w-44 h-44 sm:w-48 sm:h-48 z-10">
        <div className="relative w-full h-full rounded-full p-1.5 bg-neutral-50/80 ring-1 ring-black/5 group-hover:ring-brand-red/20 transition-all duration-500">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 176px, 192px"
            className="object-cover rounded-full transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
          />
          {/* Quick inspect overlay */}
          <div className="absolute inset-0 rounded-full bg-black/25 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="p-2.5 rounded-full bg-white text-neutral-900 shadow-md">
              <Eye className="h-4 w-4 text-brand-red" />
            </span>
          </div>
        </div>
      </div>

      {/* Content & Typography */}
      <div className="mt-3 space-y-1.5 z-10">
        <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-900 group-hover:text-brand-red transition-colors line-clamp-1 leading-snug">
          {item.name}
        </h3>

        <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed font-normal">
          {item.shortDesc || item.description}
        </p>
      </div>

      {/* Minimalist Portion Selector */}
      <div className="pt-3.5 mt-3 border-t border-neutral-100 flex items-center justify-between gap-2 z-10">
        <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
          Portion:
        </span>
        <div className="inline-flex items-center p-0.5 rounded-xl bg-neutral-100 text-xs">
          {(['solo', 'duo', 'feast'] as PortionSize[]).map((pKey) => {
            const isActive = portion === pKey;
            return (
              <button
                key={pKey}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPortion(pKey);
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  isActive
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {portionConfig[pKey].label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Pricing & Minimalist Add Trigger */}
      <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between gap-3 z-10">
        <div>
          <div className="text-[10px] text-neutral-400 line-through font-mono">
            {formatCurrency(originalPrice, currency)}
          </div>
          <div className="font-serif text-lg sm:text-xl font-black text-neutral-900 group-hover:text-brand-red transition-colors leading-none">
            {formatCurrency(calculatedPrice, currency)}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-xs tracking-wider transition-all duration-300 shadow-sm ${
            isAddedAnim
              ? 'bg-emerald-600 text-white scale-95'
              : 'bg-neutral-900 hover:bg-brand-red text-white hover:shadow-md'
          }`}
          aria-label={`Add ${item.name} to order`}
        >
          {isAddedAnim ? (
            <>
              <Check className="h-3.5 w-3.5 text-white" />
              <span>Added</span>
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" />
              <span>Add</span>
            </>
          )}
        </button>
      </div>

      {/* Subtle bottom gradient glow on card hover */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-16 bg-red-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}
