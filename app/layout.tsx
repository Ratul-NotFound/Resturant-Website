import type { Metadata } from 'next'
import './globals.css'
import ToastNotification from '@/components/ToastNotification'
import CartDrawer from '@/components/CartDrawer'
import DishCustomizerModal from '@/components/DishCustomizerModal'
import CheckoutModal from '@/components/CheckoutModal'
import FloatingMobileBar from '@/components/FloatingMobileBar'

export const metadata: Metadata = {
  title: 'Flame & Feast | Fiery Flame-Grilled Peri-Peri & Heritage Dum Delicacies',
  description:
    'Experience the culinary harmony of authentic Flame-Grilled Peri-Peri Chicken and Royal Basmati Kacchi Biryani. Fast delivery & dine-in across Dhanmondi, Gulshan, Banani, and Uttara.',
  keywords: [
    'Flame and Feast',
    'Kacchi Biryani',
    'Flame-Grilled Chicken',
    'Peri Peri Chicken',
    'Basmati Kacchi',
    'Tehari',
    'Dhaka Restaurant',
    'Online Food Delivery',
  ],
  authors: [{ name: 'Flame & Feast Inc.' }],
  openGraph: {
    title: 'Flame & Feast | Fiery Flame-Grilled & Royal Dum Biryani',
    description:
      'Succulent Flame-Grilled Peri-Peri Chicken and 4-hour slow-cooked Royal Basmati Kacchi Biryani.',
    url: 'https://flamefeastbd.com',
    siteName: 'Flame & Feast',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans text-slate-800 bg-white antialiased selection:bg-brand-red selection:text-white">
        {/* Global Floating Modals & Alerts */}
        <ToastNotification />
        <CartDrawer />
        <DishCustomizerModal />
        <CheckoutModal />
        <FloatingMobileBar />

        {/* Page Children */}
        {children}
      </body>
    </html>
  )
}
