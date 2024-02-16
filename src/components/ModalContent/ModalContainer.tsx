'use client'

import useStateContext from '@/hooks/useStateContext'
import React from 'react'
import Modal from '../Modal'

function ModalContainer({ children }: { children?: React.ReactNode }) {
  const { setState } = useStateContext()

  return (
    <div className='fixed inset-0 backdrop-blur-md bg-black/50 z-[999]' onClick={() => setState(null)}>
      <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] box-border text-white text-left' onClick={(e) => e.stopPropagation()}>
        <Modal
          key="projects-modal"
          height="80svh"
          width="min(90vw, 800px)"
          className='relative'
        >
          <section className="h-full max-h-full overflow-y-auto p-4 flex flex-col cursor-default">
            {children ?? <div className='flex w-full h-full justify-center items-center text-white text-xl font-bold'>WIP</div>}
          </section>
        </Modal>
      </div>

      <button
        onClick={() => setState(null)}
        aria-label='go back'
        className="absolute bottom-0 left-1/2 translate-x-[-50%] text-gray-500 opacity-70 whitespace-nowrap"
      >
        click here to go back
      </button>
    </div>
  )
}

export default ModalContainer
