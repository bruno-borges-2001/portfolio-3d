import { Vector3 } from "three"
import { IAsset, ILink, ITag } from "./components"

export interface SanityProject {
  title: string
  description: string
  tags: string[]
  position: [number, number, number]
  lookAt: [number, number, number]
  markerPosition?: [number, number, number]
}

export interface ProjectMarker {
  title: string
  description: string
  tags: string[]
  position: Vector3
  lookAt: Vector3
  markerPosition?: Vector3
}

export interface DetailedProject {
  title: string
  description: string
  tags: ITag[],
  body: any,
  mainImage: IAsset,
  links: ILink[]
}