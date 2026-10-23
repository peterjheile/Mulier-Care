import type { Block } from 'payload'

export const JobListings: Block = {
  slug: 'jobListings',
  interfaceName: 'JobListingsBlock',
  labels: {
    singular: 'Job Listings',
    plural: 'Job Listings',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Find your place',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Make a difference with us.',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Explore opportunities to share your time, skills, and compassion in support of mothers and their families.',
    },
  ],
}