'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  Package,
  ChefHat,
  Flame,
  Bike,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  ArrowLeft,
  Loader2,
  Receipt,
  Sparkles,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { formatPrice, formatDate } from '@/lib/utils'

interface OrderData {
  id: string
  orderNumber: string
  customerName: string
  customerPhone: string
  deliveryAddress: string
  branchName: string
  fulfillmentType: string
  subtotal: number
  deliveryFee: number
  discount: number
  total: number
  status: 'RECEIVED' | 'PREPARING' | 'ON_FLAME' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED'
  paymentMethod: string
  paymentStatus: string
  notes?: string
  riderName?: string
  riderPhone?: string
  items: {
    id: string
    name: string
    portion: string
    quantity: number
    unitPrice: number
    totalPrice: number
    spiceLevel?: string
    addons?: string
  }[]
  createdAt: string
}

const STAGES = [
  {
    key: 'RECEIVED',
    title: 'Order Confirmed',
    desc: 'Sent to master kitchen',
    icon: Package,
  },
  {
    key: 'PREPARING',
    title: 'Kitchen Prepping',
    desc: '24-hr herb marinade ready',
    icon: ChefHat,
  },
  {
    key: 'ON_FLAME',
    title: 'Sizzling on Open Flame',
    desc: 'Charcoal grill & sealed dum pot',
    icon: Flame,
  },
  {
    key: 'OUT_FOR_DELIVERY',
    title: 'Out For Delivery',
    desc: 'Rider on the road with thermal bag',
    icon: Bike,
  },
  {
    key: 'DELIVERED',
    title: 'Delivered & Feasting',
    desc: 'Enjoy your hot culinary feast!',
    icon: CheckCircle,
  },
]

