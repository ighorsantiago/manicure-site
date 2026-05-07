import type { SiteConfig } from './types/config'

const config: SiteConfig = {
    blueprint: 'gamma',

    business: {
        name: 'Manicure',
        tagline: 'Unhas perfeitas para cada ocasião',
        phone: '5521964777735',
        address: 'Rua Exemplo, 123 — Rio de Janeiro, RJ',
        instagram: 'manicure',
    },

    theme: {
        primaryColor: '#FAF7F5',
        accentColor: '#C084A0',
    },

    hero: {
        headline: 'Suas unhas merecem o melhor',
        subheadline: 'Nail art, gel, acrílico e muito mais com quem entende do ofício.',
        ctaText: 'Agendar horário',
        backgroundImage: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1400&auto=format&fit=crop',
    },

    services: [
        { id: 'simple-polish', name: 'Esmaltação simples', duration: 40, price: 35 },
        { id: 'gel', name: 'Gel', duration: 90, price: 120 },
        { id: 'acrylic', name: 'Acrílico', duration: 120, price: 150 },
        { id: 'nail-art', name: 'Nail art', duration: 60, price: 80 },
        { id: 'manicure', name: 'Manicure completa', duration: 50, price: 50 },
        { id: 'pedicure', name: 'Pedicure completa', duration: 60, price: 55 },
    ],

    gallery: [
        {
            src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop',
            alt: 'Nail art colorida',
        },
        {
            src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop',
            alt: 'Unhas em gel',
        },
        {
            src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&auto=format&fit=crop',
            alt: 'Manicure completa',
        },
    ],

    contact: {
        whatsappMessage: 'Olá! Quero agendar um horário na manicure.',
        showMap: true,
    },

    booking: {
        enabled: true,
        workingDays: [1, 2, 3, 4, 5, 6],
        workingHours: { start: '09:00', end: '19:00' },
        slotDurationMinutes: 30,
        maxDaysAhead: 30,
        adminPassword: '1234',
    },

    pix: {
        enabled: true,
        pixKey: '11999999999',
        receiverName: 'Manicure Studio',
        city: 'Rio de Janeiro',
        description: 'Pagamento manicure',
    },
}

export default config
