import { useState } from 'react'
import { theme } from '../../themes'
import config from '../../config'
import type { ServiceItem } from '../../types/config'
import PixModal from '../pix/PixModal'

export default function ServicesSection() {
    const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)

    return (
        <section
            id="services"
            className="py-20 px-4"
            style={{ backgroundColor: theme.bgPrimary }}
        >
            <div className="max-w-5xl mx-auto">
                <h2
                    className="text-3xl font-bold text-center mb-12"
                    style={{ color: theme.accent }}
                >
                    Serviços
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {config.services.map(service => (
                        <div
                            key={service.id}
                            className="rounded-xl px-6 py-5 flex flex-col gap-2 border transition-colors"
                            style={{
                                backgroundColor: theme.bgCard,
                                borderColor: theme.border,
                            }}
                        >
                            <span
                                className="font-semibold text-lg"
                                style={{ color: theme.textPrimary }}
                            >
                                {service.name}
                            </span>

                            {service.description && (
                                <span
                                    className="text-sm"
                                    style={{ color: theme.textSecondary }}
                                >
                                    {service.description}
                                </span>
                            )}

                            <div className="flex items-center justify-between mt-2">
                                <span
                                    className="text-sm"
                                    style={{ color: theme.textMuted }}
                                >
                                    {service.duration} min
                                </span>
                                <span
                                    className="font-semibold text-sm"
                                    style={{ color: theme.accent }}
                                >
                                    R$ {service.price.toFixed(2).replace('.', ',')}
                                </span>
                            </div>

                            {config.pix?.enabled && (
                                <button
                                    onClick={() => setSelectedService(service)}
                                    className="mt-2 w-full py-2 rounded-lg text-sm font-semibold border transition-opacity hover:opacity-80"
                                    style={{
                                        borderColor: theme.accent,
                                        color: theme.accent,
                                    }}
                                >
                                    Pagar via PIX
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {selectedService && (
                <PixModal
                    service={selectedService}
                    onClose={() => setSelectedService(null)}
                />
            )}
        </section>
    )
}
