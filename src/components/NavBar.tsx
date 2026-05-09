'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Github, Linkedin, Menu, X } from 'lucide-react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/research', label: 'Research' },
  { href: '/about', label: 'About' },
]

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-6 inset-x-0 z-50 transition-all duration-500 px-4 sm:px-6 pointer-events-none`}>
      <div className={`pointer-events-auto mx-auto flex max-w-2xl items-center justify-between px-6 py-3 rounded-full border transition-all ${scrolled
          ? 'glass-panel border-white/10 shadow-2xl shadow-black/50'
          : 'border-white/5 bg-white/5 backdrop-blur-md'
        }`}>
        <Link href="/" className="text-sm font-bold tracking-tighter text-white z-10" onClick={() => setMobileMenuOpen(false)}>
          MM<span className="text-[#13B5EA]">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs font-semibold text-zinc-300 transition-colors hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="h-4 w-px bg-white/20" />

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/michaelMurphy819"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-all hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/michael-murphy-12a594222"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-[#13B5EA] transition-all hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="sm:hidden text-zinc-300 hover:text-white z-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-20 inset-x-4 p-6 glass-panel border border-white/10 rounded-2xl flex flex-col gap-4 sm:hidden shadow-2xl mx-auto max-w-sm">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-zinc-300 transition-colors hover:text-white"
            >
              {label}
            </Link>
          ))}
          <div className="h-px w-full bg-white/10 my-2" />
          <div className="flex items-center gap-6">
            <a href="https://github.com/michaelMurphy819" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/michael-murphy-12a594222" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#13B5EA]">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}