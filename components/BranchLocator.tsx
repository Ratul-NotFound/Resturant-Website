'use client'

import React, { useState } from 'react'
import { MapPin, Phone, Clock, ExternalLink, Navigation } from 'lucide-react'
import { INITIAL_BRANCHES, BranchData } from '@/lib/data'
import { useStore } from '@/lib/store'

export default function BranchLocator() {
  const { selectedBranch, setSelectedBranch, showToast } = useStore()
  const [activeBranchId, setActiveBranchId] = useState(selectedBranch.id)

  const currentBranch = INITIAL_BRANCHES.find((b) => b.id === activeBranchId) || INITIAL_BRANCHES[0]

  const handleSelect = (branchId: string) => {
    setActiveBranchId(branchId)
    const branch = INITIAL_BRANCHES.find((b) => b.id === branchId)
    if (branch) {
      setSelectedBranch(branch)
      showToast('Branch Selected', `Switched to ${branch.name}`)
    }
  }

  return (
    <section className="py-14 bg-white border-b border-neutral-200" data-purpose="branch-locator" id="branches">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-red-50 via-white to-amber-50 rounded-3xl p-6 sm:p-10 border border-neutral-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:shadow-md">
          <div className="flex items-start sm:items-center space-x-4 sm:space-x-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-brand-red text-white flex items-center justify-center text-2xl sm:text-3xl shadow-md transition-transform hover:scale-105 shrink-0">
              <MapPin className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg sm:text-2xl text-brand-dark">
                Find Your Nearest Branch • Galito&apos;s &amp; Feast
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
                12 Locations across Dhanmondi, Gulshan, Banani, Uttara, Mirpur &amp; Chittagong with dine-in, takeaway, and ultra-fast doorstep delivery.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <select
              value={activeBranchId}
              onChange={(e) => handleSelect(e.target.value)}
              className="bg-white text-slate-800 text-xs sm:text-sm font-bold border border-neutral-300 rounded-2xl px-4 py-3 focus:ring-brand-red focus:border-brand-red shadow-sm transition cursor-pointer"
            >
              {INITIAL_BRANCHES.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.area})
                </option>
              ))}
            </select>

            <a
              href={currentBranch.mapLink || '#'}
              target="_blank"
              rel="noreferrer"
              className="bg-brand-red hover:bg-brand-darkred text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
            >
              <Navigation className="w-4 h-4" />
              <span>View Map</span>
            </a>
          </div>
        </div>

        {/* Selected Branch Details Quick Bar */}
        <div className="mt-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-2 text-slate-700">
            <span className="font-bold text-brand-dark">{currentBranch.name}:</span>
            <span className="text-neutral-500">{currentBranch.address}</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-600">
            <span className="flex items-center gap-1 font-semibold">
              <Clock className="w-3.5 h-3.5 text-amber-500" /> {currentBranch.hours}
            </span>
            <a
              href={`tel:${currentBranch.phone}`}
              className="flex items-center gap-1 font-bold text-brand-red hover:underline"
            >
              <Phone className="w-3.5 h-3.5" /> {currentBranch.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
