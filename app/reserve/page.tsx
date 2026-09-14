'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Sparkles,
  CheckCircle2,
  Phone,
  User,
  Mail,
  Flame,
  ArrowLeft,
  Loader2,
  CalendarCheck,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { INITIAL_BRANCHES } from '@/lib/data'
import { generateReservationCode } from '@/lib/utils'
import { useStore } from '@/lib/store'

const TIME_SLOTS = [
  { time: '12:30 PM', period: 'Lunch' },
  { time: '01:30 PM', period: 'Lunch' },
  { time: '02:30 PM', period: 'Lunch' },
  { time: '07:00 PM', period: 'Dinner' },
  { time: '08:00 PM', period: 'Dinner' },
  { time: '09:00 PM', period: 'Dinner' },
  { time: '10:00 PM', period: 'Dinner' },
]

const SEATING_ZONES = [
  { id: 'Main Dining', name: 'Main Dining Hall', desc: 'Sizzling open-fire grill view' },
  { id: 'Family Hall', name: 'Private Family Lounge', desc: 'Spacious and quiet for gatherings' },
  { id: 'Rooftop Terrace', name: 'Rooftop Garden Terrace', desc: 'Breezy open atmosphere' },
  { id: 'VIP Lounge', name: 'Royal VIP Banquet', desc: 'Premium luxury booth' },
]

