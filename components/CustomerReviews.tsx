'use client'

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
                  {review.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
