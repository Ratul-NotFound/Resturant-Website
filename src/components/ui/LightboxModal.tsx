'use client';

import React from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  title: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function LightboxModal({
  isOpen,
  images,
  currentIndex,
  title,
  onClose,
  onPrev,
  onNext,
}: LightboxModalProps) {
  if (!isOpen || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      {/* Top Header */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-light font-medium block">
            Atmosphere Architecture
          </span>
          <h3 className="font-serif text-xl font-bold text-champagne">{title}</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-obsidian-900/80 text-neutral-300 hover:text-white border border-neutral-700 hover:border-gold-primary transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Main Image View */}
      <div
        className="relative w-full max-w-5xl h-[70vh] sm:h-[80vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-contain rounded-2xl shadow-2xl"
        />

        {/* Prev & Next Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-obsidian-900/90 text-gold-light hover:text-white border border-gold-primary/40 hover:bg-gold-primary hover:text-obsidian-950 transition-all shadow-xl"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-obsidian-900/90 text-gold-light hover:text-white border border-gold-primary/40 hover:bg-gold-primary hover:text-obsidian-950 transition-all shadow-xl"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Counter indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-obsidian-900/80 border border-neutral-800 text-xs font-mono text-neutral-300">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
