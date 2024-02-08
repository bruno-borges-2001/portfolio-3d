import Navbar from '@/components/Navbar'
import Providers from '@/hooks'
import { cn } from '@/utils/style'
import type { Metadata } from 'next'
import { Poppins, Work_Sans } from 'next/font/google'
import './globals.css'

const workSans = Work_Sans({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900',] })
const poppins = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900',] })

export const metadata: Metadata = {
  title: 'Bruno Borges | Front End Developer',
  description: 'This is my portfolio! Enjoy!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(workSans.className, poppins.className, "behaviour")}>
        <Providers>
          <main className='bg-slate-800'>
            <Navbar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
