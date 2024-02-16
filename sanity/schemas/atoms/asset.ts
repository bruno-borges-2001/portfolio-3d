import { defineType } from "sanity";

export default defineType({
  title: 'Asset',
  name: 'asset',
  type: 'object',
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'image'
    },
    {
      title: 'Alt',
      name: 'alt',
      type: 'string'
    }
  ]
})