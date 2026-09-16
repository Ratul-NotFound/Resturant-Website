'use client'

import React, { useState } from 'react'
import { Plus, Check, SlidersHorizontal, Flame } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MenuItemData, PortionData } from '@/lib/data'
import { useStore } from '@/lib/store'

interface DishCardProps {
  item: MenuItemData
}

export default function DishCard({ item }: DishCardProps) {
  const { addToCart, openCustomizer, showToast } = useStore()
  const [selectedPortion, setSelectedPortion] = useState<PortionData>(
    item.portions[0] || { label: 'Regular', serves: '1 Person', price: 0 }
  )
  const [added, setAdded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handlePortionSelect = (e: React.MouseEvent, portion: PortionData) => {
    e.stopPropagation()
    setSelectedPortion(portion)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(item, selectedPortion, { quantity: 1 })
    showToast(
      'Added to Feast Tray',
      `${item.name} (${selectedPortion.label}) added for ৳${selectedPortion.price}`
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  const hasCustomizer = (item.spiceOptions && item.spiceOptions.length > 0) || (item.addons && item.addons.length > 0)

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-3xl border border-neutral-200/80 hover:border-brand-red/40 shadow-sm hover:shadow-xl hover:shadow-brand-red/5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
      data-dish={item.name}
    >
      {/* 1. Spacious Clean 3D Food Stage (No clipping, completely visible) */}
      <div className="relative w-full h-48 sm:h-56 bg-gradient-to-b from-neutral-50 via-neutral-100/40 to-white flex flex-col items-center justify-center p-3 pt-4">
        
        {/* Soft Warm Backlight Spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-radial from-amber-400/15 via-orange-500/5 to-transparent blur-xl opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none" />

        {/* Top Left: Bestseller / Category Tag */}
        {item.tag && (
          <div className="absolute top-3 left-3 z-20">
            <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-neutral-900/90 backdrop-blur-md text-white border border-white/20 shadow-xs">
              <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
              {item.tag}
            </span>
          </div>
        )}

        {/* Top Right: Customizer Trigger */}
        {hasCustomizer && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              openCustomizer(item)
            }}
            type="button"
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white text-neutral-700 hover:text-brand-red flex items-center justify-center shadow-md border border-neutral-200/80 hover:scale-110 active:scale-95 transition-all"
            title="Customize spices & add-ons"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        )}

        {/* 3D Floating Food Cutout */}
        <motion.div
          animate={{
            scale: isHovered ? 1.08 : 1,
            y: isHovered ? -5 : 0,
            rotate: isHovered ? -1.5 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 22,
          }}
          className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 flex items-center justify-center z-10 select-none p-1"
        >
          <img
            src={item.image}
            alt={item.name}
            className="max-w-full max-h-full object-contain filter drop-shadow-[0_12px_16px_rgba(0,0,0,0.28)] group-hover:drop-shadow-[0_20px_26px_rgba(0,0,0,0.42)] transition-all duration-300"
          />
        </motion.div>

        {/* Realistic Ground Contact Shadow */}
        <div className="w-28 sm:w-36 h-2 bg-black/20 rounded-full blur-[3px] opacity-70 group-hover:opacity-30 group-hover:scale-125 transition-all duration-300 pointer-events-none" />

        {/* Floating Servings Badge on Bottom-Right */}
        <div className="absolute bottom-2.5 right-3 z-20 pointer-events-none">
          <span className="text-[10px] font-bold text-neutral-600 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-neutral-200 shadow-xs">
            {selectedPortion.serves}
          </span>
        </div>
      </div>

      {/* 2. Content & Details */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-3 border-t border-neutral-100/80">
        <div>
          {/* Header Row: Title & Dynamic Price */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display font-black text-sm sm:text-base text-neutral-900 group-hover:text-brand-red transition-colors leading-snug">
                {item.name}
              </h3>
              {item.nameBn && (
                <p className="text-[11px] font-medium text-neutral-400 font-bangla mt-0.5">
                  {item.nameBn}
                </p>
              )}
            </div>

            {/* Dynamic Price Display */}
            <div className="text-right shrink-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPortion.price}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="font-display font-black text-base sm:text-xl text-brand-red leading-none"
                >
                  ৳{selectedPortion.price}
                </motion.div>
              </AnimatePresence>
              <span className="text-[9px] sm:text-[10px] font-bold text-neutral-400 block mt-0.5 uppercase tracking-wider">
                {selectedPortion.label}
              </span>
            </div>
          </div>

          {/* 2-Line Description */}
          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mt-1.5 font-normal">
            {item.description}
          </p>
        </div>

        {/* 3. Interactive Portion Selector Pills */}
        <div className="space-y-2.5 pt-1 border-t border-neutral-100">
          <div className="flex items-center gap-1 p-1 bg-neutral-100/80 rounded-2xl">
            {item.portions.map((portion) => {
              const isSelected = selectedPortion.label === portion.label
              return (
                <button
                  key={portion.label}
                  onClick={(e) => handlePortionSelect(e, portion)}
                  type="button"
                  className={`relative flex-1 py-1.5 px-1.5 rounded-xl text-[11px] sm:text-xs font-bold transition-all duration-200 text-center flex items-center justify-center gap-1 ${
                    isSelected
                      ? 'text-neutral-900 shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId={`portion-pill-${item.id}`}
                      className="absolute inset-0 bg-white rounded-xl shadow-xs border border-neutral-200/80"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 truncate">{portion.label}</span>
                </button>
              )
            })}
          </div>

          {/* 4. Action Button Bar */}
          <div className="flex items-center gap-2">
            {hasCustomizer && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  openCustomizer(item)
                }}
                type="button"
                className="py-2.5 px-3 rounded-2xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 hover:text-brand-red text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
                title="Customize Meal"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Customize</span>
              </button>
            )}

            <button
              onClick={handleAddToCart}
              type="button"
              className={`flex-1 py-2.5 px-4 rounded-2xl text-xs font-bold transition-all duration-200 shadow-sm flex items-center justify-center gap-1.5 active:scale-95 ${
                added
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                  : 'bg-brand-red hover:bg-brand-darkred text-white shadow-brand-red/20 hover:shadow-md'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3] animate-bounce" />
                  <span>Added to Feast</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Add to Tray</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
