import { useState, useCallback } from 'react'
import type { ServiceItem } from '../types/config'

export type BookingStatus = 'pending' | 'completed' | 'no_show'

export interface Booking {
    id: string
    clientName: string
    clientPhone: string
    service: ServiceItem
    date: string
    time: string
    status: BookingStatus
    createdAt: string
}

const STORAGE_KEY = 'bookings_manicure_v1'

function loadBookings(): Booking[] {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    } catch {
        return []
    }
}

function saveBookings(bookings: Booking[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
}

export function useBooking() {
    const [bookings, setBookings] = useState<Booking[]>(loadBookings)

    const addBooking = useCallback((data: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
        const newBooking: Booking = {
            ...data,
            id: crypto.randomUUID(),
            status: 'pending',
            createdAt: new Date().toISOString(),
        }
        setBookings(prev => {
            const updated = [...prev, newBooking]
            saveBookings(updated)
            return updated
        })
        return newBooking
    }, [])

    const updateStatus = useCallback((id: string, status: BookingStatus) => {
        setBookings(prev => {
            const updated = prev.map(b => b.id === id ? { ...b, status } : b)
            saveBookings(updated)
            return updated
        })
    }, [])

    const deleteBooking = useCallback((id: string) => {
        setBookings(prev => {
            const updated = prev.filter(b => b.id !== id)
            saveBookings(updated)
            return updated
        })
    }, [])

    const isSlotTaken = useCallback((date: string, time: string): boolean => {
        return loadBookings().some(b => b.date === date && b.time === time)
    }, [])

    const getBookingsByDate = useCallback((date: string): Booking[] => {
        return loadBookings()
            .filter(b => b.date === date)
            .sort((a, b) => a.time.localeCompare(b.time))
    }, [])

    return { bookings, addBooking, updateStatus, deleteBooking, isSlotTaken, getBookingsByDate }
}
