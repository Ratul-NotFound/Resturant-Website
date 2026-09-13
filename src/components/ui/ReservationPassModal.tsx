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

  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent("Dinner at AURA (★★★ Three Michelin Stars)");
    const timeClean = booking.timeSlot.includes(':') ? booking.timeSlot : '19:30';
    const [hourStr, minStr] = timeClean.replace(/[^0-9:]/g, '').split(':');
    let h = parseInt(hourStr, 10);
    if (booking.timeSlot.toLowerCase().includes('pm') && h < 12) h += 12;
    const m = parseInt(minStr, 10) || 0;

    const dateFormatted = booking.date.replace(/-/g, '');
    const startHour = String(h).padStart(2, '0');
    const startMin = String(m).padStart(2, '0');
    const endHour = String(Math.min(23, h + 3)).padStart(2, '0');
    const dates = `${dateFormatted}T${startHour}${startMin}00/${dateFormatted}T${endHour}${startMin}00`;

    const details = encodeURIComponent(
      `Confirmed table reservation at AURA (★★★ Three Michelin Stars).\nBooking Code: ${booking.bookingReference}\nSalon: ${areaTitles[booking.seatingArea] || booking.seatingArea}\nParty: ${booking.partySize} Guests\nDress Code: ${RESTAURANT_INFO.dressCode}\nValet: ${RESTAURANT_INFO.valetParking}`
    );
    const location = encodeURIComponent("AURA, 30th Floor Sky Vault, 432 Park Avenue, New York, NY 10022");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//AURA Haute Gastronomie//Table Reservation//EN',
      'BEGIN:VEVENT',
      `UID:aura-${booking.bookingReference}@aurarestaurant.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:Dinner at AURA (★★★ Three Michelin Stars)`,
      `DESCRIPTION:Reservation #${booking.bookingReference}\\nSalon: ${areaTitles[booking.seatingArea] || booking.seatingArea}\\nGuests: ${booking.partySize}\\nDress Code: Formal`,
      `LOCATION:432 Park Avenue\\, 30th Floor\\, New York\\, NY 10022`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `aura-reservation-${booking.bookingReference}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-lg my-auto rounded-3xl bg-gradient-to-b from-[#141210] to-[#0c0b0a] border border-gold-primary/40 shadow-2xl p-6 sm:p-8 animate-slide-up text-champagne"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#1c1916] text-neutral-400 hover:text-white border border-gold-primary/20 transition-colors"
          aria-label="Close pass"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center pb-6 border-b border-gold-primary/20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] uppercase tracking-widest font-semibold mb-2">
            <CheckCircle2 className="h-3 w-3" /> Confirmed Table Reservation
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
              <span className="text-[10px] text-[#91887b] uppercase tracking-widest block">Distinguished Guest</span>
              <h3 className="font-serif text-xl font-bold text-champagne">{booking.guestName}</h3>
              <p className="text-xs text-[#cfc8bc]">{booking.guestEmail}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#91887b] uppercase tracking-widest block">Booking Code</span>
              <span className="font-mono text-sm font-bold text-gold-primary bg-gold-primary/10 px-2.5 py-1 rounded border border-gold-primary/30">
                {booking.bookingReference}
              </span>
            </div>
          </div>

          {/* Details 2x2 Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#0c0b0a] border border-gold-primary/20 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] text-[#91887b] uppercase flex items-center gap-1">
                <Calendar className="h-3 w-3 text-gold-light" /> Dining Date
              </span>
              <p className="font-medium text-neutral-200">{formatDateReadable(booking.date)}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-[#91887b] uppercase flex items-center gap-1">
                <Clock className="h-3 w-3 text-gold-light" /> Seating Time
              </span>
              <p className="font-medium text-neutral-200">{booking.timeSlot}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-[#91887b] uppercase flex items-center gap-1">
                <MapPin className="h-3 w-3 text-gold-light" /> Salon & Atmosphere
              </span>
              <p className="font-medium text-gold-hover capitalize">{areaTitles[booking.seatingArea] || booking.seatingArea}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-[#91887b] uppercase flex items-center gap-1">
                <Users className="h-3 w-3 text-gold-light" /> Party Size
              </span>
              <p className="font-medium text-neutral-200">{booking.partySize} Distinguished Guests</p>
            </div>
          </div>

          {/* QR Code Pass Box */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white text-obsidian-950 shadow-inner">
            <div className="p-3 bg-[#0c0b0a] text-gold-primary rounded-xl mb-3 shadow-md">
              <QrCode className="h-28 w-28" />
            </div>
            <span className="font-mono text-xs tracking-wider uppercase font-bold text-neutral-800">
              {booking.bookingReference}
            </span>
            <p className="text-[10px] text-neutral-500 mt-1 text-center">
              Present this digital pass to the Maître d’ upon arrival on the 30th floor.
            </p>
          </div>

          {/* Calendar Sync Shortcuts */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#141210] border border-gold-primary/25 hover:border-gold-primary text-xs font-semibold text-gold-light hover:text-champagne transition-all"
            >
              <Calendar className="h-3.5 w-3.5 text-gold-primary" /> + Google Calendar
            </a>
            <button
              onClick={handleDownloadICS}
              className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#141210] border border-gold-primary/25 hover:border-gold-primary text-xs font-semibold text-gold-light hover:text-champagne transition-all"
            >
              <Download className="h-3.5 w-3.5 text-gold-primary" /> + Apple / Outlook
            </button>
          </div>

          {/* Notes & Dress Code Alert */}
          <div className="text-[11px] text-[#91887b] space-y-1 border-t border-neutral-800 pt-4">
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
