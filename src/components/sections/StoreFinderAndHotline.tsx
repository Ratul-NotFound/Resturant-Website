'use client';

import React, { useState } from 'react';

const BRANCHES = [
  {
    name: 'Dhanmondi Branch (Satmasjid Road)',
    address: 'House 42, Road 7/A, Satmasjid Road, Dhanmondi, Dhaka',
    phone: '09612-444888 (Ext 1)',
    mapUrl: 'https://maps.google.com/?q=Dhanmondi+Satmasjid+Road+Dhaka',
  },
  {
    name: 'Gulshan 2 (Pink City Arcade)',
    address: 'Level 4, Pink City Shopping Complex, Gulshan-2, Dhaka',
    phone: '09612-444888 (Ext 2)',
    mapUrl: 'https://maps.google.com/?q=Pink+City+Gulshan+2+Dhaka',
  },
  {
    name: 'Banani 11 (Food Avenue)',
    address: 'Plot 78, Block D, Road 11, Banani, Dhaka',
    phone: '09612-444888 (Ext 3)',
    mapUrl: 'https://maps.google.com/?q=Road+11+Banani+Dhaka',
  },
  {
    name: 'Uttara Sector 7 (Lake Drive)',
    address: 'House 18, Lake Drive Road, Sector 7, Uttara, Dhaka',
    phone: '09612-444888 (Ext 4)',
    mapUrl: 'https://maps.google.com/?q=Sector+7+Uttara+Dhaka',
  },
];

export function StoreFinderAndHotline() {
  const [selectedBranchIndex, setSelectedBranchIndex] = useState(0);

  const handleOpenMap = () => {
    const branch = BRANCHES[selectedBranchIndex] || BRANCHES[0];
    window.open(branch.mapUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      className="py-14 bg-white border-b border-neutral-200"
      data-purpose="branch-locator"
      id="branches"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-red-50 via-white to-amber-50 rounded-3xl p-8 border border-neutral-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Icon & Information */}
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 rounded-2xl bg-brand-red text-white flex items-center justify-center text-3xl shadow-md shrink-0">
              <i className="fa-solid fa-map-location-dot" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-brand-dark">
                Find Your Nearest Branch • Galito&apos;s &amp; Feast
              </h3>
              <p className="text-sm text-neutral-600 mt-0.5">
                12 Locations across Dhanmondi, Gulshan, Banani, Uttara &amp; Mirpur with dine-in and pickup.
              </p>
            </div>
          </div>

          {/* Right Select & Button */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={selectedBranchIndex}
              onChange={(e) => setSelectedBranchIndex(Number(e.target.value))}
              className="bg-white text-slate-800 text-sm font-semibold border-neutral-300 rounded-xl px-4 py-3 focus:ring-brand-red focus:border-brand-red shadow-sm w-full sm:w-auto"
            >
              {BRANCHES.map((b, idx) => (
                <option key={b.name} value={idx}>
                  {b.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleOpenMap}
              className="bg-brand-red hover:bg-brand-darkred text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition w-full sm:w-auto flex items-center justify-center space-x-2"
            >
              <i className="fa-solid fa-diamond-turn-right" />
              <span>View Branch Map</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
