'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MenuItem } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatting';
import { X, Sparkles, Wine, Flame, Clock, ShieldAlert, MapPin, ChefHat, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Sanitizer } from '@/lib/security/Sanitizer';

interface DishModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, notes: string) => void;
}

export function DishModal({ item, onClose, onAddToCart }: DishModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!item) return null;

  const handleAdd = () => {
    const cleanNotes = Sanitizer.cleanText(specialInstructions, 200);
    onAddToCart(item, quantity, cleanNotes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-obsidian-900 border border-gold-primary/30 shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-obsidian-950/80 text-neutral-400 hover:text-white border border-neutral-700/60 backdrop-blur-md transition-colors"
          aria-label="Close dish details"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Hero Image */}
        <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-obsidian-950">
          <Image
            src={item.image}
            alt={item.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 768px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/40 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {item.isChefSpecial && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-gold-primary text-obsidian-950 shadow-md">
                <Sparkles className="h-3.5 w-3.5" /> Chef’s Masterpiece
              </span>
            )}
            {item.isPopular && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                <Flame className="h-3.5 w-3.5" /> Guest Favorite
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-light font-semibold">
                {item.category.replace('-', ' ')}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-champagne">{item.name}</h2>
            </div>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-primary shrink-0">
              {formatCurrency(item.price)}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Description */}
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans">
            {item.description}
          </p>

          {/* Meta Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-obsidian-950/70 border border-neutral-800">
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Preparation Time</span>
              <span className="text-xs font-medium text-neutral-200 flex items-center gap-1 mt-1">
                <Clock className="h-3.5 w-3.5 text-gold-light" /> {item.prepTime || '15 mins'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Caloric Value</span>
              <span className="text-xs font-medium text-neutral-200 block mt-1">
                {item.calories ? `${item.calories} kcal` : 'Chef Precision'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Dietary Profile</span>
              <span className="text-xs font-medium text-neutral-200 block mt-1 capitalize">
                {item.dietary.join(', ').replace(/-/g, ' ') || 'Classic'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Allergen Notice</span>
              <span className="text-xs font-medium text-amber-300 flex items-center gap-1 mt-1">
                <ShieldAlert className="h-3.5 w-3.5" />
                {item.allergens.length > 0 ? item.allergens.join(', ') : 'None'}
              </span>
            </div>
          </div>

          {/* Sommelier Wine Pairing */}
          {item.winePairing && (
            <div className="p-5 rounded-2xl bg-gold-primary/5 border border-gold-primary/20 relative overflow-hidden">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-gold-primary/15 text-gold-hover border border-gold-primary/30 shrink-0">
                  <Wine className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-gold-light font-semibold">
                      Grand Sommelier Pairing
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-gold-primary/20 text-gold-hover font-mono">
                      {item.winePairing.vintage}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-semibold text-champagne mt-0.5">
                    {item.winePairing.name}
                  </h4>
                  <p className="text-xs text-gold-light/80 mt-0.5">{item.winePairing.region}</p>
                  <p className="text-xs text-neutral-300 mt-2 italic leading-relaxed">
                    “{item.winePairing.notes}”
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Farm Provenance & Chef Note */}
          <div className="grid sm:grid-cols-2 gap-4">
            {item.farmProvenance && (
              <div className="p-4 rounded-xl bg-obsidian-950/50 border border-neutral-800">
                <div className="flex items-center gap-2 text-gold-light text-xs font-semibold uppercase tracking-wider mb-1">
                  <MapPin className="h-3.5 w-3.5" /> Farm Origin & Provenance
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">{item.farmProvenance}</p>
              </div>
            )}
            {item.chefNote && (
              <div className="p-4 rounded-xl bg-obsidian-950/50 border border-neutral-800">
                <div className="flex items-center gap-2 text-gold-light text-xs font-semibold uppercase tracking-wider mb-1">
                  <ChefHat className="h-3.5 w-3.5" /> Executive Chef’s Technique
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">{item.chefNote}</p>
              </div>
            )}
          </div>

          {/* Ingredients List */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Curated Ingredients
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {item.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="px-2.5 py-1 rounded-lg text-xs bg-neutral-800/80 text-neutral-200 border border-neutral-700/50"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Special Dietary Request / Note */}
          <div>
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
              Special Dietary Requests & Culinary Notes
            </label>
            <input
              type="text"
              placeholder="e.g. Dressing on side, no chives, anniversary presentation..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              maxLength={200}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-neutral-800 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-gold-primary"
            />
          </div>

          {/* Footer Action Bar */}
          <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Quantity Controller */}
            <div className="flex items-center gap-3 p-1.5 rounded-xl bg-obsidian-950 border border-neutral-800">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="font-serif text-base font-bold text-champagne w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(20, quantity + 1))}
                className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Total & Add Button */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="text-right hidden sm:block">
                <span className="text-[10px] text-neutral-400 uppercase block">Total Price</span>
                <span className="font-serif text-lg font-bold text-gold-primary">
                  {formatCurrency(item.price * quantity)}
                </span>
              </div>
              <button
                onClick={handleAdd}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl gold-button text-xs tracking-wider uppercase font-bold shadow-gold-glow"
              >
                <ShoppingBag className="h-4 w-4" /> Add to Tasting Order ({formatCurrency(item.price * quantity)})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
