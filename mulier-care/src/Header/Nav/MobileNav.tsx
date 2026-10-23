import type { Header } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { NavDropdown } from './NavDropdown'

type MobileNavProps = {
  items: NonNullable<Header['navItems']>
}

export function MobileNav({items}: MobileNavProps){


    return <nav></nav>
}