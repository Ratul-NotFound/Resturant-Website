'use client';

import React, { useState } from 'react';
import { RESTAURANT_INFO, OPENING_HOURS, FAQ_ITEMS } from '@/data/restaurantConfig';
import {
  Send,
  Wine,
  MapPin,
  Phone,
  Mail,
  Award,
  CheckCircle2,
  Loader2,
  HelpCircle,
  ChevronDown,
  Building2,
  Search,
} from 'lucide-react';
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
    <footer className="relative border-t border-black/12 pt-16 pb-12 overflow-hidden font-sans bg-[#111111] text-[#aaaaaa]">
      
      {/* Subtle red top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-32 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(232,48,42,0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Newsletter & Grand Header */}
        <div className="grid lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Presentation & Social Links */}
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

            {/* Social Media Links (FR-12) */}
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 block mb-2.5">
                Connect on Social Media
              </span>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                  href={RESTAURANT_INFO.socialLinks?.facebook || 'https://facebook.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 rounded-xl bg-white/05 hover:bg-[#1877F2] text-white border border-white/10 hover:border-transparent transition-all shadow-sm"
                  aria-label="Facebook"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={RESTAURANT_INFO.socialLinks?.instagram || 'https://instagram.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 rounded-xl bg-white/05 hover:bg-[#E4405F] text-white border border-white/10 hover:border-transparent transition-all shadow-sm"
                  aria-label="Instagram"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href={RESTAURANT_INFO.socialLinks?.tiktok || 'https://tiktok.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 rounded-xl bg-white/05 hover:bg-black text-white border border-white/10 hover:border-transparent transition-all shadow-sm"
                  aria-label="TikTok"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href={RESTAURANT_INFO.socialLinks?.youtube || 'https://youtube.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 rounded-xl bg-white/05 hover:bg-[#FF0000] text-white border border-white/10 hover:border-transparent transition-all shadow-sm"
                  aria-label="YouTube"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

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
                  <Building2 className="h-3.5 w-3.5" /> Private Dining Inquiries
                </button>
              )}
              {onOpenLookup && (
                <button
                  onClick={onOpenLookup}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/05 border border-white/08 text-[#ccc] hover:text-white text-xs font-semibold transition-all"
                >
                  <Search className="h-3.5 w-3.5 text-[#e8302a]" /> Find / Manage Booking
                </button>
              )}
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-white/10 shadow-xl">
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-bold block mb-1">
                The Gastronomy Gazette
              </span>
              <h4 className="font-serif text-xl font-bold text-white mb-2 tracking-wide">
                Private Cellar Invitations &amp; Seasonal Releases
              </h4>
              <p className="text-xs text-neutral-400 mb-4 leading-relaxed font-normal">
                Receive confidential invitations for rare vintage wine dinners, white truffle harvests, and priority seasonal reservations.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-medium px-4">
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
                      placeholder="Enter your email address..."
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      maxLength={254}
                      className="flex-1 px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-red transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={isSubscribing}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-xs font-bold uppercase tracking-wider shadow-md disabled:opacity-50 transition-all"
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
                  <p className="text-[10px] text-neutral-500 font-normal">
                    Strict privacy assured. Zero spam. Unsubscribe at any time.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Interactive FAQ Section */}
        <div className="py-12 border-b border-white/10">
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="text-center mb-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-bold block mb-1">
                Concierge Guidance
              </span>
              <h4 className="font-serif text-2xl font-bold text-white tracking-wide">Frequently Asked Questions</h4>
            </div>

            {FAQ_ITEMS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-serif font-bold text-white hover:text-brand-red transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="h-4 w-4 text-brand-red shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-neutral-400 transition-transform duration-300 ${
                      openFaqIdx === idx ? 'rotate-180 text-brand-red' : ''
                    }`}
                  />
                </button>
                {openFaqIdx === idx && (
                  <div className="px-5 pb-5 text-xs text-neutral-300 leading-relaxed font-sans border-t border-neutral-800 pt-3 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Middle Navigation & Information Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/10 text-xs">
          
          {/* Navigation Links */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Experience
            </h5>
            <ul className="space-y-2">
              <li><a href="#story" className="hover:text-white transition-colors">About &amp; Philosophy</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Full Food Menu</a></li>
              <li><a href="#sharing-feasts" className="hover:text-white transition-colors">Special Offers &amp; Feasts</a></li>
              <li><a href="#atmosphere" className="hover:text-white transition-colors">Atmosphere &amp; Gallery</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Customer Reviews</a></li>
              <li><a href="#reservations" className="hover:text-white transition-colors">Table Reservations</a></li>
              <li><a href="#location" className="hover:text-white transition-colors">Location &amp; Hours</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Opening Schedule */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Service Hours
            </h5>
            <ul className="space-y-1.5 text-[11px]">
              <li className="text-white font-bold">Dinner Service</li>
              <li className="text-neutral-400">Tue – Sun: 17:00 – 23:30</li>
              <li className="text-neutral-400">Mon: 17:30 – 23:00</li>
              <li className="text-white font-bold pt-1">Lunch Service</li>
              <li className="text-neutral-400">Tue – Fri: 12:00 – 14:30</li>
              <li className="text-neutral-400">Sat – Sun: 11:30 – 15:00</li>
            </ul>
          </div>

          {/* Concierge & Contact */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Concierge
            </h5>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-brand-red" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white">
                  {RESTAURANT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-brand-red" />
                <a href={`mailto:${RESTAURANT_INFO.reservationsEmail}`} className="hover:text-white">
                  {RESTAURANT_INFO.reservationsEmail}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-brand-red shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address.street}, {RESTAURANT_INFO.address.city}, {RESTAURANT_INFO.address.state} {RESTAURANT_INFO.address.postalCode}</span>
              </li>
            </ul>
          </div>

          {/* Dress Code & Private Valet */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Dining Policies
            </h5>
            <p className="text-[11px] leading-relaxed text-neutral-400">
              <strong className="text-white">Dress Code:</strong> Elegant formal attire. Jackets recommended.
            </p>
            <p className="text-[11px] leading-relaxed text-neutral-400">
              <strong className="text-white">Valet:</strong> White-glove service on 56th Street entrance.
            </p>
            <p className="text-[11px] leading-relaxed text-neutral-400">
              <strong className="text-white">Corkage:</strong> {RESTAURANT_INFO.corkagePolicy}
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Guest Information Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-normal">
          <p>© {new Date().getFullYear()} AURA Haute Gastronomie &amp; Private Cellar. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#reservations" className="hover:text-white transition-colors">Reservations Policy</a>
            <span>·</span>
            <a href="#location" className="hover:text-white transition-colors">Dress Code &amp; Valet</a>
            <span>·</span>
            <a href="#reviews" className="hover:text-white transition-colors">Press &amp; Accolades</a>
            <span>·</span>
            <a href="#contact" className="hover:text-white transition-colors">Contact Concierge</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

