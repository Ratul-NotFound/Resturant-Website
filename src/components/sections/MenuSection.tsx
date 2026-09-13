'use client';

import React, { useState, useMemo } from 'react';
import { MenuItem, DishCategory, DietaryTag, CurrencyCode } from '@/lib/types';
import { MenuService } from '@/lib/services/MenuService';
import { DishCard } from '../ui/DishCard';
import { PriceSlider } from '../ui/PriceSlider';
import { formatCurrency } from '@/lib/utils/formatting';
import {
  Search,
  Filter,
  Wine,
  Sparkles,
  ShieldAlert,
  Calendar,
  Award,
  Utensils,
  X,
  Flame,
  Check,
} from 'lucide-react';

interface MenuSectionProps {
  currency?: CurrencyCode;
  onSelectDish: (dish: MenuItem) => void;
  onAddToCart: (dish: MenuItem) => void;
  onOpenSommelier: () => void;
}

const CATEGORIES: { id: DishCategory | 'all'; label: string; dotColor: string; activeClass: string }[] = [
  { id: 'all', label: 'All Specialties', dotColor: 'bg-brand-red', activeClass: 'bg-brand-red text-white shadow-md' },
  { id: 'prime-cuts', label: 'Flame-Grilled Wagyu', dotColor: 'bg-rose-500', activeClass: 'bg-rose-600 text-white shadow-md' },
  { id: 'ocean', label: 'Oceanic Seafood', dotColor: 'bg-emerald-500', activeClass: 'bg-emerald-600 text-white shadow-md' },
  { id: 'pasta-grains', label: 'Royal Tehari & Grains', dotColor: 'bg-blue-500', activeClass: 'bg-blue-600 text-white shadow-md' },
  { id: 'starters', label: 'Starters & Cru', dotColor: 'bg-amber-500', activeClass: 'bg-amber-500 text-white shadow-md' },
  { id: 'desserts', label: 'Artisanal Sweets', dotColor: 'bg-purple-500', activeClass: 'bg-purple-600 text-white shadow-md' },
  { id: 'cocktails', label: 'Cellar & Elixirs', dotColor: 'bg-teal-500', activeClass: 'bg-teal-600 text-white shadow-md' },
];

const DIETARY_FILTERS: { id: DietaryTag | 'all'; label: string }[] = [
  { id: 'all', label: 'All Diets' },
  { id: 'halal', label: '100% Halal' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'dairy-free', label: 'Dairy-Free' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'vegetarian', label: 'Vegetarian' },
];

const ALLERGEN_OPTIONS: string[] = ['Crustaceans', 'Dairy', 'Gluten', 'Nuts', 'Eggs', 'Soy', 'Fish'];

const TASTING_ACTS = [
  {
    actNumber: 'Act I',
    title: 'Oceanic Genesis & Cold-Chain Purity',
    time: 'Courses 01 – 03',
    description: 'Sub-polar Hokkaido sea-urchin, Brittany wild turbot crudo, and Oscietra caviar pearls.',
    dishIds: ['dish-01', 'dish-02', 'dish-03'],
    badgeBg: 'bg-teal-50 border-teal-200 text-teal-800',
    borderColor: 'border-teal-200',
    bgGradient: 'bg-gradient-to-br from-teal-50/50 via-white to-white',
    accentColor: 'text-teal-700',
  },
  {
    actNumber: 'Act II',
    title: 'Elemental Hearth & Ancestral Smoke',
    time: 'Courses 04 – 07',
    description: 'Ozaki A5 Wagyu over 400°C Binchotan, glazed Challans duck, and Alba white truffle risotto.',
    dishIds: ['dish-05', 'dish-06', 'dish-07', 'dish-08'],
    badgeBg: 'bg-rose-50 border-rose-200 text-rose-800',
    borderColor: 'border-rose-200',
    bgGradient: 'bg-gradient-to-br from-rose-50/50 via-white to-white',
    accentColor: 'text-rose-700',
  },
  {
    actNumber: 'Act III',
    title: 'Ephemeral Botanical Climax',
    time: 'Courses 08 – 10',
    description: 'Smoked bone marrow gelato, fermented honey ganache, and rare Kyoto Uji matcha infusions.',
    dishIds: ['dish-09', 'dish-10'],
    badgeBg: 'bg-amber-50 border-amber-200 text-amber-800',
    borderColor: 'border-amber-200',
    bgGradient: 'bg-gradient-to-br from-amber-50/50 via-white to-white',
    accentColor: 'text-amber-700',
  },
];

