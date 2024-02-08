import { animated, useSpring } from '@react-spring/three'
import { MeshProps, ThreeEvent, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Color, Mesh, Vector3 } from 'three'

interface DotProps extends MeshProps {
  isWaypoint: boolean
  isHovering: boolean

  onMouseIn: (e: ThreeEvent<PointerEvent>) => void
  onMouseOut: (e: ThreeEvent<PointerEvent>) => void
}

const originalScale = new Vector3(1, 1, 1)
const hoveredScale = new Vector3(2, 2, 2)

function Dot({ isHovering, isWaypoint, onMouseIn, onMouseOut, ...props }: DotProps) {
  const innerRef = useRef<Mesh>(null)
  const dotColors = isWaypoint ? ['red', 'hotpink'] : ['blue', 'lightblue']
  const { color } = useSpring({ color: isHovering ? new Color(dotColors[1]) : new Color(dotColors[0]) })

  useFrame(() => {
    if (!innerRef.current) return

    if (isHovering) {
      innerRef.current.scale.lerp(hoveredScale, 0.1)
    } else {
      innerRef.current.scale.lerp(originalScale, 0.1)
    }

  })

  return (
    <group
      onPointerEnter={onMouseIn}
      onPointerOut={onMouseOut}
      onPointerLeave={onMouseOut}
      onPointerCancel={onMouseOut}
    >
      <mesh
        ref={innerRef}
        {...props}
      >
        <sphereGeometry args={[2]} />
        <animated.meshBasicMaterial color={color} />
      </mesh>
    </group>
  )
}

export default Dot
