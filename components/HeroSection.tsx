'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ShoppingBag,
  ArrowRight,
  CalendarCheck,
} from 'lucide-react'
import FlameParticles from './FlameParticles'

const CATEGORY_RIBBON = [
  {
    id: 'grilled',
    name: 'FLAME GRILL',
    subtitle: 'Whole Peri & Wings',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBdm284yXzGVEejz-0aK_r7cF1GFb39rENU6IBzqXmdKexlt6ZvbVt0W1e6TTSDfI8D5pIk_mdDZRBpoQdJO6JuRbsYEaisCbDkfEfXmXD_Q5zE-O2_Zehtu2hluoAh-6UQDLETqVBPauEuUv2cPQj9xc6Jj-cWGxkyOUc5uAI4rKoAhm6DBvw9r-ezf9cVafb-30tIEvuYXScw7WFUXNt287RAxsFvA8JnRUMuuz6151RHENGpxEpedg',
    target: '#portion-section',
  },
  {
    id: 'kacchi',
    name: 'ROYAL KACCHI',
    subtitle: 'Basmati Dum Handi',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNzPuivaEYvs8ZE0qblW61GpT51qCeNqyfccoQNT1eaiVs6jC_Om5Dtxn7zxnR0951Y0sxU1bfdTW7DpqHYGI3TS0McJlOaBX6HEA4Vv29zyDdq60QoTsYHvWrL-ZbiTF4tyXj8OKQnAL_7ubJbvDyDHbsDVuSxI0o90COdgV1QXC-XgAqAdAgwS_S8cIMWxMaJHiDm9QRTaXQ0VAtSsdugUX3RVeUJlWCzmb5lf4p5DYJ1pzFqWE2zQ',
    target: '#portion-section',
  },
  {
    id: 'tehari',
    name: 'MUSTARD TEHARI',
    subtitle: 'Old Dhaka Heritage',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBx6AWIr9aTHyUS9mw4A3EITgb0-qBSQR8cYpeArFGMUDOdmbarnVOhQI-8tN1l9kHDYGy7wgJKsdQieBF2UttMjNtSMpKfWH0ZSoZaH88qSkNBe6Pmg6jzmdNIVPjyvJF2cV-LXFrGoiicl4phOr0C04TJAR75oqNl4X6r3OVsagdbujEFjCY9NN2df_tIN5qc-ySnCyx6MJ47rD5yMq6Iohy_yP4K_FOZkavnw_V10yTpxXtkxqOKhw',
    target: '#portion-section',
  },
  {
    id: 'platters',
    name: 'MEGA FEASTS',
    subtitle: '৳999 4-REG Platter',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCK8MV-07ehksDJ2l42WzbGTPV1EQ6q-n2rJeGS_7nnFqYh_YFX8FB59jFo6ZoTXNppaNpOa7olVu6gFxGNu1ATpX4jjcuXbsWRuaMMEXiFh5ms1KeWi9LSGr8KEVIt3dk-lxTzQd3TUsitZFrdaE0hH7sqYAjlDML7HW0qnBdj-fz5Mp8Ovd76OZp9NB76VLmr96bYowS_OoLwiQCPyyIKk-tD931LuncbXrT_ENEXaC4U9Gp0eM8GAQ',
    target: '#mega-deal-section',
  },
  {
    id: 'sides',
    name: 'SIDES & STARTERS',
    subtitle: 'Peri Fries & Dips',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAXvgQOg17MZfDQHRj_H0ZNtBK-9YLkYQq6AEdk4hhqZ7L7GlouFo18Pko4a3n_Fx7loHOnaCWrWZ9cc4XZMiGse6K9FwK16SoJ2jIJiJa1ROzoeFeLDQ1QwflfRidfKL4pCQFj_p9XTsqGaT_QwB-TK8Jiro6o11FLAdNBp0wNH0tq0CveJzWFulhS9tLawP7TZiaLF8Q_TS_-NBgL6ebEpnUxngRBpoLc5iOlmRv3QwnHNpigUZR5dA',
    target: '#portion-section',
  },
  {
    id: 'drinks',
    name: 'SHAHI DRINKS',
    subtitle: 'Borhani & Firni',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAhCunxzsxjPSvtu3oGgxpF0zW_QEzOfGqdGz3FlK7FFGhcCN6kMzMN5Qrykz_9l5t0Go9UxBPAaQtiefGvrRPCMK6eSlt2D4FJ2gbA7V-1rP1KreGrNMlTKHUqtgHUFEza8Ou82WeDnOmOd49nwmnCkDfDTbtcv6i9YGh0AqdALoFbUIUBjb4A74yTTCI61QxQE0-DeiFVIhVjsLdv1hwmnSR-0stNIWXj1SG9i-V2rE0UDZoWkCv4vQ',
    target: '#portion-section',
  },
]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-neutral-950" data-purpose="hero-banner">
      {/* 1. Full-Bleed High-Definition Cinematic Food Stage */}
      <div className="relative min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex items-center pt-24 sm:pt-28 pb-14 sm:pb-16">
        {/* Background Image: Sizzling Flame & Feast Spread */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdm284yXzGVEejz-0aK_r7cF1GFb39rENU6IBzqXmdKexlt6ZvbVt0W1e6TTSDfI8D5pIk_mdDZRBpoQdJO6JuRbsYEaisCbDkfEfXmXD_Q5zE-O2_Zehtu2hluoAh-6UQDLETqVBPauEuUv2cPQj9xc6Jj-cWGxkyOUc5uAI4rKoAhm6DBvw9r-ezf9cVafb-30tIEvuYXScw7WFUXNt287RAxsFvA8JnRUMuuz6151RHENGpxEpedg"
            alt="Flame & Feast Signature Delicacies"
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.78] contrast-[1.1]"
          />
          {/* Cinematic Directional Vignette Overlay for High Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/35 sm:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/60" />
        </div>

        {/* Dynamic Sizzling Flame Embers */}
        <FlameParticles density={18} />

        {/* Hero Narrative Overlay */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl space-y-5 sm:space-y-6 text-left">

            {/* Giant Punchy Headline (Herfy/Sultan's Pure Restaurant Style) */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.02] uppercase drop-shadow-2xl"
            >
              BEST FLAME GRILL <br />
              <span className="text-brand-red"> &amp; ROYAL KACCHI </span> <br />
              IN BANGLADESH.
            </motion.h1>

            {/* Appetizing Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-base sm:text-xl text-neutral-200 font-medium max-w-2xl leading-relaxed drop-shadow-md"
            >
              450°C lava-rock seared Peri-Peri chicken &amp; 4-hour sealed clay handi Basmati Kacchi with pure saffron ghee. Prepared fresh across 7 Dhaka kitchens.
            </motion.p>

            {/* Action Buttons Cluster */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#portion-section"
                className="cta-shimmer bg-brand-red hover:bg-brand-darkred text-white text-sm sm:text-base font-black uppercase tracking-wider px-8 sm:px-10 py-4 sm:py-4.5 rounded-full shadow-2xl shadow-brand-red/50 hover:shadow-brand-red/70 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-3"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>ORDER NOW</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </a>

              <Link
                href="/reserve"
                className="bg-neutral-900/90 hover:bg-neutral-800 text-white border-2 border-white/30 hover:border-white text-sm sm:text-base font-bold px-7 sm:px-8 py-4 sm:py-4.5 rounded-full backdrop-blur-md shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-2.5"
              >
                <CalendarCheck className="w-5 h-5 text-amber-400" />
                <span>RESERVE TABLE</span>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>

      {/* 2. Herfy-Style Fast Category Ribbon (High-Impact Red Banner with Food Cards) */}
      <div className="bg-brand-red border-t-2 border-b-2 border-brand-darkred shadow-2xl relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 sm:gap-4">
            {CATEGORY_RIBBON.map((cat) => (
              <a
                key={cat.id}
                href={cat.target}
                className="group flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-neutral-900 border border-white/15 hover:border-white transition-all duration-200 transform hover:-translate-y-1.5 shadow-md hover:shadow-xl text-center"
              >
                {/* Circular Dish Preview */}
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white shadow-md mb-2 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <span className="font-display font-black text-[11px] sm:text-xs tracking-wider uppercase block leading-tight">
                  {cat.name}
                </span>
                <span className="text-[9px] sm:text-[10px] text-white/80 group-hover:text-neutral-600 block mt-0.5 line-clamp-1 font-medium">
                  {cat.subtitle}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
