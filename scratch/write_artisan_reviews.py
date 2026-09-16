code = """'use client'

import React from 'react'
import { Star, Quote, CheckCircle2, Flame, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

const REVIEWS_DATA = [
  {
    id: 1,
    name: 'Rafid Al-Mamun',
    role: 'Food Enthusiast & Vlogger',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '2 days ago',
    dishName: 'Saffron Basmati Kacchi',
    dishImage: '/images/dishes/kacchi.png',
    comment: 'The Basmati Kacchi is legitimately one of the best in Dhaka. Tender mutton that melts effortlessly, and the flame-grilled peri chicken has that authentic open-flame smokiness you rarely find!'
  },
  {
    id: 2,
    name: 'Nusrat Jahan',
    role: 'Banani Foodie',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '1 week ago',
    dishName: '4-REG Mega Platter',
    dishImage: '/images/dishes/feast.png',
    comment: 'Ordered the 4-REG Platter for family dinner. The delivery arrived in just 32 mins, piping hot! The Borhani and spicy wings were 10/10.'
  },
  {
    id: 3,
    name: 'Tanzir Ahmed',
    role: 'Software Architect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '2 weeks ago',
    dishName: 'Lava Flame Chicken',
    dishImage: '/images/dishes/chicken.png',
    comment: 'The online reservation system was buttery smooth and our table at Gulshan 2 was beautifully prepared with chef complimentary appetizers.'
  }
]

export default function CustomerReviews() {
  return (
    <section
      className="py-10 sm:py-20 bg-[#FCFBFA] relative overflow-hidden border-t border-neutral-200/70"
      id="reviews"
      data-purpose="customer-reviews-section"
    >
      {/* Soft Warm Amber Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 relative z-10">
        
        {/* Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-amber-50 border border-amber-200 text-amber-900 text-[10px] sm:text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-2 sm:mb-3 shadow-2xs">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>4.9 / 5.0 (2,500+ Verified Guests)</span>
          </div>

          <h2 className="font-display text-xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
            Loved By <span className="text-brand-red">50,000+ Food Lovers</span>
          </h2>
          <p className="text-[11px] sm:text-sm text-neutral-500 mt-1 sm:mt-2 max-w-lg mx-auto leading-relaxed">
            Real stories from patrons who relish our flame-grilled peri chicken and slow-dum royal kacchi daily.
          </p>
        </div>

        {/* Mobile Swipeable Carousel -> Desktop Multi-Column Grid */}
        <div className="flex sm:grid sm:grid-cols-3 gap-3.5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-3 pt-1 px-1">
          {REVIEWS_DATA.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
              className="group relative bg-gradient-to-b from-white via-white to-amber-50/30 rounded-3xl p-4 sm:p-6 border border-neutral-200/90 hover:border-brand-red/40 shadow-sm hover:shadow-xl hover:shadow-brand-red/10 transition-all duration-300 flex flex-col justify-between w-[86vw] max-w-[340px] sm:w-auto shrink-0 snap-center select-none overflow-hidden"
            >
              <div>
                {/* Top Row: Star Rating + 3D Floating Dish Cutout */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  
                  {/* Left Rating & Dish Badge */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center text-amber-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-amber-900 bg-amber-100/90 px-1.5 py-0.2 rounded-md shadow-2xs ml-0.5">
                        5.0
                      </span>
                    </div>

                    {/* Ordered Dish Chip */}
                    <div className="inline-flex items-center gap-1 bg-neutral-900 text-white px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wide shadow-2xs">
                      <Flame className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                      <span className="truncate">{review.dishName}</span>
                    </div>
                  </div>

                  {/* Right: 3D Transparent Floating Food Cutout */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center -mr-1 -mt-1 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                    <div className="absolute inset-0 bg-radial from-amber-400/35 via-orange-500/10 to-transparent blur-md rounded-full pointer-events-none" />
                    <img
                      src={review.dishImage}
                      alt={review.dishName}
                      className="max-w-full max-h-full object-contain filter drop-shadow-[0_8px_14px_rgba(0,0,0,0.3)]"
                    />
                  </div>
                </div>

                {/* Quote Text with Quote Watermark */}
                <div className="relative my-2.5">
                  <Quote className="w-7 h-7 text-amber-400/20 absolute -top-2.5 -left-1 pointer-events-none" />
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed pl-3 italic font-medium">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>
              </div>

              {/* Bottom Customer Info Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-neutral-100 mt-2">
                <div className="flex items-center space-x-2.5">
                  <div className="relative">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-9 h-9 rounded-full object-cover border-2 border-amber-400/70 shadow-2xs"
                    />
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-white absolute -bottom-0.5 -right-0.5" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-xs sm:text-sm text-neutral-900 leading-tight">
                      {review.name}
                    </h4>
                    <span className="text-[10px] text-neutral-400 font-semibold block mt-0.5">
                      {review.role}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full block shadow-2xs">
                    ✓ Verified Diner
                  </span>
                  <span className="text-[9px] text-neutral-400 font-medium block mt-0.5">
                    {review.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel Indicators */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 mt-2">
          {REVIEWS_DATA.map((_, i) => (
            <span
              key={i}
              className="w-2 h-1.5 rounded-full bg-neutral-300 first:w-4 first:bg-brand-red transition-all"
            />
          ))}
        </div>

      </div>
    </section>
  )
}
"""

with open('components/CustomerReviews.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
print('Artisan CustomerReviews.tsx written successfully!')
