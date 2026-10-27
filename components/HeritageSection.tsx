'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Flame, Utensils, ShieldCheck } from 'lucide-react'

export default function HeritageSection() {
  return (
    <section
      className="py-16 sm:py-28 bg-[#121111] text-white relative overflow-hidden border-t border-white/10"
      data-purpose="heritage-story-section"
      id="heritage"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-64 sm:w-80 h-64 sm:h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header with 3D Dish Hero */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-20">
          
          {/* Floating Food Hero Stage */}
          <div className="relative mb-6 sm:mb-10 group select-none">
            
            {/* Ambient Warm Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 sm:w-72 sm:h-72 rounded-full bg-radial from-amber-500/20 via-orange-600/10 to-transparent blur-2xl group-hover:scale-115 transition-transform duration-500 pointer-events-none" />

            {/* 3D Floating Royal Dum Handi Dish */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 1.5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative z-10 w-44 h-44 sm:w-60 sm:h-60 md:w-64 md:h-64 mx-auto flex items-center justify-center cursor-pointer"
            >
              <img
                src="/images/dishes/kacchi.png"
                alt="Royal Sealed Handi Dum Kacchi"
                className="max-w-full max-h-full object-contain filter drop-shadow-[0_16px_24px_rgba(0,0,0,0.6)] group-hover:scale-105 group-hover:drop-shadow-[0_24px_36px_rgba(200,16,46,0.4)] transition-all duration-500"
              />
            </motion.div>

            {/* Ground Contact Shadow */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-36 sm:w-52 h-3 sm:h-3.5 bg-black/60 rounded-full blur-[4px] mx-auto pointer-events-none mt-2"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
              Slow-Dum Wood Fire Cooking
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Crafted Fresh Upon Order
          </h2>
          <p className="mt-3 text-neutral-300 text-xs sm:text-base max-w-xl mx-auto leading-relaxed font-normal">
            No microwave shortcuts. Every piece of chicken is flame-grilled over burning charcoals and our kacchi is dum-cooked for 4 hours inside sealed deghs.
          </p>
        </div>

        {/* 4 Feature Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-12 max-w-5xl mx-auto">
          {/* Pillar 1: 100% Halal */}
          <div className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.15] backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="w-11 h-11 sm:w-13 sm:h-13 mx-auto mb-3 sm:mb-4 rounded-2xl bg-white/[0.05] border border-white/10 text-amber-400 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h4 className="font-display font-bold text-xs sm:text-base text-white">
              100% Halal
            </h4>
            <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 sm:mt-1.5 leading-relaxed font-normal">
              Strictly certified authentic farm sources
            </p>
          </div>

          {/* Pillar 2: 24-Hr Marinade */}
          <div className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.15] backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="w-11 h-11 sm:w-13 sm:h-13 mx-auto mb-3 sm:mb-4 rounded-2xl bg-white/[0.05] border border-white/10 text-amber-400 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h4 className="font-display font-bold text-xs sm:text-base text-white">
              24-Hr Marinade
            </h4>
            <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 sm:mt-1.5 leading-relaxed font-normal">
              Infused with African Bird&apos;s Eye chilies
            </p>
          </div>

          {/* Pillar 3: Open Flame */}
          <div className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.15] backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="w-11 h-11 sm:w-13 sm:h-13 mx-auto mb-3 sm:mb-4 rounded-2xl bg-white/[0.05] border border-white/10 text-brand-red flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-brand-red" />
            </div>
            <h4 className="font-display font-bold text-xs sm:text-base text-white">
              Open Flame
            </h4>
            <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 sm:mt-1.5 leading-relaxed font-normal">
              Low-fat, flame-seared caramelization
            </p>
          </div>

          {/* Pillar 4: Slow Dum Rice */}
          <div className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.15] backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="w-11 h-11 sm:w-13 sm:h-13 mx-auto mb-3 sm:mb-4 rounded-2xl bg-white/[0.05] border border-white/10 text-amber-400 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Utensils className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h4 className="font-display font-bold text-xs sm:text-base text-white">
              Slow Dum Rice
            </h4>
            <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 sm:mt-1.5 leading-relaxed font-normal">
              Sealed brass pots with fragrant ghee
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
