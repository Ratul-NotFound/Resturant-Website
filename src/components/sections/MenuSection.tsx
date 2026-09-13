'use client';

import React, { useState, useMemo } from 'react';
import { MenuItem, DishCategory, DietaryTag } from '@/lib/types';
import { MenuService } from '@/lib/services/MenuService';
import { DishCard } from '../ui/DishCard';
import { PriceSlider } from '../ui/PriceSlider';
import { Search, Sparkles, Filter, X, Utensils } from 'lucide-react';
import { Sanitizer } from '@/lib/security/Sanitizer';

interface MenuSectionProps {
  onSelectDish: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
}

const CATEGORIES: Array<{ id: DishCategory | 'all'; label: string }> = [
  { id: 'all', label: 'Complete 30-Course Catalog' },
  { id: 'starters', label: 'Starters & Crudo' },
  { id: 'prime-cuts', label: 'Prime Cuts & Wagyu' },
  { id: 'ocean', label: 'Ocean & Turbot' },
  { id: 'pasta-grains', label: 'Artisan Pasta & Truffle' },
  { id: 'desserts', label: 'Grand Desserts' },
  { id: 'cocktails', label: 'Pairings & Cocktails' },
];

const DIETARY_FILTERS: Array<{ id: DietaryTag | 'all'; label: string }> = [
  { id: 'all', label: 'All Diets' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'dairy-free', label: 'Dairy-Free' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'halal', label: 'Halal' },
  { id: 'keto', label: 'Keto' },
];

export function MenuSection({ onSelectDish, onAddToCart }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<DishCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<DietaryTag | 'all'>('all');
  const [maxPrice, setMaxPrice] = useState(220);

  const menuService = useMemo(() => MenuService.getInstance(), []);

  const filteredItems = useMemo(() => {
    return menuService.filterItems({
      category: selectedCategory,
      searchQuery: Sanitizer.cleanText(searchQuery, 60),
      dietaryFilter: selectedDiet,
      minPrice: 0,
      maxPrice,
    });
  }, [menuService, selectedCategory, searchQuery, selectedDiet, maxPrice]);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedDiet('all');
    setMaxPrice(220);
  };

  return (
    <section id="menu" className="relative py-24 sm:py-32 bg-obsidian-950 overflow-hidden text-neutral-300">
      
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-primary/10 border border-gold-primary/30 text-gold-light text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="h-3.5 w-3.5 text-gold-primary" /> The Gastronomy Catalog
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-champagne mb-4 tracking-tight">
            Our 30 Signature Culinary Creations
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
            Every dish is handcrafted to order by our brigade, featuring certified farm provenance, allergen transparency, and bespoke vintage wine pairings.
          </p>
        </div>

        {/* Search Bar & Interactive Filter Row */}
        <div className="p-6 rounded-3xl bg-obsidian-900/80 border border-gold-primary/20 backdrop-blur-md shadow-2xl mb-10 space-y-6">
          
          {/* Top Row: Search Input + Price Slider */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Trie-Powered Instant Search Bar */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gold-primary" />
              <input
                type="text"
                placeholder="Search dishes, ingredients (e.g. Wagyu, Caviar, Truffle)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                maxLength={60}
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-obsidian-950 border border-neutral-800 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-gold-primary transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Price Slider */}
            <PriceSlider min={20} max={220} value={maxPrice} onChange={setMaxPrice} />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-gold-primary text-obsidian-950 shadow-gold-sm'
                    : 'bg-obsidian-950 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dietary Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-800/80">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase flex items-center gap-1.5 mr-2">
              <Filter className="h-3 w-3 text-gold-primary" /> Dietary:
            </span>
            {DIETARY_FILTERS.map((diet) => (
              <button
                key={diet.id}
                onClick={() => setSelectedDiet(diet.id)}
                className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  selectedDiet === diet.id
                    ? 'bg-gold-primary/20 border border-gold-primary text-gold-hover'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {diet.label}
              </button>
            ))}

            {(selectedCategory !== 'all' || searchQuery || selectedDiet !== 'all' || maxPrice < 220) && (
              <button
                onClick={handleClearFilters}
                className="ml-auto text-[11px] text-neutral-400 hover:text-gold-hover underline underline-offset-4"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-6 px-2">
          <span>Showing <strong className="text-champagne font-mono">{filteredItems.length}</strong> of 30 Signature Dishes</span>
          {searchQuery && (
            <span className="italic text-neutral-400">Matching “{searchQuery}”</span>
          )}
        </div>

        {/* Dishes Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-obsidian-900/40 border border-neutral-800">
            <Utensils className="h-10 w-10 text-neutral-600 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-semibold text-neutral-300 mb-1">No Courses Match Your Criteria</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-6">
              Try adjusting your dietary filter, increasing your price range, or searching for a different keyword.
            </p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-2.5 rounded-xl gold-button text-xs font-semibold uppercase tracking-wider"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <DishCard
                key={item.id}
                item={item}
                onSelect={onSelectDish}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
