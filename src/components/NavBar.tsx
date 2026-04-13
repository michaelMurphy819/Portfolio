'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const links = [
  { href: '/',           label: 'Home' },
  { href: '/projects',   label: 'Projects' },
  { href: '/research',   label: 'Research' },
  { href: '/about',      label: 'About' },
]

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-6 inset-x-0 z-50 transition-all duration-500`}>
      <div className={`mx-auto flex max-w-2xl items-center justify-between px-6 py-3 rounded-full border transition-all ${
        scrolled 
          ? 'glass-panel border-white/10 shadow-2xl shadow-black/50' 
          : 'border-white/5 bg-white/5 backdrop-blur-md'
      }`}>
        <Link href="/" className="text-sm font-bold tracking-tighter text-white">
          MM<span className="text-sky-500">.</span>
        </Link>
        <div className="flex items-center gap-8">
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
      </div>
    </nav>
  )
}