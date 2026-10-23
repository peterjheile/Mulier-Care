import type { Block } from 'payload'
import {
  BoldFeature,
  FixedToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  labels: {
    singular: 'Frequently Asked Questions',
    plural: 'FAQ Sections',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'questions',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Question',
        plural: 'Questions',
      },
      admin: {
        initCollapsed: true,
        description: 'Add questions and drag to change their order.',
        components: {
          RowLabel: '@/blocks/FAQ/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: [
              ParagraphFeature(),
              BoldFeature(),
              ItalicFeature(),
              UnorderedListFeature(),
              OrderedListFeature(),
              LinkFeature({
                enabledCollections: [],
              }),
              FixedToolbarFeature(),
            ],
          }),
        },
      ],
    },
  ],
}