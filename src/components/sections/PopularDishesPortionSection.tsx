'use client';

import React, { useState } from 'react';
import { MenuItem } from '@/lib/types';

interface PortionOption {
  ratio: string;
  label: string;
  priceNum: number;
  priceBangla: string;
}

interface PortionDish {
  id: string;
  titleBangla: string;
  titleEnglish: string;
  badge: string;
  badgeBg: string;
  image: string;
  category: string;
  portions: {
    '1:1': PortionOption;
    '1:2': PortionOption;
    '1:4': PortionOption;
  };
}

const PORTION_DISHES: PortionDish[] = [
  {
    id: 'dish-kacchi-basmati',
    titleBangla: 'বাসমতি কাচ্চি',
    titleEnglish: '(Basmati Kacchi)',
    badge: 'Bestseller',
    badgeBg: 'bg-brand-red text-white',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDNzPuivaEYvs8ZE0qblW61GpT51qCeNqyfccoQNT1eaiVs6jC_Om5Dtxn7zxnR0951Y0sxU1bfdTW7DpqHYGI3TS0McJlOaBX6HEA4Vv29zyDdq60QoTsYHvWrL-ZbiTF4tyXj8OKQnAL_7ubJbvDyDHbsDVuSxI0o90COdgV1QXC-XgAqAdAgwS_S8cIMWxMaJHiDm9QRTaXQ0VAtSsdugUX3RVeUJlWCzmb5lf4p5DYJ1pzFqWE2zQ',
    category: 'kacchi',
    portions: {
      '1:1': { ratio: '1:1', label: '1 Person', priceNum: 330, priceBangla: '৳৩৩০/-' },
      '1:2': { ratio: '1:2', label: '2 Persons', priceNum: 980, priceBangla: '৳৯৮০/-' },
      '1:4': { ratio: '1:4', label: '4 Persons', priceNum: 1930, priceBangla: '৳১৯৩০/-' },
    },
  },
  {
    id: 'dish-kacchi-khadok',
    titleBangla: 'কাচ্চি খাদক',
    titleEnglish: '(Kacchi Khadok)',
    badge: 'Extra Meat',
    badgeBg: 'bg-amber-500 text-white',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCK8MV-07ehksDJ2l42WzbGTPV1EQ6q-n2rJeGS_7nnFqYh_YFX8FB59jFo6ZoTXNppaNpOa7olVu6gFxGNu1ATpX4jjcuXbsWRuaMMEXiFh5ms1KeWi9LSGr8KEVIt3dk-lxTzQd3TUsitZFrdaE0hH7sqYAjlDML7HW0qnBdj-fz5Mp8Ovd76OZp9NB76VLmr96bYowS_OoLwiQCPyyIKk-tD931LuncbXrT_ENEXaC4U9Gp0eM8GAQ',
    category: 'kacchi',
    portions: {
      '1:1': { ratio: '1:1', label: '1 Person', priceNum: 530, priceBangla: '৳৫৩০/-' },
      '1:2': { ratio: '1:2', label: '2 Persons', priceNum: 1480, priceBangla: '৳১৪৮০/-' },
      '1:4': { ratio: '1:4', label: '4 Persons', priceNum: 2480, priceBangla: '৳২৪৮০/-' },
    },
  },
  {
    id: 'dish-kacchi-combo',
    titleBangla: 'বাসমতি কাচ্চি, বোরহানী,ফিরনি',
    titleEnglish: '(Kacchi, Borhani, Firni)',
    badge: 'Combo Treat',
    badgeBg: 'bg-emerald-600 text-white',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8DN9Nk3QVijW7xIY-9WREnb9i9oWNV5AsTQ04iGFzL4eIaIJ4I67lNeXGBuhB3BoRTNAOA0ffO7QJ_Uofykv9exZgWRE4DemFDpinPuCBDeBN_QnGg-XnuUUlNC46xP0jmvvr58swYBl7EHyUNyY3TeVlc8We4Ws_kabTT88NnjmblmZPVG5RcSL3Gxd5jofD5BkDQQoS732m3p0vgKWneqZiCrGpbD1I3w6QuB9dNZPzNxVnAZd3Ig',
    category: 'popular',
    portions: {
      '1:1': { ratio: '1:1', label: '1 Person', priceNum: 460, priceBangla: '৳৪৬০/-' },
      '1:2': { ratio: '1:2', label: '2 Persons', priceNum: 1370, priceBangla: '৳১৩৭০/-' },
      '1:4': { ratio: '1:4', label: '4 Persons', priceNum: 2280, priceBangla: '৳২২৮০/-' },
    },
  },
  {
    id: 'dish-mutton-tehari',
    titleBangla: 'স্পেশাল মাটন তেহারি',
    titleEnglish: '(Special Tehari)',
    badge: 'Mustard Oil Infused',
    badgeBg: 'bg-neutral-800 text-white',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBx6AWIr9aTHyUS9mw4A3EITgb0-qBSQR8cYpeArFGMUDOdmbarnVOhQI-8tN1l9kHDYGy7wgJKsdQieBF2UttMjNtSMpKfWH0ZSoZaH88qSkNBe6Pmg6jzmdNIVPjyvJF2cV-LXFrGoiicl4phOr0C04TJAR75oqNl4X6r3OVsagdbujEFjCY9NN2df_tIN5qc-ySnCyx6MJ47rD5yMq6Iohy_yP4K_FOZkavnw_V10yTpxXtkxqOKhw',
    category: 'tehari',
    portions: {
      '1:1': { ratio: '1:1', label: '1 Person', priceNum: 270, priceBangla: '৳২৭০/-' },
      '1:2': { ratio: '1:2', label: '2 Persons', priceNum: 790, priceBangla: '৳৭৯০/-' },
      '1:4': { ratio: '1:4', label: '4 Persons', priceNum: 1320, priceBangla: '৳১৩২০/-' },
    },
  },
];

