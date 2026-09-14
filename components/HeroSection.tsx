'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Flame, MapPin, ArrowRight, Sparkles, Award } from 'lucide-react'
import FlameParticles from './FlameParticles'

export default function HeroSection() {
  return (
    <section
      className="relative marble-bg pt-8 pb-20 overflow-hidden border-b border-amber-100/60"
      data-purpose="hero-banner"
    >
      {/* Background Canvas Particles */}
      <FlameParticles density={28} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* 'Tastes Like Home' Stamp (Top Left) */}
        <div className="absolute -top-2 left-4 sm:left-12 z-20 badge-float-anim cursor-pointer hover:scale-110 transition-transform duration-300">
          <div className="w-22 h-22 sm:w-28 sm:h-28 rounded-full bg-brand-gold border-4 border-amber-300 flex flex-col items-center justify-center text-center shadow-lg text-brand-dark p-2 hover:shadow-2xl transition-shadow duration-300">
            <Home className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="font-extrabold uppercase text-[10px] sm:text-xs leading-tight tracking-tight mt-0.5">
              Tastes Like
              <br />
              <span className="text-sm sm:text-lg font-black">Home</span>
            </span>
          </div>
        </div>

        {/* '30 Years Flame Master' Badge (Top Right) */}
        <div className="absolute top-2 right-4 sm:right-12 z-20 hidden md:block badge-pulse-anim cursor-pointer hover:scale-105 transition-transform duration-300">
          <div className="bg-emerald-600 text-white p-3.5 sm:p-4 rounded-3xl shadow-xl flex items-center space-x-3 border-2 border-emerald-400">
            <div className="text-center font-black leading-none">
              <span className="text-2xl sm:text-3xl block">30</span>
              <span className="text-[10px] uppercase tracking-wider font-bold">Years</span>
            </div>
            <div className="border-l border-emerald-400 pl-3">
              <p className="font-display font-black text-xs sm:text-sm uppercase tracking-wide">
                Flame Master
              </p>
              <p className="text-[10px] text-emerald-100">Galito&apos;s &amp; Dum Heritage</p>
            </div>
          </div>
        </div>

        {/* Main Headline & Subtitle */}
        <div className="text-center max-w-4xl mx-auto pt-10 sm:pt-6">
          <div className="inline-flex items-center space-x-1.5 bg-red-100/90 text-brand-red text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Freshly Flame-Grilled &amp; Traditional Slow-Dum</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-brand-dark tracking-tight uppercase leading-[1.05]">
            FIERY, FRESH, <br className="hidden sm:inline" />
            <span className="fiery-shimmer-text underline decoration-brand-gold decoration-wavy decoration-2">
              FLAME-GRILLED
            </span>{' '}
            &amp; DUM
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            We serve succulent Flame-Grilled Peri-Peri Chicken marinated with 100% natural spices, alongside authentic slow-cooked royal Basmati Kacchi Biryani.
          </p>

          {/* Primary CTAs */}
          <div className="mt-7 flex flex-wrap justify-center items-center gap-3 sm:gap-4">
            <a
              href="#portion-section"
              className="cta-shimmer bg-brand-red hover:bg-brand-darkred text-white text-sm sm:text-base font-extrabold px-7 sm:px-8 py-3.5 rounded-full shadow-lg hover:shadow-brand-red/40 transition-all transform hover:-translate-y-1 active:translate-y-0 active:scale-95"
            >
              See Our Menu
            </a>
            <a
              href="#branches"
              className="bg-white hover:bg-neutral-50 text-brand-dark border-2 border-slate-300 text-sm sm:text-base font-bold px-6 sm:px-7 py-3 rounded-full shadow-sm hover:border-slate-400 hover:shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center"
            >
              <MapPin className="w-4 h-4 text-brand-red mr-2" /> Find a Galito&apos;s &amp; Feast
            </a>
            <Link
              href="/reserve"
              className="bg-brand-gold hover:bg-amber-500 text-brand-dark text-sm sm:text-base font-extrabold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              Book a Table
            </Link>
          </div>
        </div>

        {/* Hero Center Visual Stage */}
        <div className="relative mt-12 mb-8 max-w-5xl mx-auto">
          {/* Floating Peri-Peri Fries Cutout */}
          <div className="absolute -left-6 md:left-4 top-1/4 z-10 hidden sm:block pointer-events-none fries-bob-anim">
            <div className="bg-amber-100/95 backdrop-blur border border-amber-300 rounded-2xl p-2.5 shadow-xl flex items-center space-x-2 text-xs font-bold text-amber-900">
              <span className="text-lg">🍟</span>
              <span>Hand-Cut Golden Fries</span>
            </div>
          </div>

          {/* Center Hero Showcase Image */}
          <div className="relative mx-auto rounded-3xl overflow-hidden shadow-dish border-4 border-white bg-gradient-to-br from-amber-50 to-orange-100 max-w-3xl group transition-all duration-500 hover:shadow-2xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdm284yXzGVEejz-0aK_r7cF1GFb39rENU6IBzqXmdKexlt6ZvbVt0W1e6TTSDfI8D5pIk_mdDZRBpoQdJO6JuRbsYEaisCbDkfEfXmXD_Q5zE-O2_Zehtu2hluoAh-6UQDLETqVBPauEuUv2cPQj9xc6Jj-cWGxkyOUc5uAI4rKoAhm6DBvw9r-ezf9cVafb-30tIEvuYXScw7WFUXNt287RAxsFvA8JnRUMuuz6151RHENGpxEpedg"
              alt="Whole Flame-Grilled Peri Peri Chicken Feast with Golden Fries and Sauces"
              className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-6 sm:p-8 group-hover:from-black/90 transition-all duration-300">
              <div className="text-white">
                <span className="bg-brand-red text-white text-xs font-black uppercase px-2.5 py-1 rounded shadow-sm inline-block transform group-hover:scale-105 transition-transform">
                  Chef Special
                </span>
                <h3 className="text-2xl sm:text-3xl font-black mt-1.5 group-hover:text-amber-300 transition-colors">
                  Full Flame-Grilled Chicken Platter
                </h3>
                <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-xl">
                  Flame-seared over natural lava rocks with Lemon-Herb, Mild or Fiery Reserve sauce. Includes jumbo golden fries &amp; toasted garlic rolls.
                </p>
              </div>
            </div>
          </div>

          {/* Floating Biryani Bowl Accent (Bottom Right) */}
          <div className="absolute -right-4 bottom-2 z-20 hidden md:block transform hover:scale-105 transition-transform duration-300">
            <div className="bg-white p-3 rounded-2xl shadow-xl border border-neutral-100 flex items-center space-x-3 hover:shadow-2xl transition-shadow">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZ3hlTDS2florp3-8n_G5p1XDBjMr1ThgvXu6-xVLIcP3oqW5MshEs0q_Vbz8Ofo_ORfoKXFZVmjDmuuuRLxLduhPAfgbrPvlzMqAD2s7i0LZLC6ndlONQ9sJt08F35F-Vdp1wTdGSaINQ4fx5HYYTxvI4qBzfPFgBgm4S_8-1m8Yg8teF6yaUW-HtnAQadBkHcf-GyKOmghYlWbbl5tlxfqMd8IMScbFE75uphNFAfNOVjLS3byEVHg"
                alt="Dum Kacchi Biryani Bowl"
                className="w-14 h-14 rounded-full object-cover border-2 border-brand-gold"
              />
              <div>
                <p className="font-bold text-xs text-brand-dark leading-tight">Royal Basmati Kacchi</p>
                <p className="text-[11px] text-brand-red font-extrabold mt-0.5">Slow Dum • Tender Meat</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto pt-6" id="quick-categories">
          {/* Card 1: Classic Meals */}
          <a
            href="#portion-section"
            className="bg-white rounded-3xl p-5 shadow-custom-card hover:shadow-2xl transition-all duration-300 border border-neutral-100 flex flex-col items-center text-center group transform hover:-translate-y-2 cursor-pointer"
          >
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-amber-100 shadow-md group-hover:border-amber-300 transition-colors duration-300">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBONBF65JqW646NAlOBRNFkGUmAE0vilLIz6DzxnrQI_X8RCEMSQ4hR5fQFFreSVXdyFh0Fth4kulFM39qOVyxPKawDPpX9Bn-aThNLEp6CHcQp5byaxsfQa0Sn6Brxp4lG-v1OlQobIr58z8TgFfT33QFuEmGtyfdwMv93MEWbzbAsnm6mTNLt7-AQFwbgyMAT3zrT0HzC3EQLk9AfHvsHYFkI906kEJ6k0eGo-rjDPqzNM94Aeo1Few"
                alt="Classic Chicken Quarter Meal with Fries"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <h4 className="mt-4 font-display font-black text-base sm:text-lg text-brand-dark tracking-wide uppercase group-hover:text-brand-red transition-colors duration-200">
              CLASSIC MEALS
            </h4>
            <p className="text-xs text-neutral-500 mt-1">
              Quarter or Half chicken served with spicy peri-peri chips &amp; garlic roll.
            </p>
            <div className="mt-3 text-xs font-bold text-brand-red flex items-center transition-all duration-200">
              <span>View Meals</span>
              <ArrowRight className="ml-1 w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-200" />
            </div>
          </a>

          {/* Card 2: Sharing Feasts */}
          <a
            href="#mega-deal"
            className="bg-white rounded-3xl p-5 shadow-custom-card hover:shadow-2xl transition-all duration-300 border border-neutral-100 flex flex-col items-center text-center group transform hover:-translate-y-2 cursor-pointer"
          >
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-red-100 shadow-md group-hover:border-red-300 transition-colors duration-300">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC_EnvQ7pzQLzhnEA9cAub978il35XN6doDdAepXyi8jaapdlAUdj1qoO8zJCyIne_auQQQu2j8OWJ4DYRPmdUUy93qzG84Iga9bTnOfoqUOXsZcUN80bgSWP_HBbwI34DGmFtvt64fnXxmnwquqn1rWOr1_bRQa8Fp8FvI4l1R8-J-KW5dAJh8yelOWOs4Rz-9rhK-I6odWxQSh7YXl2bp5-Dv1YqSQzTubsA2Z0-89VJzJPGDLlG9g"
                alt="Sharing Kacchi Biryani & Whole Chicken Platter"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <h4 className="mt-4 font-display font-black text-base sm:text-lg text-brand-dark tracking-wide uppercase group-hover:text-brand-red transition-colors duration-200">
              SHARING FEASTS
            </h4>
            <p className="text-xs text-neutral-500 mt-1">
              Full birds, sharing kacchi platters, 2 sides &amp; dips for 4-6 diners.
            </p>
            <div className="mt-3 text-xs font-bold text-brand-red flex items-center transition-all duration-200">
              <span>Explore Platters</span>
              <ArrowRight className="ml-1 w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-200" />
            </div>
          </a>

          {/* Card 3: Starters & Sides */}
          <a
            href="#portion-section"
            className="bg-white rounded-3xl p-5 shadow-custom-card hover:shadow-2xl transition-all duration-300 border border-neutral-100 flex flex-col items-center text-center group transform hover:-translate-y-2 cursor-pointer"
          >
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-emerald-100 shadow-md group-hover:border-emerald-300 transition-colors duration-300">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhCunxzsxjPSvtu3oGgxpF0zW_QEzOfGqdGz3FlK7FFGhcCN6kMzMN5Qrykz_9l5t0Go9UxBPAaQtiefGvrRPCMK6eSlt2D4FJ2gbA7V-1rP1KreGrNMlTKHUqtgHUFEza8Ou82WeDnOmOd49nwmnCkDfDTbtcv6i9YGh0AqdALoFbUIUBjb4A74yTTCI61QxQE0-DeiFVIhVjsLdv1hwmnSR-0stNIWXj1SG9i-V2rE0UDZoWkCv4vQ"
                alt="Sides - Crispy fries, dips and spicy chicken bites"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
            <h4 className="mt-4 font-display font-black text-base sm:text-lg text-brand-dark tracking-wide uppercase group-hover:text-brand-red transition-colors duration-200">
              STARTERS &amp; SIDES
            </h4>
            <p className="text-xs text-neutral-500 mt-1">
              Spicy chicken livers, pita bread, borhani shots and crispy bites.
            </p>
            <div className="mt-3 text-xs font-bold text-brand-red flex items-center transition-all duration-200">
              <span>Taste Starters</span>
              <ArrowRight className="ml-1 w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-200" />
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
