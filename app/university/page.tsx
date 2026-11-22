import { redirect } from 'next/navigation'

/**
 * Compatibility entrypoint for the university collaboration experience.
 * The richer University Commons is being reviewed separately in PR #1274.
 * Avoid advertising a 404 while that release remains gated.
 */
export default function UniversityLandingPage() {
  redirect('/partnerships/universities')
}