const CATEGORY_TABS = [
  { id: 'popular', labelBangla: 'জনপ্রিয়', labelEnglish: 'Popular' },
  { id: 'kacchi', labelBangla: 'কাচ্চি', labelEnglish: 'Kacchi' },
  { id: 'tehari', labelBangla: 'তেহেরি', labelEnglish: 'Tehari' },
  { id: 'polao', labelBangla: 'পোলাও', labelEnglish: 'Polao' },
  { id: 'chuigost', labelBangla: 'চুইগোস্ত', labelEnglish: 'Chuigost' },
  { id: 'desserts', labelBangla: 'মিষ্টান্ন ও পানীয়', labelEnglish: 'Sweets & Drinks' },
];

interface PopularDishesPortionSectionProps {
  onAddToCart?: (dish: MenuItem) => void;
}

export function PopularDishesPortionSection({ onAddToCart }: PopularDishesPortionSectionProps) {
  const [activeCategory, setActiveCategory] = useState('popular');
  const [selectedPortions, setSelectedPortions] = useState<Record<string, '1:1' | '1:2' | '1:4'>>({
    'dish-kacchi-basmati': '1:2',
    'dish-kacchi-khadok': '1:4',
    'dish-kacchi-combo': '1:2',
    'dish-mutton-tehari': '1:4',
  });

  const handleSelectPortion = (dishId: string, ratio: '1:1' | '1:2' | '1:4') => {
    setSelectedPortions((prev) => ({ ...prev, [dishId]: ratio }));
  };

  const handleAddToCart = (dish: PortionDish) => {
    const activeRatio = selectedPortions[dish.id] || '1:1';
    const portionData = dish.portions[activeRatio];

    if (onAddToCart) {
      onAddToCart({
        id: `${dish.id}-${activeRatio}`,
        name: `${dish.titleBangla} ${dish.titleEnglish} [${activeRatio}]`,
        slug: `${dish.id}-${activeRatio}`,
        category: 'prime-cuts',
        price: portionData.priceNum,
        description: `${dish.titleBangla} ${dish.titleEnglish} for ${portionData.label}. Cooked fresh in traditional dum pots.`,
        shortDesc: `${dish.titleEnglish} portion ${activeRatio}`,
        image: dish.image,
        ingredients: ['Basmati Rice', 'Mutton/Chicken', 'Ghee', 'Saffron'],
        dietary: ['halal'],
        allergens: ['Dairy'],
        isChefSpecial: true,
        isPopular: true,
      });
    }
  };

  return (
    <section
      className="py-16 bg-[#FFF9F6]"
      data-purpose="portion-selection-menu"
      id="portion-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-brand-red font-black text-xs uppercase tracking-widest bg-red-100 px-3.5 py-1 rounded-full">
            Select Your Perfect Serving
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-dark mt-3 tracking-tight">
            POPULAR DISHES &amp; PORTION PACKS
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Cooked fresh in small batches. Choose individual portions or family sharing platters tailored to your party size.
          </p>
        </div>

        {/* Category Filter Pills (Exact Bengali style categories as in Screenshot 13) */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all ${
                  isActive
                    ? 'bg-brand-red text-white shadow-sm hover:bg-brand-darkred'
                    : 'bg-white border border-brand-red text-brand-red hover:bg-red-50'
                }`}
              >
                {tab.labelBangla} ({tab.labelEnglish})
              </button>
            );
          })}
        </div>

        {/* 4 Column Portion Cards Grid (Screenshot 13 Replica) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="menu-highlights">
          {PORTION_DISHES.map((dish) => {
            const activeRatio = selectedPortions[dish.id] || '1:1';

            return (
              <article
                key={dish.id}
                className="bg-white rounded-3xl overflow-hidden shadow-custom-card border border-neutral-100 flex flex-col hover:-translate-y-1 transition duration-300"
              >
                {/* Food Image & Badge */}
                <div className="h-52 overflow-hidden relative bg-neutral-100">
                  <img
                    alt={`${dish.titleBangla} - ${dish.titleEnglish}`}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    src={dish.image}
                  />
                  <span
                    className={`absolute top-3 left-3 text-[10px] font-black uppercase px-2.5 py-1 rounded-md ${dish.badgeBg}`}
                  >
                    {dish.badge}
                  </span>
                </div>

                {/* Card Content & Portion Switcher */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-lg text-brand-dark text-center leading-snug">
                      {dish.titleBangla}{' '}
                      <span className="block text-xs font-semibold text-neutral-500">
                        {dish.titleEnglish}
                      </span>
                    </h3>

                    {/* Portion Pricing with Person Silhouette Icons */}
                    <div className="grid grid-cols-3 gap-2 mt-5 text-center border-t border-b border-neutral-100 py-3">
                      
                      {/* 1 Person (1:1) */}
                      <div
                        onClick={() => handleSelectPortion(dish.id, '1:1')}
                        className={`cursor-pointer p-1.5 rounded-lg transition border ${
                          activeRatio === '1:1'
                            ? 'bg-red-50/70 border-red-200'
                            : 'hover:bg-red-50 border-transparent hover:border-red-200'
                        }`}
                      >
                        <div className={activeRatio === '1:1' ? 'text-brand-red mb-1' : 'text-neutral-600 mb-1'}>
                          <i className="fa-solid fa-user text-sm" />
                        </div>
                        <span
                          className={`block text-[11px] font-semibold ${
                            activeRatio === '1:1' ? 'text-neutral-700' : 'text-neutral-500'
                          }`}
                        >
                          1:1
                        </span>
                        <span className="block text-xs font-black text-brand-red mt-0.5">
                          {dish.portions['1:1'].priceBangla}
                        </span>
                      </div>

                      {/* 2 Persons (1:2) */}
                      <div
                        onClick={() => handleSelectPortion(dish.id, '1:2')}
                        className={`cursor-pointer p-1.5 rounded-lg transition border ${
                          activeRatio === '1:2'
                            ? 'bg-red-50/70 border-red-200'
                            : 'hover:bg-red-50 border-transparent hover:border-red-200'
                        }`}
                      >
                        <div className={activeRatio === '1:2' ? 'text-brand-red mb-1' : 'text-neutral-600 mb-1'}>
                          <i className="fa-solid fa-user-group text-sm" />
                        </div>
                        <span
                          className={`block text-[11px] font-semibold ${
                            activeRatio === '1:2' ? 'text-neutral-700' : 'text-neutral-500'
                          }`}
                        >
                          1:2
                        </span>
                        <span className="block text-xs font-black text-brand-red mt-0.5">
                          {dish.portions['1:2'].priceBangla}
                        </span>
                      </div>

                      {/* 3-4 Persons (1:4) */}
                      <div
                        onClick={() => handleSelectPortion(dish.id, '1:4')}
                        className={`cursor-pointer p-1.5 rounded-lg transition border ${
                          activeRatio === '1:4'
                            ? 'bg-red-50/70 border-red-200'
                            : 'hover:bg-red-50 border-transparent hover:border-red-200'
                        }`}
                      >
                        <div className={activeRatio === '1:4' ? 'text-brand-red mb-1' : 'text-neutral-600 mb-1'}>
                          <i className="fa-solid fa-users text-sm" />
                        </div>
                        <span
                          className={`block text-[11px] font-semibold ${
                            activeRatio === '1:4' ? 'text-neutral-700' : 'text-neutral-500'
                          }`}
                        >
                          1:4
                        </span>
                        <span className="block text-xs font-black text-brand-red mt-0.5">
                          {dish.portions['1:4'].priceBangla}
                        </span>
                      </div>

                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(dish)}
                    className="mt-4 w-full bg-brand-red hover:bg-brand-darkred text-white text-xs font-bold py-2.5 rounded-xl transition shadow-sm flex items-center justify-center space-x-1.5 active:scale-95"
                  >
                    <i className="fa-solid fa-cart-plus" />
                    <span>অর্ডার করুন (Add to Cart)</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
