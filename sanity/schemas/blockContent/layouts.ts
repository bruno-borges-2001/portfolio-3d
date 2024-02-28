import { defineArrayMember } from "sanity";

export const Block = defineArrayMember({
  title: 'Block',
  type: 'block',
  // Styles let you set what your user can mark up blocks with. These
  // correspond with HTML tags, but you can set any title or value
  // you want and decide how you want to deal with it where you want to
  // use your content.
  // styles: [
  //   { title: 'Normal', value: 'normal' },
  //   { title: 'H1', value: 'h1' },
  //   { title: 'H2', value: 'h2' },
  //   { title: 'H3', value: 'h3' },
  //   { title: 'H4', value: 'h4' },
  //   { title: 'Quote', value: 'blockquote' },
  // ],
  // lists: [{ title: 'Bullet', value: 'bullet' }],
  // Marks let you mark up inline text in the block editor.
  // marks: {
  //   // Decorators usually describe a single property – e.g. a typographic
  //   // preference or highlighting by editors.
  //   decorators: [
  //     { title: 'Strong', value: 'strong' },
  //     { title: 'Emphasis', value: 'em' },
  //   ],
  //   // Annotations can be any object structure – e.g. a link or a footnote.
  //   annotations: [
  //     {
  //       title: 'URL',
  //       name: 'link',
  //       type: 'object',
  //       fields: [
  //         {
  //           title: 'URL',
  //           name: 'href',
  //           type: 'url',
  //         },
  //       ],
  //     },
  //   ],
  // },
})

export const Image = defineArrayMember({
  title: 'Image',
  type: 'asset'
})



export const TextImageBlock = defineArrayMember({
  title: 'TextImage',
  name: 'textImage',
  type: 'object',
  fields: [
    {
      title: 'Text',
      name: 'text',
      type: 'array',
      of: [Block, Image]
    },
    {
      title: 'Image',
      name: 'image',
      type: 'asset',
    },
    {
      title: 'Reversed layout',
      name: 'reversed',
      type: 'boolean'
    }
  ]
})

export const ImageListBlock = defineArrayMember({
  title: 'ImageList',
  name: 'imageList',
  type: 'object',
  fields: [
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{ type: 'asset' }]
    },
  ]
})

export const SkillList = defineArrayMember({
  title: 'SkillList',
  name: 'skillList',
  type: 'object',
  fields: [
    {
      title: 'Skills',
      name: 'skills',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }]
    }
  ]

})