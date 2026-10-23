import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { linkGroup } from '@/fields/linkGroup'
import { revalidateHeader } from './hooks/revalidateHeader'

import { anyone } from '../access/anyone'
import { isAdminOrEditor } from '../access/isAdminOrEditor'

export const Header: GlobalConfig = {
  slug: 'header',

  access: {
    read: anyone,
    update: isAdminOrEditor,
  },

  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      maxRows: 6,

      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },

      fields: [
        {
          name: 'type',
          type: 'radio',
          label: 'Navigation Type',
          defaultValue: 'link',
          required: true,
          options: [
            {
              label: 'Direct Link',
              value: 'link',
            },
            {
              label: 'Dropdown Group',
              value: 'group',
            },
          ],
          admin: {
            layout: 'horizontal',
          },
        },

        // Direct-link items
        link({
          appearances: false,
          overrides: {
            admin: {
              condition: (_, siblingData) =>
                (siblingData?.type ?? 'link') === 'link',
            },
          },
        }),

        // Dropdown-group items
        {
          name: 'label',
          type: 'text',
          label: 'Group Label',
          required: true,
          admin: {
            description: 'The dropdown heading, such as “About Us”.',
            condition: (_, siblingData) => siblingData?.type === 'group',
          },
        },

        linkGroup({
          appearances: false,
          overrides: {
            label: 'Dropdown Links',
            required: true,
            minRows: 1,
            maxRows: 6,
            admin: {
              initCollapsed: true,
              description: 'Links displayed when this dropdown opens.',
              condition: (_, siblingData) => siblingData?.type === 'group',
            },
          },
        }),
      ],
    },
  ],

  hooks: {
    afterChange: [revalidateHeader],
  },
}