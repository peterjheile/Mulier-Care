'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

import type { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

type NavItem = NonNullable<Header['navItems']>[number]

type NavDropdownProps = {
  label: string
  links: NonNullable<NavItem['links']>
  className?: string
}

export function NavDropdown({
  label,
  links,
  className,
}: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const dropdownId = useId()

  // Close when someone clicks outside this dropdown.
  useEffect(() => {
    if (!isOpen) return

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isOpen])

  if (links.length === 0) return null

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && isOpen) {
          event.preventDefault()
          event.stopPropagation()

          setIsOpen(false)
          triggerRef.current?.focus()
        }
      }}
      onBlur={(event) => {
        // Keep it open while focus moves between its own elements.
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false)
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
        onClick={() => setIsOpen((previous) => !previous)}
        className="
          inline-flex min-h-11 items-center gap-2
          rounded-md px-3 py-2
          text-current
          transition-colors hover:text-accent
          focus-visible:outline-2
          focus-visible:outline-offset-4
          focus-visible:outline-current
        "
      >
        {label}

        <ChevronDown
          aria-hidden="true"
          className={cn(
            'size-4 transition-transform motion-reduce:transition-none',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      <ul
        id={dropdownId}
        hidden={!isOpen}
        className="
          absolute top-full left-0 z-50 mt-2
          m-0 w-64 list-none rounded-xl
          border border-primary/10 bg-white p-2
          text-slate-900 shadow-lg
        "
        onClick={(event) => {
          // Handles link activation by either pointer or keyboard.
          if (
            event.target instanceof Element &&
            event.target.closest('a')
          ) {
            setIsOpen(false)
            triggerRef.current?.focus()
          }
        }}
      >
        {links.map(({ id, link }, index) => (
          <li key={id ?? index}>
            <CMSLink
              {...link}
              className="
                block rounded-lg px-4 py-3
                font-body text-sm leading-relaxed
                transition-colors
                hover:bg-primary/5 hover:text-primary
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-primary
              "
            />
          </li>
        ))}
      </ul>
    </div>
  )
}