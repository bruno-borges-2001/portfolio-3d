import { Vector3 } from "three"

export interface IWaypoint {
  position: Vector3,
  lookAt?: Vector3,

  showMarker?: false,

  nextState?: string
}

export interface IMarkedWaypoint extends Omit<IWaypoint, 'showMarker'> {
  showMarker: true

  label: string
  description: string

  markerPosition: Vector3
}

const waypoints: { [key: string]: IWaypoint | IMarkedWaypoint } = {
  "home": {
    position: new Vector3(0, 20, 0),
    lookAt: new Vector3(0, -100, 0),

    nextState: 'rotating'
  },

  "w1": {
    position: new Vector3(0, -40, 30),
    lookAt: new Vector3(-22, -40, 50),

    showMarker: true,
    label: "About",
    description: "A small summary about my journey and who I am",

    markerPosition: new Vector3(-24, -30, 60),
  },

  "w2": {
    position: new Vector3(20, -20, -30),
    lookAt: new Vector3(16, -34, -46),

    showMarker: true,
    label: "Projects",
    description: "Discover everything about projects I worked on",

    markerPosition: new Vector3(16, -33, -46),
  },

  "w3": {
    position: new Vector3(25, -25, 0),
    lookAt: new Vector3(55, -50, -20),

    showMarker: true,
    label: "Skills",
    description: "What do I know? What can I work with? Find out here",

    markerPosition: new Vector3(42, -35, -14),
  },

  "w4": {
    position: new Vector3(-25, -45, 17),
    lookAt: new Vector3(-39, -52, 8),

    showMarker: true,
    label: "Contact Me",
    description: "Want to reach me?",

    markerPosition: new Vector3(-39, -52, 8),
  }
}

const data = {
  waypoints
}

export default data