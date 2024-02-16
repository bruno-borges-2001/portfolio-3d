import { defineType } from "sanity";

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      hidden: ({ parent }) => !!parent?.iconLink
    },
    {
      name: 'href',
      title: 'Href',
      type: 'string'
    },
    {
      name: 'showDefaultIcon',
      title: 'Show Default Icon',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
      hidden: ({ parent }) => !!parent?.showDefaultIcon,
    },
    {
      name: 'iconLink',
      title: 'Icon Link',
      description: 'Is the link only an icon?',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'iconAlignment',
      title: 'Icon Alignment',
      type: 'string',
      hidden: ({ parent }) => !!parent?.iconLink,
      initialValue: 'left',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' }
        ]
      }
    }
  ]
})