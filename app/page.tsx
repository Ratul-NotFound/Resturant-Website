import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import MegaDealBanner from '@/components/MegaDealBanner'
import MenuSection from '@/components/MenuSection'
import HeritageSection from '@/components/HeritageSection'
import BranchLocator from '@/components/BranchLocator'
import CustomerReviews from '@/components/CustomerReviews'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <MegaDealBanner />
      <MenuSection />
      <HeritageSection />
      <BranchLocator />
      <CustomerReviews />
      <Footer />
    </main>
  )
}
