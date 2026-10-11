/** Explicit preview classification; a production deployment always wins. */
export function canReviewDossiers(environment) {
  if (environment.VERCEL_ENV) return environment.VERCEL_ENV === 'preview'
  return environment.NODE_ENV === 'development'
}
