import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  lexicalEditor,
  ParagraphFeature,
  TextStateFeature,
} from '@payloadcms/richtext-lexical'


export const hero: Field = {
  name: 'hero',
  type: 'group',
  label: false,
  fields: [
    {
      name: 'type',
      type: 'select',
      label: 'Hero Type',
      required: true,
      defaultValue: 'lowImpact',
      options: [
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Background Image',
      filterOptions: {
        mimeType: { contains: 'image/' }
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Hero Title',
      admin: {
        condition: (_, siblingData) =>
          siblingData?.type === 'lowImpact',
      },
    },
    {
      name: 'highImpactTitle',
      type: 'richText',
      required: true,
      label: 'Hero Title',
      admin: {
        condition: (_, siblingData) =>
          siblingData?.type === 'highImpact',
        description:
          'Enter your title, then select words and choose Accent to highlight them.',
      },
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          FixedToolbarFeature(),
          TextStateFeature({
            state: {
              heroStyle: {
                accent: {
                  label: 'Accent',
                  css: {
                    'font-style': 'italic',
                  },
                },
              },
            },
          }),
        ],
      }),
    },
    {
      name: 'logoImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Logo Image',
      filterOptions: {
        mimeType: { contains: 'image/'},
      },
      admin: {
        condition: (_, siblingData) =>
          siblingData?.type === 'highImpact',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      label: 'Subtitle',
      admin: {
        condition: (_, siblingData) => 
          siblingData?.type === 'lowImpact',
      },
    },
  ],
}
