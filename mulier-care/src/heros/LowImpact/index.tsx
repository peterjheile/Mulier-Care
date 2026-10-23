import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import type { Page } from '@/payload-types'

import { Button } from '@/components/ui/button'

const heroLinks = {
  give: '/donate',
  learn: '/about',
}

export const LowImpactHero: React.FC<Page['hero']> = ({backgroundImage, title, subtitle}) => {
  const background = typeof backgroundImage === 'object' ? backgroundImage : null


  return (
    <section
      className="
        relative isolate flex min-h-[100]
        items-center justify-center overflow-hidden
        bg-[#27232a] px-6 py-24 text-white

        lg:min-h-[600] lg:px-12 lg:py-32
      "
    >
      {/* Background photograph */}
      {background?.url && (
        <Image
          src={background.url}
          alt={background.alt ? background.alt : ""}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{
            objectPosition: `${background.focalX ?? 50}% ${
              background.focalY ?? 50
            }%`,
          }}
        />
      )}

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/30"
      />

      {/* Hero content */}
      <div
        className="
          relative z-10 mx-auto flex w-full max-w-6xl
          flex-col items-center text-center lg:items-start lg:text-left lg:mx-10
        "
      >
        {title && (
          <h1
            className="
              m-0 max-w-4xl
              font-heading text-4xl leading-[1.05] font-semibold
              tracking-tight text-balance text-white
              lg:text-6xl xl:text-7xl
            "
          >
            {title}
          </h1>
        )}

        {subtitle && (
          <p
            className="
              mt-6 max-w-xl
              font-body text-lg leading-relaxed
              text-pretty text-white/90
              lg:text-xl
            "
          >
            {subtitle}
          </p>
        )}

        <div className="mt-8 lg:mt-10">
          <Button size="lg" asChild>
            <Link href={heroLinks.give}>Give Today</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}


