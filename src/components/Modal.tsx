'use client'

import { forwardRef } from 'react'
import { cn } from '../utils/style'

interface ModalProps extends React.HTMLProps<HTMLButtonElement & HTMLDivElement> {
  height: string | number
  width: string | number
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(({ children, height, width, className, ...rest }, ref) => {
  return (
    <div ref={ref} onClick={rest.onClick} style={{ height, width }} className={cn('absolute flex p-4 box-content z-[999]', className)}>
      <div className={`p-4 bg-black/70 border border-red-600 annotation-enter ${rest.onClick ? 'cursor-pointer' : ''}`}>
        <div className='annotation-content-enter h-full relative select-none'>
          {children}
        </div>
      </div>
    </div>
  )
})

Modal.displayName = "Modal"

export default Modal
