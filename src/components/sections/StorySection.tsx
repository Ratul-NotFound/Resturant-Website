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
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-primary/10 border border-gold-primary/30 text-gold-light text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="h-3.5 w-3.5 text-gold-primary" /> Philosophy & Terroir
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-champagne mb-4 tracking-tight">
            Where Fire, Provenance & Architecture Converge
          </h2>
          <p className="text-xs sm:text-sm text-[#91887b] leading-relaxed font-sans">
            Conceived by Executive Chef Gabriel Moreau, AURA was built not merely as a restaurant, but as a sanctuary dedicated to sensory precision, pristine thermal heat, and rare cellar allocations.
          </p>
        </div>

        {/* 2-Column Story Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          
          {/* Left Column: Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[460px] sm:h-[520px] w-full rounded-3xl overflow-hidden border border-gold-primary/30 shadow-card-dark">
              <Image
                src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=85"
                alt="Chef at Work in AURA Kitchen"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a] via-transparent to-black/30" />
            </div>

            {/* Floating Milestone Badge */}
            <div className="absolute -bottom-6 -right-4 sm:bottom-6 sm:-right-6 p-5 rounded-2xl bg-[#141210]/95 border border-gold-primary/40 backdrop-blur-xl shadow-2xl max-w-xs">
              <div className="flex items-center gap-2 text-gold-primary mb-1">
                <Award className="h-5 w-5" />
                <span className="font-serif font-bold text-sm text-champagne">Three Michelin Stars</span>
              </div>
              <p className="text-[11px] text-[#91887b] leading-relaxed">
                Retaining the Michelin Guide’s highest distinction for 5 consecutive years.
              </p>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-champagne leading-snug">
              The Art of Uncompromising Provenance
            </h3>

            <p className="text-sm leading-relaxed text-[#cfc8bc]">
              Every ingredient at AURA tells an ancestral story. Our Grade A5 Wagyu is sourced exclusively from the Ozaki family ranch in Miyazaki, Japan, where cattle feed on organic roasted grain and spring well water. Our wild Turbot is landed by artisanal dayboats in Brittany and flown to Manhattan within 24 hours of catch.
            </p>

            <p className="text-sm leading-relaxed text-[#cfc8bc]">
              We employ centuries-old Japanese Kishu Binchotan charcoal — burning at 400°C with zero ash smoke — to seal in crystalline juices, complemented by 7-year aged Acquerello rice and fresh truffles foraged from secret Alba forests.
            </p>

            {/* 3 Value Pillars */}
            <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-gold-primary/15">
              <div className="p-4 rounded-xl bg-[#141210] border border-gold-primary/20">
                <span className="font-serif text-2xl font-bold text-gold-primary block mb-1">100%</span>
                <span className="text-xs font-semibold text-champagne block">Sustainable & Traceable</span>
                <span className="text-[10px] text-[#91887b] mt-1 block">Direct farm partnerships</span>
              </div>

              <div className="p-4 rounded-xl bg-[#141210] border border-gold-primary/20">
                <span className="font-serif text-2xl font-bold text-gold-primary block mb-1">400°C</span>
                <span className="text-xs font-semibold text-champagne block">Binchotan Embers</span>
                <span className="text-[10px] text-[#91887b] mt-1 block">Zero chemical flame</span>
              </div>

              <div className="p-4 rounded-xl bg-[#141210] border border-gold-primary/20">
                <span className="font-serif text-2xl font-bold text-gold-primary block mb-1">4,000+</span>
                <span className="text-xs font-semibold text-champagne block">Cellar Allocations</span>
                <span className="text-[10px] text-[#91887b] mt-1 block">Curated by Master Sommeliers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
