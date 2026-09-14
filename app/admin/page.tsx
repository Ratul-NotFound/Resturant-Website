'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Banknote,
  Receipt,
  Clock,
  CalendarCheck,
  ChevronRight,
  TrendingUp,
  Loader2,
  CheckCircle,
  AlertCircle,
  Bike,
  Flame,
  ChefHat,
  Package,
} from 'lucide-react'
import { formatPrice, formatDate } from '@/lib/utils'

export default function AdminOverviewPage() {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats')
      const json = await res.json()
      if (json.success) {
        setData(json)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      fetchStats()
    } catch (e) {
      console.error(e)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-brand-red" />
      </div>
    )
  }

  const stats = data?.stats || {
    totalRevenue: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalReservations: 0,
  }

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Kitchen Dashboard
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Real-time sales, live orders, and table bookings across all outlets.
          </p>
        </div>

        <Link
          href="/admin/orders"
          className="inline-flex items-center space-x-2 bg-brand-red hover:bg-brand-darkred text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition"
        >
          <Receipt className="w-4 h-4" />
          <span>Manage All Orders</span>
        </Link>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue */}
        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
            <span>Total Sales Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Banknote className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{formatPrice(stats.totalRevenue)}</p>
          <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% this week
          </p>
        </div>

        {/* Active Orders */}
        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
            <span>Live Kitchen Orders</span>
            <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-red-400" />
            </div>
          </div>
          <p className="text-2xl font-black text-brand-red">{stats.pendingOrders}</p>
          <p className="text-[11px] text-neutral-400">Needs preparation &amp; dispatch</p>
        </div>

        {/* Total Orders */}
        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
            <span>Completed Orders</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{stats.totalOrders}</p>
          <p className="text-[11px] text-neutral-400">All outlets lifetime</p>
        </div>

        {/* Table Reservations */}
        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
            <span>Table Reservations</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-400">{stats.totalReservations}</p>
          <p className="text-[11px] text-neutral-400">Dine-in guests confirmed</p>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-extrabold text-lg text-white">
              Recent Incoming Feasts
            </h2>
            <p className="text-xs text-neutral-400">Update live status to notify customer in real time</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-brand-gold hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 font-bold">
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Customer &amp; Phone</th>
                <th className="py-3 px-4">Outlet &amp; Type</th>
                <th className="py-3 px-4">Items Summary</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {data?.recentOrders?.map((order: any) => (
                <tr key={order.id} className="hover:bg-neutral-800/50 transition">
                  <td className="py-3.5 px-4 font-black text-brand-gold">
                    <Link href={`/track/${order.orderNumber}`} target="_blank" className="hover:underline">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-white">{order.customerName}</p>
                    <p className="text-[11px] text-neutral-400">{order.customerPhone}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="text-white font-medium">{order.branchName}</p>
                    <span className="text-[10px] uppercase font-bold text-neutral-400">
                      {order.fulfillmentType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="text-neutral-300 font-medium truncate">
                      {order.items.map((i: any) => `${i.quantity}x ${i.name} (${i.portion})`).join(', ')}
                    </p>
                  </td>
                  <td className="py-3.5 px-4 font-black text-white">
                    {formatPrice(order.total)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                        order.status === 'RECEIVED'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : order.status === 'PREPARING'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : order.status === 'ON_FLAME'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
                          : order.status === 'OUT_FOR_DELIVERY'
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : order.status === 'DELIVERED'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-neutral-700 text-neutral-300'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      className="bg-neutral-800 text-white text-[11px] font-bold border border-neutral-700 rounded-xl px-2.5 py-1.5 focus:border-brand-red focus:outline-none cursor-pointer"
                    >
                      <option value="RECEIVED">RECEIVED</option>
                      <option value="PREPARING">PREPARING</option>
                      <option value="ON_FLAME">ON FLAME</option>
                      <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
