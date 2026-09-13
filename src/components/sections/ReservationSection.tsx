'use client';

import React, { useState, useEffect } from 'react';
import { SeatingArea, OccasionType, TimeSlot, ReservationRecord } from '@/lib/types';
import { getTomorrowDateString } from '@/lib/utils/formatting';
import { Calendar, Users, MapPin, Clock, User, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '../ui/Toast';
import { Sanitizer } from '@/lib/security/Sanitizer';

interface ReservationSectionProps {
  initialArea?: SeatingArea;
  onBookingConfirmed: (record: ReservationRecord) => void;
}

const AREAS: Array<{ id: SeatingArea; name: string; desc: string }> = [
  { id: 'atrium', name: 'The Grand Atrium', desc: 'Glass-domed starlight dining' },
  { id: 'vault', name: 'The Obsidian Vault', desc: 'Subterranean private granite vaults' },
  { id: 'counter', name: 'Chef’s Omakase Counter', desc: '12-seat Hinoki live hearth' },
  { id: 'terrace', name: 'The Heated Sky Terrace', desc: 'Skyline views with fire pits' },
];

const OCCASIONS: Array<{ id: OccasionType; label: string }> = [
  { id: 'none', label: 'Standard Dining' },
  { id: 'anniversary', label: 'Anniversary' },
  { id: 'birthday', label: 'Birthday Celebration' },
  { id: 'romance', label: 'Romantic Date' },
  { id: 'business', label: 'Executive Business' },
  { id: 'celebration', label: 'Special Occasion' },
];

export function ReservationSection({
  initialArea = 'atrium',
  onBookingConfirmed,
}: ReservationSectionProps) {
  const { showToast } = useToast();

  const [step, setStep] = useState(1);
  const [partySize, setPartySize] = useState(2);
  const [date, setDate] = useState(getTomorrowDateString());
  const [seatingArea, setSeatingArea] = useState<SeatingArea>(initialArea);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [latestConfirmed, setLatestConfirmed] = useState<ReservationRecord | null>(null);

  // Guest Details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [occasion, setOccasion] = useState<OccasionType>('none');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update area if passed from parent
  useEffect(() => {
    if (initialArea) {
      setSeatingArea(initialArea);
    }
  }, [initialArea]);

  // Fetch live slots whenever Date, Area, or Party Size changes
  useEffect(() => {
    async function fetchSlots() {
      if (!date || !seatingArea) return;
      setIsLoadingSlots(true);
      setSelectedSlot(''); // Reset selection on date/area change
      try {
        const res = await fetch(
          `/api/reservations/slots?date=${date}&area=${seatingArea}&partySize=${partySize}`
        );
        const data = await res.json();
        if (data.success && Array.isArray(data.slots)) {
          setAvailableSlots(data.slots);
          const firstAvail = data.slots.find((s: TimeSlot) => s.status !== 'WAITLIST');
          if (firstAvail) setSelectedSlot(firstAvail.time);
        }
      } catch {
        setAvailableSlots([]);
      } finally {
        setIsLoadingSlots(false);
      }
    }

    fetchSlots();
  }, [date, seatingArea, partySize]);

  const handleNextStep = () => {
    if (step === 1 && (!date || partySize < 1)) {
      showToast('Please select party size and date.', 'error');
      return;
    }
    if (step === 2 && !seatingArea) {
      showToast('Please select a dining salon.', 'error');
      return;
    }
    if (step === 3 && !selectedSlot) {
      showToast('Please select an available seating time.', 'error');
      return;
    }
    setStep((prev) => Math.min(4, prev + 1));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleResetBookingWizard = () => {
    setLatestConfirmed(null);
    setStep(1);
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setDietaryNotes('');
    setOccasion('none');
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!Sanitizer.validateName(guestName)) {
      showToast('Please provide a valid guest name (2–80 letters).', 'error');
      return;
    }
    if (!Sanitizer.validateEmail(guestEmail)) {
      showToast('Please provide a valid email address.', 'error');
      return;
    }
    if (!Sanitizer.validatePhone(guestPhone)) {
      showToast('Please provide a valid phone number.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/reservations/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partySize,
          date,
          seatingArea,
          timeSlot: selectedSlot,
          guestName: Sanitizer.cleanText(guestName, 80),
          guestEmail: guestEmail.trim().toLowerCase(),
          guestPhone: guestPhone.trim(),
          occasion,
          dietaryNotes: Sanitizer.cleanText(dietaryNotes, 500),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast('Your reservation at AURA has been confirmed.', 'success', 'Table Reserved');
        setLatestConfirmed(data.booking);
        onBookingConfirmed(data.booking);
      } else {
        showToast(data.error || 'Booking could not be processed.', 'error', 'Reservation Notice');
      }
    } catch {
      showToast('Connection error. Please try again.', 'error', 'Error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reservations" className="scroll-mt-28 relative py-24 sm:py-32 overflow-hidden" style={{ background: '#fafaf8' }}>
      
      {/* Background blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(232,48,42,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8302a]/08 border border-[#e8302a]/20 text-[#e8302a] text-[10px] uppercase tracking-[0.3em] font-bold mb-5">
            Dining Reservations
          </div>
          <h2 className="headline-display text-3xl sm:text-5xl mb-5">
            Reserve Your <span className="italic text-gradient-red">Table</span>
          </h2>
          <p className="text-[#666] text-sm leading-relaxed max-w-xl mx-auto">
            We welcome guests for dinner and tasting experiences. Reservations are released sixty days in advance.
          </p>
        </div>

        {/* Wizard Card */}
        <div className="rounded-3xl bg-white border border-black/07 shadow-xl p-6 sm:p-10">
          
          {/* Progress Steps Header */}
          <div className="grid grid-cols-4 gap-2 mb-8 pb-6 border-b border-black/08 text-xs">
            {[
              { num: 1, label: 'Guests & Date' },
              { num: 2, label: 'Salon' },
              { num: 3, label: 'Seating Time' },
              { num: 4, label: 'Guest Details' },
            ].map((st) => (
              <div
                key={st.num}
                className={`flex flex-col items-center text-center cursor-pointer transition-colors ${
                  step >= st.num ? 'text-[#e8302a]' : 'text-[#bbb]'
                }`}
                onClick={() => {
                  if (st.num < step) setStep(st.num);
                }}
              >
                <div
                  className={`h-7 w-7 rounded-full flex items-center justify-center font-mono text-xs mb-1.5 transition-all ${
                    step === st.num
                      ? 'bg-[#e8302a] text-white font-bold shadow-md shadow-red-500/30'
                      : step > st.num
                      ? 'bg-[#e8302a]/10 text-[#e8302a] border border-[#e8302a]/30'
                      : 'bg-[#f5f5f5] text-[#aaa] border border-black/08'
                  }`}
                >
                  {step > st.num ? '✓' : `0${st.num}`}
                </div>
                <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider">{st.label}</span>
              </div>
            ))}
          </div>

          {latestConfirmed ? (
            <div className="py-8 text-center space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs font-bold uppercase tracking-widest">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Table Confirmed &amp; Guaranteed
              </div>
              <div>
                <h3 className="font-serif text-3xl font-bold text-neutral-900">
                  We Await Your Arrival, {latestConfirmed.guestName}
                </h3>
                <p className="text-xs text-neutral-500 mt-1 font-mono uppercase tracking-widest">
                  Booking Reference: <span className="text-brand-red font-bold">{latestConfirmed.bookingReference}</span>
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 max-w-md mx-auto grid grid-cols-2 gap-4 text-xs text-left">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block font-mono font-bold">Dining Date</span>
                  <span className="font-serif font-bold text-neutral-900">{latestConfirmed.date}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block font-mono font-bold">Seating Time</span>
                  <span className="font-serif font-bold text-neutral-900">{latestConfirmed.timeSlot}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block font-mono font-bold">Dining Salon</span>
                  <span className="font-serif font-bold text-brand-red capitalize">{latestConfirmed.seatingArea}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block font-mono font-bold">Party</span>
                  <span className="font-serif font-bold text-neutral-900">{latestConfirmed.partySize} Guests</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => onBookingConfirmed(latestConfirmed)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all hover:scale-105 active:scale-95"
                >
                  View Digital Boarding Pass
                </button>
                <button
                  onClick={handleResetBookingWizard}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-800 text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Book Another Table
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: PARTY SIZE & DATE */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-serif text-xl font-bold text-neutral-900">
                    Select Guests &amp; Dining Date
                  </h3>

                  {/* Party Size Selector */}
                  <div>
                    <label className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block mb-2 font-bold">
                      Number of Guests
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setPartySize(size)}
                          className={`py-3 rounded-2xl text-xs font-bold transition-all ${
                            partySize === size
                              ? 'bg-brand-red text-white shadow-md shadow-brand-red/30 scale-105'
                              : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-200'
                          }`}
                        >
                          {size} {size === 1 ? 'Guest' : 'Guests'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Calendar Date Input */}
                  <div>
                    <label className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block mb-2 font-bold">
                      Calendar Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      min={getTomorrowDateString()}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-2xl bg-neutral-50 border border-neutral-300 text-sm font-medium text-neutral-900 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-8 py-3.5 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all hover:scale-105 active:scale-95"
                    >
                      Continue to Salons →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: SALON & ATMOSPHERE SELECTION */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-serif text-xl font-bold text-neutral-900">
                    Choose Dining Salon
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {AREAS.map((area) => (
                      <div
                        key={area.id}
                        onClick={() => setSeatingArea(area.id)}
                        className={`p-5 rounded-2xl cursor-pointer border-2 transition-all ${
                          seatingArea === area.id
                            ? 'bg-red-50/70 border-brand-red shadow-md shadow-brand-red/10 scale-[1.02]'
                            : 'bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <h4 className="font-serif text-base font-bold text-neutral-900">{area.name}</h4>
                          {seatingArea === area.id && (
                            <CheckCircle2 className="h-5 w-5 text-brand-red" />
                          )}
                        </div>
                        <p className="text-xs text-neutral-500 leading-relaxed">{area.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-6 py-3 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-700 text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-8 py-3.5 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all hover:scale-105 active:scale-95"
                    >
                      Continue to Times →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: TIME SLOTS */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="font-serif text-xl font-bold text-neutral-900">
                    Select Table Seating Time
                  </h3>

                  {isLoadingSlots ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center">
                      <Loader2 className="h-6 w-6 text-brand-red animate-spin mb-2" />
                      <p className="text-xs text-neutral-500 font-mono">Querying table capacity...</p>
                    </div>
                  ) : availableSlots.length === 0 ? (
                    <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-200 text-center">
                      <AlertCircle className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                      <p className="text-xs text-neutral-600 mb-4">
                        No open tables remaining for the chosen date and salon.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-2.5 rounded-2xl bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-bold uppercase"
                      >
                        Select Another Date
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {availableSlots.map((slot) => {
                        const isWaitlist = slot.status === 'WAITLIST';
                        const isSelected = selectedSlot === slot.time;

                        return (
                          <button
                            key={slot.time}
                            type="button"
                            disabled={isWaitlist}
                            onClick={() => setSelectedSlot(slot.time)}
                            className={`p-3.5 rounded-2xl border-2 text-center transition-all ${
                              isSelected
                                ? 'bg-brand-red text-white font-bold border-brand-red shadow-lg shadow-brand-red/30 scale-105'
                                : isWaitlist
                                ? 'bg-neutral-100 border-neutral-200 text-neutral-400 opacity-50 cursor-not-allowed'
                                : 'bg-white border-neutral-200 text-neutral-900 hover:border-neutral-300 hover:bg-neutral-50'
                            }`}
                          >
                            <span className="font-serif text-sm block font-bold">{slot.label}</span>
                            <span
                              className={`text-[9px] mt-0.5 block uppercase tracking-wider font-mono font-bold ${
                                isSelected
                                  ? 'text-white/90'
                                  : slot.status === 'FEW_LEFT'
                                  ? 'text-amber-600'
                                  : isWaitlist
                                  ? 'text-neutral-400'
                                  : 'text-emerald-600'
                              }`}
                            >
                              {slot.status === 'FEW_LEFT'
                                ? `Only ${slot.remaining} Left`
                                : slot.status === 'WAITLIST'
                                ? 'Booked'
                                : 'Available'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-6 py-3 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-700 text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      disabled={!selectedSlot}
                      onClick={handleNextStep}
                      className="px-8 py-3.5 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-40"
                    >
                      Guest Details →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: GUEST INFORMATION & SUBMISSION */}
              {step === 4 && (
                <form onSubmit={handleSubmitBooking} className="space-y-6 animate-fade-in">
                  <h3 className="font-serif text-xl font-bold text-neutral-900">
                    Guest Details
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1 font-bold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Lady Genevieve Sterling"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        maxLength={80}
                        className="w-full px-4 py-3.5 rounded-2xl bg-neutral-50 border border-neutral-300 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1 font-bold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="genevieve@sterling.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        maxLength={254}
                        className="w-full px-4 py-3.5 rounded-2xl bg-neutral-50 border border-neutral-300 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1 font-bold">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (212) 555-0199"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        maxLength={16}
                        className="w-full px-4 py-3.5 rounded-2xl bg-neutral-50 border border-neutral-300 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1 font-bold">
                        Dining Occasion
                      </label>
                      <select
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value as OccasionType)}
                        className="w-full px-4 py-3.5 rounded-2xl bg-neutral-50 border border-neutral-300 text-xs font-medium text-neutral-900 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
                      >
                        {OCCASIONS.map((occ) => (
                          <option key={occ.id} value={occ.id}>
                            {occ.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1 font-bold">
                      Dietary Restrictions, Allergens &amp; Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Shellfish allergy, anniversary table request..."
                      value={dietaryNotes}
                      onChange={(e) => setDietaryNotes(e.target.value)}
                      maxLength={500}
                      className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-300 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
                    />
                  </div>

                  {/* Booking Summary Box */}
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-neutral-900 font-bold block">
                        {partySize} Guests · {date} at {selectedSlot}
                      </span>
                      <span className="text-neutral-500 capitalize text-[11px]">
                        {seatingArea} Salon · {occasion}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-brand-red font-mono font-bold text-xs">
                        Guaranteed Allocation
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-6 py-3 rounded-2xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-700 text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-10 py-3.5 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" /> Confirming Allocation...
                        </span>
                      ) : (
                        'Confirm Reservation'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
