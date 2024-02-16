import { Html } from '@react-three/drei';
import { HtmlProps } from '@react-three/drei/web/Html';
import { useCallback, useEffect, useRef } from 'react';
import Modal from '../Modal';


interface AnnotationProps extends Omit<HtmlProps, 'onClick'> {
  height: number | string;
  width: number | string;

  onClick?: () => void
}

function Annotation({ children, height, width, ...rest }: AnnotationProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const annotationRef = useRef<HTMLDivElement>(null)

  const adjustAnnotationPosition = useCallback(() => {
    if (!annotationRef.current) {
      return
    }

    const rect = annotationRef.current.getBoundingClientRect()
    const parentRect = annotationRef.current.parentElement!.getBoundingClientRect()

    const origin = ['top', 'left']

    if (parentRect.x + rect.width >= window.innerWidth - 20) {
      annotationRef.current.style.left = 'unset'
      annotationRef.current.style.right = '0'
      origin[1] = 'right'
    } else {
      annotationRef.current.style.left = '0'
      annotationRef.current.style.right = 'unset'
    }

    if (parentRect.y + rect.height >= window.innerHeight - 20) {
      annotationRef.current.style.top = 'unset'
      annotationRef.current.style.bottom = '0'
      origin[0] = 'bottom'
    } else {
      annotationRef.current.style.top = '0'
      annotationRef.current.style.bottom = 'unset'
    }
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(adjustAnnotationPosition)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [adjustAnnotationPosition])

  return (
    <Html {...rest} className='relative overflow-visible'>
      <Modal ref={annotationRef} onClick={rest.onClick} height={height} width={width}>
        {children}
      </Modal>
    </Html>

  )
}

export default Annotation
