'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Flame, Lock, ArrowRight, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials')
      }

      router.push('/admin')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-bold text-neutral-400 hover:text-white transition mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Store
        </Link>

        <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-red/10 border border-brand-red/30 text-brand-red flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Flame className="w-8 h-8 fill-brand-red" />
          </div>

          <h1 className="font-display text-2xl font-black text-white uppercase tracking-tight">
            Staff Admin Portal
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Flame &amp; Feast Kitchen &amp; Order Operations
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4 text-left">
            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl text-xs font-semibold">
                {error}
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-neutral-300 block mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-brand-gold" /> Admin Security Key / Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (default: admin123)"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-2xl p-3 text-xs sm:text-sm text-white focus:border-brand-red focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cta-shimmer bg-brand-red hover:bg-brand-darkred disabled:bg-neutral-700 text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-2xl shadow-lg transition-all transform active:scale-95 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Sign In To Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] text-neutral-500">
            Protected internal system. Default access password: <span className="text-amber-400 font-mono">admin123</span>
          </div>
        </div>
      </div>
    </div>
  )
}
