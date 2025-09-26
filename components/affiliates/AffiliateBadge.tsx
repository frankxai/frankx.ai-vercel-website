import React from 'react';
import { Badge } from '@/components/ui/badge'; // Assuming you have a badge component
import { cn } from '@/lib/utils';

interface AffiliateBadgeProps {
  className?: string;
}

const AffiliateBadge: React.FC<AffiliateBadgeProps> = ({ className }) => {
  return (
    <Badge
      variant="secondary"
      className={cn(
        'absolute top-2 right-2 text-xs font-semibold tracking-wider uppercase bg-slate-700 text-slate-300 border-slate-600',
        className
      )}
    >
      Affiliate
    </Badge>
  );
};

export default AffiliateBadge;