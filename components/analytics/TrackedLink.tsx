'use client'

import type { ComponentProps } from 'react'
import Link from 'next/link'

import { trackEvent } from '@/lib/analytics'

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName: string
  eventProperties?: Record<string, string | number | boolean | undefined>
}

export function TrackedLink({
  eventName,
  eventProperties,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventProperties)
        onClick?.(event)
      }}
    />
  )
}
