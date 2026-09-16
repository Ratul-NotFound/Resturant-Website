'use client'

import React, { useState } from 'react'
import { Search, Sparkles, Utensils, X, Flame } from 'lucide-react'
import { INITIAL_MENU_ITEMS, MenuItemData } from '@/lib/data'
import DishCard from './DishCard'
import { useStore } from '@/lib/store'

const CATEGORIES = [
  { id: 'all', name: 'All Dishes' },
  { id: 'popular', name: '🔥 Bestsellers' },
  { id: 'kacchi', name: 'Royal Kacchi' },
  { id: 'tehari', name: 'Old Dhaka Tehari' },
  { id: 'grilled', name: 'Flame Peri Chicken' },
  { id: 'platters', name: 'Mega Feasts' },
  { id: 'sides', name: 'Sides & Starters' },
  { id: 'drinks', name: 'Drinks & Desserts' },
]

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { showToast } = useStore()

  const handleCategoryChange = (catId: string, name: string) => {
    setActiveCategory(catId)
  }

  const filteredDishes = INITIAL_MENU_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' ||
      (activeCategory === 'popular' && item.isBestseller) ||
      item.category === activeCategory

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameBn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <section
      className="py-14 sm:py-20 lg:py-24 bg-[#FCFBFA] relative"
      data-purpose="menu-section"
      id="portion-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 bg-brand-red/10 border border-brand-red/20 px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-red" />
            <span className="text-xs font-black uppercase tracking-wider text-brand-red">
              Culinary Craftsmanship
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 uppercase tracking-tight leading-tight">
            Signature Menu &amp; <span className="text-brand-red">Sharing Packs</span>
          </h2>

          <p className="mt-2.5 text-xs sm:text-sm text-neutral-500 max-w-xl mx-auto leading-relaxed">
            Every dish is cooked fresh to order with pure natural spices. Switch seamlessly between personal portions and family sharing platters.
          </p>
        </div>

        {/* Search & Discovery Bar */}
        <div className="max-w-xl mx-auto mb-6 sm:mb-8">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-4 h-4 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. Basmati, Peri, Firni)..."
              className="w-full bg-white text-neutral-800 text-xs sm:text-sm pl-11 pr-10 py-3 sm:py-3.5 rounded-2xl border border-neutral-200/80 shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                type="button"
                className="absolute right-3.5 p-1 text-neutral-400 hover:text-neutral-600 rounded-full hover:bg-neutral-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills (Responsive scroll on mobile, flex wrap on desktop) */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-3 sm:pb-0 sm:flex-wrap sm:justify-center mb-8 sm:mb-12 px-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id, cat.name)}
                type="button"
                className={
                  'px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 shrink-0 select-none ' +
                  (isActive
                    ? 'bg-neutral-900 text-white shadow-md scale-105'
                    : 'bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200/80 shadow-xs')
                }
              >
                {cat.name}
              </button>
            )
          })}
        </div>

        {/* Dishes Grid (Responsive 1-col on phone, 2-col on tablet, 3-col on desktop, 4-col on wide) */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
            {filteredDishes.map((dish) => (
              <DishCard key={dish.id} item={dish} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200/80 shadow-xs p-8 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-brand-red flex items-center justify-center mx-auto mb-3">
              <Utensils className="w-6 h-6" />
            </div>
            <h4 className="font-display font-bold text-base text-neutral-900">
              No dishes found
            </h4>
            <p className="text-xs text-neutral-500 mt-1">
              Try searching with another keyword or pick a different category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
              }}
              type="button"
              className="mt-4 px-4 py-2 rounded-xl bg-brand-red text-white text-xs font-bold shadow-sm hover:bg-brand-darkred transition"
            >
              Show All Dishes
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
