'use client'

import Link from 'next/link'
import Image from 'next/image'

import type { Header, SiteSetting } from '@/payload-types'
import { HeaderNav } from './Nav'

export type HeaderLayoutProps = {
  data: Header
  siteName: SiteSetting['siteName']
  logo: SiteSetting['logo']
}

function MobileHeader({data, siteName, logo}: HeaderLayoutProps){
  const logoImage = typeof logo === 'object' ? logo : null

  return (
    <div className ="
      mx-auto flex min-h-20 max-w-7xl
      items-center justify-between gap-6
      px-6 lg:px-12
    ">

      <Link
        href="/"
        className="shrink-0 font-heading text-3xl font-semibold"
      >
        Mulier Care
      </Link>


      <HeaderNav data={data} />
    </div>
  )
}

function DesktopHeader({data, siteName, logo}: HeaderLayoutProps){
  const logoImage = typeof logo === 'object' ? logo : null



  return (
    <div className ="
      mx-auto grid h-24 max-w-7xl
      grid-cols-[1fr_auto_1fr] items-center gap-6
      px-6 py-4 lg:px-12
    ">

      {/* Logo + Site Title Left */}
      <div className="flex items-center gap-3 justify-self-start">
        {logo && typeof logo === 'object' && logo.url && (
          <div className="relative size-16 shrink-0">
            <Image
              src={logo.url}
              alt=""
              fill
              sizes="48px"
              className="object-contain"
            />
          </div>
        )}

        <span className="relative font-heading top-1 text-3xl font-semibold">
          {siteName}
        </span>
      </div>


      <HeaderNav data={data} />


      <Link
        href="/donate"
        className="justify-self-end inline-flex items-center gap-3 font-body font-semibold text-lg text-accent"
      >
        <span>Donate</span>

        <Image
          src="/icons/heart.svg"
          alt=""
          width={48}
          height={48}
          className="shrink-0"
        />
      </Link>
    </div>
  )
}



export function HeaderClient(props: HeaderLayoutProps) {
  return (
    <header className="fixed z-50 text-white w-screen">
      <div className="lg:hidden">
        <MobileHeader {...props} />
      </div>

      <div className="hidden lg:block">
        <DesktopHeader {...props} />
      </div>
    </header>
  )
}