'use client'

import type { Footer } from '@/payload-types'
import { useRowLabel, type RowLabelProps } from '@payloadcms/ui'

export function RowLabel(_props: RowLabelProps) {
  const { data, rowNumber } =
    useRowLabel<NonNullable<Footer['navItems']>[number]>()

  const number = (rowNumber ?? 0) + 1

  return (
    <div>
      {data?.link?.label
        ? `${number}. ${data.link.label}`
        : `Navigation link ${number}`}
    </div>
  )
}