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
    <section id="location" className="scroll-mt-28 relative py-28 sm:py-36 bg-[#0c0b0a] overflow-hidden text-[#cfc8bc]">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(197,160,89,0.04),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141210] border border-gold-primary/20 text-gold-light text-[10px] uppercase tracking-[0.3em] mb-4">
            <Sparkles className="h-3 w-3 text-gold-primary" /> Location & Service Schedule
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-champagne mb-4 tracking-[0.15em] uppercase">
            The Manhattan Sky Sanctum
          </h2>
          <p className="text-xs sm:text-sm text-[#91887b] leading-relaxed font-sans font-light max-w-xl mx-auto">
            Situated on the 30th floor of 432 Park Avenue. Direct elevator access via private white-glove concierge.
          </p>
        </div>

        {/* 2-Column Grid: Hours & Info + Architectural Map Card */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Live Hours & Concierge Details */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Live Operational Status Banner */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#141210] border border-gold-primary/20 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-light/90 font-medium">
                  Operational Service Status
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-medium ${
                    liveStatus.isOpen
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                      : 'bg-neutral-800/80 text-neutral-400 border border-neutral-700'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      liveStatus.isOpen ? 'bg-emerald-400 animate-ping' : 'bg-neutral-500'
                    }`}
                  />
                  {liveStatus.isOpen ? 'Open For Service' : 'Cellar Rest'}
                </span>
              </div>

              <h3 className="font-serif text-lg font-light text-champagne mb-1 tracking-wide">
                {liveStatus.statusText}
              </h3>
              <p className="text-xs text-[#91887b] font-light">{liveStatus.nextEventText}</p>
            </div>

            {/* Weekly Schedule Table */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141210] border border-gold-primary/15 shadow-xl space-y-4">
              <h4 className="font-serif text-sm font-normal text-champagne uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-gold-primary" /> Weekly Service Hours
              </h4>
              <div className="space-y-2 text-xs font-light">
                {OPENING_HOURS.map((h) => (
                  <div
                    key={h.day}
                    className="flex items-center justify-between py-2 border-b border-gold-primary/10 last:border-0"
                  >
                    <span className="text-[#f7f4ed] w-24 font-normal">{h.day}</span>
                    <span className="text-[#91887b]">{h.lunch}</span>
                    <span className="text-gold-light/90 font-mono text-right">{h.dinner}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Concierge & White-Glove Valet */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#141210] border border-gold-primary/15">
                <div className="flex items-center gap-2 text-gold-light text-[10px] font-medium uppercase tracking-[0.2em] mb-2">
                  <Car className="h-3.5 w-3.5 text-gold-primary" /> White-Glove Valet
                </div>
                <p className="text-xs text-[#91887b] leading-relaxed font-light">
                  {RESTAURANT_INFO.valetParking}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#141210] border border-gold-primary/15">
                <div className="flex items-center gap-2 text-gold-light text-[10px] font-medium uppercase tracking-[0.2em] mb-2">
                  <Shield className="h-3.5 w-3.5 text-gold-primary" /> Dress Code Policy
                </div>
                <p className="text-xs text-[#91887b] leading-relaxed font-light">
                  {RESTAURANT_INFO.dressCode}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Sky Map Card & Inquiries */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Architectural Sky Map Card */}
            <div className="relative h-[340px] sm:h-[400px] w-full rounded-3xl overflow-hidden bg-[#0c0b0a] border border-gold-primary/20 shadow-xl flex flex-col justify-between p-6 sm:p-8">
              
              {/* Subtle architectural grid pattern */}
              <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a] via-[#0c0b0a]/70 to-transparent" />

              {/* Pin Centerpiece */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center">
                <div className="relative flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-gold-primary/10 border border-gold-primary/40 animate-ping absolute" />
                  <div className="h-12 w-12 rounded-full bg-gold-primary text-[#0c0b0a] flex items-center justify-center shadow-gold-sm relative z-10">
                    <MapPin className="h-5 w-5" />
                  </div>
                </div>

                <h4 className="font-serif text-2xl font-light text-champagne mt-5 tracking-wide">
                  432 Park Avenue
                </h4>
                <p className="text-[10px] text-gold-light tracking-[0.25em] uppercase mt-1">
                  30th Floor Sky Vault · Manhattan, NY 10022
                </p>
              </div>

              {/* Bottom Quick Directions Link */}
              <div className="relative z-10 pt-4 border-t border-gold-primary/15 flex items-center justify-between">
                <span className="text-xs text-[#91887b] font-light">Between 56th & 57th Streets</span>
                <a
                  href="https://maps.google.com/?q=432+Park+Avenue+New+York"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full gold-button text-xs font-medium uppercase tracking-[0.15em] shadow-gold-sm hover:shadow-gold-md transition-all"
                >
                  <Navigation className="h-3.5 w-3.5" /> View Coordinates
                </a>
              </div>
            </div>

            {/* Direct Contact Inquiries */}
            <div className="p-6 rounded-3xl bg-[#141210] border border-gold-primary/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-full bg-[#0c0b0a] text-gold-primary border border-gold-primary/20">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[#91887b] uppercase text-[9px] tracking-[0.2em] block">Concierge Desk</span>
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="font-serif text-sm font-normal text-champagne hover:text-gold-hover transition-colors">
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-full bg-[#0c0b0a] text-gold-primary border border-gold-primary/20">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[#91887b] uppercase text-[9px] tracking-[0.2em] block">Private Vault Bookings</span>
                  <a href={`mailto:${RESTAURANT_INFO.reservationsEmail}`} className="font-serif text-xs font-normal text-champagne hover:text-gold-hover transition-colors">
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
