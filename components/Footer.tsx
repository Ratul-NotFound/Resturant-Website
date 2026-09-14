'use client'

import React from 'react'
import Link from 'next/link'
import {
  Flame,
  Phone,
  Mail,
  Clock,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  ShieldAlert,
  CalendarCheck,
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#141212] text-neutral-400 text-xs sm:text-sm pt-14 pb-8" data-purpose="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-neutral-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-white font-display font-black text-2xl tracking-tight">
              <span className="text-brand-red">
                <Flame className="w-7 h-7 fill-brand-red animate-pulse" />
              </span>
              <span>FLAME &amp; FEAST</span>
            </Link>

            <p className="text-neutral-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              The culinary synthesis of flame-grilled peri chicken and authentic royal kacchi biryani. Fresh, fiery, and deeply comforting.
            </p>

            <div className="flex items-center space-x-3 text-white pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-brand-red hover:scale-110 flex items-center justify-center transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-brand-red hover:scale-110 flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-brand-red hover:scale-110 flex items-center justify-center transition-all duration-200"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider mb-4">
              Menu Items
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#portion-section"
                  className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200"
                >
                  Classic Meals
                </a>
              </li>
              <li>
                <a
                  href="#portion-section"
                  className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200"
                >
                  Basmati Kacchi Biryani
                </a>
              </li>
              <li>
                <a
                  href="#portion-section"
                  className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200"
                >
                  Spicy Mutton Tehari
                </a>
              </li>
              <li>
                <a
                  href="#mega-deal"
                  className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200"
                >
                  Sharing Family Deals
                </a>
              </li>
              <li>
                <a
                  href="#portion-section"
                  className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200"
                >
                  Borhani &amp; Sweets
                </a>
              </li>
            </ul>
          </div>

          {/* Order & Support */}
          <div>
            <h4 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider mb-4">
              Order &amp; Support
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/track"
                  className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200 text-brand-gold font-semibold"
                >
                  Track Live Order
                </Link>
              </li>
              <li>
                <Link
                  href="/reserve"
                  className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200"
                >
                  Table Reservation
                </Link>
              </li>
              <li>
                <a
                  href="#branches"
                  className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200"
                >
                  Delivery Coverage Map
                </a>
              </li>
              <li>
                <a
                  href="tel:16588"
                  className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200"
                >
                  Catering &amp; Party Orders
                </a>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-200 text-neutral-500 hover:text-neutral-300"
                >
                  Staff Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours & Hotline */}
          <div>
            <h4 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider mb-4">
              Opening Hours
            </h4>
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
            <a href="#" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-neutral-300 transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <Link href="/track" className="hover:text-neutral-300 transition-colors">
              Order Tracker
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
