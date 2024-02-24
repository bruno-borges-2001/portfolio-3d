import Navbar from '@/components/Navbar'
import Providers from '@/hooks'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from "@vercel/speed-insights/next"

import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Bruno Borges | Front End Developer',
  description: 'This is my portfolio! Enjoy!',

  openGraph: {
    type: 'profile',
    firstName: 'Bruno',
    lastName: 'Borges'
  },

  keywords: ['developer', 'frontend', 'front end', 'front-end', 'full stack', 'full-stack', 'react', 'next', 'html', 'css', 'tailwind', 'javascript', 'typescript'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="overscroll-y-none font-poppins">
        <Providers>
          <main className='bg-slate-800'>
            <Navbar />
            {children}
            <Analytics />
            <SpeedInsights />
          </main>
        </Providers>
      </body>
    </html>
  )
}
