import { defineField, defineType } from "sanity";

export default defineType({
  name: 'company',
  title: 'Company',
  type: 'document',
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string'
    }),
    defineField({
      title: 'Logo',
      name: 'logo',
      type: 'image'
    }),
    defineField({
      title: 'Redirect',
      name: 'href',
      type: 'string'
    })
  ]
})