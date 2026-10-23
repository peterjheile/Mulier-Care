import type { CollectionConfig } from 'payload'

import { isAdmin } from '../../access/isAdmin'
import { isAdminOrEditor } from '../../access/isAdminOrEditor'
import { preventLastAdminDeletion, preventLastAdminDemotion } from './hooks/protectLastAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: isAdminOrEditor,
    create: isAdmin,
    delete: isAdmin,
    read: isAdmin,
    update: isAdmin,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [preventLastAdminDemotion],
    beforeDelete: [preventLastAdminDeletion],
  },
  timestamps: true,
}
