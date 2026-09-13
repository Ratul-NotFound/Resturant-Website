'use client';

import React from 'react';
import { X, Calendar, ShoppingBag, Phone, MapPin, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/restaurantConfig';

interface MobileDrawerProps {
  isOpen: boolean;
  cartCount: number;
  onClose: () => void;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export function MobileDrawer({
  isOpen,
  cartCount,
  onClose,
  onOpenCart,
  onOpenReservation,
}: MobileDrawerProps) {
  if (!isOpen) return null;

  const links = [
    { label: 'Heritage & Story', href: '#story' },
    { label: 'The 30-Course Menu', href: '#menu' },
    { label: 'Chef Signature Specials', href: '#specials' },
    { label: 'Atmosphere & Salons', href: '#atmosphere' },
    { label: 'Press & Accolades', href: '#reviews' },
    { label: 'Location & Private Cellar', href: '#location' },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden overflow-hidden animate-fade-in">
      {/* Dark Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" onClick={onClose} />

      <div className="relative w-full h-full bg-obsidian-950 flex flex-col justify-between p-6 sm:p-8 animate-slide-up">
        {/* Top Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full border border-gold-primary bg-obsidian-900">
              <span className="font-serif text-xl font-bold text-gold-primary">A</span>
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-[0.2em] text-champagne block">
                A U R A
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-gold-light">
                ★★★ Three Michelin Stars
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-neutral-800 text-neutral-400 hover:text-white"
            aria-label="Close navigation"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="my-auto py-6 space-y-4">
          {links.map((link, idx) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="group flex items-center justify-between py-2.5 text-lg font-serif text-neutral-300 hover:text-gold-hover transition-colors border-b border-neutral-900"
            >
              <span>{link.label}</span>
              <span className="text-xs font-mono text-neutral-600 group-hover:text-gold-primary transition-colors">
                0{idx + 1} →
              </span>
            </a>
          ))}
        </nav>

        {/* Bottom Actions & Info */}
        <div className="space-y-4 pt-4 border-t border-neutral-800">
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
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-obsidian-900 border border-neutral-700 text-xs font-semibold text-neutral-200 uppercase tracking-wider"
          >
            <ShoppingBag className="h-4 w-4 text-gold-primary" /> View Order ({cartCount} courses)
          </button>

          <div className="text-[11px] text-neutral-400 flex items-center justify-between pt-2">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3 text-gold-light" /> {RESTAURANT_INFO.phone}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-gold-light" /> Manhattan, NY
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
