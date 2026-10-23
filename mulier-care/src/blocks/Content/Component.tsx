import type { ContentBlock as ContentBlockProps, Media } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { ImageStack } from './ImageStack'

// Accepts the existing template renderer's prop; this section owns its container.
type Props = ContentBlockProps & { disableInnerContainer?: boolean }

export function ContentBlock({ eyebrow, title, description, images, textPosition }: Props) {
  const photos = (images ?? [])
    .map(({ image }) => image)
    .filter((image): image is Media => Boolean(image && typeof image === 'object' && image.url))

  const paragraphs = description ? description.split(/\n\s*\n/).filter((paragraph) => paragraph.trim()) : []

  return (
    <section className="relative isolate overflow-clip py-16 lg:py-28">
      <div className={cn(
        'mx-auto grid max-w-7xl items-center gap-12 px-6 lg:px-12',
        photos.length > 0 && 'lg:grid-cols-2 lg:gap-20',
      )}>
        <div className={cn('min-w-0 max-w-xl', textPosition === 'right' && photos.length > 0 && 'lg:order-2')}>
          {eyebrow && (
            <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              {eyebrow}
            </p>
          )}
          <h2 className="m-0 font-heading text-4xl leading-[1.1] font-medium tracking-tight text-balance text-primary lg:text-5xl xl:text-6xl">
            {title}
          </h2>
          <div className="mt-6 space-y-5 font-body text-base leading-relaxed text-slate-700 lg:text-lg">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="whitespace-pre-line">{paragraph}</p>
            ))}
          </div>
        </div>

        {photos.length > 0 && (
          <div className={cn('min-w-0 px-3 py-8 sm:px-8', textPosition === 'right' && 'lg:order-1')}>
            <ImageStack images={photos} />
          </div>
        )}
      </div>
    </section>
  )
}
