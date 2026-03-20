import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';
import { StreakCounter } from '@/components/StreakCounter';
import { TerminalFooter } from '@/components/TerminalFooter';
import { TypingAnimation } from '@/components/TypingAnimation';
import { TerminalEasterEgg } from '@/components/TerminalEasterEgg';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <TerminalEasterEgg />
      <main className="flex flex-1 flex-col items-start justify-center px-6 pt-32 pb-20 mx-auto w-full max-w-5xl">
        <p className="font-mono text-sm text-green-500 mb-4">❯ whoami</p>
        <h1 className="text-5xl sm:text-7xl font-bold text-zinc-100 tracking-tight mb-6 leading-none">
          Michael<br />
          <span className="text-zinc-500">Murphy</span>
        </h1>

        {/* Typing animation */}
        <p className="font-mono text-zinc-400 text-sm sm:text-base mb-2">
          <TypingAnimation
            strings={[
              'building low-level infrastructure.',
              'software engineering for impact.',
              'exploring algorithmic theory.',
              'always learning something new.',
            ]}
            className="text-zinc-300"
          />
        </p>

        <p className="font-mono text-zinc-400 text-sm sm:text-base max-w-xl mb-2">
          Computer Systems student. I build at the intersection of{' '}
          <span className="text-sky-400">low-level infrastructure</span>,{' '}
          <span className="text-purple-400">software engineering for impact</span>, and{' '}
          <span className="text-amber-400">algorithmic theory</span>.
        </p>
        <p className="font-mono text-zinc-600 text-xs mb-10">
          C · Unix · Next.js · Supabase · Always learning.
        </p>

        <div className="mb-10 w-full max-w-sm">
          <p className="font-mono text-xs text-zinc-600 mb-3">❯ streak --current</p>
          <StreakCounter />
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <Link
            href="/projects"
            className="flex items-center gap-2 rounded-lg bg-zinc-100 px-5 py-2.5 font-mono text-sm font-semibold text-zinc-900 transition-colors hover:bg-white"
          >
            view projects <ArrowRight size={14} />
          </Link>
          <a
            href="https://github.com/michaelMurphy819"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            <Github size={14} /> GitHub
          </a>
          <Link
            href="/about"
            className="font-mono text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            about me →
          </Link>
          <Link
            href="/contact"
            className="font-mono text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            contact →
          </Link>
        </div>

        {/* Easter egg hint */}
        <p className="mt-16 font-mono text-xs text-zinc-800 hover:text-zinc-600 transition-colors cursor-default select-none">
          press ` to open terminal
        </p>
      </main>
      <TerminalFooter />
    </div>
  );
}