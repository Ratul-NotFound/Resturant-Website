'use client';

import React from 'react';
import Image from 'next/image';
import { MenuItem } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatting';
import { Sparkles, Wine, Plus, Flame, Clock, Eye } from 'lucide-react';
import { Card3D } from './Card3D';

interface DishCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
}

export function DishCard({ item, onSelect, onAddToCart }: DishCardProps) {
  return (
    <Card3D maxTilt={6} className="h-full">
      <div className="group relative flex flex-col justify-between h-full rounded-2xl bg-obsidian-900/80 border border-neutral-800/80 hover:border-gold-primary/40 transition-all duration-500 overflow-hidden shadow-card-dark hover:shadow-gold-glow">
        
        {/* Dish Image Container */}
        <div className="relative w-full h-56 overflow-hidden bg-obsidian-950 cursor-pointer" onClick={() => onSelect(item)}>
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-transparent to-black/30" />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {item.isChefSpecial && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-gold-primary text-obsidian-950 shadow-md">
                <Sparkles className="h-3 w-3" /> Chef’s Signature
              </span>
            )}
            {item.isPopular && !item.isChefSpecial && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                <Flame className="h-3 w-3" /> Popular Choice
              </span>
            )}
          </div>

          {/* Quick View Button on Image Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-obsidian-900/90 text-gold-hover text-xs font-medium border border-gold-primary/30 shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <Eye className="h-3.5 w-3.5" /> View Details & Wine Pairing
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="flex flex-col flex-1 p-5">
          {/* Category & Meta */}
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 font-sans">
            <span className="uppercase tracking-widest text-[10px] text-gold-light font-medium">
              {item.category.replace('-', ' ')}
            </span>
            <div className="flex items-center gap-3 text-[11px]">
              {item.prepTime && (
                <span className="inline-flex items-center gap-1 text-neutral-400">
                  <Clock className="h-3 w-3" /> {item.prepTime}
                </span>
              )}
              {item.calories && (
                <span className="text-neutral-400">{item.calories} kcal</span>
              )}
            </div>
          </div>

          {/* Title & Price */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3
              onClick={() => onSelect(item)}
              className="font-serif text-lg font-medium text-champagne group-hover:text-gold-hover transition-colors cursor-pointer leading-snug line-clamp-1"
            >
              {item.name}
            </h3>
            <span className="font-serif text-lg font-bold text-gold-primary shrink-0">
              {formatCurrency(item.price)}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-neutral-400 line-clamp-2 mb-4 leading-relaxed">
            {item.shortDesc || item.description}
          </p>

          {/* Dietary Badges */}
          <div className="flex flex-wrap gap-1 mb-4">
            {item.dietary.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-800/80 text-neutral-300 border border-neutral-700/50 capitalize"
              >
                {tag.replace('-', ' ')}
              </span>
            ))}
            {item.winePairing && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-gold-primary/10 text-gold-light border border-gold-primary/20">
                <Wine className="h-2.5 w-2.5" /> Wine Paired
              </span>
            )}
          </div>

          {/* Action Row */}
          <div className="mt-auto pt-3 border-t border-neutral-800/70 flex items-center justify-between gap-2">
            <button
              onClick={() => onSelect(item)}
              className="text-xs text-neutral-400 hover:text-gold-hover transition-colors font-medium flex items-center gap-1"
            >
              Learn More →
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(item);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gold-primary/15 hover:bg-gold-primary text-gold-hover hover:text-obsidian-950 font-medium text-xs border border-gold-primary/30 transition-all duration-300"
              aria-label={`Add ${item.name} to cart`}
            >
              <Plus className="h-3.5 w-3.5" /> Add to Order
            </button>
          </div>
        </div>
      </div>
    </Card3D>
  );
}
