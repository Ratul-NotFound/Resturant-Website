'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Check,
  Bike,
  Sparkles,
  ExternalLink,
  ChevronRight,
  List,
  Map as MapIcon,
  CheckCircle2,
} from 'lucide-react'
import { INITIAL_BRANCHES, BranchData } from '@/lib/data'
import { useStore } from '@/lib/store'

const AREAS = ['All Outlets', 'Dhanmondi', 'Gulshan', 'Banani', 'Uttara', 'Mirpur', 'Old Dhaka', 'Chittagong']

export default function BranchLocator() {
  const { selectedBranch, setSelectedBranch, showToast } = useStore()
  const [selectedArea, setSelectedArea] = useState('All Outlets')
  const [activeBranchId, setActiveBranchId] = useState<string>(selectedBranch?.id || INITIAL_BRANCHES[0].id)
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list')

  const filteredBranches = INITIAL_BRANCHES.filter((b) => {
    if (selectedArea === 'All Outlets') return true
    return b.area.toLowerCase() === selectedArea.toLowerCase()
  })

  const currentBranch =
    INITIAL_BRANCHES.find((b) => b.id === activeBranchId) || INITIAL_BRANCHES[0]

  const handleSelectBranch = (branch: BranchData) => {
    setActiveBranchId(branch.id)
    setSelectedBranch(branch)
    showToast('Active Outlet Selected', `${branch.name} set as delivery branch.`)
  }

  // Google Map embed URL with live coordinates / name query
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(currentBranch.name + " " + currentBranch.address)}&hl=en&z=15&output=embed`

  return (
    <section
      className="py-8 sm:py-16 lg:py-20 bg-[#FFF9F6] relative border-t border-neutral-200/70"
      data-purpose="branch-locator-section"
      id="branches"
    >
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 bg-brand-red/10 border border-brand-red/20 px-3 py-1 rounded-full mb-1.5 sm:mb-2.5 shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-brand-red" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-brand-red">
              7 Strategic Outlets
            </span>
          </div>

          <h2 className="font-display text-xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
            Find Your Nearest Outlet
          </h2>
          <p className="text-[11px] sm:text-sm text-neutral-500 mt-1 max-w-lg mx-auto">
            Dine-in in royal ambiance or get fast doorstep delivery in 30-40 minutes.
          </p>
        </div>

        {/* Mobile View Switcher & Area Filters */}
        <div className="mb-4 sm:mb-6 space-y-2.5">
          
          {/* Mobile Segmented Switcher: List View vs Map View */}
          <div className="flex lg:hidden justify-center">
            <div className="bg-neutral-200/80 p-1 rounded-xl flex items-center gap-1 w-full max-w-xs shadow-inner">
              <button
                onClick={() => setMobileView('list')}
                type="button"
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  mobileView === 'list'
                    ? 'bg-white text-neutral-900 shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>List View ({INITIAL_BRANCHES.length})</span>
              </button>

              <button
                onClick={() => setMobileView('map')}
                type="button"
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  mobileView === 'map'
                    ? 'bg-white text-neutral-900 shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5 text-brand-red" />
                <span>Live Map</span>
              </button>
            </div>
          </div>

          {/* Area Filter Pills Rail */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth snap-x pb-1 pt-0.5 justify-start sm:justify-center">
            {AREAS.map((area) => {
              const isAreaActive = selectedArea === area
              return (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  type="button"
                  className={`px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold whitespace-nowrap snap-start transition-all border shrink-0 ${
                    isAreaActive
                      ? 'bg-brand-red text-white border-brand-red shadow-2xs'
                      : 'bg-white text-neutral-700 hover:bg-neutral-100 border-neutral-200/80'
                  }`}
                >
                  {area}
                </button>
              )
            })}
          </div>

        </div>

        {/* Dual-Panel Grid: Compact cards on mobile, split view on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
          
          {/* Left Column: Compact Outlets Cards */}
          <div
            className={`lg:col-span-5 flex-col space-y-2 lg:max-h-[580px] lg:overflow-y-auto lg:pr-1 custom-scrollbar ${
              mobileView === 'list' ? 'flex' : 'hidden lg:flex'
            }`}
          >
            {filteredBranches.map((branch) => {
              const isSelected = branch.id === activeBranchId
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
                            <span className="inline-flex items-center gap-0.5 bg-brand-red text-white text-[8px] sm:text-[9px] font-black px-1.5 py-0.2 rounded-full shrink-0 shadow-2xs">
                              <Check className="w-2.5 h-2.5 stroke-[3]" /> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-0.5 text-[8px] sm:text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full shrink-0 border border-emerald-200/60">
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

                    {/* Right: Quick Action Buttons (Compact Round Icon Pills) */}
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
            className={`lg:col-span-7 relative flex-col min-h-[340px] sm:min-h-[420px] lg:min-h-[580px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-neutral-200/80 shadow-xl bg-neutral-100 ${
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
            <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/60 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-4 z-20">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-brand-red text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="font-display font-black text-xs sm:text-sm md:text-base text-neutral-900 leading-tight">
                    {currentBranch.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-neutral-600 mt-0.5 line-clamp-1">
                    {currentBranch.address}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-neutral-500 mt-0.5 font-semibold">
                    <span className="flex items-center gap-1 text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Open Today
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-brand-dark">
                      <Bike className="w-3 h-3 text-brand-red" /> ৳{currentBranch.deliveryFee} (~30m)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={currentBranch.mapLink || `https://maps.google.com/?q=${encodeURIComponent(currentBranch.name + " " + currentBranch.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial bg-brand-red hover:bg-brand-darkred text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1 active:scale-95"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>

                <a
                  href={`tel:${currentBranch.phone}`}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold px-3 py-2 rounded-xl transition-colors flex items-center justify-center gap-1 shrink-0"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-red" />
                  <span>Call</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
