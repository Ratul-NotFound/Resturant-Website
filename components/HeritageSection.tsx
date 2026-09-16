'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Flame, Utensils, ShieldCheck, Sparkles } from 'lucide-react'

export default function HeritageSection() {
  return (
    <section
      className="relative bg-brand-dark text-white pt-20 sm:pt-24 pb-20 overflow-hidden"
      data-purpose="heritage-feature"
      id="heritage"
    >
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#FFF9F6] to-transparent opacity-10 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-red/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Central 3D Floating Masterpiece Showcase */}
        <div className="text-center max-w-3xl mx-auto">
          
          <div className="relative inline-block mx-auto mb-8 group select-none">
            {/* Ambient Golden Radial Halo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-radial from-amber-500/30 via-orange-600/15 to-transparent blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

            {/* Floating Red Chili Garnish Left */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [-12, 6, -12],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-4 -left-10 w-16 sm:w-20 z-20 pointer-events-none hidden sm:block opacity-90"
            >
              <img
                src="/images/chili.png"
                alt="Chili Garnish"
                className="w-full h-full object-contain filter drop-shadow-[0_10px_14px_rgba(0,0,0,0.6)]"
              />
            </motion.div>

            {/* Floating Lime Garnish Right */}
            <motion.div
              animate={{
                y: [0, 12, 0],
                rotate: [15, -5, 15],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.4,
              }}
              className="absolute -bottom-2 -right-10 w-16 sm:w-20 z-20 pointer-events-none hidden sm:block opacity-90"
            >
              <img
                src="/images/lime.png"
                alt="Lime Garnish"
                className="w-full h-full object-contain filter drop-shadow-[0_10px_14px_rgba(0,0,0,0.6)]"
              />
            </motion.div>

            {/* 3D Floating Royal Dum Handi Dish */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 1.5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative z-10 w-52 h-52 sm:w-64 sm:h-64 mx-auto flex items-center justify-center cursor-pointer"
            >
              <img
                src="/images/dishes/kacchi.png"
                alt="Royal Sealed Handi Dum Kacchi"
                className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)] group-hover:scale-110 group-hover:drop-shadow-[0_28px_40px_rgba(200,16,46,0.6)] transition-all duration-500"
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
              className="w-40 sm:w-52 h-4 bg-black/60 rounded-full blur-[6px] mx-auto pointer-events-none"
            />

            {/* Natural Marination Seal Tag */}
            <div className="mt-3 inline-flex items-center gap-1.5 bg-emerald-800/90 text-emerald-100 text-xs font-bold px-4 py-1.5 rounded-full border border-emerald-400 shadow-xl backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>100% Natural Slow-Dum Fire Cooking</span>
            </div>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Crafted Fresh Upon Order
          </h2>
          <p className="mt-3 text-slate-300 text-xs sm:text-base max-w-xl mx-auto leading-relaxed">
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
