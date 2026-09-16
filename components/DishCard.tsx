'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Check, SlidersHorizontal, Flame } from 'lucide-react'
import { MenuItemData, PortionData } from '@/lib/data'
import { useStore } from '@/lib/store'

interface DishCardProps {
  item: MenuItemData
}

export default function DishCard({ item }: DishCardProps) {
  const { addToCart, openCustomizer } = useStore()
  const [selectedPortion, setSelectedPortion] = useState<PortionData>(
    item.portions.find((p) => p.isDefault) || item.portions[0]
  )
  const [isHovered, setIsHovered] = useState(false)
  const [added, setAdded] = useState(false)

  const handlePortionSelect = (e: React.MouseEvent, portion: PortionData) => {
    e.stopPropagation()
    setSelectedPortion(portion)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(item, selectedPortion, { quantity: 1 })
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  const hasCustomizer = Boolean(item.spiceOptions || (item.addons && item.addons.length > 0))

  return (
    <motion.article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative bg-white rounded-[28px] overflow-hidden border border-neutral-200/70 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_28px_50px_-12px_rgba(200,16,46,0.18)] hover:border-brand-red/40 transition-all duration-300 flex flex-col justify-between"
      data-dish={item.name}
    >
      {/* 1. Luxurious 3D Floating Food Stage */}
      <div className="relative w-full overflow-hidden bg-gradient-to-b from-neutral-100/90 via-neutral-50/60 to-white pt-6 pb-4 px-4 flex flex-col items-center justify-center min-h-[200px] sm:min-h-[220px]">
        
        {/* Warm Ambient Spotlight Halo behind Dish */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-radial from-amber-400/20 via-brand-red/10 to-transparent blur-2xl opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none" />

        {/* Top Left: Bestseller / Category Tag */}
        {item.tag && (
          <div className="absolute top-3 left-3 z-20">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md text-white border border-white/20 shadow-sm">
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
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-800 flex items-center justify-center shadow-md backdrop-blur-md border border-neutral-200/80 hover:scale-110 active:scale-95 transition-all"
            title="Customize spices & add-ons"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-brand-red" />
          </button>
        )}

        {/* 3D Floating Transparent Dish with Realistic Spring Physics & Tilt */}
        <motion.div
          animate={{
            scale: isHovered ? 1.15 : 1,
            y: isHovered ? -10 : 0,
            rotate: isHovered ? -2.5 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 18,
          }}
          className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 flex items-center justify-center z-10 cursor-pointer"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain filter drop-shadow-[0_14px_20px_rgba(0,0,0,0.32)] group-hover:drop-shadow-[0_28px_36px_rgba(0,0,0,0.48)] transition-all duration-300"
          />
        </motion.div>

        {/* Realistic Ground Contact Shadow */}
        <div className="w-28 sm:w-36 h-3 bg-black/25 rounded-full blur-[4px] opacity-75 group-hover:opacity-20 group-hover:scale-135 group-hover:blur-[6px] transition-all duration-300 mt-1 pointer-events-none" />

        {/* Floating Servings Badge on Bottom-Right */}
        <div className="absolute bottom-2.5 right-3 z-20 pointer-events-none">
          <span className="text-[10px] font-bold text-neutral-600 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-neutral-200/80 shadow-xs">
            {selectedPortion.serves}
          </span>
        </div>
      </div>

      {/* 2. Content & Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Header Row: Title & Dynamic Price */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display font-black text-[16px] sm:text-[17px] text-neutral-900 group-hover:text-brand-red transition-colors leading-snug">
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
                  className="font-display font-black text-lg sm:text-xl text-brand-red leading-none"
                >
                  ৳{selectedPortion.price}
                </motion.div>
              </AnimatePresence>
              <span className="text-[10px] font-bold text-neutral-400 block mt-0.5 uppercase tracking-wider">
                {selectedPortion.label}
              </span>
            </div>
          </div>

          {/* Minimalist 2-Line Editorial Description */}
          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mt-2">
            {item.description}
          </p>
        </div>

        {/* 3. Interactive Portion Selector Pills */}
        <div className="space-y-3 pt-1 border-t border-neutral-100">
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100/80 rounded-2xl">
            {item.portions.map((portion) => {
              const isSelected = selectedPortion.label === portion.label
              return (
                <button
                  key={portion.label}
                  onClick={(e) => handlePortionSelect(e, portion)}
                  type="button"
                  className={
                    'relative flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all duration-200 text-center flex items-center justify-center gap-1 ' +
                    (isSelected
                      ? 'text-neutral-900 shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-800')
                  }
                >
                  {isSelected && (
                    <motion.div
                      layoutId={'portion-pill-' + item.id}
                      className="absolute inset-0 bg-white rounded-xl shadow-xs border border-neutral-200/80"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{portion.label}</span>
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
              className={
                'flex-1 py-2.5 px-4 rounded-2xl text-xs font-bold transition-all duration-200 shadow-sm flex items-center justify-center gap-1.5 active:scale-95 ' +
                (added
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                  : 'bg-brand-red hover:bg-brand-darkred text-white shadow-brand-red/20 hover:shadow-md')
              }
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
