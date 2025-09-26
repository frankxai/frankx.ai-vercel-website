import { NextApiRequest, NextApiResponse } from 'next';

// This is a mock tracking service. In a real-world application,
// this would integrate with a real analytics service.
const trackingDatabase: any[] = [];

export const trackAffiliateClick = (
  affiliateId: string,
  trackingId: string,
  metadata: any = {}
) => {
  const timestamp = new Date().toISOString();
  const clickData = {
    affiliateId,
    trackingId,
    timestamp,
    ...metadata,
  };

  // In a real application, you would send this data to your analytics platform
  console.log('Affiliate click tracked:', clickData);
  trackingDatabase.push(clickData);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { affiliateId, trackingId, ...metadata } = req.body;
    if (affiliateId && trackingId) {
      trackAffiliateClick(affiliateId, trackingId, metadata);
      res.status(200).json({ message: 'Click tracked successfully' });
    } else {
      res.status(400).json({ message: 'Missing required parameters' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}