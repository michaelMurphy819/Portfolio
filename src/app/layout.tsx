import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import NextTopLoader from 'nextjs-toploader'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#FAFAFC',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Michael Murphy — Software Engineer',
  description:
    'Computer Science @ Villanova University. Vice President of Software Development Club. Building native iOS apps, distributed systems, and machine learning models.',
  authors: [{ name: 'Michael Murphy', url: 'https://github.com/michaelMurphy819' }],
  creator: 'Michael Murphy',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://github.com/michaelMurphy819',
    title: 'Michael Murphy — Software Engineer',
    description:
      'Computer Science @ Villanova University. Building native iOS, distributed systems, and software engineering tools.',
    siteName: 'Michael Murphy Portfolio',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} light scroll-smooth`}>
      <body className="antialiased font-sans bg-[#FAFAFC] text-[#1D1D1F] min-h-screen selection:bg-blue-100 selection:text-blue-900">
        <NextTopLoader color="#0071E3" showSpinner={false} shadow="0 0 8px #0071E3" />
        <NavBar />
        <div className="flex flex-col min-h-screen">
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}