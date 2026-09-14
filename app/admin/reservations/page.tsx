'use client'

import React, { useEffect, useState } from 'react'
import { CalendarCheck, Search, Users, Phone, MapPin, Clock, Loader2 } from 'lucide-react'

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchReservations = async () => {
    try {
      const res = await fetch('/api/reserve')
      const data = await res.json()
      if (data.success) {
        setReservations(data.reservations)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReservations()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-black text-white uppercase tracking-tight">
          Table Reservations
        </h1>
        <p className="text-xs text-neutral-400">
          Confirmed dining bookings across all branch outlets
        </p>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-red" />
        </div>
      ) : reservations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reservations.map((res) => (
            <div
              key={res.id}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-brand-gold">#{res.code}</span>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase px-2.5 py-1 rounded-full">
                  {res.status}
                </span>
              </div>

              <div className="border-t border-b border-neutral-800 py-3 space-y-1.5 text-xs">
                <div className="flex justify-between font-bold text-white">
                  <span>{res.name}</span>
                  <a href={`tel:${res.phone}`} className="text-brand-gold hover:underline">
                    {res.phone}
                  </a>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  <span>{res.branch}</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>
                    {res.date} at {res.time}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <Users className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>
                    {res.guests} Guests • Zone: {res.zone}
                  </span>
                </div>
                {res.occasion && (
                  <p className="text-[11px] text-neutral-300 font-semibold">
                    Occasion: {res.occasion}
                  </p>
                )}
              </div>

              {res.specialNotes && (
                <p className="text-[11px] italic text-neutral-400">
                  &ldquo;{res.specialNotes}&rdquo;
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-neutral-900 border border-neutral-800 rounded-3xl">
          <CalendarCheck className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
          <p className="text-sm font-bold text-neutral-300">No reservations booked yet</p>
        </div>
      )}
    </div>
  )
}
