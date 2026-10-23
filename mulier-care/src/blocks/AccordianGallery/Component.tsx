import type { AccordionGalleryBlock as AccordionGalleryProps } from '@/payload-types'

import { GalleryStack } from './galleryStack'

export function AccordionGalleryBlock({
  eyebrow,
  title,
  description,
  options,
}: AccordionGalleryProps) {
  return (
    <section className="py-12 lg:py-20">
      <div className="mx-auto mb-8 w-full max-w-7xl px-6 lg:mb-12 lg:px-12">
        <div className="ml-auto max-w-3xl text-right">
          {eyebrow && (
            <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              {eyebrow}
            </p>
          )}

          {title && (
            <h2 className="m-0 font-heading text-4xl leading-[1.1] tracking-tight text-balance text-primary lg:text-5xl xl:text-6xl">
              {title}
            </h2>
          )}

          {description && (
            <p className="mt-5 ml-auto max-w-2xl whitespace-pre-line font-body text-lg leading-relaxed text-pretty text-slate-600">
              {description}
            </p>
          )}
        </div>
      </div>

      <GalleryStack options={options} />
    </section>
  )
}