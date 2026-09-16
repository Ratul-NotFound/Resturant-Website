code = '''\'use client\'

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
      className="py-10 sm:py-20 lg:py-24 bg-[#FCFBFA] relative"
      data-purpose="menu-section"
      id="portion-section"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 bg-brand-red/10 border border-brand-red/20 px-3.5 py-1.5 rounded-full mb-2.5 sm:mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-red" />
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-brand-red">
              Portion-Engine Menu
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight">
            Order Your Perfect Feast
          </h2>
          <p className="text-xs sm:text-base text-neutral-500 mt-2 max-w-lg mx-auto">
            Choose exact portions from Single Quarter to 4-Person Feasts with dynamic real-time price updates.
          </p>
        </div>

        {/* Filter & Search Bar Container */}
        <div className="mb-6 sm:mb-10 space-y-3.5">
          
          {/* Horizontal Scrolling Category Pills Rail */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth snap-x pb-2 pt-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id, cat.name)}
                  type="button"
                  className={px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap snap-start transition-all duration-200 border shrink-0 }
                >
                  {cat.name}
                </button>
              )
            })}
          </div>

          {/* Search Bar & Dish Counter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes (e.g., Kacchi, Peri Chicken, Fries)..."
                className="w-full bg-white pl-9 pr-9 py-2.5 rounded-2xl border border-neutral-200 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs font-semibold text-neutral-500">
                Showing <strong className="text-neutral-900">{filteredDishes.length}</strong> delicious delicacies
              </span>
            </div>
          </div>

        </div>

        {/* 3D Food Cards Grid */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredDishes.map((dish) => (
              <DishCard key={dish.id} item={dish} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 shadow-2xs p-8 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center mx-auto mb-3">
              <Utensils className="w-7 h-7" />
            </div>
            <h3 className="font-display font-black text-lg text-neutral-900">No dishes found</h3>
            <p className="text-xs text-neutral-500 mt-1">
              Try searching for something else or pick from the category tabs above.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all')
                setSearchQuery('')
              }}
              type="button"
              className="mt-4 px-4 py-2 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-darkred transition"
            >
              Show All Dishes
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
'''
with open('components/MenuSection.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
print('MenuSection.tsx done')
