import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4 animate-in fade-in duration-500">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full glass-panel shadow-[0_0_30px_-5px_rgba(19,181,234,0.3)]">
          <Loader2 className="animate-spin text-[#13B5EA]" size={32} />
          <div className="absolute inset-0 rounded-full border border-[#13B5EA]/20 animate-ping" />
        </div>
        <p className="text-sm font-bold tracking-widest text-[#13B5EA] uppercase">Loading...</p>
      </div>
    </div>
  );
}
