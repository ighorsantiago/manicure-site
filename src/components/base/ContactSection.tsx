import { theme } from '../../themes'
import config from '../../config'

export default function ContactSection() {
    const whatsappUrl = `https://wa.me/${config.business.phone}?text=${encodeURIComponent(config.contact.whatsappMessage)}`

    return (
        <section
            id="contact"
            className="py-20 px-4 border-t"
            style={{
                backgroundColor: theme.bgPrimary,
                borderColor: theme.border,
            }}
        >
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 text-center">
                <h2
                    className="text-3xl font-bold"
                    style={{ color: theme.accent }}
                >
                    Contato
                </h2>

                <p
                    className="text-sm"
                    style={{ color: theme.textSecondary }}
                >
                    {config.business.address}
                </p>

                {config.business.instagram && (
                    <a
                        href={`https://instagram.com/${config.business.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition-colors hover:opacity-70"
                        style={{ color: theme.textSecondary }}
                    >
                        @{config.business.instagram}
                    </a>
                )}

                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 px-8 py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
                    style={{
                        backgroundColor: theme.accent,
                        color: theme.textOnAccent,
                    }}
                >
                    Falar no WhatsApp
                </a>

                {config.contact.showMap && config.business.googleMapsUrl && (
                    <a
                        href={config.business.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition-colors hover:opacity-70"
                        style={{ color: theme.textMuted }}
                    >
                        Ver no mapa →
                    </a>
                )}

                <div className="flex items-center gap-4 mt-8">
                    <p
                        className="text-xs"
                        style={{ color: theme.textMuted }}
                    >
                        © {new Date().getFullYear()} {config.business.name} · Desenvolvido por Sant.IA.Go
                    </p>
                    <a
                        href="/admin"
                        className="text-xs transition-colors hover:opacity-70"
                        style={{ color: theme.textMuted }}
                    >
                        Área do profissional
                    </a>
                </div>
            </div>
        </section>
    )
}
