'use client';

import React from 'react';
import { X, Calendar, ShoppingBag, Phone, MapPin, Building2, Wine, Search } from 'lucide-react';
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
    { label: 'Menu & Signatures', href: '#menu' },
    { label: 'Royal Sharing Feasts', href: '#sharing-feasts' },
    { label: 'Table Reservations', href: '#reservations' },
    { label: 'Location & Service Hours', href: '#location' },
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full h-full bg-white text-neutral-900 flex flex-col justify-between p-6 sm:p-8 animate-slide-up overflow-y-auto shadow-2xl">
        {/* Top Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-black/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-11 w-11 rounded-2xl bg-brand-red text-white shadow-md font-bold text-xl">
              <span>A</span>
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-[0.2em] text-neutral-900 block leading-none">
                A U R A
              </span>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-red block mt-1">
                ★★★ Haute Gastronomie
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 transition-colors"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="my-auto py-6 space-y-2">
          {links.map((link, idx) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="group flex items-center justify-between py-3 text-lg font-serif font-bold text-neutral-800 hover:text-brand-red transition-colors border-b border-neutral-100"
            >
              <span className="group-hover:translate-x-1.5 transition-transform">{link.label}</span>
              <span className="text-xs font-mono font-medium text-neutral-400 group-hover:text-brand-red transition-colors">
                0{idx + 1} →
              </span>
            </a>
          ))}
        </nav>

        {/* Quick Concierge Modals Strip */}
        <div className="grid grid-cols-2 gap-2.5 py-4 border-t border-b border-neutral-100">
          {onOpenSommelier && (
            <button
              onClick={() => {
                onClose();
                onOpenSommelier();
              }}
              className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-neutral-700 hover:bg-red-50 hover:text-brand-red hover:border-brand-red/30 text-left text-xs font-semibold transition-all flex items-center gap-2 px-3.5"
            >
              <Wine className="h-4 w-4 text-brand-red shrink-0" />
              <span>Cellar Sommelier</span>
            </button>
          )}

          {onOpenLookup && (
            <button
              onClick={() => {
                onClose();
                onOpenLookup();
              }}
              className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-neutral-700 hover:bg-red-50 hover:text-brand-red hover:border-brand-red/30 text-left text-xs font-semibold transition-all flex items-center gap-2 px-3.5"
            >
              <Search className="h-4 w-4 text-brand-red shrink-0" />
              <span>Find Booking</span>
            </button>
          )}

          {onOpenPrivateDining && (
            <button
              onClick={() => {
                onClose();
                onOpenPrivateDining();
              }}
              className="col-span-2 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-neutral-700 hover:bg-red-50 hover:text-brand-red hover:border-brand-red/30 text-left text-xs font-semibold transition-all flex items-center justify-between px-3.5"
            >
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-brand-red shrink-0" />
                Private Dining & Salon Buyouts
              </span>
              <span className="text-brand-red font-bold text-xs">Inquire →</span>
            </button>
          )}
        </div>

        {/* Bottom Actions & Info */}
        <div className="space-y-2.5 pt-4">
          <button
            onClick={() => {
              onClose();
              onOpenReservation();
            }}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-[0.15em] shadow-lg shadow-brand-red/25 transition-all"
          >
            <Calendar className="h-4 w-4" /> Reserve a Table
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenCart();
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-xs font-bold text-neutral-800 uppercase tracking-[0.15em] transition-all"
          >
            <ShoppingBag className="h-3.5 w-3.5 text-brand-red" /> Tasting Order ({cartCount} courses)
          </button>

          <div className="text-[11px] text-neutral-500 font-medium flex items-center justify-between pt-2">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3 text-brand-red" /> {RESTAURANT_INFO.phone}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-brand-red" /> 432 Park Ave, NY
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
