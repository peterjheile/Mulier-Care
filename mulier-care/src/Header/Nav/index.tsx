import type { Header } from '@/payload-types'

import { DesktopNav } from './DesktopNav'
import { MobileNav } from './MobileNav'

type HeaderNavProps = {
  data: Header
}

export function HeaderNav({ data }: HeaderNavProps) {
  const navItems = data.navItems ?? []

  return (
    <>
      <div className="hidden lg:block">
        <DesktopNav items={navItems} />
      </div>

      <div className="lg:hidden">
        <MobileNav items={navItems} />
      </div>
    </>
  )
}