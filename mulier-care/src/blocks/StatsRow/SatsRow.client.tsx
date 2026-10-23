'use client'

import Image from 'next/image'
import { useReducedMotion } from 'motion/react'

import type { StatsRowBlock } from '@/payload-types'

import CountUp from '@/components/ui/CountUp'

type StatsRowProps = Pick<StatsRowBlock, 'stats'>

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 20,
})

export function StatsRow({ stats }: StatsRowProps) {
  const prefersReducedMotion = useReducedMotion()

  if (!stats?.length) return null

  return (
    <dl
      className="
        m-0 grid grid-cols-1
        divide-y divide-primary/20
        lg:grid-cols-3 lg:divide-x lg:divide-y-0
      "
    >
      {stats.map(({ id, icon, title, value, prefix, suffix }, index) => {
        if (typeof value !== 'number' || !Number.isFinite(value)) {
            return null
        }

        const media =
            icon && typeof icon === 'object' ? icon : null

        const formattedValue = numberFormatter.format(value)

        return (
          <div
            key={id ?? index}
            className="
              flex min-w-0 flex-col items-center
              px-6 py-10 text-center
              lg:px-8 lg:py-4
            "
          >
            <dt className="flex flex-col items-center">
              {media?.url && (
                <Image
                  src={media.url}
                  alt=""
                  width={56}
                  height={56}
                  unoptimized
                  className="mb-5 size-14 object-contain"
                />
              )}

              <span className="font-body text-lg font-medium text-primary lg:text-xl">
                {title}
              </span>
            </dt>

            <dd className="m-0 mt-3 font-heading text-5xl leading-none font-semibold tracking-tight text-primary tabular-nums xl:text-6xl">
              {/* Read the final value without announcing animation updates. */}
              <span className="sr-only">
                {prefix}
                {formattedValue}
                {suffix}
              </span>

              <span aria-hidden="true">
                {prefix}

                {prefersReducedMotion ? (
                  formattedValue
                ) : (
                  <CountUp
                    key={value}
                    from={0}
                    to={value}
                    duration={2.5}
                    delay={0.15}
                    separator=","
                  />
                )}

                {suffix}
              </span>
            </dd>
          </div>
        )
      })}
    </dl>
  )
}