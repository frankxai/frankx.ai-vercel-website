/** Server-only deployment decision; browser input cannot open the publication gate. */
interface AtlasEnvironment {
  VERCEL_ENV?: string
  NODE_ENV?: string
  CI?: string
  ECONOMY_ATLAS_QA?: string
  ECONOMY_ATLAS_RELEASED?: string
}

export function economyAtlasAvailable(env: AtlasEnvironment): boolean {
  if (env.VERCEL_ENV === 'preview') return true
  if (env.VERCEL_ENV === 'production') return env.ECONOMY_ATLAS_RELEASED === 'true'
  if (env.VERCEL_ENV) return false
  return env.NODE_ENV === 'development' || (env.CI === 'true' && env.ECONOMY_ATLAS_QA === 'true')
}
