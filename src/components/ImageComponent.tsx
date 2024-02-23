'use client'

/* eslint-disable jsx-a11y/alt-text */

import { cn } from '@/utils/style'
import { motion } from 'framer-motion'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'
import { createPortal } from 'react-dom'

const MotionImage = motion(Image)

interface ImageModalProps extends ImageProps {
  onClose: () => void
}

function Image_({ src, ...rest }: ImageProps) {
  const isSvg = typeof src === 'string' && src.includes('.svg')

  return isSvg
    // eslint-disable-next-line @next/next/no-img-element
    ? <motion.img layout {...rest as any} src={src as string} />
    : <MotionImage layout {...rest as any} src={src} />
}

function ImageModal({ onClose, ...rest }: ImageModalProps) {
  return createPortal(
    <div onClick={onClose} className='fixed inset-0 grid place-items-center bg-black/60 backdrop-blur-sm z-[999]'>
      <div className='w-fit h-fit max-h-[calc(100svh-2rem)] max-w-[calc(100vw-2rem)] bg-white p-4 rounded-md' onClick={(e) => e.stopPropagation()}>
        <Image_
          {...rest}
          className='h-auto w-auto !max-h-[calc(100svh-4rem)] max-w-full'
        />
      </div>
      <button onClick={onClose} className='absolute top-4 right-4 text-white font-semibold px-3 py-2 bg-black/50 backdrop-blur-sm shadow-md rounded-sm hover:bg-slate-900 hover:brightness-125 transition-colors'>
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
      <button onClick={() => setIsOpen(true)} className={cn("cursor-pointer hover:brightness-90 h-full w-fit relative", className)}>
        <Image_ {...props} className='h-full w-auto' />
      </button>
      {isOpen && <ImageModal {...props} onClose={() => setIsOpen(false)} />}
    </>
  )
}

export default ImageComponent
