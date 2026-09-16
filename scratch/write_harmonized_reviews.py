code = """'use client'

import React, { useState } from 'react'
import { Star, Quote, CheckCircle2, Flame, Sparkles, Heart } from 'lucide-react'
import { CUSTOMER_REVIEWS } from '@/lib/data'
import { motion } from 'framer-motion'

const REVIEW_DISHES = [
  '🍖 Saffron Basmati Kacchi',
  '🍗 4-REG Mega Platter',
  '🔥 Lava Flame Quarter',
]

export default function CustomerReviews() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section
      className="py-10 sm:py-20 bg-[#FCFBFA] relative overflow-hidden border-t border-neutral-200/70"
      id="reviews"
      data-purpose="customer-reviews-section"
    >
      {/* Soft Warm Amber Ambient Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 relative z-10">
        
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-amber-50 border border-amber-200 text-amber-900 text-[10px] sm:text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-2.5 sm:mb-3 shadow-2xs">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>4.9 / 5.0 (2,500+ Verified Guests)</span>
          </div>

          <h2 className="font-display text-xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
            Loved By <span className="text-brand-red">50,000+ Foodies</span>
          </h2>
          <p className="text-[11px] sm:text-sm text-neutral-500 mt-1 sm:mt-2 max-w-lg mx-auto leading-relaxed">
            Real stories from patrons who relish our flame-grilled peri chicken and slow-dum royal kacchi daily.
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
              className="group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-neutral-200/80 hover:border-brand-red/30 shadow-xs hover:shadow-xl hover:shadow-brand-red/5 transition-all duration-300 flex flex-col justify-between w-[84vw] max-w-[320px] sm:w-auto shrink-0 snap-center select-none overflow-hidden"
            >
              {/* Subtle Quote Watermark Icon in Top Right */}
              <Quote className="w-16 h-16 text-amber-500/10 absolute -top-2 -right-2 pointer-events-none group-hover:text-amber-500/20 group-hover:scale-110 transition-all duration-300" />

              <div>
                {/* Rating & Dish Tag Row */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-black text-amber-900 bg-amber-100/80 px-1.5 py-0.2 rounded-md ml-1">
                      5.0
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-neutral-400">{review.date}</span>
                </div>

                {/* Dish Badge */}
                <div className="mb-2.5">
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-brand-red bg-brand-red/10 px-2 py-0.5 rounded-md">
                    {REVIEW_DISHES[idx % REVIEW_DISHES.length]}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed mb-4 font-normal">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Bottom Customer Info */}
              <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                <div className="flex items-center space-x-2.5">
                  <div className="relative">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-neutral-200 shadow-2xs"
                    />
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-white absolute -bottom-0.5 -right-0.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-neutral-900 leading-tight">
                      {review.name}
                    </h4>
                    <span className="text-[9px] sm:text-[10px] text-neutral-400 font-medium block mt-0.5">
                      {review.role}
                    </span>
                  </div>
                </div>

                <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full shrink-0">
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
              className="w-2 h-1.5 rounded-full bg-neutral-300 first:w-4 first:bg-brand-red transition-all"
            />
          ))}
        </div>

      </div>
    </section>
  )
}
"""

with open('components/CustomerReviews.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
print('Harmonized CustomerReviews.tsx written successfully!')
