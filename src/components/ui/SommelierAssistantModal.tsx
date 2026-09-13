'use client';

import React, { useState } from 'react';
import { MenuItem } from '@/lib/types';
import { menuData } from '@/data/menuData';
import { X, Wine, Sparkles, Compass, CheckCircle2, ChevronRight, Glasses } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/formatting';

interface SommelierAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDish: (item: MenuItem) => void;
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
  { id: 'all', label: 'Complete Sommelier List', desc: 'Browse all 30 paired allocations' },
  { id: 'champagne', label: 'Vintage Champagne & Sparkling', desc: 'Dom Pérignon 2013, Krug Grande Cuvée' },
  { id: 'burgundy-white', label: 'Grand Cru Mineral Whites', desc: 'Chablis Les Clos, Meursault Perrières, Puligny-Montrachet' },
  { id: 'bordeaux-red', label: 'Aristocratic Left & Right Bank', desc: 'Château Margaux 2010, Opus One Napa Valley' },
  { id: 'piedmont-red', label: 'Italian Barolo & Barbaresco', desc: 'Monfortino Conterno 2015, Sorì Tildìn Gaja' },
  { id: 'sweet-botrytis', label: 'Liquid Gold Dessert Nectars', desc: 'Château d’Yquem 2016, Tokaji Aszú 6 Puttonyos' },
  { id: 'zero-proof', label: 'Artisanal Non-Alcoholic Pairing', desc: 'Distilled Botanicals, Cold-Drip Jasmine & Yuzu Clouds' },
];

export function SommelierAssistantModal({
  isOpen,
  onClose,
  onSelectDish,
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
    if (selectedPref === 'zero-proof') return item.category === 'cocktails' && item.dietary.includes('halal');
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-4xl my-auto rounded-3xl bg-obsidian-900 border border-gold-primary/40 shadow-2xl p-6 sm:p-8 animate-slide-up flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          aria-label="Close sommelier assistant"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold-light font-semibold mb-1">
            <Wine className="h-4 w-4 text-gold-primary" /> 4,000-Bottle Reserve Cellar
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-champagne">
            Grand Sommelier Pairing Engine
          </h2>
          <p className="text-xs text-neutral-400">
            Select your preferred vintage wine profile to discover its harmonious Michelin course pairing.
          </p>
        </div>

        {/* Wine Profile Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {WINE_PREFERENCES.map((pref) => (
            <button
              key={pref.id}
              onClick={() => setSelectedPref(pref.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedPref === pref.id
                  ? 'bg-gold-primary text-obsidian-950 shadow-gold-sm'
                  : 'bg-obsidian-950 border border-neutral-800 text-neutral-300 hover:border-neutral-700'
              }`}
            >
              {pref.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {pairedDishes.map((dish) => (
            <div
              key={dish.id}
              className="p-5 rounded-2xl bg-obsidian-950 border border-neutral-800 hover:border-gold-primary/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group cursor-pointer"
              onClick={() => {
                onClose();
                onSelectDish(dish);
              }}
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-gold-light font-semibold">
                    {dish.category.replace('-', ' ')}
                  </span>
                  <span className="text-xs font-serif font-bold text-gold-primary">
                    {formatCurrency(dish.price)}
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-champagne group-hover:text-gold-hover transition-colors">
                  {dish.name}
                </h4>
                
                {dish.winePairing ? (
                  <div className="flex items-start gap-2 text-xs text-neutral-300 mt-2 bg-gold-primary/5 p-2.5 rounded-xl border border-gold-primary/15">
                    <Glasses className="h-4 w-4 text-gold-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-serif font-semibold text-gold-hover">
                        {dish.winePairing.name} ({dish.winePairing.vintage})
                      </span>
                      <span className="text-neutral-400 block text-[11px]">{dish.winePairing.region}</span>
                      <p className="text-[11px] text-neutral-400 italic mt-0.5">
                        “{dish.winePairing.notes}”
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-neutral-400 italic mt-1">
                    Artisanal distilled botanicals & zero-proof pairing
                  </p>
                )}
              </div>

              <button
                type="button"
                className="self-end sm:self-center flex items-center gap-1 text-xs text-gold-hover font-semibold shrink-0 group-hover:translate-x-1 transition-transform"
              >
                Inspect Course <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
