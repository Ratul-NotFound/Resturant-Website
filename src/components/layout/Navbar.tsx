'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Calendar, Menu, Sparkles, Search, Wine, Globe } from 'lucide-react';
import { AudioPlayer } from '../ui/AudioPlayer';
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
  const [liveStatus, setLiveStatus] = useState({
    isOpen: true,
    statusText: 'Open for Dinner',
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    setLiveStatus(getLiveRestaurantStatus());

    const interval = setInterval(() => {
      setLiveStatus(getLiveRestaurantStatus());
    }, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0c0b0a]/90 backdrop-blur-xl border-b border-gold-primary/20 py-3 shadow-2xl shadow-black/60'
          : 'bg-gradient-to-b from-[#0c0b0a]/80 via-[#0c0b0a]/40 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative flex items-center justify-center h-10 w-10 rounded-full border border-gold-primary/40 bg-[#141210] group-hover:border-gold-primary group-hover:shadow-gold-glow transition-all duration-300">
            <span className="font-serif text-xl font-bold text-gold-primary group-hover:text-gold-hover">A</span>
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] text-champagne block leading-none">
              A U R A
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-gold-light/90 block mt-1">
              ★★★ Three Michelin Stars
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs font-medium uppercase tracking-widest text-[#cfc8bc]">
          <a href="#story" className="hover:text-gold-hover transition-colors">Heritage</a>
          <a href="#menu" className="hover:text-gold-hover transition-colors">The Menu</a>
          <a href="#specials" className="hover:text-gold-hover transition-colors">Chef Specials</a>
          <a href="#atmosphere" className="hover:text-gold-hover transition-colors">Atmosphere</a>
          <a href="#reviews" className="hover:text-gold-hover transition-colors">Accolades</a>
          <a href="#location" className="hover:text-gold-hover transition-colors">Hours & Cellar</a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Currency Switcher */}
          <CurrencySelector
            currentCurrency={currency}
            onSelectCurrency={onSelectCurrency}
          />

          {/* Manage Booking Quick Trigger */}
          <button
            onClick={onOpenLookup}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141210]/90 border border-gold-primary/20 hover:border-gold-primary/50 text-[#cfc8bc] hover:text-gold-hover text-xs transition-colors"
            title="Manage or look up existing reservation"
          >
            <Search className="h-3 w-3 text-gold-primary" />
            <span className="hidden xl:inline">Find Booking</span>
          </button>

          {/* Web Audio Ambient Player */}
          <AudioPlayer />

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-[#141210] border border-gold-primary/20 hover:border-gold-primary/50 text-[#cfc8bc] hover:text-gold-hover transition-all"
            aria-label="View tasting order"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gold-primary text-[#0c0b0a] text-[10px] font-bold flex items-center justify-center shadow-gold-sm animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Reserve Table CTA */}
          <button
            onClick={onOpenReservation}
            className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-xl gold-button text-xs font-bold uppercase tracking-wider shadow-gold-glow"
          >
            <Calendar className="h-3.5 w-3.5" /> Reserve
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-[#141210] border border-gold-primary/20 text-[#cfc8bc] hover:text-white"
            aria-label="Open mobile menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
