'use client';

import React, { useState, useEffect } from 'react';
import { RESTAURANT_INFO, OPENING_HOURS } from '@/data/restaurantConfig';
import { getLiveRestaurantStatus, LiveStatus } from '@/lib/utils/hours';
import { MapPin, Clock, Phone, Mail, Car, Shield, Navigation } from 'lucide-react';

export function LocationHoursSection() {
  const [liveStatus, setLiveStatus] = useState<LiveStatus>({
    isOpen: true,
    statusText: 'Open for Dinner Service',
    nextEventText: 'Kitchen closes at 11:30 PM',
  });

  useEffect(() => {
    setLiveStatus(getLiveRestaurantStatus());
    const timer = setInterval(() => {
      setLiveStatus(getLiveRestaurantStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="location" className="scroll-mt-28 relative py-24 sm:py-32 overflow-hidden" style={{ background: '#fafaf8' }}>
      
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(58,125,68,0.07) 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />
      <div className="absolute top-0 left-0 w-[350px] h-[350px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(232,48,42,0.05) 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8302a]/08 border border-[#e8302a]/20 text-[#e8302a] text-[10px] uppercase tracking-[0.3em] font-bold mb-5">
            <MapPin className="h-3 w-3" /> Location &amp; Service Schedule
          </div>
          <h2 className="headline-display text-3xl sm:text-5xl mb-5">
            The Manhattan <span className="italic text-gradient-red">Sky Sanctum</span>
          </h2>
          <p className="text-[#666] text-sm leading-relaxed max-w-xl mx-auto">
            Situated on the 30th floor of 432 Park Avenue. Direct elevator access via private white-glove concierge.
          </p>
        </div>

        {/* 2-Column Grid: Hours & Info + Architectural Map Card */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Live Hours & Concierge Details */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Live Operational Status Banner */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-black/10 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold">
                  Operational Service Status
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-bold ${
                    liveStatus.isOpen
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                      : 'bg-neutral-100 text-neutral-600 border border-neutral-300'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      liveStatus.isOpen ? 'bg-emerald-500 animate-ping' : 'bg-neutral-400'
                    }`}
                  />
                  {liveStatus.isOpen ? 'Open For Service' : 'Cellar Rest'}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-neutral-900 mb-1 tracking-wide">
                {liveStatus.statusText}
              </h3>
              <p className="text-xs text-neutral-500 font-medium">{liveStatus.nextEventText}</p>
            </div>

            {/* Weekly Schedule Table */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-lg space-y-4">
              <h4 className="font-serif text-sm font-bold text-neutral-900 uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-red" /> Weekly Service Hours
              </h4>
              <div className="space-y-2 text-xs">
                {OPENING_HOURS.map((h) => (
                  <div
                    key={h.day}
                    className="flex items-center justify-between py-2.5 border-b border-neutral-100 last:border-0"
                  >
                    <span className="text-neutral-900 w-24 font-semibold">{h.day}</span>
                    <span className="text-neutral-500">{h.lunch}</span>
                    <span className="text-neutral-900 font-mono font-bold text-right">{h.dinner}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Concierge & White-Glove Valet */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-black/10 shadow-sm">
                <div className="flex items-center gap-2 text-brand-red text-[11px] font-bold uppercase tracking-[0.15em] mb-2">
                  <Car className="h-4 w-4" /> White-Glove Valet
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  {RESTAURANT_INFO.valetParking}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-black/10 shadow-sm">
                <div className="flex items-center gap-2 text-brand-red text-[11px] font-bold uppercase tracking-[0.15em] mb-2">
                  <Shield className="h-4 w-4" /> Dress Code Policy
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  {RESTAURANT_INFO.dressCode}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Sky Map Card & Inquiries */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Architectural Sky Map Card */}
            <div className="relative h-[340px] sm:h-[400px] w-full rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl flex flex-col justify-between p-6 sm:p-8 text-white">
              
              {/* Subtle architectural grid pattern */}
              <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              {/* Pin Centerpiece */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center">
                <div className="relative flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-brand-red/20 border border-brand-red/50 animate-ping absolute" />
                  <div className="h-12 w-12 rounded-full bg-brand-red text-white flex items-center justify-center shadow-lg relative z-10">
                    <MapPin className="h-6 w-6" />
                  </div>
                </div>

                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-5 tracking-wide">
                  432 Park Avenue
                </h4>
                <p className="text-[11px] text-red-300 font-bold tracking-[0.25em] uppercase mt-1">
                  30th Floor Sky Vault · Manhattan, NY 10022
                </p>
              </div>

              {/* Bottom Quick Directions Link */}
              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-medium">Between 56th & 57th Streets</span>
                <a
                  href="https://maps.google.com/?q=432+Park+Avenue+New+York"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-[0.15em] shadow-md transition-all"
                >
                  <Navigation className="h-3.5 w-3.5" /> View Directions
                </a>
              </div>
            </div>

            {/* Direct Contact Inquiries */}
            <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-2xl bg-red-50 text-brand-red border border-red-100">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-neutral-500 uppercase text-[9px] font-bold tracking-[0.2em] block">Concierge Desk</span>
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="font-serif text-sm font-bold text-neutral-900 hover:text-brand-red transition-colors">
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-2xl bg-red-50 text-brand-red border border-red-100">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-neutral-500 uppercase text-[9px] font-bold tracking-[0.2em] block">Private Vault Bookings</span>
                  <a href={`mailto:${RESTAURANT_INFO.reservationsEmail}`} className="font-serif text-xs font-bold text-neutral-900 hover:text-brand-red transition-colors">
                    {RESTAURANT_INFO.reservationsEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
