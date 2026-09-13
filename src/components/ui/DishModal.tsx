'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MenuItem, CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatting';
import { X, Wine, MapPin, ChefHat, Plus, Minus, ShoppingBag, Flame, Sparkles } from 'lucide-react';
import { Sanitizer } from '@/lib/security/Sanitizer';

interface DishModalProps {
  item: MenuItem | null;
  currency?: CurrencyCode;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, notes: string) => void;
}

export function DishModal({ item, currency = 'USD', onClose, onAddToCart }: DishModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!item) return null;

  const handleAdd = () => {
    const cleanNotes = Sanitizer.cleanText(specialInstructions, 200);
    onAddToCart(item, quantity, cleanNotes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-neutral-200 shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 border border-neutral-200 backdrop-blur-md shadow-md transition-colors"
          aria-label="Close dish details"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Hero Image */}
        <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-neutral-100">
          <Image
            src={item.image}
            alt={item.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 768px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 right-16 flex flex-wrap gap-2">
            {item.terroirBadge && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-white/95 text-emerald-800 border border-emerald-300 backdrop-blur-md shadow-md">
                {item.terroirBadge}
              </span>
            )}
            {item.isChefSpecial && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.15em] font-bold bg-brand-red text-white shadow-md">
                <Flame className="h-3 w-3 text-amber-300" /> Chef Signature
              </span>
            )}
            {item.isPopular && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.15em] font-bold bg-amber-400 text-black shadow-md">
                <Sparkles className="h-3 w-3" /> Guest Favorite
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-bold block mb-1">
                {item.category.replace('-', ' ')}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">{item.name}</h2>
            </div>
            <span className="font-serif text-2xl sm:text-3xl font-black text-white shrink-0">
              {formatCurrency(item.price, currency)}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Description & Flavor Notes */}
          <div>
            <p className="text-neutral-700 text-sm leading-relaxed font-sans mb-3">
              {item.description}
            </p>
            {item.flavorNotes && item.flavorNotes.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {item.flavorNotes.map((note) => (
                  <span
                    key={note}
                    className="px-2.5 py-1 rounded-lg text-xs bg-neutral-100 border border-neutral-200 text-neutral-800 font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Terroir & Culinary Craft Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
            <div>
              <span className="text-[9px] text-neutral-500 uppercase tracking-[0.2em] block font-bold">Origin &amp; Terroir</span>
              <span className="text-xs font-semibold text-neutral-900 block mt-1 truncate">
                {item.farmProvenance ? item.farmProvenance.split(',')[0] : 'Single Estate'}
              </span>
            </div>
            <div>
              <span className="text-[9px] text-neutral-500 uppercase tracking-[0.2em] block font-bold">Service Method</span>
              <span className="text-xs font-semibold text-neutral-900 block mt-1 truncate">
                {item.category === 'desserts' ? 'Artisanal Freeze' : item.category === 'ocean' ? 'Chilled Service' : item.category === 'prime-cuts' ? 'Binchotan Grilled' : 'Hearth Prepared'}
              </span>
            </div>
            <div>
              <span className="text-[9px] text-neutral-500 uppercase tracking-[0.2em] block font-bold">Dietary Profile</span>
              <span className="text-xs font-semibold text-neutral-900 block mt-1 capitalize truncate">
                {item.dietary.join(', ').replace(/-/g, ' ') || 'Chef Precision'}
              </span>
            </div>
            <div>
              <span className="text-[9px] text-neutral-500 uppercase tracking-[0.2em] block font-bold">Allergen Notice</span>
              <span className="text-xs font-semibold text-brand-red block mt-1 truncate">
                {item.allergens.length > 0 ? item.allergens.join(', ') : 'None Declared'}
              </span>
            </div>
          </div>

          {/* Sommelier Wine Pairing */}
          {item.winePairing && (
            <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200 relative overflow-hidden">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-2xl bg-brand-red text-white shadow-sm shrink-0 mt-0.5">
                  <Wine className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-brand-red font-bold">
                      Sommelier Cellar Pairing
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-brand-red font-mono font-bold border border-red-200">
                      {item.winePairing.vintage}
                    </span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-neutral-900">
                    {item.winePairing.name}
                  </h4>
                  <p className="text-[11px] text-neutral-500 font-sans">{item.winePairing.region}</p>
                  <p className="text-xs text-neutral-700 italic font-serif leading-relaxed pt-1">
                    “{item.winePairing.notes}”
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Farm Provenance & Technique */}
          {(item.farmProvenance || item.chefNote) && (
            <div className="grid sm:grid-cols-2 gap-3">
              {item.farmProvenance && (
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <div className="flex items-center gap-1.5 text-neutral-900 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                    <MapPin className="h-3.5 w-3.5 text-brand-red" /> Provenance
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">{item.farmProvenance}</p>
                </div>
              )}
              {item.chefNote && (
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <div className="flex items-center gap-1.5 text-neutral-900 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">
                    <ChefHat className="h-3.5 w-3.5 text-brand-red" /> Culinary Technique
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">{item.chefNote}</p>
                </div>
              )}
            </div>
          )}

          {/* Ingredients List */}
          <div>
            <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-2">
              Curated Elements
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {item.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 border border-neutral-200"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Special Dietary Request / Note */}
          <div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] block mb-2">
              Dietary Instructions &amp; Culinary Requests
            </label>
            <input
              type="text"
              placeholder="e.g. Allergy preferences, special presentation, extra chili..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              maxLength={200}
              className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-300 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
            />
          </div>

          {/* Footer Action Bar */}
          <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Quantity Controller */}
            <div className="flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-neutral-100 border border-neutral-300">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="font-mono text-sm font-bold text-neutral-900 w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(20, quantity + 1))}
                className="p-1 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Total & Add Button */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="text-right hidden sm:block">
                <span className="text-[9px] text-neutral-500 uppercase tracking-[0.2em] block font-bold">Allocation Total</span>
                <span className="font-serif text-lg font-black text-brand-red">
                  {formatCurrency(item.price * quantity, currency)}
                </span>
              </div>
              <button
                onClick={handleAdd}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all hover:scale-105 active:scale-95"
              >
                <ShoppingBag className="h-4 w-4" /> Add to Order ({formatCurrency(item.price * quantity, currency)})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
