import Navbar from '@/components/Navbar'
import MenuSection from '@/components/MenuSection'
import Footer from '@/components/Footer'

export default function FullMenuPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F6]">
      <Navbar />
      <main className="flex-1">
        <MenuSection />
      </main>
      <Footer />
    </div>
  )
}
