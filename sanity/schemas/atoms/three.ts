import { defineField } from "sanity";

export const Point = (label: string) => defineField({
  title: label,
  name: label.toLowerCase().replaceAll(' ', '-'),
  type: 'number',
  initialValue: 0,
  validation: (rule) => rule.required()
})

export const Vector3 = defineField({
  title: 'Vector3',
  name: 'vector3',
  type: 'object',
  validation: (rule) => rule.required(),
  fields: [
    Point('x'),
    Point('y'),
    Point('z')
  ]
})