'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import type { Form } from '@/payload-types'
import { FormBlock } from '@/blocks/Form/Component'
import { getClientSideURL } from '@/utilities/getURL'

type Props = {
  initialForm: Form
}

export function FormPreview({ initialForm }: Props) {
  const { data } = useLivePreview<Form>({
    initialData: initialForm,
    serverURL: getClientSideURL(),
    depth: 1,
  })

  return (
    <>
      <div className="mb-8">
        <p className="mb-3 font-body text-sm font-medium text-primary">
          Form preview — submissions disabled
        </p>

        <h1 className="font-heading text-4xl text-primary">
          {data.title || 'Untitled form'}
        </h1>
      </div>

      <FormBlock
        key={JSON.stringify(data.fields ?? [])}
        enableIntro={false}
        form={data}
        previewOnly
      />
    </>
  )
}