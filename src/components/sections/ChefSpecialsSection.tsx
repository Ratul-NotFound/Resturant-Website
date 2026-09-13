'use client';

import React from 'react';
import { chefSpecialsData } from '@/data/chefSpecialsData';
import { ChefFlipCard } from '../ui/ChefFlipCard';
import { ChefHat, Sparkles } from 'lucide-react';

interface ChefSpecialsSectionProps {
  onExploreDish: (dishId: string) => void;
}

export function ChefSpecialsSection({ onExploreDish }: ChefSpecialsSectionProps) {
  return (
    <section id="specials" className="scroll-mt-28 relative py-24 sm:py-32 overflow-hidden" style={{ background: '#fafaf8' }}>
      
      {/* Color accent blobs */}
      <div className="absolute top-1/4 left-0 w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(232,48,42,0.07) 0%, transparent 70%)', transform: 'translate(-40%, 0)' }} />
      <div className="absolute bottom-1/4 right-0 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(13,148,136,0.07) 0%, transparent 70%)', transform: 'translate(40%, 0)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8302a]/08 border border-[#e8302a]/20 text-[#e8302a] text-[10px] uppercase tracking-[0.3em] font-bold mb-5">
            <Sparkles className="h-3 w-3" /> Brigade Signatures
          </div>
          <h2 className="headline-display text-3xl sm:text-5xl mb-5">
            Curated <span className="italic text-gradient-red">Chef Creations</span>
          </h2>
          <p className="text-[#666] text-sm leading-relaxed max-w-xl mx-auto">
            Conceived by Executive Chef Gabriel Moreau and our master brigade, marrying ancient Japanese binchotan fire with classical French culinary discipline.
          </p>
        </div>

        {/* 3 Flip Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {chefSpecialsData.map((special) => (
            <ChefFlipCard
              key={special.id}
              special={special}
              onExploreDish={onExploreDish}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
