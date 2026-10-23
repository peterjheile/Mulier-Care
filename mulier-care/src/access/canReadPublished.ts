import type { Access } from 'payload'

export const canReadPublished: Access = ({ req }) => {
    if (req.user?.role === 'admin' || req.user?.role === 'editor') {
        return true
    }

    return {
        _status: {
            equals: 'published',
        }
    }
}