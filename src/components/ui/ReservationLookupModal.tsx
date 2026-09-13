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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-lg my-auto rounded-3xl bg-[#141210] border border-gold-primary/30 shadow-2xl p-6 sm:p-8 animate-slide-up text-[#f7f4ed]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#1a1714] text-[#91887b] hover:text-[#f7f4ed] transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-primary/10 border border-gold-primary/30 text-gold-light text-[10px] uppercase tracking-widest font-semibold mb-2">
            <Search className="h-3 w-3 text-gold-primary" /> Concierge Registry
          </div>
          <h3 className="font-serif text-2xl font-bold text-champagne">Manage Existing Reservation</h3>
          <p className="text-xs text-[#91887b] mt-1">
            Access your digital pass, check table allocation status, or request changes.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleLookup} className="space-y-3 mb-6">
          <div>
            <label className="text-[11px] font-semibold text-[#cfc8bc] uppercase tracking-wider block mb-1">
              Booking Reference Code (e.g. AURA-2026-7849)
            </label>
            <input
              type="text"
              placeholder="AURA-2026-XXXX"
              value={bookingRef}
              onChange={(e) => setBookingRef(e.target.value.toUpperCase())}
              maxLength={40}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0c0b0a] border border-gold-primary/20 text-xs font-mono text-[#f7f4ed] placeholder-[#91887b] uppercase focus:outline-none focus:border-gold-primary"
            />
          </div>

          <div className="text-center text-[11px] text-[#91887b] uppercase tracking-widest">
            — OR BY EMAIL —
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#cfc8bc] uppercase tracking-wider block mb-1">
              Guest Email Address
            </label>
            <input
              type="email"
              placeholder="guest@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={254}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0c0b0a] border border-gold-primary/20 text-xs text-[#f7f4ed] placeholder-[#91887b] focus:outline-none focus:border-gold-primary"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl gold-button text-xs font-bold uppercase tracking-wider shadow-gold-glow disabled:opacity-50"
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
          <div className="p-5 rounded-2xl bg-[#0c0b0a] border border-gold-primary/30 space-y-4 animate-fade-in">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] text-[#91887b] uppercase tracking-widest block">Guest Name</span>
                <h4 className="font-serif text-lg font-bold text-champagne">{foundBooking.guestName}</h4>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  foundBooking.status === 'CONFIRMED'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}
              >
                {foundBooking.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-[#cfc8bc] border-t border-b border-gold-primary/10 py-3">
              <div>
                <span className="text-[10px] text-[#91887b] block uppercase">Date & Time</span>
                <span className="font-medium text-[#f7f4ed]">{formatDateReadable(foundBooking.date)} at {foundBooking.timeSlot}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#91887b] block uppercase">Salon & Guests</span>
                <span className="font-medium text-[#f7f4ed] capitalize">{foundBooking.seatingArea} · {foundBooking.partySize} Guests</span>
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
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl gold-button text-xs font-bold uppercase tracking-wider shadow-gold-sm"
              >
                <QrCode className="h-4 w-4" /> View Digital Pass
              </button>

              {foundBooking.status !== 'CANCELLED' && (
                <button
                  type="button"
                  disabled={isCancelling}
                  onClick={handleCancelBooking}
                  className="px-4 py-2.5 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 hover:bg-rose-900/60 text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  {isCancelling ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Ban className="h-3.5 w-3.5" />}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
