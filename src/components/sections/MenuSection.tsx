'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { MenuItem, DishCategory, DietaryTag, AllergenType, CurrencyCode } from '@/lib/types';
import { MenuService } from '@/lib/services/MenuService';
import { formatCurrency } from '@/lib/utils/formatting';
import { DishCard } from '../ui/DishCard';
import { PriceSlider } from '../ui/PriceSlider';
import { Search, Sparkles, Filter, X, Utensils, Wine, ShieldAlert, Check, Calendar, ArrowRight, Award } from 'lucide-react';
import { Sanitizer } from '@/lib/security/Sanitizer';

interface MenuSectionProps {
  currency?: CurrencyCode;
  onSelectDish: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
  onOpenSommelier: () => void;
}

const CATEGORIES: Array<{ id: DishCategory | 'all'; label: string }> = [
  { id: 'all', label: 'All 30 Courses' },
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

const ALLERGEN_OPTIONS: AllergenType[] = [
  'Fish',
  'Molluscs',
  'Crustaceans',
  'Dairy',
  'Gluten',
  'Eggs',
  'Nuts',
  'Soy',
  'Sesame',
];

// Flagship 10-course Michelin Odyssey dish IDs
const TASTING_MENU_IDS = [
  'dish-01', // Oscietra Caviar Tartlet
  'dish-02', // Hokkaido Scallop Crudo
  'dish-04', // Pan-Seared Hudson Valley Foie Gras
  'dish-13', // Brittany Turbot en Papillote
  'dish-19', // 30-Yolk Tajarin with Alba White Truffle
  'dish-07', // A5 Miyazaki Wagyu Ribeye
  'dish-21', // Acquerello Risotto 24K Gold & Saffron
  'dish-25', // Yuzu & White Chocolate Sphere
  'dish-23', // Valrhona Grand Cru Molten Soufflé
  'dish-27', // Smoked Old Fashioned '1920'
];

export function MenuSection({
  currency = 'USD',
  onSelectDish,
  onAddToCart,
  onOpenSommelier,
}: MenuSectionProps) {
  const [viewMode, setViewMode] = useState<'tasting' | 'alacarte'>('tasting');
  const [selectedCategory, setSelectedCategory] = useState<DishCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<DietaryTag | 'all'>('all');
  const [excludedAllergens, setExcludedAllergens] = useState<AllergenType[]>([]);
  const [showAllergenFilter, setShowAllergenFilter] = useState(false);
  const [maxPrice, setMaxPrice] = useState(220);

  const menuService = useMemo(() => MenuService.getInstance(), []);

  const toggleAllergenExclusion = (allergen: AllergenType) => {
    setExcludedAllergens((prev) =>
      prev.includes(allergen) ? prev.filter((a) => a !== allergen) : [...prev, allergen]
    );
  };

  const tastingItems = useMemo(() => {
    return TASTING_MENU_IDS.map((id) => menuService.getItemById(id)).filter(Boolean) as MenuItem[];
  }, [menuService]);

  const filteredItems = useMemo(() => {
    let items = menuService.filterItems({
      category: selectedCategory,
      searchQuery: Sanitizer.cleanText(searchQuery, 60),
      dietaryFilter: selectedDiet,
      minPrice: 0,
      maxPrice,
    });

    if (excludedAllergens.length > 0) {
      items = items.filter((item) => {
        for (const allergen of excludedAllergens) {
          if (item.allergens.includes(allergen)) {
            return false;
          }
        }
        return true;
      });
    }

    return items;
  }, [menuService, selectedCategory, searchQuery, selectedDiet, excludedAllergens, maxPrice]);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedDiet('all');
    setExcludedAllergens([]);
    setMaxPrice(220);
  };

  const scrollToReservations = () => {
    const el = document.getElementById('reservations');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="menu" className="scroll-mt-28 relative py-24 sm:py-32 bg-obsidian-950 overflow-hidden text-neutral-300">
      
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-[radial-gradient(ellipse_at_top,rgba(197,160,89,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-primary/10 border border-gold-primary/25 text-gold-light text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="h-3.5 w-3.5 text-gold-primary" /> Haute Gastronomie
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-champagne mb-4 tracking-tight">
            The Culinary Experiences
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
            Orchestrated nightly by Executive Chef Gabriel Moreau. Experience our signature blind tasting journey or explore seasonal à la carte allocations.
          </p>

          {/* Luxury Mode Toggle Switch */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-obsidian-900 border border-gold-primary/30 mt-8 shadow-card-dark">
            <button
              onClick={() => setViewMode('tasting')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-serif font-bold uppercase tracking-wider transition-all duration-300 ${
                viewMode === 'tasting'
                  ? 'bg-gold-primary text-obsidian-950 shadow-gold-sm'
                  : 'text-neutral-400 hover:text-champagne'
              }`}
            >
              <Award className="h-3.5 w-3.5" /> Grand Tasting Odyssey (10 Courses)
            </button>
            <button
              onClick={() => setViewMode('alacarte')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-serif font-bold uppercase tracking-wider transition-all duration-300 ${
                viewMode === 'alacarte'
                  ? 'bg-gold-primary text-obsidian-950 shadow-gold-sm'
                  : 'text-neutral-400 hover:text-champagne'
              }`}
            >
              <Utensils className="h-3.5 w-3.5" /> Seasonal À La Carte Catalog
            </button>
          </div>
        </div>

        {/* VIEW 1: GRAND TASTING MENU ODYSSEY */}
        {viewMode === 'tasting' && (
          <div className="space-y-12 animate-fade-in">
            {/* Banner card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-gold-primary/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[11px] font-semibold text-gold-light uppercase tracking-widest block mb-1">
                  The Signature Michelin 3-Star Experience
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-champagne">
                  The Ten-Course Celestial Odyssey
                </h3>
                <p className="text-xs text-neutral-400 max-w-xl mt-2 leading-relaxed font-sans">
                  A harmonious progression through oceanic purity, wood-fired hearth intensity, and rare Périgord truffles. Served in The Grand Atrium & Chef’s Omakase Counter.
                </p>
                <div className="flex flex-wrap gap-4 mt-4 text-xs">
                  <span className="text-champagne font-serif font-bold">
                    Tasting Menu: <span className="text-gold-primary">{formatCurrency(395, currency)}</span> / guest
                  </span>
                  <span className="text-neutral-500">·</span>
                  <span className="text-neutral-300">
                    Grand Sommelier Pairing: <span className="text-gold-light">{formatCurrency(250, currency)}</span>
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={onOpenSommelier}
                  className="px-5 py-3 rounded-xl gold-button-outline text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <Wine className="h-3.5 w-3.5 text-gold-primary" /> Cellar Pairings
                </button>
                <button
                  onClick={scrollToReservations}
                  className="px-7 py-3 rounded-xl gold-button text-xs font-bold uppercase tracking-wider shadow-gold-glow flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" /> Book This Experience
                </button>
              </div>
            </div>

            {/* Sequential 10-Course Progression Timeline */}
            <div className="space-y-4">
              {tastingItems.map((dish, index) => (
                <div
                  key={dish.id}
                  onClick={() => onSelectDish(dish)}
                  className="group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-5 sm:p-6 rounded-2xl bg-obsidian-900/70 border border-neutral-800/80 hover:border-gold-primary/40 transition-all duration-300 cursor-pointer shadow-card-dark"
                >
                  <div className="flex items-center gap-5 w-full md:w-auto">
                    {/* Course Sequence Badge */}
                    <div className="h-12 w-12 rounded-xl bg-obsidian-950 border border-gold-primary/20 flex flex-col items-center justify-center text-center shrink-0">
                      <span className="text-[9px] uppercase tracking-wider text-gold-light/80 font-sans">Course</span>
                      <span className="font-serif font-bold text-base text-champagne">{String(index + 1).padStart(2, '0')}</span>
                    </div>

                    {/* Thumbnail */}
                    <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden shrink-0 bg-neutral-800">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        sizes="80px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Titles */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase tracking-widest text-gold-light font-semibold">
                          {dish.category.replace('-', ' ')}
                        </span>
                        {dish.isChefSpecial && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase bg-gold-primary text-obsidian-950">
                            ★ Signature
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-champagne group-hover:text-gold-hover transition-colors truncate">
                        {dish.name}
                      </h4>
                      <p className="text-xs text-neutral-400 line-clamp-1 max-w-lg mt-0.5">
                        {dish.shortDesc || dish.description}
                      </p>
                    </div>
                  </div>

                  {/* Sommelier & Action */}
                  <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-neutral-800">
                    {dish.winePairing && (
                      <div className="hidden lg:block text-right">
                        <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">Allocation Pairing</span>
                        <span className="text-xs font-serif text-gold-light font-medium">{dish.winePairing.name} ({dish.winePairing.vintage})</span>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <span className="font-serif text-sm font-bold text-gold-primary">
                        {formatCurrency(dish.price, currency)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(dish);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-gold-primary/10 hover:bg-gold-primary text-gold-hover hover:text-obsidian-950 text-xs font-medium border border-gold-primary/30 transition-colors"
                      >
                        Add to Selection
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Book CTA */}
            <div className="text-center pt-8">
              <button
                onClick={scrollToReservations}
                className="px-10 py-4 rounded-xl gold-button text-xs font-bold uppercase tracking-widest shadow-gold-glow inline-flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" /> Reserve The Grand Tasting Menu
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: SEASONAL À LA CARTE CATALOG */}
        {viewMode === 'alacarte' && (
          <div className="space-y-8 animate-fade-in">
            {/* Search Bar & Interactive Filter Row */}
            <div className="p-6 sm:p-8 rounded-3xl bg-obsidian-900/90 border border-gold-primary/20 backdrop-blur-md shadow-2xl space-y-6">
              
              {/* Top Row: Search Input + Sommelier Trigger + Price Slider */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                
                {/* Trie-Powered Instant Search Bar */}
                <div className="relative w-full lg:max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gold-primary" />
                  <input
                    type="text"
                    placeholder="Search courses, ingredients (Wagyu, Caviar, Truffle)..."
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

                {/* Sommelier Pairing Assistant Quick Button */}
                <button
                  onClick={onOpenSommelier}
                  className="w-full lg:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gold-primary/10 hover:bg-gold-primary/20 text-gold-hover border border-gold-primary/30 text-xs font-semibold uppercase tracking-wider transition-all shrink-0"
                >
                  <Wine className="h-4 w-4 text-gold-primary" /> Sommelier Cellar Pairing Guide
                </button>

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
                        ? 'bg-gold-primary text-obsidian-950 shadow-gold-sm font-bold'
                        : 'bg-obsidian-950 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Dietary Filter & Allergen Row */}
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

                <button
                  type="button"
                  onClick={() => setShowAllergenFilter(!showAllergenFilter)}
                  className={`ml-auto flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                    excludedAllergens.length > 0 || showAllergenFilter
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <ShieldAlert className="h-3 w-3" />
                  Allergen Exclusion ({excludedAllergens.length})
                </button>
              </div>

              {/* Expandable Allergen Exclusion Matrix */}
              {showAllergenFilter && (
                <div className="p-4 rounded-2xl bg-obsidian-950 border border-amber-500/30 space-y-2 animate-fade-in">
                  <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider block">
                    Exclude Specific Allergens (Zero-Tolerance Matrix):
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {ALLERGEN_OPTIONS.map((allergen) => {
                      const isExcluded = excludedAllergens.includes(allergen);
                      return (
                        <button
                          key={allergen}
                          type="button"
                          onClick={() => toggleAllergenExclusion(allergen)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            isExcluded
                              ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 line-through'
                              : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                          }`}
                        >
                          {isExcluded && <X className="h-3 w-3 text-rose-400" />}
                          No {allergen}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-6 px-2">
              <span>
                Showing <strong className="text-champagne font-mono">{filteredItems.length}</strong> of 30 Signature Dishes
              </span>
              {(selectedCategory !== 'all' || searchQuery || selectedDiet !== 'all' || excludedAllergens.length > 0 || maxPrice < 220) && (
                <button
                  onClick={handleClearFilters}
                  className="text-[11px] text-neutral-400 hover:text-gold-hover underline underline-offset-4"
                >
                  Reset All Filters
                </button>
              )}
            </div>

            {/* Dishes Grid */}
            {filteredItems.length === 0 ? (
              <div className="py-20 text-center rounded-3xl bg-obsidian-900/40 border border-neutral-800">
                <Utensils className="h-10 w-10 text-neutral-600 mx-auto mb-3" />
                <h3 className="font-serif text-xl font-semibold text-neutral-300 mb-1">No Courses Match Your Criteria</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-6">
                  Try adjusting your dietary filter, clearing allergen exclusions, or searching for a different ingredient.
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
                    currency={currency}
                    onSelect={onSelectDish}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
