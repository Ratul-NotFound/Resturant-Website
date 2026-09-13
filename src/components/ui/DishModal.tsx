'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MenuItem, CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatting';
import { X, Sparkles, Wine, Flame, Clock, ShieldAlert, MapPin, ChefHat, Plus, Minus, ShoppingBag } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#141210] border border-gold-primary/25 shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#0c0b0a]/90 text-[#91887b] hover:text-[#f7f4ed] border border-gold-primary/20 backdrop-blur-md transition-colors"
          aria-label="Close dish details"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Hero Image */}
        <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-[#0c0b0a]">
          <Image
            src={item.image}
            alt={item.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 768px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/40 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {item.isChefSpecial && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium bg-[#0c0b0a]/90 text-gold-light border border-gold-primary/30 backdrop-blur-md">
                ✦ Chef’s Signature
              </span>
            )}
            {item.isPopular && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium bg-[#0c0b0a]/90 text-[#cfc8bc] border border-white/10 backdrop-blur-md">
                Guest Vintage
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-light/90 font-medium block mb-1">
                {item.category.replace('-', ' ')}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-champagne tracking-wide">{item.name}</h2>
            </div>
            <span className="font-serif text-2xl sm:text-3xl font-light text-gold-primary shrink-0">
              {formatCurrency(item.price, currency)}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Poetic Description */}
          <p className="text-[#cfc8bc] text-sm leading-relaxed font-sans font-light">
            {item.description}
          </p>

          {/* Terroir & Culinary Craft Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#0c0b0a] border border-gold-primary/15">
            <div>
              <span className="text-[9px] text-[#91887b] uppercase tracking-[0.2em] block">Origin & Terroir</span>
              <span className="text-xs font-light text-[#f7f4ed] block mt-1 truncate">
                {item.farmProvenance ? item.farmProvenance.split(',')[0] : 'Single Estate'}
              </span>
            </div>
            <div>
              <span className="text-[9px] text-[#91887b] uppercase tracking-[0.2em] block">Service Method</span>
              <span className="text-xs font-light text-[#f7f4ed] block mt-1 truncate">
                {item.category === 'desserts' ? 'Artisanal Freeze' : item.category === 'caviar' ? 'Chilled Mother of Pearl' : 'Binchotan Grilled'}
              </span>
            </div>
            <div>
              <span className="text-[9px] text-[#91887b] uppercase tracking-[0.2em] block">Dietary Profile</span>
              <span className="text-xs font-light text-[#f7f4ed] block mt-1 capitalize truncate">
                {item.dietary.join(', ').replace(/-/g, ' ') || 'Chef Precision'}
              </span>
            </div>
            <div>
              <span className="text-[9px] text-[#91887b] uppercase tracking-[0.2em] block">Allergen Notice</span>
              <span className="text-xs font-light text-gold-light/90 block mt-1 truncate">
                {item.allergens.length > 0 ? item.allergens.join(', ') : 'None Declared'}
              </span>
            </div>
          </div>

          {/* Sommelier Wine Pairing */}
          {item.winePairing && (
            <div className="p-4 rounded-2xl bg-[#0c0b0a] border border-gold-primary/20 relative overflow-hidden">
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-full bg-gold-primary/10 text-gold-primary border border-gold-primary/20 shrink-0 mt-0.5">
                  <Wine className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-gold-light/80 font-medium">
                      Cellar Pairing
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-gold-primary/10 text-gold-hover font-mono border border-gold-primary/20">
                      {item.winePairing.vintage}
                    </span>
                  </div>
                  <h4 className="font-serif text-sm font-normal text-champagne">
                    {item.winePairing.name}
                  </h4>
                  <p className="text-[11px] text-[#91887b] font-sans">{item.winePairing.region}</p>
                  <p className="text-xs text-[#cfc8bc] italic font-serif leading-relaxed pt-1">
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
                <div className="p-3.5 rounded-2xl bg-[#0c0b0a] border border-gold-primary/10">
                  <div className="flex items-center gap-1.5 text-gold-light text-[10px] font-medium uppercase tracking-[0.2em] mb-1">
                    <MapPin className="h-3 w-3 text-gold-primary" /> Provenance
                  </div>
                  <p className="text-xs text-[#91887b] leading-relaxed font-light">{item.farmProvenance}</p>
                </div>
              )}
              {item.chefNote && (
                <div className="p-3.5 rounded-2xl bg-[#0c0b0a] border border-gold-primary/10">
                  <div className="flex items-center gap-1.5 text-gold-light text-[10px] font-medium uppercase tracking-[0.2em] mb-1">
                    <ChefHat className="h-3 w-3 text-gold-primary" /> Culinary Technique
                  </div>
                  <p className="text-xs text-[#91887b] leading-relaxed font-light">{item.chefNote}</p>
                </div>
              )}
            </div>
          )}

          {/* Ingredients List */}
          <div>
            <h4 className="text-[10px] font-medium text-[#91887b] uppercase tracking-[0.25em] mb-2">
              Curated Elements
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {item.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="px-3 py-1 rounded-full text-xs font-light bg-[#0c0b0a] text-[#cfc8bc] border border-gold-primary/15"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Special Dietary Request / Note */}
          <div>
            <label className="text-[10px] font-medium text-[#91887b] uppercase tracking-[0.25em] block mb-2">
              Dietary Instructions & Culinary Requests
            </label>
            <input
              type="text"
              placeholder="e.g. Allergy preferences, anniversary presentation, wine pairing service..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              maxLength={200}
              className="w-full px-4 py-2.5 rounded-full bg-[#0c0b0a] border border-gold-primary/20 text-xs text-[#f7f4ed] placeholder-[#91887b]/60 focus:outline-none focus:border-gold-primary transition-colors"
            />
          </div>

          {/* Footer Action Bar */}
          <div className="pt-4 border-t border-gold-primary/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Quantity Controller */}
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#0c0b0a] border border-gold-primary/20">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 rounded-full text-[#91887b] hover:text-[#f7f4ed] transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="font-serif text-sm font-light text-champagne w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(20, quantity + 1))}
                className="p-1 rounded-full text-[#91887b] hover:text-[#f7f4ed] transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Total & Add Button */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="text-right hidden sm:block">
                <span className="text-[9px] text-[#91887b] uppercase tracking-[0.2em] block">Allocation Total</span>
                <span className="font-serif text-base font-light text-gold-primary">
                  {formatCurrency(item.price * quantity, currency)}
                </span>
              </div>
              <button
                onClick={handleAdd}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-7 py-3 rounded-full gold-button text-xs tracking-[0.15em] uppercase font-medium shadow-gold-sm hover:shadow-gold-md transition-all"
              >
                <ShoppingBag className="h-3.5 w-3.5" /> Add to Tasting Order ({formatCurrency(item.price * quantity, currency)})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
