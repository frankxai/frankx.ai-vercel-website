'use client'

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import PremiumCard from '../ui/PremiumCard';
import { trackEvent } from '@/lib/analytics';

interface CallToActionProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
  className?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  description,
  buttonText,
  href,
  className,
}) => {
  return (
    <PremiumCard glass="heavy" className={cn('p-8 text-center', className)}>
      <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
      <p className="text-slate-300 mb-8 max-w-2xl mx-auto">{description}</p>
      <Link
        href={href}
        onClick={() => trackEvent('cta_click', { cta_title: title, cta_href: href })}
        className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:-translate-y-0.5"
      >
        {buttonText} <ArrowRight className="w-5 h-5 ml-2" />
      </Link>
    </PremiumCard>
  );
};

export default CallToAction;