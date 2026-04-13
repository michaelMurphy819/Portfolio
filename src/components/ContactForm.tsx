'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    const supabase = createClient();
    const { error } = await supabase
      .from('contact_submissions')
      .insert([form]);

    if (error) setStatus('error');
    else setStatus('success');
  }

  if (status === 'success') {
    return (
      <div className="glass-panel flex flex-col items-center gap-6 rounded-2xl p-16 text-center shadow-xl shadow-[#003366]/20">
        <div className="h-16 w-16 rounded-full bg-[#13B5EA]/20 flex items-center justify-center shadow-inner">
          <CheckCircle size={32} className="text-[#13B5EA]" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tighter text-white">Message Sent</h3>
          <p className="text-base text-zinc-400">I will get back to you as soon as possible.</p>
        </div>
        <button onClick={() => setStatus('idle')} className="mt-6 text-sm font-semibold text-[#13B5EA] hover:text-white transition-colors bg-white/5 px-6 py-2 rounded-full border border-white/10">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel flex flex-col gap-6 rounded-2xl p-10 shadow-xl shadow-[#003366]/10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-300 ml-1">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none focus:border-[#13B5EA]/60 focus:bg-white/5 transition-all shadow-inner placeholder:text-zinc-600"
            placeholder="Michael Murphy"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-zinc-300 ml-1">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none focus:border-[#13B5EA]/60 focus:bg-white/5 transition-all shadow-inner placeholder:text-zinc-600"
            placeholder="murphy@example.com"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-zinc-300 ml-1">Message</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-base text-white outline-none focus:border-[#13B5EA]/60 focus:bg-white/5 transition-all shadow-inner placeholder:text-zinc-600"
          placeholder="What are we building?"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="group flex h-14 items-center justify-center gap-3 rounded-full bg-white px-8 font-bold text-[#000814] transition-all hover:bg-zinc-200 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] shadow-lg mt-2"
      >
        {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : <>Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>}
      </button>
    </form>
  );
}