'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Flame,
  LayoutDashboard,
  Utensils,
  CalendarCheck,
  LogOut,
  Store,
  Clock,
  Sparkles,
  Receipt,
} from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const isLoginPage = pathname === '/admin/login'

  if (isLoginPage) {
    return <>{children}</>
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' })
      router.push('/admin/login')
    } catch (e) {
      router.push('/admin/login')
    }
  }

  const NAV_ITEMS = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Live Orders', href: '/admin/orders', icon: Receipt },
    { label: 'Table Bookings', href: '/admin/reservations', icon: CalendarCheck },
  ]

  return (
    <div className="min-h-screen bg-neutral-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-neutral-900 border-r border-neutral-800 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Logo */}
          <Link href="/admin" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center text-white shadow-md">
              <Flame className="w-6 h-6 fill-white" />
            </div>
            <div>
              <span className="font-display font-black text-lg tracking-tight text-white block leading-none">
                FLAME <span className="text-brand-red">&amp;</span> FEAST
              </span>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                Kitchen Admin
              </span>
            </div>
          </Link>

          {/* Navigation links */}
          <nav className="space-y-1.5 pt-4">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-brand-red text-white shadow-md'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-neutral-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center space-x-2.5 px-3.5 py-2 text-xs font-bold text-neutral-400 hover:text-brand-gold transition"
          >
            <Store className="w-4 h-4" />
            <span>View Public Store</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b border-neutral-800 bg-neutral-900/60 backdrop-blur px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-400">Kitchen Telemetry Online</span>
          </div>

          <div className="flex items-center space-x-4 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5 font-semibold">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> Daily Shift: 11:00 AM - 11:00 PM
            </span>
          </div>
        </header>

        {/* Content Children */}
        <main className="flex-1 p-5 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
