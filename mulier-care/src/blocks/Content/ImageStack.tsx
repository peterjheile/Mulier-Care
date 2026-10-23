'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

import type { Media } from '@/payload-types'
import Stack from '@/components/ui/Stack'

export function ImageStack({ images }: { images: Media[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.25 })
  const reduceMotion = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const photos = images.filter((image) => Boolean(image.url))
  if (!photos.length) return null

  const cards = photos.map((image) => (
    <Image
      key={image.id}
      src={image.url!}
      alt={image.alt || ''}
      fill
      sizes="(min-width: 1024px) 400px, (min-width: 480px) 400px, 85vw"
      draggable={false}
      className="object-cover"
      style={{ objectPosition: `${image.focalX ?? 50}% ${image.focalY ?? 50}%` }}
    />
  ))

  return (
    <div ref={ref} className="mx-auto w-full max-w-[400px]">
      <div
        className="relative aspect-[4/5]"
        // Keyboard interaction stops automatic cycling until the visitor resumes it.
        onFocusCapture={() => setPaused(true)}
      >
        {photos.length === 1 ? (
          <div className="absolute inset-0 overflow-hidden rounded-[21px]">{cards[0]}</div>
        ) : (
          <Stack
            cards={cards}
            layout="pile"
            visible={4}
            depth={0.2}
            threshold={150}
            radius={21}
            spread={0.5}
            tilt={5}
            speed={.75}
            autoplay={inView && !paused && reduceMotion === false}
            autoplayDelay={5000}
            pauseOnHover
            sendToBackOnClick
            onChange={setActiveIndex}
            shadow={true}
          />
        )}
      </div>

      {photos.length > 1 && (
        <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-body text-sm text-slate-600">
        {/* <span>{(activeIndex % photos.length) + 1} / {photos.length}</span> */}
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          className="
            min-h-11 rounded px-2 font-medium text-primary
            underline-offset-4 hover:underline
            focus-visible:outline-2 focus-visible:outline-offset-4
            focus-visible:outline-primary
            motion-reduce:hidden
          "
        >
          {paused ? 'Resume slideshow' : 'Pause slideshow'}
        </button>
          {/* <p className="w-full text-center text-xs">Click or drag a photo. With the stack focused, press Enter for the next image.</p> */}
        </div>
      )}
    </div>
  )
}
