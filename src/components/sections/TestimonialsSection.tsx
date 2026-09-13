'use client';

import React from 'react';
import { reviewsData } from '@/data/reviewsData';
import { Award, Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section id="reviews" className="scroll-mt-28 relative py-24 sm:py-32 overflow-hidden bg-[#fafaf8]">

      {/* Subtle ambient blobs */}
      <div
        className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(232,48,42,0.05) 0%, transparent 70%)', transform: 'translate(-40%, -50%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)', transform: 'translate(30%, 30%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-brand-red border border-red-200 text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="h-3.5 w-3.5" />
            Critical Acclaim
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight uppercase mb-4">
            Celebrated by Leading{' '}
            <span className="text-gradient-red italic">Gastronomes</span>
          </h2>
          <p className="text-neutral-600 text-sm leading-relaxed max-w-xl mx-auto font-normal">
            Independent evaluations and citations from the world&apos;s most discerning culinary institutions.
          </p>
        </div>

        {/* 2x2 Clean Minimalist Review Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {reviewsData.map((review) => (
            <div
              key={review.id}
              className="rounded-3xl bg-white border border-neutral-100 hover:border-neutral-200 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.06)] transition-all duration-400 flex flex-col justify-between group"
            >
              {/* Quote mark & star rating */}
              <div className="flex items-start justify-between mb-4">
                <Quote className="h-7 w-7 text-neutral-300 group-hover:text-brand-red/40 transition-colors" />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Review Quote Body */}
              <p className="font-serif text-base sm:text-lg text-neutral-800 italic font-normal leading-relaxed mb-6 flex-1">
                &ldquo;{review.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-neutral-900 tracking-wide">
                    {review.publication}
                  </h4>
                  <p className="text-[11px] text-neutral-500 font-normal mt-0.5">
                    {review.author} · {review.year}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-red">
                    <Star className="h-3 w-3 fill-brand-red" /> {review.rating}
                  </span>
                  {review.awardBadge && (
                    <span className="text-[10px] text-neutral-500 block mt-0.5 font-medium">
                      {review.awardBadge}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Michelin Distinction Banner */}
        <div className="mt-10 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-brand-red to-brand-redDark p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0">
              <Award className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                The Michelin Guide Distinction
              </h3>
              <p className="text-red-100 text-xs sm:text-sm font-normal mt-0.5">
                Three Stars: &ldquo;Exceptional cuisine, worth a special journey.&rdquo;
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {[1, 2, 3].map((star) => (
              <div
                key={star}
                className="h-11 w-11 rounded-full bg-white flex items-center justify-center shadow-lg"
              >
                <Star className="h-5 w-5 fill-brand-red text-brand-red" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
