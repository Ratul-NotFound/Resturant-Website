'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Flame,
  Clock,
  MapPin,
  Phone,
  ShoppingBag,
  Bike,
  UtensilsCrossed,
  Menu as MenuIcon,
  X,
  Facebook,
  Instagram,
  CalendarCheck,
  Search,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  Sparkles,
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

  // Scroll listener for sticky header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer on route change or resize
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

  // Smart fulfillment handlers: only toast if changed
  const handleDeliveryMode = () => {
    if (currentMode !== 'delivery') {
      setFulfillmentMode('delivery')
      showToast('Delivery Mode Selected', 'Deliver fresh & piping hot to your doorstep.')
    }
  }

  const handleTakeawayMode = () => {
    if (currentMode !== 'takeaway') {
      setFulfillmentMode('takeaway')
      showToast('Takeaway Mode Selected', 'Pick up ready & hot from your selected branch.')
    }
  }

  // Active route helpers
  const isHomeActive = pathname === '/'
  const isReserveActive = pathname === '/reserve'
  const isTrackActive = pathname.startsWith('/track')
  const isMenuActive = pathname === '/menu'

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-brand-dark text-slate-200 text-xs py-2 px-3 sm:px-6 border-b border-neutral-800 selection:bg-brand-red">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          {/* Left Info: Timings & Selected Outlet */}
          <div className="flex items-center space-x-3 sm:space-x-4 overflow-hidden">
            <span className="flex items-center text-brand-gold font-medium shrink-0">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-brand-gold" />
              <span className="hidden sm:inline">Daily:</span> 11 AM - 11 PM
            </span>
            <span className="text-neutral-700">|</span>
            <button
              onClick={() => setIsBranchModalOpen(true)}
              className="flex items-center text-slate-300 hover:text-brand-gold transition truncate text-left group"
              type="button"
              title="Click to switch branch outlet"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-red mr-1 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="truncate">
                Outlet: <span className="font-bold text-white underline decoration-dotted decoration-brand-gold/60 group-hover:text-brand-gold">{currentBranch.area}</span>
              </span>
              <span className="hidden md:inline text-neutral-400 ml-1.5 font-normal">• Fast Delivery</span>
            </button>
          </div>

          {/* Right Info: Hotline & Social Links */}
          <div className="flex items-center space-x-3 shrink-0">
            <a
              href="tel:16588"
              className="flex items-center text-white bg-brand-red hover:bg-brand-darkred px-2.5 sm:px-3 py-1 rounded-full font-bold transition-all text-[11px] sm:text-xs shadow-xs hover:scale-105 active:scale-95"
            >
              <Phone className="w-3 h-3 mr-1" />
              <span>16588</span>
            </a>
            <div className="hidden sm:flex items-center space-x-2 text-neutral-400 pl-1 border-l border-neutral-800">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook Page"
                className="hover:text-white transition-colors"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Page"
                className="hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-neutral-200/80 py-2.5'
            : 'bg-white/95 backdrop-blur-sm border-b border-neutral-100 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3 shrink-0 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-red-50 rounded-full flex items-center justify-center border-2 border-brand-red text-brand-red shadow-sm group-hover:scale-105 group-hover:rotate-6 transition-all duration-300">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-brand-red text-brand-gold group-hover:text-amber-500 transition-colors" />
            </div>
            <div>
              <span className="block font-display font-black text-lg sm:text-xl tracking-tight text-brand-dark leading-none group-hover:text-brand-red transition-colors">
                FLAME <span className="text-brand-red">&amp;</span> FEAST
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-neutral-500 font-bold uppercase block mt-0.5">
                Piri-Piri • Kacchi
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 font-bold text-xs xl:text-sm text-slate-700">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                isHomeActive
                  ? 'text-brand-red bg-red-50 font-black'
                  : 'hover:text-brand-red hover:bg-neutral-50'
              }`}
            >
              Home
            </Link>

            <Link
              href="/menu"
              className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                isMenuActive
                  ? 'text-brand-red bg-red-50 font-black'
                  : 'hover:text-brand-red hover:bg-neutral-50'
              }`}
            >
              Menu
            </Link>

            <Link
              href="/#mega-deal"
              className="px-3 py-1.5 rounded-full hover:text-brand-red hover:bg-neutral-50 transition-all duration-200 flex items-center gap-1.5 text-brand-dark"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
              </span>
              <span>Mega Feast</span>
            </Link>

            <Link
              href="/#heritage"
              className="px-3 py-1.5 rounded-full hover:text-brand-red hover:bg-neutral-50 transition-all duration-200"
            >
              Our Story
            </Link>

            <Link
              href="/#branches"
              className="px-3 py-1.5 rounded-full hover:text-brand-red hover:bg-neutral-50 transition-all duration-200"
            >
              Branches
            </Link>

            <Link
              href="/reserve"
              className={`px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                isReserveActive
                  ? 'text-emerald-700 bg-emerald-50 font-black shadow-xs'
                  : 'hover:text-emerald-600 hover:bg-emerald-50/50'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Book Table</span>
            </Link>

            <Link
              href="/track"
              className={`px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                isTrackActive
                  ? 'text-brand-red bg-red-50 font-black shadow-xs'
                  : 'hover:text-brand-red hover:bg-neutral-50'
              }`}
            >
              <Bike className="w-3.5 h-3.5 text-brand-red" />
              <span>Track Order</span>
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Desktop Fulfillment Pill Toggle (Visible on XL screens to prevent header wrapping) */}
            <div className="hidden xl:flex bg-neutral-100 p-1 rounded-full text-xs font-bold border border-neutral-200">
              <button
                onClick={handleDeliveryMode}
                className={`px-3 py-1.5 rounded-full flex items-center space-x-1.5 transition-all duration-200 ${
                  currentMode === 'delivery'
                    ? 'bg-brand-red text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                type="button"
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Delivery</span>
              </button>
              <button
                onClick={handleTakeawayMode}
                className={`px-3 py-1.5 rounded-full flex items-center space-x-1.5 transition-all duration-200 ${
                  currentMode === 'takeaway'
                    ? 'bg-brand-red text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                type="button"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Takeaway</span>
              </button>
            </div>

            {/* Branch Selector Quick Pill (Visible on Large screens) */}
            <button
              onClick={() => setIsBranchModalOpen(true)}
              className="hidden md:flex lg:hidden xl:flex items-center text-xs font-semibold text-slate-700 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 py-2 px-3 rounded-xl transition hover:shadow-xs"
              type="button"
              title="Change Delivery/Takeaway Outlet"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-red mr-1.5" />
              <span>{currentBranch.area}</span>
            </button>

            {/* Cart Tray Drawer Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative bg-brand-red hover:bg-brand-darkred text-white text-xs sm:text-sm font-bold py-2 sm:py-2.5 px-3.5 sm:px-5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center shrink-0"
              type="button"
              aria-label="Open food cart tray"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden xs:inline">Tray</span>
              {itemCount > 0 ? (
                <span
                  className={`ml-1.5 sm:ml-2 bg-yellow-400 text-brand-dark text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs ${
                    bumpBadge ? 'cart-badge-bump' : ''
                  }`}
                >
                  {itemCount}
                </span>
              ) : (
                <span className="ml-1 text-[11px] opacity-75 font-normal">0</span>
              )}
            </button>

            {/* Mobile / Tablet Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-brand-red rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 transition"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              type="button"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-brand-red" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Full Navigation Drawer */}
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
                className="fixed inset-0 top-[102px] bg-black/40 backdrop-blur-xs z-30 lg:hidden"
              />

              {/* Drawer Container */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="relative z-40 lg:hidden border-t border-neutral-100 bg-white px-4 pt-4 pb-6 space-y-4 shadow-2xl max-h-[calc(100vh-110px)] overflow-y-auto"
              >
                {/* Fulfillment Switcher in Mobile Drawer */}
                <div className="flex bg-neutral-100 p-1 rounded-2xl text-xs font-bold border border-neutral-200">
                  <button
                    onClick={handleDeliveryMode}
                    className={`flex-1 py-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
                      currentMode === 'delivery'
                        ? 'bg-brand-red text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    type="button"
                  >
                    <Bike className="w-4 h-4" />
                    <span>Doorstep Delivery</span>
                  </button>
                  <button
                    onClick={handleTakeawayMode}
                    className={`flex-1 py-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
                      currentMode === 'takeaway'
                        ? 'bg-brand-red text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    type="button"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Branch Takeaway</span>
                  </button>
                </div>

                {/* Main Navigation Links Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm font-bold">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`p-3 rounded-2xl border transition flex items-center justify-between ${
                      isHomeActive
                        ? 'border-brand-red bg-red-50 text-brand-red font-black'
                        : 'border-neutral-200 bg-neutral-50 text-slate-700 hover:bg-neutral-100'
                    }`}
                  >
                    <span>Home</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>

                  <Link
                    href="/menu"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`p-3 rounded-2xl border transition flex items-center justify-between ${
                      isMenuActive
                        ? 'border-brand-red bg-red-50 text-brand-red font-black'
                        : 'border-neutral-200 bg-neutral-50 text-slate-700 hover:bg-neutral-100'
                    }`}
                  >
                    <span>Full Menu</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>

                  <Link
                    href="/#mega-deal"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-3 rounded-2xl border border-amber-200 bg-amber-50/70 text-amber-900 hover:bg-amber-100 transition flex items-center justify-between col-span-2 sm:col-span-1"
                  >
                    <span className="flex items-center gap-1.5 font-black text-brand-red">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      Mega Feast Deal (৳999)
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>

                  <Link
                    href="/#heritage"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-3 rounded-2xl border border-neutral-200 bg-neutral-50 text-slate-700 hover:bg-neutral-100 transition flex items-center justify-between col-span-2 sm:col-span-1"
                  >
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-neutral-500" />
                      Our Heritage Story
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>

                  <Link
                    href="/reserve"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`p-3 rounded-2xl border transition flex items-center justify-between ${
                      isReserveActive
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-black'
                        : 'border-emerald-200 bg-emerald-50/50 text-emerald-800 hover:bg-emerald-100'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <CalendarCheck className="w-4 h-4 text-emerald-600" />
                      Book A Table
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>

                  <Link
                    href="/track"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`p-3 rounded-2xl border transition flex items-center justify-between ${
                      isTrackActive
                        ? 'border-brand-red bg-red-50 text-brand-red font-black'
                        : 'border-neutral-200 bg-neutral-50 text-slate-700 hover:bg-neutral-100'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Bike className="w-4 h-4 text-brand-red" />
                      Track Order
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>
                </div>

                {/* Outlet Selector Card in Mobile */}
                <div
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsBranchModalOpen(true)
                  }}
                  className="p-3.5 bg-neutral-50 hover:bg-red-50/50 border border-neutral-200 rounded-2xl cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center font-bold">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-neutral-400 uppercase font-bold tracking-wider">Active Outlet</p>
                      <p className="text-xs sm:text-sm font-extrabold text-brand-dark group-hover:text-brand-red transition">
                        {currentBranch.name}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-brand-red bg-white border border-red-200 px-2.5 py-1 rounded-lg shadow-2xs">
                    Switch Outlet
                  </span>
                </div>

                {/* Footer Quick Contact & Admin Link */}
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                  <div className="flex items-center space-x-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand-red" />
                    <span>Hotline:</span>
                    <a href="tel:16588" className="font-black text-brand-red hover:underline">
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
