import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { theme } from '../../themes'
import config from '../../config'

const navLinks = [
    { label: 'Início', href: '#hero' },
    { label: 'Serviços', href: '#services' },
    { label: 'Galeria', href: '#gallery' },
    { label: 'Agendamento', href: '#booking' },
    { label: 'Contato', href: '#contact' },
]

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-sm"
            style={{
                backgroundColor: theme.bgPrimary + 'ee',
                borderColor: theme.border,
            }}
        >
            <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                <span
                    className="text-lg font-semibold tracking-wide"
                    style={{ color: theme.accent }}
                >
                    {config.business.name}
                </span>

                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm transition-colors"
                            style={{ color: theme.textSecondary }}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <button
                    className="md:hidden transition-colors"
                    style={{ color: theme.textSecondary }}
                    onClick={() => setMenuOpen(prev => !prev)}
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {
                menuOpen && (
                    <nav
                        className="md:hidden border-t px-4 py-4 flex flex-col gap-4"
                        style={{ borderColor: theme.border }}
                    >
                        {navLinks.map(link => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="text-sm transition-colors"
                                style={{ color: theme.textSecondary }}
                            >
                                {link.label}
                            </a>
                        ))
                        }
                    </nav >
                )
            }
        </header >
    )
}
