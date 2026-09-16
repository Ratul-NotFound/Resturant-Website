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
  Menu as MenuIcon,
  X,
  CalendarCheck,
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
  const currentBranch = mounted && selectedBranch ? selectedBranch : { name: 'Dhanmondi Flagship Outlet', area: 'Dhanmondi' }
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
      showToast('Delivery Mode Active', 'Delivering hot & fresh to your doorstep.')
    }
  }

  const handleTakeawayMode = () => {
    if (currentMode !== 'takeaway') {
      setFulfillmentMode('takeaway')
      showToast('Takeaway Mode Active', 'Pickup ready from your selected branch.')
    }
  }

  // Active route helpers
  const isHomeActive = pathname === '/'
  const isMenuActive = pathname === '/menu'
  const isReserveActive = pathname === '/reserve'
  const isTrackActive = pathname.startsWith('/track')

  return (
    <>
      {/* Edge-to-Edge Sticky Header with Optical Balance */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-neutral-200/80'
            : 'bg-white/90 backdrop-blur-xs border-b border-neutral-100'
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-[72px] flex items-center justify-between relative">
          
          {/* Left Wing: Brand Logo & Branch Outlet Selector */}
          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0 z-10">
            <Link href="/" className="flex items-center space-x-2.5 group shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-brand-red to-brand-darkred flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform duration-200">
                <Flame className="w-5 h-5 fill-white text-amber-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-base sm:text-lg tracking-tight text-neutral-900 leading-none group-hover:text-brand-red transition-colors flex items-center gap-0.5">
                  FLAME<span className="text-brand-red font-serif italic text-sm sm:text-base">&amp;</span>FEAST
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-widest text-neutral-400 font-bold uppercase mt-0.5">
                  Grill &amp; Kacchi Heritage
                </span>
              </div>
            </Link>

            {/* Outlet Selector Chip (Desktop) */}
            <button
              onClick={() => setIsBranchModalOpen(true)}
              type="button"
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-950 bg-neutral-100/80 hover:bg-neutral-200/80 py-1.5 px-3 rounded-xl border border-neutral-200/70 transition-all duration-150 shrink-0"
              title="Click to switch branch outlet"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
              <span>{currentBranch.area}</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>
          </div>

          {/* Center: Clean Mathematical Centered Navigation Links */}
          <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center space-x-1 xl:space-x-2 font-medium text-xs xl:text-sm text-neutral-600 z-10">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-xl transition-all duration-150 ${
                isHomeActive
                  ? 'text-brand-red font-bold bg-neutral-100/70'
                  : 'hover:text-neutral-950 hover:bg-neutral-100/50'
              }`}
            >
              Home
            </Link>

            <Link
              href="/menu"
              className={`px-3.5 py-2 rounded-xl transition-all duration-150 ${
                isMenuActive
                  ? 'text-brand-red font-bold bg-neutral-100/70'
                  : 'hover:text-neutral-950 hover:bg-neutral-100/50'
              }`}
            >
              Full Menu
            </Link>

            <a
              href="/#mega-deal"
              className="px-3.5 py-2 rounded-xl text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/50 transition-all duration-150 flex items-center gap-1.5"
            >
              <span>Mega Deal</span>
              <span className="bg-brand-red text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                ৳999
              </span>
            </a>

            <a
              href="/#heritage"
              className="px-3.5 py-2 rounded-xl text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/50 transition-all duration-150"
            >
              Our Story
            </a>

            <Link
              href="/reserve"
              className={`px-3.5 py-2 rounded-xl transition-all duration-150 flex items-center gap-1.5 ${
                isReserveActive
                  ? 'text-brand-red font-bold bg-neutral-100/70'
                  : 'hover:text-neutral-950 hover:bg-neutral-100/50'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5 text-neutral-500" />
              <span>Reserve Table</span>
            </Link>

            <Link
              href="/track"
              className={`px-3.5 py-2 rounded-xl transition-all duration-150 flex items-center gap-1.5 ${
                isTrackActive
                  ? 'text-brand-red font-bold bg-neutral-100/70'
                  : 'hover:text-neutral-950 hover:bg-neutral-100/50'
              }`}
            >
              <Bike className="w-3.5 h-3.5 text-neutral-500" />
              <span>Track Order</span>
            </Link>
          </nav>

          {/* Right Wing: Fulfillment Selector + Cart Trigger + Mobile Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0 z-10">
            
            {/* Delivery / Takeaway Switcher (Desktop) */}
            <div className="hidden sm:flex items-center bg-neutral-100 p-1 rounded-2xl border border-neutral-200/70 text-xs font-semibold">
              <button
                onClick={handleDeliveryMode}
                className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all duration-150 ${
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
                className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all duration-150 ${
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

            {/* Hotline Quick Call */}
            <a
              href="tel:16588"
              className="hidden 2xl:flex items-center space-x-1.5 text-xs font-bold text-neutral-700 bg-neutral-50 hover:bg-neutral-100 px-3 py-2 rounded-xl border border-neutral-200/60 transition"
              title="Call 24/7 Hotline"
            >
              <Phone className="w-3.5 h-3.5 text-brand-red" />
              <span>16588</span>
            </a>

            {/* Cart Drawer Trigger Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all duration-150 shadow-xs active:scale-95"
              type="button"
              aria-label="Open Cart Tray"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Tray</span>
              {itemCount > 0 && (
                <span
                  className={`w-5 h-5 rounded-full bg-brand-red text-white text-[11px] font-black flex items-center justify-center shadow-xs ${
                    bumpBadge ? 'cart-badge-bump' : ''
                  }`}
                >
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Drawer Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition active:scale-95 border border-neutral-200/80"
              type="button"
              aria-label="Toggle Mobile Navigation Drawer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Drawer Modal (Clean Editorial Aesthetic) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 top-16 sm:top-[72px] bg-black/50 backdrop-blur-xs z-40 lg:hidden"
              />

              {/* Drawer Container */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="fixed top-16 sm:top-[72px] left-0 right-0 bg-white border-b border-neutral-200/90 shadow-2xl z-50 lg:hidden px-4 py-5 space-y-4 max-h-[85vh] overflow-y-auto"
              >
                {/* Mobile Fulfillment Mode Switcher */}
                <div className="flex items-center bg-neutral-100 p-1 rounded-2xl border border-neutral-200 text-xs font-semibold">
                  <button
                    onClick={handleDeliveryMode}
                    className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                      currentMode === 'delivery'
                        ? 'bg-white text-neutral-900 shadow-xs font-bold'
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
                        ? 'bg-white text-neutral-900 shadow-xs font-bold'
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
                    className="p-3 rounded-2xl border border-neutral-200/80 bg-neutral-50 hover:bg-neutral-100 text-neutral-900 transition flex items-center justify-between col-span-2 sm:col-span-1 group"
                  >
                    <span className="flex items-center gap-2 font-bold">
                      <Flame className="w-4 h-4 text-brand-red shrink-0" />
                      <span>Mega Deal Platter</span>
                    </span>
                    <span className="bg-brand-red text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                      ৳999
                    </span>
                  </Link>

                  <Link
                    href="/#heritage"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-3 rounded-2xl border border-neutral-200/80 bg-neutral-50 text-neutral-800 hover:bg-neutral-100 transition flex items-center justify-between col-span-2 sm:col-span-1"
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-neutral-500" />
                      <span>Our Story</span>
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </Link>

                  <Link
                    href="/reserve"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`p-3 rounded-2xl border transition flex items-center justify-between ${
                      isReserveActive
                        ? 'border-neutral-900 bg-neutral-900 text-white font-bold'
                        : 'border-neutral-200/80 bg-neutral-50 text-neutral-800 hover:bg-neutral-100'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <CalendarCheck className="w-4 h-4 text-neutral-600" />
                      <span>Reserve Table</span>
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
                    <span className="flex items-center gap-2">
                      <Bike className="w-4 h-4 text-brand-red" />
                      <span>Track Order</span>
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
