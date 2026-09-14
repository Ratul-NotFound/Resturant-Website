'use client'

import React, { useState } from 'react'
import { User, Users, UsersRound, ShoppingCart, Check, SlidersHorizontal, Sparkles } from 'lucide-react'
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
    setTimeout(() => setIsPriceBumping(false), 220)
  }

  const handleAddToCart = () => {
    // If item has spice options and hasn't been customized, we can still add directly with default, or user can click customize
    addToCart(item, selectedPortion, { quantity: 1 })
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  // Get portion icon
  const getPortionIcon = (serves: string, label: string) => {
    if (label.includes('1:1') || serves.includes('1 Person') || label.includes('1/4') || label.includes('250ml') || label.includes('6 Pcs')) {
      return <User className="w-3.5 h-3.5" />
    }
    if (label.includes('1:2') || serves.includes('2 Person') || label.includes('1/2') || label.includes('500ml')) {
      return <Users className="w-3.5 h-3.5" />
    }
    return <UsersRound className="w-3.5 h-3.5" />
  }

  return (
    <article
      className="portion-dish-card bg-white rounded-3xl overflow-hidden shadow-custom-card border border-neutral-100 flex flex-col hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group"
      data-dish={item.name}
    >
      {/* Dish Image Stage */}
      <div className="h-48 sm:h-52 overflow-hidden relative bg-neutral-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Tag Pill */}
        {item.tag && (
          <span
            className={`absolute top-3 left-3 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-sm ${
              item.tag.includes('Bestseller')
                ? 'bg-brand-red'
                : item.tag.includes('Extra Meat')
                ? 'bg-amber-500'
                : item.tag.includes('Mustard')
                ? 'bg-neutral-800'
                : 'bg-emerald-600'
            }`}
          >
            {item.tag}
          </span>
        )}

        {/* Customize button overlay */}
        {(item.spiceOptions || (item.addons && item.addons.length > 0)) && (
          <button
            onClick={() => openCustomizer(item)}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-brand-dark p-1.5 rounded-full shadow-md backdrop-blur transition-transform hover:scale-110"
            title="Customize Spice & Addons"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-brand-red" />
          </button>
        )}
      </div>

      {/* Dish Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display font-extrabold text-base sm:text-lg text-brand-dark text-center group-hover:text-brand-red transition-colors leading-tight">
            {item.name}
            {item.nameBn && (
              <span className="block text-xs font-semibold text-neutral-500 font-bangla mt-0.5">
                {item.nameBn}
              </span>
            )}
          </h3>

          <p className="text-[11px] sm:text-xs text-neutral-500 text-center mt-1.5 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Portion Sizing Selectors */}
          <div
            className={`grid gap-1.5 sm:gap-2 mt-4 text-center border-t border-b border-neutral-100 py-3 portion-selector ${
              item.portions.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
            }`}
          >
            {item.portions.map((portion) => {
              const isSelected = selectedPortion.label === portion.label
              return (
                <div
                  key={portion.label}
                  onClick={() => handlePortionSelect(portion)}
                  className={`portion-btn cursor-pointer p-1.5 rounded-xl transition-all duration-200 border ${
                    isSelected
                      ? 'is-selected bg-red-50/90 border-red-300 shadow-sm'
                      : 'border-transparent hover:bg-red-50/40 hover:border-red-100'
                  }`}
                >
                  <div
                    className={`portion-icon mb-1 flex justify-center transition-colors ${
                      isSelected ? 'text-brand-red' : 'text-neutral-500'
                    }`}
                  >
                    {getPortionIcon(portion.serves, portion.label)}
                  </div>
                  <span
                    className={`portion-ratio block text-[11px] leading-tight ${
                      isSelected ? 'font-bold text-neutral-800' : 'font-semibold text-neutral-500'
                    }`}
                  >
                    {portion.label}
                  </span>
                  <span
                    className={`portion-price block text-xs font-black text-brand-red mt-0.5 transition-transform duration-200 ${
                      isSelected && isPriceBumping ? 'scale-125 text-brand-dark' : ''
                    }`}
                  >
                    {formatPrice(portion.price, true)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex items-center space-x-2">
          {(item.spiceOptions || (item.addons && item.addons.length > 0)) && (
            <button
              onClick={() => openCustomizer(item)}
              className="p-2.5 rounded-xl border border-neutral-200 text-neutral-600 hover:text-brand-red hover:bg-neutral-50 transition active:scale-95"
              title="Customize Spice & Extras"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handleAddToCart}
            className={`flex-1 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center space-x-1.5 active:scale-95 ${
              added
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-brand-red hover:bg-brand-darkred'
            }`}
            type="button"
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3] animate-bounce" />
                <span>✓ যোগ হয়েছে (Added)</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>অর্ডার করুন (Add to Cart)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
