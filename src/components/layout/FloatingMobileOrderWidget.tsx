'use client';

import React from 'react';

export function FloatingMobileOrderWidget() {
  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-neutral-200 p-3 flex sm:hidden items-center justify-between shadow-2xl"
      data-purpose="mobile-order-bar"
    >
      <a
        className="flex items-center text-xs font-bold text-brand-dark bg-neutral-100 hover:bg-neutral-200 px-4 py-2.5 rounded-full transition"
        href="tel:16588"
      >
        <i className="fa-solid fa-phone text-brand-red mr-2" /> 16588
      </a>
      <a
        className="bg-brand-red text-white text-xs font-black uppercase px-6 py-2.5 rounded-full shadow-lg flex items-center hover:bg-brand-darkred transition active:scale-95"
        href="#portion-section"
      >
        <i className="fa-solid fa-utensils mr-2" /> View Menu • Order
      </a>
    </aside>
  );
}
