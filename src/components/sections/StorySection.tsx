'use client';

import React from 'react';
import Image from 'next/image';
import { Award, Flame, Sparkles, CheckCircle2 } from 'lucide-react';

export function StorySection() {
  return (
    <section id="story" className="scroll-mt-28 relative py-24 sm:py-32 bg-[#0e0d0b] overflow-hidden text-[#cfc8bc]">
      
      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(197,160,89,0.06),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[radial-gradient(circle,rgba(197,160,89,0.04),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Tag */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-gold-primary/20 bg-gold-primary/5 text-gold-light text-[10px] uppercase font-mono tracking-[0.25em] mb-4">
            <Sparkles className="h-3 w-3 text-gold-primary" /> Philosophy & Terroir
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-champagne mb-4 tracking-tight">
            Where Fire, Provenance & Architecture Converge
          </h2>
          <p className="text-xs sm:text-sm text-[#91887b] leading-relaxed font-sans max-w-xl mx-auto">
            A sanctuary dedicated to sensory precision, elemental heat, and rare cellar allocations.
          </p>
        </div>

        {/* 2-Column Story Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-12">
          
          {/* Left Column: Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[440px] sm:h-[500px] w-full rounded-2xl overflow-hidden border border-gold-primary/20 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=85"
                alt="Chef at Work in AURA Kitchen"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a]/80 via-transparent to-black/20" />
            </div>

            {/* Floating Milestone Badge */}
            <div className="absolute -bottom-4 right-4 sm:bottom-6 sm:right-6 px-5 py-3 rounded-xl bg-[#141210]/95 border border-gold-primary/25 backdrop-blur-xl shadow-xl flex items-center gap-3">
              <Award className="h-5 w-5 text-gold-primary shrink-0" />
              <div>
                <span className="font-serif text-xs font-semibold text-champagne block">Three Michelin Stars</span>
                <span className="text-[10px] text-[#91887b] block font-mono">2020 – 2025 Consecutive</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-champagne leading-snug">
              The Art of Uncompromising Provenance
            </h3>

            <p className="text-sm leading-relaxed text-[#cfc8bc] font-light">
              Every ingredient at AURA tells an ancestral story. Our Grade A5 Wagyu is sourced exclusively from the Ozaki family ranch in Miyazaki, Japan, where cattle feed on organic roasted grain and spring well water. Our wild Turbot is landed by artisanal dayboats in Brittany and flown to Manhattan within 24 hours of catch.
            </p>

            <p className="text-sm leading-relaxed text-[#cfc8bc] font-light">
              We employ centuries-old Japanese Kishu Binchotan charcoal — burning at 400°C with zero ash smoke — to seal in crystalline juices, complemented by 7-year aged Acquerello rice and fresh truffles foraged from secret Alba forests.
            </p>

            {/* 3 Minimalist Editorial Value Pillars */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gold-primary/15">
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-light text-gold-primary block mb-1">100%</span>
                <span className="text-xs font-serif text-champagne block">Traceable Terroir</span>
                <span className="text-[10px] text-[#91887b] mt-0.5 block font-sans">Single-estate source</span>
              </div>

              <div className="border-l border-gold-primary/15 pl-4 sm:pl-6">
                <span className="font-serif text-2xl sm:text-3xl font-light text-gold-primary block mb-1">400°C</span>
                <span className="text-xs font-serif text-champagne block">Binchotan Embers</span>
                <span className="text-[10px] text-[#91887b] mt-0.5 block font-sans">Zero smoke taint</span>
              </div>

              <div className="border-l border-gold-primary/15 pl-4 sm:pl-6">
                <span className="font-serif text-2xl sm:text-3xl font-light text-gold-primary block mb-1">4,000+</span>
                <span className="text-xs font-serif text-champagne block">Cellar Bottles</span>
                <span className="text-[10px] text-[#91887b] mt-0.5 block font-sans">Master allocations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
