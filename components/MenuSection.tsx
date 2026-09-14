'use client'

import React, { useState } from 'react'
import { Search, Sparkles, Utensils, X } from 'lucide-react'
import { INITIAL_MENU_ITEMS, MenuItemData } from '@/lib/data'
import DishCard from './DishCard'
import { useStore } from '@/lib/store'

const CATEGORIES = [
  { id: 'all', name: 'All Dishes' },
  { id: 'popular', name: '🔥 Bestsellers' },
  { id: 'kacchi', name: 'Royal Kacchi' },
  { id: 'tehari', name: 'Old Dhaka Tehari' },
  { id: 'grilled', name: 'Flame Peri Chicken' },
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
      className="py-16 sm:py-24 bg-[#FCFBFA]"
      data-purpose="portion-selection-menu"
      id="portion-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 text-brand-red font-bold text-xs uppercase tracking-widest bg-red-50 border border-red-100 px-3.5 py-1.5 rounded-full mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            Culinary Craftsmanship
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight">
            SIGNATURE MENU &amp; SHARING PACKS
          </h2>
          <p className="text-neutral-500 text-xs sm:text-sm mt-2.5 max-w-xl mx-auto leading-relaxed">
            Every dish is cooked fresh to order with pure natural spices. Switch seamlessly between personal portions and family sharing platters.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="max-w-4xl mx-auto mb-12 space-y-4">
          {/* Live Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. Basmati, Peri, Firni)..."
              className="w-full pl-11 pr-10 py-3 rounded-2xl border border-neutral-200/90 bg-white text-xs sm:text-sm font-medium text-neutral-900 shadow-sm focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 flex items-center justify-center transition"
                type="button"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Minimalist Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 pt-1" id="category-pill-group">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id, cat.name)}
                  className={`font-semibold text-xs px-4 py-2 rounded-full transition-all duration-150 active:scale-95 ${
                    isActive
                      ? 'bg-neutral-900 text-white font-bold shadow-sm'
                      : 'bg-white border border-neutral-200/80 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 hover:border-neutral-300'
                  }`}
                  type="button"
                >
                  {cat.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* 4-Column Food Cards Grid */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-7" id="menu-highlights">
            {filteredDishes.map((dish) => (
              <DishCard key={dish.id} item={dish} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200/80 max-w-md mx-auto p-8 shadow-sm">
            <Utensils className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <p className="font-bold text-base text-neutral-800">No dishes found</p>
            <p className="text-xs text-neutral-500 mt-1">
              Try searching with another keyword or select &ldquo;All Dishes&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
              }}
              className="mt-4 bg-brand-red text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-brand-darkred transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
