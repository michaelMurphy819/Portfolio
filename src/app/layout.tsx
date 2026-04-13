import type { Metadata } from 'next'
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
    <html lang="en" className={`${GeistSans.variable} dark`}>
      <body className="antialiased font-sans">
        <NavBar />
        {children}
      </body>
    </html>
  )
}