export default function ReservePage() {
  const { showToast } = useStore()
  const [selectedBranch, setSelectedBranch] = useState(INITIAL_BRANCHES[0].name)
  const [date, setDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  })
  const [time, setTime] = useState(TIME_SLOTS[3].time)
  const [guests, setGuests] = useState(4)
  const [zone, setZone] = useState('Main Dining')
  const [occasion, setOccasion] = useState('Casual')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [specialNotes, setSpecialNotes] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmedReservation, setConfirmedReservation] = useState<any | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  const handleBookTable = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!name.trim()) {
      setErrorMsg('Please enter your full name')
      return
    }

    if (!phone.trim() || phone.trim().length < 11) {
      setErrorMsg('Please enter a valid 11-digit mobile number')
      return
    }

    setIsSubmitting(true)

    try {
      const code = generateReservationCode()
      const payload = {
        code,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        branch: selectedBranch,
        date,
        time,
        guests,
        zone,
        occasion,
        specialNotes: specialNotes.trim() || undefined,
      }

      const res = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to complete reservation')
      }

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      })

      setConfirmedReservation(data.reservation)
      showToast('Table Reserved!', `Booking reference #${data.reservation.code} is confirmed!`)
    } catch (err: any) {
      console.error(err)
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9]">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 w-full">
        {/* Breadcrumb Back */}
        <Link
          href="/"
          className="inline-flex items-center text-xs font-bold text-neutral-500 hover:text-brand-red transition mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Home
        </Link>

        {confirmedReservation ? (
          /* Confirmation Card */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200 shadow-2xl max-w-2xl mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-black uppercase px-3 py-1 rounded-full">
                Reservation Confirmed
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-black text-brand-dark mt-3">
                We Can&apos;t Wait to Host You!
              </h1>
              <p className="text-neutral-500 text-xs sm:text-sm mt-1">
                Your table at Flame &amp; Feast has been reserved. A confirmation SMS has been prepared.
              </p>
            </div>

            {/* Booking Details Box */}
            <div className="bg-brand-cream/80 rounded-2xl p-5 border border-amber-200/80 text-left text-xs sm:text-sm space-y-2.5">
              <div className="flex justify-between items-center pb-2 border-b border-amber-200">
                <span className="text-neutral-500 font-semibold">Booking Reference:</span>
                <span className="font-black text-brand-red text-base">{confirmedReservation.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Guest Name:</span>
                <span className="font-bold text-brand-dark">{confirmedReservation.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Branch Outlet:</span>
                <span className="font-bold text-brand-dark">{confirmedReservation.branch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Date &amp; Time:</span>
                <span className="font-bold text-brand-dark">
                  {confirmedReservation.date} at {confirmedReservation.time}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Party Size:</span>
                <span className="font-bold text-brand-dark">{confirmedReservation.guests} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Seating Area:</span>
                <span className="font-bold text-brand-dark">{confirmedReservation.zone}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link
                href="/#portion-section"
                className="cta-shimmer bg-brand-red hover:bg-brand-darkred text-white text-xs sm:text-sm font-bold px-7 py-3 rounded-full shadow-md transition"
              >
                Pre-Order Menu Online
              </Link>
              <button
                onClick={() => setConfirmedReservation(null)}
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs sm:text-sm font-bold px-6 py-3 rounded-full transition"
              >
                Book Another Table
              </button>
            </div>
          </div>
        ) : (
          /* Booking Wizard Form */
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-xl overflow-hidden">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-brand-dark via-neutral-900 to-brand-dark text-white p-6 sm:p-10 border-b border-neutral-800 relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <span className="bg-brand-red text-white text-[11px] font-black uppercase px-3 py-1 rounded-full inline-flex items-center gap-1 mb-2 shadow-sm">
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                  Instant Table Reservation
                </span>
                <h1 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight">
                  Book A Royal Table
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm mt-1">
                  Enjoy sizzling lava-grilled peri chickens and authentic Basmati Kacchi with personalized hospitality.
                </p>
              </div>
            </div>

            <form onSubmit={handleBookTable} className="p-6 sm:p-10 space-y-8">
              {errorMsg && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Step 1: Branch & Date */}
              <div className="space-y-4">
                <h2 className="text-xs font-black uppercase tracking-wider text-brand-dark flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-red text-white flex items-center justify-center text-[10px]">
                    1
                  </span>
                  Select Outlet &amp; Date
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">
                      Choose Branch Outlet
                    </label>
                    <select
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      className="w-full text-xs font-semibold rounded-2xl border border-neutral-300 p-3 bg-white focus:border-brand-red focus:outline-none"
                    >
                      {INITIAL_BRANCHES.map((b) => (
                        <option key={b.id} value={b.name}>
                          {b.name} ({b.area})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">
                      Reservation Date
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full text-xs font-semibold rounded-2xl border border-neutral-300 p-3 bg-white focus:border-brand-red focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Time Slots */}
              <div className="space-y-4">
                <h2 className="text-xs font-black uppercase tracking-wider text-brand-dark flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-red text-white flex items-center justify-center text-[10px]">
                    2
                  </span>
                  Choose Preferred Time Slot
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = time === slot.time
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setTime(slot.time)}
                        className={`p-3 rounded-2xl border text-center transition-all ${
                          isSelected
                            ? 'border-brand-red bg-red-50 text-brand-red font-black shadow-sm'
                            : 'border-neutral-200 hover:border-neutral-300 text-slate-700'
                        }`}
                      >
                        <span className="block text-xs">{slot.time}</span>
                        <span className="block text-[10px] text-neutral-400 mt-0.5">{slot.period}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Step 3: Guests & Seating Zone */}
              <div className="space-y-4">
                <h2 className="text-xs font-black uppercase tracking-wider text-brand-dark flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-red text-white flex items-center justify-center text-[10px]">
                    3
                  </span>
                  Guest Count &amp; Seating Zone
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Guest Count */}
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-2">
                      Number of Guests: <span className="text-brand-red font-black text-sm">{guests} People</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[2, 4, 6, 8, 10, 15, 20].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuests(num)}
                          className={`w-11 h-10 rounded-xl text-xs font-bold border transition ${
                            guests === num
                              ? 'bg-brand-red border-brand-red text-white shadow-sm'
                              : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Occasion */}
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-2">
                      Dining Occasion
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full text-xs font-semibold rounded-2xl border border-neutral-300 p-3 bg-white focus:border-brand-red focus:outline-none"
                    >
                      <option value="Casual">Casual Dine-in with Family/Friends</option>
                      <option value="Birthday">Birthday Celebration</option>
                      <option value="Anniversary">Anniversary Romantic Dinner</option>
                      <option value="Corporate">Corporate / Business Dinner</option>
                    </select>
                  </div>
                </div>

                {/* Seating Zones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {SEATING_ZONES.map((z) => {
                    const isSelected = zone === z.id
                    return (
                      <div
                        key={z.id}
                        onClick={() => setZone(z.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                          isSelected
                            ? 'border-brand-red bg-red-50/70 shadow-sm'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs text-brand-dark">{z.name}</h4>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-brand-red bg-brand-red text-white' : 'border-neutral-300'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-0.5">{z.desc}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Step 4: Contact Details */}
              <div className="space-y-4 pt-2 border-t border-neutral-100">
                <h2 className="text-xs font-black uppercase tracking-wider text-brand-dark flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-red text-white flex items-center justify-center text-[10px]">
                    4
                  </span>
                  Your Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Shakib Al Hasan"
                      className="w-full text-xs rounded-2xl border border-neutral-300 p-3 focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">Mobile Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full text-xs rounded-2xl border border-neutral-300 p-3 focus:border-brand-red focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="shakib@gmail.com"
                      className="w-full text-xs rounded-2xl border border-neutral-300 p-3 focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">
                      Special Requests / Dietary Notes
                    </label>
                    <input
                      type="text"
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="e.g. High chair for toddler, floral decor"
                      className="w-full text-xs rounded-2xl border border-neutral-300 p-3 focus:border-brand-red focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-neutral-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cta-shimmer bg-brand-red hover:bg-brand-darkred disabled:bg-neutral-400 text-white font-black text-sm py-4 rounded-2xl shadow-xl transition-all transform active:scale-95 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Confirming Table Booking...</span>
                    </>
                  ) : (
                    <>
                      <CalendarCheck className="w-5 h-5" />
                      <span>Confirm Table Reservation</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
