'use client';

import React from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  onSeeMenuClick?: () => void;
  onFindBranchClick?: () => void;
}

export function HeroSection({ onSeeMenuClick, onFindBranchClick }: HeroSectionProps) {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative marble-bg pt-10 pb-20 overflow-hidden border-b border-amber-100/50"
      data-purpose="hero-banner"
    >
      {/* Floating Sticker Decorative Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        
        {/* 'Tastes Like Home' Stamp (Top Left) */}
        <div className="absolute -top-4 left-6 sm:left-16 z-20 transform -rotate-12 hover:rotate-0 transition-transform duration-300">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-brand-gold border-4 border-amber-300 flex flex-col items-center justify-center text-center shadow-lg text-brand-dark p-2">
            <i className="fa-solid fa-house-chimney text-lg sm:text-xl" />
            <span className="font-extrabold uppercase text-[11px] sm:text-xs leading-tight tracking-tight mt-0.5">
              Tastes Like<br />
              <span className="text-base sm:text-lg font-black">Home</span>
            </span>
          </div>
        </div>

        {/* '30 Years of Flavor' Badge (Top Right) */}
        <div className="absolute top-2 right-4 sm:right-16 z-20 hidden md:block transform rotate-6 hover:rotate-0 transition-transform duration-300">
          <div className="bg-emerald-600 text-white p-4 rounded-3xl shadow-xl flex items-center space-x-3 border-2 border-emerald-400">
            <div className="text-center font-black leading-none">
              <span className="text-3xl block">30</span>
              <span className="text-[10px] uppercase tracking-wider font-bold">Years</span>
            </div>
            <div className="border-l border-emerald-400 pl-3">
              <p className="font-display font-black text-sm uppercase tracking-wide">Flame Master</p>
              <p className="text-[10px] text-emerald-100">Galito&apos;s &amp; Dum Heritage</p>
            </div>
          </div>
        </div>

        {/* Main Headline & Subtitle */}
        <div className="text-center max-w-4xl mx-auto pt-8 sm:pt-4">
          <span className="inline-block bg-red-100 text-brand-red text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 shadow-sm">
            Freshly Flame-Grilled &amp; Traditional Slow-Dum
          </span>
          
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-brand-dark tracking-tight uppercase leading-[1.05]">
            FIERY, FRESH, <br className="hidden sm:inline" />
            <span className="text-brand-red underline decoration-brand-gold decoration-wavy decoration-2">
              FLAME-GRILLED
            </span>{' '}
            &amp; DUM
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            We serve succulent Flame-Grilled Peri-Peri Chicken marinated with 100% natural spices, alongside authentic slow-cooked royal Basmati Kacchi Biryani.
          </p>

          {/* Primary CTAs */}
          <div className="mt-7 flex flex-wrap justify-center items-center gap-4">
            <a
              className="bg-brand-red hover:bg-brand-darkred text-white text-base font-extrabold px-8 py-3.5 rounded-full shadow-lg hover:shadow-brand-red/30 transition transform hover:-translate-y-0.5"
              href="#menu-highlights"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('menu-highlights');
                if (onSeeMenuClick) onSeeMenuClick();
              }}
            >
              See Our Menu
            </a>
            
            <a
              className="bg-white hover:bg-neutral-50 text-brand-dark border-2 border-slate-300 text-base font-bold px-7 py-3 rounded-full shadow-sm hover:border-slate-400 transition flex items-center"
              href="#branches"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('branches');
                if (onFindBranchClick) onFindBranchClick();
              }}
            >
              <i className="fa-solid fa-location-dot text-brand-red mr-2" />
              Find a Galito&apos;s &amp; Feast
            </a>
          </div>
        </div>

        {/* Hero Center Visual Stage with Floating Cuts */}
        <div className="relative mt-12 mb-8 max-w-5xl mx-auto">
          
          {/* Floating Peri Peri Fries Cutout Decor */}
          <div className="absolute -left-6 md:left-4 top-1/4 z-10 hidden sm:block pointer-events-none transform -rotate-12 animate-pulse">
            <div className="bg-amber-100/80 backdrop-blur border border-amber-300 rounded-2xl p-2.5 shadow-md flex items-center space-x-2 text-xs font-bold text-amber-900">
              <span className="text-lg">🍟</span>
              <span>Hand-Cut Golden Fries</span>
            </div>
          </div>

          {/* Center Hero Showcase Image */}
          <div className="relative mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-amber-50 to-orange-100 max-w-3xl">
            <img
              alt="Whole Flame-Grilled Peri Peri Chicken Feast with Golden Fries and Sauces"
              className="w-full h-80 sm:h-96 object-cover object-center"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdm284yXzGVEejz-0aK_r7cF1GFb39rENU6IBzqXmdKexlt6ZvbVt0W1e6TTSDfI8D5pIk_mdDZRBpoQdJO6JuRbsYEaisCbDkfEfXmXD_Q5zE-O2_Zehtu2hluoAh-6UQDLETqVBPauEuUv2cPQj9xc6Jj-cWGxkyOUc5uAI4rKoAhm6DBvw9r-ezf9cVafb-30tIEvuYXScw7WFUXNt287RAxsFvA8JnRUMuuz6151RHENGpxEpedg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
              <div className="text-white">
                <span className="bg-brand-red text-white text-xs font-black uppercase px-2.5 py-1 rounded">
                  Chef Special
                </span>
                <h3 className="text-2xl font-black mt-1">Full Flame-Grilled Chicken Platter</h3>
                <p className="text-slate-200 text-sm">
                  Flame-seared over natural lava rocks with Lemon-Herb, Mild or Fiery Reserve sauce.
                </p>
              </div>
            </div>
          </div>

          {/* Floating Biryani Bowl Accent (Bottom Right) */}
          <div className="absolute -right-4 bottom-2 z-20 hidden md:block">
            <div className="bg-white p-3 rounded-2xl shadow-xl border border-neutral-100 flex items-center space-x-3">
              <img
                alt="Dum Kacchi Biryani Bowl"
                className="w-14 h-14 rounded-full object-cover border-2 border-brand-gold"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ3hlTDS2florp3-8n_G5p1XDBjMr1ThgvXu6-xVLIcP3oqW5MshEs0q_Vbz8Ofo_ORfoKXFZVmjDmuuuRLxLduhPAfgbrPvlzMqAD2s7i0LZLC6ndlONQ9sJt08F35F-Vdp1wTdGSaINQ4fx5HYYTxvI4qBzfPFgBgm4S_8-1m8Yg8teF6yaUW-HtnAQadBkHcf-GyKOmghYlWbbl5tlxfqMd8IMScbFE75uphNFAfNOVjLS3byEVHg"
              />
              <div>
                <p className="font-bold text-xs text-brand-dark leading-tight">Royal Basmati Kacchi</p>
                <p className="text-[11px] text-brand-red font-extrabold mt-0.5">Slow Dum • Tender Meat</p>
              </div>
            </div>
          </div>

        </div>

        {/* Quick Feature Category Cards (Screenshot 14 Bottom Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto pt-6" id="quick-categories">
          
          {/* Card 1: Classic Meals */}
          <div className="bg-white rounded-2xl p-5 shadow-custom-card hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col items-center text-center group">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-amber-100 shadow-md group-hover:scale-105 transition-transform duration-300">
              <img
                alt="Classic Chicken Quarter Meal with Fries"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBONBF65JqW646NAlOBRNFkGUmAE0vilLIz6DzxnrQI_X8RCEMSQ4hR5fQFFreSVXdyFh0Fth4kulFM39qOVyxPKawDPpX9Bn-aThNLEp6CHcQp5byaxsfQa0Sn6Brxp4lG-v1OlQobIr58z8TgFfT33QFuEmGtyfdwMv93MEWbzbAsnm6mTNLt7-AQFwbgyMAT3zrT0HzC3EQLk9AfHvsHYFkI906kEJ6k0eGo-rjDPqzNM94Aeo1Few"
              />
            </div>
            <h4 className="mt-4 font-display font-black text-lg text-brand-dark tracking-wide uppercase group-hover:text-brand-red transition">
              CLASSIC MEALS
            </h4>
            <p className="text-xs text-neutral-500 mt-1">
              Quarter or Half chicken served with spicy peri-peri chips &amp; garlic roll.
            </p>
            <a
              className="mt-3 text-xs font-bold text-brand-red hover:underline flex items-center"
              href="#portion-section"
            >
              View Meals <i className="fa-solid fa-arrow-right ml-1 text-[10px]" />
            </a>
          </div>

          {/* Card 2: Sharing Feasts */}
          <div className="bg-white rounded-2xl p-5 shadow-custom-card hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col items-center text-center group">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-red-100 shadow-md group-hover:scale-105 transition-transform duration-300">
              <img
                alt="Sharing Kacchi Biryani & Whole Chicken Platter"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC_EnvQ7pzQLzhnEA9cAub978il35XN6doDdAepXyi8jaapdlAUdj1qoO8zJCyIne_auQQQu2j8OWJ4DYRPmdUUy93qzG84Iga9bTnOfoqUOXsZcUN80bgSWP_HBbwI34DGmFtvt64fnXxmnwquqn1rWOr1_bRQa8Fp8FvI4l1R8-J-KW5dAJh8yelOWOs4Rz-9rhK-I6odWxQSh7YXl2bp5-Dv1YqSQzTubsA2Z0-89VJzJPGDLlG9g"
              />
            </div>
            <h4 className="mt-4 font-display font-black text-lg text-brand-dark tracking-wide uppercase group-hover:text-brand-red transition">
              SHARING FEASTS
            </h4>
            <p className="text-xs text-neutral-500 mt-1">
              Full birds, sharing kacchi platters, 2 sides &amp; dips for 4-6 diners.
            </p>
            <a
              className="mt-3 text-xs font-bold text-brand-red hover:underline flex items-center"
              href="#mega-deal"
            >
              Explore Platters <i className="fa-solid fa-arrow-right ml-1 text-[10px]" />
            </a>
          </div>

          {/* Card 3: Starters & Sides */}
          <div className="bg-white rounded-2xl p-5 shadow-custom-card hover:shadow-xl transition-all duration-300 border border-neutral-100 flex flex-col items-center text-center group">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-emerald-100 shadow-md group-hover:scale-105 transition-transform duration-300">
              <img
                alt="Sides - Crispy fries, dips and spicy chicken bites"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhCunxzsxjPSvtu3oGgxpF0zW_QEzOfGqdGz3FlK7FFGhcCN6kMzMN5Qrykz_9l5t0Go9UxBPAaQtiefGvrRPCMK6eSlt2D4FJ2gbA7V-1rP1KreGrNMlTKHUqtgHUFEza8Ou82WeDnOmOd49nwmnCkDfDTbtcv6i9YGh0AqdALoFbUIUBjb4A74yTTCI61QxQE0-DeiFVIhVjsLdv1hwmnSR-0stNIWXj1SG9i-V2rE0UDZoWkCv4vQ"
              />
            </div>
            <h4 className="mt-4 font-display font-black text-lg text-brand-dark tracking-wide uppercase group-hover:text-brand-red transition">
              STARTERS &amp; SIDES
            </h4>
            <p className="text-xs text-neutral-500 mt-1">
              Spicy chicken livers, pita bread, borhani shots and crispy bites.
            </p>
            <a
              className="mt-3 text-xs font-bold text-brand-red hover:underline flex items-center"
              href="#portion-section"
            >
              Taste Starters <i className="fa-solid fa-arrow-right ml-1 text-[10px]" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
