'use client';

import React, { useState, useEffect } from 'react';
import { SeatingArea, OccasionType, TimeSlot, ReservationRecord } from '@/lib/types';
import { getTomorrowDateString } from '@/lib/utils/formatting';
import { Calendar, Users, MapPin, Clock, User, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '../ui/Toast';
import { fireCelebrationConfetti } from '@/lib/utils/confetti';
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
        fireCelebrationConfetti();
        showToast('Your reservation at AURA has been confirmed!', 'success', 'Table Reserved');
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
    <section id="reservations" className="scroll-mt-28 relative py-24 sm:py-32 bg-[#0c0b0a] overflow-hidden text-[#cfc8bc]">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-gold-primary/20 bg-gold-primary/5 text-gold-light text-[10px] uppercase font-mono tracking-[0.25em] mb-4">
            <Sparkles className="h-3 w-3 text-gold-primary" /> Table Allocations
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-champagne mb-4 tracking-tight">
            Reserve Your Table
          </h2>
          <p className="text-xs sm:text-sm text-[#91887b] leading-relaxed font-sans max-w-xl mx-auto font-light">
            Real-time table allocations backed by our atomic scheduling engine. Guaranteed confirmation with digital pass.
          </p>
        </div>

        {/* Wizard Card */}
        <div className="rounded-2xl bg-[#141210] border border-gold-primary/20 shadow-xl p-6 sm:p-10">
          
          {/* Progress Steps Header */}
          <div className="grid grid-cols-4 gap-2 mb-8 pb-6 border-b border-gold-primary/15 text-xs">
            {[
              { num: 1, label: 'Guests & Date' },
              { num: 2, label: 'Salon' },
              { num: 3, label: 'Seating Time' },
              { num: 4, label: 'Guest Details' },
            ].map((st) => (
              <div
                key={st.num}
                className={`flex flex-col items-center text-center cursor-pointer transition-colors ${
                  step >= st.num ? 'text-gold-light' : 'text-[#91887b]/60'
                }`}
                onClick={() => {
                  if (st.num < step) setStep(st.num);
                }}
              >
                <div
                  className={`h-7 w-7 rounded-full flex items-center justify-center font-mono text-xs mb-1.5 transition-all ${
                    step === st.num
                      ? 'bg-gold-primary text-[#0c0b0a] font-bold shadow-gold-sm'
                      : step > st.num
                      ? 'bg-gold-primary/15 text-gold-light border border-gold-primary/30'
                      : 'bg-[#0c0b0a] text-[#91887b] border border-gold-primary/10'
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
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-widest">
                <CheckCircle2 className="h-4 w-4" /> Table Confirmed & Guaranteed
              </div>
              <div>
                <h3 className="font-serif text-3xl font-light text-champagne">
                  We Await Your Arrival, {latestConfirmed.guestName}
                </h3>
                <p className="text-xs text-[#91887b] mt-1 font-mono uppercase tracking-widest">
                  Booking Reference: <span className="text-gold-primary font-bold">{latestConfirmed.bookingReference}</span>
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0c0b0a] border border-gold-primary/20 max-w-md mx-auto grid grid-cols-2 gap-4 text-xs text-left">
                <div>
                  <span className="text-[10px] text-[#91887b] uppercase block font-mono">Dining Date</span>
                  <span className="font-serif font-bold text-champagne">{latestConfirmed.date}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#91887b] uppercase block font-mono">Seating Time</span>
                  <span className="font-serif font-bold text-champagne">{latestConfirmed.timeSlot}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#91887b] uppercase block font-mono">Dining Salon</span>
                  <span className="font-serif font-bold text-gold-light capitalize">{latestConfirmed.seatingArea}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#91887b] uppercase block font-mono">Party</span>
                  <span className="font-serif font-bold text-champagne">{latestConfirmed.partySize} Guests</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => onBookingConfirmed(latestConfirmed)}
                  className="w-full sm:w-auto px-8 py-3 rounded-full gold-button text-xs font-semibold uppercase tracking-wider shadow-gold-sm"
                >
                  View Digital Boarding Pass
                </button>
                <button
                  onClick={handleResetBookingWizard}
                  className="w-full sm:w-auto px-6 py-3 rounded-full gold-button-outline text-xs font-semibold uppercase tracking-wider"
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
                  <h3 className="font-serif text-xl font-light text-champagne">
                    Select Guests & Dining Date
                  </h3>

              {/* Party Size Selector */}
              <div>
                <label className="text-[11px] font-mono text-[#91887b] uppercase tracking-wider block mb-2">
                  Number of Guests
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setPartySize(size)}
                      className={`py-2.5 rounded-xl text-xs font-serif transition-all ${
                        partySize === size
                          ? 'bg-gold-primary text-[#0c0b0a] font-semibold shadow-gold-sm'
                          : 'bg-[#0c0b0a] border border-gold-primary/15 text-[#cfc8bc] hover:border-gold-primary/30'
                      }`}
                    >
                      {size} {size === 1 ? 'Guest' : 'Guests'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calendar Date Input */}
              <div>
                <label className="text-[11px] font-mono text-[#91887b] uppercase tracking-wider block mb-2">
                  Calendar Date
                </label>
                <input
                  type="date"
                  value={date}
                  min={getTomorrowDateString()}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0c0b0a] border border-gold-primary/20 text-xs text-[#f7f4ed] focus:outline-none focus:border-gold-primary"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-8 py-3 rounded-full gold-button text-xs font-semibold uppercase tracking-wider shadow-gold-sm"
                >
                  Continue to Salons →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SALON & ATMOSPHERE SELECTION */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-serif text-xl font-light text-champagne">
                Choose Dining Salon
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {AREAS.map((area) => (
                  <div
                    key={area.id}
                    onClick={() => setSeatingArea(area.id)}
                    className={`p-5 rounded-2xl cursor-pointer border transition-all ${
                      seatingArea === area.id
                        ? 'bg-gold-primary/10 border-gold-primary shadow-gold-sm'
                        : 'bg-[#0c0b0a] border-gold-primary/15 hover:border-gold-primary/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-serif text-base font-normal text-champagne">{area.name}</h4>
                      {seatingArea === area.id && (
                        <CheckCircle2 className="h-4 w-4 text-gold-primary" />
                      )}
                    </div>
                    <p className="text-xs text-[#91887b] leading-relaxed font-light">{area.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-2.5 rounded-full bg-[#0c0b0a] border border-gold-primary/15 text-[#91887b] hover:text-[#f7f4ed] text-xs font-mono uppercase tracking-wider"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-8 py-2.5 rounded-full gold-button text-xs font-semibold uppercase tracking-wider shadow-gold-sm"
                >
                  Continue to Times →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: MIN-HEAP TIME SLOTS */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-serif text-xl font-light text-champagne">
                Select Table Seating Time
              </h3>

              {isLoadingSlots ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <Loader2 className="h-6 w-6 text-gold-primary animate-spin mb-2" />
                  <p className="text-xs text-[#91887b] font-mono">Querying table capacity...</p>
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="p-8 rounded-2xl bg-[#0c0b0a] border border-gold-primary/15 text-center">
                  <AlertCircle className="h-6 w-6 text-amber-400 mx-auto mb-2" />
                  <p className="text-xs text-[#cfc8bc] mb-4">
                    No open tables remaining for the chosen date and salon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-2 rounded-full gold-button-outline text-xs font-semibold uppercase"
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
                        className={`p-3 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'bg-gold-primary text-[#0c0b0a] font-semibold border-gold-light shadow-gold-sm'
                            : isWaitlist
                            ? 'bg-[#0c0b0a]/40 border-gold-primary/5 text-[#91887b]/30 opacity-40 cursor-not-allowed'
                            : 'bg-[#0c0b0a] border-gold-primary/15 text-[#cfc8bc] hover:border-gold-primary/35'
                        }`}
                      >
                        <span className="font-serif text-sm block font-normal">{slot.label}</span>
                        <span
                          className={`text-[9px] mt-0.5 block uppercase tracking-wider font-mono ${
                            isSelected
                              ? 'text-[#0c0b0a]'
                              : slot.status === 'FEW_LEFT'
                              ? 'text-amber-400'
                              : isWaitlist
                              ? 'text-[#91887b]'
                              : 'text-emerald-400/90'
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
                  className="px-6 py-2.5 rounded-full bg-[#0c0b0a] border border-gold-primary/15 text-[#91887b] hover:text-[#f7f4ed] text-xs font-mono uppercase tracking-wider"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  disabled={!selectedSlot}
                  onClick={handleNextStep}
                  className="px-8 py-2.5 rounded-full gold-button text-xs font-semibold uppercase tracking-wider shadow-gold-sm disabled:opacity-40"
                >
                  Guest Details →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: GUEST INFORMATION & SUBMISSION */}
          {step === 4 && (
            <form onSubmit={handleSubmitBooking} className="space-y-6 animate-fade-in">
              <h3 className="font-serif text-xl font-light text-champagne">
                Guest Details
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono text-[#91887b] uppercase tracking-wider block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Lady Genevieve Sterling"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    maxLength={80}
                    className="w-full px-4 py-3 rounded-xl bg-[#0c0b0a] border border-gold-primary/20 text-xs text-[#f7f4ed] placeholder-[#91887b]/60 focus:outline-none focus:border-gold-primary"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-[#91887b] uppercase tracking-wider block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="genevieve@sterling.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    maxLength={254}
                    className="w-full px-4 py-3 rounded-xl bg-[#0c0b0a] border border-gold-primary/20 text-xs text-[#f7f4ed] placeholder-[#91887b]/60 focus:outline-none focus:border-gold-primary"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-[#91887b] uppercase tracking-wider block mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (212) 555-0199"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    maxLength={16}
                    className="w-full px-4 py-3 rounded-xl bg-[#0c0b0a] border border-gold-primary/20 text-xs text-[#f7f4ed] placeholder-[#91887b]/60 focus:outline-none focus:border-gold-primary"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-[#91887b] uppercase tracking-wider block mb-1">
                    Dining Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value as OccasionType)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0c0b0a] border border-gold-primary/20 text-xs text-[#f7f4ed] focus:outline-none focus:border-gold-primary"
                  >
                    {OCCASIONS.map((occ) => (
                      <option key={occ.id} value={occ.id} className="bg-[#0c0b0a]">
                        {occ.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#91887b] uppercase tracking-wider block mb-1">
                  Dietary Restrictions, Allergens & Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Shellfish allergy, anniversary table request..."
                  value={dietaryNotes}
                  onChange={(e) => setDietaryNotes(e.target.value)}
                  maxLength={500}
                  className="w-full px-4 py-3 rounded-xl bg-[#0c0b0a] border border-gold-primary/20 text-xs text-[#f7f4ed] placeholder-[#91887b]/60 focus:outline-none focus:border-gold-primary"
                />
              </div>

              {/* Booking Summary Box */}
              <div className="p-4 rounded-xl bg-[#0c0b0a] border border-gold-primary/15 flex items-center justify-between text-xs">
                <div>
                  <span className="text-gold-light font-medium block">
                    {partySize} Guests · {date} at {selectedSlot}
                  </span>
                  <span className="text-[#91887b] capitalize text-[11px]">
                    {seatingArea} Salon · {occasion}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-gold-primary font-mono text-xs">
                    Guaranteed Booking
                  </span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-2.5 rounded-full bg-[#0c0b0a] border border-gold-primary/15 text-[#91887b] hover:text-[#f7f4ed] text-xs font-mono uppercase tracking-wider"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-10 py-3 rounded-full gold-button text-xs font-semibold uppercase tracking-wider shadow-gold-sm disabled:opacity-50"
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
