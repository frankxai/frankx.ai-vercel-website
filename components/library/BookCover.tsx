'use client';

import Image from 'next/image';
import { useState } from 'react';

/** Edition-neutral bookplate remains legible when a cover is absent or fails. */
export function BookCover({ title, author, src, imageAlt, className = '', priority = false }: {
  title: string;
  author: string;
  src?: string;
  imageAlt?: string;
  className?: string;
  priority?: boolean;
}) {
  const [failedSource, setFailedSource] = useState<string>();
  return (
    <div style={{ containerType: 'inline-size' }} className={`relative aspect-[2/3] shrink-0 overflow-hidden rounded-md border border-white/15 bg-[#12252a] ${className}`}>
      <div className="absolute inset-0 flex flex-col justify-between p-[12%] text-left" role="img" aria-hidden={Boolean(src && src !== failedSource)} aria-label={`${title} by ${author} — Library bookplate`}>
        <span className="text-[6cqw] leading-tight tracking-wider text-emerald-200">FrankX Library</span>
        <span style={{ fontSize: title.length > 55 ? '9cqw' : '11cqw' }} className="font-semibold leading-snug text-white">{title}</span>
        <span className="border-t border-emerald-200/25 pt-[7%] text-[6.5cqw] leading-tight text-emerald-100/80">{author}</span>
      </div>
      {src && src !== failedSource && (
        <Image src={src} alt={imageAlt || `${title} by ${author} — book cover`} fill sizes="(max-width: 640px) 80px, 112px" priority={priority}
          className="bg-[#12252a] object-contain" onError={() => setFailedSource(src)} />
      )}
    </div>
  );
}
