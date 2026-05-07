export type Blueprint = 'alpha' | 'beta' | 'gamma'

export interface ServiceItem {
    id: string
    name: string
    duration: number
    price: number
    description?: string
}

export interface GalleryImage {
    src: string
    alt: string
}

export interface BookingConfig {
    enabled: true
    workingDays: number[]
    workingHours: { start: string; end: string }
    slotDurationMinutes: number
    maxDaysAhead: number
    adminPassword: string
}

export interface PixConfig {
    enabled: true
    pixKey: string
    receiverName: string
    city: string
    description: string
}

export interface SiteConfig {
    blueprint: Blueprint

    business: {
        name: string
        tagline: string
        phone: string
        address: string
        instagram?: string
        googleMapsUrl?: string
    }

    theme: {
        primaryColor: string
        accentColor: string
    }

    hero: {
        headline: string
        subheadline: string
        ctaText: string
        backgroundImage?: string
    }

    services: ServiceItem[]

    gallery: GalleryImage[]

    contact: {
        whatsappMessage: string
        showMap: boolean
    }

    booking?: BookingConfig
    pix?: PixConfig
}
