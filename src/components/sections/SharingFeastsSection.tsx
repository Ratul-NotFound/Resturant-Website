'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MenuItem, CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatting';
import { Crown, Users, Plus, Check, Sparkles, Flame } from 'lucide-react';

interface SharingFeastsSectionProps {
  currency?: CurrencyCode;
  onAddToCart: (dish: MenuItem) => void;
  onSelectDish: (dish: MenuItem) => void;
  onReserveTable: () => void;
}

interface PlatterFeast {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  basePrice: number;
  servings: string;
  itemsIncluded: string[];
  spiceHeat: string;
  menuItem: MenuItem;
}

const PLATTER_FEASTS: PlatterFeast[] = [
  {
    id: 'feast-1',
    title: 'The Emperor’s Royal Feast (4P)',
    subtitle: 'Miyazaki A5 Wagyu Ribeye, 24K Saffron Tehari, Brittany Lobster & Spiced Borhani',
    badge: '👑 Royal Bestseller',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=90',
    basePrice: 380,
    servings: 'Serves 4–5 Guests',
    spiceHeat: 'Medium Flame 🔥',
    itemsIncluded: [
      '500g Miyazaki A5 Wagyu Ribeye',
      'Royal Iranian Saffron Chinigura Tehari',
      'Whole Brittany Blue Lobster',
      '4x Shahi Pistachio Borhani Elixirs',
    ],
    menuItem: {
      id: 'platter-emperor',
      name: 'The Emperor’s Royal Feast (4P)',
      slug: 'emperors-royal-feast',
      category: 'prime-cuts',
      price: 380,
      description: 'Grand family feast featuring Miyazaki A5 Wagyu Ribeye, 24K Saffron Chinigura Tehari, whole Brittany Blue Lobster, and artisanal spiced Borhani.',
      shortDesc: 'A5 Wagyu, Saffron Tehari, Brittany Lobster & Borhani for 4-5 guests',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=90',
      ingredients: ['A5 Wagyu', 'Iranian Saffron', 'Chinigura Rice', 'Brittany Lobster', 'Périgord Truffle', 'Pistachio Borhani'],
      dietary: ['halal'],
      allergens: ['Crustaceans', 'Dairy'],
      isChefSpecial: true,
      isPopular: true,
      terroirBadge: 'Miyazaki & Brittany',
      chromaTheme: 'ember',
    },
  },
  {
    id: 'feast-2',
    title: 'Flame & Hearth Duo Platter (2P)',
    subtitle: 'Kishu Binchotan Challans Duck, Grilled Tiger Prawns & Truffle Pomme Frites',
    badge: '🔥 Flame Duo (-35%)',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=90',
    basePrice: 220,
    servings: 'Serves 2 Guests',
    spiceHeat: 'Mild Herb 🌿',
    itemsIncluded: [
      'Glazed Challans Duck Breast',
      'Jumbo Wild Brittany Tiger Prawns',
      'Périgord Black Truffle Pomme Frites',
      '2x Grand Cru Wine Pairings',
    ],
    menuItem: {
      id: 'platter-hearth-duo',
      name: 'Flame & Hearth Duo Platter (2P)',
      slug: 'flame-hearth-duo',
      category: 'ocean',
      price: 220,
      description: 'Romantic 2-person feast with Challans duck breast, flame-grilled tiger prawns, truffle fries, and Grand Cru Burgundy wine pairings.',
      shortDesc: 'Challans Duck, Tiger Prawns & Truffle Fries for 2 guests',
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=90',
      ingredients: ['Challans Duck', 'Tiger Prawns', 'Black Truffle', 'Yuzu', 'Garlic Herb Butter'],
      dietary: ['halal', 'gluten-free'],
      allergens: ['Crustaceans', 'Dairy'],
      isChefSpecial: true,
      isPopular: true,
      terroirBadge: 'Vendée Coast',
      chromaTheme: 'ocean',
    },
  },
  {
    id: 'feast-3',
    title: 'Imperial Gala Banquet Platter (8P)',
    subtitle: 'Tomahawk A5 Wagyu, Double Saffron Dum Degchi, Caviar Service & Vintage Champagne',
    badge: '⭐ VIP Gala Table',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=90',
    basePrice: 750,
    servings: 'Serves 8–10 Guests',
    spiceHeat: 'Custom Heat 🌶️',
    itemsIncluded: [
      '1.2kg Miyazaki A5 Wagyu Tomahawk',
      'Full Mughal Handi Dum Saffron Tehari',
      '50g Royal Oscietra Caviar service',
      'Bottle 2013 Dom Pérignon Vintage',
    ],
    menuItem: {
      id: 'platter-imperial-gala',
      name: 'Imperial Gala Banquet Platter (8P)',
      slug: 'imperial-gala-banquet',
      category: 'prime-cuts',
      price: 750,
      description: 'The ultimate VIP sharing banquet for 8-10 guests with 1.2kg Wagyu Tomahawk, full Mughal Handi Dum Tehari, Oscietra Caviar, and Dom Pérignon Champagne.',
      shortDesc: '1.2kg Tomahawk, Full Dum Handi & Dom Pérignon for 8-10 guests',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=90',
      ingredients: ['A5 Wagyu Tomahawk', 'Oscietra Caviar', 'Dom Pérignon', 'Iranian Saffron', 'Kashmir Morels'],
      dietary: ['halal'],
      allergens: ['Fish', 'Dairy', 'Gluten'],
      isChefSpecial: true,
      isPopular: true,
      terroirBadge: 'Imperial Reserve',
      chromaTheme: 'saffron',
    },
  },
];

