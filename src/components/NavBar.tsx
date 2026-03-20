'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const links = [
  { href: '/',           label: '~/home' },
  { href: '/projects',   label: '~/projects' },
  { href: '/research',   label: '~/research' },
  { href: '/about',      label: '~/about' },
]

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-sm font-semibold text-zinc-100 hover:text-white">
          <span className="text-green-500">❯</span> michael murphy
        </Link>
        <div className="flex items-center gap-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-100"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}