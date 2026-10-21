import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFC]">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="animate-spin text-[#0071E3]" size={24} />
        <p className="text-xs font-semibold tracking-wider text-[#86868B] uppercase">Loading</p>
      </div>
    </div>
  );
}
