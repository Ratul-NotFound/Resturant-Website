'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { atmosphereData } from '@/data/atmosphereData';
import { AtmosphereRoom, SeatingArea } from '@/lib/types';
import { Building2, Users, Check, Maximize2, Calendar, Sun, Sunset, Moon } from 'lucide-react';
import { LightboxModal } from '../ui/LightboxModal';

interface AtmosphereSectionProps {
  onSelectAreaForBooking: (area: SeatingArea) => void;
}

type LightingMood = 'daylight' | 'sunset' | 'starlight';

const SALON_PALETTES: Record<
  SeatingArea,
  {
    name: string;
    dotColor: string;
    activeTab: string;
    borderGlow: string;
    badgeBg: string;
  }
> = {
  atrium: {
    name: 'The Grand Atrium',
    dotColor: 'bg-amber-500',
    activeTab: 'bg-amber-50 text-amber-800 border-amber-400 shadow-md',
    borderGlow: 'border-amber-400 shadow-amber-200/60',
    badgeBg: 'bg-amber-50 border-amber-200 text-amber-800',
  },
  vault: {
    name: 'The Obsidian Vault',
    dotColor: 'bg-purple-500',
    activeTab: 'bg-purple-50 text-purple-800 border-purple-400 shadow-md',
    borderGlow: 'border-purple-400 shadow-purple-200/60',
    badgeBg: 'bg-purple-50 border-purple-200 text-purple-800',
  },
  counter: {
    name: "The Chef's Omakase Counter",
    dotColor: 'bg-rose-500',
    activeTab: 'bg-rose-50 text-rose-800 border-rose-400 shadow-md',
    borderGlow: 'border-rose-400 shadow-rose-200/60',
    badgeBg: 'bg-rose-50 border-rose-200 text-rose-800',
  },
  terrace: {
    name: 'The Heated Sky Terrace',
    dotColor: 'bg-sky-500',
    activeTab: 'bg-sky-50 text-sky-800 border-sky-400 shadow-md',
    borderGlow: 'border-sky-400 shadow-sky-200/60',
    badgeBg: 'bg-sky-50 border-sky-200 text-sky-800',
  },
};

