/** Only approved, public campaign codes may enter payment-provider metadata. */
export function acosCampaign(value: unknown) {
  if (!value || typeof value !== 'object') return null
  const { utm_source, utm_medium, utm_campaign } = value as Record<
    string,
    unknown
  >
  if (utm_campaign !== '2026-11-acos-fieldnote') return null
  if (
    (utm_source === 'linkedin' && utm_medium === 'social') ||
    (utm_source === 'newsletter' && utm_medium === 'email')
  ) {
    return { utm_source, utm_medium, utm_campaign }
  }
  return null
}
