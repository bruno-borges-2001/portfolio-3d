'use client'

import { About, Contact, Project, Projects } from "@/components/ModalContent"
import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useState } from "react"
import CanvasContent from "../components/CanvasContent"
import Loader from "../components/Loader"
import useStateContext from "../hooks/useStateContext"
import data, { IMarkedWaypoint } from "../utils/data"

function Home() {
  const [waypoint, setWaypoint] = useState("rotating")
  const { state } = useStateContext()

  useEffect(() => {
    if (!state) return

    const waypoint = (Object.entries(data.waypoints) as [string, IMarkedWaypoint][]).find(([, value]) => value.label === state)?.[0]
    if (waypoint) setWaypoint(waypoint)
    else setWaypoint('home')
  }, [state])

  return (
    <section className="w-full h-svh relative">
      {state === 'Contact Me' && <Contact />}
      {state === 'About' && <About />}
      {state === 'Projects' && <Projects />}
      {waypoint.startsWith('p') && <Project>{data.waypoints[waypoint].children}</Project>}

      <Canvas
        className="w-full h-full bg-transparent"
        camera={{
          near: 0.1,
          far: 1000,
          fov: 110,
          position: data.waypoints['home'].position,
          rotation: [-Math.PI / 2, 0, 0],
        }}
      >
        <Suspense fallback={<Loader />}>
          <CanvasContent waypoint={waypoint} setWaypoint={setWaypoint} />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home
