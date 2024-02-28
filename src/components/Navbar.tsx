'use client'

import Image from 'next/image'
import useStateContext from '../hooks/useStateContext'

function Navbar() {
  const { state, setState } = useStateContext()

  return (
    <header className='header'>
      <button onClick={() => setState(null)} className="w-10 h-10 rounded-lg bg-slate-500/80 items-center justify-center flex font-bold shadow-md cursor-pointer overflow-hidden">
        <Image src="/assets/images/logo.png" alt='bruno borges logo' width={40} height={40} />
      </button>

      <nav className='flex text-lg gap-7 font-medium'>
        <button onClick={() => setState('About')} disabled={state === 'About'} className={state === 'About' ? 'text-blue-500' : 'text-white'}>
          About
        </button>

        <button onClick={() => setState('Projects')} className={state === 'Projects' ? 'text-blue-500' : 'text-white'}>
          Projects
        </button>

        <button onClick={() => setState('Contact Me')} className={state === 'Contact Me' ? 'text-blue-500' : 'text-white'}>
          Contact Me
        </button>
      </nav>
    </header>
  )
}

export default Navbar
