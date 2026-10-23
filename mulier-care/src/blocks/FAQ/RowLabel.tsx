'use client'

import { useRowLabel } from '@payloadcms/ui'

import type { FAQBlock } from '@/payload-types'

type Question = NonNullable<FAQBlock['questions']>[number]

export function RowLabel() {
  const { data, rowNumber } = useRowLabel<Question>()

  const number = (rowNumber ?? 0) + 1

  return (
    <div>
      {data?.question
        ? `${number}. ${data.question}`
        : `Question ${number}`}
    </div>
  )
}