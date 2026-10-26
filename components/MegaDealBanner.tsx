'use client'

import React, { useState } from 'react'
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
  const [timeLeft, setTimeLeft] = useState<{ hours: string; minutes: string; seconds: string }>({
    hours: '04',
    minutes: '42',
    seconds: '18',
  })

  // Real-time ticking countdown to midnight
  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const endOfDay = new Date()
      endOfDay.setHours(23, 59, 59, 999)
      const diff = endOfDay.getTime() - now.getTime()
      if (diff <= 0) {
        return { hours: '00', minutes: '00', seconds: '00' }
      }
      const h = Math.floor(diff / (1000 * 60 * 60))
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((diff % (1000 * 60)) / 1000)
      return {
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
      }
    }

    setTimeLeft(calculateTimeLeft())
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleGrabDeal = () => {
    confetti({
      particleCount: 70,
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
      className="bg-[#121111] text-white py-12 sm:py-20 relative overflow-hidden"
      data-purpose="promotional-deal-banner"
      id="mega-deal"
    >
      {/* Soft Ambient Warmth */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-[#1A1818] rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center shadow-2xl relative overflow-hidden">
          
          {/* Subtle Top Accent Shimmer */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400/80 via-brand-red to-orange-500/80 opacity-70" />

          {/* Left Pricing & Content */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-4 sm:space-y-6">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <div className="inline-flex items-center space-x-1.5 bg-amber-400/15 border border-amber-400/30 text-amber-300 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                <span>Limited Time Mega Deal</span>
              </div>

              {/* Live Ticking Countdown Clock */}
              <div className="inline-flex items-center space-x-1.5 bg-white/[0.05] border border-white/10 text-neutral-300 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-medium tracking-wider backdrop-blur-md">
                <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
                <span>ENDS IN {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight">
                4-REG Platter Feast
              </h3>
              <div className="flex flex-wrap items-baseline justify-center lg:justify-start gap-3 my-2">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-amber-400 leading-none">
                  ৳999
                </span>
                <span className="text-sm sm:text-base text-neutral-400 font-semibold line-through">
                  ৳1,480
                </span>
                <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full">
                  Save ৳481
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal max-w-md mx-auto lg:mx-0">
                Includes 2x Flame Quarter Chickens, 2x Mini Dum Kacchi Bowls, 4x Hand-Cut Peri Fries &amp; 2x Chilled Shahi Borhani Bottles.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                onClick={handleGrabDeal}
                className={`cta-shimmer font-bold px-7 sm:px-9 py-3.5 sm:py-4 rounded-2xl text-xs sm:text-sm uppercase tracking-wider transition-all transform active:scale-95 flex items-center justify-center space-x-2.5 ${
                  added
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'bg-brand-red hover:bg-brand-darkred text-white shadow-xl shadow-brand-red/30 hover:scale-[1.02]'
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
                    <span>Grab Mega Deal (৳999)</span>
                  </>
                )}
              </button>

              <span className="text-xs font-medium text-neutral-300 flex items-center justify-center bg-white/[0.05] px-4 py-3 rounded-2xl border border-white/10">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-amber-400 shrink-0" />
                <span>Fast 35 Min Delivery</span>
              </span>
            </div>
          </div>

          {/* Right 4-Dish Transparent Floating Showcase */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
            {DEAL_CUTOUTS.map((dish, idx) => (
              <div
                key={idx}
                className="group relative bg-white/[0.03] hover:bg-white/[0.07] backdrop-blur-md rounded-2xl p-3 sm:p-5 border border-white/[0.08] hover:border-amber-400/30 text-center transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl cursor-pointer"
              >
                {/* Subtle Ambient Halo on Hover */}
                <div className="absolute inset-0 bg-radial from-amber-400/20 via-orange-500/5 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

                {/* 3D Floating Cutout */}
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-2 flex items-center justify-center transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="max-w-full max-h-full object-contain filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] transition-all duration-300"
                  />
                </div>

                {/* Realistic Contact Shadow */}
                <div className="w-12 sm:w-20 h-1 sm:h-2 bg-black/50 rounded-full blur-[2px] opacity-70 group-hover:opacity-20 group-hover:scale-125 transition-all duration-300 mx-auto mb-1.5" />

                <p className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-amber-400 transition-colors truncate">
                  {dish.name}
                </p>
                <span className="text-[10px] sm:text-xs text-neutral-400 font-medium block mt-0.5 truncate">
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
