import type { Header } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { NavDropdown } from './NavDropdown'

type DesktopNavProps = {
  items: NonNullable<Header['navItems']>
}

export function DesktopNav({ items }: DesktopNavProps) {
  return (
    <nav aria-label="Main navigation" className = "font-body text-md font-semibold">
      <ul className="m-0 flex list-none items-center gap-2 p-0 xl:gap-4">
        {items.map((item, index) => {
          const key = item.id ?? index

          if (item.type === 'group') {
            if (!item.label || !item.links?.length) return null

            return (
              <li key={key}>
                <NavDropdown
                  label={item.label}
                  links={item.links}
                />
              </li>
            )
          }

          if (!item.link) return null

          return (
            <li key={key}>
              <CMSLink
                {...item.link}
                className="
                  inline-flex min-h-11 items-center
                  rounded-md px-3 py-2
                  text-current
                  transition-colors hover:text-accent
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-current
                "
              />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}