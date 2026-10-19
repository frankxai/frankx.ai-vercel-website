/** Explicit preview/development classification; a production deployment always wins. */
export function canReviewDossiers(environment) {
  if (environment.VERCEL_ENV) {
    return environment.VERCEL_ENV === 'preview' || environment.VERCEL_ENV === 'development'
  }
  return environment.NODE_ENV === 'development'
}
