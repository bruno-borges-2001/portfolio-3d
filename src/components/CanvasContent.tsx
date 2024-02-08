import { useFrame, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import useReducedMotion from '../hooks/useReducedMotion'
import useStateContext from '../hooks/useStateContext'
import useTimedRoll from '../hooks/useTimedHover'
import useTimeout from '../hooks/useTimer'
import City from '../models/City'
import Cloud from '../models/Cloud'
import data, { IMarkedWaypoint } from '../utils/data'
import { moveToFactory } from '../utils/movement'
import Marker from './Marker'

type Marker = { id: string } & IMarkedWaypoint

interface CanvasContentProps {
  waypoint: string
  setWaypoint: React.Dispatch<React.SetStateAction<string>>
}

const markers = Object.entries(data.waypoints)
  .map(([key, value]) => ({ ...value, id: key }))
  .filter(el => el.showMarker) as Marker[]

const markerLabels = markers.filter(el => el.id.startsWith('w')).map(el => el.id)

function CanvasContent({ waypoint, setWaypoint }: CanvasContentProps) {
  const { setState } = useStateContext()

  const [hoveringMarker, setHoveringMarker, setRolling] = useTimedRoll(markerLabels)

  useEffect(() => {
    setRolling(waypoint === 'rotating')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waypoint])

  const prefersReducedMotion = useReducedMotion()
  const { camera } = useThree()
  const moveTo = moveToFactory(camera, prefersReducedMotion)

  const { timer: setStateTimeout, stopTimer } = useTimeout()

  useFrame(() => {
    stopTimer(waypoint)

    switch (waypoint) {
      case "rotating":
        if (prefersReducedMotion) return
        camera.rotation.z += 0.001
        break
      default: {
        const _waypoint = data.waypoints[waypoint]
        if (!_waypoint) return

        moveTo(_waypoint.position, _waypoint.lookAt, waypoint === 'home' ? 0.2 : undefined)

        if (!_waypoint.nextState) return

        setStateTimeout({
          cb: () => setWaypoint(_waypoint.nextState!),
          timeout: 1000,
          label: waypoint
        })
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
          onClick={() => setState(el.label)}
          onMouseIn={() => setWaypoint(prev => prev === 'rotating' ? 'stopped' : prev)}
          onMouseOut={() => setWaypoint(prev => prev === 'stopped' ? 'rotating' : prev)}
          label={el.label}
          description={el.description}
        />
      )}
    </>
  )
}

export default CanvasContent
