'use client'

import type { ComponentProps } from 'react'

import { GlowButton } from '@/components/ui/GlowButton'
import { trackEvent } from '@/lib/analytics'

type TrackedGlowButtonProps = ComponentProps<typeof GlowButton> & {
  eventName: string
  eventProperties?: Record<string, string | number | boolean | undefined>
}

export function TrackedGlowButton({
  eventName,
  eventProperties,
  onClick,
  ...props
}: TrackedGlowButtonProps) {
  return (
    <GlowButton
      {...props}
      onClick={() => {
        trackEvent(eventName, eventProperties)
        onClick?.()
      }}
    />
  )
}
