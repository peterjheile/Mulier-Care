'use client'

import { useRowLabel } from '@payloadcms/ui'
import type { Header } from '@/payload-types'

type NavItem = NonNullable<Header['navItems']>[number]

export const RowLabel = () => {
  const { data } = useRowLabel<NavItem>()

  const isGroup = data?.type === 'group'

  const name = (
    isGroup ? data?.label : data?.link?.label
  )?.trim()

  const label = name
    ? `${name} — ${isGroup ? 'Dropdown' : 'Link'}`
    : `Untitled ${isGroup ? 'dropdown' : 'link'}`

  return <span>{label}</span>
}