'use client';

import { useState } from 'react';
import { Mail, Github, Linkedin, Copy, Check, ArrowUpRight } from 'lucide-react';

export function ContactMethods() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Villanova Email */}
      <div className="apple-card p-5 sm:p-6 flex flex-col justify-between bg-white border border-black/[0.08] hover:border-black/[0.16] transition-all">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-[#0071E3]">
              <Mail size={16} />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#86868B] font-semibold">
                Villanova Email
              </p>
              <p className="text-sm font-semibold text-[#1D1D1F] mt-0.5 font-mono truncate">
                mmurph104@villanova.edu
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-black/[0.06]">
          <button
            onClick={() => copyToClipboard('mmurph104@villanova.edu')}
            className="flex-1 apple-button-secondary py-1.5 text-xs font-semibold gap-1.5"
          >
            {copiedEmail === 'mmurph104@villanova.edu' ? (
              <>
                <Check size={12} className="text-emerald-600" /> Copied
              </>
            ) : (
              <>
                <Copy size={12} /> Copy
              </>
            )}
          </button>
          <a
            href="mailto:mmurph104@villanova.edu"
            className="apple-button-primary px-4 py-1.5 text-xs font-semibold"
          >
            Email
          </a>
        </div>
      </div>

      {/* Personal Email */}
      <div className="apple-card p-5 sm:p-6 flex flex-col justify-between bg-white border border-black/[0.08] hover:border-black/[0.16] transition-all">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Mail size={16} />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#86868B] font-semibold">
                Personal Email
              </p>
              <p className="text-sm font-semibold text-[#1D1D1F] mt-0.5 font-mono truncate">
                mikeymurph2005@yahoo.com
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-black/[0.06]">
          <button
            onClick={() => copyToClipboard('mikeymurph2005@yahoo.com')}
            className="flex-1 apple-button-secondary py-1.5 text-xs font-semibold gap-1.5"
          >
            {copiedEmail === 'mikeymurph2005@yahoo.com' ? (
              <>
                <Check size={12} className="text-emerald-600" /> Copied
              </>
            ) : (
              <>
                <Copy size={12} /> Copy
              </>
            )}
          </button>
          <a
            href="mailto:mikeymurph2005@yahoo.com"
            className="apple-button-primary px-4 py-1.5 text-xs font-semibold"
          >
            Email
          </a>
        </div>
      </div>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/michael-murphy-12a594222"
        target="_blank"
        rel="noopener noreferrer"
        className="apple-card p-4 sm:p-5 flex items-center justify-between bg-white border border-black/[0.08] hover:border-[#0071E3]/40 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-50 text-[#0071E3]">
            <Linkedin size={16} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
              LinkedIn
            </p>
            <p className="text-xs text-[#6E6E73]">michael-murphy-12a594222</p>
          </div>
        </div>
        <ArrowUpRight size={15} className="text-[#86868B] group-hover:text-[#1D1D1F] transition-colors" />
      </a>

      {/* GitHub */}
      <a
        href="https://github.com/michaelMurphy819"
        target="_blank"
        rel="noopener noreferrer"
        className="apple-card p-4 sm:p-5 flex items-center justify-between bg-white border border-black/[0.08] hover:border-black/[0.2] transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#F5F5F7] text-[#1D1D1F]">
            <Github size={16} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1D1D1F] transition-colors">
              GitHub
            </p>
            <p className="text-xs text-[#6E6E73]">@michaelMurphy819</p>
          </div>
        </div>
        <ArrowUpRight size={15} className="text-[#86868B] group-hover:text-[#1D1D1F] transition-colors" />
      </a>
    </div>
  );
}
