'use client';

import React from 'react';
import { reviewsData } from '@/data/reviewsData';
import { Award, Sparkles, Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section id="reviews" className="relative py-24 sm:py-32 bg-obsidian-950 overflow-hidden text-neutral-300">
      
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[radial-gradient(circle,rgba(212,175,55,0.04),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-primary/10 border border-gold-primary/30 text-gold-light text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="h-3.5 w-3.5 text-gold-primary" /> Critical Acclaim
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-champagne mb-4 tracking-tight">
            Celebrated by the World’s Leading Gastronomes
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
            Independent evaluations and press citations from the globe’s most esteemed culinary critics.
          </p>
        </div>

        {/* 4 Reviews 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {reviewsData.map((review) => (
            <div
              key={review.id}
              className="relative p-8 sm:p-10 rounded-3xl bg-obsidian-900/80 border border-gold-primary/25 shadow-2xl backdrop-blur-md flex flex-col justify-between hover:border-gold-primary/50 transition-all duration-300 group"
            >
              {/* Quote Mark */}
              <Quote className="h-10 w-10 text-gold-primary/20 group-hover:text-gold-primary/40 transition-colors mb-4" />

              <p className="font-serif text-base sm:text-lg text-champagne italic leading-relaxed mb-6">
                “{review.quote}”
              </p>

              <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-champagne">{review.publication}</h4>
                  <p className="text-xs text-neutral-400 font-sans">{review.author} · {review.year}</p>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-gold-primary">
                    <Star className="h-3.5 w-3.5 fill-gold-primary" /> {review.rating}
                  </span>
                  {review.awardBadge && (
                    <span className="text-[10px] text-gold-light block mt-0.5">
                      {review.awardBadge}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Michelin Stars Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-obsidian-900 via-obsidian-900 to-obsidian-900 border border-gold-primary/40 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3.5 rounded-2xl bg-gold-primary text-obsidian-950 shadow-gold-sm">
              <Award className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-champagne">
                The Michelin Guide Distinction
              </h3>
              <p className="text-xs text-neutral-400">
                Three Michelin Stars: “Exceptional cuisine, worth a special journey.”
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {[1, 2, 3].map((star) => (
              <div
                key={star}
                className="h-10 w-10 rounded-full border border-gold-primary/50 bg-obsidian-950 flex items-center justify-center text-gold-primary shadow-gold-sm"
              >
                <Star className="h-5 w-5 fill-gold-primary" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
