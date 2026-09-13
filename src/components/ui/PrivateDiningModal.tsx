'use client';

import React, { useState } from 'react';
import { SeatingArea } from '@/lib/types';
import { X, Sparkles, Building2, Send, CheckCircle2, Loader2, Users, Calendar } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-xl my-auto rounded-3xl bg-[#141210] border border-gold-primary/30 shadow-2xl p-6 sm:p-8 animate-slide-up text-[#f7f4ed]"
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
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold-light font-semibold mb-1">
            <Building2 className="h-4 w-4 text-gold-primary" /> Private Vaults & Buyouts
          </div>
          <h2 className="font-serif text-2xl font-bold text-champagne">
            Private Salon & Gala Inquiries
          </h2>
          <p className="text-xs text-[#91887b]">
            Dedicated service from our Executive Culinary Director and Sommelier team.
          </p>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="p-4 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 w-16 h-16 mx-auto flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-champagne">Inquiry Received</h3>
            <p className="text-xs text-[#cfc8bc] max-w-sm mx-auto leading-relaxed">
              Our Head Concierge will contact you within 4 hours to review menu customizations, cellar allocations, and room layout.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl gold-button text-xs font-bold uppercase tracking-wider"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[#cfc8bc] uppercase tracking-wider block mb-1">
                  Host / Organizer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Sir Julian Vane"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={80}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0b0a] border border-gold-primary/20 text-xs text-[#f7f4ed] placeholder-[#91887b] focus:outline-none focus:border-gold-primary"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[#cfc8bc] uppercase tracking-wider block mb-1">
                  Corporate / Personal Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="julian@vane-holdings.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={254}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0b0a] border border-gold-primary/20 text-xs text-[#f7f4ed] placeholder-[#91887b] focus:outline-none focus:border-gold-primary"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[#cfc8bc] uppercase tracking-wider block mb-1">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (212) 555-0144"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={16}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0b0a] border border-gold-primary/20 text-xs text-[#f7f4ed] placeholder-[#91887b] focus:outline-none focus:border-gold-primary"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-[#cfc8bc] uppercase tracking-wider block mb-1">
                  Preferred Event Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0b0a] border border-gold-primary/20 text-xs text-[#f7f4ed] focus:outline-none focus:border-gold-primary"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[#cfc8bc] uppercase tracking-wider block mb-1">
                  Salon Preference
                </label>
                <select
                  value={salonPreference}
                  onChange={(e) => setSalonPreference(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0b0a] border border-gold-primary/20 text-xs text-[#f7f4ed] focus:outline-none focus:border-gold-primary"
                >
                  <option value="vault">The Obsidian Vault (2–24 Guests)</option>
                  <option value="atrium">The Grand Atrium (Up to 80 Guests)</option>
                  <option value="counter">Chef’s Omakase Counter (12 Guests)</option>
                  <option value="terrace">Heated Sky Terrace (Up to 45 Guests)</option>
                  <option value="full-buyout">Full Restaurant Buyout (Up to 150 Guests)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#cfc8bc] uppercase tracking-wider block mb-1">
                  Estimated Party Size
                </label>
                <input
                  type="number"
                  min={2}
                  max={200}
                  value={partySize}
                  onChange={(e) => setPartySize(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0b0a] border border-gold-primary/20 text-xs text-[#f7f4ed] focus:outline-none focus:border-gold-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#cfc8bc] uppercase tracking-wider block mb-1">
                Event Overview & Custom Requirements
              </label>
              <textarea
                rows={3}
                placeholder="e.g. 7-course private tasting with rare Bordeaux allocations, audiovisual speech setup..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0c0b0a] border border-gold-primary/20 text-xs text-[#f7f4ed] placeholder-[#91887b] focus:outline-none focus:border-gold-primary"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl gold-button text-xs font-bold uppercase tracking-wider shadow-gold-glow disabled:opacity-50"
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
