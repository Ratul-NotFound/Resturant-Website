'use client';

import React, { useState } from 'react';
import { SeatingArea } from '@/lib/types';
import { X, Building2, Send, CheckCircle2, Loader2, Users, Calendar } from 'lucide-react';
import { useToast } from './Toast';
import { Sanitizer } from '@/lib/security/Sanitizer';

interface PrivateDiningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivateDiningModal({ isOpen, onClose }: PrivateDiningModalProps) {
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [partySize, setPartySize] = useState(12);
  const [salonPreference, setSalonPreference] = useState<SeatingArea | 'full-buyout'>('vault');
  const [estimatedBudget, setEstimatedBudget] = useState('$5,000 – $15,000');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!Sanitizer.validateName(name)) {
      showToast('Please provide a valid full name.', 'error');
      return;
    }
    if (!Sanitizer.validateEmail(email)) {
      showToast('Please provide a valid corporate or personal email.', 'error');
      return;
    }
    if (!Sanitizer.validatePhone(phone)) {
      showToast('Please provide a valid contact number.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/private-dining', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: Sanitizer.cleanText(name, 80),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          preferredDate,
          partySize,
          salonPreference,
          estimatedBudget,
          message: Sanitizer.cleanText(message, 500),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        showToast('Your private dining inquiry has been submitted.', 'success', 'Inquiry Dispatched');
      } else {
        showToast(data.error || 'Failed to submit inquiry.', 'error');
      }
    } catch {
      showToast('Network issue during inquiry submission.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-xl my-auto rounded-3xl bg-white border border-neutral-200 shadow-2xl p-6 sm:p-8 animate-slide-up text-neutral-800"
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
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-brand-red font-bold mb-1">
            <Building2 className="h-4 w-4" /> Private Salons &amp; Buyouts
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Private Dining &amp; Gala Inquiries
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Dedicated service from our Executive Culinary Director and Sommelier team.
          </p>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="p-4 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-300 w-16 h-16 mx-auto flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-neutral-900">Inquiry Received</h3>
            <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed font-normal">
              Our Head Concierge will contact you within 4 hours to review custom menu options, cellar allocations, and salon setup.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3.5 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1 font-bold">
                  Host / Organizer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Julian Montgomery"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={80}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-300 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1 font-bold">
                  Corporate / Personal Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="julian@vane-holdings.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={254}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-300 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1 font-bold">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (212) 555-0144"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={16}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-300 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1 font-bold">
                  Preferred Event Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-300 text-xs font-medium text-neutral-900 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1 font-bold">
                  Salon Preference
                </label>
                <select
                  value={salonPreference}
                  onChange={(e) => setSalonPreference(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-300 text-xs font-medium text-neutral-900 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
                >
                  <option value="vault">The Obsidian Vault (2–24 Guests)</option>
                  <option value="atrium">The Grand Atrium (Up to 80 Guests)</option>
                  <option value="counter">Chef’s Omakase Counter (12 Guests)</option>
                  <option value="terrace">Heated Sky Terrace (Up to 45 Guests)</option>
                  <option value="full-buyout">Full Restaurant Buyout (Up to 150 Guests)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1 font-bold">
                  Estimated Party Size
                </label>
                <input
                  type="number"
                  min={2}
                  max={200}
                  value={partySize}
                  onChange={(e) => setPartySize(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-300 text-xs font-medium text-neutral-900 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-1 font-bold">
                Event Overview &amp; Custom Requirements
              </label>
              <textarea
                rows={3}
                placeholder="e.g. 7-course private tasting with rare wine allocations, audiovisual setup..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-300 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-red/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Dispatching to Concierge...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Submit Private Dining Request
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
