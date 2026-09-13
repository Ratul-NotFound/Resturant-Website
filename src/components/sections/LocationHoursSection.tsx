'use client';

import React, { useState, useEffect } from 'react';
import { RESTAURANT_INFO, OPENING_HOURS } from '@/data/restaurantConfig';
import { getLiveRestaurantStatus, LiveStatus } from '@/lib/utils/hours';
import { MapPin, Clock, Phone, Mail, Car, Shield, Sparkles, Navigation } from 'lucide-react';

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
    <section id="location" className="scroll-mt-28 relative py-24 sm:py-32 bg-[#0c0b0a] overflow-hidden text-[#cfc8bc]">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(197,160,89,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-primary/10 border border-gold-primary/30 text-gold-light text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="h-3.5 w-3.5 text-gold-primary" /> Location & Service Schedule
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-champagne mb-4 tracking-tight">
            The Manhattan Sky Sanctum
          </h2>
          <p className="text-xs sm:text-sm text-[#91887b] leading-relaxed font-sans">
            Located on the 30th floor of 432 Park Avenue. Direct elevator access via private white-glove concierge.
          </p>
        </div>

        {/* 2-Column Grid: Hours & Info + Interactive Map Mockup */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Live Hours & Concierge Details */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Live Operational Status Banner */}
            <div className="p-6 rounded-3xl bg-[#141210] border border-gold-primary/30 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-light">
                  Real-Time Service Status
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    liveStatus.isOpen
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      liveStatus.isOpen ? 'bg-emerald-400 animate-ping' : 'bg-neutral-500'
                    }`}
                  />
                  {liveStatus.isOpen ? 'Open Now' : 'Closed'}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-champagne mb-1">
                {liveStatus.statusText}
              </h3>
              <p className="text-xs text-neutral-400">{liveStatus.nextEventText}</p>
            </div>

            {/* Weekly Schedule Table */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141210] border border-gold-primary/20 shadow-xl space-y-3">
              <h4 className="font-serif text-base font-bold text-champagne uppercase tracking-wider mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-gold-primary" /> Weekly Service Hours
              </h4>
              <div className="space-y-2 text-xs">
                {OPENING_HOURS.map((h) => (
                  <div
                    key={h.day}
                    className="flex items-center justify-between py-1.5 border-b border-gold-primary/10 last:border-0"
                  >
                    <span className="font-medium text-[#f7f4ed] w-24">{h.day}</span>
                    <span className="text-[#91887b]">{h.lunch}</span>
                    <span className="text-gold-light font-mono text-right">{h.dinner}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Concierge & White-Glove Valet */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#141210] border border-gold-primary/20">
                <div className="flex items-center gap-2 text-gold-light text-xs font-semibold uppercase tracking-wider mb-2">
                  <Car className="h-4 w-4 text-gold-primary" /> White-Glove Valet
                </div>
                <p className="text-xs text-[#cfc8bc] leading-relaxed">
                  {RESTAURANT_INFO.valetParking}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#141210] border border-gold-primary/20">
                <div className="flex items-center gap-2 text-gold-light text-xs font-semibold uppercase tracking-wider mb-2">
                  <Shield className="h-4 w-4 text-gold-primary" /> Dress Code Policy
                </div>
                <p className="text-xs text-[#cfc8bc] leading-relaxed">
                  {RESTAURANT_INFO.dressCode}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Location Visual Map & Address Card */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Architectural Sky Map Card */}
            <div className="relative h-[340px] sm:h-[400px] w-full rounded-3xl overflow-hidden bg-[#0c0b0a] border border-gold-primary/30 shadow-2xl flex flex-col justify-between p-6 sm:p-8">
              
              {/* Background Luxury Dark Street View Overlay */}
              <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a] via-[#0c0b0a]/70 to-transparent" />

              {/* Pin Centerpiece */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center">
                <div className="relative flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-gold-primary/20 border border-gold-primary animate-ping absolute" />
                  <div className="h-12 w-12 rounded-full bg-gold-primary text-[#0c0b0a] flex items-center justify-center shadow-gold-glow relative z-10">
                    <MapPin className="h-6 w-6" />
                  </div>
                </div>

                <h4 className="font-serif text-2xl font-bold text-champagne mt-4">
                  432 Park Avenue
                </h4>
                <p className="text-xs text-gold-light tracking-widest uppercase mt-1">
                  30th Floor Sky Vault · Manhattan, NY 10022
                </p>
              </div>

              {/* Bottom Quick Directions Link */}
              <div className="relative z-10 pt-4 border-t border-gold-primary/20 flex items-center justify-between">
                <span className="text-xs text-[#91887b]">Between 56th & 57th Streets</span>
                <a
                  href="https://maps.google.com/?q=432+Park+Avenue+New+York"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl gold-button text-xs font-bold uppercase tracking-wider"
                >
                  <Navigation className="h-3.5 w-3.5" /> Open Google Maps
                </a>
              </div>
            </div>

            {/* Direct Contact Inquiries */}
            <div className="p-6 rounded-3xl bg-[#141210] border border-gold-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#0c0b0a] text-gold-primary border border-gold-primary/20">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[#91887b] uppercase text-[10px] block">Concierge Desk</span>
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="font-serif text-base font-bold text-champagne hover:text-gold-hover">
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#0c0b0a] text-gold-primary border border-gold-primary/20">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[#91887b] uppercase text-[10px] block">Private Vault Bookings</span>
                  <a href={`mailto:${RESTAURANT_INFO.reservationsEmail}`} className="font-serif text-sm font-bold text-champagne hover:text-gold-hover">
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
