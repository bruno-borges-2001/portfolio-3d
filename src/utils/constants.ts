import { Vector3 } from "three";

export const PROJECT_PREDICATE = 'project:'

export interface IWaypoint {
  position: Vector3
  lookAt?: Vector3

  label: string
  description: string

  markerPosition: Vector3
}

export const waypoints: { [key: string]: IWaypoint } = {
  "about": {
    position: new Vector3(0, -40, 30),
    lookAt: new Vector3(-22, -40, 50),

    label: "About",
    description: "A small summary about my journey and who I am",

    markerPosition: new Vector3(-24, -30, 60),
  },

  "projects": {
    position: new Vector3(20, -20, -30),
    lookAt: new Vector3(16, -34, -46),

    label: "Projects",
    description: "Discover everything about projects I worked on",

    markerPosition: new Vector3(16, -33, -46),
  },

  "skills": {
    position: new Vector3(25, -25, 0),
    lookAt: new Vector3(55, -50, -20),

    label: "Skills",
    description: "What do I know? What can I work with? Find out here",

    markerPosition: new Vector3(42, -35, -14),
  },

  "contact": {
    position: new Vector3(-25, -45, 17),
    lookAt: new Vector3(-39, -52, 8),

    label: "Contact Me",
    description: "Want to reach me?",

    markerPosition: new Vector3(-39, -52, 8),
  }
}