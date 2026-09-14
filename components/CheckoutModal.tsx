'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  MapPin,
  Phone,
  User,
  CreditCard,
  Banknote,
  Bike,
  ShoppingBag,
  CheckCircle,
  Loader2,
  Sparkles,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { useStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

export default function CheckoutModal() {
  const router = useRouter()
  const {
    cart,
    isCheckoutOpen,
    setCheckoutOpen,
    fulfillmentMode,
    selectedBranch,
    appliedCoupon,
    getSubtotal,
    getDiscountAmount,
    getDeliveryFee,
    getTotal,
    clearCart,
    showToast,
  } = useStore()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'BKASH' | 'NAGAD' | 'CARD'>('COD')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const subtotal = getSubtotal()
  const discount = getDiscountAmount()
  const deliveryFee = getDeliveryFee()
  const total = getTotal()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!name.trim()) {
      setErrorMessage('Please enter your full name')
      return
    }

    if (!phone.trim() || phone.trim().length < 11) {
      setErrorMessage('Please enter a valid 11-digit Bangladeshi mobile number (017XXXXXXXX)')
      return
    }

    if (fulfillmentMode === 'delivery' && !address.trim()) {
      setErrorMessage('Please provide your complete delivery street address')
      return
    }

    setIsSubmitting(true)

    try {
      const payload = {
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim() || undefined,
        deliveryAddress: fulfillmentMode === 'delivery' ? address.trim() : `Pickup at ${selectedBranch.name}`,
        branchName: selectedBranch.name,
        fulfillmentType: fulfillmentMode,
        subtotal,
        deliveryFee,
        discount,
        total,
        paymentMethod,
        notes: notes.trim() || undefined,
        items: cart.map((item) => ({
          menuItemId: item.id,
          name: item.name,
          portion: item.portion.label,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.unitPrice * item.quantity,
          spiceLevel: item.spiceLevel,
          addons: item.addons?.map((a) => a.name).join(', '),
        })),
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to place order')
      }

      // Celebrate with confetti 🎉
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      })

      showToast('Order Placed Successfully!', `Order #${data.order.orderNumber} is on the way!`)
      clearCart()
      setCheckoutOpen(false)

      // Redirect to live order tracking page
      router.push(`/track/${data.order.orderNumber}`)
    } catch (err: any) {
      console.error(err)
      setErrorMessage(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCheckoutOpen(false)}
            className="fixed inset-0 bg-black/65 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            className="relative z-10 w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-neutral-100 flex flex-col my-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4 bg-brand-cream/80 sticky top-0 z-20 backdrop-blur-md">
              <div>
                <h3 className="text-lg font-black text-brand-dark">Complete Your Order</h3>
                <p className="text-xs text-neutral-500">
                  {fulfillmentMode === 'delivery' ? 'Home / Office Delivery' : 'Pickup Takeaway'} • {selectedBranch.area}
                </p>
              </div>

              <button
                onClick={() => setCheckoutOpen(false)}
                className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              {/* Section 1: Customer Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-brand-dark flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-brand-red" />
                  1. Contact Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tanvir Ahmed"
                      className="w-full text-xs rounded-xl border border-neutral-300 p-2.5 focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full text-xs rounded-xl border border-neutral-300 p-2.5 focus:border-brand-red focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">
                    Email Address (For Invoice receipt, optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="youremail@gmail.com"
                    className="w-full text-xs rounded-xl border border-neutral-300 p-2.5 focus:border-brand-red focus:outline-none"
                  />
                </div>
              </div>

              {/* Section 2: Address / Fulfillment */}
              <div className="space-y-3 pt-2 border-t border-neutral-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-brand-dark flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-red" />
                  2. {fulfillmentMode === 'delivery' ? 'Delivery Address' : 'Pickup Outlet'}
                </h4>

                {fulfillmentMode === 'delivery' ? (
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">
                      Detailed Street Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Flat 4B, House 12, Road 7, Dhanmondi, Dhaka"
                      className="w-full text-xs rounded-xl border border-neutral-300 p-2.5 focus:border-brand-red focus:outline-none"
                    />
                  </div>
                ) : (
                  <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200">
                    <p className="text-xs font-bold text-brand-dark">{selectedBranch.name}</p>
                    <p className="text-[11px] text-neutral-600 mt-0.5">{selectedBranch.address}</p>
                    <p className="text-[11px] text-emerald-700 font-bold mt-1">Ready for pickup in 25-30 mins</p>
                  </div>
                )}

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">
                    Rider Delivery Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Call when outside gate, leave at door"
                    className="w-full text-xs rounded-xl border border-neutral-300 p-2.5 focus:border-brand-red focus:outline-none"
                  />
                </div>
              </div>

              {/* Section 3: Payment Method */}
              <div className="space-y-3 pt-2 border-t border-neutral-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-brand-dark flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-brand-red" />
                  3. Payment Method
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center space-y-1 ${
                      paymentMethod === 'COD'
                        ? 'border-brand-red bg-red-50 text-brand-red font-bold shadow-sm'
                        : 'border-neutral-200 hover:border-neutral-300 text-slate-700'
                    }`}
                  >
                    <Banknote className="w-5 h-5" />
                    <span className="text-xs">Cash on Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('BKASH')}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center space-y-1 ${
                      paymentMethod === 'BKASH'
                        ? 'border-[#E2136E] bg-[#E2136E]/10 text-[#E2136E] font-bold shadow-sm'
                        : 'border-neutral-200 hover:border-neutral-300 text-slate-700'
                    }`}
                  >
                    <span className="font-black text-sm text-[#E2136E]">bKash</span>
                    <span className="text-[10px] text-neutral-500">Instant</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('NAGAD')}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center space-y-1 ${
                      paymentMethod === 'NAGAD'
                        ? 'border-[#F7941D] bg-[#F7941D]/10 text-[#F7941D] font-bold shadow-sm'
                        : 'border-neutral-200 hover:border-neutral-300 text-slate-700'
                    }`}
                  >
                    <span className="font-black text-sm text-[#F7941D]">Nagad</span>
                    <span className="text-[10px] text-neutral-500">Instant</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CARD')}
                    className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center space-y-1 ${
                      paymentMethod === 'CARD'
                        ? 'border-brand-dark bg-neutral-100 text-brand-dark font-bold shadow-sm'
                        : 'border-neutral-200 hover:border-neutral-300 text-slate-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5" />
                    <span className="text-xs">Debit/Card</span>
                  </button>
                </div>
              </div>

              {/* Order Summary Recap */}
              <div className="p-4 bg-brand-cream/70 rounded-2xl border border-amber-200/60 text-xs space-y-1.5">
                <div className="flex justify-between text-neutral-600">
                  <span>Items ({cart.length})</span>
                  <span>{formatPrice(subtotal, true)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>-{formatPrice(discount, true)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee, true)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-brand-dark pt-1 border-t border-neutral-200">
                  <span>Payable Amount</span>
                  <span className="text-brand-red">{formatPrice(total, true)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full cta-shimmer bg-brand-red hover:bg-brand-darkred disabled:bg-neutral-400 text-white font-black text-sm py-4 rounded-2xl shadow-xl transition-all transform active:scale-95 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Your Feast...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Order • {formatPrice(total, true)}</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
