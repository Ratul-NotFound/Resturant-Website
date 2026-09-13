'use client';

import React from 'react';
import { reviewsData } from '@/data/reviewsData';
import { Award, Sparkles, Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section id="reviews" className="scroll-mt-28 relative py-28 sm:py-36 bg-[#0e0d0b] overflow-hidden text-[#cfc8bc]">
      
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[radial-gradient(circle,rgba(197,160,89,0.04),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141210] border border-gold-primary/20 text-gold-light text-[10px] uppercase tracking-[0.3em] mb-4">
            <Sparkles className="h-3 w-3 text-gold-primary" /> Critical Acclaim
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-champagne mb-4 tracking-[0.15em] uppercase">
            Celebrated by Leading Gastronomes
          </h2>
          <p className="text-xs sm:text-sm text-[#91887b] leading-relaxed font-sans font-light max-w-xl mx-auto">
            Independent evaluations and citations from the world’s most discerning culinary institutions.
          </p>
        </div>

        {/* 4 Reviews 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {reviewsData.map((review) => (
            <div
              key={review.id}
              className="relative p-8 sm:p-10 rounded-3xl bg-[#141210] border border-gold-primary/15 shadow-xl flex flex-col justify-between hover:border-gold-primary/35 transition-all duration-500 group"
            >
              {/* Quote Mark */}
              <Quote className="h-7 w-7 text-gold-primary/20 group-hover:text-gold-primary/35 transition-colors mb-6" />

              <p className="font-serif text-base sm:text-lg text-champagne/90 italic font-light leading-relaxed mb-8">
                “{review.quote}”
              </p>

              <div className="pt-6 border-t border-gold-primary/10 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-normal text-champagne tracking-wide">{review.publication}</h4>
                  <p className="text-[11px] text-[#91887b] font-sans font-light mt-0.5">{review.author} · {review.year}</p>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-xs font-light text-gold-primary">
                    <Star className="h-3 w-3 fill-gold-primary" /> {review.rating}
                  </span>
                  {review.awardBadge && (
                    <span className="text-[10px] text-gold-light/80 block mt-0.5 font-light">
                      {review.awardBadge}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Michelin Stars Distinction Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-[#141210] border border-gold-primary/20 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3 rounded-full bg-gold-primary/10 text-gold-primary border border-gold-primary/20">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-light text-champagne tracking-wide">
                The Michelin Guide Distinction
              </h3>
              <p className="text-xs text-[#91887b] font-light">
                Three Michelin Stars: “Exceptional cuisine, worth a special journey.”
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {[1, 2, 3].map((star) => (
              <div
                key={star}
                className="h-9 w-9 rounded-full border border-gold-primary/30 bg-[#0c0b0a] flex items-center justify-center text-gold-primary shadow-gold-sm"
              >
                <Star className="h-4 w-4 fill-gold-primary" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
