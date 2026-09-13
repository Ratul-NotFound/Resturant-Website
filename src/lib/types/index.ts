export type DishCategory =
  | 'starters'
  | 'prime-cuts'
  | 'ocean'
  | 'pasta-grains'
  | 'desserts'
  | 'cocktails';

export type DietaryTag =
  | 'gluten-free'
  | 'dairy-free'
  | 'vegan'
  | 'vegetarian'
  | 'halal'
  | 'nut-free'
  | 'keto'
  | 'raw';

export type AllergenType =
  | 'Fish'
  | 'Molluscs'
  | 'Crustaceans'
  | 'Dairy'
  | 'Gluten'
  | 'Eggs'
  | 'Nuts'
  | 'Soy'
  | 'Sesame'
  | 'Mustard';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CHF';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateAgainstUSD: number; // e.g. EUR = 0.92, JPY = 155
  label: string;
}

export interface WinePairing {
  name: string;
  vintage: string;
  region: string;
  notes: string;
  grapeVariety?: string;
  servingTemp?: string;
  glassType?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  category: DishCategory;
  price: number;
  description: string;
  shortDesc?: string;
  ingredients: string[];
  dietary: DietaryTag[];
  allergens: string[];
  calories?: number;
  prepTime?: string;
  isChefSpecial?: boolean;
  isPopular?: boolean;
  isVipReserve?: boolean;
  winePairing?: WinePairing | null;
  chefNote?: string;
  farmProvenance?: string;
  image: string;
  gallery?: string[];
  displayOrder?: number;
}

export type SeatingArea = 'atrium' | 'vault' | 'counter' | 'terrace';

export type OccasionType =
  | 'none'
  | 'birthday'
  | 'anniversary'
  | 'business'
  | 'romance'
  | 'celebration';

export type SlotStatus = 'AVAILABLE' | 'FEW_LEFT' | 'WAITLIST';

export interface TimeSlot {
  time: string;
  label: string;
  isPeak: boolean;
  status: SlotStatus;
  remaining: number;
}

export interface ReservationInput {
  partySize: number;
  date: string;
  timeSlot: string;
  seatingArea: SeatingArea;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  occasion: OccasionType;
  dietaryNotes: string;
}

export interface ReservationRecord extends ReservationInput {
  id: string;
  bookingReference: string;
  status: 'CONFIRMED' | 'SEATED' | 'COMPLETED' | 'CANCELLED';
  qrData?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}

export interface OrderCustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface OrderPayload {
  customer: OrderCustomerInfo;
  items: Array<{
    id: string;
    quantity: number;
    notes?: string;
  }>;
  couponCode?: string;
  tipPercentage: number;
  currency?: CurrencyCode;
}

export interface OrderCalculation {
  subtotal: number;
  discount: number;
  discountPercentage: number;
  tax: number;
  tip: number;
  grandTotal: number;
  estimatedPrepMinutes: number;
  currency?: CurrencyCode;
  exchangeRate?: number;
}

export interface AtmosphereRoom {
  id: SeatingArea;
  name: string;
  tagline: string;
  description: string;
  capacity: string;
  features: string[];
  image: string;
  gallery: string[];
  lightingPresets: {
    daylight: string;
    sunset: string;
    starlight: string;
  };
}

export interface ChefSpecial {
  id: string;
  dishId: string;
  title: string;
  subTitle: string;
  quote: string;
  chefName: string;
  chefTitle: string;
  frontImage: string;
  backImage: string;
  technique: string;
  flavorProfile: string[];
}

export interface PressReview {
  id: string;
  quote: string;
  publication: string;
  author: string;
  rating: string;
  year: string;
  awardBadge?: string;
}

export interface OpeningHour {
  day: string;
  lunch: string;
  dinner: string;
  isOpen: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  duration?: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'reservations' | 'cellar' | 'experience' | 'policies';
}

export interface PrivateDiningInquiry {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  partySize: number;
  salonPreference: SeatingArea | 'full-buyout';
  estimatedBudget: string;
  message: string;
}
