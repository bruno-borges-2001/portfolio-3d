import { Image } from "sanity";

export interface IAsset {
  image: Image
  alt: string
}

export interface ILink {
  icon?: Image
  iconAlignment: 'left' | 'right' | null
  href: string
  label: string

  showDefaultIcon: boolean
  iconLink: boolean
}

export interface ITag {
  icon: Image
  label: string
  type: 'skill' | 'general'
  value: string
}