export function MenuSection({
  currency = 'USD',
  onSelectDish,
  onAddToCart,
  onOpenSommelier,
}: MenuSectionProps) {
  const menuService = useMemo(() => MenuService.getInstance(), []);

  const [viewMode, setViewMode] = useState<'alacarte' | 'tasting'>('alacarte');
  const [selectedCategory, setSelectedCategory] = useState<DishCategory | 'all'>('all');
  const [selectedDiet, setSelectedDiet] = useState<DietaryTag | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(220);
  const [excludedAllergens, setExcludedAllergens] = useState<string[]>([]);
  const [showAllergenFilter, setShowAllergenFilter] = useState(false);

  const toggleAllergenExclusion = (allergen: string) => {
    setExcludedAllergens((prev) =>
      prev.includes(allergen) ? prev.filter((a) => a !== allergen) : [...prev, allergen]
    );
  };

  const filteredItems = useMemo(() => {
    let items = menuService.filterItems({
      category: selectedCategory === 'all' ? undefined : selectedCategory,
      dietaryFilter: selectedDiet === 'all' ? undefined : selectedDiet,
      searchQuery: searchQuery.trim() || undefined,
      maxPrice: maxPrice < 220 ? maxPrice : undefined,
    });

    if (excludedAllergens.length > 0) {
      items = items.filter(
        (item) =>
          !item.allergens.some((a) =>
            excludedAllergens.some((ex) => a.toLowerCase().includes(ex.toLowerCase()))
          )
      );
    }

    return items;
  }, [menuService, selectedCategory, selectedDiet, searchQuery, maxPrice, excludedAllergens]);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedDiet('all');
    setSearchQuery('');
    setMaxPrice(220);
    setExcludedAllergens([]);
  };

  const scrollToReservations = () => {
    const el = document.getElementById('reservations');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="menu" className="scroll-mt-28 relative py-24 sm:py-32 overflow-hidden bg-white">
      
      {/* Ambient background blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(232,48,42,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* === SECTION HEADER (Reference Styling) === */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-brand-red text-white shadow-md flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
              Tasty &amp; Flame-Kissed
            </span>
            <span className="text-xs text-neutral-500 font-bold">· Handcrafted Fresh</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight uppercase mb-4">
            Favorite Menu &amp;{' '}
            <span className="text-gradient-red italic">Master Creations</span>
          </h2>

          <p className="text-neutral-600 text-sm leading-relaxed max-w-xl mx-auto font-normal">
            Inspired by recipes and creations of the world's best chefs. Experience our 10-course symphonic tasting journey or explore single-estate flame-grilled cuts.
          </p>

          {/* Mode Switcher Pills */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-neutral-100 border border-neutral-200 mt-8 shadow-inner">
            <button
              onClick={() => setViewMode('alacarte')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
                viewMode === 'alacarte'
                  ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Utensils className="h-3.5 w-3.5" /> À La Carte Menu
            </button>

            <button
              onClick={() => setViewMode('tasting')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 ${
                viewMode === 'tasting'
                  ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Award className="h-3.5 w-3.5" /> 10-Course Grand Tasting
            </button>
          </div>
        </div>

        {/* =========================================================
            VIEW 1: SEASONAL À LA CARTE CATALOG (FAVORITE MENU)
            ========================================================= */}
        {viewMode === 'alacarte' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Filter & Search Bar */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-xl space-y-6">
              
              {/* Top Row: Trie Search + Cellar Assistant + Price Range Slider */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                
                {/* Trie Search Bar */}
                <div className="relative w-full lg:max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-red" />
                  <input
                    type="text"
                    placeholder="Search dishes, ingredients (Wagyu, Tehari, Lobster, Truffle)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    maxLength={60}
                    className="w-full pl-11 pr-10 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:bg-white transition-colors shadow-inner font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-900"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Sommelier Pairing Guide Button */}
                <button
                  onClick={onOpenSommelier}
                  className="w-full lg:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-red-50 hover:bg-red-100 text-brand-red border border-red-200 text-xs font-bold uppercase tracking-wider transition-all shrink-0 shadow-sm"
                >
                  <Wine className="h-4 w-4 text-brand-red" /> Sommelier Cellar Pairing Guide
                </button>

                {/* Price Slider */}
                <PriceSlider min={20} max={220} value={maxPrice} onChange={setMaxPrice} />
              </div>

              {/* Category Filter Pills (Inspired by Reference Image 3) */}
              <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 border ${
                      selectedCategory === cat.id
                        ? `${cat.activeClass}`
                        : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${cat.dotColor}`} />
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Dietary Filter & Allergen Row */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-neutral-100">
                <span className="text-[11px] font-bold text-neutral-700 uppercase flex items-center gap-1.5 mr-2">
                  <Filter className="h-3 w-3 text-brand-red" /> Dietary:
                </span>
                {DIETARY_FILTERS.map((diet) => (
                  <button
                    key={diet.id}
                    onClick={() => setSelectedDiet(diet.id)}
                    className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
                      selectedDiet === diet.id
                        ? 'bg-brand-red text-white shadow-sm'
                        : 'bg-neutral-100 border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
                    }`}
                  >
                    {diet.label}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setShowAllergenFilter(!showAllergenFilter)}
                  className={`ml-auto flex items-center gap-1 px-3 py-1 rounded-xl text-[11px] font-bold border transition-all ${
                    excludedAllergens.length > 0 || showAllergenFilter
                      ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                      : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  <ShieldAlert className="h-3.5 w-3.5" />
                  Allergen Exclusion ({excludedAllergens.length})
                </button>
              </div>

              {/* Expandable Allergen Exclusion Matrix */}
              {showAllergenFilter && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2 animate-fade-in">
                  <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                    Zero-Tolerance Allergen Filter Matrix:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {ALLERGEN_OPTIONS.map((allergen) => {
                      const isExcluded = excludedAllergens.includes(allergen);
                      return (
                        <button
                          key={allergen}
                          type="button"
                          onClick={() => toggleAllergenExclusion(allergen)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                            isExcluded
                              ? 'bg-rose-500 border-rose-600 text-white line-through shadow-sm'
                              : 'bg-white border-neutral-200 text-neutral-700 hover:border-amber-300'
                          }`}
                        >
                          {isExcluded && <X className="h-3 w-3 text-white" />}
                          No {allergen}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Results Count & Reset Filter */}
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-6 px-2">
              <span>
                Showing <strong className="text-neutral-900 font-bold">{filteredItems.length}</strong> of 30 Signature Courses
              </span>
              {(selectedCategory !== 'all' || searchQuery || selectedDiet !== 'all' || excludedAllergens.length > 0 || maxPrice < 220) && (
                <button
                  onClick={handleClearFilters}
                  className="text-[11px] font-bold text-brand-red hover:underline underline-offset-4"
                >
                  Reset All Filters
                </button>
              )}
            </div>

            {/* Dishes Grid */}
            {filteredItems.length === 0 ? (
              <div className="py-20 text-center rounded-3xl bg-white border border-neutral-200 shadow-sm">
                <Utensils className="h-10 w-10 text-neutral-300 mx-auto mb-3" />
                <h3 className="font-serif text-xl font-bold text-neutral-900 mb-1">No Courses Match Your Criteria</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-6">
                  Try adjusting your dietary filter, clearing allergen exclusions, or searching for another ingredient.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2.5 rounded-xl bg-brand-red text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-brand-redDark"
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

        {/* =========================================================
            VIEW 2: 10-COURSE GRAND TASTING MENU ODYSSEY
            ========================================================= */}
        {viewMode === 'tasting' && (
          <div className="space-y-10 animate-fade-in">
            {/* Banner card */}
            <div
              className="p-7 sm:p-9 rounded-3xl border border-black/10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6"
              style={{ background: 'linear-gradient(135deg, #fff9f0 0%, #ffffff 100%)' }}
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-red">Signature 3-Star Michelin Experience</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-black text-neutral-900">
                  The Ten-Course Celestial Odyssey
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mt-2 leading-relaxed font-normal">
                  A harmonious progression through oceanic purity, wood-fired hearth intensity, and rare Alba truffles.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                  <span className="text-neutral-900 font-bold">
                    Tasting Menu: <span className="text-brand-red font-black">{formatCurrency(395, currency)}</span> / guest
                  </span>
                  <span className="text-neutral-300">·</span>
                  <span className="text-neutral-600">
                    Grand Cru Pairing: <span className="text-[#3a7d44] font-bold">{formatCurrency(250, currency)}</span>
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={onOpenSommelier}
                  className="px-5 py-2.5 rounded-xl border border-neutral-300 hover:border-neutral-500 text-neutral-800 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <Wine className="h-3.5 w-3.5 text-brand-red" /> Cellar Pairings
                </button>
                <button
                  onClick={scrollToReservations}
                  className="px-6 py-2.5 rounded-xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
                >
                  <Calendar className="h-3.5 w-3.5" /> Reserve Table
                </button>
              </div>
            </div>

            {/* 3 Symphonic Acts Tasting Menu Progression */}
            <div className="space-y-10">
              {TASTING_ACTS.map((act, actIdx) => {
                const actDishes = act.dishIds
                  .map((id) => menuService.getItemById(id))
                  .filter(Boolean) as MenuItem[];

                return (
                  <div
                    key={act.actNumber}
                    className={`rounded-3xl p-6 sm:p-8 border ${act.borderColor} ${act.bgGradient} shadow-xl space-y-6`}
                  >
                    {/* Act Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/5">
                      <div>
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <span
                            className={`px-3 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase font-bold border ${act.badgeBg}`}
                          >
                            {act.actNumber}
                          </span>
                          <span className={`text-xs uppercase tracking-widest font-mono font-bold ${act.accentColor}`}>
                            Symphonic Movement 0{actIdx + 1}
                          </span>
                        </div>
                        <h4 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900">
                          {act.title}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-1 max-w-xl">{act.description}</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-neutral-400 self-start sm:self-auto">
                        {act.time}
                      </span>
                    </div>

                    {/* Act Dishes Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {actDishes.map((dish) => (
                        <DishCard
                          key={dish.id}
                          item={dish}
                          currency={currency}
                          onSelect={onSelectDish}
                          onAddToCart={onAddToCart}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Book CTA */}
            <div className="text-center pt-8">
              <button
                onClick={scrollToReservations}
                className="px-10 py-4 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-widest shadow-xl shadow-brand-red/30 inline-flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" /> Reserve The Grand Tasting Menu
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
