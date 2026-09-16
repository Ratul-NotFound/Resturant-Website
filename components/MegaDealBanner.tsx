'use client'

import React, { useState } from 'react'
import { Zap, Clock, ShoppingCart, Check } from 'lucide-react'
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
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    })

    // Add mega deal platter to cart
    addToCart(
      {
        id: MEGA_DEAL_DATA.id,
        name: MEGA_DEAL_DATA.title,
        nameBn: '৪ রেগ মেগা প্ল্যাটার (Mega Feast)',
        description: MEGA_DEAL_DATA.description,
        descriptionBn: '২টি পেরি কোয়ার্টার চিকেন, ২টি মিনি কাচ্চি, ৪টি ফ্রাইজ ও বোরহানী।',
        category: 'platters',
        image: '/images/dishes/feast.png',
        isBestseller: true,
        isAvailable: true,
        portions: [
          { label: '4-in-1 Feast', serves: '4 Persons', price: MEGA_DEAL_DATA.dealPrice, isDefault: true }
        ]
      },
      { label: '4-in-1 Feast', serves: '4 Persons', price: MEGA_DEAL_DATA.dealPrice, isDefault: true },
      { quantity: 1, instructions: 'Limited time promotional mega deal platter' }
    )

    showToast('Mega Feast Added!', '4-REG Platter added to tray at ৳999')
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <section
      className="bg-[#B30E26] text-white py-12 sm:py-16 relative overflow-hidden"
      data-purpose="promotional-deal-banner"
      id="mega-deal"
    >
      {/* Geometric Texture */}
      <div className="absolute inset-0 opacity-10 checkered-pattern pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-[#8A0A1D] rounded-3xl p-6 sm:p-10 border-4 border-amber-300/40 mega-deal-glow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          
          {/* Left Pricing & Content */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-yellow-400 text-neutral-950 px-3.5 py-1 rounded-md text-xs font-black uppercase mb-4 tracking-wider shadow-sm">
              <Zap className="w-4 h-4 fill-red-600 text-red-600 animate-bounce" />
              <span>Limited Time Mega Deal</span>
            </div>

            <div className="border-4 border-white p-5 rounded-2xl bg-[#A10C22] inline-block w-full transition-transform hover:scale-[1.02] duration-300 shadow-xl">
              <h3 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
                4 REG PLATTER
              </h3>
              <div className="flex items-baseline justify-center lg:justify-start gap-2 my-2">
                <span className="text-4xl sm:text-6xl font-black text-yellow-300 drop-shadow-md">
                  ৳999
                </span>
                <span className="text-xs sm:text-sm uppercase tracking-widest text-slate-200 font-bold line-through">
                  ৳1,480
                </span>
                <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded ml-1">
                  SAVE ৳481
                </span>
              </div>
              <p className="text-xs uppercase font-extrabold tracking-widest text-white/90">
                ALL DAY, EVERYDAY VALUE
              </p>
            </div>

            <p className="text-xs text-red-200 mt-3 font-medium">
              *T&amp;C Apply. Includes 2 Flame Quarter Chickens, 2 Mini Kacchi Bowls, 4 Peri Fries &amp; 2 Borhani Bottles.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={handleGrabDeal}
                className={
                  'cta-shimmer font-black px-8 py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all transform active:scale-95 flex items-center space-x-2 ' +
                  (added
                    ? 'bg-emerald-500 text-white shadow-emerald-500/40'
                    : 'bg-white hover:bg-yellow-400 text-neutral-950 hover:scale-105 shadow-xl')
                }
                type="button"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Added To Feast!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Grab Mega Deal</span>
                  </>
                )}
              </button>

              <span className="text-xs font-semibold text-red-100 flex items-center bg-black/30 px-3.5 py-1.5 rounded-full border border-white/10">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-yellow-300" /> Fast 35 Min Delivery
              </span>
            </div>
          </div>

          {/* Right 4-Dish Transparent Floating Showcase */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-5">
            {DEAL_CUTOUTS.map((dish, idx) => (
              <div
                key={idx}
                className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
              >
                {/* Ambient Golden Halo on Hover */}
                <div className="absolute inset-0 bg-radial from-amber-400/30 via-orange-500/10 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

                {/* 3D Floating Transparent Cutout */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-2 flex items-center justify-center transform group-hover:scale-120 group-hover:-translate-y-2 transition-all duration-300">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_14px_18px_rgba(0,0,0,0.55)] group-hover:drop-shadow-[0_24px_30px_rgba(0,0,0,0.75)] transition-all duration-300"
                  />
                </div>

                {/* Realistic Contact Shadow */}
                <div className="w-20 sm:w-24 h-2 bg-black/40 rounded-full blur-[3px] opacity-70 group-hover:opacity-20 group-hover:scale-130 transition-all duration-300 mx-auto mb-2" />

                <p className="font-display font-black text-xs sm:text-sm text-white group-hover:text-yellow-300 transition-colors truncate">
                  {dish.name}
                </p>
                <span className="text-[11px] text-yellow-300 font-semibold block mt-0.5">
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
