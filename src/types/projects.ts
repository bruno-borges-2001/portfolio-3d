import { Vector3 } from "three"
import { IAsset, ILink, ITag } from "./components"

interface IBaseProject {
  title: string
  description: string
  tags: string[]
  company: string
  mainImage: IAsset
}

export interface SanityProject extends IBaseProject {
  position: [number, number, number]
  lookAt: [number, number, number]
  markerPosition?: [number, number, number]
}

export interface ProjectMarker extends IBaseProject {
  position: Vector3
  lookAt: Vector3
  markerPosition?: Vector3
}

export interface DetailedProject extends Omit<IBaseProject, 'company' | 'tags'> {
  body: any,
  mainImage: IAsset,
  links: ILink[]
  tags: ITag[]
}