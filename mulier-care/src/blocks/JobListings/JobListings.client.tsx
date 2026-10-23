'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Clock3,
  HeartHandshake,
  MapPin,
} from 'lucide-react'

import type { Job } from '@/payload-types'
import { cn } from '@/utilities/ui'

export type JobListing = Pick<
  Job,
  | 'id'
  | 'title'
  | 'slug'
  | 'opportunityType'
  | 'commitment'
  | 'location'
  | 'summary'
  | 'priority'
  | 'applicationEmail'
>

type Props = {
  jobs: JobListing[]
}

const filters = [
  { value: 'paid', label: 'Paid positions', icon: BriefcaseBusiness },
  { value: 'volunteer', label: 'Volunteer', icon: HeartHandshake },
] as const

const priorityOrder = {
  urgent: 0,
  high: 1,
  normal: 2,
}

export function JobListingsClient({ jobs }: Props) {
  const [activeType, setActiveType] =
    useState<Job['opportunityType']>('paid')

  const resultsID = useId()

  const visibleJobs = jobs
    .filter((job) => job.opportunityType === activeType)
    .sort(
      (a, b) =>
        priorityOrder[a.priority ?? 'normal'] -
        priorityOrder[b.priority ?? 'normal'],
    )

  return (
    <div>
      <div className="mb-8 flex flex-col gap-5 border-b border-primary/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Filter opportunities"
          className="inline-flex w-fit max-w-full flex-wrap gap-1 rounded-full border border-primary/10 bg-primary/[0.035] p-1.5"
        >
          {filters.map(({ value, label, icon: Icon }) => {
            const selected = activeType === value
            const count = jobs.filter(
              (job) => job.opportunityType === value,
            ).length

            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                aria-controls={resultsID}
                onClick={() => setActiveType(value)}
                className={cn(
                  'inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 font-body text-sm font-semibold transition-colors motion-reduce:transition-none',
                  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary',
                  selected
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-slate-600 hover:bg-white hover:text-primary',
                )}
              >
                <Icon aria-hidden="true" className="size-4 shrink-0" />

                {label}

                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-xs tabular-nums',
                    selected ? 'bg-white/15' : 'bg-primary/5',
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <p
          role="status"
          className="font-body text-sm text-slate-500"
        >
          {visibleJobs.length}{' '}
          {visibleJobs.length === 1 ? 'opportunity' : 'opportunities'}
        </p>
      </div>

      <div id={resultsID}>
        {visibleJobs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-primary/20 bg-primary/[0.025] px-6 py-14 text-center">
            <HeartHandshake
              aria-hidden="true"
              className="mx-auto mb-5 size-9 text-primary/60"
            />

            <h3 className="font-heading text-3xl text-primary">
              No {activeType === 'paid' ? 'paid positions' : 'volunteer openings'} right now.
            </h3>

            <p className="mx-auto mt-3 max-w-md font-body leading-relaxed text-slate-600">
              Please check back for new opportunities, or explore the other
              category.
            </p>
          </div>
        ) : (
          <ul className="m-0 grid list-none gap-5 p-0 lg:grid-cols-2 lg:gap-6">
            {visibleJobs.map((job) => {
              const href = `/jobs/${encodeURIComponent(job.slug ?? '')}`
              const urgent = job.priority === 'urgent'
              const highNeed = job.priority === 'high'

              return (
                <li key={job.id} className="min-w-0">
                  <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-primary/10 bg-linear-to-br from-primary/[0.055] via-primary/[0.025] to-white p-6 shadow-[0_12px_40px_-28px_rgba(117,21,139,0.35)] sm:p-8">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <span className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        {job.opportunityType === 'paid'
                          ? 'Paid opportunity'
                          : 'Volunteer opportunity'}
                      </span>

                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-body text-xs font-semibold',
                          urgent
                            ? 'bg-primary text-white'
                            : highNeed
                              ? 'bg-primary/10 text-primary'
                              : 'border border-primary/10 bg-white text-slate-600',
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-full bg-current"
                        />
                        {urgent ? 'Urgent' : highNeed ? 'High need' : 'Open'}
                      </span>
                    </div>

                    <h3 className="font-heading text-3xl leading-tight tracking-tight text-slate-900">
                      <Link
                        href={href}
                        className="rounded-sm hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                      >
                        {job.title}
                      </Link>
                    </h3>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-body text-sm text-slate-600">
                      <span className="inline-flex items-center gap-2">
                        <Clock3 aria-hidden="true" className="size-4 text-primary/70" />
                        {job.commitment}
                      </span>

                      <span className="inline-flex items-center gap-2">
                        <MapPin aria-hidden="true" className="size-4 shrink-0 text-primary/70" />
                        {job.location}
                      </span>
                    </div>

                    <p className="mt-5 mb-8 font-body leading-relaxed text-slate-600">
                      {job.summary}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-primary/10 pt-5">
                      <Link
                        href={href}
                        className="inline-flex min-h-11 items-center gap-2 font-body text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                      >
                        View details
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                      </Link>

                      <Link
                        href={`${href}#apply`}
                        aria-label={`Apply for ${job.title}`}
                        className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-primary px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none"
                      >
                        Apply now
                        <ArrowDown aria-hidden="true" className="size-4" />
                      </Link>
                    </div>

                    {job.applicationEmail && (
                      <a
                        href={`mailto:${job.applicationEmail}?subject=${encodeURIComponent(
                          `Application: ${job.title}`,
                        )}`}
                        className="mt-3 w-fit py-2 font-body text-xs text-slate-600 underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
                      >
                        Prefer to apply by email?
                      </a>
                    )}
                  </article>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}