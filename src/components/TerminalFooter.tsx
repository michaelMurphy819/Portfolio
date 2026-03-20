'use client';

import { useEffect, useState } from 'react';

interface SystemStat {
  key: string;
  value: string;
}

// Calculates a realistic uptime string from page load
function useUptime() {
  const [start] = useState(() => Date.now());
  const [uptime, setUptime] = useState('0s');

  useEffect(() => {
    const interval = setInterval(() => {
      const secs = Math.floor((Date.now() - start) / 1000);
      const h = Math.floor(secs / 3600);
      const m = Math.floor((secs % 3600) / 60);
      const s = secs % 60;
      setUptime(h > 0 ? `${h}h ${m}m ${s}s` : m > 0 ? `${m}m ${s}s` : `${s}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, [start]);

  return uptime;
}

export function TerminalFooter() {
  const uptime = useUptime();
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  const stats: SystemStat[] = [
    { key: 'user', value: 'michael-murphy@portfolio' },
    { key: 'os', value: 'macos-m1-air' },
    { key: 'uptime', value: uptime },
    { key: 'time', value: time },
    { key: 'stack', value: 'next.js + supabase + vercel' },
    { key: 'status', value: 'coding' },
    { key: 'interests', value: 'systems · software · data' },
  ];

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-6 py-6">
        {/* Terminal prompt header */}
        <p className="mb-3 font-mono text-xs text-zinc-600">
          $ neofetch --minimal
        </p>

        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map(({ key, value }) => (
            <div key={key} className="flex items-baseline gap-2 font-mono text-xs">
              <span className="text-green-500 min-w-[5rem]">{key}</span>
              <span className="text-zinc-600">:</span>
              <span className={value === 'coding' ? 'text-sky-400 animate-pulse' : 'text-zinc-400'}>
                {value}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-4 font-mono text-xs text-zinc-700">
          — built with obsessive attention to detail. all systems nominal.
        </p>
      </div>
    </footer>
  );
}