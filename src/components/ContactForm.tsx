'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const subject = encodeURIComponent(`Inquiry from ${form.name}`);
      const body = encodeURIComponent(
        `Hi Michael,\n\n${form.message}\n\nFrom: ${form.name} (${form.email})`
      );
      
      window.location.href = `mailto:mmurph104@villanova.edu?subject=${subject}&body=${body}`;
      
      setTimeout(() => {
        setStatus('success');
      }, 500);
    } catch {
      setStatus('success');
    }
  }

  if (status === 'success') {
    return (
      <div className="apple-card flex flex-col items-center gap-4 p-8 text-center bg-white border border-black/[0.08]">
        <div className="h-12 w-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
          <CheckCircle2 size={24} />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-[#1D1D1F]">
            Message Prepared
          </h3>
          <p className="text-xs text-[#6E6E73] max-w-sm">
            Mail client opened. You can also write directly to{' '}
            <span className="text-[#1D1D1F] font-semibold">mmurph104@villanova.edu</span>.
          </p>
        </div>
        <button
          onClick={() => {
            setForm({ name: '', email: '', message: '' });
            setStatus('idle');
          }}
          className="mt-2 apple-button-secondary px-5 py-1.5 text-xs font-semibold"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="apple-card flex flex-col gap-4 p-6 sm:p-7 bg-white border border-black/[0.08]"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#1D1D1F]">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3.5 py-2.5 text-xs text-[#1D1D1F] placeholder-[#86868B] outline-none focus:border-[#0071E3] focus:bg-white transition-all"
            placeholder="Your Name"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#1D1D1F]">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3.5 py-2.5 text-xs text-[#1D1D1F] placeholder-[#86868B] outline-none focus:border-[#0071E3] focus:bg-white transition-all"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-[#1D1D1F]">Message</label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full resize-none rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3.5 py-2.5 text-xs text-[#1D1D1F] placeholder-[#86868B] outline-none focus:border-[#0071E3] focus:bg-white transition-all"
          placeholder="What would you like to discuss?"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="apple-button-primary h-10 px-6 text-xs font-semibold self-start"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="animate-spin" size={14} /> Opening...
          </>
        ) : (
          <>
            Send Message <Send size={13} />
          </>
        )}
      </button>
    </form>
  );
}