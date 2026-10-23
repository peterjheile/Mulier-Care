import Link from 'next/link'
import type { ReactNode } from 'react'

import type { Page } from '@/payload-types'

type CMSLinkProps = {
  type?: 'custom' | 'reference' | null
  reference?: {
    relationTo: 'pages'
    value: Page | string | number | null
  } | null
  url?: string | null
  label?: string | null
  newTab?: boolean | null
  className?: string
  children?: ReactNode
}

export function CMSLink({
  type,
  reference,
  url,
  label,
  newTab,
  className,
  children,
}: CMSLinkProps) {
  let href: string | null | undefined

  if (type === 'reference') {
    const page = reference?.value

    if (!page || typeof page !== 'object' || !page.slug) {
      return null
    }

    href = page.slug === 'home' ? '/' : `/${page.slug}`
  } else {
    href = url
  }

  if (!href) return null

  return (
    <Link
      href={href}
      className={className}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
    >
      {label}
      {children}
    </Link>
  )
}