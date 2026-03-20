'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Line {
  type: 'input' | 'output' | 'error';
  content: string;
}

const INITIAL_LINES: Line[] = [
  { type: 'output', content: 'michael murphy — portfolio terminal v1.0.0' },
  { type: 'output', content: 'type "help" for available commands.  press esc to close.' },
  { type: 'output', content: '' },
];

function runCommand(
  raw: string,
  router: ReturnType<typeof useRouter>
): { output: string | null; navigate?: string } {
  const [cmd, ...args] = raw.trim().split(/\s+/);

  switch (cmd.toLowerCase()) {
    case 'help':
      return {
        output: `available commands:
  whoami          — who is michael murphy
  ls              — list pages
  ls projects     — navigate to projects
  cd <page>       — navigate (home | projects | about | research | contact)
  cat about.txt   — read about michael
  github          — open github profile
  clear           — clear terminal
  exit            — close terminal`,
      };

    case 'whoami':
      return {
        output: `michael murphy
computer systems student
building at the intersection of:
  · low-level infrastructure
  · software engineering for impact
  · algorithmic theory
stack: C · Unix · Next.js · Supabase · TypeScript`,
      };

    case 'ls': {
      if (args[0] === 'projects') {
        router.push('/projects');
        return { output: 'navigating to /projects...' };
      }
      return {
        output: `~/home
~/projects
~/research
~/about
~/contact`,
      };
    }

    case 'cd': {
      const dest = args[0] ?? '';
      const routes: Record<string, string> = {
        home: '/',
        '~': '/',
        projects: '/projects',
        about: '/about',
        research: '/research',
        contact: '/contact',
      };
      if (routes[dest]) {
        router.push(routes[dest]);
        return { output: `navigating to ${routes[dest]}...` };
      }
      return { output: `cd: ${dest}: no such directory` };
    }

    case 'cat': {
      if (args[0] === 'about.txt') {
        return {
          output: `name:      Michael Murphy
role:      Computer Systems Student
skills:    C, Unix, Next.js, Supabase, TypeScript, Python
interests: low-level infrastructure, distributed systems, algorithms
currently: building cool things and always learning`,
        };
      }
      return { output: `cat: ${args[0] ?? ''}: no such file` };
    }

    case 'github': {
      if (typeof window !== 'undefined') {
        window.open('https://github.com/michaelMurphy819', '_blank');
      }
      return { output: 'opening github...' };
    }

    case 'clear':
      return { output: null }; // signals clear

    case 'exit':
      return { output: '__EXIT__' };

    default:
      return {
        output: `command not found: ${cmd}\ntype "help" for available commands.`,
      };
  }
}

export function TerminalEasterEgg() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<Line[]>(INITIAL_LINES);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Open on backtick / tilde when not typing in an input
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const { output } = runCommand(trimmed, router);
    setHistory((h) => [trimmed, ...h]);
    setHistoryIndex(-1);
    setInput('');

    if (output === '__EXIT__') {
      setOpen(false);
      return;
    }

    if (output === null) {
      setLines([]);
      return;
    }

    setLines((prev) => [
      ...prev,
      { type: 'input', content: `❯ ${trimmed}` },
      {
        type: output.startsWith('command not found') || output.startsWith('cd:') || output.startsWith('cat:')
          ? 'error'
          : 'output',
        content: output,
      },
    ]);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(next);
      setInput(history[next] ?? '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      setInput(next === -1 ? '' : history[next]);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-2xl rounded-xl border border-zinc-700 bg-zinc-950/95 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
          <div className="flex gap-1.5">
            <button
              onClick={() => setOpen(false)}
              className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
            />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-xs text-zinc-500">portfolio — terminal</span>
          <span className="font-mono text-xs text-zinc-600">press ` to toggle</span>
        </div>

        {/* Output */}
        <div className="h-72 overflow-y-auto p-4 font-mono text-sm">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap leading-relaxed ${
                line.type === 'input'
                  ? 'text-green-400'
                  : line.type === 'error'
                  ? 'text-red-400'
                  : 'text-zinc-400'
              }`}
            >
              {line.content}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input row */}
        <form onSubmit={submit} className="flex items-center gap-2 border-t border-zinc-800 px-4 py-3">
          <span className="font-mono text-sm text-green-500">❯</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent font-mono text-sm text-zinc-100 outline-none placeholder:text-zinc-700"
            placeholder="type a command..."
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}
