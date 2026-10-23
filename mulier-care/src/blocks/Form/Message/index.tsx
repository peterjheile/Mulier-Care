import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import RichText from '@/components/RichText'
import { Width } from '../Width'

type Props = {
  message?: DefaultTypedEditorState | null
}

export function Message({ message }: Props) {
  if (!message?.root) return null

  return (
    <Width>
      <RichText
        data={message}
        className="cms-form-richtext"
      />
    </Width>
  )
}