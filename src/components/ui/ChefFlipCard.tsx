'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChefSpecial } from '@/lib/types';
import { Sparkles, RotateCw, ChefHat, Flame, Utensils } from 'lucide-react';

interface ChefFlipCardProps {
  special: ChefSpecial;
  onExploreDish: (dishId: string) => void;
}

export function ChefFlipCard({ special, onExploreDish }: ChefFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000 w-full h-[480px]">
      <div
        className={`relative w-full h-full duration-700 transform-style-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl overflow-hidden bg-obsidian-900 border border-gold-primary/30 shadow-card-dark flex flex-col justify-between p-6 sm:p-8">
          {/* Background Photo */}
          <div className="absolute inset-0 z-0">
            <Image
              src={special.frontImage}
              alt={special.title}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/70 to-black/40" />
          </div>

          {/* Top Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-gold-primary text-obsidian-950 shadow-md">
              <Sparkles className="h-3 w-3" /> Seasonal Masterpiece
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(true);
              }}
              className="p-2 rounded-full bg-obsidian-900/80 text-gold-light border border-gold-primary/30 hover:bg-gold-primary hover:text-obsidian-950 transition-colors"
              title="Flip to discover culinary technique"
            >
              <RotateCw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Bottom Summary */}
          <div className="relative z-10">
            <span className="text-xs uppercase tracking-widest text-gold-light font-medium block mb-1">
              {special.subTitle}
            </span>
            <h3 className="font-serif text-2xl font-bold text-champagne mb-2 leading-tight">
              {special.title}
            </h3>
            <p className="text-xs text-neutral-300 italic mb-4 leading-relaxed line-clamp-3">
              “{special.quote}”
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-gold-primary/20">
              <div className="flex items-center gap-2">
                <ChefHat className="h-4 w-4 text-gold-primary" />
                <span className="text-xs font-serif font-medium text-neutral-200">
                  {special.chefName} · {special.chefTitle}
                </span>
              </div>
              <span className="text-[11px] text-gold-hover font-medium underline underline-offset-4">
                Tap to Flip ↻
              </span>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl overflow-hidden bg-obsidian-900 border border-gold-primary/50 shadow-gold-glow flex flex-col justify-between p-6 sm:p-8">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-obsidian-900 via-obsidian-950 to-black opacity-95" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Top Header */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-gold-primary" />
              <span className="text-[10px] uppercase tracking-widest text-gold-light font-semibold">
                Culinary Metallurgy & Craft
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              className="p-2 rounded-full bg-neutral-800 text-gold-light border border-neutral-700 hover:bg-gold-primary hover:text-obsidian-950 transition-colors"
              title="Flip back"
            >
              <RotateCw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Technique Details */}
          <div className="relative z-10 space-y-4 my-auto">
            <div>
              <h4 className="font-serif text-xl font-bold text-champagne mb-1">{special.title}</h4>
              <p className="text-xs text-neutral-400 font-sans">{special.technique}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold-light font-semibold block mb-2">
                Flavor Architecture
              </span>
              <div className="flex flex-wrap gap-1.5">
                {special.flavorProfile.map((flavor) => (
                  <span
                    key={flavor}
                    className="px-2.5 py-1 rounded-full text-[11px] bg-gold-primary/15 text-gold-hover border border-gold-primary/30"
                  >
                    ✦ {flavor}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="relative z-10 pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onExploreDish(special.dishId);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl gold-button text-xs font-semibold uppercase tracking-wider shadow-md"
            >
              <Utensils className="h-3.5 w-3.5" /> View Dish Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
