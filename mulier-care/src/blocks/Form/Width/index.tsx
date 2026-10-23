import type { ReactNode } from 'react'

import { cn } from '@/utilities/ui'

type Props = {
  children: ReactNode
  className?: string
  width?: number | string | null
}

export function Width({ children, className }: Props) {
  return (
    <div className={cn('cms-form-field w-full min-w-0', className)}>
      {children}
    </div>
  )
}