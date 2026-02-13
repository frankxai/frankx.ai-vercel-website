import React from 'react';
import { Affiliate } from '@/types/affiliates';
import Image from 'next/image';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import AffiliateLink from './AffiliateLink';
import AffiliateBadge from './AffiliateBadge';
import { cn } from '@/lib/utils';
import GlassmorphicCard from '../ui/GlassmorphicCard';

interface AffiliateCardProps {
  affiliate: Affiliate;
  trackingId: string;
  className?: string;
}

const AffiliateCard: React.FC<AffiliateCardProps> = ({
  affiliate,
  trackingId,
  className,
}) => {
  return (
    <GlassmorphicCard
      className={cn('p-6 flex flex-col h-full', className)}
      variant="luxury"
      hover
    >
      <AffiliateBadge />
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-slate-100">{affiliate.name}</h3>
        <p className="text-sm text-slate-400 mt-1">{affiliate.category}</p>
        <div className="mt-4 space-y-2 text-sm text-slate-300">
          <div className="flex items-center">
            <BadgeCheck className="w-4 h-4 mr-2 text-green-400" />
            <span>
              Commission: <strong>{affiliate.commission}</strong>
            </span>
          </div>
          <div className="flex items-center">
            <BadgeCheck className="w-4 h-4 mr-2 text-green-400" />
            <span>
              Cookie: <strong>{affiliate.cookieDuration}</strong>
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <AffiliateLink
          affiliateId={affiliate.id}
          trackingId={trackingId}
          className="inline-flex items-center justify-center w-full px-6 py-3 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:-translate-y-0.5"
        >
          Get Started <ArrowRight className="w-4 h-4 ml-2" />
        </AffiliateLink>
      </div>
    </GlassmorphicCard>
  );
};

export default AffiliateCard;