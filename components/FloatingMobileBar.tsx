'use client'

import React from 'react'
import { Phone, Utensils, ShoppingBag } from 'lucide-react'
import { useStore } from '@/lib/store'

export default function FloatingMobileBar() {
  const { getItemCount, setCartOpen } = useStore()
  const itemCount = getItemCount()

  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 px-4 py-2.5 sm:hidden flex items-center justify-between shadow-2xl pb-[calc(0.65rem+env(safe-area-inset-bottom,0px))]"
      data-purpose="mobile-order-bar"
    >
      <a
        href="tel:16588"
        className="flex items-center text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 px-3.5 py-2.5 rounded-full transition-transform active:scale-95 shrink-0"
      >
        <Phone className="w-3.5 h-3.5 text-brand-red mr-1.5 shrink-0" />
        <span>16588</span>
      </a>

      {itemCount > 0 ? (
        <button
          onClick={() => setCartOpen(true)}
          type="button"
          className="bg-brand-red active:bg-brand-darkred text-white text-xs font-black uppercase px-5 py-2.5 rounded-full shadow-lg shadow-brand-red/30 flex items-center transition-transform active:scale-95 space-x-2 shrink-0"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>View Tray ({itemCount})</span>
        </button>
      ) : (
        <a
          href="#portion-section"
          className="bg-brand-red active:bg-brand-darkred text-white text-xs font-black uppercase px-5 py-2.5 rounded-full shadow-lg shadow-brand-red/30 flex items-center transition-transform active:scale-95 shrink-0"
        >
          <Utensils className="w-3.5 h-3.5 mr-1.5" />
          <span>Order Menu</span>
        </a>
      )}
    </aside>
  )
}
