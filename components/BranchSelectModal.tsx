'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, X, Phone, Clock, CheckCircle2 } from 'lucide-react'
import { useStore } from '@/lib/store'
import { INITIAL_BRANCHES, BranchData } from '@/lib/data'

interface BranchSelectModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BranchSelectModal({ isOpen, onClose }: BranchSelectModalProps) {
  const { selectedBranch, setSelectedBranch, showToast } = useStore()

  const handleSelect = (branch: BranchData) => {
    setSelectedBranch(branch)
    showToast('Branch Selected', `Switched to ${branch.name}`)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-neutral-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4 bg-brand-cream/60">
              <div className="flex items-center space-x-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red text-white shadow-sm">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-brand-dark">Select Your Outlet</h3>
                  <p className="text-xs text-neutral-500">Pick nearest branch for takeaway or fast delivery</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* List */}
            <div className="max-h-[60vh] overflow-y-auto p-6 space-y-3">
              {INITIAL_BRANCHES.map((branch) => {
                const isSelected = selectedBranch.id === branch.id
                return (
                  <div
                    key={branch.id}
                    onClick={() => handleSelect(branch)}
                    className={`group cursor-pointer rounded-2xl p-4 transition-all duration-200 border ${
                      isSelected
                        ? 'border-brand-red bg-red-50/60 shadow-sm'
                        : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-sm text-brand-dark group-hover:text-brand-red transition-colors">
                            {branch.name}
                          </h4>
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                            Open
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 leading-relaxed">{branch.address}</p>
                        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-neutral-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-amber-500" /> {branch.hours}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-brand-red" /> {branch.phone}
                          </span>
                          <span className="font-semibold text-brand-dark">
                            Delivery Fee: ৳{branch.deliveryFee}
                          </span>
                        </div>
                      </div>

                      {isSelected ? (
                        <CheckCircle2 className="h-5 w-5 text-brand-red shrink-0 ml-3" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-neutral-300 group-hover:border-brand-red shrink-0 ml-3 transition-colors" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-neutral-100 px-6 py-3.5 bg-neutral-50 flex items-center justify-between text-xs text-neutral-500">
              <span>Looking for nationwide corporate catering?</span>
              <a href="tel:16588" className="font-bold text-brand-red hover:underline">
                Call 16588
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
