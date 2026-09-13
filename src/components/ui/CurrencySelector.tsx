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
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141210] border border-gold-primary/20 hover:border-gold-primary/50 text-[#cfc8bc] hover:text-gold-hover text-xs font-mono transition-all"
        aria-label="Select Currency"
      >
        <Globe className="h-3 w-3 text-gold-primary" />
        <span>{activeCurrency.code} ({activeCurrency.symbol.trim()})</span>
        <ChevronDown className="h-3 w-3 text-[#91887b]" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-[#141210] border border-gold-primary/25 shadow-2xl py-1.5 z-50 backdrop-blur-xl animate-fade-in">
          <div className="px-3.5 py-1 text-[9px] uppercase tracking-[0.2em] text-[#91887b] font-medium border-b border-gold-primary/10">
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
                  ? 'bg-gold-primary/10 text-gold-hover font-medium'
                  : 'text-[#cfc8bc] hover:bg-[#1c1916]'
              }`}
            >
              <span>{curr.label}</span>
              <span className="text-gold-light/90">{curr.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
