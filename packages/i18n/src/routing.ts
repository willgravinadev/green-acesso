import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

import { i18n } from './config'

export const routing = defineRouting({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: true,
  localeCookie: {
    secure: true,
    sameSite: 'strict'
  }
})

export const { usePathname, useRouter, redirect, Link } = createNavigation(routing)
