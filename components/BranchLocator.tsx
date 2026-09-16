'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  CheckCircle2,
  Bike,
  ListFilter,
  Map as MapIcon,
  Check,
} from 'lucide-react'
import { INITIAL_BRANCHES, BranchData } from '@/lib/data'
import { useStore } from '@/lib/store'

export default function BranchLocator() {
  const { selectedBranch, setSelectedBranch, showToast } = useStore()
  const [selectedArea, setSelectedArea] = useState<string>('all')
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list')

  const currentBranch = selectedBranch || INITIAL_BRANCHES[0]

  const handleSelectBranch = (branch: BranchData) => {
    setSelectedBranch(branch)
    showToast('Branch Selected', `Active outlet switched to ${branch.name}`)
  }

  const areas = ['all', ...Array.from(new Set(INITIAL_BRANCHES.map((b) => b.area)))]

  const filteredBranches = INITIAL_BRANCHES.filter(
    (b) => selectedArea === 'all' || b.area === selectedArea
  )

  // Map Embed URL
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${currentBranch.name}, ${currentBranch.address}`
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`

  return (
    <section
      className="py-8 sm:py-16 bg-[#F9F7F5] relative overflow-hidden"
      id="branches"
      data-purpose="branch-locator-section"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-10">
          <span className="text-brand-red font-display font-extrabold text-[11px] sm:text-xs uppercase tracking-[0.22em] block mb-1.5">
            7 Flagship Outlets in Dhaka &amp; Chittagong
          </span>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight">
            Find Your Nearest Kitchen
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-lg mx-auto font-normal">
            Visit our open flame kitchen or order for instant doorstep delivery within a 5km radius.
          </p>
        </div>

        {/* Mobile View Toggle: List vs Live Map */}
        <div className="flex lg:hidden items-center justify-center mb-3.5">
          <div className="inline-flex items-center p-1 bg-neutral-200/80 rounded-2xl border border-neutral-300/80 text-xs font-bold w-full max-w-xs">
            <button
              onClick={() => setMobileView('list')}
              type="button"
              className={`flex-1 py-1.5 rounded-xl flex items-center justify-center gap-1.5 transition ${
                mobileView === 'list'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5 text-brand-red" />
              <span>Outlets List</span>
            </button>

            <button
              onClick={() => setMobileView('map')}
              type="button"
              className={`flex-1 py-1.5 rounded-xl flex items-center justify-center gap-1.5 transition ${
                mobileView === 'map'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5 text-brand-red" />
              <span>Live Map</span>
            </button>
          </div>
        </div>

        {/* Area Filter Chips Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth snap-x pb-2.5 mb-3 sm:mb-6">
          {areas.map((area) => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              type="button"
              className={`px-3 sm:px-4 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap snap-start transition border shrink-0 ${
                selectedArea === area
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-2xs'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100 border-neutral-200/80'
              }`}
            >
              {area === 'all' ? 'All Locations' : area}
            </button>
          ))}
        </div>

        {/* Responsive Dual Column Master-Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 items-start">
          
          {/* Left Column: Ultra-Compact Branch Cards List */}
          <div
            className={`lg:col-span-5 space-y-2 sm:space-y-2.5 max-h-[580px] overflow-y-auto no-scrollbar pr-0.5 ${
              mobileView === 'list' ? 'block' : 'hidden lg:block'
            }`}
          >
            {filteredBranches.map((branch) => {
              const isSelected = currentBranch.id === branch.id
              return (
                <motion.div
                  key={branch.id}
                  onClick={() => handleSelectBranch(branch)}
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.15 }}
                  className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-200 cursor-pointer text-left relative ${
                    isSelected
                      ? 'bg-white border-brand-red shadow-md shadow-brand-red/10 ring-1.5 ring-brand-red'
                      : 'bg-white/95 hover:bg-white border-neutral-200/80 hover:border-neutral-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    
                    {/* Left Details */}
                    <div className="flex items-start gap-2.5 min-w-0 flex-1">
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors mt-0.5 ${
                          isSelected
                            ? 'bg-brand-red text-white shadow-2xs'
                            : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        {/* Name + Status */}
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-display font-black text-xs sm:text-sm text-neutral-900 leading-tight truncate">
                            {branch.name}
                          </h4>
                          {isSelected ? (
                            <span className="inline-flex items-center gap-0.5 bg-brand-red text-white text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-full shrink-0 shadow-2xs">
                              <Check className="w-2.5 h-2.5 stroke-[3]" /> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-0.5 text-[8px] sm:text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full shrink-0 border border-emerald-200/60">
                              <span className="w-1 h-1 rounded-full bg-emerald-600 animate-pulse" /> Open
                            </span>
                          )}
                        </div>

                        {/* Compact Address */}
                        <p className="text-[11px] text-neutral-500 truncate leading-tight mt-0.5">
                          {branch.address}
                        </p>

                        {/* Timing & Delivery Fee Row */}
                        <div className="flex items-center gap-2.5 text-[10px] text-neutral-400 mt-1 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-500 shrink-0" />
                            <span>{branch.hours}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-neutral-700 font-bold">
                            <Bike className="w-3 h-3 text-brand-red shrink-0" />
                            <span>৳{branch.deliveryFee} (~30m)</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Quick Action Buttons */}
                    <div className="flex items-center gap-1.5 shrink-0 pl-1">
                      <a
                        href={branch.mapLink || `https://maps.google.com/?q=${encodeURIComponent(branch.name + " " + branch.address)}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 active:scale-90 text-neutral-700 hover:text-brand-red flex items-center justify-center transition border border-neutral-200/60"
                        title="Get GPS Directions"
                      >
                        <Navigation className="w-3.5 h-3.5 text-brand-red" />
                      </a>

                      <a
                        href={`tel:${branch.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-lg bg-brand-red hover:bg-brand-darkred active:scale-90 text-white flex items-center justify-center transition shadow-2xs"
                        title="Call Outlet"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>

                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Right Column: Live Interactive Google Maps Viewport */}
          <div
            className={`lg:col-span-7 relative flex-col min-h-[340px] sm:min-h-[420px] lg:min-h-[580px] rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/80 shadow-md bg-neutral-100 ${
              mobileView === 'map' ? 'flex' : 'hidden lg:flex'
            }`}
          >
            {/* Embedded Live Google Map */}
            <iframe
              title={`Map of ${currentBranch.name}`}
              src={mapEmbedUrl}
              className="w-full h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[580px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating Glassmorphic Quick Info Card on Map */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/60 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-4 z-20">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-brand-red text-white flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h5 className="font-display font-black text-xs sm:text-sm text-neutral-900 leading-tight">
                    {currentBranch.name}
                  </h5>
                  <p className="text-[10px] sm:text-xs text-neutral-500 line-clamp-1 mt-0.5">
                    {currentBranch.address}
                  </p>
                  <p className="text-[10px] text-emerald-700 font-bold mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    Delivery Zone Active • ৳{currentBranch.deliveryFee} Fee
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`tel:${currentBranch.phone}`}
                  className="flex-1 sm:flex-none px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-red" />
                  <span>Call {currentBranch.phone}</span>
                </a>

                <button
                  onClick={() => handleSelectBranch(currentBranch)}
                  type="button"
                  className="flex-1 sm:flex-none px-4 py-2 bg-brand-red hover:bg-brand-darkred text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Set Active</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
