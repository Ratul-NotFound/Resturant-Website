code = '''\'use client\'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Flame,
  ArrowRight,
  Star,
  Sparkles,
  Bike,
  ShieldCheck,
  Award,
  CalendarCheck,
} from 'lucide-react'
import Link from 'next/link'

const CATEGORY_RIBBON = [
  {
    id: 'kacchi',
    name: 'Basmati Kacchi',
    image: '/images/dishes/kacchi.png',
    target: '#portion-section',
  },
  {
    id: 'grilled',
    name: 'Flame Peri Chicken',
    image: '/images/dishes/chicken.png',
    target: '#portion-section',
  },
  {
    id: 'tehari',
    name: 'Old Dhaka Tehari',
    image: '/images/dishes/tehari.png',
    target: '#portion-section',
  },
  {
    id: 'platters',
    name: 'Mega Feasts',
    image: '/images/dishes/feast.png',
    target: '#portion-section',
  },
  {
    id: 'sides',
    name: 'Peri Fries & Sides',
    image: '/images/dishes/fries.png',
    target: '#portion-section',
  },
  {
    id: 'drinks',
    name: 'Royal Borhani',
    image: '/images/dishes/borhani.png',
    target: '#portion-section',
  },
]

export default function HeroSection() {
  return (
    <section
      className="relative bg-brand-dark text-white overflow-hidden"
      data-purpose="hero-banner"
    >
      {/* 1. Main Hero Stage */}
      <div className="relative z-10 pt-8 sm:pt-16 pb-12 sm:pb-20">
        
        {/* Soft Ambient Ember Glow in Background */}
        <div className="absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-brand-red/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 sm:w-80 h-64 sm:h-80 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Punchy Editorial Copy & Fast Actions */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
              
              {/* Halal & Fresh Pill */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-black tracking-wider uppercase shadow-md"
              >
                <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                <span className="text-amber-300">Authentic Taste of Dhaka</span>
                <span className="text-neutral-400">•</span>
                <span className="text-white/90">Dum &amp; Flame</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight leading-[1.1] sm:leading-[1.15]"
              >
                Fiery Flame-Grilled <br />
                <span className="fiery-shimmer-text">Peri Chicken</span> &amp; <br />
                Royal Basmati Kacchi.
              </motion.h1>

              {/* Sub-Headline */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xs sm:text-base text-neutral-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
              >
                Charcoal-seared lava-rock quarter chickens paired with 4-hour slow-dum Basmati Kacchi with tender mutton. Delivered hot to your doorstep across Dhaka.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2"
              >
                <a
                  href="#portion-section"
                  className="cta-shimmer bg-brand-red hover:bg-brand-darkred active:scale-95 text-white font-black text-xs sm:text-sm uppercase tracking-wider py-3.5 px-6 sm:px-8 rounded-2xl shadow-xl shadow-brand-red/30 flex items-center justify-center gap-2 transition-all group"
                >
                  <Flame className="w-4 h-4 fill-white animate-pulse" />
                  <span>Order Online Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <Link
                  href="/reserve"
                  className="bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs sm:text-sm py-3.5 px-6 rounded-2xl backdrop-blur-md border border-white/20 flex items-center justify-center gap-2 transition-all"
                >
                  <CalendarCheck className="w-4 h-4 text-emerald-400" />
                  <span>Reserve Table</span>
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 pt-2 text-[11px] sm:text-xs text-neutral-300 font-semibold"
              >
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Halal Certified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                  <span>4.9 / 5 (2,500+ Reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Avg. 32m Delivery</span>
                </div>
              </motion.div>

            </div>

            {/* Right Column: 3D Floating Hero Showcase Platter */}
            <div className="lg:col-span-5 relative flex items-center justify-center pt-2 sm:pt-4 lg:pt-0">
              
              {/* Radiant Warm Backlight Spotlight */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-radial from-amber-500/35 via-brand-red/25 to-transparent blur-3xl pointer-events-none animate-pulse" />

              {/* 3D Floating Main Platter with Realistic Idle Breathing */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 1.2, 0],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative z-10 w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center select-none"
              >
                <img
                  src="/images/dishes/kacchi.png"
                  alt="Royal Basmati Dum Kacchi Biryani Platter"
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_32px_rgba(0,0,0,0.7)] hover:drop-shadow-[0_36px_50px_rgba(200,16,46,0.6)] transition-all duration-500"
                />
              </motion.div>

              {/* Realistic Ground Contact Shadow under Hero Dish */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.55, 0.25, 0.55],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 w-40 sm:w-56 md:w-64 h-5 bg-black/60 rounded-full blur-[8px] pointer-events-none"
              />

              {/* Floating Badge 1: 450°C Flame Seared */}
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.3,
                }}
                className="absolute top-1 sm:top-4 right-0 sm:right-2 z-20 bg-neutral-900/90 border border-amber-400/40 text-white rounded-2xl px-2.5 py-1.5 sm:px-3.5 sm:py-2 shadow-2xl backdrop-blur-md flex items-center gap-1.5 sm:gap-2 max-w-[160px] sm:max-w-none"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-xl bg-brand-red flex items-center justify-center text-white shrink-0">
                  <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white" />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[10px] text-amber-300 font-extrabold uppercase tracking-wider">Chef Signature</p>
                  <p className="text-[10px] sm:text-xs font-black text-white truncate">Dum Handi Kacchi</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: 100% Ghee & Basmati */}
              <motion.div
                animate={{
                  y: [0, 5, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.7,
                }}
                className="absolute bottom-2 sm:bottom-6 left-0 sm:left-2 z-20 bg-neutral-900/90 border border-white/20 text-white rounded-2xl px-2.5 py-1.5 sm:px-3.5 sm:py-2 shadow-2xl backdrop-blur-md flex items-center gap-1.5 sm:gap-2 max-w-[160px] sm:max-w-none"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-xl bg-amber-500 flex items-center justify-center text-white shrink-0">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white" />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[10px] text-neutral-300 font-extrabold uppercase tracking-wider">Pure Saffron Ghee</p>
                  <p className="text-[10px] sm:text-xs font-black text-amber-300 truncate">Royal Recipe</p>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </div>

      {/* 2. Fast Category Ribbon (Responsive horizontally scrollable on mobile, grid on desktop) */}
      <div className="flex-shrink-0 w-full bg-brand-red border-t-2 border-b-2 border-brand-darkred shadow-2xl relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3.5 sm:py-6">
          <div className="flex sm:grid sm:grid-cols-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory gap-2.5 sm:gap-6 justify-start sm:justify-center items-center">
            {CATEGORY_RIBBON.map((cat, idx) => {
              const tiltAngle = idx % 2 === 0 ? -10 : 10
              return (
                <a
                  key={cat.id}
                  href={cat.target}
                  className="group relative flex flex-col items-center justify-center text-center cursor-pointer select-none py-1 hover:z-30 min-w-[92px] sm:min-w-0 snap-center shrink-0 sm:shrink"
                >
                  {/* Warm Golden Spotlight Halo on Hover */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-44 sm:h-44 rounded-full bg-radial from-amber-400/50 via-orange-500/25 to-transparent blur-2xl opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-175 transition-all duration-500 pointer-events-none" />

                  {/* Free-Floating Food Item */}
                  <motion.div
                    whileHover={{
                      scale: 1.5,
                      rotate: tiltAngle,
                      y: -14,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 18,
                    }}
                    className="relative w-14 h-14 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center z-20 cursor-pointer"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_10px_14px_rgba(0,0,0,0.4)] group-hover:drop-shadow-[0_28px_40px_rgba(0,0,0,0.75)] transition-all duration-300"
                    />
                  </motion.div>

                  {/* Realistic Dynamic Contact Shadow on the Ribbon */}
                  <div className="w-10 sm:w-20 h-1.5 sm:h-2 bg-black/45 rounded-full blur-[3px] opacity-70 group-hover:opacity-15 group-hover:scale-175 transition-all duration-300 mb-1.5 mt-1" />

                  {/* Category Title with Golden Glow */}
                  <span className="font-display font-black text-[10px] sm:text-xs md:text-sm text-white tracking-wider uppercase block leading-tight drop-shadow-sm group-hover:text-amber-300 group-hover:scale-105 transition-all duration-200 truncate max-w-[90px] sm:max-w-none">
                    {cat.name}
                  </span>

                  {/* Expanding Golden Indicator Line */}
                  <span className="h-0.5 w-0 bg-amber-300 rounded-full mt-1 group-hover:w-10 sm:group-hover:w-12 transition-all duration-300 ease-out" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
'''
with open('components/HeroSection.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
print('HeroSection.tsx done')
