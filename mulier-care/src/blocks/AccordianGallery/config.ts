import type { Block } from 'payload'

export const AccordionGallery: Block = {
  slug: 'accordionGallery',
  interfaceName: 'accordionGalleryBlock',
  labels: {
    singular: 'Accordion Gallery',
    plural: 'Accordion Galleries',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'How we help',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'options',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 6,
      admin: {
        description:
          'Add an image and a short title for each option. Drag to change their order.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'For example: Pregnancy Tests or Ultrasounds.',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}