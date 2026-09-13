'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChefSpecial } from '@/lib/types';
import { ChefHat, Flame, Utensils, Sparkles } from 'lucide-react';

interface ChefFlipCardProps {
  special: ChefSpecial;
  onExploreDish: (dishId: string) => void;
}

export function ChefFlipCard({ special, onExploreDish }: ChefFlipCardProps) {
  const [activeTab, setActiveTab] = useState<'dish' | 'craft'>('dish');

  return (
    <div className="w-full h-[520px] rounded-3xl overflow-hidden bg-white border border-neutral-100 hover:border-brand-red/30 transition-all duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(232,48,42,0.08)] flex flex-col justify-between group">
      
      {/* Top Media or Technique Panel */}
      <div className="relative w-full h-64 overflow-hidden bg-neutral-100">
        {activeTab === 'dish' ? (
          <>
            <Image
              src={special.frontImage}
              alt={special.title}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 p-6 flex flex-col justify-between bg-neutral-900 text-white">
            <div>
              <div className="flex items-center gap-1.5 text-red-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2.5">
                <Flame className="h-3.5 w-3.5 text-brand-red" /> Hearth &amp; Technique
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                {special.technique}
              </p>
            </div>

            <div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-bold block mb-2">
                Flavor Architecture &amp; Notes
              </span>
              <div className="flex flex-wrap gap-1.5">
                {special.flavorProfile.map((flavor) => (
                  <span
                    key={flavor}
                    className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/10 text-neutral-200 border border-white/10"
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
          <div className="flex items-center p-0.5 rounded-full bg-white/90 backdrop-blur-md border border-black/5 text-[10px] shadow-sm">
            <button
              onClick={() => setActiveTab('dish')}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                activeTab === 'dish'
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Dish
            </button>
            <button
              onClick={() => setActiveTab('craft')}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                activeTab === 'craft'
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Craft
            </button>
          </div>
        </div>

        {/* Chef Credit Badge */}
        <div className="absolute bottom-3 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] bg-white/95 text-neutral-900 border border-black/5 backdrop-blur-md font-bold shadow-sm">
            <ChefHat className="h-3 w-3 text-brand-red" /> {special.chefName}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold mb-1.5">
            <Sparkles className="h-3 w-3 text-brand-red" />
            {special.subTitle}
          </div>

          <h3 className="font-serif text-xl font-bold text-neutral-900 group-hover:text-brand-red transition-colors mb-2 leading-snug">
            {special.title}
          </h3>

          <p className="text-xs text-neutral-500 italic font-serif leading-relaxed line-clamp-3 font-normal mb-4">
            &ldquo;{special.quote}&rdquo;
          </p>
        </div>

        <div className="pt-3 border-t border-neutral-100">
          <button
            onClick={() => onExploreDish(special.dishId)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-neutral-50 hover:bg-brand-red text-neutral-800 hover:text-white border border-neutral-200 hover:border-brand-red text-xs font-bold uppercase tracking-wider transition-all duration-300"
          >
            <Utensils className="h-3.5 w-3.5" /> View Course Composition
          </button>
        </div>
      </div>
    </div>
  );
}
