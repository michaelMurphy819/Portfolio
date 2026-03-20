'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Send, CheckCircle } from 'lucide-react';

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const supabase = createClient();
    const { error } = await supabase
      .from('contact_submissions')
      .insert([{ name: form.name, email: form.email, message: form.message }]);

    if (error) {
      setStatus('error');
      setErrorMsg(error.message);
    } else {
      setStatus('success');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-green-800 bg-green-950/30 p-10 text-center">
        <CheckCircle size={32} className="text-green-400" />
        <p className="font-mono text-green-400">message transmitted successfully.</p>
        <p className="font-mono text-xs text-zinc-500">i&apos;ll get back to you soon.</p>
        <button
          onClick={() => {
            setStatus('idle');
            setForm({ name: '', email: '', message: '' });
          }}
          className="font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-100"
        >
          send another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-xs text-zinc-500">name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="john doe"
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 font-mono text-sm text-zinc-100 outline-none placeholder:text-zinc-700 transition-colors focus:border-zinc-600"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-xs text-zinc-500">email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 font-mono text-sm text-zinc-100 outline-none placeholder:text-zinc-700 transition-colors focus:border-zinc-600"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-xs text-zinc-500">message</label>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="what's on your mind?"
          className="resize-none rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 font-mono text-sm text-zinc-100 outline-none placeholder:text-zinc-700 transition-colors focus:border-zinc-600"
        />
      </div>
      {errorMsg && (
        <p className="font-mono text-xs text-red-400">error: {errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex items-center justify-center gap-2 rounded-lg bg-zinc-100 px-5 py-2.5 font-mono text-sm font-semibold text-zinc-900 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === 'loading' ? (
          'transmitting...'
        ) : (
          <>
            <Send size={14} /> send message
          </>
        )}
      </button>
    </form>
  );
}
