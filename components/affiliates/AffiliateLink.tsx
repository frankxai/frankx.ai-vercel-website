'use client'

import React from 'react'
import { trackAffiliateClick } from '@/lib/affiliates/tracking'
import { buildAffiliateLink } from '@/lib/affiliates/link-builder'

interface AffiliateLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  affiliateId: string
  trackingId: string
  children: React.ReactNode
}

const AffiliateLink: React.FC<AffiliateLinkProps> = ({ affiliateId, trackingId, children, ...props }) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    trackAffiliateClick(affiliateId, trackingId, {
      page: window.location.pathname,
      context: props['data-context'],
    })

    const affiliateUrl = buildAffiliateLink(affiliateId, trackingId, {
      utm_source: 'frankx.ai',
      utm_medium: 'affiliate',
      utm_campaign: trackingId,
    })

    props.onClick?.(event)

    if (affiliateUrl) {
      window.open(affiliateUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  )
}

export default AffiliateLink
