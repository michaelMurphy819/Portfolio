'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        const yOffset = -90;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        window.history.pushState(null, '', `#${targetId}`);
      }
    }
  };

  return (
    <footer className="mt-24 border-t border-black/[0.06] bg-[#F5F5F7] py-14">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b border-black/[0.06]">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold tracking-tight text-[#1D1D1F]">
              Michael Murphy
            </h3>
            <p className="text-sm text-[#6E6E73] max-w-md leading-relaxed">
              Computer Science @ Villanova University · Vice President of Software Development Club.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm">
            <a
              href="https://github.com/michaelMurphy819"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
            >
              <Github size={15} /> GitHub <ArrowUpRight size={13} className="text-[#86868B]" />
            </a>
            <a
              href="https://www.linkedin.com/in/michael-murphy-12a594222"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#6E6E73] hover:text-[#0071E3] transition-colors"
            >
              <Linkedin size={15} /> LinkedIn <ArrowUpRight size={13} className="text-[#86868B]" />
            </a>
            <a
              href="mailto:mmurph104@villanova.edu"
              className="inline-flex items-center gap-1.5 text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
            >
              <Mail size={15} /> mmurph104@villanova.edu
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#86868B]">
          <p>© {new Date().getFullYear()} Michael Murphy. Built with Next.js & React 19.</p>
          <div className="flex items-center gap-6">
            <Link
              href={pathname === '/' ? '#projects' : '/#projects'}
              onClick={(e) => handleScrollTo(e, 'projects')}
              className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
            >
              Projects
            </Link>
            <Link
              href={pathname === '/' ? '#about' : '/#about'}
              onClick={(e) => handleScrollTo(e, 'about')}
              className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
            >
              About
            </Link>
            <Link href="/research" className="hover:text-[#1D1D1F] transition-colors">
              Research
            </Link>
            <Link
              href={pathname === '/' ? '#contact' : '/#contact'}
              onClick={(e) => handleScrollTo(e, 'contact')}
              className="hover:text-[#1D1D1F] transition-colors cursor-pointer"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}