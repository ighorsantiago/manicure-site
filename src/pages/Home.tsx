import Header from '../components/base/Header'
import HeroSection from '../components/base/HeroSection'
import ServicesSection from '../components/base/ServicesSection'
import GallerySection from '../components/base/GallerySection'
import BookingSection from '../components/calendar/BookingSection'
import ContactSection from '../components/base/ContactSection'
import WhatsAppButton from '../components/base/WhatsAppButton'

export default function Home() {
    return (
        <main>
            <Header />
            <HeroSection />
            <ServicesSection />
            <GallerySection />
            <BookingSection />
            <ContactSection />
            <WhatsAppButton />
        </main>
    )
}
