'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, Utensils, Star, ArrowRight, Flame, Sparkles, Clock, Wine, Users, Crown } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/formatting';
import { CurrencyCode } from '@/lib/types';

interface HeroSectionProps {
  currency?: CurrencyCode;
  onReserveClick: () => void;
  onExploreDish?: (dishId: string) => void;
  onOpenSommelier?: () => void;
}

const HERO_SHOWCASE_DISHES = [
  {
    id: 'spec-1',
    name: 'Miyazaki A5 Wagyu Ribeye',
    subtitle: 'Flame-seared over 400°C Kishu Binchotan with Périgord truffle jus',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=90',
    price: 185,
    tag: 'Chef Signature',
    blobColor: '#e8302a',
    accentBadge: '🔥 400°C Binchotan',
    spiceLevel: 'Hearth Sear 🔥',
  },
  {
    id: 'dish-08',
    name: 'Royal Wagyu & Saffron Tehari',
    subtitle: 'Aged Chinigura rice, Iranian saffron, marrow reduction & 24k gold leaf',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=90',
    price: 145,
    tag: 'Royal Provenance',
    blobColor: '#1d4ed8',
    accentBadge: '👑 Imperial Recipe',
    spiceLevel: 'Mughal Spices 🌶️',
  },
  {
    id: 'spec-2',
    name: 'Flame-Grilled Brittany Lobster',
    subtitle: 'Dayboat Brittany blue lobster with yuzu-brown butter & Oscietra caviar',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=90',
    price: 160,
    tag: 'Oceanic Cru',
    blobColor: '#059669',
    accentBadge: '🌊 24H Dayboat',
    spiceLevel: 'Citrus Yuzu Butter 🍋',
  },
];

const SPICE_HEAT_METERS = [
  { id: 'mild', label: 'Lemon & Herb 🍋', desc: 'Gentle Citrus Butter', color: 'bg-emerald-50 text-emerald-700 border-emerald-300' },
  { id: 'medium', label: 'Medium Hearth 🔥', desc: 'Smokey Binchotan', color: 'bg-amber-50 text-amber-800 border-amber-300' },
  { id: 'fiery', label: 'Fiery Binchotan 🌶️🌶️', desc: '400°C White Coal Kiss', color: 'bg-red-50 text-brand-red border-red-300' },
];

