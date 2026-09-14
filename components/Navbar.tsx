'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Flame,
  MapPin,
  Phone,
  ShoppingBag,
  Bike,
  UtensilsCrossed,
  Menu as MenuIcon,
  X,
  CalendarCheck,
  Sparkles,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  BookOpen,
} from 'lucide-react'
import { useStore } from '@/lib/store'
import BranchSelectModal from './BranchSelectModal'

export default function Navbar() {
  const pathname = usePathname()
  const {
    getItemCount,
    setCartOpen,
    fulfillmentMode,
    setFulfillmentMode,
    selectedBranch,
    showToast,
  } = useStore()

  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false)
  const [bumpBadge, setBumpBadge] = useState(false)

  // Safe client hydration mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const itemCount = mounted ? getItemCount() : 0
  const currentBranch = mounted && selectedBranch ? selectedBranch : { name: 'Dhanmondi Branch', area: 'Dhanmondi' }
  const currentMode = mounted ? fulfillmentMode : 'delivery'

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto close mobile drawer on route change or desktop resize
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Bounce badge on cart update
  useEffect(() => {
    if (itemCount > 0) {
      setBumpBadge(true)
      const timer = setTimeout(() => setBumpBadge(false), 450)
      return () => clearTimeout(timer)
    }
  }, [itemCount])

  // Fulfillment toggle
  const handleDeliveryMode = () => {
    if (currentMode !== 'delivery') {
      setFulfillmentMode('delivery')
      showToast('Delivery Mode', 'Delivering hot & fresh to your address.')
    }
  }

  const handleTakeawayMode = () => {
    if (currentMode !== 'takeaway') {
      setFulfillmentMode('takeaway')
      showToast('Takeaway Mode', 'Pick up ready from your selected branch.')
    }
  }

  // Active route helpers
  const isHomeActive = pathname === '/'
  const isMenuActive = pathname === '/menu'
  const isReserveActive = pathname === '/reserve'
  const isTrackActive = pathname.startsWith('/track')

  return (
    <>
      {/* Full-Screen Edge-to-Edge Sticky Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-200/80 py-3'
            : 'bg-white/90 backdrop-blur-sm border-b border-neutral-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo & Branch Selector Chip */}
          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-red to-brand-darkred flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-200">
                <Flame className="w-5 h-5 fill-white text-brand-gold" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-lg tracking-tight text-neutral-900 leading-none group-hover:text-brand-red transition-colors flex items-center gap-0.5">
                  FLAME<span className="text-brand-red font-serif italic text-base">&amp;</span>FEAST
                </span>
                <span className="text-[9px] tracking-widest text-neutral-400 font-bold uppercase mt-0.5">
                  Grill &amp; Kacchi Heritage
                </span>
              </div>
            </Link>

            {/* Outlet Selector Chip (Desktop) */}
            <button
              onClick={() => setIsBranchModalOpen(true)}
              type="button"
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-950 bg-neutral-100/80 hover:bg-neutral-200/80 py-1.5 px-3 rounded-xl border border-neutral-200/70 transition-all duration-150"
              title="Click to switch branch outlet"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
              <span>{currentBranch.area}</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>
          </div>

          {/* Center: Minimalist Single-Line Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 font-medium text-xs xl:text-sm text-neutral-600">
            <Link
              href="/"
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-150 ${
                isHomeActive
                  ? 'bg-neutral-900 text-white font-bold shadow-xs'
                  : 'hover:text-neutral-950 hover:bg-neutral-100/80'
              }`}
            >
              Home
            </Link>

            <Link
              href="/menu"
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-150 ${
                isMenuActive
                  ? 'bg-neutral-900 text-white font-bold shadow-xs'
                  : 'hover:text-neutral-950 hover:bg-neutral-100/80'
              }`}
            >
              Menu
            </Link>

            <Link
              href="/#mega-deal"
              className="px-3.5 py-1.5 rounded-full whitespace-nowrap text-neutral-700 hover:text-brand-red hover:bg-neutral-100/80 transition-all duration-150 flex items-center gap-1.5 group"
            >
              <span>Mega Feast</span>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded-md group-hover:bg-brand-red group-hover:text-white transition-colors">
                ৳999
              </span>
            </Link>

            <Link
              href="/#heritage"
              className="px-3.5 py-1.5 rounded-full whitespace-nowrap hover:text-neutral-950 hover:bg-neutral-100/80 transition-all duration-150"
            >
              Our Story
            </Link>

            <Link
              href="/#branches"
              className="px-3.5 py-1.5 rounded-full whitespace-nowrap hover:text-neutral-950 hover:bg-neutral-100/80 transition-all duration-150"
            >
              Outlets
            </Link>

            <Link
              href="/reserve"
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 ${
                isReserveActive
                  ? 'bg-emerald-800 text-white font-bold shadow-xs'
                  : 'text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50/70'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Reserve</span>
            </Link>

            <Link
              href="/track"
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 ${
                isTrackActive
                  ? 'bg-neutral-900 text-white font-bold shadow-xs'
                  : 'hover:text-neutral-950 hover:bg-neutral-100/80'
              }`}
            >
              <Bike className="w-3.5 h-3.5 text-brand-red" />
              <span>Track</span>
            </Link>
          </nav>

          {/* Right: Actions (Fulfillment Mode, Hotline, Tray, Mobile Toggle) */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 shrink-0">
            {/* Delivery / Takeaway Switch (XL screens) */}
            <div className="hidden xl:inline-flex items-center bg-neutral-100/90 p-0.5 rounded-full border border-neutral-200/70 text-xs font-semibold">
              <button
                onClick={handleDeliveryMode}
                className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all duration-150 ${
                  currentMode === 'delivery'
                    ? 'bg-white text-neutral-900 shadow-xs font-bold'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
                type="button"
              >
                <Bike className="w-3.5 h-3.5 text-brand-red" />
                <span>Delivery</span>
              </button>
              <button
                onClick={handleTakeawayMode}
                className={`px-3 py-1 rounded-full flex items-center gap-1.5 transition-all duration-150 ${
                  currentMode === 'takeaway'
                    ? 'bg-white text-neutral-900 shadow-xs font-bold'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
                type="button"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-brand-red" />
                <span>Takeaway</span>
              </button>
            </div>

            {/* Quick Hotline Call Link */}
            <a
              href="tel:16588"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-neutral-700 hover:text-brand-red px-3 py-1.5 rounded-xl hover:bg-neutral-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-red" />
              <span>16588</span>
            </a>

            {/* Cart Tray Button (Primary Luxury CTA) */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative bg-brand-red hover:bg-brand-darkred text-white text-xs sm:text-sm font-bold py-2 sm:py-2.5 px-4 sm:px-5 rounded-full shadow-md shadow-brand-red/20 hover:shadow-lg hover:shadow-brand-red/30 transition-all transform hover:scale-[1.03] active:scale-[0.97] flex items-center gap-2 shrink-0 group"
              type="button"
              aria-label="Open food tray"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
              <span>Tray</span>
              {itemCount > 0 ? (
                <span
                  className={`bg-white text-brand-red text-[11px] font-black min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center shadow-xs ${
                    bumpBadge ? 'cart-badge-bump' : ''
                  }`}
                >
                  {itemCount}
                </span>
              ) : (
                <span className="text-[11px] font-medium opacity-70">0</span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:text-neutral-950 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              type="button"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-brand-red" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Full-Screen Mobile Drawer (Directly under header) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Full-Screen Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 top-[65px] bg-black/40 backdrop-blur-xs z-30 lg:hidden"
              />

              {/* Full-Width Drawer Body */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="relative z-40 lg:hidden w-full border-t border-neutral-100 bg-white px-4 pt-4 pb-6 space-y-4 shadow-2xl max-h-[calc(100vh-70px)] overflow-y-auto"
              >
                {/* Fulfillment Switcher in Mobile Drawer */}
                <div className="flex bg-neutral-100 p-1 rounded-2xl text-xs font-bold border border-neutral-200/80">
                  <button
                    onClick={handleDeliveryMode}
                    className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                      currentMode === 'delivery'
                        ? 'bg-white text-brand-dark shadow-xs font-bold'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                    type="button"
                  >
                    <Bike className="w-4 h-4 text-brand-red" />
                    <span>Doorstep Delivery</span>
                  </button>
                  <button
                    onClick={handleTakeawayMode}
                    className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                      currentMode === 'takeaway'
                        ? 'bg-white text-brand-dark shadow-xs font-bold'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                    type="button"
                  >
                    <ShoppingBag className="w-4 h-4 text-brand-red" />
                    <span>Branch Takeaway</span>
                  </button>
                </div>

                {/* Mobile Navigation Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-semibold">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`p-3 rounded-2xl border transition flex items-center justify-between ${
                      isHomeActive
                        ? 'border-neutral-900 bg-neutral-900 text-white font-bold'
                        : 'border-neutral-200/80 bg-neutral-50 text-neutral-800 hover:bg-neutral-100'
                    }`}
                  >
                    <span>Home</span>
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </Link>

                  <Link
                    href="/menu"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`p-3 rounded-2xl border transition flex items-center justify-between ${
                      isMenuActive
                        ? 'border-neutral-900 bg-neutral-900 text-white font-bold'
                        : 'border-neutral-200/80 bg-neutral-50 text-neutral-800 hover:bg-neutral-100'
                    }`}
                  >
                    <span>Full Menu</span>
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </Link>

                  <Link
                    href="/#mega-deal"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-3 rounded-2xl border border-amber-200 bg-amber-50/70 text-amber-950 transition flex items-center justify-between col-span-2 sm:col-span-1"
                  >
                    <span className="flex items-center gap-1.5 font-bold text-brand-red">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      Mega Deal (৳999)
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </Link>

                  <Link
                    href="/#heritage"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-3 rounded-2xl border border-neutral-200/80 bg-neutral-50 text-neutral-800 hover:bg-neutral-100 transition flex items-center justify-between col-span-2 sm:col-span-1"
                  >
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-neutral-400" />
                      Our Story
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </Link>

                  <Link
                    href="/reserve"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`p-3 rounded-2xl border transition flex items-center justify-between ${
                      isReserveActive
                        ? 'border-emerald-800 bg-emerald-800 text-white font-bold'
                        : 'border-emerald-200 bg-emerald-50/50 text-emerald-900 hover:bg-emerald-100'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <CalendarCheck className="w-4 h-4 text-emerald-600" />
                      Reserve Table
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </Link>

                  <Link
                    href="/track"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`p-3 rounded-2xl border transition flex items-center justify-between ${
                      isTrackActive
                        ? 'border-neutral-900 bg-neutral-900 text-white font-bold'
                        : 'border-neutral-200/80 bg-neutral-50 text-neutral-800 hover:bg-neutral-100'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Bike className="w-4 h-4 text-brand-red" />
                      Track Order
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </Link>
                </div>

                {/* Outlet Quick Switcher in Mobile */}
                <div
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsBranchModalOpen(true)
                  }}
                  className="p-3.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 rounded-2xl cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center font-bold">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Active Outlet</p>
                      <p className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-brand-red transition-colors">
                        {currentBranch.name}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-neutral-700 bg-white border border-neutral-200 px-2.5 py-1 rounded-lg shadow-2xs">
                    Change
                  </span>
                </div>

                {/* Drawer Footer: Hotline & Staff Portal */}
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                  <div className="flex items-center space-x-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand-red" />
                    <span>Hotline:</span>
                    <a href="tel:16588" className="font-bold text-neutral-900 hover:text-brand-red">
                      16588
                    </a>
                  </div>

                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-1 text-neutral-400 hover:text-neutral-700 transition"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Staff Portal</span>
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Branch Selector Modal */}
      <BranchSelectModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
      />
    </>
  )
}
