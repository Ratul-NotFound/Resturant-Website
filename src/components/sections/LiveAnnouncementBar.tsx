'use client';

import React from 'react';
import { Flame, Star, Sparkles, Tag, Clock } from 'lucide-react';

export function LiveAnnouncementBar() {
  const announcements = [
    { icon: Flame, text: 'Flame-Grilled over 400°C Kishu Binchotan & Royal Saffron Tehari', badge: 'HAUTE CUISINE' },
    { icon: Star, text: 'Three Michelin Stars · Manhattan 30th Floor Sky Sanctum', badge: 'MICHELIN 2025' },
    { icon: Tag, text: 'Use Code AURA20 for 20% Promotional Courtesy on Tasting Feasts', badge: 'CODE: AURA20' },
    { icon: Sparkles, text: '24H Brittany Dayboat Catch & Miyazaki A5 Wagyu Reserve Live', badge: 'DAILY HARVEST' },
  ];

  return (
    <div className="relative z-50 bg-neutral-950 text-white border-b border-white/10 text-xs overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        
        {/* Left Ticker Label */}
        <div className="hidden sm:flex items-center gap-2 text-brand-red font-black uppercase tracking-widest text-[10px] shrink-0">
          <span className="h-2 w-2 rounded-full bg-brand-red animate-ping" />
          <span>Live Service:</span>
        </div>

        {/* Marquee Content */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
            {announcements.concat(announcements).map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="inline-flex items-center gap-2 text-neutral-300 font-medium text-xs">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-brand-red text-white shadow-sm">
                    {item.badge}
                  </span>
                  <Icon className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>{item.text}</span>
                  <span className="text-neutral-600 font-bold ml-4">✦</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Quick Promo Indicator */}
        <div className="hidden md:flex items-center gap-2 text-[11px] font-bold text-amber-400 bg-amber-400/10 px-3 py-0.5 rounded-full border border-amber-400/20 shrink-0">
          <Tag className="h-3 w-3" />
          <span>20% OFF: AURA20</span>
        </div>
      </div>
    </div>
  );
}
