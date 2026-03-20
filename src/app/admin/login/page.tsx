'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Terminal, Lock } from 'lucide-react'

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-3">
            <Terminal size={20} className="text-green-500" />
          </div>
          <p className="font-mono text-sm text-green-500">❯ sudo admin --login</p>
          <h1 className="font-mono text-xl font-bold text-zinc-100">admin access</h1>
          <p className="font-mono text-xs text-zinc-600">restricted area</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs text-zinc-500">email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 font-mono text-sm text-zinc-100 outline-none placeholder:text-zinc-700 transition-colors focus:border-zinc-600"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs text-zinc-500">password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 font-mono text-sm text-zinc-100 outline-none placeholder:text-zinc-700 transition-colors focus:border-zinc-600"
            />
          </div>
          {error && (
            <p className="font-mono text-xs text-red-400">error: {error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-zinc-100 px-5 py-2.5 font-mono text-sm font-semibold text-zinc-900 transition-colors hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Lock size={14} />
            {loading ? 'authenticating...' : 'login'}
          </button>
        </form>
      </div>
    </div>
  )
}