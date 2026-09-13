'use client';

import React from 'react';
import { ReservationRecord } from '@/lib/types';
import { formatDateReadable, formatCurrency } from '@/lib/utils/formatting';
import { X, QrCode, Calendar, Clock, MapPin, Users, Award, Download, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '@/data/restaurantConfig';

interface ReservationPassModalProps {
  booking: ReservationRecord | null;
  onClose: () => void;
}

export function ReservationPassModal({ booking, onClose }: ReservationPassModalProps) {
  if (!booking) return null;

  const areaTitles: Record<string, string> = {
    atrium: 'The Grand Atrium',
    vault: 'The Obsidian Vault',
    counter: 'The Chef’s Omakase Counter',
    terrace: 'The Heated Sky Terrace',
  };

  const handleDownloadPass = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-lg my-auto rounded-3xl bg-gradient-to-b from-obsidian-900 to-obsidian-950 border border-gold-primary/50 shadow-2xl p-6 sm:p-8 animate-slide-up text-champagne"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          aria-label="Close pass"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center pb-6 border-b border-gold-primary/20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-primary/10 border border-gold-primary/30 text-gold-hover text-[10px] uppercase tracking-widest font-semibold mb-2">
            <CheckCircle2 className="h-3 w-3 text-gold-primary" /> Confirmed Table Reservation
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-widest text-champagne">A U R A</h2>
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold-light mt-0.5">
            ★★★ Three Michelin Stars · Haute Gastronomie
          </p>
        </div>

        {/* Boarding Pass Body */}
        <div className="py-6 space-y-6">
          {/* Reference & Guest Name */}
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest block">Distinguished Guest</span>
              <h3 className="font-serif text-xl font-bold text-champagne">{booking.guestName}</h3>
              <p className="text-xs text-neutral-400">{booking.guestEmail}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest block">Booking Code</span>
              <span className="font-mono text-sm font-bold text-gold-primary bg-gold-primary/10 px-2.5 py-1 rounded border border-gold-primary/30">
                {booking.bookingReference}
              </span>
            </div>
          </div>

          {/* Details 2x2 Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-obsidian-950 border border-neutral-800 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 uppercase flex items-center gap-1">
                <Calendar className="h-3 w-3 text-gold-light" /> Dining Date
              </span>
              <p className="font-medium text-neutral-200">{formatDateReadable(booking.date)}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 uppercase flex items-center gap-1">
                <Clock className="h-3 w-3 text-gold-light" /> Seating Time
              </span>
              <p className="font-medium text-neutral-200">{booking.timeSlot}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 uppercase flex items-center gap-1">
                <MapPin className="h-3 w-3 text-gold-light" /> Salon & Atmosphere
              </span>
              <p className="font-medium text-gold-hover capitalize">{areaTitles[booking.seatingArea] || booking.seatingArea}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 uppercase flex items-center gap-1">
                <Users className="h-3 w-3 text-gold-light" /> Party Size
              </span>
              <p className="font-medium text-neutral-200">{booking.partySize} Distinguished Guests</p>
            </div>
          </div>

          {/* QR Code Pass Box */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white text-obsidian-950 shadow-inner">
            <div className="p-3 bg-obsidian-950 text-gold-primary rounded-xl mb-3 shadow-md">
              <QrCode className="h-28 w-28" />
            </div>
            <span className="font-mono text-xs tracking-wider uppercase font-bold text-neutral-800">
              {booking.bookingReference}
            </span>
            <p className="text-[10px] text-neutral-500 mt-1 text-center">
              Present this digital pass to the Maître d’ upon arrival on the 30th floor.
            </p>
          </div>

          {/* Notes & Dress Code Alert */}
          <div className="text-[11px] text-neutral-400 space-y-1 border-t border-neutral-800 pt-4">
            <p><strong className="text-neutral-300">Dress Code:</strong> {RESTAURANT_INFO.dressCode}</p>
            <p><strong className="text-neutral-300">Valet Concierge:</strong> {RESTAURANT_INFO.valetParking}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex gap-3">
          <button
            onClick={handleDownloadPass}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl gold-button text-xs font-bold uppercase tracking-wider shadow-gold-glow"
          >
            <Download className="h-4 w-4" /> Save / Print Pass
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl gold-button-outline text-xs font-bold uppercase tracking-wider"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
