'use client'

import type { ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'

import { trackEvent } from '@/lib/analytics'

type TrackedCanvaLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  placement: string
  destination: string
}

export function TrackedCanvaLink({
  placement,
  destination,
  onClick,
  ...props
}: TrackedCanvaLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent('canva_founder_link_opened', {
          placement,
          destination,
        })
        onClick?.(event)
      }}
    />
  )
}
