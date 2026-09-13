'use client';

import React, { useState } from 'react';
import { MenuItem, CurrencyCode } from '@/lib/types';
import { menuData } from '@/data/menuData';
import { X, Wine, ChevronRight, Glasses, Plus } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/formatting';

interface SommelierAssistantModalProps {
  isOpen: boolean;
  currency?: CurrencyCode;
  onClose: () => void;
  onSelectDish: (item: MenuItem) => void;
  onAddToCart?: (item: MenuItem) => void;
}

type WinePreference =
  | 'all'
  | 'champagne'
  | 'burgundy-white'
  | 'bordeaux-red'
  | 'piedmont-red'
  | 'sweet-botrytis'
  | 'zero-proof';

const WINE_PREFERENCES: Array<{ id: WinePreference; label: string; desc: string }> = [
  { id: 'all', label: 'All Cellar Pairings', desc: 'Browse all 30 paired selections' },
  { id: 'champagne', label: 'Vintage Champagne & Sparkling', desc: 'Dom Pérignon 2013, Krug Grande Cuvée' },
  { id: 'burgundy-white', label: 'Grand Cru Mineral Whites', desc: 'Chablis Les Clos, Meursault Perrières' },
  { id: 'bordeaux-red', label: 'Bordeaux & Napa Reserves', desc: 'Château Margaux 2010, Opus One Napa Valley' },
  { id: 'piedmont-red', label: 'Italian Barolo & Barbaresco', desc: 'Monfortino Conterno 2015, Gaja' },
  { id: 'sweet-botrytis', label: 'Dessert Nectars', desc: 'Château d’Yquem 2016, Tokaji Aszú' },
  { id: 'zero-proof', label: 'Artisanal Zero-Proof', desc: 'Distilled Botanicals, Cold-Drip Jasmine' },
];

export function SommelierAssistantModal({
  isOpen,
  currency = 'USD',
  onClose,
  onSelectDish,
  onAddToCart,
}: SommelierAssistantModalProps) {
  const [selectedPref, setSelectedPref] = useState<WinePreference>('all');

  if (!isOpen) return null;

  const pairedDishes = menuData.filter((item) => {
    if (!item.winePairing && selectedPref !== 'zero-proof' && selectedPref !== 'all') return false;
    if (selectedPref === 'all') return true;
    if (selectedPref === 'champagne') return item.winePairing?.name.includes('Champagne') || item.winePairing?.name.includes('Franciacorta');
    if (selectedPref === 'burgundy-white') return item.winePairing?.region.includes('Burgundy') || item.winePairing?.name.includes('Chablis');
    if (selectedPref === 'bordeaux-red') return item.winePairing?.region.includes('Bordeaux') || item.winePairing?.region.includes('Napa') || item.winePairing?.region.includes('Tuscany');
    if (selectedPref === 'piedmont-red') return item.winePairing?.region.includes('Piedmont');
    if (selectedPref === 'sweet-botrytis') return item.winePairing?.region.includes('Sauternes') || item.winePairing?.region.includes('Tokaj') || item.winePairing?.region.includes('Port');
    if (selectedPref === 'zero-proof') return item.category === 'desserts' || item.dietary.includes('halal');
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-4xl my-auto rounded-3xl bg-white border border-neutral-200 shadow-2xl p-6 sm:p-8 animate-slide-up flex flex-col max-h-[90vh] text-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 border border-neutral-300 transition-colors"
          aria-label="Close sommelier assistant"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-brand-red font-bold mb-1">
            <Wine className="h-4 w-4" /> 4,000-Bottle Reserve Cellar
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Sommelier Reserve Pairings
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Select a vintage wine profile to explore our sommelier's bespoke course pairings.
          </p>
        </div>

        {/* Wine Profile Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {WINE_PREFERENCES.map((pref) => (
            <button
              key={pref.id}
              onClick={() => setSelectedPref(pref.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedPref === pref.id
                  ? 'bg-brand-red text-white shadow-md shadow-brand-red/30'
                  : 'bg-neutral-100 border border-neutral-200 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {pref.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
          {pairedDishes.map((dish) => (
            <div
              key={dish.id}
              className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-brand-red/40 hover:bg-red-50/20 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group cursor-pointer shadow-sm"
              onClick={() => {
                onClose();
                onSelectDish(dish);
              }}
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand-red font-bold">
                    {dish.category.replace('-', ' ')}
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-900">
                    {formatCurrency(dish.price, currency)}
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-neutral-900 group-hover:text-brand-red transition-colors">
                  {dish.name}
                </h4>
                
                {dish.winePairing ? (
                  <div className="flex items-start gap-2.5 text-xs text-neutral-700 mt-2 bg-white p-3 rounded-2xl border border-neutral-200">
                    <Glasses className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-neutral-900">
                        {dish.winePairing.name} ({dish.winePairing.vintage})
                      </span>
                      <span className="text-neutral-500 block text-[11px] font-sans">{dish.winePairing.region}</span>
                      <p className="text-xs text-neutral-600 italic font-serif mt-0.5">
                        “{dish.winePairing.notes}”
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500 italic mt-1">
                    Artisanal distilled botanicals &amp; zero-proof pairing
                  </p>
                )}
              </div>

              <div className="self-end sm:self-center flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                {onAddToCart && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(dish);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:scale-105"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add with Pairing
                  </button>
                )}
                <button
                  type="button"
                  className="flex items-center gap-1 text-xs text-neutral-500 font-bold hover:text-brand-red transition-colors"
                >
                  Inspect <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
