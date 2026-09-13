'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, Clock, Utensils, X, ChevronUp } from 'lucide-react';

interface LiveCountdownStickyBarProps {
  onReserveClick: () => void;
}

export function LiveCountdownStickyBar({ onReserveClick }: LiveCountdownStickyBarProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 13, minutes: 14, seconds: 5 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 14, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Sticky Bottom Notification Bar (Inspired by Image 1) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-red-700 via-rose-800 to-red-900 border-t border-red-500/30 text-white py-2.5 px-4 shadow-2xl backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
          
          {/* Left: Live Kitchen Seating Countdown */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
            </span>
            <span className="font-medium text-stone-200">
              Kitchen Seating Window:
            </span>
            <span className="font-mono font-bold text-amber-300 bg-black/30 px-2.5 py-0.5 rounded-md border border-white/10">
              {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>

          {/* Center: Delivery / Curbside Notice */}
          <div className="hidden md:flex items-center gap-1.5 text-stone-200">
            <Utensils className="h-3.5 w-3.5 text-amber-300" />
            <span>Grand Tasting Cellar & Curbside Valet Service Active</span>
          </div>

          {/* Right: Instant Reservation CTA & Dismiss */}
          <div className="flex items-center gap-3">
            <button
              onClick={onReserveClick}
              className="px-4 py-1 rounded-full bg-white text-red-950 font-bold text-[11px] uppercase tracking-wider hover:bg-amber-300 transition-colors shadow-sm"
            >
              Book Table
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-stone-300 hover:text-white p-1"
              aria-label="Dismiss banner"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* Floating WhatsApp VIP Concierge Button (Inspired by Image 1) */}
      <a
        href="https://wa.me/12125550199?text=Hello%20AURA%20Concierge%2C%20I%20would%20like%20to%20inquire%20about%20a%20private%20dining%20reservation."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-14 right-5 z-40 group flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl shadow-green-600/50 hover:scale-105 transition-all duration-300"
        aria-label="Contact VIP Concierge on WhatsApp"
      >
        <MessageCircle className="h-5 w-5 fill-current" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          VIP Concierge
        </span>
      </a>
    </>
  );
}
