'use client'

import { useMovement } from "@/hooks/useMovement";
import useStateContext from "@/hooks/useStateContext";
import useTimedRoll from "@/hooks/useTimedHover";
import useTimeout from "@/hooks/useTimer";
import City from "@/models/City";
import Cloud from "@/models/Cloud";
import { ProjectMarker, SanityProject } from "@/types/projects";
import { IWaypoint, PROJECT_PREDICATE, waypoints } from "@/utils/constants";
import { useReducedMotion } from "@react-spring/three";
import { Canvas as Canvas_, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useState } from "react";
import { Vector3 } from "three";
import Loader from "./Loader";
import Marker from "./Marker";

type Marker = { id: string } & IWaypoint

interface CanvasProps {
  projectMarkers: SanityProject[]
}

const home = {
  position: new Vector3(0, 20, 0),
  lookAt: new Vector3(0, -100, 0),
}

const markers: Marker[] = Object.entries(waypoints).map(([key, value]) => ({ ...value, id: key }))
const markerLabels = markers.map(el => el.id)

function CanvasContent({ projectMarkers: unparsedProjectMarkers }: CanvasProps) {
  const projectMarkers = useMemo((): ProjectMarker[] => {
    return unparsedProjectMarkers.map(el => ({
      ...el,
      position: new Vector3(...el.position),
      lookAt: new Vector3(...el.lookAt),
      markerPosition: el.markerPosition ? new Vector3(...el.markerPosition) : undefined
    }))
  }, [unparsedProjectMarkers])

  const [waypoint, setWaypoint] = useState("rotating")

  const { state } = useStateContext()

  const waypointObj: IWaypoint | ProjectMarker | null = useMemo(() => {
    if (waypoint === 'rotating') return null

    return waypoints[waypoint] ?? projectMarkers.find(el => el.title === waypoint)
  }, [projectMarkers, waypoint])

  useEffect(() => {
    if (!state) return

    let waypoint;

    if (state.startsWith(PROJECT_PREDICATE)) {
      const searchLabel = state.split(PROJECT_PREDICATE).at(-1)
      waypoint = projectMarkers.find((el) => el.title === searchLabel)?.title
    } else {
      waypoint = Object.entries(waypoints).find(([, value]) => value.label === state)?.[0]
    }

    if (waypoint) setWaypoint(waypoint)
    else setWaypoint('home')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const [hoveringMarker, setHoveringMarker, setRolling] = useTimedRoll(markerLabels)

  useEffect(() => {
    setRolling(waypoint === 'rotating')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waypoint])

  const prefersReducedMotion = useReducedMotion()
  const moveTo = useMovement()

  const { timer: setStateTimeout, stopTimer } = useTimeout()

  useFrame((state) => {
    stopTimer(waypoint)

    switch (waypoint) {
      case "rotating":
        if (prefersReducedMotion) return
        state.camera.rotation.z += 0.001
        break
      case "home":
        moveTo(home.position, home.lookAt, 0.2)

        setStateTimeout({
          cb: () => setWaypoint('rotating'),
          timeout: 1000,
          label: waypoint
        })
      default: {
        if (!waypointObj) return

        moveTo(waypointObj.position, waypointObj.lookAt)
      }
    }
  })

  return (
    <>
      <directionalLight position={[1, 1, 1]} intensity={2} color="#506886" />
      <ambientLight />
      <hemisphereLight groundColor="#041A40" intensity={1} />
      <fog attach="fog" color="#041A40" near={1} far={175} />

      <City
        position={[10, -100, 30]}
        rotation={[0.1, 4.7, 0]}
      />

      <Cloud />

      {markers.map(el =>
        <Marker
          key={el.label}
          position={el.markerPosition}
          identifier={el.id}
          isHovering={el.id === hoveringMarker}
          setIsHovering={setHoveringMarker}
          hidden={el.id === waypoint}
          onMouseIn={() => setWaypoint(prev => prev === 'rotating' ? 'stopped' : prev)}
          onMouseOut={() => setWaypoint(prev => prev === 'stopped' ? 'rotating' : prev)}
          label={el.label}
          description={el.description}
        />
      )}

      {projectMarkers.map(el => el.markerPosition &&
        <Marker
          key={el.title}
          position={el.markerPosition}
          identifier={el.title}
          isHovering={el.title === hoveringMarker}
          setIsHovering={setHoveringMarker}
          hidden={el.title === waypoint}
          onMouseIn={() => setWaypoint(prev => prev === 'rotating' ? 'stopped' : prev)}
          onMouseOut={() => setWaypoint(prev => prev === 'stopped' ? 'rotating' : prev)}
          label={el.title}
          description={el.description}
          isProject
        />
      )}
    </>
  )
}

interface CanvasProps {
  projectMarkers: SanityProject[]
}

export default function Canvas({ ...props }: CanvasProps) {
  return (
    <Canvas_
      className="w-full h-full bg-transparent"
      camera={{
        near: 0.1,
        far: 1000,
        fov: 110,
        position: home.position,
        rotation: [-Math.PI / 2, 0, 0],
      }}
    >
      <Suspense fallback={<Loader />}>
        <CanvasContent {...props} />
      </Suspense>
    </Canvas_>
  )
}