'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Clock, Navigation, ExternalLink, Check, Bike, Sparkles, Compass } from 'lucide-react'
import { INITIAL_BRANCHES, BranchData } from '@/lib/data'
import { useStore } from '@/lib/store'

export default function BranchLocator() {
  const { selectedBranch, setSelectedBranch, showToast } = useStore()
  const [activeBranchId, setActiveBranchId] = useState(selectedBranch?.id || INITIAL_BRANCHES[0].id)
  const [selectedArea, setSelectedArea] = useState('All')

  const currentBranch =
    INITIAL_BRANCHES.find((b) => b.id === activeBranchId) || INITIAL_BRANCHES[0]

  const areas = ['All', ...Array.from(new Set(INITIAL_BRANCHES.map((b) => b.area)))]

  const filteredBranches =
    selectedArea === 'All'
      ? INITIAL_BRANCHES
      : INITIAL_BRANCHES.filter((b) => b.area === selectedArea)

  const handleSelectBranch = (branch: BranchData) => {
    setActiveBranchId(branch.id)
    setSelectedBranch(branch)
    showToast('Outlet Selected', 'Switched to ' + branch.name)
  }

  // Google Maps embed URL
  const mapEmbedUrl =
    'https://maps.google.com/maps?q=' +
    encodeURIComponent(currentBranch.address + ', ' + currentBranch.name) +
    '&t=&z=15&ie=UTF8&iwloc=&output=embed'

  return (
    <section
      className="py-16 sm:py-24 bg-[#FFF9F6] border-t border-b border-neutral-200/80 relative overflow-hidden"
      data-purpose="branch-locator"
      id="branches"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/20 px-3.5 py-1.5 rounded-full mb-3">
            <Compass className="w-4 h-4 text-brand-red" />
            <span className="text-xs font-black uppercase tracking-wider text-brand-red">
              7 Outlets Across Dhaka &amp; Chittagong
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 uppercase tracking-tight leading-tight">
            Find Your Nearest <span className="text-brand-red">Flame &amp; Feast</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Experience live lava-rock grilling and authentic sealed clay handi biryani across Dhaka &amp; Chittagong. Dine-in, Takeaway &amp; 30-min express doorstep delivery.
          </p>

          {/* Area Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {areas.map((area) => (
              <button
                key={area}
                onClick={() => setSelectedArea(area)}
                type="button"
                className={
                  'px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ' +
                  (selectedArea === area
                    ? 'bg-brand-red text-white shadow-md shadow-brand-red/25 scale-105'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200/80 shadow-xs')
                }
              >
                {area === 'All' ? 'All Outlets (7)' : area}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Dual-Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Panel: Scrollable Outlets List */}
          <div className="lg:col-span-5 flex flex-col space-y-3.5 max-h-[560px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
            {filteredBranches.map((branch) => {
              const isSelected = branch.id === activeBranchId
              return (
                <motion.div
                  key={branch.id}
                  onClick={() => handleSelectBranch(branch)}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className={
                    'p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative ' +
                    (isSelected
                      ? 'bg-white border-brand-red shadow-xl shadow-brand-red/10 ring-2 ring-brand-red/20'
                      : 'bg-white/90 hover:bg-white border-neutral-200/80 hover:border-neutral-300 shadow-sm hover:shadow-md')
                  }
                >
                  {/* Top Row: Name & Active Pill */}
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={
                          'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ' +
                          (isSelected
                            ? 'bg-brand-red text-white shadow-md'
                            : 'bg-neutral-100 text-neutral-600')
                        }
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-sm sm:text-base text-neutral-900 leading-snug">
                          {branch.name}
                        </h4>
                        <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                          {branch.area}
                        </span>
                      </div>
                    </div>

                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 bg-brand-red text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shrink-0 shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" /> Selected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" /> Open
                      </span>
                    )}
                  </div>

                  {/* Address */}
                  <p className="text-xs text-neutral-600 leading-relaxed pl-11 mb-3">
                    {branch.address}
                  </p>

                  {/* Info Meta Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-neutral-100 text-xs text-neutral-500 pl-11">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{branch.hours}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={'tel:' + branch.phone}
                        onClick={(e) => e.stopPropagation()}
                        className="text-brand-red hover:underline font-bold flex items-center gap-1"
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
          <div className="lg:col-span-7 relative flex flex-col min-h-[420px] lg:min-h-[560px] rounded-3xl overflow-hidden border-2 border-neutral-200/80 shadow-xl bg-neutral-100">
            
            {/* Embedded Live Google Map */}
            <iframe
              title={'Map of ' + currentBranch.name}
              src={mapEmbedUrl}
              className="w-full h-full min-h-[420px] lg:min-h-[560px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating Glassmorphic Quick Info Card on Map */}
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-white/60 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-20">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-red text-white flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-black text-sm sm:text-base text-neutral-900 leading-tight">
                    {currentBranch.name}
                  </h4>
                  <p className="text-xs text-neutral-600 mt-0.5 line-clamp-1">
                    {currentBranch.address}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-neutral-500 mt-1 font-semibold">
                    <span className="flex items-center gap-1 text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Open Today
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-brand-dark">
                      <Bike className="w-3.5 h-3.5 text-brand-red" /> ৳{currentBranch.deliveryFee} Express Delivery (~30m)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={currentBranch.mapLink || ('https://maps.google.com/?q=' + encodeURIComponent(currentBranch.address))}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial bg-brand-red hover:bg-brand-darkred text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-brand-red/20 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={'tel:' + currentBranch.phone}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-red" />
                  <span className="hidden sm:inline">Call</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
