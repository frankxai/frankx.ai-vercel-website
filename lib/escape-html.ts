/**
 * Escape a value for interpolation into an HTML email body.
 *
 * Intake routes render operator notifications as HTML and interpolate
 * applicant-supplied fields into them. Those fields arrive from unauthenticated
 * public forms, so anything placed into markup — or into an href — must be
 * escaped first. Mail clients strip <script>, but unescaped input still allows
 * an attacker to inject styled markup or a second call-to-action link into a
 * message the operator reads and acts on.
 *
 * Matches the local helper in app/api/expert-authority/lead/route.ts, which
 * predates this module. That route and app/api/studio-inquiry keep their own
 * copies; they are already correct and are left alone.
 */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}
