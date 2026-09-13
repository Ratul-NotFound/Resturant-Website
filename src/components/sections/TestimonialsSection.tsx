'use client';

import React from 'react';
import { reviewsData } from '@/data/reviewsData';
import { Award, Star, Quote, Sparkles } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section id="reviews" className="scroll-mt-28 relative py-24 sm:py-32 overflow-hidden" style={{ background: '#fafaf8' }}>

      {/* Background blobs */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(232,48,42,0.05) 0%, transparent 70%)', transform: 'translate(-40%, -50%)' }} />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8302a]/08 border border-[#e8302a]/20 text-[#e8302a] text-[10px] uppercase tracking-[0.3em] font-bold mb-5">
            <Award className="h-3 w-3" />
            Critical Acclaim
          </div>
          <h2 className="headline-display text-3xl sm:text-5xl mb-5">
            Celebrated by Leading{' '}
            <span className="italic text-gradient-red">Gastronomes</span>
          </h2>
          <p className="text-[#666] text-sm leading-relaxed max-w-xl mx-auto">
            Independent evaluations and citations from the world's most discerning culinary institutions.
          </p>
        </div>

        {/* 2x2 Review Cards */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {reviewsData.map((review, idx) => (
            <div
              key={review.id}
              className="testimonial-card p-7 sm:p-8 flex flex-col justify-between group"
              style={{
                background: idx % 2 === 0 ? '#ffffff' : '#fef2f2',
                borderTop: `3px solid ${idx % 4 === 0 ? '#e8302a' : idx % 4 === 1 ? '#3a7d44' : idx % 4 === 2 ? '#f59e0b' : '#0d9488'}`,
              }}
            >
              {/* Large quote mark */}
              <div className="flex items-start justify-between mb-4">
                <Quote className="h-8 w-8 text-[#e8302a]/20 group-hover:text-[#e8302a]/35 transition-colors" />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-[#f59e0b] text-[#f59e0b]" />
                  ))}
                </div>
              </div>

              <p className="font-serif text-base sm:text-lg text-[#222] italic font-normal leading-relaxed mb-6 flex-1">
                "{review.quote}"
              </p>

              <div className="pt-5 border-t border-black/07 flex items-center justify-between">
                <div>
                  <h4 className="font-black text-[13px] text-[#111] tracking-wide">{review.publication}</h4>
                  <p className="text-[11px] text-[#888] font-medium mt-0.5">{review.author} · {review.year}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[12px] font-bold text-[#e8302a]">
                    <Star className="h-3.5 w-3.5 fill-[#e8302a]" /> {review.rating}
                  </span>
                  {review.awardBadge && (
                    <span className="text-[9px] text-[#666] block mt-0.5 font-medium">{review.awardBadge}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Michelin Distinction Banner */}
        <div className="mt-10 rounded-3xl overflow-hidden shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8"
            style={{ background: 'linear-gradient(135deg, #e8302a 0%, #c0281f 100%)' }}>
            <div className="flex items-center gap-4 text-white">
              <div className="h-14 w-14 rounded-2xl bg-white/15 flex items-center justify-center">
                <Award className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="font-black text-lg text-white tracking-wide">The Michelin Guide Distinction</h3>
                <p className="text-red-100 text-xs font-medium mt-0.5">
                  Three Stars: "Exceptional cuisine, worth a special journey."
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {[1, 2, 3].map((star) => (
                <div
                  key={star}
                  className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-lg"
                >
                  <Star className="h-5 w-5 fill-[#e8302a] text-[#e8302a]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
