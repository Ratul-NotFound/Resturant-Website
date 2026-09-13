'use client';

import React from 'react';
import { X, Calendar, ShoppingBag, Phone, MapPin, Sparkles, Wine, Search } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/restaurantConfig';
import { CurrencyCode } from '@/lib/types';

interface MobileDrawerProps {
  isOpen: boolean;
  cartCount: number;
  currency?: CurrencyCode;
  onSelectCurrency?: (c: CurrencyCode) => void;
  onClose: () => void;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenLookup?: () => void;
  onOpenSommelier?: () => void;
  onOpenPrivateDining?: () => void;
}

export function MobileDrawer({
  isOpen,
  cartCount,
  currency = 'USD',
  onSelectCurrency,
  onClose,
  onOpenCart,
  onOpenReservation,
  onOpenLookup,
  onOpenSommelier,
  onOpenPrivateDining,
}: MobileDrawerProps) {
  if (!isOpen) return null;

  const links = [
    { label: 'Philosophy & Terroir', href: '#story' },
    { label: 'The Culinary Experiences', href: '#menu' },
    { label: 'Chef Brigade Signatures', href: '#specials' },
    { label: 'Dining Salons & Atmosphere', href: '#atmosphere' },
    { label: 'Table Reservations', href: '#reservations' },
    { label: 'Critical Acclaim', href: '#reviews' },
    { label: 'Location & Private Cellar', href: '#location' },
  ];

  const handleNavClick = (href: string) => {
    onClose();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden overflow-hidden animate-fade-in">
      {/* Dark Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />

      <div className="relative w-full h-full bg-[#0c0b0a] flex flex-col justify-between p-6 sm:p-8 animate-slide-up overflow-y-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-gold-primary/20">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-11 w-11 rounded-full border border-gold-primary/50 bg-[#141210] shadow-gold-sm">
              <span className="font-serif text-xl font-bold text-gold-primary">A</span>
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-[0.25em] text-champagne block leading-none">
                A U R A
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-gold-light block mt-1">
                ★★★ Three Michelin Stars
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-[#1c1916] text-neutral-400 hover:text-white border border-gold-primary/20"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="my-auto py-6 space-y-3">
          {links.map((link, idx) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="group flex items-center justify-between py-2.5 text-base sm:text-lg font-serif text-neutral-300 hover:text-gold-hover transition-colors border-b border-neutral-900/80"
            >
              <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
              <span className="text-xs font-mono text-neutral-600 group-hover:text-gold-primary transition-colors">
                0{idx + 1} →
              </span>
            </a>
          ))}
        </nav>

        {/* Quick Concierge Modals Strip */}
        <div className="grid grid-cols-2 gap-2 py-4 border-t border-b border-neutral-800/80">
          {onOpenSommelier && (
            <button
              onClick={() => {
                onClose();
                onOpenSommelier();
              }}
              className="p-2.5 rounded-xl bg-[#141210] border border-gold-primary/25 text-gold-light hover:text-champagne text-left text-xs font-medium transition-colors flex items-center gap-2"
            >
              <Wine className="h-3.5 w-3.5 text-gold-primary shrink-0" />
              <span>Cellar Sommelier</span>
            </button>
          )}

          {onOpenLookup && (
            <button
              onClick={() => {
                onClose();
                onOpenLookup();
              }}
              className="p-2.5 rounded-xl bg-[#141210] border border-neutral-800 text-neutral-300 hover:text-white text-left text-xs font-medium transition-colors flex items-center gap-2"
            >
              <Search className="h-3.5 w-3.5 text-gold-primary shrink-0" />
              <span>Find Booking</span>
            </button>
          )}

          {onOpenPrivateDining && (
            <button
              onClick={() => {
                onClose();
                onOpenPrivateDining();
              }}
              className="col-span-2 p-2.5 rounded-xl bg-[#141210] border border-neutral-800 text-neutral-300 hover:text-white text-left text-xs font-medium transition-colors flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-gold-primary shrink-0" />
                Private Vault Buyouts & Gala Events
              </span>
              <span className="text-gold-light text-[11px]">Inquire →</span>
            </button>
          )}
        </div>

        {/* Bottom Actions & Info */}
        <div className="space-y-3 pt-4">
          <button
            onClick={() => {
              onClose();
              onOpenReservation();
            }}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl gold-button text-xs font-bold uppercase tracking-wider shadow-gold-glow"
          >
            <Calendar className="h-4 w-4" /> Reserve a Table
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenCart();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#141210] border border-gold-primary/30 text-xs font-semibold text-neutral-200 uppercase tracking-wider hover:border-gold-primary"
          >
            <ShoppingBag className="h-4 w-4 text-gold-primary" /> Curated Tasting Order ({cartCount} courses)
          </button>

          <div className="text-[11px] text-neutral-400 flex items-center justify-between pt-2">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3 text-gold-light" /> {RESTAURANT_INFO.phone}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-gold-light" /> 432 Park Ave, NY
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
