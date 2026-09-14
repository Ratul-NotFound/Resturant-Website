'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Check, SlidersHorizontal, Plus, Sparkles, Flame, User, Users, UsersRound } from 'lucide-react'
import { MenuItemData, PortionData } from '@/lib/data'
import { useStore } from '@/lib/store'

interface DishCardProps {
  item: MenuItemData
}

export default function DishCard({ item }: DishCardProps) {
  const { addToCart, openCustomizer } = useStore()

  const defaultPortion = item.portions.find((p) => p.isDefault) || item.portions[0]
  const [selectedPortion, setSelectedPortion] = useState<PortionData>(defaultPortion)
  const [added, setAdded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

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
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative bg-white rounded-[28px] overflow-hidden border border-neutral-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_48px_-12px_rgba(200,16,46,0.14)] hover:border-brand-red/30 transition-colors duration-300 flex flex-col justify-between"
      data-dish={item.name}
    >
      {/* 1. Cinematic Food Image Stage */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 p-2.5 pb-0">
        <div className="w-full h-full rounded-2xl overflow-hidden relative">
          <motion.img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

          {/* Top Left: Minimalist Category / Bestseller Badge */}
          {item.tag && (
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-xs">
                {item.tag.includes('Bestseller') && <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />}
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
              className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-neutral-800 flex items-center justify-center shadow-md backdrop-blur-md border border-white/60 hover:scale-110 active:scale-95 transition-all"
              title="Customize spices & add-ons"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-red" />
            </button>
          )}

          {/* Floating Servings Pill on Bottom-Right of Image */}
          <div className="absolute bottom-2.5 right-2.5 z-10 pointer-events-none">
            <span className="text-[11px] font-bold text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
              {selectedPortion.serves}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Content & Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Header Row: Title & Price */}
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

          {/* Minimalist 1-Line Editorial Description */}
          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mt-2">
            {item.description}
          </p>
        </div>

        {/* 3. Interactive Minimalist Portion Selector Pills */}
        <div className="space-y-3 pt-1 border-t border-neutral-100">
          <div className="flex items-center gap-1.5 p-1 bg-neutral-100/80 rounded-2xl">
            {item.portions.map((portion) => {
              const isSelected = selectedPortion.label === portion.label
              return (
                <button
                  key={portion.label}
                  onClick={(e) => handlePortionSelect(e, portion)}
                  type="button"
                  className={`relative flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all duration-200 text-center flex items-center justify-center gap-1 ${
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
