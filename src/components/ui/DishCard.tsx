'use client';

import React from 'react';
import Image from 'next/image';
import { MenuItem, CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatting';
import { Sparkles, Wine, Plus, Flame, Clock, Eye } from 'lucide-react';
import { Card3D } from './Card3D';

interface DishCardProps {
  item: MenuItem;
  currency?: CurrencyCode;
  onSelect: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
}

export function DishCard({ item, currency = 'USD', onSelect, onAddToCart }: DishCardProps) {
  return (
    <Card3D maxTilt={5} className="h-full">
      <div className="group relative flex flex-col justify-between h-full rounded-2xl bg-[#141210] border border-gold-primary/20 hover:border-gold-primary/50 transition-all duration-500 overflow-hidden shadow-card-dark">
        
        {/* Dish Image Container */}
        <div className="relative w-full h-56 overflow-hidden bg-[#0c0b0a] cursor-pointer" onClick={() => onSelect(item)}>
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/20 to-black/30" />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 z-10">
            {item.isChefSpecial && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase bg-[#0c0b0a]/80 text-gold-light border border-gold-primary/30 backdrop-blur-md">
                ✦ Signature
              </span>
            )}
          </div>

          {/* Quick View Button on Image Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#141210]/95 text-gold-hover text-[11px] font-medium border border-gold-primary/30 shadow-lg">
              <Eye className="h-3 w-3" /> View Provenance
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="flex flex-col flex-1 p-5">
          {/* Category */}
          <div className="mb-1.5">
            <span className="uppercase tracking-[0.2em] text-[9px] text-[#91887b] font-mono">
              {item.category.replace('-', ' ')}
            </span>
          </div>

          {/* Title & Price */}
          <div className="flex items-baseline justify-between gap-3 mb-2">
            <h3
              onClick={() => onSelect(item)}
              className="font-serif text-lg font-normal text-[#f7f4ed] group-hover:text-gold-hover transition-colors cursor-pointer leading-snug truncate"
            >
              {item.name}
            </h3>
            <span className="font-serif text-base font-medium text-gold-primary shrink-0">
              {formatCurrency(item.price, currency)}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-[#cfc8bc]/80 line-clamp-2 mb-4 leading-relaxed font-light">
            {item.shortDesc || item.description}
          </p>

          {/* Subtle Wine Pairing / Dietary Hint */}
          <div className="flex items-center gap-2 mb-4 text-[10px] text-[#91887b]">
            {item.winePairing && (
              <span className="inline-flex items-center gap-1 text-gold-light/90">
                <Wine className="h-2.5 w-2.5 text-gold-primary" /> {item.winePairing.vintage} {item.winePairing.name}
              </span>
            )}
            {!item.winePairing && item.dietary.length > 0 && (
              <span className="capitalize">{item.dietary.slice(0, 2).join(' · ').replace(/-/g, ' ')}</span>
            )}
          </div>

          {/* Action Row */}
          <div className="mt-auto pt-3 border-t border-gold-primary/10 flex items-center justify-between gap-2">
            <button
              onClick={() => onSelect(item)}
              className="text-[11px] text-[#91887b] hover:text-gold-hover transition-colors font-mono tracking-wider uppercase"
            >
              Details →
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(item);
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gold-primary/10 hover:bg-gold-primary text-gold-hover hover:text-[#0c0b0a] font-medium text-xs border border-gold-primary/25 transition-all duration-300"
              aria-label={`Select ${item.name}`}
            >
              <Plus className="h-3 w-3" /> Select
            </button>
          </div>
        </div>
      </div>
    </Card3D>
  );
}
