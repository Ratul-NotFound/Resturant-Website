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
  UtensilsCrossed,
} from 'lucide-react'
import { useStore } from '@/lib/store'
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

    if (cleanCode === 'FEAST100') {
      if (subtotal < 800) {
        setCouponError('Minimum order amount is ৳800 for this code')
        showToast('Min Order Required', 'Order at least ৳800 for this coupon', 'error')
        return
      }
      applyCoupon({
        code: 'FEAST100',
        discount: 100,
        type: 'fixed',
      })
      setCouponInput('')
      showToast('Promo Code Applied!', 'Coupon FEAST100 (৳100 off) applied!')
      return
    }

    if (cleanCode === 'FLAME10') {
      applyCoupon({
        code: 'FLAME10',
        discount: 10,
        type: 'percent',
      })
      setCouponInput('')
      showToast('Promo Code Applied!', 'Coupon FLAME10 (10% off) applied!')
      return
    }

    setCouponError('Invalid or expired coupon code')
    showToast('Invalid Coupon', 'Please try FEAST100 or FLAME10', 'error')
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
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/80">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-red text-white flex items-center justify-center shadow-xs">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-base text-neutral-900 leading-tight">
                    Your Feast Tray
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    {fulfillmentMode === 'delivery' ? (
                      <span className="flex items-center gap-1 font-semibold text-neutral-700">
                        <Bike className="w-3 h-3 text-brand-red" /> Doorstep Delivery ({selectedBranch?.area || 'Dhanmondi'})
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 font-semibold text-neutral-700">
                        <ShoppingBag className="w-3 h-3 text-brand-red" /> Self Takeaway ({selectedBranch?.name || 'Dhanmondi'})
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="p-2 text-neutral-400 hover:text-rose-600 transition"
                    title="Clear Tray"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 divide-y divide-neutral-100">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 text-neutral-400 space-y-3">
                  <div className="w-16 h-16 rounded-3xl bg-neutral-100 flex items-center justify-center text-neutral-300">
                    <UtensilsCrossed className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-800 text-sm">Your tray is currently empty</h4>
                    <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                      Explore our flame-grilled peri chicken and saffron basmati kacchi to build your royal feast.
                    </p>
                  </div>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-2 text-xs font-bold text-brand-red bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition"
                  >
                    Browse Delicious Menu
                  </button>
                </div>
              ) : (
                cart.map((cartItem) => (
                  <div key={cartItem.cartItemId} className="pt-3 first:pt-0 flex items-start justify-between gap-3 group">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <div className="w-14 h-14 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                        <img
                          src={cartItem.image}
                          alt={cartItem.name}
                          className="w-full h-full object-contain filter drop-shadow-xs"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-xs text-neutral-900 truncate leading-tight">
                          {cartItem.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-neutral-500 mt-0.5">
                          <span className="bg-neutral-100 px-1.5 py-0.5 rounded font-semibold text-neutral-700">
                            {cartItem.portion.label}
                          </span>
                          {cartItem.spiceLevel && (
                            <span className="text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded">
                              {cartItem.spiceLevel}
                            </span>
                          )}
                        </div>

                        {cartItem.addons && cartItem.addons.length > 0 && (
                          <p className="text-[10px] text-neutral-400 line-clamp-1 mt-0.5">
                            + {cartItem.addons.map((a) => a.name).join(', ')}
                          </p>
                        )}

                        <p className="text-xs font-black text-brand-red mt-1">
                          {formatPrice(cartItem.unitPrice * cartItem.quantity, true)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex flex-col items-end space-y-1.5 shrink-0">
                      <div className="flex items-center border border-neutral-200 rounded-lg bg-white p-0.5">
                        <button
                          onClick={() => updateQuantity(cartItem.cartItemId, -1)}
                          className="p-1 text-neutral-500 hover:text-neutral-900 rounded"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-neutral-800">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(cartItem.cartItemId, 1)}
                          className="p-1 text-neutral-500 hover:text-neutral-900 rounded"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(cartItem.cartItemId)}
                        className="text-[10px] text-neutral-400 hover:text-rose-600 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout Button */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-neutral-100 bg-neutral-50/90 space-y-3.5">
                {/* Coupon Box */}
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs">
                    <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{appliedCoupon.code} Applied</span>
                      <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded-full font-bold">
                        {appliedCoupon.type === 'percent' ? `${appliedCoupon.discount}%` : formatPrice(appliedCoupon.discount, true)} OFF
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
                      <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Voucher code (e.g. FEAST100)"
                        className="w-full pl-8 pr-3 py-2 bg-white rounded-xl border border-neutral-200 text-xs font-semibold uppercase placeholder:normal-case placeholder:font-normal focus:border-brand-red focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponError && <p className="text-[10px] text-rose-600 font-semibold">{couponError}</p>}

                {/* Subtotals breakdown */}
                <div className="space-y-1.5 text-xs text-neutral-600 pt-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-neutral-900">{formatPrice(subtotal, true)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Voucher Discount</span>
                      <span className="font-bold">-{formatPrice(discount, true)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>{fulfillmentMode === 'delivery' ? 'Delivery Fee' : 'Takeaway Service'}</span>
                    <span className="font-bold text-neutral-900">
                      {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee, true)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm font-black text-neutral-900 pt-2 border-t border-neutral-200">
                    <span>Total Amount</span>
                    <span className="text-base text-brand-red">{formatPrice(total, true)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={handleProceedCheckout}
                  type="button"
                  className="w-full cta-shimmer bg-brand-red hover:bg-brand-darkred text-white py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-between shadow-lg shadow-brand-red/30 transition-all active:scale-95"
                >
                  <span>Proceed to Checkout</span>
                  <div className="flex items-center space-x-1 font-bold">
                    <span>{formatPrice(total, true)}</span>
                    <ArrowRight className="w-4 h-4" />
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
