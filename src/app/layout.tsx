import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { NavBar } from '@/components/NavBar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Michael Murphy — CS Portfolio',
  description: 'Computer Systems engineer. Low-level programming, Unix, C., database design, and software engineering.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} dark`}>
      <body className="bg-[#1a1b26] text-zinc-100 antialiased">
        <NavBar />
        {children}
      </body>
    </html>
  )
}