import React from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AffiliateDisclosureProps {
  className?: string;
  short?: boolean;
}

const AffiliateDisclosure: React.FC<AffiliateDisclosureProps> = ({
  className,
  short = false,
}) => {
  const disclosureText = short
    ? 'Affiliate links are used on this page.'
    : 'Disclosure: This page contains affiliate links. If you make a purchase through these links, we may earn a commission at no extra cost to you. This helps support our work and allows us to continue providing valuable content.';

  return (
    <div
      className={cn(
        'p-3 mt-6 text-sm rounded-lg bg-slate-800/50 text-slate-400 border border-slate-700/50 flex items-start',
        className
      )}
    >
      <Info className="w-5 h-5 mr-3 text-slate-500 mt-0.5 flex-shrink-0" />
      <p>{disclosureText}</p>
    </div>
  );
};

export default AffiliateDisclosure;