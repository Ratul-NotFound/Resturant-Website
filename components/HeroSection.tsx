'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, ArrowRight, CalendarCheck } from 'lucide-react'
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
    target: '#mega-deal-section',
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
    <section className="relative overflow-hidden bg-neutral-950" data-purpose="hero-banner">
      {/* 1. Full-Bleed High-Definition Cinematic Food Stage */}
      <div className="relative min-h-[440px] sm:min-h-[490px] lg:min-h-[530px] flex items-center pt-24 sm:pt-28 pb-8 sm:pb-10">
        {/* Background Image: Sizzling Flame & Feast Spread */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdm284yXzGVEejz-0aK_r7cF1GFb39rENU6IBzqXmdKexlt6ZvbVt0W1e6TTSDfI8D5pIk_mdDZRBpoQdJO6JuRbsYEaisCbDkfEfXmXD_Q5zE-O2_Zehtu2hluoAh-6UQDLETqVBPauEuUv2cPQj9xc6Jj-cWGxkyOUc5uAI4rKoAhm6DBvw9r-ezf9cVafb-30tIEvuYXScw7WFUXNt287RAxsFvA8JnRUMuuz6151RHENGpxEpedg"
            alt="Flame & Feast Signature Delicacies"
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.78] contrast-[1.1]"
          />
          {/* Cinematic Directional Vignette Overlay for High Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/35 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/60" />
        </div>

        {/* Dynamic Sizzling Flame Embers */}
        <FlameParticles density={16} />

        {/* Hero Narrative Overlay */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl space-y-4 sm:space-y-5 text-left">

            {/* Giant Punchy Headline (Herfy/Sultan's Pure Restaurant Style) */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.02] uppercase drop-shadow-2xl"
            >
              BEST FLAME GRILL <br />
              <span className="text-brand-red"> &amp; ROYAL KACCHI </span> <br />
              IN BANGLADESH.
            </motion.h1>

            {/* Appetizing Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-sm sm:text-lg text-neutral-200 font-medium max-w-2xl leading-relaxed drop-shadow-md"
            >
              450°C lava-rock seared Peri-Peri chicken &amp; 4-hour sealed clay handi Basmati Kacchi with pure saffron ghee. Prepared fresh across 7 Dhaka kitchens.
            </motion.p>

            {/* Action Buttons Cluster */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              <a
                href="#portion-section"
                className="cta-shimmer bg-brand-red hover:bg-brand-darkred text-white text-sm sm:text-base font-black uppercase tracking-wider px-8 sm:px-10 py-3.5 sm:py-4 rounded-full shadow-2xl shadow-brand-red/50 hover:shadow-brand-red/70 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-3"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>ORDER NOW</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </a>

              <Link
                href="/reserve"
                className="bg-neutral-900/90 hover:bg-neutral-800 text-white border-2 border-white/30 hover:border-white text-sm sm:text-base font-bold px-7 sm:px-8 py-3.5 sm:py-4 rounded-full backdrop-blur-md shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-2.5"
              >
                <CalendarCheck className="w-5 h-5 text-amber-400" />
                <span>RESERVE TABLE</span>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>

      {/* 2. Herfy-Style Fast Category Ribbon (Seamless Floating Food Cutouts with Rich Micro-Interactions) */}
      <div className="bg-brand-red border-t-2 border-b-2 border-brand-darkred shadow-2xl relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-6">
            {CATEGORY_RIBBON.map((cat, idx) => (
              <a
                key={cat.id}
                href={cat.target}
                className="group relative flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer select-none"
              >
                {/* 1. Warm Golden Spotlight Halo on Hover */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-radial from-amber-400/40 via-orange-500/15 to-transparent blur-xl opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-125 transition-all duration-500 pointer-events-none" />

                {/* 2. Free-Floating Food Item with 3D Spring Lift & Slight Tilt */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center z-10 transform transition-all duration-300 ease-out group-hover:-translate-y-3 group-hover:scale-120 group-hover:rotate-2 active:scale-95">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_12px_18px_rgba(0,0,0,0.35)] group-hover:drop-shadow-[0_20px_25px_rgba(0,0,0,0.45)] transition-all duration-300"
                  />
                </div>

                {/* 3. Realistic Dynamic Contact Shadow on the Ribbon */}
                <div className="w-12 sm:w-16 h-2 bg-black/40 rounded-full blur-[2px] opacity-70 group-hover:opacity-30 group-hover:scale-125 transition-all duration-300 mb-1.5 mt-0.5" />

                {/* 4. Category Title with Golden Glow */}
                <span className="font-display font-black text-xs sm:text-sm text-white tracking-wider uppercase block leading-tight drop-shadow-sm group-hover:text-amber-300 group-hover:scale-105 transition-all duration-200">
                  {cat.name}
                </span>

                {/* 5. Expanding Golden Indicator Line */}
                <span className="h-0.5 w-0 bg-amber-300 rounded-full mt-1 group-hover:w-8 transition-all duration-300 ease-out" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
