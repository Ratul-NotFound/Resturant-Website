'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, Utensils, Award, Sparkles, ChevronDown } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/restaurantConfig';

interface HeroSectionProps {
  onReserveClick: () => void;
}

export function HeroSection({ onReserveClick }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#0c0b0a]">
      
      {/* Background High-Resolution Photography with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=90"
          alt="AURA Grand Atrium"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 animate-pulse-subtle"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0b0a]/90 via-[#0c0b0a]/75 to-[#0c0b0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(12,11,10,0.85)_100%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Understated Michelin Accolade Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141210]/70 border border-gold-primary/25 backdrop-blur-md mb-8 animate-fade-in">
          <Award className="h-3.5 w-3.5 text-gold-primary" />
          <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-gold-light font-mono">
            Three Michelin Stars · 2025 Edition
          </span>
        </div>

        {/* Sculptural Brand Title */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.25em] text-[#f7f4ed] mb-6 leading-none select-none">
          A U R A
        </h1>

        {/* Clean Poetic Subtitle */}
        <p className="font-serif text-base sm:text-xl md:text-2xl italic text-[#cfc8bc] font-light max-w-2xl mx-auto leading-relaxed mb-10">
          “An uncompromising symphony of oceanic purity, Binchotan hearth, and subterranean cellar reserves.”
        </p>

        {/* Minimalist Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <button
            onClick={onReserveClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full gold-button text-xs font-semibold uppercase tracking-widest shadow-gold-sm"
          >
            <Calendar className="h-3.5 w-3.5" /> Reserve a Table
          </button>
          
          <a
            href="#menu"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full gold-button-outline text-xs font-semibold uppercase tracking-widest backdrop-blur-sm"
          >
            <Utensils className="h-3.5 w-3.5 text-gold-primary" /> The Tasting Odyssey
          </a>
        </div>

        {/* Sleek Minimal Highlights Row with Hairline Dividers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-8 border-t border-gold-primary/15 w-full max-w-3xl text-center font-sans">
          <div className="space-y-0.5">
            <span className="font-serif text-base sm:text-lg text-champagne font-light block">Gabriel Moreau</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#91887b] block">Executive Chef</span>
          </div>
          <div className="space-y-0.5">
            <span className="font-serif text-base sm:text-lg text-champagne font-light block">4,000 Bottles</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#91887b] block">Private Cellar</span>
          </div>
          <div className="space-y-0.5">
            <span className="font-serif text-base sm:text-lg text-champagne font-light block">30th Floor</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#91887b] block">432 Park Avenue</span>
          </div>
          <div className="space-y-0.5">
            <span className="font-serif text-base sm:text-lg text-champagne font-light block">4 Salons</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#91887b] block">Bespoke Spaces</span>
          </div>
        </div>

        {/* Discreet Scroll Down Cue */}
        <a
          href="#story"
          className="mt-12 text-[#91887b] hover:text-gold-hover transition-colors flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100"
          aria-label="Scroll to Heritage"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-mono">Explore</span>
          <ChevronDown className="h-3.5 w-3.5 text-gold-primary animate-pulse" />
        </a>
      </div>
    </section>
  );
}
