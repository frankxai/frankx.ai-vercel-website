'use client'

import React from 'react'
import { trackAffiliateClick } from '@/lib/affiliates/tracking'
import { getAffiliateDestination } from '@/lib/affiliates/link-builder'

interface AffiliateLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  affiliateId: string
  trackingId: string
  children: React.ReactNode
  'data-context'?: string
}

const AffiliateLink: React.FC<AffiliateLinkProps> = ({ affiliateId, trackingId, children, onClick, rel, ...props }) => {
  const destination = getAffiliateDestination(affiliateId)
  if (!destination) return <span>{children}</span>
  const relations = new Set((rel ?? '').split(/\s+/).filter(Boolean))
  relations.add('noopener')
  if (destination.sponsored) relations.add('sponsored')

  return (
    <a {...props} href={destination.href} rel={[...relations].join(' ')}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && destination.sponsored) {
          try {
            trackAffiliateClick(affiliateId, trackingId, {
              page: window.location.pathname,
              context: props['data-context'],
            })
          } catch { /* Analytics must never prevent normal navigation. */ }
        }
      }}>
      {children}
    </a>
  )
}

export default AffiliateLink
