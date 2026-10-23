import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock3, MapPin } from 'lucide-react'

import RichText from '@/components/RichText'
import { FormBlock } from '@/blocks/Form/Component'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

const getJob = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'jobs',
    overrideAccess: false,
    draft: false,
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      and: [
        { slug: { equals: slug } },
        { _status: { equals: 'published' } },
      ],
    },
  })

  return result.docs[0] ?? null
})

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params
  const job = await getJob(slug)

  return {
    title: job ? `${job.title} | Mulier Care` : 'Opportunity not found',
    description: job?.summary,
    robots: job?.isOpen ? undefined : { index: false, follow: true },
  }
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params
  const job = await getJob(slug)

  if (!job) notFound()

  const payload = await getPayload({ config: configPromise })

  const formID =
    typeof job.applicationForm === 'object'
      ? job.applicationForm?.id
      : job.applicationForm

  const formResult =
    job.isOpen && formID != null
      ? await payload.find({
          collection: 'forms',
          overrideAccess: false,
          depth: 0,
          limit: 1,
          pagination: false,
          where: {
            id: { equals: formID },
          },
          select: {
            title: true,
            fields: true,
            submitButtonLabel: true,
            confirmationType: true,
            confirmationMessage: true,
            redirect: true,
          },
        })
      : null

  const applicationForm = formResult?.docs[0]

  return (
    <article className="pb-20">
      <header className="border-b border-primary/10 bg-linear-to-br from-primary/[0.06] via-white to-white pt-12 pb-12 lg:pt-20 lg:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Link
            href="/jobs"
            className="mb-9 inline-flex min-h-11 items-center gap-2 font-body text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            All opportunities
          </Link>

          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {job.opportunityType === 'paid'
              ? 'Join our team'
              : 'Share your time and talents'}
          </p>

          <h1 className="max-w-4xl font-heading text-4xl leading-[1.08] tracking-tight text-balance text-primary sm:text-5xl lg:text-6xl">
            {job.title}
          </h1>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-body text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <Clock3 aria-hidden="true" className="size-4" />
              {job.commitment}
            </span>

            <span className="inline-flex items-center gap-2">
              <MapPin aria-hidden="true" className="size-4" />
              {job.location}
            </span>

            <span className="font-semibold text-primary">
              {job.opportunityType === 'paid' ? 'Paid position' : 'Volunteer'}
            </span>
          </div>

          <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-slate-600">
            {job.summary}
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16 lg:px-12 lg:py-16">
        <section aria-label="Opportunity details" className="min-w-0">
          <RichText
            data={job.description}
            className="
              font-body leading-relaxed text-slate-600
              [&_p]:mb-5
              [&_h2]:mt-9 [&_h2]:mb-4 [&_h2]:font-heading
              [&_h2]:text-3xl [&_h2]:text-primary
              [&_h3]:mt-7 [&_h3]:mb-3 [&_h3]:font-heading
              [&_h3]:text-2xl [&_h3]:text-primary
              [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6
              [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6
              [&_li]:mb-2
              [&_a]:text-primary [&_a]:underline
            "
          />
        </section>

        <aside className="h-fit rounded-3xl border border-primary/10 bg-primary/[0.035] p-6 lg:sticky lg:top-28">
          <h2 className="font-heading text-2xl text-primary">
            {job.isOpen ? 'Take the next step.' : 'This opening is closed.'}
          </h2>

          <p className="mt-3 font-body text-sm leading-relaxed text-slate-600">
            {job.isOpen
              ? 'Tell us about yourself and what you would bring to this role.'
              : 'Explore our other opportunities to find another way to get involved.'}
          </p>

          <a
            href={job.isOpen && applicationForm ? '#apply' : '/jobs'}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-5 py-3 font-body text-sm font-semibold text-white hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            {job.isOpen && applicationForm
              ? 'Start your application'
              : 'Explore opportunities'}
          </a>

          {job.isOpen && job.applicationEmail && (
            <a
              href={`mailto:${job.applicationEmail}?subject=${encodeURIComponent(
                `Application: ${job.title}`,
              )}`}
              className="mt-4 block py-2 text-center font-body text-sm text-primary underline underline-offset-4"
            >
              Apply by email
            </a>
          )}
        </aside>
      </div>

      {job.isOpen && applicationForm && (
        <section
          id="apply"
          className="scroll-mt-28 border-t border-primary/10 bg-primary/[0.025] px-6 py-12 lg:py-16"
        >
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Your next step
            </p>

            <h2 className="font-heading text-4xl text-primary">
              Apply for this opportunity.
            </h2>

            <p className="mt-4 mb-8 font-body leading-relaxed text-slate-600">
              You’re applying for <strong>{job.title}</strong>.
              Complete the form below to introduce yourself.
            </p>

            <FormBlock
              enableIntro={false}
              form={applicationForm}
              jobID={job.id}
            />
          </div>
        </section>
      )}

      {job.isOpen && !applicationForm && (
        <p className="mx-auto max-w-3xl px-6 font-body text-slate-600">
          The online application is currently unavailable.
          {job.applicationEmail
            ? ' Please use the email application link above.'
            : ' Please check back soon.'}
        </p>
      )}
    </article>
  )
}