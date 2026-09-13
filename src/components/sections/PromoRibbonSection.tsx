'use client';

import React from 'react';
import Image from 'next/image';
import { Flame, ArrowRight, Utensils, Award, Sparkles, Tag } from 'lucide-react';

interface PromoRibbonSectionProps {
  onReserveClick: () => void;
  onExploreMenuClick: () => void;
  onSelectDish: (dishId: string) => void;
}

export function PromoRibbonSection({
  onReserveClick,
  onExploreMenuClick,
  onSelectDish,
}: PromoRibbonSectionProps) {
  return (
    <section className="relative z-10 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-4">

      {/* Scrolling Marquee Strip (like reference websites) */}
      <div className="overflow-hidden rounded-2xl bg-[#111] text-white py-3 mb-8 shadow-lg">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, groupIdx) => (
            <span key={groupIdx} className="flex items-center">
              {[
                '🔥 Now Serving Dinner',
                '⭐ Three Michelin Stars',
                '🌿 100% Traceable Provenance',
                '🍷 4,000+ Grand Cru Cellar',
                '🥩 A5 Ozaki Wagyu',
                '🐟 24H Dayboat Brittany Seafood',
                '🏆 #1 Fine Dining NYC',
                '🕯️ Private Dining Available',
                '🌶️ Kishu Binchotan 400°C',
              ].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-3 px-8 text-xs font-semibold uppercase tracking-widest">
                  {item}
                  <span className="text-[#e8302a]">◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* 3 Promo Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* CARD 1: ROYAL BLUE – Wagyu Tehari */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1d4ed8] via-[#1e40af] to-[#1e3a8a] p-6 sm:p-7 text-white shadow-2xl flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5"
          style={{ boxShadow: '0 20px 60px rgba(29, 78, 216, 0.35)' }}
        >
          {/* Blob accent */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(96, 165, 250, 0.2)' }} />
          {/* Top sticker */}
          <div className="absolute top-3 right-3 sticker-yellow px-2.5 py-1 rounded-lg text-[9px] font-black uppercase">
            🏆 Chef's Pick
          </div>

          <div className="relative z-10 pr-24 sm:pr-28">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[10px] font-bold tracking-widest uppercase mb-3 text-blue-100 border border-white/20">
              <Award className="h-3 w-3 text-yellow-300" /> Royal Provenance
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-black uppercase tracking-wide leading-tight mb-2">
              Royal Wagyu &amp; Saffron Tehari
            </h3>
            <p className="text-xs text-blue-100/90 line-clamp-2 mb-6">
              Miyazaki A5 Wagyu shank braised in Chinigura aged rice, Iranian saffron, and gold leaf.
            </p>
          </div>

          <div className="relative z-10">
            <button
              onClick={() => onSelectDish('dish-08')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-blue-900 font-black text-xs uppercase tracking-wider transition-all hover:bg-yellow-300 hover:text-blue-900 shadow-lg"
            >
              Taste Dish <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Floating plate */}
          <div className="absolute -bottom-5 -right-8 w-44 h-44 sm:w-52 sm:h-52 plate-pop-shadow pointer-events-none group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
            <Image
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=85"
              alt="Royal Wagyu"
              fill
              sizes="220px"
              className="object-cover rounded-full"
              style={{ border: '5px solid rgba(255,255,255,0.3)' }}
            />
          </div>
        </div>

        {/* CARD 2: SIGNAL RED – Binchotan Platter */}
        <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 text-white shadow-2xl flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5"
          style={{
            background: 'linear-gradient(135deg, #e8302a 0%, #c0281f 50%, #991b1b 100%)',
            boxShadow: '0 20px 60px rgba(232, 48, 42, 0.4)',
          }}
        >
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl" style={{ background: 'rgba(255, 150, 100, 0.2)' }} />
          <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full blur-2xl" style={{ background: 'rgba(0,0,0,0.2)' }} />

          <div className="relative z-10 pr-24 sm:pr-28">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 text-[10px] font-bold tracking-widest uppercase mb-3 text-red-100 border border-white/20">
              <Flame className="h-3 w-3 text-yellow-300" /> 400°C Binchotan
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-black uppercase tracking-wide leading-tight mb-2">
              Charcoal Hearth Platter
            </h3>
            <p className="text-xs text-red-100/90 line-clamp-2 mb-6">
              Japanese white oak embers searing Challans Duck, truffled tare glaze, and charred leeks.
            </p>
          </div>

          <div className="relative z-10">
            <button
              onClick={() => onSelectDish('dish-07')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-red-900 font-black text-xs uppercase tracking-wider transition-all hover:bg-yellow-300 hover:text-red-900 shadow-lg"
            >
              Order Platter <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="absolute -bottom-5 -right-8 w-44 h-44 sm:w-52 sm:h-52 plate-pop-shadow pointer-events-none group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
            <Image
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=85"
              alt="Binchotan Platter"
              fill
              sizes="220px"
              className="object-cover rounded-full"
              style={{ border: '5px solid rgba(255,255,255,0.3)' }}
            />
          </div>
        </div>

        {/* CARD 3: WHITE ALABASTER – Explore Food */}
        <div className="relative overflow-hidden rounded-3xl bg-[#fffbf0] border border-amber-200 p-6 sm:p-7 text-[#111] shadow-2xl flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl" style={{ background: 'rgba(245, 158, 11, 0.12)' }} />

          {/* Doodle sticker */}
          <div className="absolute top-4 right-4 sticker-yellow px-2.5 py-1.5 rounded-xl text-[9px] font-black uppercase shadow-lg">
            ✨ Chef's Odyssey
          </div>

          <div className="relative z-10">
            <div className="h-12 w-12 rounded-2xl bg-amber-100 flex items-center justify-center mb-4 shadow-inner group-hover:scale-110 transition-transform">
              <Utensils className="h-6 w-6 text-amber-700" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-black uppercase tracking-wide text-[#111] mb-2">
              Explore The Tasting
            </h3>
            <p className="text-[12px] text-[#666] leading-relaxed mb-5">
              10 culinary movements curated across Brittany dayboat catch, Alba truffles, and Grand Cru pairings.
            </p>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-1 rounded-lg bg-amber-100 text-amber-800 text-[9px] font-bold uppercase tracking-wide">10 Courses</span>
              <span className="px-2 py-1 rounded-lg bg-red-50 text-red-700 text-[9px] font-bold uppercase tracking-wide">Grand Crus Paired</span>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3 mt-5">
            <button
              onClick={onExploreMenuClick}
              className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider"
            >
              Full Menu <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={onReserveClick}
              className="px-4 py-2.5 rounded-full border-2 border-[#111] text-[#111] text-xs font-bold uppercase tracking-wider hover:bg-[#111] hover:text-white transition-all"
            >
              Reserve
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
