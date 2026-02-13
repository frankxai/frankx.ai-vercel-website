import { Affiliate, AffiliateLink } from '@/types/affiliates';

const affiliates: Affiliate[] = [
  // AI Tools
  {
    id: 'claude',
    name: 'Claude',
    url: 'https://www.anthropic.com/claude',
    category: 'AI Tool',
    commission: '10%',
    cookieDuration: '30 days',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    url: 'https://openai.com/chatgpt',
    category: 'AI Tool',
    commission: '20%',
    cookieDuration: '60 days',
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    url: 'https://www.midjourney.com',
    category: 'AI Tool',
    commission: '15%',
    cookieDuration: '45 days',
  },
  {
    id: 'suno',
    name: 'Suno',
    url: 'https://suno.com/',
    category: 'AI Tool',
    commission: '25%',
    cookieDuration: '90 days',
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    url: 'https://stability.ai/',
    category: 'AI Tool',
    commission: '10%',
    cookieDuration: '30 days',
  },
  // Productivity Tools
  {
    id: 'notion',
    name: 'Notion',
    url: 'https://www.notion.so',
    category: 'Productivity',
    commission: '50%',
    cookieDuration: '90 days',
  },
  {
    id: 'airtable',
    name: 'Airtable',
    url: 'https://www.airtable.com',
    category: 'Productivity',
    commission: '20%',
    cookieDuration: '30 days',
  },
  {
    id: 'zapier',
    name: 'Zapier',
    url: 'https://zapier.com',
    category: 'Productivity',
    commission: '30%',
    cookieDuration: '45 days',
  },
  {
    id: 'make',
    name: 'Make.com',
    url: 'https://www.make.com',
    category: 'Productivity',
    commission: '25%',
    cookieDuration: '60 days',
  },
  // Creative Tools
  {
    id: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com',
    category: 'Creative Tool',
    commission: '15%',
    cookieDuration: '30 days',
  },
  {
    id: 'adobe-suite',
    name: 'Adobe Creative Suite',
    url: 'https://www.adobe.com/creativecloud.html',
    category: 'Creative Tool',
    commission: '85% of first month',
    cookieDuration: '30 days',
  },
  {
    id: 'canva-pro',
    name: 'Canva Pro',
    url: 'https://www.canva.com/pro/',
    category: 'Creative Tool',
    commission: 'Up to $36 per new subscriber',
    cookieDuration: '30 days',
  },
  {
    id: 'descript',
    name: 'Descript',
    url: 'https://www.descript.com',
    category: 'Creative Tool',
    commission: '15%',
    cookieDuration: '30 days',
  },
  // Business Tools
  {
    id: 'stripe',
    name: 'Stripe',
    url: 'https://stripe.com',
    category: 'Business Tool',
    commission: 'N/A',
    cookieDuration: 'N/A',
  },
  {
    id: 'gumroad',
    name: 'Gumroad',
    url: 'https://gumroad.com',
    category: 'Business Tool',
    commission: '10%',
    cookieDuration: '30 days',
  },
  {
    id: 'teachable',
    name: 'Teachable',
    url: 'https://teachable.com',
    category: 'Business Tool',
    commission: '30-50%',
    cookieDuration: '90 days',
  },
  {
    id: 'convertkit',
    name: 'ConvertKit',
    url: 'https://convertkit.com',
    category: 'Business Tool',
    commission: '30%',
    cookieDuration: '60 days',
  },
];

export const getAffiliate = (id: string): Affiliate | undefined => {
  return affiliates.find((affiliate) => affiliate.id === id);
};

export const getAllAffiliates = (): Affiliate[] => {
  return affiliates;
};

export const getAffiliateLink = (affiliateId: string, trackingId?: string): AffiliateLink | undefined => {
  const affiliate = getAffiliate(affiliateId);
  if (!affiliate) {
    return undefined;
  }

  const url = new URL(affiliate.url);
  if (trackingId) {
    url.searchParams.set('ref', trackingId);
  }

  return {
    ...affiliate,
    trackingUrl: url.toString(),
  };
};