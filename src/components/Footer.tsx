'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5 bg-[#000814]/40 py-12 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-2 text-center md:text-left">
          <p className="text-sm font-bold text-white tracking-tighter">Michael Murphy</p>
          <p className="text-xs text-zinc-500 font-medium">Software Engineer @ Villanova University</p>
        </div>
        
        <div className="flex gap-8">
          <a href="https://github.com/michaelMurphy819" className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/michael-murphy-12a594222" className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors">LinkedIn</a>
          <Link href="/contact" className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors">Contact</Link>
        </div>

        <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}