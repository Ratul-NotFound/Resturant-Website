code = '''\'use client\'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Utensils,
  MapPin,
  CalendarCheck,
  Bike,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Phone,
} from 'lucide-react'
import { useStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingMobileBar() {
  const pathname = usePathname()
  const { getItemCount, getSubtotal, setCartOpen } = useStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const itemCount = mounted ? getItemCount() : 0
  const subtotal = mounted ? getSubtotal() : 0

  const isHome = pathname === '/'
  const isReserve = pathname === '/reserve'

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden pointer-events-none select-none"
      data-purpose="mobile-app-navigation"
    >
      {/* 1. Floating Animated Cart / Order Pill */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 450, damping: 30 }}
            className="px-3 pb-2 max-w-lg mx-auto pointer-events-auto"
          >
            <button
              onClick={() => setCartOpen(true)}
              type="button"
              className="w-full cta-shimmer bg-gradient-to-r from-brand-red via-[#D81232] to-[#9B0A21] active:from-[#9B0A21] text-white p-3 rounded-2xl shadow-[0_8px_25px_rgba(200,16,46,0.45)] border border-amber-400/30 flex items-center justify-between transition-transform active:scale-[0.98] group"
            >
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-white text-brand-red flex items-center justify-center font-black text-sm shadow-md">
                    {itemCount}
                  </div>
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400" />
                  </span>
                </div>

                <div className="text-left">
                  <span className="text-xs font-black uppercase tracking-wider block text-white flex items-center gap-1 leading-tight">
                    <span>Your Feast Tray</span>
                    <span className="text-[10px] text-amber-300 font-bold">({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                  </span>
                  <span className="text-sm font-black text-amber-300 block leading-tight mt-0.5">
                    {formatPrice(subtotal, true)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-white/20 group-hover:bg-white/30 text-white px-3.5 py-2 rounded-xl border border-white/25 shadow-inner transition-colors">
                <span>View Tray</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Persistent Mobile Bottom App Bar */}
      <nav className="bg-white/95 backdrop-blur-xl border-t border-neutral-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-2 pt-2 pb-safe pointer-events-auto">
        <div className="max-w-lg mx-auto grid grid-cols-5 gap-1 items-center">
          
          {/* Tab 1: Home */}
          <Link
            href="/"
            className={lex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all active:scale-95 }
          >
            <div className={w-6 h-6 flex items-center justify-center rounded-lg }>
              <Home className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Home</span>
          </Link>

          {/* Tab 2: Menu */}
          <a
            href="/#portion-section"
            className="flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all active:scale-95 text-neutral-500 hover:text-brand-red font-medium"
          >
            <div className="w-6 h-6 flex items-center justify-center rounded-lg">
              <Utensils className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Menu</span>
          </a>

          {/* Tab 3: Mega Deal Center Tab with Radiant Highlight */}
          <a
            href="/#mega-deal"
            className="flex flex-col items-center justify-center -mt-3.5 transition-all active:scale-95 group"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-brand-red via-brand-red to-amber-500 text-white flex items-center justify-center shadow-lg shadow-brand-red/35 border-2 border-white ring-2 ring-amber-400/50 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 animate-spin-slow" />
            </div>
            <span className="text-[9px] font-black text-brand-red tracking-tight mt-0.5 uppercase">৳999 Deal</span>
          </a>

          {/* Tab 4: Outlets / Map */}
          <a
            href="/#branches"
            className="flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all active:scale-95 text-neutral-500 hover:text-brand-red font-medium"
          >
            <div className="w-6 h-6 flex items-center justify-center rounded-lg">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Outlets</span>
          </a>

          {/* Tab 5: Reserve Table */}
          <Link
            href="/reserve"
            className={lex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all active:scale-95 }
          >
            <div className={w-6 h-6 flex items-center justify-center rounded-lg }>
              <CalendarCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Reserve</span>
          </Link>

        </div>
      </nav>
    </div>
  )
}
'''
with open('components/FloatingMobileBar.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
print('FloatingMobileBar.tsx done')
