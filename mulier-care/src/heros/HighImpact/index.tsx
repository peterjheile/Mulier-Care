import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import type { Page } from '@/payload-types'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'

// Update these to match your page URLs.
const heroLinks = {
  give: '/donate',
  learn: '/about',
}


export const HighImpactHero: React.FC<Page['hero']> = ({ backgroundImage, logoImage, highImpactTitle}) => {
  const background = typeof backgroundImage === 'object' ? backgroundImage : null

  const logo = typeof logoImage === 'object' ? logoImage : null

  return (
    <section
      className="
        relative isolate flex min-h-[144]
        items-center justify-center overflow-hidden
        bg-[#27232a] px-6 py-24 text-white

        lg:min-h-[900] lg:px-12 lg:py-32
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


{/* Subtle darkness behind the centered hero content */}
<div
  aria-hidden="true"
  className="
    pointer-events-none absolute inset-0
    bg-[radial-gradient(ellipse_at_50%_55%,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.2)_40%,transparent_75%)]
  "
/>

{/* Darken the top for navigation */}
<div
  aria-hidden="true"
  className="
    pointer-events-none absolute inset-0
    bg-[linear-gradient(to_bottom,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.25)_18%,transparent_40%)]
  "
/>

      
      {/* Hero content (Logo, Title, CTAs) */}
      <div
        className="
          relative z-10 flex w-full max-w-6xl
          flex-col items-center text-center
        "
      >

        
        {logo?.url && (
          <div className="relative mb-5 size-36 shrink-0 lg:size-48">
            <Image
              src={logo.url}
              alt={logo.alt || 'Mulier Care'}
              fill
              priority
              sizes="(min-width: 1024px) 192px, 144px"
              className="object-contain"
            />
          </div>
        )}




        {/*Here Title above CTA buttons */}
        {highImpactTitle && (
          <RichText
            data={highImpactTitle}
            variant="heroTitle"
            className="
              font-heading

              m-0 max-w-5xl
              text-4xl leading-[1.02] font-bold
              tracking-[-0.025em] text-balance text-white
              lg:text-6xl xl:text-7xl
            "
          />
        )}




        {/* Conatins both CTA buttons */}
        <div
          className="
            flex flex-col items-center mt-5 gap-3

            md:flex-row md:justify-center md:mt-10 md:gap-6
          "
        >
          <Button size = 'lg' asChild>
            <Link href= {heroLinks.give}>Hero Button</Link>
          </Button>

          <Button variant={"outline"} size = 'lg' asChild>
            <Link href = {heroLinks.learn}>Hero Button</Link>
          </Button>
        </div>



      </div>
    </section>
  )
}