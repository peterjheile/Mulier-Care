import { getPayload } from 'payload'
import { getSafeRedirect } from 'payload/shared'

import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import configPromise from '@payload-config'

export type PreviewSearchParams = {
  path: string
  previewSecret: string
}

export async function GET(req: NextRequest): Promise<Response> {
  const payload = await getPayload({ config: configPromise })
  const draft = await draftMode()

  const denyPreview = () => {
    draft.disable()

    return new Response('You are not allowed to preview this page', {
      status: 403,
    })
  }

  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path')
  const previewSecret = searchParams.get('previewSecret')

  if (
    !process.env.PREVIEW_SECRET ||
    previewSecret !== process.env.PREVIEW_SECRET
  ) {
    return denyPreview()
  }

  if (!path) {
    return new Response('Missing preview path', { status: 400 })
  }

  const safePath = getSafeRedirect({
    fallbackTo: '',
    redirectTo: path,
  })

  if (!safePath) {
    return new Response('Invalid preview path', { status: 400 })
  }

  try {
    const { user } = await payload.auth({
      headers: req.headers,
    })

    const canPreview =
      user?.collection === 'users' &&
      (user.role === 'admin' || user.role === 'editor')

    if (!canPreview) {
      return denyPreview()
    }
  } catch (error) {
    payload.logger.error(
      { err: error },
      'Error authenticating preview request',
    )

    return denyPreview()
  }

  draft.enable()

  redirect(safePath)
}