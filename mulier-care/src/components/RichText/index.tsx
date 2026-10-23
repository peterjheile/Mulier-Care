import React from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import {
  RichText as ConvertRichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'

import { cn } from '@/utilities/ui'

type Props = {
  data: DefaultTypedEditorState
  className?: string
  variant?: 'body' | 'heroTitle'
}

const bodyConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,

  text: (args) => {
    // Preserve Payload's standard text formatting.
    const text =
      typeof defaultConverters.text === 'function'
        ? defaultConverters.text(args)
        : args.node.text

    // TextStateFeature saves custom state under "$".
    const state = (
      args.node as typeof args.node & {
        $?: {
          heroStyle?: string
        }
      }
    ).$

    if (state?.heroStyle === 'accent') {
      return <span className="text-accent italic">{text}</span>
    }

    return text
  },
})

const heroTitleConverters: JSXConvertersFunction = (args) => ({
  // Reuse the defaults and Accent handling above.
  ...bodyConverters(args),

  // Render each paragraph as a line inside the h1.
  paragraph: ({ node, nodesToJSX }) => (
    <span className="block">
      {nodesToJSX({ nodes: node.children })}
    </span>
  ),
})

export default function RichText({
  data,
  className,
  variant = 'body',
}: Props) {
  if (variant === 'heroTitle') {
    return (
      <h1 className={className}>
        <ConvertRichText
          data={data}
          converters={heroTitleConverters}
          disableContainer
        />
      </h1>
    )
  }

  return (
    <ConvertRichText
      data={data}
      converters={bodyConverters}
      className={cn('payload-richtext', className)}
    />
  )
}