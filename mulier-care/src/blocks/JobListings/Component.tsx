import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { JobListingsBlock as Props } from '@/payload-types'

import {
  JobListingsClient,
  type JobListing,
} from './JobListings.client'

export async function JobListingsBlock({
  eyebrow,
  title,
  description,
}: Props) {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'jobs',
    overrideAccess: false,
    draft: false,
    depth: 0,
    pagination: false,
    sort: '-createdAt',
    where: {
      and: [
        { _status: { equals: 'published' } },
        { isOpen: { equals: true } },
      ],
    },
    select: {
      title: true,
      slug: true,
      opportunityType: true,
      commitment: true,
      location: true,
      summary: true,
      priority: true,
      applicationEmail: true,
    },
  })

  const jobs: JobListing[] = result.docs.map((job) => ({
    id: job.id,
    title: job.title,
    slug: job.slug,
    opportunityType: job.opportunityType,
    commitment: job.commitment,
    location: job.location,
    summary: job.summary,
    priority: job.priority,
    applicationEmail: job.applicationEmail,
  }))

  return (
    <section className="relative py-12 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="mb-9 max-w-3xl lg:mb-12">
          {eyebrow && (
            <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </p>
          )}

          <h2 className="font-heading text-4xl leading-[1.08] tracking-tight text-balance text-primary lg:text-6xl">
            {title}
          </h2>

          {description && (
            <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-pretty text-slate-600">
              {description}
            </p>
          )}
        </div>

        <JobListingsClient jobs={jobs} />
      </div>
    </section>
  )
}