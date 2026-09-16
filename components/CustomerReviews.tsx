'use client'

import React, { useState } from 'react'
import { Star, Quote, CheckCircle2, Flame, Sparkles, Heart } from 'lucide-react'
import { CUSTOMER_REVIEWS } from '@/lib/data'
import { motion } from 'framer-motion'

const REVIEW_DISHES = [
  '🍖 Royal Basmati Kacchi',
  '🍗 4-REG Mega Platter',
  '🔥 Lava Flame Quarter',
]

export default function CustomerReviews() {
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <section
      className="py-12 sm:py-20 bg-[#121010] text-white relative overflow-hidden border-t border-b border-white/10"
      id="reviews"
      data-purpose="customer-reviews-section"
    >
      {/* Radiant Fiery Ambient Glow in Background */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-brand-red/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-72 sm:w-80 h-72 sm:h-80 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 relative z-10">
        
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] sm:text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-2.5 sm:mb-3 shadow-lg shadow-amber-500/5 backdrop-blur-md">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>4.9 / 5.0 (2,500+ Verified Guests)</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Loved By <span className="fiery-shimmer-text">50,000+ Foodies</span>
          </h2>
          <p className="text-xs sm:text-base text-neutral-400 mt-1.5 sm:mt-2 max-w-lg mx-auto leading-relaxed">
            Real stories from patrons who relish our flame-grilled peri chicken and slow-dum royal kacchi.
          </p>
        </div>

        {/* Mobile Swipeable Carousel -> Desktop Multi-Column Grid */}
        <div className="flex sm:grid sm:grid-cols-3 gap-3.5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-3 pt-1 px-1">
          {CUSTOMER_REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
              className="group relative bg-[#1B1717]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/10 hover:border-amber-400/40 shadow-2xl hover:shadow-[0_16px_36px_rgba(200,16,46,0.25)] transition-all duration-300 flex flex-col justify-between w-[84vw] max-w-[320px] sm:w-auto shrink-0 snap-center select-none overflow-hidden"
            >
              {/* Subtle Quote Watermark Icon in Top Right */}
              <Quote className="w-16 h-16 text-amber-400/10 absolute -top-2 -right-2 pointer-events-none group-hover:text-amber-400/20 group-hover:scale-110 transition-all duration-300" />

              <div>
                {/* Rating & Dish Tag Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-black text-amber-300 bg-amber-400/15 border border-amber-400/30 px-1.5 py-0.2 rounded-md ml-1">
                      5.0
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-neutral-400">{review.date}</span>
                </div>

                {/* Dish Badge */}
                <div className="mb-2.5">
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-lg">
                    {REVIEW_DISHES[idx % REVIEW_DISHES.length]}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed mb-4 font-normal">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Bottom Customer Info */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center space-x-2.5">
                  <div className="relative">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-amber-400/40 shadow-xs"
                    />
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-neutral-900 absolute -bottom-0.5 -right-0.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white leading-tight">
                      {review.name}
                    </h4>
                    <span className="text-[9px] sm:text-[10px] text-neutral-400 font-medium block mt-0.5">
                      {review.role}
                    </span>
                  </div>
                </div>

                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0">
                  Verified Feast
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel Indicators */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 mt-2">
          {CUSTOMER_REVIEWS.map((_, i) => (
            <span
              key={i}
              className="w-2 h-1.5 rounded-full bg-white/20 first:w-4 first:bg-brand-red transition-all"
            />
          ))}
        </div>

      </div>
    </section>
  )
}
