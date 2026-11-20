'use client'

import type { ReactNode } from 'react'
import { trackPrivacySafeAnalyticsEvent } from '@/lib/privacy-safe-analytics-client'

type Props = {
  href: string
  children: ReactNode
  className?: string
  event: 'commons_resource_open' | 'commons_inquiry_open'
  id: string
}

export default function CommonsLink({ href, children, className, event, id }: Props) {
  return <a href={href} className={className} onClick={() => trackPrivacySafeAnalyticsEvent(event, { item_id: id })}>{children}</a>
}
