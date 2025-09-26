export type Affiliate = {
  id: string;
  name: string;
  url: string;
  category: 'AI Tool' | 'Productivity' | 'Creative Tool' | 'Business Tool';
  commission: string;
  cookieDuration: string;
};

export type AffiliateLink = Affiliate & {
  trackingUrl: string;
};