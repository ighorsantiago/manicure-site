import { useCallback } from 'react'
import type { PixConfig, ServiceItem } from '../types/config'

function formatPixAmount(value: number): string {
    return value.toFixed(2)
}

function buildPixPayload(pix: PixConfig, amount: number): string {
    const pixKey = pix.pixKey
    const receiverName = pix.receiverName.slice(0, 25).toUpperCase()
    const city = pix.city.slice(0, 15).toUpperCase()
    const description = pix.description.slice(0, 20)
    const amountStr = formatPixAmount(amount)

    function field(id: string, value: string): string {
        const len = value.length.toString().padStart(2, '0')
        return `${id}${len}${value}`
    }

    function crc16(str: string): string {
        let crc = 0xffff
        for (let i = 0; i < str.length; i++) {
            crc ^= str.charCodeAt(i) << 8
            for (let j = 0; j < 8; j++) {
                crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1
            }
        }
        return (crc & 0xffff).toString(16).toUpperCase().padStart(4, '0')
    }

    const merchantAccount = field('00', 'BR.GOV.BCB.PIX') + field('01', pixKey)
    const additionalData = field('05', description)

    const payload =
        field('00', '01') +
        field('26', merchantAccount) +
        field('52', '0000') +
        field('53', '986') +
        field('54', amountStr) +
        field('58', 'BR') +
        field('59', receiverName) +
        field('60', city) +
        field('62', additionalData) +
        '6304'

    return payload + crc16(payload)
}

export function usePix(pix: PixConfig | undefined) {
    const generatePayload = useCallback((service: ServiceItem): string => {
        if (!pix) return ''
        return buildPixPayload(pix, service.price)
    }, [pix])

    return { generatePayload }
}
