'use client';

import React from 'react';

export function BrushAccentFeatureSection() {
  return (
    <section
      className="relative bg-brand-dark text-white pt-24 pb-20 overflow-hidden"
      data-purpose="heritage-feature"
      id="heritage"
    >
      {/* Top Brush Stroke Divider Illusion */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#FFF9F6] to-transparent opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Central Artistic Food Presentation */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="relative inline-block mx-auto mb-6">
            <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-brand-gold/80 shadow-2xl p-1 bg-neutral-900 mx-auto">
              <img
                alt="Hand Crafted Herb Infused Grilled Feast"
                className="w-full h-full object-cover rounded-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuATASda2HjIIgKdDfVgFX-CI_N0z5S_patoNHBTv-tuw_ENxx37KfVoI3N55WjIROK6-9szsofesCninWStIe2boTFUGPu9U582LtYnaexiXyCab2__1qbx6sHV8eqwKPGroXRYgYI6Dds5nOhI0QH8g-NyjabvfFISAO8eKX0vA9HkkSusuC4pzkqBU5Q29dUEqdVwVEsGPRNc09ZvDXgLxRI_FGC49D24sBhSR7AE-ju0Ar-UNbHYWQ"
              />
            </div>
            {/* Decorative Green Herb leaves badge */}
            <span className="absolute -bottom-2 right-4 bg-emerald-700 text-emerald-100 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-400">
              🌿 100% Natural Marination
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            Crafted Fresh Upon Order
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            No microwave shortcuts. Every piece of chicken is flame-grilled over burning charcoals and our kacchi is dum-cooked for 4 hours inside sealed deghs.
          </p>
        </div>

        {/* Feature Pillars (Drawing Card Style from Screenshot 11) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-14 max-w-5xl mx-auto text-neutral-800">
          
          {/* Pillar 1 */}
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:bg-neutral-50 transition border border-neutral-100">
            <div className="w-14 h-14 mx-auto mb-3 bg-red-50 text-brand-red rounded-full flex items-center justify-center text-2xl">
              <i className="fa-solid fa-certificate" />
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base">100% Halal</h4>
            <p className="text-xs text-neutral-500 mt-1">Strictly certified authentic sources</p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:bg-neutral-50 transition border border-neutral-100">
            <div className="w-14 h-14 mx-auto mb-3 bg-amber-50 text-brand-gold rounded-full flex items-center justify-center text-2xl">
              <i className="fa-solid fa-hourglass-half" />
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base">24-Hr Marinade</h4>
            <p className="text-xs text-neutral-500 mt-1">Infused with natural African Bird&apos;s Eye chilies</p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:bg-neutral-50 transition border border-neutral-100">
            <div className="w-14 h-14 mx-auto mb-3 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-2xl">
              <i className="fa-solid fa-fire-flame-curved" />
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base">Open Flame</h4>
            <p className="text-xs text-neutral-500 mt-1">Low-fat, flame-seared caramelization</p>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg hover:bg-neutral-50 transition border border-neutral-100">
            <div className="w-14 h-14 mx-auto mb-3 bg-red-50 text-brand-red rounded-full flex items-center justify-center text-2xl">
              <i className="fa-solid fa-bowl-rice" />
            </div>
            <h4 className="font-display font-bold text-sm sm:text-base">Slow Dum Rice</h4>
            <p className="text-xs text-neutral-500 mt-1">Sealed brass pots with fragrant ghee</p>
          </div>

        </div>

      </div>
    </section>
  );
}