export function HeroSection({
  currency = 'USD',
  onReserveClick,
  onExploreDish,
  onOpenSommelier,
}: HeroSectionProps) {
  const [activeDishIndex, setActiveDishIndex] = useState(0);
  const [selectedHeat, setSelectedHeat] = useState('medium');
  const activeDish = HERO_SHOWCASE_DISHES[activeDishIndex];

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFeasts = () => {
    const el = document.getElementById('sharing-feasts');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-white"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 700px 500px at 15% 20%, rgba(232, 48, 42, 0.06) 0%, transparent 65%),
          radial-gradient(ellipse 600px 450px at 85% 25%, rgba(58, 125, 68, 0.05) 0%, transparent 65%),
          radial-gradient(ellipse 550px 400px at 50% 90%, rgba(245, 158, 11, 0.04) 0%, transparent 65%)
        `,
      }}
    >
      {/* Subtle Texture Grid Matrix */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* === LEFT COLUMN: HEADLINE, HEAT METER & ACTIONS === */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Michelin Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 text-white text-[11px] font-bold uppercase tracking-[0.2em] shadow-md mb-6 animate-fade-in">
              <div className="flex items-center gap-0.5 text-amber-400">
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                <Star className="h-3.5 w-3.5 fill-amber-400" />
              </div>
              <span className="text-white">Three Michelin Stars</span>
              <span className="text-neutral-400">· Manhattan Sky Sanctum</span>
            </div>

            {/* Main Creative Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-neutral-900 tracking-tight uppercase leading-[1.04] mb-6">
              FIERY, FRESH,{' '}
              <span className="text-gradient-red block sm:inline italic">
                FLAME-GRILLED
              </span>{' '}
              <span className="block text-neutral-900">HAUTE GASTRONOMIE</span>
            </h1>

            {/* Appetite-inducing narrative */}
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-xl mb-6 font-normal">
              Savor ancestral Miyazaki A5 Wagyu, aromatic royal saffron tehari, and wild Brittany seafood seared at 400°C over Japanese Kishu Binchotan, paired with 4,000 Grand Cru cellar bottles.
            </p>

            {/* Flame Heat Meter (Inspired by Galito's & Nando's) */}
            <div className="w-full max-w-xl p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 flex items-center gap-1">
                  <Flame className="h-3.5 w-3.5 text-brand-red" /> Flame &amp; Heat Intensity Scale:
                </span>
                <span className="text-xs font-bold text-neutral-900">
                  {SPICE_HEAT_METERS.find((h) => h.id === selectedHeat)?.label}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {SPICE_HEAT_METERS.map((heat) => (
                  <button
                    key={heat.id}
                    onClick={() => setSelectedHeat(heat.id)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all ${
                      selectedHeat === heat.id
                        ? `${heat.color} shadow-sm scale-[1.02]`
                        : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    <span className="block truncate">{heat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Showcase Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 rounded-2xl bg-neutral-100 border border-neutral-200">
              {HERO_SHOWCASE_DISHES.map((dish, idx) => {
                const isActive = idx === activeDishIndex;
                return (
                  <button
                    key={dish.id}
                    onClick={() => setActiveDishIndex(idx)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-white text-neutral-900 shadow-md scale-100'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
                    }`}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: dish.blobColor }}
                    />
                    <span>{dish.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onReserveClick}
                className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-sm font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all hover:scale-105 active:scale-95"
              >
                <Calendar className="h-4 w-4" />
                Reserve a Table
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={scrollToMenu}
                className="flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-sm font-bold uppercase tracking-wider border border-neutral-300 transition-all hover:border-neutral-400"
              >
                <Utensils className="h-4 w-4 text-brand-red" />
                Explore Full Menu
              </button>

              <button
                onClick={scrollToFeasts}
                className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-200 transition-colors"
              >
                <Crown className="h-4 w-4 text-amber-600" />
                Sharing Platters
              </button>
            </div>

            {/* Key Provenance Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-neutral-200 w-full max-w-2xl">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-brand-red font-serif block leading-none">400°C</span>
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold mt-1 block">Kishu Binchotan</span>
              </div>
              <div className="sm:border-l sm:border-neutral-200 sm:pl-4">
                <span className="text-2xl sm:text-3xl font-black text-[#3a7d44] font-serif block leading-none">24H</span>
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold mt-1 block">Dayboat Catch</span>
              </div>
              <div className="sm:border-l sm:border-neutral-200 sm:pl-4">
                <span className="text-2xl sm:text-3xl font-black text-[#d97706] font-serif block leading-none">4,000+</span>
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold mt-1 block">Grand Cru Bottles</span>
              </div>
              <div className="sm:border-l sm:border-neutral-200 sm:pl-4">
                <span className="text-2xl sm:text-3xl font-black text-neutral-900 font-serif block leading-none">15 Yrs</span>
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold mt-1 block">3-Star Heritage</span>
              </div>
            </div>

          </div>

          {/* === RIGHT COLUMN: DYNAMIC 3D BREAKOUT SHOWCASE === */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[440px] sm:min-h-[500px]">
            
            {/* Animated Organic Backdrop Blob */}
            <div
              className="absolute w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] rounded-full opacity-85 transition-all duration-700 pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${activeDish.blobColor} 0%, ${activeDish.blobColor}99 50%, transparent 75%)`,
                filter: 'blur(30px)',
              }}
            />

            {/* "Tastes Like Home" Sticker */}
            <div className="absolute top-0 -left-2 sm:-left-4 z-30 bg-[#ffd600] text-black font-black text-xs sm:text-sm px-3.5 py-2 rounded-2xl border-2 border-black rotate-[-8deg] shadow-lg flex items-center gap-1.5 cursor-default select-none animate-float-slow">
              <span>🏡</span> TASTES LIKE HOME
            </div>

            {/* Top Accent Provenance Badge */}
            <div className="absolute top-2 right-2 sm:right-4 z-30 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-neutral-900 font-bold text-xs shadow-lg border border-black/5 animate-float-fast">
              {activeDish.accentBadge}
            </div>

            {/* Main Interactive Round Plate */}
            <div
              onClick={() => onExploreDish && onExploreDish(activeDish.id)}
              className="relative z-20 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] cursor-pointer group transition-transform duration-500 hover:scale-105"
            >
              <div className="relative w-full h-full plate-pop-shadow">
                <Image
                  src={activeDish.image}
                  alt={activeDish.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 280px, 360px"
                  className="object-cover rounded-full border-4 border-white shadow-2xl transition-transform duration-700 group-hover:rotate-3"
                />
              </div>
            </div>

            {/* Bottom Dish Callout Card */}
            <div className="absolute -bottom-4 left-2 right-2 sm:left-4 sm:right-4 z-30 p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-neutral-100 transition-all">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-red px-2.5 py-0.5 rounded-full bg-red-50 border border-red-100">
                      {activeDish.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-neutral-900">
                      {formatCurrency(activeDish.price, currency)}
                    </span>
                  </div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-neutral-900 leading-tight">
                    {activeDish.name}
                  </h3>
                  <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5 font-normal">
                    {activeDish.subtitle}
                  </p>
                </div>
                {onExploreDish && (
                  <button
                    onClick={() => onExploreDish(activeDish.id)}
                    className="shrink-0 p-2.5 rounded-full bg-neutral-900 hover:bg-brand-red text-white shadow-sm transition-colors"
                    title="View Course Details"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================
            BOTTOM 3 CATEGORY BREAKOUT CARDS
            Classic Meals | Sharing Feasts | Starters & Cru
            ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 mt-8 border-t border-neutral-100">
          
          {/* Card 1: CLASSIC MEALS */}
          <div
            onClick={scrollToMenu}
            className="group relative bg-white border border-neutral-100 hover:border-brand-red/30 rounded-3xl p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-all duration-400 hover:-translate-y-1 cursor-pointer flex flex-col items-center"
          >
            <div className="w-24 h-24 -mt-14 mb-2 relative drop-shadow-md group-hover:scale-105 transition-transform duration-400">
              <Image
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80"
                alt="Classic Meals"
                fill
                sizes="96px"
                className="object-cover rounded-full border-4 border-white shadow-md ring-1 ring-black/5"
              />
            </div>
            <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider mt-2">
              Classic Meals
            </h3>
            <p className="text-xs text-neutral-500 mt-1 font-normal">A5 Wagyu Ribeye &amp; Binchotan Duck</p>
            <div className="mt-3 inline-flex items-center gap-1 text-brand-red text-xs font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Explore</span> <ArrowRight className="h-3 w-3" />
            </div>
          </div>

          {/* Card 2: SHARING FEASTS */}
          <div
            onClick={scrollToFeasts}
            className="group relative bg-white border border-neutral-100 hover:border-emerald-500/30 rounded-3xl p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-all duration-400 hover:-translate-y-1 cursor-pointer flex flex-col items-center"
          >
            <div className="w-24 h-24 -mt-14 mb-2 relative drop-shadow-md group-hover:scale-105 transition-transform duration-400">
              <Image
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80"
                alt="Sharing Feasts"
                fill
                sizes="96px"
                className="object-cover rounded-full border-4 border-white shadow-md ring-1 ring-black/5"
              />
            </div>
            <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider mt-2">
              Sharing Feasts
            </h3>
            <p className="text-xs text-neutral-500 mt-1 font-normal">Grand Tasting Odysseys &amp; Family Platters</p>
            <div className="mt-3 inline-flex items-center gap-1 text-emerald-600 text-xs font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Explore</span> <ArrowRight className="h-3 w-3" />
            </div>
          </div>

          {/* Card 3: STARTERS & CRU */}
          <div
            onClick={scrollToMenu}
            className="group relative bg-white border border-neutral-100 hover:border-amber-500/30 rounded-3xl p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-all duration-400 hover:-translate-y-1 cursor-pointer flex flex-col items-center"
          >
            <div className="w-24 h-24 -mt-14 mb-2 relative drop-shadow-md group-hover:scale-105 transition-transform duration-400">
              <Image
                src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=300&q=80"
                alt="Starters & Cru"
                fill
                sizes="96px"
                className="object-cover rounded-full border-4 border-white shadow-md ring-1 ring-black/5"
              />
            </div>
            <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider mt-2">
              Starters &amp; Cru
            </h3>
            <p className="text-xs text-neutral-500 mt-1 font-normal">Oscietra Caviar, Hokkaido Uni &amp; Tartare</p>
            <div className="mt-3 inline-flex items-center gap-1 text-amber-600 text-xs font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Explore</span> <ArrowRight className="h-3 w-3" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
