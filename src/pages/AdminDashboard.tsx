import { useState, useMemo } from 'react'
import { Trash2, Calendar, Phone, User, Clock, LogOut, ChevronLeft, ChevronRight, Check, X } from 'lucide-react'
import { useBooking } from '../hooks/useBooking'
import type { BookingStatus } from '../hooks/useBooking'
import { theme } from '../themes'
import config from '../config'

function formatDate(dateStr: string): string {
    const [y, m, d] = dateStr.split('-')
    return `${d}/${m}/${y}`
}

function getTodayString(): string {
    return new Date().toISOString().slice(0, 10)
}

function addDays(dateStr: string, days: number): string {
    const date = new Date(dateStr)
    date.setDate(date.getDate() + days)
    return date.toISOString().slice(0, 10)
}

function formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const statusConfig: Record<BookingStatus, { label: string; color: string }> = {
    pending: { label: 'Pendente', color: '#6b7280' },
    completed: { label: 'Concluído', color: '#22c55e' },
    no_show: { label: 'Não compareceu', color: '#ef4444' },
}

export default function AdminDashboard() {
    const [authed, setAuthed] = useState(false)
    const [pwd, setPwd] = useState('')
    const [error, setError] = useState('')
    const [selectedDate, setSelectedDate] = useState(getTodayString())
    const { bookings: allBookings, updateStatus, deleteBooking } = useBooking()

    const bookings = useMemo(
        () => allBookings
            .filter(b => b.date === selectedDate)
            .sort((a, b) => a.time.localeCompare(b.time)),
        [allBookings, selectedDate]
    )

    const totalRevenue = useMemo(
        () => bookings
            .filter(b => b.status === 'completed')
            .reduce((sum, b) => sum + b.service.price, 0),
        [bookings]
    )

    const totalPending = useMemo(
        () => bookings.filter(b => b.status === 'pending').length,
        [bookings]
    )

    const totalCompleted = useMemo(
        () => bookings.filter(b => b.status === 'completed').length,
        [bookings]
    )

    function handleLogin() {
        if (pwd === config.booking?.adminPassword) {
            setAuthed(true)
            setError('')
        } else {
            setError('Senha incorreta.')
        }
    }

    if (!authed) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{ backgroundColor: theme.bgPrimary }}
            >
                <div
                    className="rounded-2xl p-8 w-full max-w-sm border"
                    style={{
                        backgroundColor: theme.bgCard,
                        borderColor: theme.border,
                    }}
                >
                    <h1 className="text-xl font-semibold mb-1" style={{ color: theme.accent }}>
                        {config.business.name}
                    </h1>
                    <p className="text-sm mb-6" style={{ color: theme.textSecondary }}>
                        Painel do profissional
                    </p>

                    <label className="text-sm block mb-1" style={{ color: theme.textPrimary }}>
                        Senha
                    </label>
                    <input
                        type="password"
                        value={pwd}
                        onChange={e => setPwd(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleLogin()}
                        className="w-full rounded-lg px-4 py-2 mb-3 border focus:outline-none"
                        style={{
                            backgroundColor: theme.bgInput,
                            borderColor: theme.border,
                            color: theme.textPrimary,
                        }}
                        placeholder="••••••••"
                    />
                    {error && (
                        <p className="text-sm mb-3" style={{ color: theme.danger }}>
                            {error}
                        </p>
                    )}
                    <button
                        onClick={handleLogin}
                        className="w-full py-2 rounded-lg font-semibold text-sm transition-opacity hover:opacity-80"
                        style={{ backgroundColor: theme.accent, color: theme.textOnAccent }}
                    >
                        Entrar
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: theme.bgPrimary }}>
            <header
                className="border-b px-6 py-4 flex items-center gap-3"
                style={{ borderColor: theme.border }}
            >
                <Calendar size={18} style={{ color: theme.accent }} />
                <span className="font-semibold" style={{ color: theme.textPrimary }}>
                    {config.business.name}
                </span>
                <span className="text-sm ml-auto mr-4" style={{ color: theme.textMuted }}>
                    Agendamentos
                </span>
                <button
                    onClick={() => setAuthed(false)}
                    className="transition-opacity hover:opacity-60"
                    style={{ color: theme.textMuted }}
                    title="Sair"
                >
                    <LogOut size={16} />
                </button>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => setSelectedDate(prev => addDays(prev, -1))}
                        className="transition-opacity hover:opacity-60 p-1"
                        style={{ color: theme.textSecondary }}
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div className="flex items-center gap-3">
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={e => setSelectedDate(e.target.value)}
                            className="rounded-lg px-3 py-1.5 text-sm border focus:outline-none"
                            style={{
                                backgroundColor: theme.bgInput,
                                borderColor: theme.border,
                                color: theme.textPrimary,
                            }}
                        />
                        <span className="text-sm" style={{ color: theme.textMuted }}>
                            {formatDate(selectedDate)}
                        </span>
                    </div>

                    <button
                        onClick={() => setSelectedDate(prev => addDays(prev, 1))}
                        className="transition-opacity hover:opacity-60 p-1"
                        style={{ color: theme.textSecondary }}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-8">
                    <div
                        className="rounded-xl px-4 py-3 flex flex-col gap-1 border"
                        style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
                    >
                        <span className="text-xs" style={{ color: theme.textMuted }}>Agendamentos</span>
                        <span className="font-semibold text-lg" style={{ color: theme.textPrimary }}>
                            {bookings.length}
                        </span>
                    </div>
                    <div
                        className="rounded-xl px-4 py-3 flex flex-col gap-1 border"
                        style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
                    >
                        <span className="text-xs" style={{ color: theme.textMuted }}>Pendentes</span>
                        <span className="font-semibold text-lg" style={{ color: theme.warning }}>
                            {totalPending}
                        </span>
                    </div>
                    <div
                        className="rounded-xl px-4 py-3 flex flex-col gap-1 border"
                        style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
                    >
                        <span className="text-xs" style={{ color: theme.textMuted }}>Lucro do dia</span>
                        <span className="font-semibold text-lg" style={{ color: theme.accent }}>
                            {formatCurrency(totalRevenue)}
                        </span>
                    </div>
                </div>

                {bookings.length > 0 && (
                    <p className="text-xs mb-4" style={{ color: theme.textMuted }}>
                        {totalCompleted} concluído(s) · {totalPending} pendente(s)
                    </p>
                )}

                {bookings.length === 0 ? (
                    <div className="text-center py-16" style={{ color: theme.textMuted }}>
                        Nenhum agendamento para este dia.
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {bookings.map(b => (
                            <li
                                key={b.id}
                                className="rounded-xl px-5 py-4 border"
                                style={{ backgroundColor: theme.bgCard, borderColor: theme.border }}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} style={{ color: theme.accent }} />
                                            <span className="font-semibold" style={{ color: theme.accent }}>
                                                {b.time}
                                            </span>
                                            <span className="text-sm" style={{ color: theme.textSecondary }}>
                                                — {b.service.name}
                                            </span>
                                            <span
                                                className="text-xs px-2 py-0.5 rounded-full"
                                                style={{
                                                    color: statusConfig[b.status].color,
                                                    backgroundColor: statusConfig[b.status].color + '22',
                                                }}
                                            >
                                                {statusConfig[b.status].label}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm" style={{ color: theme.textPrimary }}>
                                            <User size={13} style={{ color: theme.textMuted }} />
                                            {b.clientName}
                                        </div>

                                        <div className="flex items-center gap-2 text-sm" style={{ color: theme.textSecondary }}>
                                            <Phone size={13} style={{ color: theme.textMuted }} />
                                            {b.clientPhone}
                                        </div>

                                        <div className="text-sm font-medium mt-1" style={{ color: theme.accent }}>
                                            {formatCurrency(b.service.price)}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 items-end">
                                        <button
                                            onClick={() => updateStatus(b.id, 'completed')}
                                            disabled={b.status === 'completed'}
                                            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80 disabled:opacity-30"
                                            style={{ backgroundColor: theme.success + '22', color: theme.success }}
                                        >
                                            <Check size={12} />
                                            Concluído
                                        </button>

                                        <button
                                            onClick={() => updateStatus(b.id, 'no_show')}
                                            disabled={b.status === 'no_show'}
                                            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80 disabled:opacity-30"
                                            style={{ backgroundColor: theme.danger + '22', color: theme.danger }}
                                        >
                                            <X size={12} />
                                            Não veio
                                        </button>

                                        <button
                                            onClick={() => deleteBooking(b.id)}
                                            className="transition-colors hover:opacity-60 mt-1"
                                            style={{ color: theme.textMuted }}
                                            title="Excluir agendamento"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                <p className="text-xs text-center mt-10" style={{ color: theme.textMuted }}>
                    {bookings.length} agendamento(s) · salvo localmente
                </p>
            </main>
        </div>
    )
}
