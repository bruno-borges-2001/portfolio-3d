import { Image, Slug } from "sanity";

export interface SanityTag {
  icon: Image
  label: string
  value: Slug
}