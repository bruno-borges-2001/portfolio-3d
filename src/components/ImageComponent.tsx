/* eslint-disable jsx-a11y/alt-text */

import { cn } from '@/utils/style'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'
import { createPortal } from 'react-dom'

interface ImageModalProps extends Omit<ImageProps, ''> {
  onClose: () => void
}

function ImageModal({ onClose, ...rest }: ImageModalProps) {
  return createPortal(
    <div onClick={onClose} className='fixed inset-0 grid place-items-center bg-black/60 backdrop-blur-sm z-[999]'>
      <div className='w-fit h-fit max-h-[calc(100svh-2rem)] max-w-[calc(100vw-2rem)] bg-white p-4 rounded-md' onClick={(e) => e.stopPropagation()}>
        <Image
          {...rest}
          className='h-auto w-auto max-h-full max-w-full'
        />
      </div>
      <button onClick={onClose} className='absolute top-4 right-4 text-white font-semibold'>
        Close
      </button>
    </div>,
    document.body
  )
}

function ImageComponent({ className, ...props }: ImageProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={cn("cursor-pointer hover:brightness-90", className)}>
        <Image {...props} className='h-full w-auto' />
      </button>
      {isOpen && <ImageModal {...props} onClose={() => setIsOpen(false)} />}
    </>
  )
}

export default ImageComponent
