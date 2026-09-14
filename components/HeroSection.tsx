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
    target: '#mega-deal',
  },
  {
    id: 'sides',
    name: 'PERI SIDES',
    image: '/images/categories/fries.png?v=2',
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
      className="relative overflow-hidden bg-neutral-950 min-h-screen flex flex-col justify-between"
      data-purpose="hero-banner"
    >
      {/* 1. Full-Bleed High-Definition Cinematic Food Stage */}
      <div className="relative flex-1 flex items-center pt-24 sm:pt-28 pb-8 sm:pb-12 w-full z-10">
        
        {/* Background Image: Sizzling Flame & Feast Spread in Authentic Environment */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdm284yXzGVEejz-0aK_r7cF1GFb39rENU6IBzqXmdKexlt6ZvbVt0W1e6TTSDfI8D5pIk_mdDZRBpoQdJO6JuRbsYEaisCbDkfEfXmXD_Q5zE-O2_Zehtu2hluoAh-6UQDLETqVBPauEuUv2cPQj9xc6Jj-cWGxkyOUc5uAI4rKoAhm6DBvw9r-ezf9cVafb-30tIEvuYXScw7WFUXNt287RAxsFvA8JnRUMuuz6151RHENGpxEpedg"
            alt="Flame & Feast Signature Delicacies"
            className="w-full h-full object-cover object-right lg:object-center filter brightness-[0.82] contrast-[1.08]"
          />
          {/* Directional Cinematic Vignette for Crystal-Clear Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/20 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/60" />
        </div>

        {/* Dynamic Sizzling Flame Embers */}
        <FlameParticles density={16} />

        {/* Hero Narrative Overlay */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl space-y-4 sm:space-y-6 text-left">
            
            {/* Giant Punchy Headline (Pure Commercial Restaurant Standard) */}
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
              className="text-base sm:text-xl text-neutral-200 font-medium max-w-2xl leading-relaxed drop-shadow-md"
            >
              450°C lava-rock seared Peri-Peri chicken &amp; 4-hour sealed clay handi Basmati Kacchi with pure saffron ghee. Prepared fresh across 7 Dhaka kitchens.
            </motion.p>

            {/* Action Buttons Cluster */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#portion-section"
                className="cta-shimmer bg-brand-red hover:bg-brand-darkred text-white text-sm sm:text-base font-black uppercase tracking-wider px-8 sm:px-10 py-4 sm:py-4.5 rounded-full shadow-2xl shadow-brand-red/50 hover:shadow-brand-red/70 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-3"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>ORDER NOW</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </a>

              <Link
                href="/reserve"
                className="bg-neutral-900/90 hover:bg-neutral-800 text-white border-2 border-white/30 hover:border-white text-sm sm:text-base font-bold px-7 sm:px-8 py-4 sm:py-4.5 rounded-full backdrop-blur-md shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-2.5"
              >
                <CalendarCheck className="w-5 h-5 text-amber-400" />
                <span>RESERVE TABLE</span>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>

      {/* 2. Herfy-Style Fast Category Ribbon (Seamless Floating Food Cutouts with Giant Zoom & Tilt) */}
      <div className="flex-shrink-0 w-full bg-brand-red border-t-2 border-b-2 border-brand-darkred shadow-2xl relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-6">
            {CATEGORY_RIBBON.map((cat, idx) => {
              const tiltAngle = idx % 2 === 0 ? -14 : 14
              return (
                <a
                  key={cat.id}
                  href={cat.target}
                  className="group relative flex flex-col items-center justify-center text-center cursor-pointer select-none py-1 hover:z-30"
                >
                  {/* 1. Warm Golden Spotlight Halo on Hover */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-radial from-amber-400/50 via-orange-500/25 to-transparent blur-2xl opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-175 transition-all duration-500 pointer-events-none" />

                  {/* 2. Free-Floating Food Item with Framer Motion Spring Zoom & Guaranteed 14° Tilt */}
                  <motion.div
                    whileHover={{
                      scale: 1.75,
                      rotate: tiltAngle,
                      y: -24,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 18,
                    }}
                    className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center z-20 cursor-pointer"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_14px_20px_rgba(0,0,0,0.4)] group-hover:drop-shadow-[0_32px_45px_rgba(0,0,0,0.75)] transition-all duration-300"
                    />
                  </motion.div>

                  {/* 3. Realistic Dynamic Contact Shadow on the Ribbon */}
                  <div className="w-14 sm:w-20 h-2.5 bg-black/45 rounded-full blur-[3px] opacity-70 group-hover:opacity-15 group-hover:scale-175 transition-all duration-300 mb-2 mt-1" />

                  {/* 4. Category Title with Golden Glow */}
                  <span className="font-display font-black text-xs sm:text-sm text-white tracking-wider uppercase block leading-tight drop-shadow-sm group-hover:text-amber-300 group-hover:scale-115 transition-all duration-200">
                    {cat.name}
                  </span>

                  {/* 5. Expanding Golden Indicator Line */}
                  <span className="h-0.5 w-0 bg-amber-300 rounded-full mt-1 group-hover:w-14 transition-all duration-300 ease-out" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
