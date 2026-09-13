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
  }
> = {
  atrium: {
    name: 'The Grand Atrium',
    dotColor: 'bg-amber-500',
    activeTab: 'bg-neutral-900 text-white shadow-sm',
  },
  vault: {
    name: 'The Obsidian Vault',
    dotColor: 'bg-purple-500',
    activeTab: 'bg-neutral-900 text-white shadow-sm',
  },
  counter: {
    name: "The Chef's Omakase Counter",
    dotColor: 'bg-brand-red',
    activeTab: 'bg-neutral-900 text-white shadow-sm',
  },
  terrace: {
    name: 'The Heated Sky Terrace',
    dotColor: 'bg-sky-500',
    activeTab: 'bg-neutral-900 text-white shadow-sm',
  },
};

export function AtmosphereSection({ onSelectAreaForBooking }: AtmosphereSectionProps) {
  const [activeAreaId, setActiveAreaId] = useState<SeatingArea>('atrium');
  const [lightingMood, setLightingMood] = useState<LightingMood>('starlight');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const activeRoom: AtmosphereRoom =
    atmosphereData.find((r) => r.id === activeAreaId) || atmosphereData[0];

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
    return 'bg-blue-950/30 mix-blend-multiply';
  };

  return (
    <section id="atmosphere" className="scroll-mt-28 relative py-24 sm:py-32 overflow-hidden bg-[#fafaf8]">
      
      {/* Ambient background glow */}
      <div
        className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(232,48,42,0.05) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-brand-red border border-red-200 text-xs font-bold uppercase tracking-wider mb-4">
            <Building2 className="h-3.5 w-3.5" /> Architecture &amp; Ambience
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight uppercase mb-4">
            The Dining <span className="text-gradient-red italic">Salons &amp; Gallery</span>
          </h2>
          <p className="text-neutral-600 text-sm leading-relaxed max-w-xl mx-auto font-normal">
            Four bespoke architectural enclaves calibrated across natural daylight, golden hour, and candlelit evening service.
          </p>
        </div>

        {/* Salon Selector Tabs + Lighting Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Salon Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none w-full sm:w-auto p-1 bg-neutral-100/80 rounded-2xl border border-neutral-200">
            {atmosphereData.map((room) => {
              const pal = SALON_PALETTES[room.id];
              const isSelected = activeAreaId === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => setActiveAreaId(room.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wider whitespace-nowrap transition-all duration-300 ${
                    isSelected
                      ? `${pal.activeTab}`
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/60'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${pal.dotColor}`} />
                  {room.name}
                </button>
              );
            })}
          </div>

          {/* Lighting Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-neutral-100/80 rounded-2xl border border-neutral-200 text-xs">
            <button
              onClick={() => setLightingMood('daylight')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                lightingMood === 'daylight'
                  ? 'bg-amber-400 text-neutral-900 shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Sun className="h-3 w-3" /> Day
            </button>
            <button
              onClick={() => setLightingMood('sunset')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                lightingMood === 'sunset'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Sunset className="h-3 w-3" /> Sunset
            </button>
            <button
              onClick={() => setLightingMood('starlight')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                lightingMood === 'starlight'
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Moon className="h-3 w-3" /> Starlight
            </button>
          </div>
        </div>

        {/* Active Room Detailed Showcase Card */}
        <div className="rounded-3xl bg-white border border-neutral-100 hover:border-neutral-200 transition-all duration-500 overflow-hidden grid lg:grid-cols-12 gap-0 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
          
          {/* Photography Side with Lightbox Trigger */}
          <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] bg-neutral-100 group overflow-hidden">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

            {/* Salon Tag */}
            <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-neutral-900 font-bold text-xs shadow-md border border-black/5">
              {activeRoom.tagline}
            </div>

            {/* Expand Full-Res Lightbox Button */}
            <button
              onClick={() => handleOpenLightbox(0)}
              className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 text-neutral-900 text-xs font-bold border border-black/10 shadow-lg backdrop-blur-md hover:bg-brand-red hover:text-white transition-all"
            >
              <Maximize2 className="h-3.5 w-3.5" /> View Photo Gallery
            </button>
          </div>

          {/* Details Side */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6 bg-white">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-red font-bold block mb-1">
                {activeRoom.tagline}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
                {activeRoom.name}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mb-6 font-normal">
                {activeRoom.description}
              </p>

              {/* Capacity Banner */}
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-neutral-50 border border-neutral-100 text-xs text-neutral-700 mb-6 font-semibold">
                <Users className="h-4 w-4 text-brand-red shrink-0" />
                <span>{activeRoom.capacity}</span>
              </div>

              {/* Key Features List */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-bold">
                  Signature Features
                </span>
                {activeRoom.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 text-xs text-neutral-600 font-normal">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reserve This Salon Action */}
            <div className="pt-6 border-t border-neutral-100">
              <button
                onClick={() => onSelectAreaForBooking(activeRoom.id)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-neutral-900 hover:bg-brand-red text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all hover:scale-[1.02] active:scale-95"
              >
                <Calendar className="h-4 w-4" /> Reserve Table in {activeRoom.name}
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
