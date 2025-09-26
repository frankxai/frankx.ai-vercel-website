import { getAffiliate } from './affiliate-manager';

interface AffiliateLinkOptions {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export const buildAffiliateLink = (
  affiliateId: string,
  trackingId: string,
  options: AffiliateLinkOptions = {}
): string | undefined => {
  const affiliate = getAffiliate(affiliateId);
  if (!affiliate) {
    return undefined;
  }

  const url = new URL(affiliate.url);
  url.searchParams.set('ref', trackingId);

  // Add UTM parameters if they exist
  for (const [key, value] of Object.entries(options)) {
    if (value) {
      url.searchParams.set(key, value);
    }
  }

  return url.toString();
};