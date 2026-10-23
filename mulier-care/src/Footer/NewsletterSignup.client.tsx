'use client'

import { useId, useState, type FormEvent } from 'react'
import { ArrowRight, Check, LoaderCircle } from 'lucide-react'

type Props = {
  formID: number
}

export function NewsletterSignup({ formID }: Props) {
  const inputID = useId()
  const errorID = `${inputID}-error`

  const [email, setEmail] = useState('')
  const [status, setStatus] =
    useState<'idle' | 'submitting' | 'success'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (status === 'submitting') return

    setError(null)
    setStatus('submitting')

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: formID,
          submissionData: [
            {
              field: 'email',
              value: email.trim(),
            },
          ],
        }),
      })

      if (!response.ok) {
        throw new Error('Signup failed')
      }

      setStatus('success')
      setEmail('')
    } catch {
      setStatus('idle')
      setError(
        'We couldn’t save your signup. Please try again in a moment.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 p-4"
      >
        <Check
          aria-hidden="true"
          className="mt-0.5 size-5 shrink-0 text-accent"
        />

        <p className="text-sm leading-relaxed text-white">
          Thank you! Your newsletter signup has been received.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Newsletter signup"
      aria-busy={status === 'submitting'}
    >
      <label htmlFor={inputID} className="sr-only">
        Email address
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={inputID}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          maxLength={254}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorID : undefined}
          className="
            min-h-12 w-full min-w-0 flex-1 rounded-xl
            border border-white/20 bg-white px-4 py-3
            text-base text-slate-900 placeholder:text-slate-500
            outline-none
            focus-visible:ring-4 focus-visible:ring-accent/50
          "
        />

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="
            inline-flex min-h-12 shrink-0 items-center
            justify-center gap-2 rounded-xl bg-accent
            px-5 py-3 text-sm font-semibold text-slate-950
            transition-colors hover:bg-accent/90
            focus-visible:outline-2 focus-visible:outline-offset-4
            focus-visible:outline-white
            disabled:cursor-wait disabled:opacity-70
            motion-reduce:transition-none
          "
        >
          {status === 'submitting' ? (
            <>
              <LoaderCircle
                aria-hidden="true"
                className="size-4 animate-spin motion-reduce:animate-none"
              />
              Saving…
            </>
          ) : (
            <>
              Subscribe
              <ArrowRight aria-hidden="true" className="size-4" />
            </>
          )}
        </button>
      </div>

      {error && (
        <p
          id={errorID}
          role="alert"
          className="mt-3 text-sm leading-relaxed text-white"
        >
          {error}
        </p>
      )}
    </form>
  )
}