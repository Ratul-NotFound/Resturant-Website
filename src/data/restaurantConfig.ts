import { OpeningHour, SeatingArea } from '@/lib/types';

export const RESTAURANT_INFO = {
  name: 'AURA',
  subtitle: 'Haute Gastronomie & Private Cellar',
  established: 2018,
  michelinStars: 3,
  tagline: 'An Uncompromising Symphony of Flavor, Fire & Architectural Opulence',
  phone: '+1 (212) 840-2872',
  email: 'concierge@aura-restaurant.com',
  reservationsEmail: 'reservations@aura-restaurant.com',
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
};

export const PROMO_COUPONS: Record<string, { discountPercent: number; description: string }> = {
  AURA20: { discountPercent: 20, description: '20% Grand Inauguration Prestige Discount' },
  VIP10: { discountPercent: 10, description: '10% Private Cellar Member Courtesy' },
  CHEFGIFT: { discountPercent: 15, description: '15% Executive Chef Tasting Courtesy' },
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