export function SharingFeastsSection({
  currency = 'USD',
  onAddToCart,
  onSelectDish,
  onReserveTable,
}: SharingFeastsSectionProps) {
  const [addedAnimId, setAddedAnimId] = useState<string | null>(null);

  const handleAddPlatter = (feast: PlatterFeast) => {
    setAddedAnimId(feast.id);
    setTimeout(() => setAddedAnimId(null), 700);
    onAddToCart(feast.menuItem);
  };

  return (
    <section id="sharing-feasts" className="scroll-mt-28 relative py-24 sm:py-32 overflow-hidden bg-[#fafaf8]">
      
      {/* Background radial glow */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(232,48,42,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-brand-red border border-red-200 text-xs font-bold uppercase tracking-wider mb-4">
            <Crown className="h-3.5 w-3.5" />
            Curated Sharing Platters
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight uppercase mb-4">
            Celebration Feasts &amp;{' '}
            <span className="text-gradient-red italic">Royal Platters</span>
          </h2>

          <p className="text-neutral-600 text-sm leading-relaxed max-w-xl mx-auto font-normal">
            Designed for memorable gatherings. Complete sharing courses with binchotan-seared meats, royal tehari, and cellar pairings.
          </p>
        </div>

        {/* 3 Featured Clean Minimalist Sharing Platter Cards */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {PLATTER_FEASTS.map((feast) => {
            const originalPrice = Math.round(feast.basePrice * 1.35);
            const isAdded = addedAnimId === feast.id;

            return (
              <div
                key={feast.id}
                className="group relative flex flex-col justify-between rounded-3xl bg-white border border-neutral-100 hover:border-brand-red/30 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all duration-400 p-7"
              >
                {/* Top Meta Bar */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-700">
                    {feast.badge}
                  </span>
                  <span className="text-xs font-semibold text-neutral-500 flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-brand-red" /> {feast.servings}
                  </span>
                </div>

                {/* Creative Floating Plate Image */}
                <div
                  className="relative mx-auto my-4 w-48 h-48 sm:w-52 sm:h-52 cursor-pointer z-10"
                  onClick={() => onSelectDish(feast.menuItem)}
                >
                  <div className="relative w-full h-full rounded-full p-2 bg-neutral-50 ring-1 ring-black/5 group-hover:ring-brand-red/20 transition-all duration-500">
                    <Image
                      src={feast.image}
                      alt={feast.title}
                      fill
                      sizes="(max-width: 768px) 192px, 208px"
                      className="object-cover rounded-full transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3 mt-2">
                  <h3
                    onClick={() => onSelectDish(feast.menuItem)}
                    className="font-serif text-lg sm:text-xl font-bold text-neutral-900 group-hover:text-brand-red transition-colors cursor-pointer leading-snug"
                  >
                    {feast.title}
                  </h3>

                  <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                    {feast.subtitle}
                  </p>

                  {/* Included Items Minimalist List */}
                  <div className="pt-3 border-t border-neutral-100 space-y-1.5">
                    {feast.itemsIncluded.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-600">
                        <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Clean Action Button */}
                <div className="pt-5 mt-5 border-t border-neutral-100 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] text-neutral-400 line-through font-mono">
                      {formatCurrency(originalPrice, currency)}
                    </div>
                    <div className="font-serif text-2xl font-black text-neutral-900 group-hover:text-brand-red transition-colors leading-none">
                      {formatCurrency(feast.basePrice, currency)}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddPlatter(feast)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm ${
                      isAdded
                        ? 'bg-emerald-600 text-white scale-95'
                        : 'bg-neutral-900 hover:bg-brand-red text-white hover:shadow-md'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add Platter</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner: Custom Banquets & Table Reservations */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-neutral-900 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="h-3.5 w-3.5" /> Private Celebrations
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Planning a Gala, Corporate Dinner, or Family Event?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl font-normal">
              Our culinary director customizes multi-course sharing menus with private room allocations in the Grand Atrium or Obsidian Vault.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={onReserveTable}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all hover:scale-105 active:scale-95"
            >
              Reserve a Private Salon
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

