'use client';

import React from 'react';
import { chefSpecialsData } from '@/data/chefSpecialsData';
import { ChefFlipCard } from '../ui/ChefFlipCard';
import { Sparkles, ChefHat } from 'lucide-react';

interface ChefSpecialsSectionProps {
  onExploreDish: (dishId: string) => void;
}

export function ChefSpecialsSection({ onExploreDish }: ChefSpecialsSectionProps) {
  return (
    <section id="specials" className="relative py-24 sm:py-32 bg-obsidian-900 overflow-hidden text-neutral-300">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-96 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-primary/10 border border-gold-primary/30 text-gold-light text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="h-3.5 w-3.5 text-gold-primary" /> Master Creations
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-champagne mb-4 tracking-tight">
            Chef Brigade Signature Showcase
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
            Interactive 3D showcases revealing the secret techniques, wood-fired charring, and flavor architectures of our Executive Chefs. Tap any card to flip.
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
