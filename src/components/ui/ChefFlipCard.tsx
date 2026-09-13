'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChefSpecial } from '@/lib/types';
import { ChefHat, Flame, Utensils } from 'lucide-react';

interface ChefFlipCardProps {
  special: ChefSpecial;
  onExploreDish: (dishId: string) => void;
}

export function ChefFlipCard({ special, onExploreDish }: ChefFlipCardProps) {
  const [activeTab, setActiveTab] = useState<'dish' | 'craft'>('dish');

  const themeConfig = {
    'dish-07': {
      border: 'border-rose-500/30 hover:border-rose-500/60',
      shadow: 'hover:shadow-glow-ember',
      tagBg: 'bg-rose-950/70 text-rose-200 border-rose-500/30',
      chipBg: 'bg-rose-950/40 text-rose-300 border-rose-500/20',
      btn: 'hover:border-rose-500 hover:text-rose-300',
    },
    'dish-15': {
      border: 'border-teal-500/30 hover:border-teal-500/60',
      shadow: 'hover:shadow-glow-ocean',
      tagBg: 'bg-teal-950/70 text-teal-200 border-teal-500/30',
      chipBg: 'bg-teal-950/40 text-teal-300 border-teal-500/20',
      btn: 'hover:border-teal-500 hover:text-teal-300',
    },
    'dish-19': {
      border: 'border-amber-500/30 hover:border-amber-500/60',
      shadow: 'hover:shadow-glow-saffron',
      tagBg: 'bg-amber-950/70 text-amber-200 border-amber-500/30',
      chipBg: 'bg-amber-950/40 text-amber-300 border-amber-500/20',
      btn: 'hover:border-amber-500 hover:text-amber-300',
    },
  }[special.dishId] || {
    border: 'border-white/15 hover:border-gold-primary/60',
    shadow: 'hover:shadow-gold-glow',
    tagBg: 'bg-gold-primary/10 text-gold-light border-gold-primary/30',
    chipBg: 'bg-white/5 text-neutral-300 border-white/10',
    btn: 'hover:border-gold-primary hover:text-gold-hover',
  };

  return (
    <div className={`w-full h-[540px] rounded-3xl overflow-hidden bg-[#131110] border ${themeConfig.border} ${themeConfig.shadow} transition-all duration-500 shadow-2xl flex flex-col justify-between group`}>
      
      {/* Top Media or Technique Panel */}
      <div className="relative w-full h-64 overflow-hidden bg-[#0c0b0a]">
        {activeTab === 'dish' ? (
          <>
            <Image
              src={special.frontImage}
              alt={special.title}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/30 to-black/30" />
          </>
        ) : (
          <div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-b from-[#1c1916] to-[#141210]">
            <div>
              <div className="flex items-center gap-1.5 text-gold-light text-[10px] font-medium uppercase tracking-[0.2em] mb-2">
                <Flame className="h-3 w-3 text-gold-primary" /> Hearth & Technique
              </div>
              <p className="text-xs text-[#cfc8bc] leading-relaxed font-light">
                {special.technique}
              </p>
            </div>

            <div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#91887b] block mb-1.5">
                Flavor Architecture & Balance
              </span>
              <div className="flex flex-wrap gap-1.5">
                {special.flavorProfile.map((flavor) => (
                  <span
                    key={flavor}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] border font-light ${themeConfig.chipBg}`}
                  >
                    {flavor}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* View Toggle Capsule */}
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center p-0.5 rounded-full bg-[#0c0b0a]/85 border border-gold-primary/25 backdrop-blur-md text-[10px]">
            <button
              onClick={() => setActiveTab('dish')}
              className={`px-3 py-1 rounded-full transition-all ${
                activeTab === 'dish'
                  ? 'bg-gold-primary text-[#0c0b0a] font-medium'
                  : 'text-[#91887b] hover:text-[#f7f4ed]'
              }`}
            >
              Dish
            </button>
            <button
              onClick={() => setActiveTab('craft')}
              className={`px-3 py-1 rounded-full transition-all ${
                activeTab === 'craft'
                  ? 'bg-gold-primary text-[#0c0b0a] font-medium'
                  : 'text-[#91887b] hover:text-[#f7f4ed]'
              }`}
            >
              Craft
            </button>
          </div>
        </div>

        {/* Chef Credit Badge */}
        <div className="absolute bottom-3 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] bg-[#0c0b0a]/90 text-[#cfc8bc] border border-white/10 backdrop-blur-md font-light">
            <ChefHat className="h-3 w-3 text-gold-primary" /> {special.chefName} · {special.chefTitle.split('&')[0]}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#91887b] block mb-1">
            {special.subTitle}
          </span>
          <h3 className="font-serif text-xl font-light text-[#f7f4ed] mb-2 leading-snug">
            {special.title}
          </h3>
          <p className="text-xs text-[#cfc8bc]/80 italic font-serif leading-relaxed line-clamp-3 font-light mb-4">
            “{special.quote}”
          </p>
        </div>

        <div className="pt-3 border-t border-gold-primary/10">
          <button
            onClick={() => onExploreDish(special.dishId)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full gold-button-outline text-xs font-medium uppercase tracking-[0.15em] hover:border-gold-primary transition-all"
          >
            <Utensils className="h-3 w-3 text-gold-primary" /> View Menu Allocation
          </button>
        </div>
      </div>
    </div>
  );
}
