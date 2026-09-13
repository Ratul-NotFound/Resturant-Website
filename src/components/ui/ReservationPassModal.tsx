'use client';

import React from 'react';
import { ReservationRecord } from '@/lib/types';
import { formatDateReadable } from '@/lib/utils/formatting';
import { X, QrCode, Calendar, Clock, MapPin, Users, Download, CheckCircle2 } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-lg my-auto rounded-3xl bg-white border border-neutral-200 shadow-2xl p-6 sm:p-8 animate-slide-up text-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 border border-neutral-300 transition-colors"
          aria-label="Close pass"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center pb-6 border-b border-neutral-200">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs uppercase tracking-wider font-bold mb-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Confirmed Table Reservation
          </div>
          <h2 className="font-serif text-3xl font-black tracking-[0.2em] text-neutral-900">A U R A</h2>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-red mt-1 font-bold">
            ★★★ Three Michelin Stars · Manhattan Sky Sanctum
          </p>
        </div>

        {/* Boarding Pass Body */}
        <div className="py-6 space-y-6">
          {/* Reference & Guest Name */}
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-bold">Distinguished Guest</span>
              <h3 className="font-serif text-xl font-bold text-neutral-900 tracking-tight">{booking.guestName}</h3>
              <p className="text-xs text-neutral-500 mt-0.5">{booking.guestEmail}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-bold">Booking Code</span>
              <span className="font-mono text-xs font-bold text-brand-red bg-red-50 px-3.5 py-1.5 rounded-full border border-red-200">
                {booking.bookingReference}
              </span>
            </div>
          </div>

          {/* Details 2x2 Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider flex items-center gap-1 font-bold">
                <Calendar className="h-3.5 w-3.5 text-brand-red" /> Dining Date
              </span>
              <p className="font-bold text-neutral-900">{formatDateReadable(booking.date)}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider flex items-center gap-1 font-bold">
                <Clock className="h-3.5 w-3.5 text-brand-red" /> Seating Time
              </span>
              <p className="font-bold text-neutral-900">{booking.timeSlot}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider flex items-center gap-1 font-bold">
                <MapPin className="h-3.5 w-3.5 text-brand-red" /> Salon
              </span>
              <p className="font-bold text-brand-red capitalize">{areaTitles[booking.seatingArea] || booking.seatingArea}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider flex items-center gap-1 font-bold">
                <Users className="h-3.5 w-3.5 text-brand-red" /> Party Size
              </span>
              <p className="font-bold text-neutral-900">{booking.partySize} Guests</p>
            </div>
          </div>

          {/* QR Code Pass Box */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-neutral-50 border border-neutral-200 shadow-inner">
            <div className="p-3.5 bg-white text-neutral-900 rounded-2xl mb-3 shadow-md border border-neutral-200">
              <QrCode className="h-28 w-28 text-neutral-900" />
            </div>
            <span className="font-mono text-xs tracking-widest uppercase font-bold text-neutral-900">
              {booking.bookingReference}
            </span>
            <p className="text-[11px] text-neutral-500 mt-1 text-center font-medium">
              Present this digital pass to the Maître d’ upon arrival on the 30th floor.
            </p>
          </div>

          {/* Calendar Sync Shortcuts */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-xs font-bold text-neutral-800 transition-all"
            >
              <Calendar className="h-3.5 w-3.5 text-brand-red" /> + Google Calendar
            </a>
            <button
              onClick={handleDownloadICS}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-xs font-bold text-neutral-800 transition-all"
            >
              <Download className="h-3.5 w-3.5 text-brand-red" /> + Apple / Outlook
            </button>
          </div>

          {/* Notes & Dress Code Alert */}
          <div className="text-xs text-neutral-500 space-y-1 border-t border-neutral-200 pt-4">
            <p><strong className="text-neutral-900 font-bold">Dress Code:</strong> {RESTAURANT_INFO.dressCode}</p>
            <p><strong className="text-neutral-900 font-bold">Valet Concierge:</strong> {RESTAURANT_INFO.valetParking}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex gap-3">
          <button
            onClick={handleDownloadPass}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all hover:scale-105 active:scale-95"
          >
            <Download className="h-4 w-4" /> Save / Print Pass
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-800 text-xs font-bold uppercase tracking-wider transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
