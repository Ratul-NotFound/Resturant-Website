'use client';

import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#141212] text-neutral-400 text-sm pt-14 pb-8" data-purpose="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-neutral-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 text-white font-display font-black text-2xl tracking-tight mb-3">
              <span className="text-brand-red">
                <i className="fa-solid fa-fire" />
              </span>
              <span>FLAME &amp; FEAST</span>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-sm leading-relaxed mb-4">
              The culinary synthesis of flame-grilled peri chicken and authentic royal kacchi biryani. Fresh, fiery, and deeply comforting.
            </p>
            <div className="flex items-center space-x-3 text-white">
              <a
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-brand-red flex items-center justify-center transition"
                href="#"
                aria-label="Facebook"
              >
                <i className="fa-brands fa-facebook-f text-xs" />
              </a>
              <a
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-brand-red flex items-center justify-center transition"
                href="#"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram text-xs" />
              </a>
              <a
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-brand-red flex items-center justify-center transition"
                href="#"
                aria-label="YouTube"
              >
                <i className="fa-brands fa-youtube text-xs" />
              </a>
              <a
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-brand-red flex items-center justify-center transition"
                href="#"
                aria-label="TikTok"
              >
                <i className="fa-brands fa-tiktok text-xs" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Menu Items</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a className="hover:text-white transition" href="#quick-categories">
                  Classic Meals
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#portion-section">
                  Basmati Kacchi Biryani
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#portion-section">
                  Spicy Mutton Tehari
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#mega-deal">
                  Sharing Family Deals
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#portion-section">
                  Borhani &amp; Sweets
                </a>
              </li>
            </ul>
          </div>

          {/* Order & Support */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Order &amp; Support</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a className="hover:text-white transition" href="#">
                  Track Live Order
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#">
                  Delivery Coverage Map
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#">
                  Catering &amp; Party Orders
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#">
                  Nutrition &amp; Halal Guarantee
                </a>
              </li>
              <li>
                <a className="hover:text-white transition" href="#">
                  Terms &amp; Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours & Hotline */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Opening Hours</h4>
            <div className="text-xs space-y-1.5">
              <p className="text-slate-300 font-semibold">Everyday:</p>
              <p className="text-neutral-400">11:00 AM - 11:00 PM</p>
              <p className="text-slate-300 font-semibold mt-3">Hotline Support:</p>
              <p className="text-brand-red font-black text-sm">16588 / 09612-444888</p>
              <p className="text-[11px] text-neutral-500 mt-2">Email: contact@flamefeastbd.com</p>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-3">
          <p>© 2026 FLAME &amp; FEAST Inc. Inspired by Galito&apos;s &amp; Heritage Biryani. All rights reserved.</p>
          <div className="flex space-x-4">
            <a className="hover:text-neutral-300" href="#">
              Privacy Policy
            </a>
            <span>•</span>
            <a className="hover:text-neutral-300" href="#">
              Terms of Service
            </a>
            <span>•</span>
            <a className="hover:text-neutral-300" href="#">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
