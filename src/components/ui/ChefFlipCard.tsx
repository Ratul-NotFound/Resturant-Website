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
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden bg-[#141210] border border-gold-primary/20 shadow-xl flex flex-col justify-between p-6 sm:p-8">
          {/* Background Photo */}
          <div className="absolute inset-0 z-0">
            <Image
              src={special.frontImage}
              alt={special.title}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a] via-[#0c0b0a]/70 to-black/30" />
          </div>

          {/* Top Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase bg-[#0c0b0a]/80 text-gold-light border border-gold-primary/30 backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-gold-primary" /> Signature
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(true);
              }}
              className="p-2 rounded-full bg-[#0c0b0a]/80 text-gold-light border border-gold-primary/25 hover:bg-gold-primary hover:text-[#0c0b0a] transition-colors"
              title="Flip to discover culinary technique"
            >
              <RotateCw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Bottom Summary */}
          <div className="relative z-10">
            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#91887b] block mb-1">
              {special.subTitle}
            </span>
            <h3 className="font-serif text-2xl font-light text-[#f7f4ed] mb-2 leading-tight">
              {special.title}
            </h3>
            <p className="text-xs text-[#cfc8bc]/80 italic mb-4 leading-relaxed line-clamp-3 font-light">
              “{special.quote}”
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-gold-primary/15">
              <div className="flex items-center gap-2">
                <ChefHat className="h-3.5 w-3.5 text-gold-primary" />
                <span className="text-xs font-serif text-[#cfc8bc]">
                  {special.chefName}
                </span>
              </div>
              <span className="text-[10px] font-mono text-gold-light tracking-wider uppercase">
                Tap to Reveal ↻
              </span>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden bg-[#141210] border border-gold-primary/25 shadow-xl flex flex-col justify-between p-6 sm:p-8">
          {/* Subtle Background */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#141210] via-[#0c0b0a] to-black" />

          {/* Top Header */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="h-3.5 w-3.5 text-gold-primary" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-gold-light">
                Culinary Craft
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              className="p-2 rounded-full bg-[#0c0b0a] text-gold-light border border-gold-primary/25 hover:bg-gold-primary hover:text-[#0c0b0a] transition-colors"
              title="Flip back"
            >
              <RotateCw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Technique Details */}
          <div className="relative z-10 space-y-4 my-auto">
            <div>
              <h4 className="font-serif text-xl font-light text-[#f7f4ed] mb-1">{special.title}</h4>
              <p className="text-xs text-[#91887b] font-light leading-relaxed">{special.technique}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#91887b] block mb-2">
                Flavor Architecture
              </span>
              <div className="flex flex-wrap gap-1.5">
                {special.flavorProfile.map((flavor) => (
                  <span
                    key={flavor}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-gold-primary/10 text-gold-light border border-gold-primary/20"
                  >
                    ✦ {flavor}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="relative z-10 pt-4 border-t border-gold-primary/15">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onExploreDish(special.dishId);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full gold-button text-xs font-semibold uppercase tracking-wider shadow-gold-sm"
            >
              <Utensils className="h-3.5 w-3.5" /> View Dish Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
