'use client'

import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { Form as FormType } from '@/payload-types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { getClientSideURL } from '@/utilities/getURL'

import { fields } from './fields'

type FormValues = Record<string, string | boolean>

export type RenderableForm = Pick<
  FormType,
  | 'id'
  | 'title'
  | 'fields'
  | 'submitButtonLabel'
  | 'confirmationType'
  | 'confirmationMessage'
  | 'redirect'
>

export type FormBlockType = {
  blockName?: string | null
  blockType?: 'formBlock'
  enableIntro?: boolean | null
  form?: RenderableForm | number | null
  introContent?: DefaultTypedEditorState | null
}

type Props = FormBlockType & {
  id?: string
  previewOnly?: boolean
  jobID?: number
}

type FormRendererProps = Omit<Props, 'form'> & {
  form: RenderableForm
}

// Handle empty or unpopulated relationships before mounting any form hooks.
export function FormBlock({ form, ...props }: Props) {
  if (!form || typeof form !== 'object') {
    return null
  }

  return (
    <FormRenderer
      key={`${form.id}-${props.jobID ?? 'general'}`}
      {...props}
      form={form}
    />
  )
}

const FormRenderer: React.FC<FormRendererProps> = ({
  enableIntro,
  form: formFromProps,
  introContent,
  previewOnly = false,
  jobID,
}) => {
  const {
    id: formID,
    confirmationMessage,
    confirmationType,
    redirect,
    submitButtonLabel,
  } = formFromProps

  const formFields = formFromProps.fields ?? []
  const htmlFormID = `payload-form-${formID}`

  const defaultValues: FormValues = {}

  for (const field of formFields) {
    if (
      'name' in field &&
      typeof field.name === 'string' &&
      field.name.trim() !== ''
    ) {
      const defaultValue =
        'defaultValue' in field ? field.defaultValue : undefined

      defaultValues[field.name] =
        field.blockType === 'checkbox'
          ? Boolean(defaultValue ?? false)
          : String(defaultValue ?? '')
    }
  }

  const formMethods = useForm<FormValues>({
    defaultValues,
  })

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = formMethods

  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const onSubmit = useCallback(
    async (data: FormValues) => {
      if (previewOnly) return

      setError(null)

      const submissionData = Object.entries(data).map(([name, value]) => ({
        field: name,
        value: String(value),
      }))

      try {
        const response = await fetch(
          `${getClientSideURL()}/api/form-submissions`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              form: formID,
              submissionData,
              ...(jobID != null ? { job: jobID } : {}),
            }),
          },
        )

        if (!response.ok) {
          const result = await response.json().catch(() => null)

          setError(
            result?.errors?.[0]?.message ||
              'Unable to submit the form. Please try again.',
          )

          return
        }

        setHasSubmitted(true)

        if (confirmationType === 'redirect' && redirect?.url) {
          router.push(redirect.url)
        }
      } catch {
        setError(
          'Something went wrong. Please check your connection and try again.',
        )
      }
    },
    [previewOnly, formID, confirmationType, redirect, router, jobID],
  )

  return (
    <div className="cms-form mx-auto w-full max-w-3xl">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText
          className="cms-form-richtext mb-8 lg:mb-10"
          data={introContent}
        />
      )}

      <div className="cms-form-card">
        <FormProvider {...formMethods}>
          {hasSubmitted && (
            <div
              role="status"
              className="rounded-2xl border border-primary/10 bg-primary/5 p-6"
            >
              {confirmationType === 'message' && confirmationMessage ? (
                <RichText
                  className="cms-form-richtext"
                  data={confirmationMessage}
                />
              ) : (
                <>
                  <h3 className="font-heading text-3xl text-primary">
                    Thank you.
                  </h3>

                  <p className="mt-3 leading-relaxed text-slate-600">
                    Your form has been submitted successfully.
                  </p>
                </>
              )}
            </div>
          )}

          {error && (
            <p
              role="alert"
              className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-800"
            >
              {error}
            </p>
          )}

          {!hasSubmitted && (
            <form
              id={htmlFormID}
              onSubmit={
                previewOnly
                  ? (event) => event.preventDefault()
                  : handleSubmit(onSubmit)
              }
              aria-busy={isSubmitting}
            >
              <p className="mb-7 text-sm text-slate-500">
                Fields marked <span className="text-primary">*</span> are
                required.
              </p>

              <div className="-mx-3 flex flex-wrap gap-y-6">
                {previewOnly && formFields.length === 0 && (
                  <div className="w-full px-3">
                    <p className="rounded-xl border border-dashed border-primary/25 bg-primary/5 p-5 text-sm text-primary">
                      Add a field in the editor to start building your form.
                    </p>
                  </div>
                )}

                {formFields.map((field, index) => {
                  const fieldKey = field.id ?? index

                  const isIncomplete =
                    field.blockType !== 'message' &&
                    (!('name' in field) ||
                      typeof field.name !== 'string' ||
                      field.name.trim() === '')

                  if (isIncomplete) {
                    return previewOnly ? (
                      <div key={fieldKey} className="w-full px-3">
                        <p className="rounded-xl border border-dashed border-primary/25 bg-primary/5 p-5 text-sm text-primary">
                          Enter a field name to preview this input.
                        </p>
                      </div>
                    ) : null
                  }

                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const Field: React.FC<any> | undefined =
                    fields[field.blockType as keyof typeof fields]

                  if (!Field) {
                    return previewOnly ? (
                      <p
                        key={fieldKey}
                        className="w-full px-3 text-sm text-primary"
                      >
                        No renderer is configured for “{field.blockType}”.
                      </p>
                    ) : null
                  }

                  const configuredWidth =
                    'width' in field ? Number(field.width) : 100

                  const width =
                    Number.isFinite(configuredWidth) && configuredWidth > 0
                      ? Math.min(configuredWidth, 100)
                      : 100

                  return (
                    <div
                      key={fieldKey}
                      className="w-full min-w-0 px-3 md:w-[var(--field-width)]"
                      style={
                        {
                          '--field-width': `${width}%`,
                        } as React.CSSProperties
                      }
                    >
                      <Field
                        form={formFromProps}
                        {...field}
                        {...formMethods}
                        control={control}
                        errors={errors}
                        register={register}
                      />
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 border-t border-primary/10 pt-6">
                <Button
                  form={htmlFormID}
                  type="submit"
                  variant="default"
                  disabled={previewOnly || isSubmitting}
                  className="
                    min-h-12 w-full px-8 sm:w-auto
                    focus-visible:outline-primary
                    disabled:pointer-events-none disabled:opacity-50
                  "
                >
                  {isSubmitting
                    ? 'Submitting…'
                    : submitButtonLabel || 'Submit'}
                </Button>
              </div>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}