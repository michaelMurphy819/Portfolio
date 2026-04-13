'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white/5 border border-white/10 shadow-inner">
            <Lock size={24} className="text-[#13B5EA]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tighter">Admin Access</h1>
            <p className="text-sm font-medium text-zinc-500 mt-1">Authorized personnel only</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="glass-panel flex flex-col gap-6 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-zinc-300 ml-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none focus:border-[#13B5EA]/60 focus:bg-white/5 transition-all shadow-inner placeholder:text-zinc-600"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-zinc-300 ml-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none focus:border-[#13B5EA]/60 focus:bg-white/5 transition-all shadow-inner placeholder:text-zinc-600"
            />
          </div>
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-xs font-semibold text-red-400 text-center">{error}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 font-bold text-[#000814] transition-all hover:bg-zinc-200 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}