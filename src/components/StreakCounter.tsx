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

  return (
    <div className="flex items-center gap-6 rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-4">
      <div className="flex items-center gap-2">
        <Flame
          size={28}
          className={streak && streak > 0 ? 'text-orange-400' : 'text-zinc-600'}
        />
        <div>
          <p className="font-mono text-3xl font-bold text-zinc-100">
            {streak === null ? '—' : streak}
          </p>
          <p className="font-mono text-xs text-zinc-500">day streak</p>
        </div>
      </div>
      <div className="h-10 w-px bg-zinc-800" />
      <div>
        <p className="font-mono text-3xl font-bold text-zinc-100">{totalDays}</p>
        <p className="font-mono text-xs text-zinc-500">total active days</p>
      </div>
    </div>
  );
}