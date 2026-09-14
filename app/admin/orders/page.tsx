'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Receipt,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Bike,
  Flame,
  ChefHat,
  Package,
  Phone,
  MapPin,
  Loader2,
  ExternalLink,
} from 'lucide-react'
import { formatPrice, formatDate } from '@/lib/utils'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      if (data.success) {
        setOrders(data.orders)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 8000)
    return () => clearInterval(interval)
  }, [])

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      fetchOrders()
    } catch (e) {
      console.error(e)
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === 'ALL' || order.status === filterStatus
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery)

    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-black text-white uppercase tracking-tight">
            Order Dispatch Center
          </h1>
          <p className="text-xs text-neutral-400">
            Real-time kitchen management &amp; rider assignment
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Order # or Phone..."
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:border-brand-red focus:outline-none"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 pt-1">
        {[
          { id: 'ALL', label: 'All Orders' },
          { id: 'RECEIVED', label: 'Received' },
          { id: 'PREPARING', label: 'Prepping' },
          { id: 'ON_FLAME', label: 'On Flame Grill' },
          { id: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
          { id: 'DELIVERED', label: 'Delivered' },
          { id: 'CANCELLED', label: 'Cancelled' },
        ].map((tab) => {
          const isActive = filterStatus === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition ${
                isActive
                  ? 'bg-brand-red text-white shadow-md'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Orders Grid */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-red" />
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 shadow-sm space-y-4 hover:border-neutral-700 transition"
            >
              {/* Order Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-black text-sm text-brand-gold">{order.orderNumber}</span>
                    <span className="bg-neutral-800 text-[10px] uppercase font-bold text-neutral-300 px-2 py-0.5 rounded">
                      {order.fulfillmentType}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-0.5">{order.branchName}</p>
                </div>

                <Link
                  href={`/track/${order.orderNumber}`}
                  target="_blank"
                  className="text-neutral-400 hover:text-white p-1"
                  title="Live Customer View"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>

              {/* Customer Contact */}
              <div className="bg-neutral-950 p-3 rounded-2xl border border-neutral-800/80 text-xs space-y-1">
                <div className="flex justify-between font-bold text-white">
                  <span>{order.customerName}</span>
                  <a href={`tel:${order.customerPhone}`} className="text-brand-gold hover:underline">
                    {order.customerPhone}
                  </a>
                </div>
                {order.deliveryAddress && (
                  <p className="text-[11px] text-neutral-400 leading-tight">
                    {order.deliveryAddress}
                  </p>
                )}
                {order.notes && (
                  <p className="text-[10px] text-amber-400/90 italic pt-1">
                    Note: &ldquo;{order.notes}&rdquo;
                  </p>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-1.5 text-xs">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-neutral-300">
                    <span>
                      {item.quantity}x {item.name} ({item.portion})
                      {item.spiceLevel && ` • ${item.spiceLevel}`}
                    </span>
                    <span className="font-bold text-white">{formatPrice(item.totalPrice)}</span>
                  </div>
                ))}
              </div>

              {/* Bill & Status Controls */}
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-400 block uppercase font-bold">Total</span>
                  <span className="font-black text-sm text-brand-red">{formatPrice(order.total)}</span>
                </div>

                <select
                  value={order.status}
                  onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                  className="bg-neutral-800 text-white text-xs font-bold border border-neutral-700 rounded-xl px-3 py-2 focus:border-brand-red focus:outline-none cursor-pointer"
                >
                  <option value="RECEIVED">RECEIVED</option>
                  <option value="PREPARING">PREPARING</option>
                  <option value="ON_FLAME">ON FLAME</option>
                  <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-neutral-900 border border-neutral-800 rounded-3xl">
          <Receipt className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
          <p className="text-sm font-bold text-neutral-300">No orders matching this filter</p>
        </div>
      )}
    </div>
  )
}
