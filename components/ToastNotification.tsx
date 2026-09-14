'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Info, AlertCircle, X } from 'lucide-react'
import { useStore } from '@/lib/store'

export default function ToastNotification() {
  const { toast, hideToast } = useStore()

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        hideToast()
      }, 3200)
      return () => clearTimeout(timer)
    }
  }, [toast.show, hideToast])

  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed top-5 right-5 z-[9999] flex max-w-sm items-center space-x-3 rounded-2xl border border-neutral-700/80 bg-neutral-900/95 px-4 py-3.5 text-white shadow-2xl backdrop-blur-md"
        >
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white shadow-md ${
              toast.type === 'error'
                ? 'bg-rose-500'
                : toast.type === 'info'
                ? 'bg-sky-500'
                : 'bg-emerald-500'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="h-4 w-4" />
            ) : toast.type === 'info' ? (
              <Info className="h-4 w-4" />
            ) : (
              <Check className="h-4 w-4 stroke-[3]" />
            )}
          </div>

          <div className="flex-1 pr-2">
            <p className="text-xs font-bold leading-tight text-white">{toast.title}</p>
            {toast.description && (
              <p className="mt-0.5 text-[11px] leading-tight text-neutral-300">
                {toast.description}
              </p>
            )}
          </div>

          <button
            onClick={hideToast}
            className="text-neutral-400 hover:text-white transition-colors p-1"
            aria-label="Close notification"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
