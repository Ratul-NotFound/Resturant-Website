'use client'

import React from 'react'
import { Award, Clock, Flame, Utensils, ShieldCheck, Sparkles, Heart } from 'lucide-react'

export default function HeritageSection() {
  return (
    <section
      className="relative bg-brand-dark text-white pt-20 sm:pt-24 pb-20 overflow-hidden"
      data-purpose="heritage-feature"
      id="heritage"
    >
      {/* Top Brush Illusion */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#FFF9F6] to-transparent opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Central Artistic Food Presentation */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="relative inline-block mx-auto mb-6 group cursor-pointer">
            <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-brand-gold/80 shadow-2xl p-1 bg-neutral-900 mx-auto transition-transform duration-500 group-hover:scale-105 group-hover:border-brand-gold">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuATASda2HjIIgKdDfVgFX-CI_N0z5S_patoNHBTv-tuw_ENxx37KfVoI3N55WjIROK6-9szsofesCninWStIe2boTFUGPu9U582LtYnaexiXyCab2__1qbx6sHV8eqwKPGroXRYgYI6Dds5nOhI0QH8g-NyjabvfFISAO8eKX0vA9HkkSusuC4pzkqBU5Q29dUEqdVwVEsGPRNc09ZvDXgLxRI_FGC49D24sBhSR7AE-ju0Ar-UNbHYWQ"
                alt="Hand Crafted Herb Infused Grilled Feast"
                className="w-full h-full object-cover rounded-full group-hover:rotate-3 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Decorative Natural Marination Tag */}
            <span className="absolute -bottom-2 right-2 sm:right-4 bg-emerald-700 text-emerald-100 text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-400 shadow-md group-hover:scale-105 transition-transform flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-300" />
              100% Natural Marination
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Crafted Fresh Upon Order
          </h2>
          <p className="mt-3 text-slate-400 text-xs sm:text-base max-w-xl mx-auto leading-relaxed">
            No microwave shortcuts. Every piece of chicken is flame-grilled over burning charcoals and our kacchi is dum-cooked for 4 hours inside sealed deghs.
          </p>
        </div>

        {/* 4 Feature Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-14 max-w-5xl mx-auto text-neutral-800">
          {/* Pillar 1: 100% Halal */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 text-center shadow-lg hover:bg-neutral-50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-neutral-100 group cursor-pointer">
            <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 bg-red-50 text-brand-red rounded-full flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base group-hover:text-brand-red transition-colors">
              100% Halal
            </h4>
            <p className="text-[11px] sm:text-xs text-neutral-500 mt-1">
              Strictly certified authentic farm sources
            </p>
          </div>

          {/* Pillar 2: 24-Hr Marinade */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 text-center shadow-lg hover:bg-neutral-50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-neutral-100 group cursor-pointer">
            <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 bg-amber-50 text-brand-gold rounded-full flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300">
              <Clock className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base group-hover:text-amber-600 transition-colors">
              24-Hr Marinade
            </h4>
            <p className="text-[11px] sm:text-xs text-neutral-500 mt-1">
              Infused with natural African Bird&apos;s Eye chilies
            </p>
          </div>

          {/* Pillar 3: Open Flame */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 text-center shadow-lg hover:bg-neutral-50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-neutral-100 group cursor-pointer">
            <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Flame className="w-6 h-6 sm:w-7 sm:h-7 fill-emerald-600" />
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base group-hover:text-emerald-600 transition-colors">
              Open Flame
            </h4>
            <p className="text-[11px] sm:text-xs text-neutral-500 mt-1">
              Low-fat, flame-seared caramelization
            </p>
          </div>

          {/* Pillar 4: Slow Dum Rice */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 text-center shadow-lg hover:bg-neutral-50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border border-neutral-100 group cursor-pointer">
            <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 bg-red-50 text-brand-red rounded-full flex items-center justify-center text-xl sm:text-2xl group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300">
              <Utensils className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base group-hover:text-brand-red transition-colors">
              Slow Dum Rice
            </h4>
            <p className="text-[11px] sm:text-xs text-neutral-500 mt-1">
              Sealed brass pots with fragrant ghee
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
