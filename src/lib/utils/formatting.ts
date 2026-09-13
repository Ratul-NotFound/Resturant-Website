import { CurrencyCode } from '../types';
import { CURRENCIES } from '@/data/restaurantConfig';

/**
 * Formats a numeric USD price into any target luxury currency string.
 */
export function formatCurrency(
  amountInUSD: number,
  targetCurrency: CurrencyCode = 'USD'
): string {
  const currencyCfg = CURRENCIES.find((c) => c.code === targetCurrency) || CURRENCIES[0];
  const convertedAmount = amountInUSD * currencyCfg.rateAgainstUSD;

  if (targetCurrency === 'JPY') {
    return `¥${Math.round(convertedAmount).toLocaleString('en-US')}`;
  }
  if (targetCurrency === 'CHF') {
    return `CHF ${convertedAmount.toFixed(amountInUSD % 1 === 0 ? 0 : 2)}`;
  }

  return new Intl.NumberFormat(
    targetCurrency === 'EUR' ? 'de-DE' : targetCurrency === 'GBP' ? 'en-GB' : 'en-US',
    {
      style: 'currency',
      currency: targetCurrency,
      minimumFractionDigits: amountInUSD % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }
  ).format(convertedAmount);
}

/**
 * Formats standard ISO date string (YYYY-MM-DD) into readable format.
 */
export function formatDateReadable(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateStr;
  }
}

/**
 * Returns tomorrow's date string in YYYY-MM-DD format.
 */
export function getTomorrowDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

/**
 * Returns today's date string in YYYY-MM-DD format.
 */
export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}
