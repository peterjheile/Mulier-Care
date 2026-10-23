import {
    APIError,
    type CollectionBeforeChangeHook,
    type CollectionBeforeDeleteHook,
    type PayloadRequest,
}   from 'payload'


import type { User } from '../../../payload-types'

async function ensureAnotherAdminExists(req: PayloadRequest, userID: User['id']): Promise<void> {
    const { totalDocs } = await req.payload.count({
        collection: 'users',
        where: {
            and: [
                { role: {equals: 'admin'}},
                { id: { not_equals: userID }}
            ]
        },
        overrideAccess: true,
        req,
    })

    if (totalDocs === 0) {
        throw new APIError(
            'You cannot delete or demote the last admin. Assign another user as admin first.',
            400,
        )
    }
}

export const preventLastAdminDemotion: CollectionBeforeChangeHook<User> = async ({ data, originalDoc, operation, req}) => {
    const isDemotingAdmin = 
        operation === 'update' &&
        originalDoc?.role === 'admin' &&
        data.role !== undefined &&
        data.role !== 'admin'

    if (isDemotingAdmin) {
        await ensureAnotherAdminExists(req, originalDoc.id)
    }

    return data
}


export const preventLastAdminDeletion: CollectionBeforeDeleteHook =
  async ({ id, req }) => {
    const user = await req.payload.findByID({
      collection: 'users',
      id,
      depth: 0,
      overrideAccess: true,
      req,
    })

    const isDeletingAdmin = user.role === 'admin'

    if (isDeletingAdmin) {
      await ensureAnotherAdminExists(req, user.id)
    }
  }
 