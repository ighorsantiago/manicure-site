import { useState } from 'react'
import { theme } from '../../themes'
import config from '../../config'
import { useBooking } from '../../hooks/useBooking'
import type { ServiceItem } from '../../types/config'

function generateTimeSlots(start: string, end: string, duration: number): string[] {
    const slots: string[] = []
    const [startHour, startMin] = start.split(':').map(Number)
    const [endHour, endMin] = end.split(':').map(Number)
    const startTotal = startHour * 60 + startMin
    const endTotal = endHour * 60 + endMin

    for (let time = startTotal; time < endTotal; time += duration) {
        const h = Math.floor(time / 60).toString().padStart(2, '0')
        const m = (time % 60).toString().padStart(2, '0')
        slots.push(`${h}:${m}`)
    }

    return slots
}

function getAvailableDates(workingDays: number[], maxDaysAhead: number): string[] {
    const dates: string[] = []
    const today = new Date()

    for (let i = 0; i <= maxDaysAhead; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        if (workingDays.includes(date.getDay())) {
            dates.push(date.toISOString().slice(0, 10))
        }
    }

    return dates
}

function formatDateLabel(dateStr: string): string {
    const [y, m, d] = dateStr.split('-')
    return `${d}/${m}/${y}`
}

type Step = 'service' | 'date' | 'time' | 'form' | 'success'

