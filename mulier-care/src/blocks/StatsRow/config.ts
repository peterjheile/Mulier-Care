import type { Block } from 'payload'

export const StatsRow: Block = {
  slug: 'statsRow',
  interfaceName: 'StatsRowBlock',
  labels: {
    singular: 'Stats Row',
    plural: 'Stats Rows',
  },
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
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'subtitle',
      type: 'textarea',
    },
    {
      name: 'stats',
      type: 'array',
      required: true,
      minRows: 3,
      maxRows: 3,
      labels: {
        singular: 'Statistic',
        plural: 'Statistics',
      },
      admin: {
        description:
          'Add three statistics. Drag to change their display order.',
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
          filterOptions: {
            mimeType: {
              equals: 'image/svg+xml',
            },
          },
          admin: {
            description: 'Upload or select an SVG icon.',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description:
              'A short label, such as Mothers Served or Volunteer Hours.',
          },
        },
        {
          name: 'value',
          type: 'number',
          required: true,
          min: 0,
          admin: {
            description:
              'The final number the counter will display. Enter numbers without commas.',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'prefix',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Optional text before the number, such as $.',
              },
            },
            {
              name: 'suffix',
              type: 'text',
              admin: {
                width: '50%',
                description: 'Optional text after the number, such as + or %.',
              },
            },
          ],
        },
      ],
    },
  ],
}