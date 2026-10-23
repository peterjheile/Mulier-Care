'use client'

import { useFormContext } from 'react-hook-form'

export function Error({ name }: { name: string }) {
  const { getFieldState, formState } = useFormContext()
  const { error } = getFieldState(name, formState)

  if (!error) return null

  return (
    <p
      id={`${name}-error`}
      role="alert"
      className="cms-form-error mt-2 text-sm leading-relaxed text-red-700"
    >
      {error.message || 'Please complete this field.'}
    </p>
  )
}