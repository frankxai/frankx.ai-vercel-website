'use client'

import { useEffect } from 'react'

import { trackEvent } from '@/lib/analytics'

const SESSION_KEY = 'frankx:community-guide:migration-trigger'
const ARTICLE_DOWNLOADS: Record<string, string> = {
  '/downloads/community-platform-vendor-due-diligence-checklist.csv': 'vendor_checklist',
  '/downloads/starlight-community-os-blueprint.md': 'control_plane_blueprint',
}

export default function CommunityGuideMeasurement() {
  useEffect(() => {
    const analysis = document.querySelector<HTMLElement>('#analysis')
    const registry = document.querySelector<HTMLElement>('#full-registry')
    const recordArticleDownload = (event: Event) => {
      const link =
        event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null
      const asset = link ? ARTICLE_DOWNLOADS[link.getAttribute('href') ?? ''] : null
      if (!asset) return

      trackEvent('community_guide_download', {
        asset,
        surface: 'article',
      })
    }
    const recordRegistrySource = (event: Event) => {
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[data-community-platform]')
          : null
      if (!link?.dataset.communityPlatform) return

      trackEvent('community_guide_source_opened', {
        platform: link.dataset.communityPlatform,
        surface: 'source_registry',
      })
    }
    analysis?.addEventListener('click', recordArticleDownload)
    registry?.addEventListener('click', recordRegistrySource)

    const target = Array.from(document.querySelectorAll<HTMLElement>('#analysis h2')).find((heading) =>
      heading.textContent?.trim().toLowerCase().startsWith('the migration trigger')
    )
    let alreadyRecorded = false

    try {
      alreadyRecorded = window.sessionStorage.getItem(SESSION_KEY) === 'seen'
    } catch {
      // Measurement still works when storage is unavailable.
    }

    let observer: IntersectionObserver | null = null
    if (target && !alreadyRecorded) {
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return

          trackEvent('community_guide_migration_trigger_reached', {
            guide: 'community_platform_for_creators',
          })
          try {
            window.sessionStorage.setItem(SESSION_KEY, 'seen')
          } catch {
            // A blocked storage write must not affect the reading experience.
          }
          observer?.disconnect()
        },
        { threshold: 0.35 }
      )
    }

    if (target && observer) observer.observe(target)
    return () => {
      analysis?.removeEventListener('click', recordArticleDownload)
      registry?.removeEventListener('click', recordRegistrySource)
      observer?.disconnect()
    }
  }, [])

  return null
}
