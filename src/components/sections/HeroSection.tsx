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
        
        {/* Accolades Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141210]/90 border border-gold-primary/40 backdrop-blur-md shadow-gold-sm mb-6 animate-fade-in">
          <Award className="h-4 w-4 text-gold-primary" />
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-champagne">
            ★★★ Three Michelin Stars · 2025 Edition
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.15em] text-champagne mb-4 leading-none">
          A U R A
        </h1>

        {/* Gold Subtitle */}
        <p className="font-serif text-lg sm:text-2xl md:text-3xl italic text-gold-light mb-6 max-w-3xl leading-relaxed">
          “An Uncompromising Symphony of Flavor, Fire & Architectural Opulence.”
        </p>

        {/* Supporting Description */}
        <p className="font-sans text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Perched 30 stories above Manhattan, Executive Chef Gabriel Moreau orchestrates a 30-course seasonal odyssey featuring Miyazaki A5 Wagyu, Brittany Turbot, and Alba White Truffles paired with rare cellar allocations.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onReserveClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl gold-button text-xs font-bold uppercase tracking-widest shadow-gold-glow"
          >
            <Calendar className="h-4 w-4" /> Reserve Your Table
          </button>
          
          <a
            href="#menu"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl gold-button-outline text-xs font-bold uppercase tracking-widest backdrop-blur-sm"
          >
            <Utensils className="h-4 w-4 text-gold-primary" /> Explore 30-Course Menu
          </a>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 mt-16 pt-8 border-t border-gold-primary/15 w-full max-w-4xl text-left font-sans">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gold-light block font-semibold">Master Brigade</span>
            <span className="font-serif text-lg font-bold text-champagne">Gabriel Moreau</span>
            <span className="text-[11px] text-neutral-400 block">3 Michelin Stars</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gold-light block font-semibold">Private Cellar</span>
            <span className="font-serif text-lg font-bold text-champagne">4,000+ Bottles</span>
            <span className="text-[11px] text-neutral-400 block">Grand Sommelier Award</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gold-light block font-semibold">Location</span>
            <span className="font-serif text-lg font-bold text-champagne">30th Floor Sky Vault</span>
            <span className="text-[11px] text-neutral-400 block">432 Park Avenue, NY</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gold-light block font-semibold">Seating Format</span>
            <span className="font-serif text-lg font-bold text-champagne">4 Bespoke Salons</span>
            <span className="text-[11px] text-neutral-400 block">Atrium · Vault · Omakase</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#story"
          className="mt-12 text-neutral-400 hover:text-gold-hover transition-colors animate-bounce flex flex-col items-center gap-1"
          aria-label="Scroll to Heritage section"
        >
          <span className="text-[10px] uppercase tracking-widest">Discover Heritage</span>
          <ChevronDown className="h-4 w-4 text-gold-primary" />
        </a>
      </div>
    </section>
  );
}
