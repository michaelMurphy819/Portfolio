'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Streak } from '@/lib/types';
import { Flame } from 'lucide-react';

function computeCurrentStreak(dates: string[]): number {
  if (!dates.length) return 0;
  const sorted = [...new Set(dates)].sort().reverse();
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  // Streak must include today or yesterday to be "active"
  if (sorted[0] !== today && sorted[0] !== yesterday) return 0;

  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diff = (prev.getTime() - curr.getTime()) / 86400000;
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

export function StreakCounter() {
  const [streak, setStreak] = useState<number | null>(null);
  const [totalDays, setTotalDays] = useState<number>(0);

  useEffect(() => {
    async function fetchStreak() {
      const supabase = createClient();
      const { data } = await supabase
        .from('streaks')
        .select('date')
        .order('date', { ascending: false });

      if (data) {
        const dates = (data as Pick<Streak, 'date'>[]).map((r) => r.date);
        setStreak(computeCurrentStreak(dates));
        setTotalDays(new Set(dates).size);
      }
    }
    fetchStreak();
  }, []);

  if (streak === null && totalDays === 0) return null; // Don't show while loading

  return (
    <div className="glass-panel inline-flex items-center gap-5 rounded-full px-6 py-3 shadow-[0_0_30px_-5px_rgba(19,181,234,0.15)] group hover:border-white/20 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className={`p-1.5 rounded-full ${streak && streak > 0 ? 'bg-orange-500/20 text-orange-400' : 'bg-zinc-500/20 text-zinc-400'}`}>
          <Flame size={18} className={streak && streak > 0 ? 'drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]' : ''} />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold text-white leading-none">{streak ?? 0}</span>
          <span className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase mt-0.5">Day Streak</span>
        </div>
      </div>
      
      <div className="h-8 w-px bg-white/10" />
      
      <div className="flex flex-col">
        <span className="text-base font-bold text-white leading-none">{totalDays}</span>
        <span className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase mt-0.5">Total Days</span>
      </div>
    </div>
  );
}
