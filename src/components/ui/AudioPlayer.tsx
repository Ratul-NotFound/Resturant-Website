'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ambientSynth } from '@/lib/utils/audio';
import { useToast } from './Toast';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setIsPlaying(ambientSynth.playing);
  }, []);

  const handleToggle = () => {
    const active = ambientSynth.toggle();
    setIsPlaying(active);
    if (active) {
      showToast('Ambient lounge soundscape activated', 'info', 'Acoustic Ambiance');
    } else {
      showToast('Ambient lounge soundscape muted', 'info', 'Sound Muted');
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border transition-all duration-300 text-xs tracking-wider uppercase ${
        isPlaying
          ? 'bg-gold-primary/15 border-gold-primary text-gold-hover shadow-[0_0_15px_rgba(212,175,55,0.3)]'
          : 'bg-obsidian-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
      }`}
      title={isPlaying ? 'Mute acoustic ambiance' : 'Play synthesized acoustic ambiance'}
      aria-label="Toggle ambient audio"
    >
      {isPlaying ? (
        <>
          <div className="flex items-end gap-0.5 h-3.5 w-3.5">
            <span className="w-0.5 bg-gold-primary rounded-full animate-wave-1" />
            <span className="w-0.5 bg-gold-light rounded-full animate-wave-2" />
            <span className="w-0.5 bg-gold-primary rounded-full animate-wave-3" />
            <span className="w-0.5 bg-champagne rounded-full animate-wave-4" />
          </div>
          <span className="font-medium hidden sm:inline">Aura Soundscape</span>
        </>
      ) : (
        <>
          <VolumeX className="h-3.5 w-3.5" />
          <span className="font-medium hidden sm:inline">Ambiance Off</span>
        </>
      )}
    </button>
  );
}
