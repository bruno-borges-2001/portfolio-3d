'use client'

import { Euler, Vector3, useFrame, useLoader } from '@react-three/fiber'
// @ts-expect-error ignore
import { TextureLoader } from 'three/src/loaders/TextureLoader'

import { memo, useMemo, useRef, useState } from 'react'
import { Mesh, Texture } from 'three'

import smokeTexture from '../assets/textures/smoke.png'

const CloudParticle = memo(({ texture }: { texture: Texture }) => {
  const particleRef = useRef<Mesh>(null)

  const [position] = useState<Vector3>([
    Math.random() * 250 - 125,
    Math.random() * 20 - 110,
    Math.random() * 250 - 125
  ])

  const [rotation] = useState<Euler>([
    -Math.PI / 2,
    0,
    Math.random() * 360
  ])

  useFrame((_, delta) => {
    if (!particleRef.current) return
    particleRef.current.rotation.z += delta * 0.1
  })

  return (
    <mesh ref={particleRef} position={position} rotation={rotation}>
      <planeGeometry args={[300, 300]} />
      <meshLambertMaterial map={texture} transparent />
    </mesh>
  )
})

CloudParticle.displayName = "Cloud Particle"

const PARTICLES_COUNT = 200

function Cloud() {
  const texture = useLoader(TextureLoader, smokeTexture.src)

  const particles = useMemo(() => {
    return new Array(PARTICLES_COUNT).fill(0).map((_, i) => <CloudParticle key={`smoke-particle-${i}`} texture={texture} />)
  }, [texture])

  return particles
}

export default Cloud
