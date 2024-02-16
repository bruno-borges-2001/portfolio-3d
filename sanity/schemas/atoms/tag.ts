import { defineField, defineType } from "sanity";

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      title: 'Label',
      name: 'label',
      type: 'string'
    }),
    defineField({
      title: 'Icon',
      name: 'icon',
      type: 'image'
    }),
    defineField({
      title: 'Value',
      name: 'value',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'label',
        maxLength: 96,
      },
    }),
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      initialValue: 'skill',
      options: {
        list: [
          { title: 'Skill', value: 'skill' },
          { title: 'General', value: 'general' }
        ]
      }
    }),
  ],
  preview: {
    select: {
      title: 'label',
      media: 'icon'
    },
    prepare(selection) {
      return selection
    },
  },
})