export default function BookingSection() {
    const booking = config.booking
    const { addBooking, isSlotTaken } = useBooking()

    const [step, setStep] = useState<Step>('service')
    const [selectedService, setSelectedService] = useState<ServiceItem | null>(null)
    const [selectedDate, setSelectedDate] = useState<string>('')
    const [selectedTime, setSelectedTime] = useState<string>('')
    const [clientName, setClientName] = useState('')
    const [clientPhone, setClientPhone] = useState('')

    if (!booking) return null

    const availableDates = getAvailableDates(booking.workingDays, booking.maxDaysAhead)
    const timeSlots = generateTimeSlots(
        booking.workingHours.start,
        booking.workingHours.end,
        booking.slotDurationMinutes
    )

    function handleConfirm() {
        if (!selectedService || !selectedDate || !selectedTime) return

        addBooking({
            clientName,
            clientPhone,
            service: selectedService,
            date: selectedDate,
            time: selectedTime,
        })

        const message = `Olá! Gostaria de confirmar meu agendamento:\n\n*Serviço:* ${selectedService.name}\n*Data:* ${formatDateLabel(selectedDate)}\n*Horário:* ${selectedTime}\n*Nome:* ${clientName}`
        const url = `https://wa.me/${config.business.phone}?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')

        setStep('success')
    }

    function handleReset() {
        setStep('service')
        setSelectedService(null)
        setSelectedDate('')
        setSelectedTime('')
        setClientName('')
        setClientPhone('')
    }

    return (
        <section
            id="booking"
            className="py-20 px-4"
            style={{ backgroundColor: theme.bgPrimary }}
        >
            <div className="max-w-2xl mx-auto">
                <h2
                    className="text-3xl font-bold text-center mb-12"
                    style={{ color: theme.accent }}
                >
                    Agendamento
                </h2>

                {step === 'service' && (
                    <div className="flex flex-col gap-3">
                        <p className="text-sm mb-2" style={{ color: theme.textSecondary }}>
                            Escolha o serviço:
                        </p>
                        {config.services.map(service => (
                            <button
                                key={service.id}
                                onClick={() => { setSelectedService(service); setStep('date') }}
                                className="w-full text-left rounded-xl px-5 py-4 border transition-colors hover:opacity-80"
                                style={{ borderColor: theme.border, backgroundColor: theme.bgCard }}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium" style={{ color: theme.textPrimary }}>
                                        {service.name}
                                    </span>
                                    <span className="text-sm font-semibold" style={{ color: theme.accent }}>
                                        R$ {service.price.toFixed(2).replace('.', ',')}
                                    </span>
                                </div>
                                <span className="text-sm" style={{ color: theme.textMuted }}>
                                    {service.duration} min
                                </span>
                            </button>
                        ))}
                    </div>
                )}

                {step === 'date' && (
                    <div className="flex flex-col gap-3">
                        <p className="text-sm mb-2" style={{ color: theme.textSecondary }}>
                            Escolha a data:
                        </p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {availableDates.map(date => (
                                <button
                                    key={date}
                                    onClick={() => { setSelectedDate(date); setStep('time') }}
                                    className="rounded-lg py-3 text-sm border transition-colors hover:opacity-80"
                                    style={{
                                        borderColor: theme.border,
                                        backgroundColor: theme.bgCard,
                                        color: theme.textPrimary,
                                    }}
                                >
                                    {formatDateLabel(date)}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setStep('service')}
                            className="text-sm mt-4 hover:opacity-70 transition-colors"
                            style={{ color: theme.textMuted }}
                        >
                            ← Voltar
                        </button>
                    </div>
                )}

                {step === 'time' && (
                    <div className="flex flex-col gap-3">
                        <p className="text-sm mb-2" style={{ color: theme.textSecondary }}>
                            Escolha o horário para {formatDateLabel(selectedDate)}:
                        </p>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                            {timeSlots.map(slot => {
                                const taken = isSlotTaken(selectedDate, slot)
                                return (
                                    <button
                                        key={slot}
                                        disabled={taken}
                                        onClick={() => { setSelectedTime(slot); setStep('form') }}
                                        className="rounded-lg py-2 text-sm border transition-colors"
                                        style={{
                                            borderColor: taken ? theme.border : theme.borderHover,
                                            backgroundColor: theme.bgCard,
                                            color: taken ? theme.textMuted : theme.textPrimary,
                                            cursor: taken ? 'not-allowed' : 'pointer',
                                            opacity: taken ? 0.4 : 1,
                                        }}
                                    >
                                        {slot}
                                    </button>
                                )
                            })}
                        </div>
                        <button
                            onClick={() => setStep('date')}
                            className="text-sm mt-4 hover:opacity-70"
                            style={{ color: theme.textMuted }}
                        >
                            ← Voltar
                        </button>
                    </div>
                )}

                {step === 'form' && (
                    <div className="flex flex-col gap-4">
                        <p className="text-sm" style={{ color: theme.textSecondary }}>
                            Seus dados para confirmar o agendamento:
                        </p>

                        <div
                            className="rounded-xl px-5 py-4 text-sm flex flex-col gap-1 border"
                            style={{ borderColor: theme.border, backgroundColor: theme.bgCard }}
                        >
                            <span style={{ color: theme.textSecondary }}>
                                <span style={{ color: theme.accent }}>Serviço:</span> {selectedService?.name}
                            </span>
                            <span style={{ color: theme.textSecondary }}>
                                <span style={{ color: theme.accent }}>Data:</span> {formatDateLabel(selectedDate)}
                            </span>
                            <span style={{ color: theme.textSecondary }}>
                                <span style={{ color: theme.accent }}>Horário:</span> {selectedTime}
                            </span>
                        </div>

                        <input
                            type="text"
                            placeholder="Seu nome"
                            value={clientName}
                            onChange={e => {
                                const onlyLetters = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')
                                setClientName(onlyLetters)
                            }}
                            className="w-full rounded-lg px-4 py-3 text-sm border focus:outline-none"
                            style={{
                                backgroundColor: theme.bgInput,
                                borderColor: theme.border,
                                color: theme.textPrimary,
                            }}
                        />
                        <input
                            type="tel"
                            placeholder="Seu WhatsApp — (21) 99999-9999"
                            value={clientPhone}
                            onChange={e => {
                                const digits = e.target.value.replace(/\D/g, '').slice(0, 11)
                                const masked = digits
                                    .replace(/^(\d{2})(\d)/, '($1) $2')
                                    .replace(/(\d{5})(\d)/, '$1-$2')
                                setClientPhone(masked)
                            }}
                            className="w-full rounded-lg px-4 py-3 text-sm border focus:outline-none"
                            style={{
                                backgroundColor: theme.bgInput,
                                borderColor: theme.border,
                                color: theme.textPrimary,
                            }}
                        />

                        <button
                            onClick={handleConfirm}
                            disabled={!clientName || !clientPhone}
                            className="w-full py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-80 disabled:opacity-30"
                            style={{
                                backgroundColor: theme.accent,
                                color: theme.textOnAccent,
                            }}
                        >
                            Confirmar e abrir WhatsApp
                        </button>

                        <button
                            onClick={() => setStep('time')}
                            className="text-sm hover:opacity-70"
                            style={{ color: theme.textMuted }}
                        >
                            ← Voltar
                        </button>
                    </div>
                )}

                {step === 'success' && (
                    <div className="text-center flex flex-col items-center gap-4">
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                            style={{ backgroundColor: theme.accent + '22', color: theme.accent }}
                        >
                            ✓
                        </div>
                        <h3 className="text-xl font-semibold" style={{ color: theme.textPrimary }}>
                            Agendamento confirmado!
                        </h3>
                        <p className="text-sm" style={{ color: theme.textSecondary }}>
                            O WhatsApp foi aberto para você enviar a confirmação.
                        </p>
                        <button
                            onClick={handleReset}
                            className="mt-4 px-6 py-2 rounded-full text-sm font-semibold hover:opacity-80 transition-opacity"
                            style={{
                                backgroundColor: theme.accent,
                                color: theme.textOnAccent,
                            }}
                        >
                            Novo agendamento
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
