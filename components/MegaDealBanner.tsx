'use client'

import React, { useState } from 'react'
import { Zap, Clock, ShoppingCart, Check, Sparkles } from 'lucide-react'
import { useStore } from '@/lib/store'
import { MEGA_DEAL_DATA } from '@/lib/data'

export default function MegaDealBanner() {
  const { addToCart, showToast } = useStore()
  const [added, setAdded] = useState(false)

  const handleGrabDeal = () => {
    // Add mega deal platter to cart
    addToCart(
      {
        id: MEGA_DEAL_DATA.id,
        name: MEGA_DEAL_DATA.title,
        nameBn: '৪ রেগ মেগা প্ল্যাটার (Mega Feast)',
        description: MEGA_DEAL_DATA.description,
        descriptionBn: '২টি পেরি কোয়ার্টার চিকেন, ২টি মিনি কাচ্চি, ৪টি ফ্রাইজ ও বোরহানী।',
        category: 'platters',
        image: MEGA_DEAL_DATA.dishes[0].image,
        isBestseller: true,
        isAvailable: true,
        portions: [
          { label: '4-in-1 Feast', serves: '4 Persons', price: MEGA_DEAL_DATA.dealPrice, isDefault: true }
        ]
      },
      { label: '4-in-1 Feast', serves: '4 Persons', price: MEGA_DEAL_DATA.dealPrice, isDefault: true },
      { quantity: 1, instructions: 'Limited time promotional mega deal platter' }
    )

    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <section
      className="bg-brand-red text-white py-12 sm:py-16 relative overflow-hidden"
      data-purpose="promotional-deal-banner"
      id="mega-deal"
    >
      {/* Geometric Texture */}
      <div className="absolute inset-0 opacity-15 checkered-pattern pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-brand-darkred rounded-3xl p-6 sm:p-10 border-4 border-amber-300/50 mega-deal-glow grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Pricing & Content */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-yellow-400 text-brand-dark px-3.5 py-1 rounded-md text-xs font-black uppercase mb-4 tracking-wider hover:bg-yellow-300 transition-colors shadow-sm">
              <Zap className="w-4 h-4 fill-red-600 text-red-600 animate-bounce" />
              <span>Limited Time Mega Deal</span>
            </div>

            <div className="border-4 border-white p-5 rounded-2xl bg-brand-red/90 inline-block w-full transition-transform hover:scale-[1.02] duration-300 shadow-xl">
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
                className={`cta-shimmer font-black px-8 py-3.5 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all transform active:scale-95 flex items-center space-x-2 ${
                  added
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white hover:bg-yellow-400 text-brand-dark hover:scale-105'
                }`}
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

              <span className="text-xs font-semibold text-red-100 flex items-center bg-black/20 px-3 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-yellow-300" /> Fast 35 Min Delivery
              </span>
            </div>
          </div>

          {/* Right 4-Dish Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-3.5 sm:gap-4">
            {MEGA_DEAL_DATA.dishes.map((dish, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/20 text-center hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl group cursor-pointer"
              >
                <div className="overflow-hidden rounded-xl mb-2 aspect-video sm:aspect-[4/3]">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover shadow-md group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
                  />
                </div>
                <p className="font-bold text-xs sm:text-sm group-hover:text-yellow-300 transition-colors truncate">
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
