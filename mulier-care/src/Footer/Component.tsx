import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Info, Mail, Phone } from 'lucide-react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { NewsletterSignup } from './NewsletterSignup.client'

function pageHref(page: Page | number | null | undefined) {
  if (!page || typeof page !== 'object' || !page.slug) {
    return null
  }

  return page.slug === 'home' ? '/' : `/${page.slug}`
}

const platformLabels = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  x: 'X',
  other: 'Website',
}

const linkClasses =
  'rounded-sm transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none'

export async function Footer() {
  const [footer, settings] = await Promise.all([
    getCachedGlobal('footer', 1)(),
    getCachedGlobal('site-settings', 1)(),
  ])

  const siteName = settings.siteName || 'Mulier Care'

  const logo =
    settings.logo && typeof settings.logo === 'object'
      ? settings.logo
      : null

  const newsletterForm = footer.newsletter?.form
  const newsletterFormID =
    typeof newsletterForm === 'object'
      ? newsletterForm?.id
      : newsletterForm

  const contactHref = pageHref(footer.contactPage)
  const privacyHref = pageHref(footer.privacyPage)
  const termsHref = pageHref(footer.termsPage)

  const navItems = footer.navItems ?? []
  const socialLinks = settings.socialLinks ?? []

  const phoneHref = settings.contactPhone
    ? `tel:${settings.contactPhone.replace(/[^\d+]/g, '')}`
    : null

  const year = new Date().getFullYear()

  return (
    <footer className="relative isolate mt-auto overflow-hidden bg-primary font-body text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.12),transparent_60%),linear-gradient(to_bottom,transparent,rgba(0,0,0,0.18))]"
      />

      <div className="mx-auto w-full max-w-7xl px-6 pt-14 pb-6 lg:px-12 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1fr_0.85fr_1.25fr] lg:gap-10">
          {/* Brand and social links */}
          <div className="min-w-0">
            <Link
              href="/"
              className={`inline-flex max-w-full items-center gap-3 ${linkClasses}`}
            >
              {logo?.url && (
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white p-2">
                  <Image
                    src={logo.url}
                    alt=""
                    width={48}
                    height={48}
                    sizes="48px"
                    unoptimized={logo.mimeType === 'image/svg+xml'}
                    className="size-full object-contain"
                  />
                </span>
              )}

              <span className="font-heading text-3xl leading-tight font-semibold">
                {siteName}
              </span>
            </Link>

            {footer.description && (
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/80">
                {footer.description}
              </p>
            )}

            {socialLinks.length > 0 && (
              <nav aria-label="Social media" className="mt-7">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                  Follow along
                </p>

                <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                  {socialLinks.map((social) => (
                    <li key={social.id ?? social.url}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${social.label} (opens in a new tab)`}
                        className="
                          inline-flex min-h-11 items-center gap-1.5
                          rounded-full border border-white/20
                          bg-white/5 px-3 text-xs font-medium
                          transition-colors hover:border-white/40
                          hover:bg-white/10
                          focus-visible:outline-2
                          focus-visible:outline-offset-4
                          focus-visible:outline-accent
                          motion-reduce:transition-none
                        "
                      >
                        {social.platform === 'other'
                          ? social.label
                          : platformLabels[social.platform]}

                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-3.5"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

          {/* Page navigation */}
          <nav aria-label="Footer navigation">
            <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              Explore
            </h2>

            <ul className="m-0 grid list-none grid-cols-2 gap-x-5 gap-y-1 p-0">
              {navItems.map(({ id, link }, index) => (
                <li key={id ?? index} className="min-w-0">
                  <CMSLink
                    {...link}
                    className={`inline-flex min-h-11 items-center py-2 text-sm font-medium ${linkClasses}`}
                  />
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter and contact details */}
          <div className="min-w-0 md:col-span-2 lg:col-span-1">
            {newsletterFormID != null && (
              <div>
                <div className="flex items-start gap-3">
                  <h2 className="font-heading text-3xl leading-tight">
                    {footer.newsletter?.title || 'Stay connected.'}
                  </h2>

                  {footer.newsletter?.information && (
                    <details className="group relative shrink-0">
                      <summary
                        aria-label="About newsletter signup"
                        className="
                          flex size-9 cursor-pointer list-none
                          items-center justify-center rounded-full
                          text-white/75 hover:bg-white/10 hover:text-white
                          focus-visible:outline-2
                          focus-visible:outline-accent
                          [&::-webkit-details-marker]:hidden
                        "
                      >
                        <Info aria-hidden="true" className="size-4" />
                      </summary>

                      <div className="absolute right-0 top-11 z-20 w-60 rounded-2xl border border-white/15 bg-white p-4 text-sm leading-relaxed text-slate-700 shadow-xl">
                        {footer.newsletter.information}
                      </div>
                    </details>
                  )}
                </div>

                {footer.newsletter?.description && (
                  <p className="mt-3 mb-5 max-w-lg text-sm leading-relaxed text-white/80">
                    {footer.newsletter.description}
                  </p>
                )}

                <div className="mt-5">
                  <NewsletterSignup formID={newsletterFormID} />
                </div>

                {privacyHref && (
                  <p className="mt-3 text-xs leading-relaxed text-white/70">
                    Read our{' '}
                    <Link
                      href={privacyHref}
                      className={`underline underline-offset-4 ${linkClasses}`}
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                )}
              </div>
            )}

            {(settings.contactEmail ||
              settings.contactPhone ||
              contactHref) && (
              <div
                className={
                  newsletterFormID != null
                    ? 'mt-8 border-t border-white/15 pt-6'
                    : ''
                }
              >
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                  Contact us
                </h2>

                <address className="space-y-1 text-sm not-italic">
                  {settings.contactEmail && (
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className={`flex min-h-11 w-fit items-center gap-3 ${linkClasses}`}
                    >
                      <Mail
                        aria-hidden="true"
                        className="size-4 shrink-0 text-white/60"
                      />
                      <span className="break-all">
                        {settings.contactEmail}
                      </span>
                    </a>
                  )}

                  {settings.contactPhone && phoneHref && (
                    <a
                      href={phoneHref}
                      className={`flex min-h-11 w-fit items-center gap-3 ${linkClasses}`}
                    >
                      <Phone
                        aria-hidden="true"
                        className="size-4 shrink-0 text-white/60"
                      />
                      {settings.contactPhone}
                    </a>
                  )}
                </address>

                {contactHref && (
                  <Link
                    href={contactHref}
                    className={`mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold ${linkClasses}`}
                  >
                    Get in touch
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4"
                    />
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Copyright and legal links */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/20 pt-6 text-center text-xs text-white/70 lg:mt-16 sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {year} {siteName}. All rights reserved.
          </p>

          <nav aria-label="Legal">
            <ul className="m-0 flex list-none flex-wrap justify-center gap-x-6 p-0">
              {privacyHref && (
                <li>
                  <Link
                    href={privacyHref}
                    className={`inline-flex min-h-11 items-center ${linkClasses}`}
                  >
                    Privacy Policy
                  </Link>
                </li>
              )}

              {termsHref && (
                <li>
                  <Link
                    href={termsHref}
                    className={`inline-flex min-h-11 items-center ${linkClasses}`}
                  >
                    Terms of Service
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}