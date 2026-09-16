'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  ShoppingBag,
  Bike,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react'
import { useStore } from '@/lib/store'
import { INITIAL_COUPONS } from '@/lib/data'
import { formatPrice } from '@/lib/utils'

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    setCheckoutOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscountAmount,
    getDeliveryFee,
    getTotal,
    fulfillmentMode,
    selectedBranch,
    showToast,
  } = useStore()

  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState('')

  const subtotal = getSubtotal()
  const discount = getDiscountAmount()
  const deliveryFee = getDeliveryFee()
  const total = getTotal()

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    setCouponError('')
    const cleanCode = couponInput.trim().toUpperCase()

    if (!cleanCode) return

    const found = INITIAL_COUPONS.find((c) => c.code === cleanCode && c.isActive)
    if (!found) {
      setCouponError('Invalid or expired coupon code')
      showToast('Invalid Coupon', 'Please check your promo code', 'error')
      return
    }

    if (subtotal < found.minOrder) {
      setCouponError(`Minimum order amount is ৳${found.minOrder} for this code`)
      showToast('Min Order Required', `Order at least ৳${found.minOrder} for this coupon`, 'info')
      return
    }

    applyCoupon({
      code: found.code,
      discount: found.discount,
      type: found.type as 'fixed' | 'percent',
    })
    setCouponInput('')
    showToast('Promo Code Applied!', `Coupon ${found.code} discount added!`)
  }

  const handleProceedCheckout = () => {
    setCartOpen(false)
    setCheckoutOpen(true)
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[120] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative z-10 w-full max-w-md h-full bg-white shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4 bg-brand-cream/80">
              <div className="flex items-center space-x-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red text-white shadow-sm">
                  <UtensilsCrossed className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-brand-dark">Your Feast Tray</h3>
                  <p className="text-[11px] text-neutral-500 font-medium">
                    {cart.length} unique items • {fulfillmentMode === 'delivery' ? 'Delivery' : 'Takeaway'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCartOpen(false)}
                className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {cart.length > 0 ? (
                <>
                  <div className="space-y-3">
                    {cart.map((item) => {
                      const lineTotal = item.unitPrice * item.quantity
                      return (
                        <div
                          key={item.cartItemId}
                          className="flex items-start gap-3 p-3.5 rounded-2xl border border-neutral-100 bg-neutral-50/50 hover:bg-neutral-50 transition"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-contain p-1 shrink-0 bg-neutral-100/90 border border-neutral-200/80 filter drop-shadow-sm"
                          />

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="font-bold text-xs sm:text-sm text-brand-dark leading-tight truncate">
                                {item.name}
                              </h4>
                              <button
                                onClick={() => removeFromCart(item.cartItemId)}
                                className="text-neutral-400 hover:text-brand-red transition p-0.5"
                                title="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5 mt-1">
                              <span className="bg-brand-gold/20 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded">
                                {item.portion.label} ({item.portion.serves})
                              </span>
                              {item.spiceLevel && (
                                <span className="bg-red-100 text-brand-red text-[10px] font-bold px-1.5 py-0.5 rounded">
                                  {item.spiceLevel}
                                </span>
                              )}
                            </div>

                            {item.addons && item.addons.length > 0 && (
                              <p className="text-[10px] text-neutral-500 mt-1 truncate">
                                + {item.addons.map((a) => a.name).join(', ')}
                              </p>
                            )}

                            {item.instructions && (
                              <p className="text-[10px] italic text-neutral-500 mt-0.5 truncate">
                                Note: &ldquo;{item.instructions}&rdquo;
                              </p>
                            )}

                            <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-neutral-200/60">
                              {/* Quantity Modifier */}
                              <div className="flex items-center border border-neutral-300 rounded-lg bg-white">
                                <button
                                  onClick={() => updateQuantity(item.cartItemId, -1)}
                                  className="p-1 text-neutral-600 hover:text-brand-dark"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-6 text-center text-xs font-black text-brand-dark">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.cartItemId, 1)}
                                  className="p-1 text-neutral-600 hover:text-brand-dark"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="font-black text-xs sm:text-sm text-brand-red">
                                {formatPrice(lineTotal, true)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Clear cart trigger */}
                  <div className="text-right pt-1">
                    <button
                      onClick={clearCart}
                      className="text-[11px] text-neutral-400 hover:text-brand-red underline transition"
                    >
                      Empty entire tray
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto text-brand-red mb-3">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-extrabold text-base text-brand-dark">Your Tray is Empty</h4>
                  <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                    Add our mouth-watering Flame-Grilled Chicken or Royal Dum Kacchi to get started!
                  </p>
                  <a
                    href="#portion-section"
                    onClick={() => setCartOpen(false)}
                    className="inline-block mt-4 bg-brand-red hover:bg-brand-darkred text-white text-xs font-bold px-6 py-2.5 rounded-full transition shadow-sm"
                  >
                    Browse Menu
                  </a>
                </div>
              )}
            </div>

            {/* Bill Summary & Checkout (Only if cart is not empty) */}
            {cart.length > 0 && (
              <div className="border-t border-neutral-200 bg-brand-cream/60 p-5 sm:p-6 space-y-4">
                {/* Coupon Input */}
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs">
                    <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Coupon: {appliedCoupon.code}</span>
                      <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded">
                        -৳{discount}
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-700 hover:text-emerald-900 font-bold text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Voucher code (e.g. FEAST100)"
                        className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white font-semibold uppercase focus:outline-none focus:border-brand-red"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-brand-dark hover:bg-neutral-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-brand-dark">{formatPrice(subtotal, true)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Promo Discount</span>
                      <span>-{formatPrice(discount, true)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      <Bike className="w-3 h-3 text-brand-red" />
                      Delivery ({selectedBranch.area})
                    </span>
                    <span className="font-bold text-brand-dark">
                      {deliveryFee === 0 ? 'FREE (Takeaway)' : formatPrice(deliveryFee, true)}
                    </span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-neutral-200 text-sm sm:text-base font-black text-brand-dark">
                    <span>Total Amount</span>
                    <span className="text-brand-red text-lg">{formatPrice(total, true)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={handleProceedCheckout}
                  className="w-full cta-shimmer bg-brand-red hover:bg-brand-darkred text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg transition-all transform active:scale-95 flex items-center justify-between px-5"
                >
                  <span>Proceed to Checkout</span>
                  <div className="flex items-center space-x-1">
                    <span>{formatPrice(total, true)}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
