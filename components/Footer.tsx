'use client'

import React from 'react'
import Link from 'next/link'
import {
  Flame,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#141212] text-neutral-400 text-xs sm:text-sm pt-12 pb-24 lg:pb-12" data-purpose="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-neutral-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3.5">
            <Link href="/" className="flex items-center space-x-2 text-white font-display font-black text-xl sm:text-2xl tracking-tight">
              <span className="text-brand-red">
                <Flame className="w-6 h-6 fill-brand-red" />
              </span>
              <span>FLAME &amp; FEAST</span>
            </Link>

            <p className="text-neutral-400 text-xs sm:text-sm max-w-sm leading-relaxed font-normal">
              The culinary synthesis of flame-grilled peri chicken and authentic royal kacchi biryani. Fresh, fiery, and deeply comforting across Dhaka &amp; Chittagong.
            </p>

            <div className="flex items-center space-x-3 text-white pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-brand-red hover:scale-110 flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-brand-red hover:scale-110 flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-brand-red hover:scale-110 flex items-center justify-center transition"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-white transition">Full Menu</Link>
              </li>
              <li>
                <a href="/#mega-deal" className="hover:text-amber-300 transition text-amber-400 font-semibold">Mega Deal (৳999)</a>
              </li>
              <li>
                <a href="/#heritage" className="hover:text-white transition">Our Heritage Story</a>
              </li>
              <li>
                <Link href="/reserve" className="hover:text-white transition">Reserve a Table</Link>
              </li>
            </ul>
          </div>

          {/* Strategic Outlets */}
          <div className="space-y-2.5">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
              Strategic Outlets
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>Dhanmondi (Satmasjid Rd)</li>
              <li>Gulshan 2 (Pink City)</li>
              <li>Banani (Road 11)</li>
              <li>Uttara (Sector 7)</li>
              <li>Mirpur 10</li>
              <li>Nazira Bazar (Old Dhaka)</li>
              <li>Chittagong (GEC Circle)</li>
            </ul>
          </div>

          {/* Hotline & Contact */}
          <div className="space-y-2.5">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">
              24/7 Hotline &amp; Support
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="tel:16588"
                className="inline-flex items-center gap-2 bg-brand-red/15 border border-brand-red/30 text-brand-red px-3 py-2 rounded-xl font-bold hover:bg-brand-red hover:text-white transition w-full"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Hotline: 16588</span>
              </a>

              <p className="flex items-center space-x-2 text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>11:00 AM - 11:30 PM (Daily)</span>
              </p>

              <p className="flex items-center space-x-2 text-neutral-400">
                <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>support@flamefeastbd.com</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-3">
          <p>&copy; {new Date().getFullYear()} Flame &amp; Feast. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="text-neutral-500 hover:text-neutral-300 transition">
              Staff Portal
            </Link>
            <span>•</span>
            <Link href="/track" className="text-neutral-500 hover:text-neutral-300 transition">
              Order Tracker
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
