import { MeshProps, ThreeEvent } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import AnnotationComponent from './Annotation'
import Dot from './Dot'

interface MarkerProps extends Omit<MeshProps, "onClick"> {
  hidden?: boolean

  identifier: string
  isHovering: boolean
  setIsHovering: (id: string | null) => void

  onClick?: (e?: ThreeEvent<MouseEvent>) => void
  onMouseIn?: (e?: ThreeEvent<PointerEvent>) => void
  onMouseOut?: (e?: ThreeEvent<PointerEvent>) => void

  label: string
  description: string
}

function Marker({ hidden = false, isHovering, setIsHovering, label, description, ...props }: MarkerProps) {
  const hoverDebounce = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    document.body.style.cursor = isHovering ? 'pointer' : 'auto'
  }, [isHovering])

  const handleClick = (e?: ThreeEvent<MouseEvent>) => {
    setIsHovering(null)
    props.onClick?.(e)
  }

  const handlePointerIn = (e?: ThreeEvent<PointerEvent>) => {
    if (hoverDebounce.current) clearTimeout(hoverDebounce.current)

    setIsHovering(props.identifier)
    props.onMouseIn?.(e)
  }

  const handlePointerOut = (e?: ThreeEvent<PointerEvent>) => {
    if (hoverDebounce.current) clearTimeout(hoverDebounce.current)

    hoverDebounce.current = setTimeout(() => {
      setIsHovering(null)
      props.onMouseOut?.(e)
    }, 500)
  }

  const MarkerDot = () => !hidden && <Dot
    position={props.position}
    isHovering={isHovering}
    onClick={handleClick}
    onMouseIn={handlePointerIn}
    onMouseOut={handlePointerOut}
  />

  const Annotation = () => isHovering && (
    <AnnotationComponent
      position={props.position}
      height={150}
      width={"min(300px,50vw)"}
      onClick={handleClick}
    >
      <div className='flex h-full w-full text-white'>
        <div className='m-auto grid place-items-center'>
          <p className='text-xl sm:text-2xl font-bold'>{label}</p>
          <p className='text-base sm:text-lg font-thin grow py-3 text-center'>{description}</p>
        </div>
      </div>
    </AnnotationComponent>
  )

  return (
    <group>
      <MarkerDot />
      <Annotation />
    </group>
  )
}

export default Marker