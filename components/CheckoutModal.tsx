'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  CreditCard,
  Banknote,
  Bike,
  ShoppingBag,
  CheckCircle2,
  Phone,
  User,
  MapPin,
  Clock,
  Loader2,
} from 'lucide-react'
import { useStore } from '@/lib/store'
import { formatPrice, generateOrderNumber } from '@/lib/utils'
import confetti from 'canvas-confetti'
import Link from 'next/link'

export default function CheckoutModal() {
  const {
    cart,
    isCheckoutOpen,
    setCheckoutOpen,
    clearCart,
    fulfillmentMode,
    selectedBranch,
    getSubtotal,
    getDiscountAmount,
    getDeliveryFee,
    getTotal,
    showToast,
  } = useStore()

  const subtotal = getSubtotal()
  const discount = getDiscountAmount()
  const deliveryFee = getDeliveryFee()
  const total = getTotal()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'BKASH' | 'NAGAD' | 'CARD'>('COD')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!name.trim()) {
      setErrorMsg('Please enter your full name')
      return
    }
    if (!phone.trim() || phone.trim().length < 11) {
      setErrorMsg('Please enter a valid 11-digit mobile number')
      return
    }
    if (fulfillmentMode === 'delivery' && !address.trim()) {
      setErrorMsg('Please enter your complete delivery address')
      return
    }

    setIsSubmitting(true)

    try {
      const orderNumber = generateOrderNumber()

      const orderPayload = {
        orderNumber,
        customerName: name.trim(),
        customerPhone: phone.trim(),
        deliveryAddress: fulfillmentMode === 'delivery' ? address.trim() : 'Takeaway at ' + selectedBranch?.name,
        branchId: selectedBranch?.id || 'dhanmondi',
        branchName: selectedBranch?.name || 'Dhanmondi Flagship Outlet',
        fulfillmentType: fulfillmentMode,
        subtotal,
        deliveryFee,
        discount,
        total,
        paymentMethod,
        notes: notes.trim() || undefined,
        items: cart.map((c) => ({
          name: c.name,
          portion: c.portion.label,
          quantity: c.quantity,
          unitPrice: c.unitPrice,
          totalPrice: c.unitPrice * c.quantity,
          spiceLevel: c.spiceLevel,
          addons: c.addons?.map((a) => a.name).join(', '),
        })),
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to place order')
      }

      // Success
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      })

      setConfirmedOrder(data.order)
      clearCart()
      showToast('Order Placed!', `Order #${data.order.orderNumber} is on the flame!`)
    } catch (err: any) {
      console.error(err)
      setErrorMsg(err.message || 'Something went wrong while placing your order.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setConfirmedOrder(null)
    setCheckoutOpen(false)
  }

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative z-10 w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden max-h-[92vh] flex flex-col"
          >
            {confirmedOrder ? (
              /* Success confirmation view */
              <div className="p-6 sm:p-8 text-center space-y-5 overflow-y-auto">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                    Order Confirmed
                  </span>
                  <h3 className="font-display text-2xl font-black text-neutral-900 mt-2">
                    Feast Is On The Flame!
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                    Your delicious meal is sent to our kitchen. You will receive an SMS confirmation.
                  </p>
                </div>

                {/* Summary Pill Box */}
                <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/80 text-left text-xs space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                    <span className="text-neutral-500 font-semibold">Order Number:</span>
                    <span className="font-black text-brand-red text-sm">{confirmedOrder.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Customer:</span>
                    <span className="font-bold text-neutral-800">{confirmedOrder.customerName} ({confirmedOrder.customerPhone})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Fulfillment:</span>
                    <span className="font-bold text-neutral-800 uppercase text-[11px]">{confirmedOrder.fulfillmentType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Branch Outlet:</span>
                    <span className="font-bold text-neutral-800">{confirmedOrder.branchName}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-neutral-200">
                    <span className="font-bold text-neutral-800">Total Bill:</span>
                    <span className="font-black text-brand-red">{formatPrice(confirmedOrder.total, true)}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
                  <Link
                    href={`/track/${confirmedOrder.orderNumber}`}
                    onClick={handleClose}
                    className="cta-shimmer bg-brand-red hover:bg-brand-darkred text-white text-xs font-bold py-3 px-6 rounded-xl shadow-md transition text-center"
                  >
                    Track Live Cooking &amp; Delivery
                  </Link>
                  <button
                    onClick={handleClose}
                    className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold py-3 px-5 rounded-xl transition"
                  >
                    Back to Menu
                  </button>
                </div>
              </div>
            ) : (
              /* Checkout Form View */
              <>
                <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/80">
                  <div>
                    <h3 className="font-display font-black text-base text-neutral-900">
                      Finalize Your Order
                    </h3>
                    <p className="text-[11px] text-neutral-500">
                      Estimated cooking &amp; dispatch: 25-35 minutes
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-1.5 rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handlePlaceOrder} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
                  {errorMsg && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-xl text-xs font-semibold">
                      {errorMsg}
                    </div>
                  )}

                  {/* Section 1: Contact Details */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-brand-red" />
                      <span>Contact Information</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-neutral-600 block mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Tanvir Hossain"
                          className="w-full text-xs rounded-xl border border-neutral-200 p-2.5 focus:border-brand-red focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-neutral-600 block mb-1">Mobile Number *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="017XXXXXXXX"
                          className="w-full text-xs rounded-xl border border-neutral-200 p-2.5 focus:border-brand-red focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Delivery Address / Takeaway note */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-red" />
                      <span>Fulfillment &amp; Location</span>
                    </h4>

                    {fulfillmentMode === 'delivery' ? (
                      <div>
                        <label className="text-[11px] font-bold text-neutral-600 block mb-1">
                          Complete Delivery Address *
                        </label>
                        <textarea
                          required
                          rows={2}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="House, Road, Flat No, Landmark (e.g. Dhanmondi 27)"
                          className="w-full text-xs rounded-xl border border-neutral-200 p-2.5 focus:border-brand-red focus:outline-none"
                        />
                      </div>
                    ) : (
                      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3 text-xs text-amber-900 space-y-1">
                        <p className="font-bold flex items-center gap-1.5">
                          <ShoppingBag className="w-3.5 h-3.5 text-amber-700" />
                          <span>Branch Pickup Selected</span>
                        </p>
                        <p className="text-[11px] text-neutral-600">{selectedBranch?.name} ({selectedBranch?.address})</p>
                        <p className="text-[11px] text-emerald-700 font-bold mt-1">Ready for pickup in 25-30 mins</p>
                      </div>
                    )}

                    <div>
                      <label className="text-[11px] font-bold text-neutral-600 block mb-1">
                        Kitchen / Delivery Note (Optional)
                      </label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. Call before ringing bell, extra mint dip"
                        className="w-full text-xs rounded-xl border border-neutral-200 p-2.5 focus:border-brand-red focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Section 3: Payment Method */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-brand-red" />
                      <span>Payment Method</span>
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'COD', label: 'Cash On Delivery', icon: Banknote },
                        { id: 'BKASH', label: 'bKash Online', icon: Phone },
                        { id: 'NAGAD', label: 'Nagad Pay', icon: Phone },
                        { id: 'CARD', label: 'Debit / Card', icon: CreditCard },
                      ].map((pm) => {
                        const isSelected = paymentMethod === pm.id
                        const Icon = pm.icon
                        return (
                          <button
                            key={pm.id}
                            type="button"
                            onClick={() => setPaymentMethod(pm.id as any)}
                            className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                              isSelected
                                ? 'border-brand-red bg-red-50 text-brand-red font-bold shadow-xs'
                                : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-[10px] font-bold leading-tight">{pm.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Order Total Breakdown */}
                  <div className="bg-neutral-50 rounded-2xl p-3.5 border border-neutral-100 text-xs space-y-1.5">
                    <div className="flex justify-between text-neutral-500">
                      <span>Food Subtotal ({cart.length} items):</span>
                      <span className="font-bold text-neutral-800">{formatPrice(subtotal, true)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-bold">
                        <span>Voucher Discount:</span>
                        <span>-{formatPrice(discount, true)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-neutral-500">
                      <span>Delivery Service Fee:</span>
                      <span className="font-bold text-neutral-800">
                        {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee, true)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-neutral-900 pt-2 border-t border-neutral-200">
                      <span>Grand Total:</span>
                      <span className="text-brand-red text-base">{formatPrice(total, true)}</span>
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full cta-shimmer bg-brand-red hover:bg-brand-darkred disabled:bg-neutral-400 text-white font-black text-xs sm:text-sm py-4 rounded-2xl shadow-xl transition-all transform active:scale-95 flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Dispatching Order to Kitchen...</span>
                        </>
                      ) : (
                        <span>Confirm &amp; Place Order ({formatPrice(total, true)})</span>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
