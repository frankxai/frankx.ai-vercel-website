import type { Partner } from './types'
import { arrow } from './arrow'
import { kyndryl } from './kyndryl'
import { nvidia } from './_placeholders/nvidia'
import { anthropic } from './_placeholders/anthropic'
import { vercel } from './_placeholders/vercel'
import { google } from './_placeholders/google'

/**
 * The full partner registry.
 *
 * Add a new partner: drop a config file in this directory, import + register
 * here. No layout code needs to change. See app/partnerships/README.md.
 */
const registry: Record<string, Partner> = {
  [arrow.slug]: arrow,
  [kyndryl.slug]: kyndryl,
  [nvidia.slug]: nvidia,
  [anthropic.slug]: anthropic,
  [vercel.slug]: vercel,
  [google.slug]: google,
}

export function getPartner(slug: string): Partner | undefined {
  return registry[slug]
}

export function listPartners(): Partner[] {
  return Object.values(registry)
}

export function listActivePartners(): Partner[] {
  return listPartners().filter((p) => p.status === 'active')
}

export function listOpenConversations(): Partner[] {
  return listPartners().filter(
    (p) => p.status === 'placeholder' || p.status === 'in-conversation'
  )
}

export function listStrategicAlignment(): Partner[] {
  return listPartners().filter((p) => p.status === 'strategic-alignment')
}
