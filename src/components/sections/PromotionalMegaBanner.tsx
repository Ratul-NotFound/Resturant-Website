'use client';

import React from 'react';
import { MenuItem } from '@/lib/types';

interface PromotionalMegaBannerProps {
  onAddMegaDeal?: (item: MenuItem) => void;
}

export function PromotionalMegaBanner({ onAddMegaDeal }: PromotionalMegaBannerProps) {
  const handleGrabDeal = () => {
    if (onAddMegaDeal) {
      onAddMegaDeal({
        id: 'mega-deal-4reg',
        name: '4 REG PLATTER (Mega Deal)',
        slug: '4-reg-platter-mega-deal',
        category: 'prime-cuts',
        price: 999,
        description: '2 Flame Quarter Chickens, 2 Mini Kacchi Bowls, 4 Fries & Borhani.',
        shortDesc: '2 Flame Chickens, 2 Kacchi Bowls, 4 Fries & Borhani',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaFcWgUyzXsyZpSenL1y1Xzr9z35zekz3B_8yaHtOpTVeMWYftNR6r2Jbu1LNJ8aNQQSSpk5HfJ-higkTKAt6hZL6lwxeJGPTaVg7gZdmPlfjTKExkb0ofFoVkfekxfgxr0HRZ0mfWbloVJds4fg3i2qBb-zDeRPo0m2XkFgkP7Fy7FYT5WhyIvDJXCNK9h1Xo2WW0kOBpBVmnxo_eZVG0n96vJheUhnjfeGOAr5X7TaRKdoroMDi6Sw',
        ingredients: ['Flame Chicken', 'Kacchi Biryani', 'Fries', 'Borhani'],
        dietary: ['halal'],
        allergens: ['Dairy'],
        isChefSpecial: true,
        isPopular: true,
      });
    }
  };

  return (
    <section
      className="bg-brand-red text-white py-12 relative overflow-hidden"
      data-purpose="promotional-deal-banner"
      id="mega-deal"
    >
      {/* Geometric Background Texture */}
      <div className="absolute inset-0 opacity-15 checkered-pattern pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-brand-darkred rounded-3xl p-6 sm:p-10 border-4 border-red-400/40 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Banner Headline & Pricing Callout */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-yellow-400 text-brand-dark px-3 py-1 rounded-md text-xs font-black uppercase mb-4 tracking-wider">
              <i className="fa-solid fa-bolt" />
              <span>Limited Time Mega Deal</span>
            </div>

            <div className="border-4 border-white p-5 rounded-2xl bg-brand-red/90 inline-block w-full">
              <h3 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
                4 REG PLATTER
              </h3>
              <div className="flex items-baseline justify-center lg:justify-start gap-2 my-2">
                <span className="text-4xl sm:text-6xl font-black text-yellow-300">৳999</span>
                <span className="text-sm uppercase tracking-widest text-slate-200 font-bold">ALL INCLUSIVE</span>
              </div>
              <p className="text-xs uppercase font-extrabold tracking-widest text-white/90">
                ALL DAY, EVERYDAY VALUE
              </p>
            </div>

            <p className="text-xs text-red-200 mt-3">
              *T&amp;C Apply. Includes 2 Flame Quarter Chickens, 2 Mini Kacchi Bowls, 4 Fries &amp; Borhani.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                type="button"
                onClick={handleGrabDeal}
                className="bg-white hover:bg-yellow-400 text-brand-dark font-black px-7 py-3 rounded-full text-sm uppercase tracking-wider shadow-lg transition-all transform hover:scale-105 active:scale-95"
              >
                Grab Mega Deal
              </button>
              <span className="text-xs font-medium text-red-200 flex items-center">
                <i className="fa-regular fa-clock mr-1.5 text-yellow-300" /> Fast 35 Min Delivery
              </span>
            </div>
          </div>

          {/* Right 4 Combo Dishes Visual Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            
            {/* Dish 1 */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/20 text-center hover:bg-white/20 transition">
              <img
                alt="Quarter Flame Peri Chicken Combo"
                className="w-full h-28 sm:h-36 object-cover rounded-xl shadow-md mb-2"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaFcWgUyzXsyZpSenL1y1Xzr9z35zekz3B_8yaHtOpTVeMWYftNR6r2Jbu1LNJ8aNQQSSpk5HfJ-higkTKAt6hZL6lwxeJGPTaVg7gZdmPlfjTKExkb0ofFoVkfekxfgxr0HRZ0mfWbloVJds4fg3i2qBb-zDeRPo0m2XkFgkP7Fy7FYT5WhyIvDJXCNK9h1Xo2WW0kOBpBVmnxo_eZVG0n96vJheUhnjfeGOAr5X7TaRKdoroMDi6Sw"
              />
              <p className="font-bold text-xs sm:text-sm">Flame Peri Quarter</p>
              <span className="text-[11px] text-yellow-300 font-semibold">+ Peri Fries</span>
            </div>

            {/* Dish 2 */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/20 text-center hover:bg-white/20 transition">
              <img
                alt="Fragrant Mutton Kacchi Bowl"
                className="w-full h-28 sm:h-36 object-cover rounded-xl shadow-md mb-2"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNh6WcDIb9e8mO6oO1p-dnXfuo7z8QY8D8Z8FQRLeeds9zEMN_clP1fxUr9fsRL-bpcug1n-9JINkOG6SQ5bK57ihbDx4ROkp31P00MFLZi7_uhtXb8pGKucoz-XgwQF00LKZbODGuGMEwtEDcxfHHRbnu8v3yf3yu_b24Gmzk35yKIo0TW8KLNwj7aguTgNilnnKJJL54L8miWozcT4WI_dHCCudmtbufks0xn3aCKDAS07bfbLZznw"
              />
              <p className="font-bold text-xs sm:text-sm">Mini Dum Kacchi</p>
              <span className="text-[11px] text-yellow-300 font-semibold">+ Boiled Egg &amp; Potato</span>
            </div>

            {/* Dish 3 */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/20 text-center hover:bg-white/20 transition">
              <img
                alt="Fiery Grilled Wings & Skewers"
                className="w-full h-28 sm:h-36 object-cover rounded-xl shadow-md mb-2"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXvgQOg17MZfDQHRj_H0ZNtBK-9YLkYQq6AEdk4hhqZ7L7GlouFo18Pko4a3n_Fx7loHOnaCWrWZ9cc4XZMiGse6K9FwK16SoJ2jIJiJa1ROzoeFeLDQ1QwflfRidfKL4pCQFj_p9XTsqGaT_QwB-TK8Jiro6o11FLAdNBp0wNH0tq0CveJzWFulhS9tLawP7TZiaLF8Q_TS_-NBgL6ebEpnUxngRBpoLc5iOlmRv3QwnHNpigUZR5dA"
              />
              <p className="font-bold text-xs sm:text-sm">6x Fiery Wings</p>
              <span className="text-[11px] text-yellow-300 font-semibold">+ Herb Garlic Dip</span>
            </div>

            {/* Dish 4 */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/20 text-center hover:bg-white/20 transition">
              <img
                alt="Traditional Chui Jhal Spiced Beef Bowl"
                className="w-full h-28 sm:h-36 object-cover rounded-xl shadow-md mb-2"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPnp49ZmjhhdUWE82QV48naGVyDkzJaeUY6uw2z9veQJxkfDL7W8CKYmh9rezJiXdwrWDWC4YdENJFo_uUJOU8rDwhlmpV6iXvbm3awfWd2Wp6NwZQtX4h4-gYCrcvvqzCHSiQnchWs0pETPu0qGAJQuzIv-nP7SZgnz0kGH5mL562Nq156a5srEEHrFe3z9KRZUsmzmce8If0AXMjmTXHXLR_Ce2_cpeHEFNpPHoj_UTLpTd9GfWWIA"
              />
              <p className="font-bold text-xs sm:text-sm">Chui Ghost Rice Bowl</p>
              <span className="text-[11px] text-yellow-300 font-semibold">+ Firni Dessert</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
