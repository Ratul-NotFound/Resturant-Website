'use client';

import React, { useState } from 'react';
import { ReservationRecord } from '@/lib/types';
import { formatDateReadable } from '@/lib/utils/formatting';
import { X, Search, QrCode, Calendar, Clock, MapPin, Users, Ban, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from './Toast';
import { Sanitizer } from '@/lib/security/Sanitizer';

interface ReservationLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewBoardingPass: (booking: ReservationRecord) => void;
}

export function ReservationLookupModal({
  isOpen,
  onClose,
  onViewBoardingPass,
}: ReservationLookupModalProps) {
  const { showToast } = useToast();

  const [bookingRef, setBookingRef] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [foundBooking, setFoundBooking] = useState<ReservationRecord | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  if (!isOpen) return null;

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanRef = Sanitizer.cleanText(bookingRef, 40).toUpperCase();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanRef && !cleanEmail) {
      showToast('Please enter your booking reference code or email.', 'error');
      return;
    }

    setIsLoading(true);
    setFoundBooking(null);

    try {
      const res = await fetch(
        `/api/reservations/lookup?ref=${encodeURIComponent(cleanRef)}&email=${encodeURIComponent(cleanEmail)}`
      );
      const data = await res.json();

      if (res.ok && data.success && data.booking) {
        setFoundBooking(data.booking);
        showToast('Reservation retrieved successfully.', 'success');
      } else {
        showToast(data.error || 'No matching reservation found.', 'error', 'Lookup Failed');
      }
    } catch {
      showToast('Network error during lookup. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!foundBooking) return;
    if (!window.confirm(`Are you sure you wish to release table reservation #${foundBooking.bookingReference}?`)) {
      return;
    }

    setIsCancelling(true);

    try {
      const res = await fetch('/api/reservations/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingReference: foundBooking.bookingReference,
          guestEmail: foundBooking.guestEmail,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast(data.message, 'success', 'Reservation Released');
        setFoundBooking((prev) => (prev ? { ...prev, status: 'CANCELLED' } : null));
      } else {
        showToast(data.error || 'Failed to cancel reservation.', 'error');
      }
    } catch {
      showToast('Error cancelling booking.', 'error');
    } finally {
      setIsCancelling(false);
    }
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
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-brand-red text-[10px] uppercase tracking-wider font-bold mb-2">
            <Search className="h-3.5 w-3.5" /> Concierge Registry
          </div>
          <h3 className="font-serif text-2xl font-bold text-neutral-900">Manage Existing Reservation</h3>
          <p className="text-xs text-neutral-500 mt-1">
            Access your digital boarding pass, check table status, or cancel reservation.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleLookup} className="space-y-4 mb-6">
          <div>
            <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1 font-bold">
              Booking Reference Code (e.g. AURA-2026-7849)
            </label>
            <input
              type="text"
              placeholder="AURA-2026-XXXX"
              value={bookingRef}
              onChange={(e) => setBookingRef(e.target.value.toUpperCase())}
              maxLength={40}
              className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-300 text-xs font-mono uppercase text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
            />
          </div>

          <div className="text-center text-[10px] text-neutral-400 font-mono uppercase tracking-widest">
            — OR BY EMAIL —
          </div>

          <div>
            <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1 font-bold">
              Guest Email Address
            </label>
            <input
              type="email"
              placeholder="guest@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={254}
              className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-300 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Querying Registry...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" /> Locate Reservation
              </>
            )}
          </button>
        </form>

        {/* Found Booking Card */}
        {foundBooking && (
          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4 animate-fade-in">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-bold">Guest Name</span>
                <h4 className="font-serif text-lg font-bold text-neutral-900">{foundBooking.guestName}</h4>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  foundBooking.status === 'CONFIRMED'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                    : 'bg-red-50 text-red-700 border border-red-300'
                }`}
              >
                {foundBooking.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-neutral-700 border-t border-b border-neutral-200 py-3">
              <div>
                <span className="text-[10px] text-neutral-500 block uppercase font-bold">Date &amp; Time</span>
                <span className="font-bold text-neutral-900">{formatDateReadable(foundBooking.date)} at {foundBooking.timeSlot}</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 block uppercase font-bold">Salon &amp; Guests</span>
                <span className="font-bold text-neutral-900 capitalize">{foundBooking.seatingArea} · {foundBooking.partySize} Guests</span>
              </div>
            </div>

            {/* Actions for this booking */}
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onViewBoardingPass(foundBooking);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-brand-red/30 transition-all hover:scale-105 active:scale-95"
              >
                <QrCode className="h-4 w-4" /> View Digital Pass
              </button>

              {foundBooking.status !== 'CANCELLED' && (
                <button
                  type="button"
                  disabled={isCancelling}
                  onClick={handleCancelBooking}
                  className="px-4 py-3 rounded-2xl bg-red-100 hover:bg-red-200 border border-red-300 text-red-700 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                  title="Release Table"
                >
                  {isCancelling ? <Loader2 className="h-4 w-4 animate-spin" /> : <Ban className="h-4 w-4" />}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