export function AtmosphereSection({ onSelectAreaForBooking }: AtmosphereSectionProps) {
  const [activeAreaId, setActiveAreaId] = useState<SeatingArea>('atrium');
  const [lightingMood, setLightingMood] = useState<LightingMood>('starlight');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const activeRoom: AtmosphereRoom =
    atmosphereData.find((r) => r.id === activeAreaId) || atmosphereData[0];
  const currentPalette = SALON_PALETTES[activeAreaId];

  const handleOpenLightbox = (index = 0) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const getMoodOverlayStyle = () => {
    if (lightingMood === 'daylight') {
      return 'bg-amber-100/10 mix-blend-soft-light';
    }
    if (lightingMood === 'sunset') {
      return 'bg-orange-500/20 mix-blend-color-burn';
    }
    return 'bg-blue-950/40 mix-blend-multiply';
  };

  return (
    <section id="atmosphere" className="scroll-mt-28 relative py-24 sm:py-32 overflow-hidden" style={{ background: '#ffffff' }}>
      
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(232,48,42,0.05) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8302a]/08 border border-[#e8302a]/20 text-[#e8302a] text-[10px] uppercase tracking-[0.3em] font-bold mb-5">
            <Building2 className="h-3 w-3" /> Architecture &amp; Ambience
          </div>
          <h2 className="headline-display text-3xl sm:text-5xl mb-5">
            The Dining <span className="italic text-gradient-red">Salons</span>
          </h2>
          <p className="text-[#666] text-sm leading-relaxed max-w-xl mx-auto">
            Four bespoke architectural enclaves calibrated across natural daylight, golden hour, and candlelit evening service.
          </p>
        </div>

        {/* Salon Selector Tabs + Lighting Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Salon Tabs */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none w-full sm:w-auto">
            {atmosphereData.map((room) => {
              const pal = SALON_PALETTES[room.id];
              const isSelected = activeAreaId === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => setActiveAreaId(room.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-serif tracking-wider whitespace-nowrap transition-all duration-300 border ${
                    isSelected
                      ? `${pal.activeTab} font-semibold`
                      : 'bg-[#141210] border-white/10 text-neutral-400 hover:text-white hover:border-white/25'
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${pal.dotColor}`} />
                  {room.name}
                </button>
              );
            })}
          </div>

          {/* Lighting Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-[#141210] rounded-full border border-white/10 text-xs">
            <button
              onClick={() => setLightingMood('daylight')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-all ${
                lightingMood === 'daylight'
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                  : 'text-[#91887b] hover:text-white'
              }`}
            >
              <Sun className="h-3 w-3" /> Day
            </button>
            <button
              onClick={() => setLightingMood('sunset')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-all ${
                lightingMood === 'sunset'
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                  : 'text-[#91887b] hover:text-white'
              }`}
            >
              <Sunset className="h-3 w-3" /> Sunset
            </button>
            <button
              onClick={() => setLightingMood('starlight')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-all ${
                lightingMood === 'starlight'
                  ? 'bg-gold-primary/20 text-gold-hover border border-gold-primary/40'
                  : 'text-[#91887b] hover:text-white'
              }`}
            >
              <Moon className="h-3 w-3" /> Starlight
            </button>
          </div>
        </div>

        {/* Active Room Detailed Showcase Card */}
        <div className={`rounded-3xl bg-[#141210] border ${currentPalette.borderGlow} transition-all duration-500 overflow-hidden grid lg:grid-cols-12 gap-0 shadow-2xl`}>
          
          {/* Photography Side with Lightbox Trigger */}
          <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] bg-[#0c0b0a] group overflow-hidden">
            <Image
              src={activeRoom.image}
              alt={activeRoom.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dynamic Mood Lighting Overlay */}
            <div className={`absolute inset-0 transition-colors duration-700 ${getMoodOverlayStyle()}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a]/90 via-transparent to-black/20" />

            {/* Expand Full-Res Lightbox Button */}
            <button
              onClick={() => handleOpenLightbox(0)}
              className="absolute bottom-6 right-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141210]/90 text-gold-hover text-xs font-medium border border-gold-primary/30 shadow-lg backdrop-blur-md hover:bg-gold-primary hover:text-[#0c0b0a] transition-all"
            >
              <Maximize2 className="h-3 w-3" /> View Gallery
            </button>
          </div>

          {/* Details Side */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-gold-light block mb-1">
                {activeRoom.tagline}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-champagne mb-3">
                {activeRoom.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#cfc8bc] leading-relaxed mb-6 font-sans font-light">
                {activeRoom.description}
              </p>

              {/* Capacity Banner */}
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0c0b0a] border border-gold-primary/15 text-xs text-[#cfc8bc] mb-6">
                <Users className="h-4 w-4 text-gold-primary shrink-0" />
                <span>{activeRoom.capacity}</span>
              </div>

              {/* Key Features List */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#91887b] block">
                  Signature Features
                </span>
                {activeRoom.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 text-xs text-[#cfc8bc] font-light">
                    <Check className="h-3.5 w-3.5 text-gold-primary shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reserve This Salon Action */}
            <div className="pt-6 border-t border-gold-primary/15">
              <button
                onClick={() => onSelectAreaForBooking(activeRoom.id)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full gold-button text-xs font-semibold uppercase tracking-wider shadow-gold-sm"
              >
                <Calendar className="h-3.5 w-3.5" /> Reserve Table in {activeRoom.name}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        isOpen={isLightboxOpen}
        images={activeRoom.gallery}
        currentIndex={lightboxIndex}
        title={activeRoom.name}
        onClose={() => setIsLightboxOpen(false)}
        onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : activeRoom.gallery.length - 1))}
        onNext={() => setLightboxIndex((prev) => (prev < activeRoom.gallery.length - 1 ? prev + 1 : 0))}
      />
    </section>
  );
}
