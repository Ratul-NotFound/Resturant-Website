import { OpeningHour, SeatingArea, CurrencyConfig, FAQItem } from '@/lib/types';

export const RESTAURANT_INFO = {
  name: 'AURA',
  subtitle: 'Haute Gastronomie & Private Cellar',
  established: 2018,
  michelinStars: 3,
  tagline: 'An Uncompromising Symphony of Flavor, Fire & Architectural Opulence',
  phone: '+1 (212) 840-2872',
  email: 'concierge@aura-restaurant.com',
  reservationsEmail: 'reservations@aura-restaurant.com',
  privateEventsEmail: 'events@aura-restaurant.com',
  address: {
    street: '432 Park Avenue, 30th Floor',
    city: 'New York',
    state: 'NY',
    postalCode: '10022',
    country: 'United States',
  },
  coordinates: {
    lat: 40.7615,
    lng: -73.9712,
  },
  valetParking: 'Complimentary private white-glove valet on 56th Street entrance.',
  dressCode: 'Elegant Attire Required. Jackets recommended for gentlemen. Athletic wear, caps, and beachwear are strictly prohibited.',
  corkagePolicy: '$150 per 750ml bottle (maximum 2 bottles per party, must not be present on our active 4,000-bottle list).',
  socialLinks: {
    facebook: 'https://facebook.com/aurarestaurant',
    instagram: 'https://instagram.com/aurarestaurant',
    tiktok: 'https://tiktok.com/@aurarestaurant',
    youtube: 'https://youtube.com/@aurarestaurant',
  },
};

export const CURRENCIES: CurrencyConfig[] = [
  { code: 'BDT', symbol: '৳', rateAgainstUSD: 1.0, label: 'BDT (৳)' },
  { code: 'USD', symbol: '$', rateAgainstUSD: 1.0, label: 'USD ($)' },
  { code: 'EUR', symbol: '€', rateAgainstUSD: 0.92, label: 'EUR (€)' },
  { code: 'GBP', symbol: '£', rateAgainstUSD: 0.79, label: 'GBP (£)' },
  { code: 'JPY', symbol: '¥', rateAgainstUSD: 155.0, label: 'JPY (¥)' },
  { code: 'CHF', symbol: 'CHF ', rateAgainstUSD: 0.88, label: 'CHF' },
];

export const PROMO_COUPONS: Record<string, { discountPercent: number; description: string; isVip?: boolean }> = {
  AURA20: { discountPercent: 20, description: '20% Grand Inauguration Prestige Courtesy' },
  VIP10: { discountPercent: 10, description: '10% Private Cellar Member Courtesy' },
  CHEFGIFT: { discountPercent: 15, description: '15% Executive Chef Tasting Courtesy' },
  CHEFVIP: { discountPercent: 25, description: '25% Confidential Master Brigade Allocation', isVip: true },
  MICHELIN3: { discountPercent: 30, description: '30% Three Stars Milestone Patron Courtesy', isVip: true },
};

export const OPENING_HOURS: OpeningHour[] = [
  { day: 'Monday', lunch: 'Closed', dinner: '17:30 – 23:00', isOpen: true },
  { day: 'Tuesday', lunch: '12:00 – 14:30', dinner: '17:30 – 23:00', isOpen: true },
  { day: 'Wednesday', lunch: '12:00 – 14:30', dinner: '17:30 – 23:00', isOpen: true },
  { day: 'Thursday', lunch: '12:00 – 14:30', dinner: '17:30 – 23:30', isOpen: true },
  { day: 'Friday', lunch: '12:00 – 14:30', dinner: '17:00 – 00:00', isOpen: true },
  { day: 'Saturday', lunch: '11:30 – 15:00', dinner: '17:00 – 00:00', isOpen: true },
  { day: 'Sunday', lunch: '11:30 – 15:30', dinner: '17:00 – 22:30', isOpen: true },
];

export const SLOT_CAPACITY_CONFIG: Array<{ area: SeatingArea; time: string; tables: number }> = [
  // Atrium (5 tables per slot)
  { area: 'atrium', time: '17:00', tables: 5 },
  { area: 'atrium', time: '17:30', tables: 5 },
  { area: 'atrium', time: '18:00', tables: 5 },
  { area: 'atrium', time: '18:30', tables: 5 },
  { area: 'atrium', time: '19:00', tables: 5 },
  { area: 'atrium', time: '19:30', tables: 5 },
  { area: 'atrium', time: '20:00', tables: 5 },
  { area: 'atrium', time: '20:30', tables: 5 },
  { area: 'atrium', time: '21:00', tables: 5 },
  { area: 'atrium', time: '21:30', tables: 5 },

  // Obsidian Vault (3 tables per slot)
  { area: 'vault', time: '17:30', tables: 3 },
  { area: 'vault', time: '18:00', tables: 3 },
  { area: 'vault', time: '18:30', tables: 3 },
  { area: 'vault', time: '19:00', tables: 3 },
  { area: 'vault', time: '19:30', tables: 3 },
  { area: 'vault', time: '20:00', tables: 3 },
  { area: 'vault', time: '20:30', tables: 3 },
  { area: 'vault', time: '21:00', tables: 3 },

  // Chef's Counter (2 seatings: 18:00 & 21:00, 6 pairs = 6 tables)
  { area: 'counter', time: '18:00', tables: 6 },
  { area: 'counter', time: '21:00', tables: 6 },

  // Heated Sky Terrace (4 tables per slot)
  { area: 'terrace', time: '17:00', tables: 4 },
  { area: 'terrace', time: '17:30', tables: 4 },
  { area: 'terrace', time: '18:00', tables: 4 },
  { area: 'terrace', time: '18:30', tables: 4 },
  { area: 'terrace', time: '19:00', tables: 4 },
  { area: 'terrace', time: '19:30', tables: 4 },
  { area: 'terrace', time: '20:00', tables: 4 },
  { area: 'terrace', time: '20:30', tables: 4 },
  { area: 'terrace', time: '21:00', tables: 4 },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'reservations',
    question: 'How far in advance are reservations released?',
    answer:
      'Reservations open exactly 90 days in advance at 12:00 AM EST. Private Vault and Omakase Counter allocations often book within hours of release.',
  },
  {
    category: 'reservations',
    question: 'What is the cancellation and rescheduling policy?',
    answer:
      'We understand plans change. Reservations may be rescheduled or cancelled up to 24 hours in advance using your AURA-2026 digital reference code with zero fees.',
  },
  {
    category: 'cellar',
    question: 'May we bring our own vintage wines?',
    answer:
      'Yes. Our corkage fee is $150 per 750ml bottle (maximum 2 bottles per party), provided the vintage is not currently featured on our active 4,000-bottle cellar registry.',
  },
  {
    category: 'cellar',
    question: 'Are non-alcoholic pairings available for tasting menus?',
    answer:
      'Absolutely. Our Head Sommelier crafts an elaborate 7-course artisanal botanic infusion and cold-drip tea pairing specifically matching each culinary course.',
  },
  {
    category: 'experience',
    question: 'What is the strict dress code standard?',
    answer:
      'We require elegant evening attire. Tailored jackets are recommended for gentlemen. Athletic apparel, t-shirts, caps, shorts, and casual sandals are strictly prohibited.',
  },
  {
    category: 'policies',
    question: 'Can dietary allergies and medical restrictions be accommodated?',
    answer:
      'Yes. Our kitchen operates with certified allergen separation protocols. Please note any dietary needs in your reservation or filter courses using our online allergen matrix.',
  },
];
