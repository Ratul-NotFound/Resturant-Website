'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, Flame, ArrowLeft, PackageCheck, Clock, MapPin, Bike } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function TrackLookupPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const clean = query.trim().toUpperCase()

    if (!clean) {
      setError('Please enter an Order Number or Mobile Phone')
      return
    }

    setIsLoading(true)
    // If it looks like an order number (e.g. FF-XXXX or numeric)
    if (clean.startsWith('FF-')) {
      router.push(`/track/${clean}`)
    } else {
      router.push(`/track/${clean}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 w-full flex flex-col justify-center">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-bold text-neutral-500 hover:text-brand-red transition mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Home
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200 shadow-xl text-center max-w-xl mx-auto w-full">
          <div className="w-16 h-16 rounded-full bg-red-50 text-brand-red flex items-center justify-center mx-auto mb-4 border border-red-200 shadow-sm">
            <Bike className="w-8 h-8" />
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-black text-brand-dark uppercase tracking-tight">
            Live Order Tracker
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-sm mx-auto">
            Check your feast&apos;s live status from open flame grill to your doorstep.
          </p>

          <form onSubmit={handleSearch} className="mt-8 space-y-4">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. FF-84920) or Phone"
                className="w-full pl-4 pr-12 py-3.5 rounded-2xl border border-neutral-300 text-xs sm:text-sm font-bold text-brand-dark uppercase placeholder:normal-case focus:border-brand-red focus:outline-none shadow-sm"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-red hover:bg-brand-darkred text-white p-2 rounded-xl transition shadow-sm"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {error && <p className="text-xs text-rose-600 font-semibold">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full cta-shimmer bg-brand-red hover:bg-brand-darkred text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-2xl shadow-md transition-all transform active:scale-95"
            >
              {isLoading ? 'Searching Order...' : 'Track My Feast'}
            </button>
          </form>

          {/* Quick Demo links */}
          <div className="mt-8 pt-6 border-t border-neutral-100 text-xs text-neutral-400">
            <span>Want to test live tracking demo? </span>
            <Link href="/track/FF-84920" className="font-bold text-brand-red hover:underline">
              View Demo Order #FF-84920
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
