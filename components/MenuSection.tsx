'use client'

import React, { useState } from 'react'
import { Search, Sparkles, Utensils } from 'lucide-react'
import { INITIAL_MENU_ITEMS, MenuItemData } from '@/lib/data'
import DishCard from './DishCard'
import { useStore } from '@/lib/store'

const CATEGORIES = [
  { id: 'all', name: 'All Dishes', nameBn: 'সকল আইটেম' },
  { id: 'popular', name: 'জনপ্রিয় (Popular)', nameBn: 'জনপ্রিয়' },
  { id: 'kacchi', name: 'কাচ্চি (Kacchi)', nameBn: 'কাচ্চি' },
  { id: 'tehari', name: 'তেহেরি (Tehari)', nameBn: 'তেহেরি' },
  { id: 'grilled', name: 'গ্রিলড চিকেন (Flame Peri)', nameBn: 'গ্রিলড চিকেন' },
  { id: 'sides', name: 'সাইডস (Sides & Starters)', nameBn: 'সাইডস' },
  { id: 'drinks', name: 'মিষ্টান্ন ও পানীয় (Sweets & Drinks)', nameBn: 'পানীয়' },
]

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { showToast } = useStore()

  const handleCategoryChange = (catId: string, name: string) => {
    setActiveCategory(catId)
    showToast('Category Filter Applied', name)
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
      className="py-16 sm:py-20 bg-[#FFF9F6]"
      data-purpose="portion-selection-menu"
      id="portion-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-brand-red font-black text-xs uppercase tracking-widest bg-red-100/80 px-4 py-1.5 rounded-full inline-block mb-3 shadow-sm">
            Select Your Perfect Serving
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight">
            POPULAR DISHES &amp; PORTION PACKS
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
            Cooked fresh in small batches. Choose individual 1:1 portions or family sharing 1:2 and 1:4 platters tailored to your dining party size.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          {/* Live Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Basmati Kacchi, Peri-Peri Chicken, Tehari..."
              className="w-full pl-10 pr-4 py-3 rounded-full border border-neutral-200 bg-white text-xs sm:text-sm font-semibold text-slate-800 shadow-sm focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-neutral-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 pt-2" id="category-pill-group">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id, cat.name)}
                  className={`category-btn font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full transition-all transform hover:scale-105 active:scale-95 ${
                    isActive
                      ? 'bg-brand-red text-white shadow-md'
                      : 'bg-white border border-brand-red/30 text-brand-red hover:bg-red-50 hover:border-brand-red'
                  }`}
                  type="button"
                >
                  {cat.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* 4-Column Portion Cards Grid */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6" id="menu-highlights">
            {filteredDishes.map((dish) => (
              <DishCard key={dish.id} item={dish} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 max-w-md mx-auto p-8 shadow-sm">
            <Utensils className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <p className="font-bold text-base text-brand-dark">No dishes found</p>
            <p className="text-xs text-neutral-500 mt-1">
              Try searching with another keyword or pick a different category.
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
