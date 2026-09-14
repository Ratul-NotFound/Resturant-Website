import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, inBengali = false): string {
  if (!inBengali) {
    return `৳${amount.toLocaleString('en-US')}`
  }
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  const str = amount.toString()
  const bnStr = str.replace(/[0-9]/g, (w) => bengaliDigits[+w])
  return `৳${bnStr}/-`
}

export function generateOrderNumber(): string {
  const random = Math.floor(10000 + Math.random() * 90000)
  return `FF-${random}`
}

export function generateReservationCode(): string {
  const random = Math.floor(1000 + Math.random() * 9000)
  return `RES-${random}`
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
