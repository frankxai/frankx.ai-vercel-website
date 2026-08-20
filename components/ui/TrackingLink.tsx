'use client'

import Link, { LinkProps } from 'next/link'
import { trackEvent } from '@/lib/analytics'
import React, { AnchorHTMLAttributes } from 'react'

export interface TrackingLinkProps extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> {
  eventName?: string
  eventParams?: Record<string, any>
}

export function TrackingLink({
  href,
  eventName = 'funnel_cta_clicked',
  eventParams = {},
  onClick,
  children,
  ...props
}: TrackingLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent(eventName, {
      destination: href.toString(),
      ...eventParams,
    })

    if (onClick) {
      onClick(e)
    }
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
