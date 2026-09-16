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
      setError(err.message || 'Could not load order details')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (orderId) {
      fetchOrder()
      // Poll every 10s for status updates
      const interval = setInterval(fetchOrder, 10000)
      return () => clearInterval(interval)
    }
  }, [orderId])

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

  const currentStageIdx = order ? getStageIndex(order.status) : 0

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-xs font-bold text-neutral-500 hover:text-brand-red transition mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Home
        </Link>

        {loading ? (
          <div className="bg-white rounded-3xl p-12 border border-neutral-200 shadow-xl text-center space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-brand-red mx-auto" />
            <h3 className="font-bold text-neutral-700">Connecting to Kitchen Telemetry...</h3>
          </div>
        ) : error || !order ? (
          <div className="bg-white rounded-3xl p-12 border border-neutral-200 shadow-xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="font-display text-xl font-bold text-brand-dark">Order Not Found</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              We couldn&apos;t find an order matching &ldquo;{orderId}&rdquo;. Please verify your order number or phone number.
            </p>
            <Link
              href="/track"
              className="inline-block bg-brand-red text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-brand-darkred transition"
            >
              Try Another Search
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header Status Card */}
            <div className="bg-brand-dark text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-brand-red text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                      Live Order Tracking
                    </span>
                    <span className="text-xs text-neutral-400 font-semibold">
                      Placed on {formatDate(order.createdAt)}
                    </span>
                  </div>

                  <h1 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1.5 flex items-center gap-2">
                    <span>Order #{order.orderNumber}</span>
                  </h1>

                  <p className="text-xs text-neutral-300 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-red" />
                    <span>{order.fulfillmentType === 'delivery' ? 'Home Delivery' : 'Self Pickup'} • {order.branchName}</span>
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-right sm:text-center shrink-0">
                  <span className="text-[10px] text-amber-300 uppercase font-black tracking-wider block">
                    Estimated Time
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-white block mt-0.5">
                    {order.status === 'DELIVERED' ? 'Delivered' : '25 - 35 Mins'}
                  </span>
                </div>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xl">
              <h3 className="font-display font-black text-base text-brand-dark uppercase tracking-wider mb-6">
                Kitchen Status Timeline
              </h3>

              <div className="space-y-6">
                {STAGES.map((stg, idx) => {
                  const isDone = idx < currentStageIdx
                  const isCurrent = idx === currentStageIdx
                  const Icon = stg.icon

                  return (
                    <div
                      key={stg.key}
                      className={`flex items-start gap-4 transition-opacity ${
                        isDone || isCurrent ? 'opacity-100' : 'opacity-40'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            isCurrent
                              ? 'bg-brand-red text-white shadow-lg scale-110 ring-4 ring-red-100'
                              : isDone
                              ? 'bg-emerald-600 text-white'
                              : 'bg-neutral-100 text-neutral-400'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        {idx < STAGES.length - 1 && (
                          <div
                            className={`w-0.5 h-10 my-1 ${
                              isDone ? 'bg-emerald-600' : 'bg-neutral-200'
                            }`}
                          />
                        )}
                      </div>

                      <div className="flex-1 pt-1.5">
                        <div className="flex items-center gap-2">
                          <h4
                            className={`font-bold text-sm text-brand-dark ${
                              isCurrent ? 'text-brand-red font-black' : ''
                            }`}
                          >
                            {stg.title}
                          </h4>
                          {isCurrent && (
                            <span className="inline-flex items-center gap-1 bg-red-100 text-brand-red text-[10px] font-black uppercase px-2 py-0.5 rounded-full animate-pulse">
                              In Progress
                            </span>
                          )}
                          {isDone && (
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                              Completed
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5">{stg.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Order Details & Summary Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ordered Items */}
              <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xl space-y-4">
                <h3 className="font-display font-bold text-sm text-brand-dark uppercase tracking-wider flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-brand-red" />
                  <span>Items In Your Order</span>
                </h3>

                <div className="space-y-3 divide-y divide-neutral-100">
                  {order.items?.map((it, i) => (
                    <div key={i} className="pt-2.5 first:pt-0 flex justify-between items-start text-xs">
                      <div>
                        <span className="font-bold text-brand-dark">{it.quantity}x {it.name}</span>
                        <div className="text-[10px] text-neutral-500">
                          <span>Portion: {it.portion}</span>
                          {it.spiceLevel && <span> • Spice: {it.spiceLevel}</span>}
                          {it.addons && <span> • Extras: {it.addons}</span>}
                        </div>
                      </div>
                      <span className="font-bold text-brand-dark">{formatPrice(it.totalPrice, true)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery & Payment Info */}
              <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xl space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-display font-bold text-sm text-brand-dark uppercase tracking-wider flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-red" />
                    <span>Destination &amp; Contact</span>
                  </h3>

                  <div className="text-xs space-y-1.5 text-neutral-600">
                    <p><strong className="text-brand-dark">Recipient:</strong> {order.customerName}</p>
                    <p><strong className="text-brand-dark">Phone:</strong> {order.customerPhone}</p>
                    <p><strong className="text-brand-dark">Address:</strong> {order.deliveryAddress}</p>
                    <p><strong className="text-brand-dark">Payment:</strong> {order.paymentMethod} ({order.paymentStatus})</p>
                    {order.notes && <p><strong className="text-brand-dark">Special Note:</strong> {order.notes}</p>}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 space-y-1 text-xs">
                  <div className="flex justify-between text-neutral-500">
                    <span>Subtotal:</span>
                    <span>{formatPrice(order.subtotal, true)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount:</span>
                      <span>-{formatPrice(order.discount, true)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-neutral-500">
                    <span>Delivery Fee:</span>
                    <span>{order.deliveryFee === 0 ? 'FREE' : formatPrice(order.deliveryFee, true)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-brand-dark pt-1 border-t border-neutral-200">
                    <span>Total Paid:</span>
                    <span className="text-brand-red">{formatPrice(order.total, true)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotline banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-900 gap-2">
              <span className="font-medium">Questions about your order or delivery timing?</span>
              <a href="tel:16588" className="font-bold text-brand-red hover:underline flex items-center gap-1 shrink-0">
                <Phone className="w-3.5 h-3.5" /> Need Support? Call 16588
              </a>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
