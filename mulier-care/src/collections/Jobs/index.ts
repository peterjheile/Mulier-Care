import { slugField, type CollectionConfig } from 'payload'

import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { canReadPublished } from '@/access/canReadPublished'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: {
    singular: 'Opportunity',
    plural: 'Opportunities',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'title',
      'opportunityType',
      'isOpen',
      '_status',
      'updatedAt',
    ],
    description: 'Manage paid positions and volunteer opportunities.',
  },
  access: {
    create: isAdminOrEditor,
    read: canReadPublished,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  versions: {
    drafts: true,
    maxPerDoc: 25,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'opportunityType',
          type: 'select',
          required: true,
          defaultValue: 'paid',
          options: [
            { label: 'Paid', value: 'paid' },
            { label: 'Volunteer', value: 'volunteer' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'commitment',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
            description: 'For example: Full-time, Part-time, or 4 hours per week.',
          },
        },
      ],
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      admin: {
        description: 'For example: Bloomington, IN · On-site.',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 240,
      admin: {
        description: 'A brief introduction shown on the opportunity card.',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      admin: {
        description:
          'Describe the role, responsibilities, qualifications, and what applicants can expect.',
      },
    },
    {
      name: 'applicationForm',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      admin: {
        description:
          'Select a reusable application form or create one for this opening.',
      },
    },
    {
      name: 'applicationEmail',
      type: 'email',
      admin: {
        description:
          'Optional alternative application address. Only provide this if email applications are accepted.',
      },
    },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'normal',
      required: true,
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'High need', value: 'high' },
        { label: 'Urgent', value: 'urgent' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'isOpen',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description:
          'Closed opportunities disappear from listings and stop accepting applications.',
      },
    },
    slugField(),
  ],
}