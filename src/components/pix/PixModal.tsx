import { QRCodeSVG } from 'qrcode.react'
import { X, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { usePix } from '../../hooks/usePix'
import { theme } from '../../themes'
import type { ServiceItem } from '../../types/config'
import config from '../../config'

interface PixModalProps {
    service: ServiceItem
    onClose: () => void
}

export default function PixModal({ service, onClose }: PixModalProps) {
    const [copied, setCopied] = useState(false)
    const { generatePayload } = usePix(config.pix)
    const payload = generatePayload(service)

    function handleCopy() {
        navigator.clipboard.writeText(payload)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={onClose}
        >
            <div
                className="rounded-2xl p-6 w-full max-w-sm flex flex-col items-center gap-4 border"
                style={{
                    backgroundColor: theme.bgPrimary,
                    borderColor: theme.border,
                }}
                onClick={e => e.stopPropagation()}
            >
                <div className="w-full flex items-center justify-between">
                    <h3 className="font-semibold" style={{ color: theme.textPrimary }}>
                        Pagar via PIX
                    </h3>
                    <button
                        onClick={onClose}
                        className="transition-opacity hover:opacity-60"
                        style={{ color: theme.textMuted }}
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="bg-white p-3 rounded-xl">
                    <QRCodeSVG value={payload} size={200} />
                </div>

                <div className="text-center flex flex-col gap-1">
                    <span className="text-sm" style={{ color: theme.textSecondary }}>
                        {service.name}
                    </span>
                    <span className="text-2xl font-bold" style={{ color: theme.accent }}>
                        R$ {service.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-xs" style={{ color: theme.textMuted }}>
                        Para: {config.pix?.receiverName}
                    </span>
                </div>

                <button
                    onClick={handleCopy}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border text-sm transition-opacity hover:opacity-70"
                    style={{
                        borderColor: theme.border,
                        color: theme.textSecondary,
                    }}
                >
                    {copied
                        ? <><Check size={15} style={{ color: theme.success }} /> Copiado!</>
                        : <><Copy size={15} /> Copiar código PIX</>
                    }
                </button>

                <p className="text-xs text-center" style={{ color: theme.textMuted }}>
                    Escaneie o QR Code ou copie o código para pagar
                </p>
            </div>
        </div>
    )
}
