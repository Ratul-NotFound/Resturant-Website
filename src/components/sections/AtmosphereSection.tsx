'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { atmosphereData } from '@/data/atmosphereData';
import { AtmosphereRoom, SeatingArea } from '@/lib/types';
import { Sparkles, Users, Check, Maximize2, Calendar } from 'lucide-react';
import { LightboxModal } from '../ui/LightboxModal';

interface AtmosphereSectionProps {
  onSelectAreaForBooking: (area: SeatingArea) => void;
}

export function AtmosphereSection({ onSelectAreaForBooking }: AtmosphereSectionProps) {
  const [activeAreaId, setActiveAreaId] = useState<SeatingArea>('atrium');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const activeRoom: AtmosphereRoom =
    atmosphereData.find((r) => r.id === activeAreaId) || atmosphereData[0];

  const handleOpenLightbox = (index = 0) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <section id="atmosphere" className="relative py-24 sm:py-32 bg-obsidian-950 overflow-hidden text-neutral-300">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(212,175,55,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-primary/10 border border-gold-primary/30 text-gold-light text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="h-3.5 w-3.5 text-gold-primary" /> Architectural Opulence
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-champagne mb-4 tracking-tight">
            The Four Distinct Dining Salons
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
            From the soaring glass-domed Grand Atrium to the subterranean Obsidian Vaults and 12-seat Hinoki counter, choose the perfect atmosphere for your occasion.
          </p>
        </div>

        {/* Salon Selector Tabs */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {atmosphereData.map((room) => (
            <button
              key={room.id}
              onClick={() => setActiveAreaId(room.id)}
              className={`px-5 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeAreaId === room.id
                  ? 'bg-gold-primary text-obsidian-950 shadow-gold-glow'
                  : 'bg-obsidian-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
              }`}
            >
              {room.name}
            </button>
          ))}
        </div>

        {/* Active Room Detailed Showcase Card */}
        <div className="rounded-3xl bg-obsidian-900/90 border border-gold-primary/30 shadow-2xl overflow-hidden grid lg:grid-cols-12 gap-0">
          
          {/* Photography Side with Lightbox Trigger */}
          <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[480px] bg-obsidian-950 group">
            <Image
              src={activeRoom.image}
              alt={activeRoom.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-black/30" />

            {/* Expand Full-Res Lightbox Button */}
            <button
              onClick={() => handleOpenLightbox(0)}
              className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-obsidian-900/90 text-gold-hover text-xs font-semibold border border-gold-primary/30 shadow-xl backdrop-blur-md hover:bg-gold-primary hover:text-obsidian-950 transition-all"
            >
              <Maximize2 className="h-3.5 w-3.5" /> Fullscreen View
            </button>
          </div>

          {/* Details Side */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-light font-semibold block mb-1">
                {activeRoom.tagline}
              </span>
              <h3 className="font-serif text-3xl font-bold text-champagne mb-3">
                {activeRoom.name}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-sans">
                {activeRoom.description}
              </p>

              {/* Capacity Banner */}
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-obsidian-950 border border-neutral-800 text-xs text-neutral-300 mb-6">
                <Users className="h-4 w-4 text-gold-primary shrink-0" />
                <span>{activeRoom.capacity}</span>
              </div>

              {/* Key Features List */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                  Signature Salon Features
                </span>
                {activeRoom.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 text-xs text-neutral-300">
                    <Check className="h-3.5 w-3.5 text-gold-primary shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reserve This Salon Action */}
            <div className="pt-6 border-t border-neutral-800">
              <button
                onClick={() => onSelectAreaForBooking(activeRoom.id)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl gold-button text-xs font-bold uppercase tracking-wider shadow-gold-glow"
              >
                <Calendar className="h-4 w-4" /> Book a Table in {activeRoom.name}
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
