'use client'

import React from 'react'
import { Star, Quote, CheckCircle2 } from 'lucide-react'
import { CUSTOMER_REVIEWS } from '@/lib/data'

export default function CustomerReviews() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-neutral-100" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>4.9 / 5.0 Verified Guest Rating</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            Loved By 50,000+ Food Lovers
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2">
            Real stories from our patrons who savor our flame-grilled chicken and heritage royal kacchi daily.
          </p>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-brand-surface rounded-3xl p-6 border border-neutral-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 text-amber-500 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Author Profile */}
              <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-neutral-200/60">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-300"
                />
                <div>
                  <h4 className="text-xs font-bold text-brand-dark flex items-center gap-1">
                    {review.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </h4>
                  <p className="text-[10px] text-neutral-500">{review.role} • {review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
