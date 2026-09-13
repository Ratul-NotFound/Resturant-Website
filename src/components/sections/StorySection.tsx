'use client';

import React from 'react';
import Image from 'next/image';
import { Award, Flame, Compass, Wine, Sparkles, ArrowRight } from 'lucide-react';

export function StorySection() {
  return (
    <section id="story" className="scroll-mt-28 relative py-24 sm:py-32 overflow-hidden" style={{ background: '#fafaf8' }}>

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-60"
        style={{ background: 'radial-gradient(ellipse, rgba(58,125,68,0.08) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-60"
        style={{ background: 'radial-gradient(ellipse, rgba(232,48,42,0.06) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8302a]/08 border border-[#e8302a]/20 text-[#e8302a] text-[10px] uppercase tracking-[0.3em] font-bold mb-5">
            <Sparkles className="h-3 w-3" />
            Philosophy &amp; Terroir
          </div>
          <h2 className="headline-display text-3xl sm:text-5xl mb-5">
            Where Fire, Provenance &amp;{' '}
            <span className="italic text-gradient-red">Architecture</span>{' '}
            Converge
          </h2>
          <p className="text-[#666] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            A culinary sanctuary dedicated to sensory precision, elemental heat, and rare cellar allocations.
          </p>
        </div>

        {/* Main 2-column story grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">

          {/* Left: Image + Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[420px] sm:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=85"
                alt="Chef at work in AURA Kitchen"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Year badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur shadow-lg">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#111]">Est. 2010</span>
              </div>
            </div>

            {/* Floating Award Badge */}
            <div className="absolute -bottom-5 right-4 sm:bottom-6 sm:right-6 px-4 py-3 rounded-2xl bg-white shadow-xl border border-black/06 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#e8302a] flex items-center justify-center shadow-md shadow-red-500/30">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-[12px] font-black text-[#111] block">Three Michelin Stars</span>
                <span className="text-[10px] text-[#888] block font-medium">2020 – 2025 Consecutive</span>
              </div>
            </div>

            {/* Decorative colorful accent blob overlapping image */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#3a7d44]/15 blur-2xl pointer-events-none" />
          </div>

          {/* Right: Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="headline-serif text-2xl sm:text-3xl leading-snug">
              The Art of Uncompromising <span className="text-gradient-red italic">Provenance</span>
            </h3>

            <p className="text-sm leading-relaxed text-[#555] font-normal">
              Every ingredient at AURA tells an ancestral story. Our Grade A5 Wagyu is sourced exclusively from the Ozaki family ranch in Miyazaki, Japan, where cattle feed on organic roasted grain and spring well water. Our wild Turbot is landed by artisanal dayboats in Brittany and flown to Manhattan within 24 hours of catch.
            </p>

            <p className="text-sm leading-relaxed text-[#555] font-normal">
              We employ centuries-old Japanese Kishu Binchotan charcoal — burning at 400°C with zero ash smoke — to seal in crystalline juices, complemented by 7-year aged Acquerello rice and fresh truffles foraged from secret Alba forests.
            </p>

            {/* 3 Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/08">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-[#e8302a] block font-serif leading-none">100%</span>
                <span className="text-[11px] font-bold text-[#111] block mt-1">Traceable Terroir</span>
                <span className="text-[10px] text-[#999] block">Single-estate</span>
              </div>
              <div className="border-l border-black/08 pl-4">
                <span className="text-2xl sm:text-3xl font-black text-[#f59e0b] block font-serif leading-none">400°C</span>
                <span className="text-[11px] font-bold text-[#111] block mt-1">Binchotan Heat</span>
                <span className="text-[10px] text-[#999] block">Zero smoke taint</span>
              </div>
              <div className="border-l border-black/08 pl-4">
                <span className="text-2xl sm:text-3xl font-black text-[#3a7d44] block font-serif leading-none">4,000+</span>
                <span className="text-[11px] font-bold text-[#111] block mt-1">Cellar Bottles</span>
                <span className="text-[10px] text-[#999] block">Master allocations</span>
              </div>
            </div>

            <a href="#menu" className="inline-flex items-center gap-2 text-[#e8302a] text-sm font-bold uppercase tracking-wider hover:gap-3 transition-all group">
              Explore Our Menu <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* 3 Provenance Cards — White cards with color accents */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Card 1: Oceanic */}
          <div className="card-white p-7 group">
            <div className="h-12 w-12 rounded-2xl bg-[#e0f2fe] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Compass className="h-6 w-6 text-[#0e7490]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#0e7490] px-2.5 py-1 rounded-full bg-[#e0f2fe] inline-block mb-3">
              Oceanic Provenance
            </span>
            <h4 className="text-base font-black text-[#111] mb-2">Dayboat Cold-Chain Purity</h4>
            <p className="text-[13px] text-[#666] leading-relaxed mb-4">
              Wild Turbot landed off Île de Groix in Brittany and sea-urchin from Hokkaido's sub-polar currents, transported at -0.5°C within 24 hours of landing.
            </p>
            <div className="text-[10px] font-semibold text-[#0e7490] pt-3 border-t border-black/06 flex items-center gap-1.5">
              Origin: <span className="text-[#333]">Brittany &amp; Hokkaido Waters</span>
            </div>
          </div>

          {/* Card 2: Fire */}
          <div className="card-blush p-7 group">
            <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform">
              <Flame className="h-6 w-6 text-[#e8302a]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#e8302a] px-2.5 py-1 rounded-full bg-white inline-block mb-3">
              Elemental Hearth
            </span>
            <h4 className="text-base font-black text-[#111] mb-2">400°C Kishu Binchotan Fire</h4>
            <p className="text-[13px] text-[#666] leading-relaxed mb-4">
              Century-old kiln white oak charcoal delivering pristine far-infrared heat with zero ash taint, caramelizing Ozaki Wagyu into unforgettable umami depths.
            </p>
            <div className="text-[10px] font-semibold text-[#e8302a] pt-3 border-t border-[#e8302a]/10 flex items-center gap-1.5">
              Technique: <span className="text-[#333]">Ancestral Japanese Flame &amp; Sear</span>
            </div>
          </div>

          {/* Card 3: Cellar */}
          <div className="card-mint p-7 group">
            <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform">
              <Wine className="h-6 w-6 text-[#3a7d44]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#3a7d44] px-2.5 py-1 rounded-full bg-white inline-block mb-3">
              Cellar &amp; Earth
            </span>
            <h4 className="text-base font-black text-[#111] mb-2">Secret Forage &amp; Grand Crus</h4>
            <p className="text-[13px] text-[#666] leading-relaxed mb-4">
              Tuber Magnatum Pico white truffles unearthed in Piedmont, paired with 4,000 temperature-stabilized Grand Cru bottles from Vosne-Romanée to Bordeaux.
            </p>
            <div className="text-[10px] font-semibold text-[#3a7d44] pt-3 border-t border-[#3a7d44]/10 flex items-center gap-1.5">
              Sanctuary: <span className="text-[#333]">Alba Piedmont &amp; Vaults</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
