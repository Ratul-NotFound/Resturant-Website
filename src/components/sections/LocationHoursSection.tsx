'use client';

import React, { useState, useEffect } from 'react';
import { RESTAURANT_INFO, OPENING_HOURS } from '@/data/restaurantConfig';
import { getLiveRestaurantStatus, LiveStatus } from '@/lib/utils/hours';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Car,
  Shield,
  Navigation,
  Send,
  CheckCircle2,
  Loader2,
  MessageSquare,
} from 'lucide-react';
import { Sanitizer } from '@/lib/security/Sanitizer';
import { useToast } from '../ui/Toast';

export function LocationHoursSection() {
  const { showToast } = useToast();
  const [liveStatus, setLiveStatus] = useState<LiveStatus>({
    isOpen: true,
    statusText: 'Open for Dinner Service',
    nextEventText: 'Kitchen closes at 11:30 PM',
  });

  // Contact Form State (FR-11)
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSuccessMsg, setContactSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    setLiveStatus(getLiveRestaurantStatus());
    const timer = setInterval(() => {
      setLiveStatus(getLiveRestaurantStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!Sanitizer.validateName(contactName)) {
      showToast('Please enter a valid full name (at least 2 letters).', 'error', 'Validation');
      return;
    }

    if (!Sanitizer.validateEmail(contactEmail)) {
      showToast('Please enter a valid email address.', 'error', 'Validation');
      return;
    }

    if (!Sanitizer.validatePhone(contactPhone)) {
      showToast('Please enter a valid contact phone number.', 'error', 'Validation');
      return;
    }

    if (!contactMessage || contactMessage.trim().length < 5) {
      showToast('Please enter your message (at least 5 characters).', 'error', 'Validation');
      return;
    }

    setIsSubmittingContact(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: Sanitizer.cleanText(contactName, 80),
          email: contactEmail.trim().toLowerCase(),
          phone: contactPhone.trim(),
          message: Sanitizer.cleanText(contactMessage, 1000),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setContactSuccessMsg(data.message || "We'll contact you shortly regarding your message.");
        showToast("Inquiry Received. We'll contact you shortly.", 'success', 'Message Sent');
        setContactName('');
        setContactEmail('');
        setContactPhone('');
        setContactMessage('');
      } else {
        showToast(data.error || 'Failed to submit inquiry. Please try again.', 'error', 'Error');
      }
    } catch {
      showToast('Network error. Please try again later.', 'error', 'Network Error');
    } finally {
      setIsSubmittingContact(false);
    }
  };

  return (
    <section id="location" className="scroll-mt-28 relative py-24 sm:py-32 overflow-hidden bg-[#fafaf8]">
      
      {/* Background Glow */}
      <div
        className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(58,125,68,0.06) 0%, transparent 70%)', transform: 'translate(30%, 30%)' }}
      />
      <div
        className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(232,48,42,0.05) 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-brand-red border border-red-200 text-xs font-bold uppercase tracking-wider mb-4">
            <MapPin className="h-3.5 w-3.5" /> Location, Hours &amp; Inquiries
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight uppercase mb-4">
            Visit &amp; <span className="text-gradient-red italic">Connect With Us</span>
          </h2>
          <p className="text-neutral-600 text-sm leading-relaxed max-w-xl mx-auto font-normal">
            Experience our 30th-floor sky sanctum overlooking the Manhattan skyline or send an inquiry to our guest relations team.
          </p>
        </div>

        {/* 2-Column Main Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Live Hours, Map Card & Valet */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Live Operational Status Banner */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-neutral-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">
                  Operational Service Status
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-bold ${
                    liveStatus.isOpen
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      liveStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-400'
                    }`}
                  />
                  {liveStatus.isOpen ? 'Open For Service' : 'Cellar Rest'}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-neutral-900 mb-1 tracking-wide">
                {liveStatus.statusText}
              </h3>
              <p className="text-xs text-neutral-500 font-normal">{liveStatus.nextEventText}</p>
            </div>

            {/* Weekly Schedule Table */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-4">
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

            {/* Architectural Sky Map Card */}
            <div className="relative h-[280px] sm:h-[320px] w-full rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl flex flex-col justify-between p-6 sm:p-7 text-white">
              <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center">
                <div className="relative flex items-center justify-center">
                  <div className="h-14 w-14 rounded-full bg-brand-red/20 border border-brand-red/50 animate-ping absolute" />
                  <div className="h-10 w-10 rounded-full bg-brand-red text-white flex items-center justify-center shadow-lg relative z-10">
                    <MapPin className="h-5 w-5" />
                  </div>
                </div>

                <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mt-3 tracking-wide">
                  432 Park Avenue
                </h4>
                <p className="text-[10px] text-red-300 font-bold tracking-[0.25em] uppercase mt-0.5">
                  30th Floor Sky Vault · Manhattan, NY 10022
                </p>
              </div>

              <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-neutral-400 font-medium">Between 56th &amp; 57th Streets</span>
                <a
                  href="https://maps.google.com/?q=432+Park+Avenue+New+York"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-red hover:bg-brand-redDark text-white text-[11px] font-bold uppercase tracking-wider shadow-md transition-all"
                >
                  <Navigation className="h-3 w-3" /> Get Directions
                </a>
              </div>
            </div>

            {/* Concierge & White-Glove Valet */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-2 text-brand-red text-[11px] font-bold uppercase tracking-[0.15em] mb-2">
                  <Car className="h-4 w-4" /> White-Glove Valet
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                  {RESTAURANT_INFO.valetParking}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-2 text-brand-red text-[11px] font-bold uppercase tracking-[0.15em] mb-2">
                  <Shield className="h-4 w-4" /> Dress Code Policy
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                  {RESTAURANT_INFO.dressCode}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: FR-11 Contact Form & Direct Inquiries */}
          <div id="contact" className="lg:col-span-6 space-y-6 scroll-mt-28">
            
            {/* Direct Contact Form Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-neutral-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-brand-red text-[10px] font-bold uppercase tracking-wider mb-2 border border-red-100">
                  <MessageSquare className="h-3 w-3" /> Send a Message
                </div>
                <h3 className="font-serif text-2xl font-bold text-neutral-900 tracking-wide">
                  Contact Guest Relations
                </h3>
                <p className="text-xs text-neutral-500 mt-1 font-normal">
                  Inquire about dining experiences, dietary arrangements, private reservations, or press partnerships.
                </p>
              </div>

              {contactSuccessMsg ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fade-in">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-emerald-900">
                    Message Received
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                    {contactSuccessMsg}
                  </p>
                  <button
                    type="button"
                    onClick={() => setContactSuccessMsg(null)}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1 font-bold">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Genevieve Sterling"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        maxLength={80}
                        className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1 font-bold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="genevieve@sterling.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        maxLength={254}
                        className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1 font-bold">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (212) 555-0199"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      maxLength={16}
                      className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1 font-bold">
                      Your Inquiry or Special Request *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please tell us how we can assist you..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      maxLength={1000}
                      className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingContact}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                  >
                    {isSubmittingContact ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" /> Submitting Inquiry...
                      </span>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Direct Contact Phone & Email Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-3.5">
                <div className="p-2.5 rounded-2xl bg-red-50 text-brand-red border border-red-100">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-neutral-400 uppercase text-[9px] font-bold tracking-[0.2em] block">Concierge Desk</span>
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="font-serif text-sm font-bold text-neutral-900 hover:text-brand-red transition-colors">
                    {RESTAURANT_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-3.5">
                <div className="p-2.5 rounded-2xl bg-red-50 text-brand-red border border-red-100">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-neutral-400 uppercase text-[9px] font-bold tracking-[0.2em] block">Reservations Desk</span>
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
