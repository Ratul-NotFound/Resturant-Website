'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, ArrowRight, CalendarCheck, Flame, Star, Sparkles, ShieldCheck } from 'lucide-react'
import FlameParticles from './FlameParticles'

const CATEGORY_RIBBON = [
  {
    id: 'grilled',
    name: 'FLAME CHICKEN',
    image: '/images/categories/chicken.png',
    target: '#portion-section',
  },
  {
    id: 'kacchi',
    name: 'ROYAL KACCHI',
    image: '/images/categories/kacchi.png',
    target: '#portion-section',
  },
  {
    id: 'tehari',
    name: 'MUSTARD TEHARI',
    image: '/images/categories/tehari.png',
    target: '#portion-section',
  },
  {
    id: 'platters',
    name: 'MEGA FEASTS',
    image: '/images/categories/feast.png',
    target: '#mega-deal',
  },
  {
    id: 'sides',
    name: 'PERI SIDES',
    image: '/images/categories/fries.png',
    target: '#portion-section',
  },
  {
    id: 'drinks',
    name: 'SHAHI BORHANI',
    image: '/images/categories/borhani.png',
    target: '#portion-section',
  },
]

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-neutral-950 min-h-[85vh] sm:min-h-[92vh] flex flex-col justify-between"
      data-purpose="hero-banner"
    >
      {/* 1. Cinematic Ambient Background */}
      <div className="relative flex-1 flex items-center pt-20 sm:pt-28 pb-8 sm:pb-12 w-full z-10">
        
        {/* Ambient Dark Charcoal Smoke Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-900/95 to-neutral-950" />
          <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-brand-red/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/4 w-80 sm:w-[450px] h-80 sm:h-[450px] bg-amber-600/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/70" />
        </div>

        {/* Dynamic Sizzling Flame Embers */}
        <FlameParticles density={16} />

        {/* Ambient Floating Garnishes (Responsively positioned & bounded) */}
        {/* Floating Roasted Chili */}
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [-8, 8, -8],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 right-[48%] w-12 sm:w-16 md:w-20 z-20 pointer-events-none opacity-80 hidden sm:block"
        >
          <img
            src="/images/chili.png"
            alt="Roasted Chili Garnish"
            className="w-full h-full object-contain filter drop-shadow-[0_12px_16px_rgba(0,0,0,0.6)]"
          />
        </motion.div>

        {/* Floating Fresh Lime Wedge */}
        <motion.div
          animate={{
            y: [0, 14, 0],
            rotate: [12, -6, 12],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className="absolute top-24 right-8 lg:right-14 w-12 sm:w-16 md:w-20 z-20 pointer-events-none opacity-85 hidden md:block"
        >
          <img
            src="/images/lime.png"
            alt="Fresh Lime Garnish"
            className="w-full h-full object-contain filter drop-shadow-[0_14px_20px_rgba(0,0,0,0.6)]"
          />
        </motion.div>

        {/* Hero Grid Container: Left Narrative + Right 3D Showcase */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Punchy Headline & CTAs */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
              
              {/* Halal Authenticity Ribbon */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-brand-red/20 border border-amber-400/40 px-3 sm:px-3.5 py-1.5 rounded-full backdrop-blur-md"
              >
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold fill-brand-gold shrink-0" />
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-amber-300 truncate">
                  Dhaka&apos;s #1 Flame-Seared Heritage Grill
                </span>
              </motion.div>

              {/* Giant Commercial Headline (Responsive fluid typography) */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] uppercase drop-shadow-2xl"
              >
                BEST FLAME GRILL <br />
                <span className="text-brand-red"> &amp; ROYAL KACCHI </span> <br />
                IN BANGLADESH.
              </motion.h1>

              {/* Appetizing Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-lg md:text-xl text-neutral-200 font-medium max-w-2xl leading-relaxed drop-shadow-md"
              >
                450°C lava-rock seared Peri-Peri chicken &amp; 4-hour sealed clay handi Basmati Kacchi with pure saffron ghee. Prepared fresh across 7 Dhaka kitchens.
              </motion.p>

              {/* Action Buttons Cluster (Responsive full-width on mobile, auto on desktop) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2"
              >
                <a
                  href="#portion-section"
                  className="cta-shimmer bg-brand-red hover:bg-brand-darkred text-white text-sm sm:text-base font-black uppercase tracking-wider px-7 sm:px-9 py-3.5 sm:py-4.5 rounded-full shadow-2xl shadow-brand-red/50 hover:shadow-brand-red/70 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2.5"
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>ORDER NOW</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
                </a>

                <Link
                  href="/reserve"
                  className="bg-neutral-900/90 hover:bg-neutral-800 text-white border-2 border-white/30 hover:border-white text-sm sm:text-base font-bold px-6 sm:px-8 py-3.5 sm:py-4.5 rounded-full backdrop-blur-md shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                  <span>RESERVE TABLE</span>
                </Link>
              </motion.div>

              {/* Trust Badges Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 sm:pt-3 text-neutral-300 text-xs sm:text-sm font-semibold"
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
            <div className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0">
              
              {/* Radiant Warm Backlight Spotlight */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-radial from-amber-500/35 via-brand-red/25 to-transparent blur-3xl pointer-events-none animate-pulse" />

              {/* 3D Floating Main Platter with Realistic Idle Breathing */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 1.5, 0],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative z-10 w-52 h-52 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center select-none"
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
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.3,
                }}
                className="absolute top-2 sm:top-6 right-1 sm:right-2 z-20 bg-neutral-900/90 border border-amber-400/40 text-white rounded-2xl px-3 py-1.5 sm:px-3.5 sm:py-2 shadow-2xl backdrop-blur-md flex items-center gap-2"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-brand-red flex items-center justify-center text-white shrink-0">
                  <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white" />
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] text-amber-300 font-extrabold uppercase tracking-wider">Chef Signature</p>
                  <p className="text-[11px] sm:text-xs font-black text-white">Dum Handi Kacchi</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: 100% Ghee & Basmati */}
              <motion.div
                animate={{
                  y: [0, 6, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.7,
                }}
                className="absolute bottom-4 sm:bottom-8 left-1 sm:left-2 z-20 bg-neutral-900/90 border border-white/20 text-white rounded-2xl px-3 py-1.5 sm:px-3.5 sm:py-2 shadow-2xl backdrop-blur-md flex items-center gap-2"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-500 flex items-center justify-center text-white shrink-0">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white" />
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] text-neutral-300 font-extrabold uppercase tracking-wider">Pure Saffron Ghee</p>
                  <p className="text-[11px] sm:text-xs font-black text-amber-300">Royal Recipe</p>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </div>

      {/* 2. Fast Category Ribbon (Responsive horizontally scrollable on mobile, grid on desktop) */}
      <div className="flex-shrink-0 w-full bg-brand-red border-t-2 border-b-2 border-brand-darkred shadow-2xl relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex sm:grid sm:grid-cols-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory gap-3 sm:gap-6 justify-start sm:justify-center items-center">
            {CATEGORY_RIBBON.map((cat, idx) => {
              const tiltAngle = idx % 2 === 0 ? -12 : 12
              return (
                <a
                  key={cat.id}
                  href={cat.target}
                  className="group relative flex flex-col items-center justify-center text-center cursor-pointer select-none py-1 hover:z-30 min-w-[100px] sm:min-w-0 snap-center shrink-0 sm:shrink"
                >
                  {/* Warm Golden Spotlight Halo on Hover */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-44 sm:h-44 rounded-full bg-radial from-amber-400/50 via-orange-500/25 to-transparent blur-2xl opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-175 transition-all duration-500 pointer-events-none" />

                  {/* Free-Floating Food Item with Framer Motion Spring Zoom & Tilt */}
                  <motion.div
                    whileHover={{
                      scale: 1.6,
                      rotate: tiltAngle,
                      y: -18,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 18,
                    }}
                    className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center z-20 cursor-pointer"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_12px_16px_rgba(0,0,0,0.4)] group-hover:drop-shadow-[0_28px_40px_rgba(0,0,0,0.75)] transition-all duration-300"
                    />
                  </motion.div>

                  {/* Realistic Dynamic Contact Shadow on the Ribbon */}
                  <div className="w-12 sm:w-20 h-2 bg-black/45 rounded-full blur-[3px] opacity-70 group-hover:opacity-15 group-hover:scale-175 transition-all duration-300 mb-1.5 mt-1" />

                  {/* Category Title with Golden Glow */}
                  <span className="font-display font-black text-[11px] sm:text-xs md:text-sm text-white tracking-wider uppercase block leading-tight drop-shadow-sm group-hover:text-amber-300 group-hover:scale-110 transition-all duration-200 truncate max-w-[110px] sm:max-w-none">
                    {cat.name}
                  </span>

                  {/* Expanding Golden Indicator Line */}
                  <span className="h-0.5 w-0 bg-amber-300 rounded-full mt-1 group-hover:w-12 transition-all duration-300 ease-out" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
