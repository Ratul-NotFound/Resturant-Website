# 1. CustomerReviews.tsx
reviews_code = '''\'use client\'

import React from 'react'
import { Star, Quote, CheckCircle2 } from 'lucide-react'
import { CUSTOMER_REVIEWS } from '@/lib/data'

export default function CustomerReviews() {
  return (
    <section className="py-12 sm:py-20 bg-white border-b border-neutral-100" id="reviews">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-1 bg-amber-50 border border-amber-200 text-amber-900 text-[11px] sm:text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-2.5 sm:mb-3 shadow-2xs">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>4.9 / 5.0 Verified Guest Rating</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            Loved By 50,000+ Food Lovers
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2 max-w-lg mx-auto">
            Real stories from our patrons who savor our flame-grilled chicken and heritage royal kacchi daily.
          </p>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#FCFBFA] rounded-3xl p-5 sm:p-6 border border-neutral-200/80 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-neutral-400">{review.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed mb-4">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-200/60">
                <div className="flex items-center space-x-2.5">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-9 h-9 rounded-full object-cover border border-neutral-200"
                  />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-neutral-900 leading-tight">
                      {review.name}
                    </h4>
                    <span className="text-[10px] text-neutral-400 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Verified Foodie
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-full">
                  {review.dish}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
'''
with open('components/CustomerReviews.tsx', 'w', encoding='utf-8') as f:
    f.write(reviews_code)
print('CustomerReviews.tsx done')

# 2. Footer.tsx
footer_code = '''\'use client\'

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
    <footer className="bg-[#141212] text-neutral-400 text-xs sm:text-sm pt-12 pb-24 lg:pb-12" data-purpose="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-neutral-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3.5">
            <Link href="/" className="flex items-center space-x-2 text-white font-display font-black text-xl sm:text-2xl tracking-tight">
              <span className="text-brand-red">
                <Flame className="w-6 h-6 fill-brand-red animate-pulse" />
              </span>
              <span>FLAME &amp; FEAST</span>
            </Link>

            <p className="text-neutral-400 text-xs sm:text-sm max-w-sm leading-relaxed">
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
            <h4 className="font-display font-black text-white text-xs uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-white transition">Full Menu</Link>
              </li>
              <li>
                <a href="/#mega-deal" className="hover:text-yellow-400 transition text-yellow-300 font-bold">Mega Deal (৳999)</a>
              </li>
              <li>
                <a href="/#heritage" className="hover:text-white transition">Our Heritage Story</a>
              </li>
              <li>
                <Link href="/reserve" className="hover:text-emerald-400 text-emerald-400 font-semibold transition">Book a Table</Link>
              </li>
            </ul>
          </div>

          {/* Strategic Outlets */}
          <div className="space-y-2.5">
            <h4 className="font-display font-black text-white text-xs uppercase tracking-wider">
              Strategic Outlets
            </h4>
            <ul className="space-y-1 text-xs">
              <li>Dhanmondi (Satmasjid Rd)</li>
              <li>Gulshan-2 (Madani Ave)</li>
              <li>Banani (Road 11)</li>
              <li>Uttara (Sector 7)</li>
              <li>Mirpur-10</li>
              <li>Bailey Road</li>
              <li>Chittagong (GEC Circle)</li>
            </ul>
          </div>

          {/* Hotline & Contact */}
          <div className="space-y-2.5">
            <h4 className="font-display font-black text-white text-xs uppercase tracking-wider">
              24/7 Support
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="tel:16588"
                className="inline-flex items-center gap-2 bg-brand-red/20 border border-brand-red/40 text-brand-red px-3 py-2 rounded-xl font-bold hover:bg-brand-red hover:text-white transition w-full"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Hotline: 16588</span>
              </a>

              <p className="flex items-center space-x-2 text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>11:00 AM – 11:30 PM (Daily)</span>
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
          <p>© {new Date().getFullYear()} Flame &amp; Feast Inc. All Rights Reserved.</p>
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
'''
with open('components/Footer.tsx', 'w', encoding='utf-8') as f:
    f.write(footer_code)
print('Footer.tsx done')
