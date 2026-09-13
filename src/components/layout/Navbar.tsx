'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Calendar, Menu, Search, Clock, MapPin } from 'lucide-react';
import { CurrencySelector } from '../ui/CurrencySelector';
import { CurrencyCode } from '@/lib/types';
import { getLiveRestaurantStatus } from '@/lib/utils/hours';

interface NavbarProps {
  cartCount: number;
  currency: CurrencyCode;
  onSelectCurrency: (c: CurrencyCode) => void;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenLookup: () => void;
  onOpenSommelier: () => void;
  onToggleMobileMenu: () => void;
}

export function Navbar({
  cartCount,
  currency,
  onSelectCurrency,
  onOpenCart,
  onOpenReservation,
  onOpenLookup,
  onOpenSommelier,
  onToggleMobileMenu,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [liveStatus, setLiveStatus] = useState({ isOpen: true, statusText: 'Open for Dinner' });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    setLiveStatus(getLiveRestaurantStatus());
    const interval = setInterval(() => setLiveStatus(getLiveRestaurantStatus()), 60000);
    return () => { window.removeEventListener('scroll', handleScroll); clearInterval(interval); };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ${
        isScrolled
          ? 'navbar-light py-2.5 shadow-sm'
          : 'bg-white/0 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative flex items-center justify-center h-11 w-11 rounded-2xl bg-[#e8302a] shadow-lg shadow-red-500/30 group-hover:shadow-red-500/50 transition-all duration-300">
            <span className="font-serif text-xl font-black text-white leading-none">A</span>
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-black tracking-[0.15em] text-[#111] block leading-none">
              AURA
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#e8302a] block mt-0.5 font-semibold">
              ★★★ Michelin
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[12px] font-bold uppercase tracking-wider text-[#333]">
          <a href="#story"           className="hover:text-brand-red transition-colors duration-200">About</a>
          <a href="#menu"            className="hover:text-brand-red transition-colors duration-200">Menu</a>
          <a href="#sharing-feasts"  className="hover:text-brand-red transition-colors duration-200 text-amber-700">Offers</a>
          <a href="#atmosphere"      className="hover:text-brand-red transition-colors duration-200">Gallery</a>
          <a href="#reviews"         className="hover:text-brand-red transition-colors duration-200">Reviews</a>
          <a href="#reservations"    className="hover:text-brand-red transition-colors duration-200">Reservations</a>
          <a href="#location"        className="hover:text-brand-red transition-colors duration-200">Location</a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Live Status Dot */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/08 shadow-sm text-[11px] font-semibold text-gray-700">
            <span className={`h-2 w-2 rounded-full ${liveStatus.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`} />
            {liveStatus.isOpen ? 'Open Now' : 'Closed'}
          </div>

          {/* Currency Switcher */}
          <CurrencySelector currentCurrency={currency} onSelectCurrency={onSelectCurrency} />

          {/* Find Booking */}
          <button
            onClick={onOpenLookup}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-black/10 hover:border-black/30 text-[#333] hover:text-[#e8302a] text-[11px] font-semibold uppercase tracking-wide transition-all shadow-sm hover:shadow"
            title="Find reservation"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">Find Booking</span>
          </button>

          {/* Cart */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-white border border-black/10 hover:border-black/30 text-[#333] hover:text-[#e8302a] transition-all shadow-sm hover:shadow"
            aria-label="View order"
          >
            <ShoppingBag className="h-4.5 w-4.5" style={{ width: 18, height: 18 }} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-[#e8302a] text-white text-[9px] font-black flex items-center justify-center shadow-md shadow-red-500/40">
                {cartCount}
              </span>
            )}
          </button>

          {/* Reserve CTA */}
          <button
            onClick={onOpenReservation}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary text-xs font-bold uppercase tracking-wider"
          >
            <Calendar className="h-3.5 w-3.5" />
            Reserve
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2.5 rounded-xl bg-white border border-black/10 text-[#333] hover:text-[#e8302a] transition-colors shadow-sm"
            aria-label="Open mobile menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
