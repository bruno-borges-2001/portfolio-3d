import { groq } from "next-sanity";

export const allTags = groq`
  *[_type=="tag"] | order(_createdAt asc) {...}
`

export const getTagsFromIds = (tags: string[]) => groq`
  *[_type=="tag" && _id in [${tags.join(',')}]]{...}
`