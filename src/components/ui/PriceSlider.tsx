'use client';

import React from 'react';
import { formatCurrency } from '@/lib/utils/formatting';

interface PriceSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (val: number) => void;
}

export function PriceSlider({ min, max, value, onChange }: PriceSliderProps) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-xs">
      <div className="flex items-center justify-between text-xs tracking-wider">
        <span className="text-neutral-400 uppercase">Max Budget:</span>
        <span className="font-serif font-bold text-gold-primary text-sm">
          {value >= max ? 'Any Price' : `Up to ${formatCurrency(value)}`}
        </span>
      </div>
      <div className="relative flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={5}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-gold-primary focus:outline-none focus:ring-1 focus:ring-gold-primary"
        />
      </div>
      <div className="flex justify-between text-[10px] text-neutral-500 font-sans">
        <span>{formatCurrency(min)}</span>
        <span>{formatCurrency(max)}+</span>
      </div>
    </div>
  );
}
