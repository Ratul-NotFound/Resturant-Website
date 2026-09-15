'use client';

import React from 'react';

export function TopAnnouncementBar() {
  return (
    <div
      className="bg-brand-dark text-slate-200 text-xs sm:text-sm py-2 px-4 border-b border-neutral-800"
      data-purpose="announcement-bar"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center space-x-4">
          <span className="flex items-center text-brand-gold font-medium">
            <i className="fa-regular fa-clock mr-1.5" /> Daily: 11:00 AM - 11:00 PM
          </span>
          <span className="hidden md:inline-block text-neutral-500">|</span>
          <span className="hidden md:flex items-center text-slate-300">
            <i className="fa-solid fa-location-dot text-brand-red mr-1.5" /> Store: PH City Central • Fast Delivery Active
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <a
            className="flex items-center text-white bg-brand-red hover:bg-brand-darkred px-3 py-0.5 rounded-full font-bold transition-all text-xs shadow-sm"
            href="tel:16588"
          >
            <i className="fa-solid fa-phone mr-1.5 text-[10px]" /> HOTLINE: 16588
          </a>
          <div className="flex items-center space-x-2 text-neutral-400">
            <a className="hover:text-white transition" href="#" aria-label="Facebook">
              <i className="fa-brands fa-facebook-f" />
            </a>
            <a className="hover:text-white transition" href="#" aria-label="Instagram">
              <i className="fa-brands fa-instagram" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
