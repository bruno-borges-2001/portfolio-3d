import { groq } from "next-sanity";

export const allTags = groq`
  *[_type=="tag"]{...}
`