export default function OrderTrackingPage() {
  const params = useParams()
  const orderId = params?.orderId as string

  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}`)
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Order not found')
      }
      setOrder(data.order)
    } catch (err: any) {
      setError(err.message || 'Failed to load order')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (orderId) {
      fetchOrder()
      // Auto-refresh order status every 10 seconds
      const interval = setInterval(fetchOrder, 10000)
      return () => clearInterval(interval)
    }
  }, [orderId])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-24">
          <div className="text-center space-y-3">
            <Loader2 className="w-10 h-10 text-brand-red animate-spin mx-auto" />
            <p className="text-xs font-bold text-neutral-600">Connecting to Kitchen Feed...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
        <Navbar />
        <div className="flex-1 max-w-md mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8" />
          </div>
          <h2 className="font-display text-2xl font-black text-brand-dark">Order Not Found</h2>
          <p className="text-xs text-neutral-500 mt-1">
            We couldn&apos;t locate order details for &ldquo;{orderId}&rdquo;. Please verify your order number.
          </p>
          <Link
            href="/track"
            className="inline-block mt-6 bg-brand-red text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-brand-darkred transition"
          >
            Search Again
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const getStageIndex = (status: string) => {
    switch (status) {
      case 'RECEIVED':
        return 0
      case 'PREPARING':
        return 1
      case 'ON_FLAME':
        return 2
      case 'OUT_FOR_DELIVERY':
        return 3
      case 'DELIVERED':
        return 4
      default:
        return 0
    }
  }

  const currentStageIdx = getStageIndex(order.status)

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-bold text-neutral-500 hover:text-brand-red transition"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Home
          </Link>
          <span className="text-[11px] text-neutral-400">
            Placed on {formatDate(order.createdAt)}
          </span>
        </div>

        {/* Live Status Stage Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xl overflow-hidden relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
            <div>
              <div className="inline-flex items-center space-x-1.5 bg-red-100 text-brand-red text-xs font-black px-3 py-1 rounded-full mb-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
                <span>Live Kitchen Telemetry</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">
                Order #{order.orderNumber}
              </h1>
              <p className="text-xs text-neutral-500 mt-0.5">
                {order.fulfillmentType === 'delivery' ? 'Home Delivery' : 'Self Pickup'} • {order.branchName}
              </p>
            </div>

            {/* Estimated Time Badge */}
            <div className="bg-brand-dark text-white p-4 rounded-2xl text-center sm:text-right w-full sm:w-auto shadow-md">
              <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest block">
                Estimated Delivery
              </span>
              <span className="text-xl sm:text-2xl font-black block mt-0.5">
                {order.status === 'DELIVERED' ? 'Delivered' : '25 - 35 Mins'}
              </span>
            </div>
          </div>

          {/* 5-Step Animated Tracker Stepper */}
          <div className="py-8">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
              {STAGES.map((stage, idx) => {
                const IconComponent = stage.icon
                const isPassed = idx <= currentStageIdx
                const isCurrent = idx === currentStageIdx

                return (
                  <div
                    key={stage.key}
                    className={`flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2 p-3 sm:p-2 rounded-2xl transition ${
                      isCurrent
                        ? 'bg-red-50/90 border border-brand-red/30 shadow-sm'
                        : isPassed
                        ? 'text-brand-dark opacity-100'
                        : 'text-neutral-400 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-brand-red text-white shadow-lg scale-110'
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-neutral-100 text-neutral-400'
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="sm:mt-1">
                      <h4
                        className={`text-xs font-bold leading-tight ${
                          isCurrent ? 'text-brand-red font-black' : ''
                        }`}
                      >
                        {stage.title}
                      </h4>
                      <p className="text-[10px] text-neutral-500 hidden sm:block mt-0.5 leading-tight">
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Rider Details Bar (if assigned) */}
          <div className="mt-2 p-4 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-brand-red text-white flex items-center justify-center font-bold">
                <Bike className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-brand-dark">
                  Delivery Hero: {order.riderName || 'Assigned to Kamrul Islam'}
                </p>
                <p className="text-[11px] text-neutral-500">Thermal Hot Bag • Safety Seal Intact</p>
              </div>
            </div>

            <a
              href={`tel:${order.riderPhone || '01822998877'}`}
              className="bg-white hover:bg-neutral-100 text-brand-dark font-bold px-4 py-2 rounded-xl border border-neutral-300 shadow-sm transition flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-brand-red" />
              <span>Call Rider</span>
            </a>
          </div>
        </div>

        {/* 2-Column Info: Delivery Details + Invoice Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1 & 2: Order Items */}
          <div className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <h3 className="font-display font-extrabold text-base sm:text-lg text-brand-dark flex items-center gap-2">
                <Receipt className="w-4 h-4 text-brand-red" />
                Ordered Dishes ({order.items.length})
              </h3>
              <span className="text-xs font-bold text-neutral-500">
                Payment: <span className="text-brand-dark">{order.paymentMethod}</span> ({order.paymentStatus})
              </span>
            </div>

            <div className="divide-y divide-neutral-100">
              {order.items.map((item) => (
                <div key={item.id} className="py-3.5 flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <h4 className="text-xs sm:text-sm font-bold text-brand-dark">
                      {item.quantity}x {item.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-500">
                      <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded">
                        Portion: {item.portion}
                      </span>
                      {item.spiceLevel && (
                        <span className="bg-red-100 text-brand-red font-bold px-1.5 py-0.5 rounded">
                          {item.spiceLevel}
                        </span>
                      )}
                    </div>
                    {item.addons && (
                      <p className="text-[10px] text-neutral-500">+ {item.addons}</p>
                    )}
                  </div>

                  <span className="text-xs sm:text-sm font-black text-brand-red">
                    {formatPrice(item.totalPrice, true)}
                  </span>
                </div>
              ))}
            </div>

            {order.notes && (
              <div className="p-3 bg-neutral-50 rounded-2xl text-xs text-neutral-600">
                <span className="font-bold text-brand-dark">Your Instructions:</span> &ldquo;{order.notes}&rdquo;
              </div>
            )}
          </div>

          {/* Column 3: Customer & Bill Summary */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-display font-extrabold text-base text-brand-dark border-b border-neutral-100 pb-3">
                Delivery Details
              </h3>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">Recipient</span>
                  <span className="font-bold text-brand-dark">{order.customerName}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">Phone</span>
                  <span className="font-semibold text-brand-dark">{order.customerPhone}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px] uppercase font-bold">Address</span>
                  <span className="font-semibold text-neutral-700 leading-relaxed">
                    {order.deliveryAddress || 'Direct Takeaway Pickup'}
                  </span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="pt-3 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal, true)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount</span>
                    <span>-{formatPrice(order.discount, true)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{order.deliveryFee === 0 ? 'FREE' : formatPrice(order.deliveryFee, true)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-black text-brand-dark pt-2 border-t border-neutral-200">
                  <span>Total Bill</span>
                  <span className="text-brand-red">{formatPrice(order.total, true)}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 text-center">
              <a
                href="tel:16588"
                className="w-full bg-neutral-900 hover:bg-brand-red text-white text-xs font-bold py-3 rounded-2xl transition flex items-center justify-center gap-2 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" /> Need Support? Call 16588
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
