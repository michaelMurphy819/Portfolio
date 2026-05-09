import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';
import { StreakCounter } from '@/components/StreakCounter';

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Villanova Blue accent glow */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#003366]/20 blur-[150px] rounded-full" />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center mx-auto w-full max-w-4xl">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#13B5EA]/20 bg-[#13B5EA]/5 px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold text-[#13B5EA] backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#13B5EA] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#13B5EA]"></span>
          </span>
          Computer Science @ Villanova
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6 leading-tight">
          Michael <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#13B5EA]">
            Murphy
          </span>
        </h1>

        <p className="text-lg text-zinc-400 max-w-2xl mb-12 leading-relaxed font-light">
          Engineering high-performance systems and low-level infrastructure with the precision of a
          <span className="text-white font-medium"> Wildcat</span>.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link href="/projects" className="h-14 px-10 flex items-center justify-center rounded-full bg-white text-[#000814] font-bold transition-all hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.15)]">
            View My Work
          </Link>
          <Link href="/contact" className="h-14 px-10 flex items-center justify-center rounded-full glass-panel text-white font-semibold transition-all hover:bg-white/5 border border-white/10 hover:border-white/20 hover:shadow-[0_0_20px_rgba(19,181,234,0.15)]">
            Contact Me
          </Link>
        </div>
      </main>

      {/* Minimal Streak Counter position */}
      <div className="absolute bottom-12 left-12 hidden xl:block">
        <StreakCounter />
      </div>
    </div>
  );
}