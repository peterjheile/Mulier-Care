import type { Block } from 'payload'

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  labels: { singular: 'Text & Image Stack', plural: 'Text & Image Stacks' },
  fields: [
    {
      name: 'textPosition',
      type: 'radio',
      defaultValue: 'left',
      required: true,
      options: [
        { label: 'Text on the left', value: 'left' },
        { label: 'Text on the right', value: 'right' },
      ],
      admin: { layout: 'horizontal', description: 'On mobile, text appears first.' },
    },
    { name: 'eyebrow', type: 'text', label: 'Eyebrow' },
    { name: 'title', type: 'text', required: true },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: { description: 'Use blank lines to separate paragraphs.' },
    },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 8,
      labels: { singular: 'Image', plural: 'Images' },
      admin: { description: 'Add at least three photos for the full stack effect. Reorder to choose the sequence.' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
    },
  ],
}
