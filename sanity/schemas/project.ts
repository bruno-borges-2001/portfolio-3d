import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    {
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [{ type: 'company' }]
    },
    {
      title: 'Links',
      name: 'links',
      type: 'array',
      of: [{ type: 'link' }],
    },
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tag' }]
        }
      ]
    },
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'asset',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'vector3',
      description: 'Where the camera will be',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'lookAt',
      title: 'Look At',
      type: 'vector3',
      description: 'Where the camera will look to',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'markerPosition',
      title: 'Marker Position',
      type: 'vector3',
      description: 'Where the marker will be'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      media: 'mainImage.image'
    },
    prepare(selection) {
      const { description } = selection
      return { ...selection, subtitle: description }
    },
  },
})