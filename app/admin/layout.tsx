'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Flame,
  LayoutDashboard,
  ShoppingBag,
  CalendarCheck,
  LogOut,
  UtensilsCrossed,
  ShieldCheck,
  Bike,
} from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (pathname !== '/admin/login') {
      const isAuth = sessionStorage.getItem('flame_admin_auth')
      if (!isAuth) {
        router.push('/admin/login')
      }
    }
  }, [pathname, router])

  if (!mounted) return null

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const handleLogout = () => {
    sessionStorage.removeItem('flame_admin_auth')
    router.push('/admin/login')
  }

  const NAV_ITEMS = [
    { label: 'Live Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Order Queue', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Table Bookings', href: '/admin/reservations', icon: CalendarCheck },
  ]

  return (
    <div className="min-h-screen bg-[#0F0D0D] text-slate-200 flex flex-col lg:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-[#181515] border-r border-neutral-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-red flex items-center justify-center text-white shadow-md">
                <Flame className="w-5 h-5 fill-white" />
              </div>
              <div>
                <span className="font-display font-black text-white text-sm tracking-tight block">
                  FLAME &amp; FEAST
                </span>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                  Kitchen Admin
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-brand-red text-white shadow-md'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-800 space-y-2">
          <div className="px-3 py-2 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center space-x-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-400">Kitchen Telemetry Online</span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
