import React from 'react'
import Modal, { ModalReturnButton } from '../Modal'

function ModalContainer({ children }: { children?: React.ReactNode }) {
  return (
    <Modal
      key="projects-modal"
      height="80svh"
      width="min(90vw, 800px)"
      className="top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] box-border text-white text-left"
    >
      <section className="h-full max-h-full overflow-y-auto p-4 flex flex-col cursor-default">
        {children ?? <div className='flex w-full h-full justify-center items-center text-white text-xl font-bold'>WIP</div>}
      </section>

      <ModalReturnButton />
    </Modal>
  )
}

export default ModalContainer
