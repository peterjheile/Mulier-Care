import { Plus } from 'lucide-react'

import type { FAQBlock as FAQBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

export function FAQBlock({
  eyebrow,
  title,
  description,
  questions,
}: FAQBlockProps) {
  const visibleQuestions = (questions ?? []).filter(
    (item) => item.question?.trim(),
  )

  if (visibleQuestions.length === 0) return null

  return (
    <section
      aria-label={title || 'Frequently asked questions'}
      className="py-12 lg:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="mx-auto max-w-3xl">
          {(eyebrow || title || description) && (
            <div className="mb-8 lg:mb-12">
              {eyebrow && (
                <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {eyebrow}
                </p>
              )}

              {title && (
                <h2 className="font-heading text-4xl leading-[1.1] tracking-tight text-balance text-primary lg:text-5xl">
                  {title}
                </h2>
              )}

              {description && (
                <p className="mt-5 max-w-2xl whitespace-pre-line font-body text-lg leading-relaxed text-pretty text-slate-600">
                  {description}
                </p>
              )}
            </div>
          )}

          <div className="space-y-3">
            {visibleQuestions.map(({ id, question, answer }, index) => (
              <details
                key={id ?? index}
                className="
                  group rounded-2xl border border-primary/15
                  bg-white
                  open:border-primary/25 open:bg-primary/[0.025]
                "
              >
                <summary
                  className="
                    flex min-h-16 cursor-pointer list-none
                    items-start justify-between gap-5
                    rounded-2xl px-5 py-5
                    font-body text-base font-semibold
                    leading-relaxed text-primary
                    transition-colors hover:bg-primary/[0.035]
                    focus-visible:outline-2
                    focus-visible:outline-offset-4
                    focus-visible:outline-primary
                    sm:px-6 sm:text-lg
                    motion-reduce:transition-none
                    [&::-webkit-details-marker]:hidden
                  "
                >
                  <span className="min-w-0">{question}</span>

                  <span
                    aria-hidden="true"
                    className="
                      relative mt-0.5 flex size-7 shrink-0
                      items-center justify-center rounded-full
                      bg-primary/5
                      group-open:bg-primary group-open:text-white
                    "
                  >
                    <Plus className="size-4 group-open:hidden" />

                    <span className="hidden h-0.5 w-3 rounded-full bg-current group-open:block" />
                  </span>
                </summary>

                <div className="px-5 pb-6 sm:px-6">
                  <div className="border-t border-primary/10 pt-5">
                    {answer?.root && (
                      <RichText
                        data={answer}
                        className="
                          font-body text-base leading-7 text-slate-600
                          wrap-break-word
                          [&_p]:mb-4 [&_p:last-child]:mb-0
                          [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6
                          [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6
                          [&_li]:mb-2
                          [&_strong]:font-semibold
                          [&_strong]:text-slate-800
                          [&_a]:rounded-sm [&_a]:text-primary
                          [&_a]:underline [&_a]:underline-offset-4
                          [&_a:hover]:decoration-2
                          [&_a:focus-visible]:outline-2
                          [&_a:focus-visible]:outline-offset-4
                          [&_a:focus-visible]:outline-primary
                        "
                      />
                    )}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}