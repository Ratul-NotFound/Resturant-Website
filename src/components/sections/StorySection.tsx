'use client';

import React from 'react';
import Image from 'next/image';
import { Award, Flame, Compass, Wine, Sparkles, ArrowRight } from 'lucide-react';

export function StorySection() {
  return (
    <section id="story" className="scroll-mt-28 relative py-24 sm:py-32 overflow-hidden bg-[#fafaf8]">

      {/* Decorative ambient blobs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(58,125,68,0.06) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(232,48,42,0.05) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-brand-red border border-red-200 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Philosophy &amp; Terroir
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight uppercase mb-4">
            Where Fire, Provenance &amp;{' '}
            <span className="text-gradient-red italic">Architecture</span>{' '}
            Converge
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
            A culinary sanctuary dedicated to sensory precision, elemental heat, and rare cellar allocations.
          </p>
        </div>

        {/* Main 2-column story layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">

          {/* Left: Image + Floating Star Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[420px] sm:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border border-neutral-100">
              <Image
                src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=85"
                alt="Chef at work in AURA Kitchen"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Year badge */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md shadow-md border border-black/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-900">Est. 2010</span>
              </div>
            </div>

            {/* Floating Award Card */}
            <div className="absolute -bottom-5 right-4 sm:bottom-6 sm:right-6 px-5 py-3.5 rounded-2xl bg-white shadow-xl border border-neutral-100 flex items-center gap-3.5">
              <div className="h-11 w-11 rounded-xl bg-brand-red flex items-center justify-center shadow-md shadow-brand-red/30">
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-[12px] font-bold text-neutral-900 block">Three Michelin Stars</span>
                <span className="text-[10px] text-neutral-500 block font-medium">2020 – 2025 Consecutive</span>
              </div>
            </div>
          </div>

          {/* Right: Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 leading-snug">
              The Art of Uncompromising <span className="text-gradient-red italic">Provenance</span>
            </h3>

            <p className="text-sm leading-relaxed text-neutral-600 font-normal">
              Every ingredient at AURA tells an ancestral story. Our Grade A5 Wagyu is sourced exclusively from the Ozaki family ranch in Miyazaki, Japan, where cattle feed on organic roasted grain and spring well water. Our wild Turbot is landed by artisanal dayboats in Brittany and flown to Manhattan within 24 hours of catch.
            </p>

            <p className="text-sm leading-relaxed text-neutral-600 font-normal">
              We employ centuries-old Japanese Kishu Binchotan charcoal — burning at 400°C with zero ash smoke — to seal in crystalline juices, complemented by 7-year aged Acquerello rice and fresh truffles foraged from secret Alba forests.
            </p>

            {/* 3 Stats Minimalist Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-200">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-brand-red block font-serif leading-none">100%</span>
                <span className="text-[11px] font-bold text-neutral-900 block mt-1">Traceable Terroir</span>
                <span className="text-[10px] text-neutral-400 block font-medium">Single-estate</span>
              </div>
              <div className="border-l border-neutral-200 pl-4">
                <span className="text-2xl sm:text-3xl font-black text-amber-500 block font-serif leading-none">400°C</span>
                <span className="text-[11px] font-bold text-neutral-900 block mt-1">Binchotan Heat</span>
                <span className="text-[10px] text-neutral-400 block font-medium">Zero smoke taint</span>
              </div>
              <div className="border-l border-neutral-200 pl-4">
                <span className="text-2xl sm:text-3xl font-black text-emerald-600 block font-serif leading-none">4,000+</span>
                <span className="text-[11px] font-bold text-neutral-900 block mt-1">Cellar Bottles</span>
                <span className="text-[10px] text-neutral-400 block font-medium">Master allocations</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 text-brand-red text-xs font-bold uppercase tracking-wider hover:gap-3 transition-all group"
              >
                Explore Full Menu <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* 3 Provenance Cards — Clean Minimalist Luxury Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Card 1: Oceanic */}
          <div className="group rounded-3xl bg-white border border-neutral-100 hover:border-cyan-400/40 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] transition-all duration-400 flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Compass className="h-5 w-5 text-cyan-600" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-700 px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-100 inline-block mb-3">
                Oceanic Provenance
              </span>
              <h4 className="text-base font-bold text-neutral-900 mb-2 font-serif">Dayboat Cold-Chain Purity</h4>
              <p className="text-xs text-neutral-500 leading-relaxed mb-4 font-normal">
                Wild Turbot landed off Île de Groix in Brittany and sea-urchin from Hokkaido&apos;s sub-polar currents, transported at -0.5°C within 24 hours of landing.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-neutral-700 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-neutral-400 font-normal">Origin</span>
              <span>Brittany &amp; Hokkaido Waters</span>
            </div>
          </div>

          {/* Card 2: Fire */}
          <div className="group rounded-3xl bg-white border border-neutral-100 hover:border-brand-red/40 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] transition-all duration-400 flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Flame className="h-5 w-5 text-brand-red" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red px-2.5 py-1 rounded-full bg-red-50 border border-red-100 inline-block mb-3">
                Elemental Hearth
              </span>
              <h4 className="text-base font-bold text-neutral-900 mb-2 font-serif">400°C Kishu Binchotan Fire</h4>
              <p className="text-xs text-neutral-500 leading-relaxed mb-4 font-normal">
                Century-old kiln white oak charcoal delivering pristine far-infrared heat with zero ash taint, caramelizing Ozaki Wagyu into unforgettable umami depths.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-neutral-700 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-neutral-400 font-normal">Technique</span>
              <span>Ancestral Japanese Flame &amp; Sear</span>
            </div>
          </div>

          {/* Card 3: Cellar */}
          <div className="group rounded-3xl bg-white border border-neutral-100 hover:border-emerald-500/40 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] transition-all duration-400 flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Wine className="h-5 w-5 text-emerald-700" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 inline-block mb-3">
                Cellar &amp; Earth
              </span>
              <h4 className="text-base font-bold text-neutral-900 mb-2 font-serif">Secret Forage &amp; Grand Crus</h4>
              <p className="text-xs text-neutral-500 leading-relaxed mb-4 font-normal">
                Tuber Magnatum Pico white truffles unearthed in Piedmont, paired with 4,000 temperature-stabilized Grand Cru bottles from Vosne-Romanée to Bordeaux.
              </p>
            </div>
            <div className="text-[11px] font-semibold text-neutral-700 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-neutral-400 font-normal">Sanctuary</span>
              <span>Alba Piedmont &amp; Vaults</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
