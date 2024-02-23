import { groq } from "next-sanity";

export const allProjects = groq`
  *[_type=="project"]{
    title,
    description,
    mainImage,
    "company": company->name,
    "tags":tags[]->label,
    "position": [position.x, position.y, position.z],
    "lookAt": [lookAt.x, lookAt.y, lookAt.z],
    "markerPosition": [markerPosition.x, markerPosition.y, markerPosition.z]
  }
`

export const project = (title: string) => groq`
  *[_type=="project" && title=="${title}"][0]{ ..., "tags": tags[]-> }
` 