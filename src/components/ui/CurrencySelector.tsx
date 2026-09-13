'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CurrencyCode } from '@/lib/types';
import { CURRENCIES } from '@/data/restaurantConfig';
import { ChevronDown, Globe } from 'lucide-react';

interface CurrencySelectorProps {
  currentCurrency: CurrencyCode;
  onSelectCurrency: (code: CurrencyCode) => void;
}

export function CurrencySelector({
  currentCurrency,
  onSelectCurrency,
}: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeCurrency = CURRENCIES.find((c) => c.code === currentCurrency) || CURRENCIES[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-obsidian-900 border border-neutral-800 hover:border-gold-primary/40 text-neutral-300 hover:text-gold-hover text-xs font-mono transition-all"
        aria-label="Select Currency"
      >
        <Globe className="h-3 w-3 text-gold-primary" />
        <span>{activeCurrency.code} ({activeCurrency.symbol.trim()})</span>
        <ChevronDown className="h-3 w-3 text-neutral-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-obsidian-900 border border-gold-primary/30 shadow-2xl py-1.5 z-50 backdrop-blur-xl animate-fade-in">
          <div className="px-3 py-1 text-[10px] uppercase tracking-widest text-neutral-500 font-semibold border-b border-neutral-800">
            Cellar Currency
          </div>
          {CURRENCIES.map((curr) => (
            <button
              key={curr.code}
              type="button"
              onClick={() => {
                onSelectCurrency(curr.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left font-mono transition-colors ${
                currentCurrency === curr.code
                  ? 'bg-gold-primary/15 text-gold-hover font-bold'
                  : 'text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              <span>{curr.label}</span>
              <span className="text-gold-light">{curr.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
