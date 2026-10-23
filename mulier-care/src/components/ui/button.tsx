'use client'

import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
  `
    inline-flex min-h-12 w-fit items-center justify-center
    rounded-full px-4 py-2
    text-center text-sm font-medium text-accent
    transition-colors
    focus-visible:outline-2 focus-visible:outline-offset-4
    focus-visible:outline-white
    motion-reduce:transition-none
  `,
  {
    variants: {
      variant: {
        default: 'bg-primary hover:bg-primary/80',
        outline: 'bg-transparent border-4 border-primary hover:bg-primary/30',
      },
      size: {
        default: '',
        lg: "h-10 w-70 lg:h-15 lg:w-100",
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button: React.FC<ButtonProps> = ({ asChild = false, className, size, variant, ...props }) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
