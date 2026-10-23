import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { FormPreview } from './FormPreview.client'

export const metadata: Metadata = {
  title: 'Form Preview',
  robots: {
    index: false,
    follow: false,
  },
}

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function FormPreviewPage({ params }: Props) {
  const payload = await getPayload({ config: configPromise })

  const { user } = await payload.auth({
    headers: await headers(),
  })

  const canPreview =
    user?.collection === 'users' &&
    (user.role === 'admin' || user.role === 'editor')

  // Check authorization before querying the form.
  if (!canPreview) {
    notFound()
  }

  const { id } = await params

  const result = await payload.find({
    collection: 'forms',
    overrideAccess: false,
    user,
    depth: 1,
    limit: 1,
    pagination: false,
    where: {
      id: {
        equals: id,
      },
    },
  })

  const form = result.docs[0]

  if (!form) {
    notFound()
  }

return (
  <main className="mx-auto w-full max-w-3xl px-6 py-16">
    <FormPreview initialForm={form} />
  </main>
)
}