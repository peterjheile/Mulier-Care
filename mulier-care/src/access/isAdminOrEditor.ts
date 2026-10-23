import type { PayloadRequest } from 'payload'

export const isAdminOrEditor = (
  { req }: { req: PayloadRequest },
): boolean => {
  return req.user?.role === 'admin' || req.user?.role === 'editor'
}