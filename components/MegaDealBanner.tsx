'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Flame,
  Clock,
  Check,
  ShoppingCart,
} from 'lucide-react'
import { useStore } from '@/lib/store'
import { MEGA_DEAL_DATA } from '@/lib/data'
import confetti from 'canvas-confetti'

const DEAL_CUTOUTS = [
  {
    name: '2x Flame Quarters',
    subtitle: 'Lava-Rock Grilled',
    image: '/images/dishes/chicken.png',
  },
  {
    name: '2x Mini Dum Kacchi',
    subtitle: 'Saffron Basmati & Mutton',
    image: '/images/dishes/kacchi.png',
  },
  {
    name: '4x Golden Fries',
    subtitle: 'Hand-Cut Peri Spiced',
    image: '/images/dishes/fries.png',
  },
  {
    name: '2x Chilled Borhani',
    subtitle: 'Spicy Mint Yogurt Drink',
    image: '/images/dishes/borhani.png',
  },
]

export default function MegaDealBanner() {
  const { addToCart, showToast } = useStore()
  const [added, setAdded] = useState(false)

  const handleGrabDeal = () => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
    })

    addToCart(
      {
        id: MEGA_DEAL_DATA.id,
        name: MEGA_DEAL_DATA.title,
        nameBn: 'ফ্লেম অ্যান্ড ফিস্ট ৪-ইন-১ মেগা ফিস্ট',
        description: MEGA_DEAL_DATA.description,
        descriptionBn: '৪ জনের স্পেশাল কম্বো: ২টি ফ্লেম চিকেন কোয়ার্টার, ২টি মিনি বাসমতী কাচ্চি, ৪টি পেরি ফ্রাইস ও ২টি বোরহানি।',
        category: 'platters',
        image: '/images/dishes/feast.png',
        isBestseller: true,
        isAvailable: true,
        portions: [
          { label: '4-REG Platter', serves: '4 Persons', price: MEGA_DEAL_DATA.dealPrice, isDefault: true }
        ]
      },
      { label: '4-REG Platter', serves: '4 Persons', price: MEGA_DEAL_DATA.dealPrice, isDefault: true },
      { quantity: 1, instructions: 'Limited time promotional mega deal platter' }
    )

    showToast('Mega Feast Added!', '4-REG Platter added to tray at ৳999')
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <section
      className="bg-brand-dark text-white py-10 sm:py-16 relative overflow-hidden border-t border-b border-white/10"
      data-purpose="promotional-deal-banner"
      id="mega-deal"
    >
      {/* Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-gradient-to-br from-[#800A1D] via-[#630716] to-[#3B030D] rounded-3xl p-5 sm:p-8 lg:p-10 border border-amber-400/25 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center shadow-2xl">
          
          {/* Left Pricing & Content */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 bg-white/10 border border-amber-400/30 text-amber-300 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase mb-3 sm:mb-4 tracking-wider shadow-xs backdrop-blur-md">
              <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300 shrink-0" />
              <span>Limited-Time Signature Platter</span>
            </div>

            <div className="border border-white/20 p-4 sm:p-6 rounded-2xl bg-black/25 backdrop-blur-sm inline-block w-full shadow-inner">
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                4-REG MEGA FEAST
              </h3>
              
              <div className="flex flex-wrap items-baseline justify-center lg:justify-start gap-2.5 my-2">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-300 drop-shadow-xs leading-none">
                  ৳999
                </span>
                <span className="text-xs sm:text-sm uppercase tracking-wider text-white/50 font-bold line-through">
                  ৳1,480
                </span>
                <span className="bg-emerald-600/90 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                  SAVE ৳481
                </span>
              </div>
              
              <p className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-amber-200/90">
                Ultimate Sharing Platter for 4
              </p>
            </div>

            <p className="text-[11px] sm:text-xs text-neutral-300 mt-3 font-normal leading-relaxed">
              Includes 2 Flame Quarter Chickens, 2 Mini Basmati Kacchi bowls, 4 Peri-Peri Fries, and 2 chilled Borhani bottles.
            </p>

            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={handleGrabDeal}
                className={`font-black px-6 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all transform active:scale-95 flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                    : 'bg-white hover:bg-amber-300 text-neutral-950 hover:scale-[1.02]'
                }`}
                type="button"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Added To Tray!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Grab Mega Deal (৳999)</span>
                  </>
                )}
              </button>

              <span className="text-xs font-semibold text-neutral-300 flex items-center justify-center bg-black/30 px-3.5 py-2.5 rounded-full border border-white/10">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-amber-400 shrink-0" />
                Avg. 35 Min Delivery
              </span>
            </div>
          </div>

          {/* Right 4-Dish Transparent Floating Showcase */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-2.5 sm:gap-4">
            {DEAL_CUTOUTS.map((dish, idx) => (
              <div
                key={idx}
                className="group relative bg-white/5 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10 text-center hover:bg-white/10 transition-all duration-300 hover:shadow-xl cursor-pointer"
              >
                {/* Ambient Golden Halo on Hover */}
                <div className="absolute inset-0 bg-radial from-amber-400/20 via-orange-500/5 to-transparent blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

                {/* 3D Floating Transparent Cutout */}
                <div className="relative w-16 h-16 sm:w-22 sm:h-22 md:w-24 md:h-24 mx-auto mb-1 sm:mb-2 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="max-w-full max-h-full object-contain filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.4)] group-hover:drop-shadow-[0_16px_20px_rgba(0,0,0,0.6)] transition-all duration-300"
                  />
                </div>

                {/* Realistic Contact Shadow */}
                <div className="w-12 sm:w-16 h-1 sm:h-1.5 bg-black/40 rounded-full blur-[2px] opacity-70 group-hover:opacity-20 transition-all duration-300 mx-auto mb-1" />

                <p className="font-display font-bold text-[11px] sm:text-xs md:text-sm text-white group-hover:text-amber-300 transition-colors truncate">
                  {dish.name}
                </p>
                <span className="text-[9px] sm:text-[10px] text-amber-300/80 font-medium block mt-0.5 truncate">
                  {dish.subtitle}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
