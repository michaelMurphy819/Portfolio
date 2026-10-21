'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Github, Linkedin, Menu, X, Mail } from 'lucide-react'

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 15)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const targetId = window.location.hash.replace('#', '')
      const el = document.getElementById(targetId)
      if (el) {
        setTimeout(() => {
          const yOffset = -90
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }, 150)
      }
    }
  }, [pathname])

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (pathname === '/') {
      e.preventDefault()
      const el = document.getElementById(targetId)
      if (el) {
        const yOffset = -90
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
        window.history.pushState(null, '', `#${targetId}`)
      }
    }
  }

  const handleMobileScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setMobileMenuOpen(false)
    if (pathname === '/') {
      e.preventDefault()
      setTimeout(() => {
        const el = document.getElementById(targetId)
        if (el) {
          const yOffset = -90
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })
          window.history.pushState(null, '', `#${targetId}`)
        }
      }, 100)
    }
  }

  return (
    <header className="fixed top-4 inset-x-0 z-50 transition-all duration-300 px-4 sm:px-6 pointer-events-none">
      <div
        className={`pointer-events-auto mx-auto flex max-w-3xl items-center justify-between px-4 sm:px-5 py-2.5 rounded-full border transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-2xl border-black/[0.1] shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
            : 'bg-white/75 backdrop-blur-xl border-black/[0.07] shadow-[0_2px_14px_rgba(0,0,0,0.03)]'
        }`}
      >
        {/* Monogram */}
        <Link
          href="/"
          className="flex items-center gap-2 pl-1 pr-2 py-0.5 rounded-full text-sm font-semibold tracking-tight text-[#1D1D1F] hover:opacity-80 transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1D1D1F] text-white text-xs font-bold">
            M
          </span>
          <span className="font-semibold text-xs tracking-tight text-[#1D1D1F]">
            Michael Murphy
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-1 bg-[#F5F5F7] p-1 rounded-full border border-black/[0.05]">
          <Link
            href={isHome ? '#projects' : '/#projects'}
            onClick={(e) => handleScrollTo(e, 'projects')}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-white transition-all cursor-pointer"
          >
            Projects
          </Link>
          <Link
            href={isHome ? '#about' : '/#about'}
            onClick={(e) => handleScrollTo(e, 'about')}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-white transition-all cursor-pointer"
          >
            About & Experience
          </Link>
          <Link
            href="/research"
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              pathname === '/research'
                ? 'bg-white text-[#1D1D1F] font-semibold shadow-sm'
                : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-white'
            }`}
          >
            Research
          </Link>
          <Link
            href={isHome ? '#contact' : '/#contact'}
            onClick={(e) => handleScrollTo(e, 'contact')}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-white transition-all cursor-pointer"
          >
            Contact
          </Link>
        </nav>

        {/* Social Shortcuts */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            href="https://github.com/michaelMurphy819"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/[0.04] transition-all"
            aria-label="GitHub Profile"
          >
            <Github size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/michael-murphy-12a594222"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#6E6E73] hover:text-[#0071E3] hover:bg-black/[0.04] transition-all"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={15} />
          </a>
          <a
            href="mailto:mmurph104@villanova.edu"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/[0.04] transition-all"
            aria-label="Email Michael"
          >
            <Mail size={15} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="sm:hidden flex h-8 w-8 items-center justify-center rounded-full text-[#1D1D1F] hover:bg-black/[0.05] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-18 inset-x-4 p-5 apple-card flex flex-col gap-3 sm:hidden shadow-xl mx-auto max-w-sm border border-black/[0.08] bg-white">
          <div className="flex flex-col gap-1">
            <Link
              href={isHome ? '#projects' : '/#projects'}
              onClick={(e) => handleMobileScrollTo(e, 'projects')}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all"
            >
              Projects
            </Link>
            <Link
              href={isHome ? '#about' : '/#about'}
              onClick={(e) => handleMobileScrollTo(e, 'about')}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all"
            >
              About & Experience
            </Link>
            <Link
              href="/research"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all"
            >
              Research Papers
            </Link>
            <Link
              href={isHome ? '#contact' : '/#contact'}
              onClick={(e) => handleMobileScrollTo(e, 'contact')}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all"
            >
              Contact
            </Link>
          </div>

          <div className="h-px w-full bg-black/[0.06] my-1" />

          <div className="flex items-center justify-between px-2 pt-1 text-xs">
            <span className="text-[#86868B] font-medium">Connect</span>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/michaelMurphy819"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#6E6E73] hover:text-[#1D1D1F]"
              >
                <Github size={15} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/michael-murphy-12a594222"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#6E6E73] hover:text-[#0071E3]"
              >
                <Linkedin size={15} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}