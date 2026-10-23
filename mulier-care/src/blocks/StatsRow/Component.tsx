import type { StatsRowBlock as StatsRowProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { StatsRow } from './SatsRow.client'

export function StatsRowBlock({
  title,
  subtitle,
  textPosition,
  stats,
}: StatsRowProps) {
  if (!stats?.length) return null

  const isRight = textPosition === 'right'

  return (
    <section aria-label={title || 'Our impact'} className="py-12 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        {(title || subtitle) && (
          <div
            className={cn(
              'mx-auto mb-10 max-w-3xl text-center lg:mb-14',
              isRight
                ? 'lg:ml-auto lg:mr-0 lg:text-right'
                : 'lg:ml-0 lg:mr-auto lg:text-left',
            )}
          >
            {title && (
              <h2 className="m-0 font-heading text-4xl leading-[1.1] tracking-tight text-balance text-primary lg:text-5xl">
                {title}
              </h2>
            )}

            {subtitle && (
              <p
                className={cn(
                  'mx-auto max-w-2xl whitespace-pre-line font-body text-lg leading-relaxed text-pretty text-slate-600',
                  title ? 'mt-5' : 'mt-0',
                  isRight
                    ? 'lg:ml-auto lg:mr-0'
                    : 'lg:ml-0 lg:mr-auto',
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        <StatsRow stats={stats} />
      </div>
    </section>
  )
}