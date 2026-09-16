'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Flame,
  Plus,
  Check,
  SlidersHorizontal,
} from 'lucide-react'
import { MenuItemData, PortionData } from '@/lib/data'
import { useStore } from '@/lib/store'
import confetti from 'canvas-confetti'

interface DishCardProps {
  item: MenuItemData
}

export default function DishCard({ item }: DishCardProps) {
  const { addToCart, openCustomizer, showToast } = useStore()
  
  // Default selected portion
  const defaultPortion =
    item.portions.find((p) => p.isDefault) || item.portions[0]
  const [selectedPortion, setSelectedPortion] = useState<PortionData>(defaultPortion)
  const [added, setAdded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handlePortionSelect = (e: React.MouseEvent, portion: PortionData) => {
    e.stopPropagation()
    setSelectedPortion(portion)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()

    // Trigger subtle food confetti on desktop
    if (typeof window !== 'undefined' && window.innerWidth > 768) {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.8 },
      })
    }

    addToCart(item, selectedPortion, { quantity: 1 })
    showToast(
      'Added to Tray',
      `${item.name} (${selectedPortion.label}) added to your feast tray.`
    )

    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  const hasCustomizer =
    (item.spiceOptions && item.spiceOptions.length > 0) ||
    (item.addons && item.addons.length > 0)

  return (
    <motion.article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/80 hover:border-brand-red/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
      data-purpose="dish-card"
    >
      {/* 1. 3D Food Stage Background */}
      <div className="relative h-32 sm:h-48 md:h-52 bg-gradient-to-b from-[#F9F7F5] via-[#F4EFEA] to-[#EFEAE4] flex items-center justify-center overflow-hidden border-b border-neutral-100">
        
        {/* Soft Radial Ambient Spotlight on Hover */}
        <div className="absolute inset-0 bg-radial from-amber-400/20 via-brand-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Top Left: Bestseller / Signature Tag */}
        {item.tag && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20 pointer-events-none">
            <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[8px] sm:text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-neutral-900/90 backdrop-blur-md text-white border border-white/20 shadow-2xs">
              <Flame className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-amber-400 fill-amber-400 shrink-0" />
              <span className="truncate max-w-[65px] sm:max-w-none">{item.tag}</span>
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
            className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/95 text-neutral-700 hover:text-brand-red flex items-center justify-center shadow-xs border border-neutral-200/80 hover:scale-110 active:scale-95 transition-all"
            title="Customize spices & add-ons"
          >
            <SlidersHorizontal className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
          </button>
        )}

        {/* 3D Floating Food Cutout */}
        <motion.div
          animate={{
            scale: isHovered ? 1.08 : 1,
            y: isHovered ? -4 : 0,
            rotate: isHovered ? -1.5 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 22,
          }}
          className="relative w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 flex items-center justify-center z-10 select-none p-0.5 sm:p-1"
        >
          <img
            src={item.image}
            alt={item.name}
            className="max-w-full max-h-full object-contain filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)] group-hover:drop-shadow-[0_16px_22px_rgba(0,0,0,0.38)] transition-all duration-300"
          />
        </motion.div>

        {/* Realistic Ground Contact Shadow */}
        <div className="w-18 sm:w-32 h-1.5 sm:h-2 bg-black/20 rounded-full blur-[2px] opacity-70 group-hover:opacity-30 group-hover:scale-125 transition-all duration-300 pointer-events-none" />

        {/* Floating Servings Badge on Bottom-Right */}
        <div className="absolute bottom-1.5 right-2 sm:bottom-2.5 sm:right-3 z-20 pointer-events-none">
          <span className="text-[8px] sm:text-[10px] font-bold text-neutral-600 bg-white/95 backdrop-blur-md px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-md sm:rounded-full border border-neutral-200 shadow-2xs">
            {selectedPortion.serves}
          </span>
        </div>
      </div>

      {/* 2. Content & Details */}
      <div className="p-2.5 sm:p-4 md:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3 border-t border-neutral-100/80">
        <div>
          {/* Header Row: Title & Dynamic Price */}
          <div className="flex items-start justify-between gap-1 sm:gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-bold text-xs sm:text-base text-neutral-900 group-hover:text-brand-red transition-colors leading-tight line-clamp-1 sm:line-clamp-2">
                {item.name}
              </h3>
              {item.nameBn && (
                <p className="hidden sm:block text-[11px] font-medium text-neutral-400 font-bangla mt-0.5 truncate">
                  {item.nameBn}
                </p>
              )}
            </div>

            {/* Dynamic Price Display */}
            <div className="text-right shrink-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPortion.price}
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 3 }}
                  transition={{ duration: 0.15 }}
                  className="font-display font-black text-xs sm:text-lg md:text-xl text-brand-red leading-none"
                >
                  ৳{selectedPortion.price}
                </motion.div>
              </AnimatePresence>
              <span className="text-[8px] sm:text-[10px] font-bold text-neutral-400 block mt-0.5 uppercase tracking-wider truncate">
                {selectedPortion.label}
              </span>
            </div>
          </div>

          {/* 2-Line Description */}
          <p className="hidden sm:block text-xs text-neutral-500 line-clamp-2 leading-relaxed mt-1.5 font-normal">
            {item.description}
          </p>
        </div>

        {/* 3. Interactive Portion Selector Pills */}
        <div className="space-y-1.5 sm:space-y-2.5 pt-1 border-t border-neutral-100">
          <div className="flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 bg-neutral-100/80 rounded-xl sm:rounded-2xl">
            {item.portions.map((portion) => {
              const isSelected = selectedPortion.label === portion.label
              return (
                <button
                  key={portion.label}
                  onClick={(e) => handlePortionSelect(e, portion)}
                  type="button"
                  className={`relative flex-1 py-1 sm:py-1.5 px-1 sm:px-1.5 rounded-lg sm:rounded-xl text-[9px] sm:text-xs font-bold transition-all duration-200 text-center flex items-center justify-center gap-0.5 ${
                    isSelected
                      ? 'text-neutral-900 shadow-2xs'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId={`portion-pill-${item.id}`}
                      className="absolute inset-0 bg-white rounded-lg sm:rounded-xl shadow-2xs border border-neutral-200/80"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 truncate">{portion.label}</span>
                </button>
              )
            })}
          </div>

          {/* 4. Action Button Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {hasCustomizer && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  openCustomizer(item)
                }}
                type="button"
                className="hidden sm:flex py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl sm:rounded-2xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 hover:text-brand-red text-xs font-bold transition-colors items-center gap-1.5 shrink-0"
                title="Customize Meal"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Custom</span>
              </button>
            )}

            <button
              onClick={handleAddToCart}
              type="button"
              className={`flex-1 py-2 sm:py-2.5 px-2.5 sm:px-4 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-bold transition-all duration-200 shadow-xs flex items-center justify-center gap-1 active:scale-95 ${
                added
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                  : 'bg-brand-red hover:bg-brand-darkred text-white shadow-brand-red/20 hover:shadow-md'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3 sm:w-3.5 h-3 sm:h-3.5 stroke-[3] animate-bounce" />
                  <span className="truncate">Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[2.5]" />
                  <span className="truncate">Add to Tray</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
