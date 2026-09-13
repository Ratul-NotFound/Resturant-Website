'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MenuItem, CurrencyCode } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/formatting';
import { Crown, Users, Flame, Plus, Sparkles, Check, ArrowRight, Wine, ShieldCheck } from 'lucide-react';

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
  badgeColor: string;
  image: string;
  basePrice: number; // 4P base price
  servings: string;
  itemsIncluded: string[];
  spiceHeat: string;
  bestFor: string;
  menuItem: MenuItem;
}

const PLATTER_FEASTS: PlatterFeast[] = [
  {
    id: 'feast-1',
    title: 'The Emperor’s Royal Feast (4 Persons)',
    subtitle: 'Miyazaki A5 Wagyu Ribeye, 24K Saffron Tehari, Flame-Grilled Brittany Lobster & Spiced Borhani',
    badge: '👑 ROYAL BESTSELLER',
    badgeColor: 'bg-amber-400 text-black',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=90',
    basePrice: 380,
    servings: 'Serves 4–5 Guests',
    spiceHeat: 'Medium Binchotan Flame 🔥🔥',
    bestFor: 'Family Gatherings & Grand Celebrations',
    itemsIncluded: [
      '500g Miyazaki A5 Wagyu Ribeye (400°C Binchotan seared)',
      'Royal Iranian Saffron Chinigura Tehari with marrow jus',
      'Whole Brittany Blue Lobster with Yuzu butter',
      '4x Shahi Pistachio Borhani Elixirs & 24K Gold Firni',
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
      terroirBadge: 'Miyazaki & Brittany Provenance',
      chromaTheme: 'ember',
    },
  },
  {
    id: 'feast-2',
    title: 'Flame & Hearth Duo Platter (2 Persons)',
    subtitle: 'Kishu Binchotan Challans Duck, Grilled Tiger Prawns, Truffle Pomme Frites & Grand Cru Pairing',
    badge: '🔥 FLAME DUO (-35% TODAY)',
    badgeColor: 'bg-brand-red text-white',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=90',
    basePrice: 220,
    servings: 'Serves 2 Guests',
    spiceHeat: 'Mild Herb & Smoked Garlic 🌿',
    bestFor: 'Romantic Dates & Intimate Dinners',
    itemsIncluded: [
      'Glazed Challans Duck Breast with sour cherry gastrique',
      'Jumbo Wild Brittany Tiger Prawns with garlic butter',
      'Hand-Cut Périgord Black Truffle Pomme Frites',
      '2x Glasses 2018 Domaine Leflaive Puligny-Montrachet',
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
      terroirBadge: 'Vendée & Brittany Coast',
      chromaTheme: 'ocean',
    },
  },
  {
    id: 'feast-3',
    title: 'Imperial Gala Banquet Platter (8 Persons)',
    subtitle: 'Full Imperial Banquet: Tomahawk A5 Wagyu, Double Saffron Dum Degchi, Caviar Service & Champagne',
    badge: '⭐ VIP CHEF TABLE',
    badgeColor: 'bg-emerald-600 text-white',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=90',
    basePrice: 750,
    servings: 'Serves 8–10 Guests',
    spiceHeat: 'Custom Heat Level on Request 🌶️🔥',
    bestFor: 'Executive Board Dinners & VIP Galas',
    itemsIncluded: [
      '1.2kg Miyazaki A5 Wagyu Tomahawk on Bone',
      'Full Mughal Handi Dum Saffron Tehari with lamb shank',
      '50g Royal Oscietra Caviar service with blinis',
      'Bottle of 2013 Dom Pérignon Vintage Champagne',
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
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(232,48,42,0.06) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full pointer-events-none opacity-50"
        style={{ background: 'radial-gradient(circle, rgba(58,125,68,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-600 text-white shadow-md flex items-center gap-1.5">
              <Crown className="h-3.5 w-3.5 text-amber-300" />
              Royal Sharing Feasts &amp; Platters
            </span>
            <span className="text-xs text-neutral-500 font-bold">· Inspired by Mughal Heritage &amp; Galito's</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight uppercase mb-4">
            Sharing Platters &amp;{' '}
            <span className="text-gradient-red italic">Celebration Feasts</span>
          </h2>

          <p className="text-neutral-600 text-sm leading-relaxed max-w-xl mx-auto font-normal">
            Designed for unforgettable family feasts and executive tables. Complete course bundles with artisanal pairings, binchotan meats, and royal dum tehari.
          </p>
        </div>

        {/* 3 Featured Sharing Platter Cards */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {PLATTER_FEASTS.map((feast) => {
            const originalPrice = Math.round(feast.basePrice * 1.35); // 35% strike-through savings
            const isAdded = addedAnimId === feast.id;

            return (
              <div
                key={feast.id}
                className="group relative flex flex-col justify-between rounded-3xl bg-white border-2 border-neutral-200/80 hover:border-brand-red/50 hover:shadow-2xl transition-all duration-500 p-6 sm:p-7 shadow-lg"
              >
                {/* Top Badge Sticker */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${feast.badgeColor}`}>
                    {feast.badge}
                  </span>
                  <span className="text-xs font-bold text-neutral-500 flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-brand-red" /> {feast.servings}
                  </span>
                </div>

                {/* 3D Round Food Breakout */}
                <div
                  className="relative mx-auto w-52 h-52 sm:w-56 sm:h-56 cursor-pointer my-2 z-20"
                  onClick={() => onSelectDish(feast.menuItem)}
                >
                  <div className="relative w-full h-full plate-pop-shadow">
                    <Image
                      src={feast.image}
                      alt={feast.title}
                      fill
                      sizes="(max-width: 768px) 208px, 224px"
                      className="object-cover rounded-full border-4 border-white shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-neutral-900/90 backdrop-blur-md text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-400/30 shadow-md">
                      {feast.spiceHeat.split(' ')[0]}
                    </div>
                  </div>
                </div>

                {/* Platter Info */}
                <div className="space-y-3 mt-4">
                  <h3
                    onClick={() => onSelectDish(feast.menuItem)}
                    className="font-serif text-xl font-bold text-neutral-900 group-hover:text-brand-red transition-colors cursor-pointer leading-snug"
                  >
                    {feast.title}
                  </h3>

                  <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                    {feast.subtitle}
                  </p>

                  {/* Included Items Checklist */}
                  <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1.5">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-bold mb-1">
                      Everything Included in Platter:
                    </span>
                    {feast.itemsIncluded.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                        <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & 1-Click Add Action */}
                <div className="pt-5 mt-5 border-t border-neutral-100 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-neutral-400 line-through font-mono">
                      {formatCurrency(originalPrice, currency)}
                    </div>
                    <div className="font-serif text-2xl font-black text-brand-red leading-none">
                      {formatCurrency(feast.basePrice, currency)}
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold uppercase block mt-1">
                      Save 35% Bundle Deal
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAddPlatter(feast)}
                      className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md ${
                        isAdded
                          ? 'bg-emerald-600 text-white scale-95'
                          : 'bg-brand-red hover:bg-brand-redDark text-white hover:shadow-brand-red/40 hover:-translate-y-0.5'
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                      {isAdded ? 'Added!' : 'Add Platter'}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner: Custom Banquets & Table Reservations */}
        <div className="mt-16 p-7 sm:p-9 rounded-3xl bg-neutral-900 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="h-3.5 w-3.5" /> Host an Imperial Feast
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
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all hover:scale-105 active:scale-95"
            >
              Reserve a Private Salon
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
