'use client';

import React, { useState } from 'react';
import { RESTAURANT_INFO, OPENING_HOURS, FAQ_ITEMS } from '@/data/restaurantConfig';
import { Send, Wine, MapPin, Phone, Mail, Award, CheckCircle2, Loader2, HelpCircle, ChevronDown, Building2, Search } from 'lucide-react';
import { useToast } from '../ui/Toast';
import { Sanitizer } from '@/lib/security/Sanitizer';

interface FooterProps {
  onOpenLookup?: () => void;
  onOpenPrivateDining?: () => void;
  onOpenSommelier?: () => void;
}

export function Footer({
  onOpenLookup,
  onOpenPrivateDining,
  onOpenSommelier,
}: FooterProps) {
  const { showToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!Sanitizer.validateEmail(newsletterEmail)) {
      showToast('Please enter a valid email address.', 'error', 'Newsletter');
      return;
    }

    setIsSubscribing(true);

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newsletterEmail.trim().toLowerCase(),
          website_hp: honeypot,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubscribed(true);
        showToast(data.message || 'You have been enrolled in the Gastronomy Journal.', 'success', 'Subscribed');
        setNewsletterEmail('');
      } else {
        showToast(data.error || 'Subscription failed. Please try again.', 'error', 'Error');
      }
    } catch {
      showToast('Network issue. Please try again.', 'error', 'Network Error');
    } finally {
      setIsSubscribing(false);
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  return (
    <footer className="relative border-t border-black/12 pt-16 pb-12 overflow-hidden font-sans" style={{ background: '#111111', color: '#aaaaaa' }}>
      
      {/* Subtle red top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-32 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(232,48,42,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Newsletter & Grand Header */}
        <div className="grid lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Presentation */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-[#e8302a] shadow-lg shadow-red-500/30">
                <span className="font-serif text-2xl font-black text-white">A</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-black tracking-[0.25em] text-white leading-none">
                  A U R A
                </h3>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#e8302a] mt-1 block font-semibold">
                  ★★★ Three Michelin Stars
                </span>
              </div>
            </div>

            <p className="text-sm text-[#999] max-w-md leading-relaxed">
              {RESTAURANT_INFO.tagline}. Located on the 30th floor overlooking the Manhattan skyline with our 4,000-bottle subterranean private reserve cellar.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#777]">
              <span className="inline-flex items-center gap-1.5 text-white">
                <Award className="h-4 w-4 text-[#e8302a]" /> Michelin 3 Stars (2025)
              </span>
              <span className="inline-flex items-center gap-1.5 text-white">
                <Wine className="h-4 w-4 text-[#e8302a]" /> Grand Sommelier Award
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {onOpenPrivateDining && (
                <button
                  onClick={onOpenPrivateDining}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/08 border border-white/12 text-white hover:bg-[#e8302a] hover:border-[#e8302a] text-xs font-semibold transition-all"
                >
                  <Building2 className="h-3.5 w-3.5" /> Private Vault Buyouts
                </button>
              )}
              {onOpenLookup && (
                <button
                  onClick={onOpenLookup}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/05 border border-white/08 text-[#ccc] hover:text-white text-xs font-semibold transition-all"
                >
                  <Search className="h-3.5 w-3.5 text-gold-primary" /> Find / Manage Booking
                </button>
              )}
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141210] border border-gold-primary/20 shadow-xl">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-light/90 font-medium block mb-1">
                The Gastronomy Gazette
              </span>
              <h4 className="font-serif text-xl font-light text-champagne mb-2 tracking-wide">
                Private Cellar Invitations & Seasonal Releases
              </h4>
              <p className="text-xs text-[#91887b] mb-4 leading-relaxed font-light">
                Receive confidential invitations for rare vintage wine dinners, white truffle harvests, and priority seasonal reservations.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-light px-4">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  Thank you. Your email has been added to our private register.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2.5">
                  <input
                    type="text"
                    name="website_hp"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Enter your private email address..."
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      maxLength={254}
                      className="flex-1 px-4 py-2.5 rounded-full bg-[#0c0b0a] border border-gold-primary/20 text-xs text-[#f7f4ed] placeholder-[#91887b]/60 focus:outline-none focus:border-gold-primary transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={isSubscribing}
                      className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full gold-button text-xs font-medium uppercase tracking-[0.15em] shadow-gold-sm hover:shadow-gold-md disabled:opacity-50 transition-all"
                    >
                      {isSubscribing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="h-3 w-3" /> Subscribe
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[10px] text-[#91887b] font-light">
                    Strict privacy assured. Zero spam. Unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Interactive FAQ Section */}
        <div className="py-12 border-b border-gold-primary/15">
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="text-center mb-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-light/90 font-medium block mb-1">
                Concierge Guidance
              </span>
              <h4 className="font-serif text-2xl font-light text-champagne tracking-wide">Frequently Asked Questions</h4>
            </div>

            {FAQ_ITEMS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#141210]/80 border border-gold-primary/15 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-serif font-semibold text-champagne hover:text-gold-hover transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-gold-primary shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-[#91887b] transition-transform duration-300 ${
                      openFaqIdx === idx ? 'rotate-180 text-gold-primary' : ''
                    }`}
                  />
                </button>
                {openFaqIdx === idx && (
                  <div className="px-5 pb-5 text-xs text-[#cfc8bc] leading-relaxed font-sans border-t border-gold-primary/10 pt-3 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Middle Navigation & Information Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-gold-primary/15 text-xs">
          
          {/* Navigation Links */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-champagne uppercase tracking-wider">
              Experience
            </h5>
            <ul className="space-y-2">
              <li><a href="#story" className="hover:text-gold-hover transition-colors">Culinary Heritage</a></li>
              <li><a href="#menu" className="hover:text-gold-hover transition-colors">30-Course Catalog</a></li>
              <li><a href="#specials" className="hover:text-gold-hover transition-colors">Chef Signature Creations</a></li>
              <li><a href="#atmosphere" className="hover:text-gold-hover transition-colors">The 4 Salons & Vaults</a></li>
              <li><a href="#reviews" className="hover:text-gold-hover transition-colors">Press & Michelin Accolades</a></li>
            </ul>
          </div>

          {/* Opening Schedule */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-champagne uppercase tracking-wider">
              Service Hours
            </h5>
            <ul className="space-y-1.5 text-[11px]">
              <li className="text-neutral-300 font-medium">Dinner Service</li>
              <li className="text-neutral-400">Tue – Sun: 17:00 – 23:30</li>
              <li className="text-neutral-400">Mon: 17:30 – 23:00</li>
              <li className="text-neutral-300 font-medium pt-1">Lunch Service</li>
              <li className="text-neutral-400">Tue – Fri: 12:00 – 14:30</li>
              <li className="text-neutral-400">Sat – Sun: 11:30 – 15:00</li>
            </ul>
          </div>

          {/* Concierge & Contact */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-champagne uppercase tracking-wider">
              Concierge
            </h5>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-gold-light" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-gold-hover">
                  {RESTAURANT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-gold-light" />
                <a href={`mailto:${RESTAURANT_INFO.reservationsEmail}`} className="hover:text-gold-hover">
                  {RESTAURANT_INFO.reservationsEmail}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-gold-light shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address.street}, {RESTAURANT_INFO.address.city}, {RESTAURANT_INFO.address.state} {RESTAURANT_INFO.address.postalCode}</span>
              </li>
            </ul>
          </div>

          {/* Dress Code & Private Valet */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-champagne uppercase tracking-wider">
              Private Dining & Policy
            </h5>
            <p className="text-[11px] leading-relaxed text-neutral-400">
              <strong className="text-neutral-300">Dress Code:</strong> Elegant formal attire. Jackets recommended.
            </p>
            <p className="text-[11px] leading-relaxed text-neutral-400">
              <strong className="text-neutral-300">Valet:</strong> White-glove service on 56th Street entrance.
            </p>
            <p className="text-[11px] leading-relaxed text-neutral-400">
              <strong className="text-neutral-300">Corkage:</strong> {RESTAURANT_INFO.corkagePolicy}
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Guest Information Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#91887b] font-light">
          <p>© {new Date().getFullYear()} AURA Haute Gastronomie & Private Cellar. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#reservations" className="hover:text-gold-hover transition-colors">Reservations Policy</a>
            <span>·</span>
            <a href="#location" className="hover:text-gold-hover transition-colors">Dress Code & Valet</a>
            <span>·</span>
            <span className="hover:text-gold-hover cursor-pointer transition-colors">Press & Accolades</span>
            <span>·</span>
            <span className="hover:text-gold-hover cursor-pointer transition-colors">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
