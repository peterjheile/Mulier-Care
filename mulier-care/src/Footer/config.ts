import type { GlobalConfig } from 'payload'

import { anyone } from '@/access/anyone'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: anyone,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Supporting mothers with compassion, practical care, and a community that walks beside them.',
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation',
      maxRows: 16,
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'newsletter',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Stay close to the good.',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            'Receive stories, updates, and opportunities to make a difference.',
        },
        {
          name: 'information',
          type: 'textarea',
          defaultValue:
            'Sign up for email updates from Mulier Care. You can unsubscribe from future newsletters at any time.',
        },
        {
          name: 'form',
          type: 'relationship',
          relationTo: 'forms',
          admin: {
            description:
              'Select a dedicated newsletter form with one required Email field named "email". Do not select a job application form.',
          },
        },
      ],
    },
    {
      name: 'contactPage',
      type: 'relationship',
      relationTo: 'pages',
      admin: {
        description: 'Optional page for the “Get in touch” link.',
      },
    },
    {
      name: 'privacyPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Privacy Policy Page',
    },
    {
      name: 'termsPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Terms of Service Page',
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}