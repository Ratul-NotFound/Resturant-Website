'use client';

import React, { useState } from 'react';
import { RESTAURANT_INFO, OPENING_HOURS, FAQ_ITEMS } from '@/data/restaurantConfig';
import { Send, Sparkles, MapPin, Phone, Mail, Award, CheckCircle2, Loader2, HelpCircle, ChevronDown, Building2, Search } from 'lucide-react';
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
    <footer className="relative bg-[#0c0b0a] border-t border-gold-primary/20 pt-16 pb-12 overflow-hidden text-[#91887b] font-sans">
      
      {/* Background Gold Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-[radial-gradient(ellipse_at_top,rgba(197,160,89,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Newsletter & Grand Header */}
        <div className="grid lg:grid-cols-12 gap-10 pb-16 border-b border-gold-primary/15">
          
          {/* Brand Presentation */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-12 w-12 rounded-full border border-gold-primary bg-[#141210] shadow-gold-sm">
                <span className="font-serif text-2xl font-bold text-gold-primary">A</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-[0.25em] text-champagne leading-none">
                  A U R A
                </h3>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-light mt-1 block">
                  ★★★ Three Michelin Stars · Haute Gastronomie
                </span>
              </div>
            </div>

            <p className="text-sm text-[#cfc8bc] max-w-md leading-relaxed">
              {RESTAURANT_INFO.tagline}. Located on the 30th floor overlooking the Manhattan skyline with our 4,000-bottle subterranean private reserve cellar.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#cfc8bc]">
              <span className="inline-flex items-center gap-1 text-gold-hover">
                <Award className="h-4 w-4 text-gold-primary" /> Michelin 3 Stars (2025)
              </span>
              <span className="inline-flex items-center gap-1 text-gold-hover">
                <Sparkles className="h-4 w-4 text-gold-primary" /> Grand Sommelier Award
              </span>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap gap-3 pt-3">
              {onOpenPrivateDining && (
                <button
                  onClick={onOpenPrivateDining}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#141210] border border-gold-primary/30 text-gold-hover text-xs font-semibold hover:bg-gold-primary hover:text-[#0c0b0a] transition-all"
                >
                  <Building2 className="h-3.5 w-3.5" /> Private Vault Buyout Inquiry
                </button>
              )}
              {onOpenLookup && (
                <button
                  onClick={onOpenLookup}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#141210] border border-gold-primary/20 text-[#cfc8bc] text-xs font-semibold hover:border-gold-primary hover:text-white transition-all"
                >
                  <Search className="h-3.5 w-3.5 text-gold-primary" /> Look Up / Cancel Reservation
                </button>
              )}
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141210]/90 border border-gold-primary/25 shadow-2xl backdrop-blur-md">
              <span className="text-xs uppercase tracking-widest text-gold-light font-semibold block mb-1">
                The Gastronomy Gazette
              </span>
              <h4 className="font-serif text-xl font-bold text-champagne mb-2">
                Private Cellar Invitations & Seasonal Menu Releases
              </h4>
              <p className="text-xs text-[#91887b] mb-4 leading-relaxed">
                Receive confidential allocations for rare vintage wine dinners, white truffle auctions, and priority seasonal reservations.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  Thank you. Your email has been added to our private register.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
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
                      className="flex-1 px-4 py-3 rounded-xl bg-[#0c0b0a] border border-gold-primary/20 text-xs text-[#f7f4ed] placeholder-[#91887b] focus:outline-none focus:border-gold-primary"
                    />
                    <button
                      type="submit"
                      disabled={isSubscribing}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl gold-button text-xs font-bold uppercase tracking-wider shadow-gold-glow disabled:opacity-50"
                    >
                      {isSubscribing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" /> Subscribe
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[10px] text-[#91887b]">
                    Strict privacy assured. Zero spam. Unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Interactive FAQ Section */}
        <div className="py-12 border-b border-gold-primary/15">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="text-center mb-8">
              <span className="text-[10px] uppercase tracking-widest text-gold-light font-semibold block mb-1">
                Concierge Guidance
              </span>
              <h4 className="font-serif text-2xl font-bold text-champagne">Frequently Asked Questions</h4>
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

        {/* Bottom Copyright & Security Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} AURA Luxury Restaurant Group. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-400">Zero-Trust Architecture</span>
            <span>·</span>
            <span className="hover:text-neutral-400">Self-Hosted Monolith</span>
            <span>·</span>
            <span className="hover:text-neutral-400">Privacy & Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
