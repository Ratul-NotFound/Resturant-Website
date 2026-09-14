'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
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
} from 'lucide-react'
import { useStore } from '@/lib/store'
import BranchSelectModal from './BranchSelectModal'

export default function Navbar() {
  const {
    cart,
    getItemCount,
    setCartOpen,
    fulfillmentMode,
    setFulfillmentMode,
    selectedBranch,
    showToast,
  } = useStore()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false)
  const [bumpBadge, setBumpBadge] = useState(false)

  const itemCount = getItemCount()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Trigger bounce on item added
  useEffect(() => {
    if (itemCount > 0) {
      setBumpBadge(true)
      const timer = setTimeout(() => setBumpBadge(false), 450)
      return () => clearTimeout(timer)
    }
  }, [itemCount])

  const handleDeliveryMode = () => {
    setFulfillmentMode('delivery')
    showToast('Delivery Mode Selected', 'Deliver to your doorstep in 35-45 mins.')
  }

  const handleTakeawayMode = () => {
    setFulfillmentMode('takeaway')
    showToast('Takeaway Mode Selected', 'Pick up fresh & hot from your nearest outlet.')
  }

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-brand-dark text-slate-200 text-xs sm:text-sm py-2 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-brand-gold font-medium">
              <Clock className="w-3.5 h-3.5 mr-1.5 animate-spin" style={{ animationDuration: '12s' }} />
              Daily: 11:00 AM - 11:00 PM
            </span>
            <span className="hidden md:inline-block text-neutral-600">|</span>
            <button
              onClick={() => setIsBranchModalOpen(true)}
              className="hidden md:flex items-center text-slate-300 hover:text-brand-gold transition"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-red mr-1.5 animate-bounce" />
              Outlet: <span className="font-semibold text-white ml-1 underline decoration-dotted">{selectedBranch.area}</span> • Fast Delivery Active
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="tel:16588"
              className="flex items-center text-white bg-brand-red hover:bg-brand-darkred px-3 py-1 rounded-full font-bold transition-all text-xs hover:scale-105 active:scale-95 shadow-sm"
            >
              <Phone className="w-3 h-3 mr-1.5" /> HOTLINE: 16588
            </a>
            <div className="hidden sm:flex items-center space-x-2 text-neutral-400">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors duration-200"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors duration-200"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-neutral-200/80 py-2.5'
            : 'bg-white/95 backdrop-blur-sm border-b border-neutral-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-red-50 rounded-full flex items-center justify-center border-2 border-brand-red text-brand-red shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <Flame className="w-6 h-6 fill-brand-red text-brand-gold group-hover:text-amber-500 transition-colors" />
            </div>
            <div>
              <span className="block font-display font-black text-xl sm:text-2xl tracking-tight text-brand-dark leading-none group-hover:text-brand-red transition-colors">
                FLAME <span className="text-brand-red">&amp;</span> FEAST
              </span>
              <span className="text-[10px] tracking-widest text-neutral-500 font-bold uppercase">
                Piri-Piri • Kacchi Heritage
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-bold text-xs xl:text-sm">
            <Link
              href="/"
              className="px-3 py-2 text-slate-700 hover:text-brand-red hover:bg-red-50/70 rounded-full transition-all duration-200"
            >
              Home
            </Link>
            <Link
              href="/#portion-section"
              className="px-3 py-2 text-slate-700 hover:text-brand-red hover:bg-red-50/70 rounded-full transition-all duration-200"
            >
              Menu &amp; Portions
            </Link>
            <Link
              href="/#mega-deal"
              className="px-3 py-2 text-slate-700 hover:text-brand-red hover:bg-red-50/70 rounded-full transition-all duration-200 flex items-center gap-1"
            >
              <span className="flex h-2 w-2 rounded-full bg-brand-gold animate-ping" />
              Mega Feast
            </Link>
            <Link
              href="/#heritage"
              className="px-3 py-2 text-slate-700 hover:text-brand-red hover:bg-red-50/70 rounded-full transition-all duration-200"
            >
              Our Story
            </Link>
            <Link
              href="/#branches"
              className="px-3 py-2 text-slate-700 hover:text-brand-red hover:bg-red-50/70 rounded-full transition-all duration-200"
            >
              Branches
            </Link>
            <Link
              href="/reserve"
              className="px-3 py-2 text-slate-700 hover:text-brand-red hover:bg-red-50/70 rounded-full transition-all duration-200 flex items-center gap-1"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-emerald-600" />
              Book Table
            </Link>
            <Link
              href="/track"
              className="px-3 py-2 text-slate-700 hover:text-brand-red hover:bg-red-50/70 rounded-full transition-all duration-200"
            >
              Track Order
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Fulfillment Toggle Pill */}
            <div className="hidden sm:flex bg-neutral-100 p-1 rounded-full text-xs font-bold border border-neutral-200 relative">
              <button
                onClick={handleDeliveryMode}
                className={`px-3 py-1.5 rounded-full flex items-center space-x-1.5 transition-all duration-200 ${
                  fulfillmentMode === 'delivery'
                    ? 'bg-brand-red text-white shadow-sm'
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
                  fulfillmentMode === 'takeaway'
                    ? 'bg-brand-red text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                type="button"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Takeaway</span>
              </button>
            </div>

            {/* Store Locator Trigger */}
            <button
              onClick={() => setIsBranchModalOpen(true)}
              className="hidden md:flex items-center text-xs font-semibold text-slate-700 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 py-2 px-3 rounded-xl transition hover:shadow-sm"
              type="button"
            >
              <MapPin className="w-3.5 h-3.5 text-brand-red mr-1.5" />
              <span>{selectedBranch.area}</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative bg-brand-red hover:bg-brand-darkred text-white text-xs sm:text-sm font-bold py-2 sm:py-2.5 px-3.5 sm:px-5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center"
              type="button"
              aria-label="Open cart"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 mr-1.5 sm:mr-2" />
              <span className="hidden xs:inline">Tray</span>
              <span
                className={`ml-1 sm:ml-2 bg-yellow-400 text-brand-dark text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-sm ${
                  bumpBadge ? 'cart-badge-bump' : ''
                }`}
              >
                {itemCount}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-brand-red rounded-xl bg-neutral-50 border border-neutral-200"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
            {/* Fulfillment Switcher in Mobile */}
            <div className="flex bg-neutral-100 p-1 rounded-full text-xs font-bold border border-neutral-200 mb-2">
              <button
                onClick={handleDeliveryMode}
                className={`flex-1 py-2 rounded-full flex items-center justify-center space-x-1.5 ${
                  fulfillmentMode === 'delivery'
                    ? 'bg-brand-red text-white shadow-sm'
                    : 'text-slate-600'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Delivery</span>
              </button>
              <button
                onClick={handleTakeawayMode}
                className={`flex-1 py-2 rounded-full flex items-center justify-center space-x-1.5 ${
                  fulfillmentMode === 'takeaway'
                    ? 'bg-brand-red text-white shadow-sm'
                    : 'text-slate-600'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Takeaway</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm font-bold">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-neutral-50 hover:bg-red-50 hover:text-brand-red rounded-xl"
              >
                Home
              </Link>
              <Link
                href="/#portion-section"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-neutral-50 hover:bg-red-50 hover:text-brand-red rounded-xl"
              >
                Full Menu
              </Link>
              <Link
                href="/#mega-deal"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-neutral-50 hover:bg-red-50 hover:text-brand-red rounded-xl text-brand-red"
              >
                🔥 Mega Deal
              </Link>
              <Link
                href="/reserve"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-neutral-50 hover:bg-red-50 hover:text-brand-red rounded-xl text-emerald-700"
              >
                Reserve Table
              </Link>
              <Link
                href="/track"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-neutral-50 hover:bg-red-50 hover:text-brand-red rounded-xl"
              >
                Track Order
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setIsBranchModalOpen(true)
                }}
                className="p-3 bg-neutral-50 hover:bg-red-50 hover:text-brand-red rounded-xl text-left"
              >
                Branches ({selectedBranch.area})
              </button>
            </div>

            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
              <span>Hotline 24/7 Support:</span>
              <a href="tel:16588" className="font-extrabold text-brand-red">
                16588
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Branch Selector Modal */}
      <BranchSelectModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
      />
    </>
  )
}
