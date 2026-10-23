'use client'

import Image from 'next/image'

import type { AccordionGalleryBlock } from '@/payload-types'
import AccordionGallery from '@/components/ui/AccordionGallery'

type GalleryStackProps = Pick<AccordionGalleryBlock, 'options'>

export function GalleryStack({ options }: GalleryStackProps) {
  const galleryItems = (options ?? []).flatMap(({ id, title, image }) => {
    if (!image || typeof image !== 'object' || !image.url) {
      return []
    }

    return [
      {
        id: id ?? `${image.id}-${title}`,
        image: image.url,
        label: title,
        alt: image.alt || title,
      },
    ]
  })

  if (galleryItems.length === 0) return null

  return (
    <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
      {/* Desktop */}
      <div className="hidden lg:block">
        <AccordionGallery
          key={galleryItems.map(({ id }) => id).join('-')}
          items={galleryItems}
          defaultIndex={0}
          orientation="horizontal"
          height={540}
          gap={12}
          radius={24}
          expandRatio={0.5}
          duration={0.55}
          tilt={0}
          parallax={0}
          grayscale={false}
          accentColor="var(--color-accent)"
          overlayColor="#160c1a"
          textColor="#ffffff"
          showLabels
          trigger="hover"
          className="font-body"
        />
      </div>

      {/* Mobile and tablet */}
      <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:hidden">
        {galleryItems.map((item) => (
          <li key={item.id}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-primary/5">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <h3 className="mt-3 font-body text-xl font-semibold text-primary">
              {item.label}
            </h3>
          </li>
        ))}
      </ul>
    </div>
  )
}