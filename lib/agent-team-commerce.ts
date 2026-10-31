/** This SKU reuses the existing Lemon Squeezy checkout surface and native files.
 * Only a reviewed source change can open sales. Env vars and request input cannot.
 * Evidence references identify receipts; this function does not verify their truth.
 */
export type AgentTeamRelease = {
  status: string
  merchant: string
  checkoutUrl: string | null
  packageSha256: string | null
  evidence: {
    hostCompatibility: string | null
    fiveUserAcceptance: string | null
    setupVideo: string | null
    sellerTaxAndTerms: string | null
    checkoutReceiptAndDownload: string | null
    failedPaymentAndRefund: string | null
    independentReview: string | null
    ownerReleaseApproval: string | null
  }
}

const requiredEvidence: (keyof AgentTeamRelease['evidence'])[] = [
  'hostCompatibility', 'fiveUserAcceptance', 'setupVideo', 'sellerTaxAndTerms',
  'checkoutReceiptAndDownload', 'failedPaymentAndRefund', 'independentReview', 'ownerReleaseApproval',
]

export function getAgentTeamCheckoutUrl(release: AgentTeamRelease): string | null {
  if (release.status !== 'purchasable' || release.merchant !== 'lemon-squeezy') return null
  if (!release.packageSha256 || !/^[a-f0-9]{64}$/.test(release.packageSha256)) return null
  if (!requiredEvidence.every(key => typeof release.evidence?.[key] === 'string' && release.evidence[key]!.trim().length > 0)) return null
  if (!release.checkoutUrl) return null
  try {
    const url = new URL(release.checkoutUrl)
    // Use the exact URL copied from the merchant's share panel, not a numeric variant ID.
    if (url.protocol !== 'https:' || url.username || url.password || url.port || url.search || url.hash) return null
    if (!/^[a-z0-9-]+\.lemonsqueezy\.com$/.test(url.hostname)) return null
    if (!/^\/checkout\/buy\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(url.pathname)) return null
    return url.toString()
  } catch {
    return null
  }
}
