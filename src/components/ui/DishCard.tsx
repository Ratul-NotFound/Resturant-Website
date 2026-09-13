'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MenuItem, CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatting';
import { Wine, Plus, Eye, User, Users, Crown, Flame } from 'lucide-react';

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

  // Dynamic portion multiplier (Inspired by Image 3 Kacchi portions)
  const portionMultipliers = {
    solo: { label: '1 Person', factor: 1.0, discount: 0, icon: User },
    duo: { label: '2 Persons', factor: 1.85, discount: 0.08, icon: Users },
    feast: { label: 'Feast (4P)', factor: 3.5, discount: 0.15, icon: Crown },
  };

  const currentMultiplier = portionMultipliers[portion];
  const calculatedPrice = Math.round(item.price * currentMultiplier.factor);
  const originalPrice = Math.round(calculatedPrice * 1.35); // 35% strike-through like Image 1

  const theme = item.chromaTheme || 'saffron';

  const themeStyles = {
    ocean: {
      border: 'hover:border-teal-500/60',
      glow: 'hover:shadow-[0_12px_35px_rgba(13,148,136,0.25)]',
      accent: 'text-teal-400',
      pillActive: 'bg-teal-500 text-black font-bold shadow-md shadow-teal-500/30',
      badge: 'bg-teal-950/90 text-teal-300 border-teal-500/40',
    },
    ember: {
      border: 'hover:border-rose-500/60',
      glow: 'hover:shadow-[0_12px_35px_rgba(225,29,72,0.25)]',
      accent: 'text-rose-400',
      pillActive: 'bg-red-600 text-white font-bold shadow-md shadow-red-600/30',
      badge: 'bg-red-950/90 text-red-200 border-red-500/40',
    },
    saffron: {
      border: 'hover:border-amber-500/60',
      glow: 'hover:shadow-[0_12px_35px_rgba(245,158,11,0.25)]',
      accent: 'text-amber-400',
      pillActive: 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/30',
      badge: 'bg-amber-950/90 text-amber-200 border-amber-500/40',
    },
    amethyst: {
      border: 'hover:border-purple-500/60',
      glow: 'hover:shadow-[0_12px_35px_rgba(139,92,246,0.25)]',
      accent: 'text-purple-400',
      pillActive: 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30',
      badge: 'bg-purple-950/90 text-purple-200 border-purple-500/40',
    },
    terracotta: {
      border: 'hover:border-orange-500/60',
      glow: 'hover:shadow-[0_12px_35px_rgba(234,88,12,0.25)]',
      accent: 'text-orange-400',
      pillActive: 'bg-orange-600 text-white font-bold shadow-md shadow-orange-600/30',
      badge: 'bg-orange-950/90 text-orange-200 border-orange-500/40',
    },
    emerald: {
      border: 'hover:border-emerald-500/60',
      glow: 'hover:shadow-[0_12px_35px_rgba(16,185,129,0.25)]',
      accent: 'text-emerald-400',
      pillActive: 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/30',
      badge: 'bg-emerald-950/90 text-emerald-200 border-emerald-500/40',
    },
  }[theme];

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddedAnim(true);
    setTimeout(() => setIsAddedAnim(false), 600);

    // Pass item with portion size and price adjustment
    onAddToCart({
      ...item,
      name: `${item.name} (${currentMultiplier.label})`,
      price: calculatedPrice,
    });
  };

  return (
    <div className="h-full pt-10">
      <div
        className={`group relative flex flex-col justify-between h-full rounded-3xl bg-white border border-black/10 hover:border-brand-red/40 hover:shadow-2xl transition-all duration-500 p-5 pt-0 shadow-lg`}
      >
        {/* Deal Sticker Badges (Inspired by Image 1 & 4) */}
        <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 pointer-events-none">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white shadow-sm flex items-center gap-1">
            <Flame className="h-2.5 w-2.5 text-white" /> Hot
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-brand-red text-white shadow-sm">
            -35%
          </span>
          {item.isChefSpecial && (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-400 text-black shadow-sm">
              Chef Pick
            </span>
          )}
        </div>

        {/* 3D Circular Plate Breakout (Inspired by Image 1 & Image 2) */}
        <div
          className="relative -mt-12 mx-auto w-48 h-48 sm:w-52 sm:h-52 cursor-pointer z-20"
          onClick={() => onSelect(item)}
        >
          <div className="relative w-full h-full plate-pop-shadow">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 192px, 208px"
              className="object-cover rounded-full border-4 border-white shadow-2xl group-hover:scale-105 transition-transform duration-500"
            />
            {/* Quick View Terroir Hover Overlay */}
            <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-[2px]">
              <span className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white text-neutral-900 text-[10px] font-bold uppercase tracking-wider shadow-lg">
                <Eye className="h-3 w-3 text-brand-red" /> View Craft
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-col flex-1 mt-4 space-y-3">
          
          {/* Terroir Origin Pill */}
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-brand-red border border-red-100">
              {item.terroirBadge?.split('·')[0] || item.farmProvenance?.split(',')[0] || 'Single Estate'}
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
              {item.category.replace('-', ' ')}
            </span>
          </div>

          {/* Dish Title */}
          <h3
            onClick={() => onSelect(item)}
            className="font-serif text-lg font-bold text-neutral-900 group-hover:text-brand-red transition-colors cursor-pointer leading-snug line-clamp-1"
          >
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed font-sans">
            {item.shortDesc || item.description}
          </p>

          {/* Flavor Architecture Notes */}
          <div className="flex flex-wrap gap-1">
            {item.flavorNotes?.slice(0, 3).map((flavor) => (
              <span
                key={flavor}
                className="px-2 py-0.5 rounded-md text-[10px] bg-neutral-100 border border-neutral-200 text-neutral-700 font-medium"
              >
                {flavor}
              </span>
            ))}
          </div>

          {/* Portion Sizing Matrix (Directly Inspired by Image 3) */}
          <div className="pt-2 border-t border-neutral-100">
            <div className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 mb-1.5 flex items-center justify-between">
              <span>Portion Size:</span>
              <span className="text-brand-red font-bold">{currentMultiplier.label}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-neutral-50 border border-neutral-200">
              {(['solo', 'duo', 'feast'] as PortionSize[]).map((pKey) => {
                const config = portionMultipliers[pKey];
                const Icon = config.icon;
                const isActive = portion === pKey;
                return (
                  <button
                    key={pKey}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPortion(pKey);
                    }}
                    className={`flex items-center justify-center gap-1 py-1 rounded-lg text-[10px] font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-brand-red text-white shadow-sm'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    <span>{pKey === 'solo' ? '1P' : pKey === 'duo' ? '2P' : 'Feast'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Matrix & Add to Order Button */}
          <div className="mt-auto pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] text-neutral-400 line-through font-mono">
                {formatCurrency(originalPrice, currency)}
              </div>
              <div className="font-serif text-xl font-black text-brand-red leading-none">
                <span>{formatCurrency(calculatedPrice, currency)}</span>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md ${
                isAddedAnim
                  ? 'bg-emerald-500 text-white scale-95'
                  : 'bg-brand-red hover:bg-brand-redDark text-white hover:shadow-brand-red/40 hover:-translate-y-0.5'
              }`}
            >
              <Plus className="h-3.5 w-3.5" />
              {isAddedAnim ? 'Added!' : 'Add to Order'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

