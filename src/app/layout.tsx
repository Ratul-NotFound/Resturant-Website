import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#C8102E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Flame & Feast | Fiery Flame-Grilled & Heritage Dum Delicacies',
  description:
    'Succulent Flame-Grilled Peri-Peri Chicken marinated with 100% natural spices, alongside authentic slow-cooked royal Basmati Kacchi Biryani and mouth-watering platters.',
  keywords: [
    'Flame & Feast',
    'Peri-Peri Chicken',
    'Flame-Grilled Chicken',
    'Basmati Kacchi Biryani',
    'Mutton Tehari',
    'Galitos Restaurant',
    'Halal Restaurant',
    'Dhaka Food Delivery',
  ],
  authors: [{ name: 'Flame & Feast Culinary Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://flamefeastbd.com',
    title: 'Flame & Feast | Fiery Flame-Grilled & Heritage Dum Delicacies',
    description:
      'We serve succulent Flame-Grilled Peri-Peri Chicken marinated with 100% natural spices, alongside authentic slow-cooked royal Basmati Kacchi Biryani.',
    siteName: 'Flame & Feast',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdm284yXzGVEejz-0aK_r7cF1GFb39rENU6IBzqXmdKexlt6ZvbVt0W1e6TTSDfI8D5pIk_mdDZRBpoQdJO6JuRbsYEaisCbDkfEfXmXD_Q5zE-O2_Zehtu2hluoAh-6UQDLETqVBPauEuUv2cPQj9xc6Jj-cWGxkyOUc5uAI4rKoAhm6DBvw9r-ezf9cVafb-30tIEvuYXScw7WFUXNt287RAxsFvA8JnRUMuuz6151RHENGpxEpedg',
        width: 1200,
        height: 630,
        alt: 'Flame & Feast Whole Grilled Chicken',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${montserrat.variable} ${playfair.variable}`}>
      <head>
        {/* FontAwesome 6 CDN for pixel-perfect icon rendering */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans text-slate-800 bg-white antialiased selection:bg-brand-red selection:text-white">
        {children}
      </body>
    </html>
  );
}
