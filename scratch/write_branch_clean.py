f_branch = """'use client'

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
} from 'lucide-react'
import { INITIAL_BRANCHES, BranchData } from '@/lib/data'
import { useStore } from '@/lib/store'

const AREAS = ['All Outlets', 'Dhanmondi', 'Gulshan', 'Banani', 'Uttara', 'Mirpur', 'Bailey Road', 'Chittagong']

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
    showToast('Outlet Selected', `Switched active branch to ${branch.name}`)
  }

  // Google Map embed URL with live coordinates
  const mapEmbedUrl = `https://maps.google.com/maps?q=${currentBranch.lat},${currentBranch.lng}&hl=en&z=16&output=embed`

  return (
    <section
      className="py-12 sm:py-20 lg:py-24 bg-[#FFF9F6] relative border-t border-neutral-200/70"
      data-purpose="branch-locator-section"
      id="branches"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 bg-brand-red/10 border border-brand-red/20 px-3.5 py-1.5 rounded-full mb-2.5 sm:mb-3 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-brand-red" />
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-brand-red">
              7 Strategic Outlets Across Dhaka &amp; Chittagong
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight">
            Find Your Nearest Flame &amp; Feast
          </h2>
          <p className="text-xs sm:text-base text-neutral-500 mt-2 max-w-lg mx-auto">
            Dine-in in royal heritage ambiance or get doorstep peri-peri delivery within 30-40 minutes.
          </p>
        </div>

        {/* Mobile Segmented View Switcher: List View vs Map View */}
        <div className="flex lg:hidden justify-center mb-4">
          <div className="bg-neutral-200/80 p-1 rounded-2xl flex items-center gap-1 w-full max-w-xs shadow-inner">
            <button
              onClick={() => setMobileView('list')}
              type="button"
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                mobileView === 'list'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Outlets List</span>
            </button>

            <button
              onClick={() => setMobileView('map')}
              type="button"
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                mobileView === 'map'
                  ? 'bg-white text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5 text-brand-red" />
              <span>Live Map</span>
            </button>
          </div>
        </div>

        {/* Interactive Dual-Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-stretch">
          
          {/* Left Panel: Scrollable Outlets List */}
          <div
            className={`lg:col-span-5 flex-col space-y-3 max-h-[520px] lg:max-h-[580px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar ${
              mobileView === 'list' ? 'flex' : 'hidden lg:flex'
            }`}
          >
            {filteredBranches.map((branch) => {
              const isSelected = branch.id === activeBranchId
              return (
                <motion.div
                  key={branch.id}
                  onClick={() => handleSelectBranch(branch)}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className={`p-3.5 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative ${
                    isSelected
                      ? 'bg-white border-brand-red shadow-xl shadow-brand-red/10 ring-2 ring-brand-red/20'
                      : 'bg-white/90 hover:bg-white border-neutral-200/80 hover:border-neutral-300 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Top Row: Name & Active Pill */}
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-brand-red text-white shadow-md'
                            : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-xs sm:text-sm md:text-base text-neutral-900 leading-snug">
                          {branch.name}
                        </h4>
                        <span className="text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                          {branch.area}
                        </span>
                      </div>
                    </div>

                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 bg-brand-red text-white text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shrink-0 shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" /> Selected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" /> Open
                      </span>
                    )}
                  </div>

                  {/* Address */}
                  <p className="text-xs text-neutral-600 leading-relaxed pl-10 sm:pl-11 mb-2.5">
                    {branch.address}
                  </p>

                  {/* Info Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-100 text-xs text-neutral-500 pl-10 sm:pl-11">
                    <div className="flex items-center gap-1 font-medium text-[11px] sm:text-xs">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{branch.hours}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${branch.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-brand-red hover:underline font-bold flex items-center gap-1 text-[11px] sm:text-xs"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{branch.phone}</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Right Panel: Live Interactive Google Maps Viewport */}
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
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/60 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 z-20">
              <div className="flex items-start gap-2.5 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-red text-white flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="font-display font-black text-xs sm:text-sm md:text-base text-neutral-900 leading-tight">
                    {currentBranch.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-neutral-600 mt-0.5 line-clamp-1">
                    {currentBranch.address}
                  </p>
                  <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-neutral-500 mt-0.5 font-semibold">
                    <span className="flex items-center gap-1 text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Open Today
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-brand-dark">
                      <Bike className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-red" /> ৳{currentBranch.deliveryFee} (~30m)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={currentBranch.mapLink || `https://maps.google.com/?q=${encodeURIComponent(currentBranch.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial bg-brand-red hover:bg-brand-darkred text-white text-xs font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-md shadow-brand-red/20 transition-all flex items-center justify-center gap-1 active:scale-95"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>

                <a
                  href={`tel:${currentBranch.phone}`}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1 shrink-0"
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
"""
with open('components/BranchLocator.tsx', 'w', encoding='utf-8') as f:
    f.write(f_branch)
print('BranchLocator.tsx written successfully')
