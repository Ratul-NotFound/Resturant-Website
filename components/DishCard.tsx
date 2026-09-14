'use client'

import React, { useState } from 'react'
import { User, Users, UsersRound, ShoppingBag, Check, SlidersHorizontal, Sparkles, Plus } from 'lucide-react'
import { MenuItemData, PortionData } from '@/lib/data'
import { useStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

interface DishCardProps {
  item: MenuItemData
}

export default function DishCard({ item }: DishCardProps) {
  const { addToCart, openCustomizer } = useStore()
  
  // Find default portion or first portion
  const defaultPortion = item.portions.find((p) => p.isDefault) || item.portions[0]
  const [selectedPortion, setSelectedPortion] = useState<PortionData>(defaultPortion)
  const [isPriceBumping, setIsPriceBumping] = useState(false)
  const [added, setAdded] = useState(false)

  const handlePortionSelect = (portion: PortionData) => {
    setSelectedPortion(portion)
    setIsPriceBumping(true)
    setTimeout(() => setIsPriceBumping(false), 200)
  }

  const handleAddToCart = () => {
    addToCart(item, selectedPortion, { quantity: 1 })
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  // Helper for portion icon
  const getPortionIcon = (serves: string, label: string) => {
    if (label.includes('1:1') || serves.includes('1 Person') || label.includes('1/4') || label.includes('250ml') || label.includes('6 Pcs')) {
      return <User className="w-3 h-3" />
    }
    if (label.includes('1:2') || serves.includes('2 Person') || label.includes('1/2') || label.includes('500ml')) {
      return <Users className="w-3 h-3" />
    }
    return <UsersRound className="w-3 h-3" />
  }

  const hasCustomizer = item.spiceOptions || (item.addons && item.addons.length > 0)

  return (
    <article
      className="group relative bg-white rounded-3xl overflow-hidden border border-neutral-100/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
      data-dish={item.name}
    >
      {/* Top Image Stage with Glass Badges */}
      <div className="h-48 sm:h-52 overflow-hidden relative bg-neutral-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Soft Bottom Image Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

        {/* Floating Minimalist Tag Badge */}
        {item.tag && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md border border-white/20 ${
              item.tag.includes('Bestseller')
                ? 'bg-brand-red/90 text-white'
                : item.tag.includes('Extra Meat')
                ? 'bg-amber-600/90 text-white'
                : item.tag.includes('Mustard')
                ? 'bg-neutral-900/80 text-white'
                : 'bg-emerald-700/90 text-white'
            }`}
          >
            {item.tag}
          </span>
        )}

        {/* Customizer Pill / Icon Overlay */}
        {hasCustomizer && (
          <button
            onClick={() => openCustomizer(item)}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-neutral-800 p-2 rounded-full shadow-sm backdrop-blur-md border border-white/50 transition-all hover:scale-110 active:scale-95 flex items-center gap-1 text-[10px] font-bold"
            title="Customize Spice Level & Add-ons"
            type="button"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-brand-red" />
          </button>
        )}
      </div>

      {/* Card Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Bengali Tag */}
          <div>
            <h3 className="font-display font-bold text-base sm:text-[17px] text-neutral-900 group-hover:text-brand-red transition-colors leading-snug">
              {item.name}
            </h3>
            {item.nameBn && (
              <span className="block text-[11px] font-medium text-neutral-400 font-bangla mt-0.5">
                {item.nameBn}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mt-2">
            {item.description}
          </p>

          {/* Minimalist Segmented Portion Selector */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-[11px] text-neutral-400 font-medium mb-1.5 px-0.5">
              <span>Select Portion</span>
              <span className="text-neutral-600 font-bold">{selectedPortion.serves}</span>
            </div>

            <div
              className={`bg-neutral-50 p-1 rounded-2xl border border-neutral-200/70 grid gap-1 ${
                item.portions.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
              }`}
            >
              {item.portions.map((portion) => {
                const isSelected = selectedPortion.label === portion.label
                return (
                  <button
                    key={portion.label}
                    onClick={() => handlePortionSelect(portion)}
                    type="button"
                    className={`py-2 px-1 rounded-xl text-center transition-all duration-200 flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-white text-neutral-900 font-bold shadow-xs border border-neutral-200/90'
                        : 'text-neutral-500 hover:text-neutral-900 hover:bg-white/60 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-[11px] leading-none mb-0.5">
                      <span className={isSelected ? 'text-brand-red' : 'text-neutral-400'}>
                        {getPortionIcon(portion.serves, portion.label)}
                      </span>
                      <span>{portion.label}</span>
                    </div>
                    <span
                      className={`text-xs font-extrabold ${
                        isSelected ? 'text-brand-red' : 'text-neutral-600'
                      }`}
                    >
                      ৳{portion.price}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Pricing & Action Bar */}
        <div className="mt-5 pt-3.5 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider block">Total Price</span>
            <div className="flex items-baseline gap-1">
              <span
                className={`font-display font-black text-lg sm:text-xl text-neutral-900 transition-transform duration-200 ${
                  isPriceBumping ? 'scale-110 text-brand-red' : ''
                }`}
              >
                ৳{selectedPortion.price}
              </span>
              <span className="text-[10px] text-neutral-400 font-normal">/ {selectedPortion.label}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {hasCustomizer && (
              <button
                onClick={() => openCustomizer(item)}
                className="p-2.5 rounded-2xl bg-neutral-50 hover:bg-neutral-100 text-neutral-600 hover:text-brand-red border border-neutral-200/80 transition active:scale-95"
                title="Customize spice level and extra toppings"
                type="button"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleAddToCart}
              className={`text-xs font-bold py-2.5 px-4 rounded-2xl transition-all duration-200 shadow-sm flex items-center gap-1.5 active:scale-95 ${
                added
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                  : 'bg-brand-red hover:bg-brand-darkred text-white shadow-brand-red/20 hover:shadow-md'
              }`}
              type="button"
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3] animate-bounce" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Tray</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
