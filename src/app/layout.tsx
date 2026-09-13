import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';
import { RESTAURANT_INFO } from '@/data/restaurantConfig';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0a0a0c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'AURA | ★★★ Three Michelin Stars Haute Gastronomie & Private Cellar',
  description:
    'Experience AURA, an ultra-luxury Michelin 3-Star dining establishment in Manhattan featuring Miyazaki A5 Wagyu, Brittany Turbot, Alba White Truffles, and an imperial 4,000-bottle private wine cellar.',
  keywords: [
    'Michelin Star Restaurant NYC',
    'Luxury Dining Manhattan',
    'A5 Miyazaki Wagyu',
    'Private Dining Vaults',
    'Haute Cuisine',
    'Fine Wine Cellar',
    'Chef Omakase Counter',
    'AURA Restaurant',
  ],
  authors: [{ name: 'Chef Gabriel Moreau' }],
  creator: 'AURA Restaurant Group',
  publisher: 'AURA Haute Gastronomie',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aura-restaurant.com',
    title: 'AURA | ★★★ Three Michelin Stars Haute Gastronomie',
    description:
      'An uncompromising symphony of flavor, fire, and architectural opulence. Reserve your table at Manhattan’s premier culinary destination.',
    siteName: 'AURA Restaurant & Lounge',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
        width: 1600,
        height: 900,
        alt: 'AURA Restaurant Grand Atrium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AURA | ★★★ Three Michelin Stars Haute Gastronomie',
    description: 'An uncompromising symphony of flavor, fire, and architectural opulence in Manhattan.',
    images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'AURA Luxury Restaurant & Lounge',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
    '@id': 'https://aura-restaurant.com',
    url: 'https://aura-restaurant.com',
    telephone: RESTAURANT_INFO.phone,
    priceRange: '$$$$',
    servesCuisine: ['French Haute Cuisine', 'Contemporary Gastronomy', 'Japanese Wagyu'],
    starRating: {
      '@type': 'Rating',
      ratingValue: '3',
      bestRating: '3',
      ratingExplanation: 'Three Michelin Stars (2025 Edition)',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.98',
      reviewCount: '1420',
      bestRating: '5',
      worstRating: '1',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: RESTAURANT_INFO.address.street,
      addressLocality: RESTAURANT_INFO.address.city,
      addressRegion: RESTAURANT_INFO.address.state,
      postalCode: RESTAURANT_INFO.address.postalCode,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: RESTAURANT_INFO.coordinates.lat,
      longitude: RESTAURANT_INFO.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '12:00',
        closes: '14:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '17:00',
        closes: '23:30',
      },
    ],
    menu: 'https://aura-restaurant.com/#menu',
    acceptsReservations: 'True',
  };

  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-obsidian-950 text-neutral-100 antialiased selection:bg-gold-primary selection:text-obsidian-950">
        {children}
      </body>
    </html>
  );
}
