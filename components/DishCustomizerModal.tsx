'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Flame, Plus, Minus, Check } from 'lucide-react'
import { useStore } from '@/lib/store'
import { PortionData } from '@/lib/data'
import { formatPrice } from '@/lib/utils'

export default function DishCustomizerModal() {
  const {
    isCustomizerOpen,
    customizerItem,
    closeCustomizer,
    addToCart,
    showToast,
  } = useStore()

  const [selectedPortion, setSelectedPortion] = useState<PortionData | null>(null)
  const [selectedSpice, setSelectedSpice] = useState<string>('')
  const [selectedAddons, setSelectedAddons] = useState<{ name: string; price: number }[]>([])
  const [quantity, setQuantity] = useState(1)
  const [instructions, setInstructions] = useState('')

  useEffect(() => {
    if (customizerItem) {
      const def =
        customizerItem.portions.find((p) => p.isDefault) ||
        customizerItem.portions[0]
      setSelectedPortion(def)
      setSelectedSpice(
        customizerItem.spiceOptions ? customizerItem.spiceOptions[0] : ''
      )
      setSelectedAddons([])
      setQuantity(1)
      setInstructions('')
    }
  }, [customizerItem])

  if (!customizerItem || !selectedPortion) return null

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0)
  const unitPrice = selectedPortion.price + addonsTotal
  const totalPrice = unitPrice * quantity

  const handleAddonToggle = (addon: { name: string; price: number }) => {
    if (selectedAddons.some((a) => a.name === addon.name)) {
      setSelectedAddons(selectedAddons.filter((a) => a.name !== addon.name))
    } else {
      setSelectedAddons([...selectedAddons, addon])
    }
  }

  const handleConfirm = () => {
    addToCart(customizerItem, selectedPortion, {
      quantity,
      spiceLevel: selectedSpice || undefined,
      addons: selectedAddons.length > 0 ? selectedAddons : undefined,
      instructions: instructions.trim() || undefined,
    })

    showToast(
      'Custom Dish Added',
      `${customizerItem.name} (${selectedPortion.label}) customized and added to tray.`
    )
    closeCustomizer()
  }

  return (
    <AnimatePresence>
      {isCustomizerOpen && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCustomizer}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/80">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-200/80 p-1 flex items-center justify-center shrink-0">
                  <img
                    src={customizerItem.image}
                    alt={customizerItem.name}
                    className="w-full h-full object-contain filter drop-shadow-xs"
                  />
                </div>
                <div>
                  <h3 className="font-display font-black text-sm sm:text-base text-neutral-900 leading-tight">
                    {customizerItem.name}
                  </h3>
                  <p className="text-[11px] text-neutral-500 font-medium mt-0.5">
                    Customize your portion, spices &amp; extra toppings
                  </p>
                </div>
              </div>

              <button
                onClick={closeCustomizer}
                className="p-1.5 rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {/* Step 1: Portion Selection */}
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-brand-dark flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-white text-[10px]">
                    1
                  </span>
                  Choose Serving Size
                </label>
                <div className="grid grid-cols-3 gap-2.5 mt-3">
                  {customizerItem.portions.map((p) => {
                    const isSelected = selectedPortion.label === p.label
                    return (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => setSelectedPortion(p)}
                        className={`p-3 rounded-2xl border text-center transition-all ${
                          isSelected
                            ? 'border-brand-red bg-red-50 text-brand-red font-bold shadow-sm'
                            : 'border-neutral-200 hover:border-neutral-300 text-slate-700'
                        }`}
                      >
                        <span className="block text-xs font-black">{p.label}</span>
                        <span className="block text-[10px] text-neutral-500 mt-0.5">{p.serves}</span>
                        <span className="block text-xs font-extrabold text-brand-red mt-1">
                          {formatPrice(p.price, true)}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Step 2: Spice Level */}
              {customizerItem.spiceOptions && customizerItem.spiceOptions.length > 0 && (
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-brand-dark flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-white text-[10px]">
                      2
                    </span>
                    Select Peri Spice Level
                  </label>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {customizerItem.spiceOptions.map((spice) => {
                      const isSelected = selectedSpice === spice
                      return (
                        <button
                          key={spice}
                          type="button"
                          onClick={() => setSelectedSpice(spice)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-bold transition flex items-center justify-between ${
                            isSelected
                              ? 'border-brand-red bg-red-50 text-brand-red shadow-sm'
                              : 'border-neutral-200 hover:border-neutral-300 text-slate-700'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <Flame className={`w-3.5 h-3.5 ${isSelected ? 'text-brand-red' : 'text-amber-500'}`} />
                            {spice}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-brand-red shrink-0" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Add-ons */}
              {customizerItem.addons && customizerItem.addons.length > 0 && (
                <div>
                  <label className="text-xs font-black uppercase tracking-wider text-brand-dark flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-white text-[10px]">
                      3
                    </span>
                    Extra Sides &amp; Dips (Optional)
                  </label>
                  <div className="space-y-2 mt-3">
                    {customizerItem.addons.map((addon) => {
                      const isChecked = selectedAddons.some((a) => a.name === addon.name)
                      return (
                        <div
                          key={addon.name}
                          onClick={() => handleAddonToggle(addon)}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                            isChecked
                              ? 'border-brand-red bg-red-50/50'
                              : 'border-neutral-200 hover:border-neutral-300'
                          }`}
                        >
                          <span className="text-xs font-semibold text-brand-dark">{addon.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-brand-red">
                              +{formatPrice(addon.price, true)}
                            </span>
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center border ${
                                isChecked
                                  ? 'bg-brand-red border-brand-red text-white'
                                  : 'border-neutral-300'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Special Instructions */}
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-brand-dark block mb-2">
                  Special Kitchen Note (Optional)
                </label>
                <input
                  type="text"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Less spicy, extra salad lemon, leave gravy on side"
                  className="w-full text-xs rounded-xl border border-neutral-300 px-3.5 py-2.5 focus:border-brand-red focus:outline-none"
                />
              </div>
            </div>

            {/* Footer with Quantity & Add Button */}
            <div className="border-t border-neutral-100 p-4 sm:p-5 bg-neutral-50 flex items-center justify-between gap-4">
              {/* Quantity Controls */}
              <div className="flex items-center border border-neutral-300 rounded-2xl bg-white p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-neutral-600 hover:text-brand-dark disabled:opacity-40"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-xs font-black text-brand-dark">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-neutral-600 hover:text-brand-dark"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirm}
                className="flex-1 cta-shimmer bg-brand-red hover:bg-brand-darkred text-white font-extrabold text-xs sm:text-sm py-3 px-5 rounded-2xl shadow-lg transition-all transform active:scale-95 flex items-center justify-between"
              >
                <span>Add To Feast</span>
                <span>{formatPrice(totalPrice, true)}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
