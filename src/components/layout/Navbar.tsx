'use client';

import React, { useState } from 'react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectStoreClick?: () => void;
}

export function Navbar({ cartCount, onOpenCart, onSelectStoreClick }: NavbarProps) {
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'takeaway'>('delivery');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo Section */}
        <a className="flex items-center space-x-3 group" href="#">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center border-2 border-brand-red text-brand-red text-2xl shadow-sm group-hover:scale-105 transition-transform">
            <i className="fa-solid fa-fire-burner" />
          </div>
          <div>
            <span className="block font-display font-extrabold text-2xl tracking-tight text-brand-dark leading-none">
              FLAME <span className="text-brand-red">&amp;</span> FEAST
            </span>
            <span className="text-[10px] tracking-widest text-neutral-500 font-semibold uppercase">
              Piri-Piri • Kacchi Heritage
            </span>
          </div>
        </a>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 font-semibold text-sm">
          <a className="px-3 py-2 text-brand-red bg-red-50 rounded-full font-bold" href="#">
            Home
          </a>
          <a className="px-3 py-2 text-slate-700 hover:text-brand-red transition" href="#menu-highlights">
            Menu
          </a>
          <a className="px-3 py-2 text-slate-700 hover:text-brand-red transition" href="#portion-section">
            Portion Deals
          </a>
          <a className="px-3 py-2 text-slate-700 hover:text-brand-red transition" href="#mega-deal">
            Mega Feast
          </a>
          <a className="px-3 py-2 text-slate-700 hover:text-brand-red transition" href="#heritage">
            Our Story
          </a>
          <a className="px-3 py-2 text-slate-700 hover:text-brand-red transition" href="#branches">
            Branches
          </a>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center space-x-3">
          
          {/* Fulfillment Toggle Pill */}
          <div className="hidden sm:flex bg-neutral-100 p-1 rounded-full text-xs font-bold border border-neutral-200">
            <button
              type="button"
              onClick={() => setFulfillmentType('delivery')}
              className={`px-3 py-1.5 rounded-full shadow-sm flex items-center space-x-1.5 transition-all ${
                fulfillmentType === 'delivery'
                  ? 'bg-brand-red text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="fa-solid fa-motorcycle text-xs" />
              <span>Delivery</span>
            </button>
            <button
              type="button"
              onClick={() => setFulfillmentType('takeaway')}
              className={`px-3 py-1.5 rounded-full shadow-sm flex items-center space-x-1.5 transition-all ${
                fulfillmentType === 'takeaway'
                  ? 'bg-brand-red text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="fa-solid fa-bag-shopping text-xs" />
              <span>Takeaway</span>
            </button>
          </div>

          {/* Store Locator Quick Access */}
          <button
            type="button"
            onClick={onSelectStoreClick || (() => {
              const el = document.getElementById('branches');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            })}
            className="hidden md:flex items-center text-xs font-semibold text-slate-700 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 py-2 px-3 rounded-lg transition"
          >
            <i className="fa-solid fa-map-pin text-brand-red mr-1.5" />
            <span>Select Store</span>
          </button>

          {/* Cart Drawer Trigger Button */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-neutral-100 hover:bg-red-50 text-slate-700 hover:text-brand-red border border-neutral-200 transition-colors flex items-center justify-center"
            aria-label="View Cart"
          >
            <i className="fa-solid fa-basket-shopping text-base" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-white animate-scale-in">
                {cartCount}
              </span>
            )}
          </button>

          {/* Order Button */}
          <a
            className="bg-brand-red hover:bg-brand-darkred text-white text-sm font-bold py-2.5 px-5 rounded-full shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center"
            href="#menu-highlights"
          >
            <i className="fa-solid fa-utensils mr-2 text-xs" />
            <span>Order Now</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-brand-red hover:bg-neutral-100"
            aria-label="Toggle Navigation"
          >
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`} />
          </button>
        </div>

      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-100 bg-white px-4 py-4 space-y-2 shadow-lg animate-fade-in">
          <a
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-bold text-brand-red bg-red-50"
            href="#"
          >
            Home
          </a>
          <a
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-semibold text-slate-700 hover:bg-neutral-50"
            href="#menu-highlights"
          >
            Menu
          </a>
          <a
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-semibold text-slate-700 hover:bg-neutral-50"
            href="#portion-section"
          >
            Portion Deals
          </a>
          <a
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-semibold text-slate-700 hover:bg-neutral-50"
            href="#mega-deal"
          >
            Mega Feast
          </a>
          <a
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-semibold text-slate-700 hover:bg-neutral-50"
            href="#heritage"
          >
            Our Story
          </a>
          <a
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg font-semibold text-slate-700 hover:bg-neutral-50"
            href="#branches"
          >
            Branches
          </a>
        </div>
      )}
    </header>
  );
}
