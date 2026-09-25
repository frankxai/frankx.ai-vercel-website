'use client';

import Image from 'next/image';
import { useState } from 'react';

/** Edition-neutral bookplate. The title is a work; a publisher cover belongs to a particular edition. */
export function BookCover({ title, author, src, imageAlt, className = '', priority = false }: {
  title: string;
  author: string;
  src?: string;
  imageAlt?: string;
  className?: string;
  priority?: boolean;
}) {
  const [failedSource, setFailedSource] = useState<string>();
  const palettes = [
    ['#20302f', '#d4c4a0'], ['#302b31', '#d3b6ae'], ['#182b37', '#b8d4ce'],
    ['#342b25', '#e1c9a6'], ['#24312a', '#b3ceb2'], ['#27283a', '#cbc3e4'],
  ] as const;
  const palette = palettes[[...title].reduce((total, character) => total + character.charCodeAt(0), 0) % palettes.length];
  const showingImage = Boolean(src && src !== failedSource);
  const creditedWork = author.startsWith('Traditionally attributed') ? `${title} — ${author}` : `${title} by ${author}`;
  return (
    <div style={{ containerType: 'inline-size', backgroundColor: palette[0] }} className={`relative aspect-[2/3] shrink-0 overflow-hidden rounded-sm border border-white/15 ${className}`}>
      <div className="absolute inset-0 flex flex-col justify-between border-l-[0.7cqw] border-white/15 p-[10%] pl-[13%] text-left" role="img" aria-hidden={showingImage} aria-label={`${creditedWork} — edition-neutral reading guide`}>
        <span style={{ color: palette[1] }} className="border-b border-current/20 pb-[8%] text-[6cqw] uppercase leading-tight tracking-[0.16em]">Reading guide</span>
        <span style={{ color: palette[1], fontSize: title.length > 52 ? '8cqw' : title.length > 28 ? '9.5cqw' : '12cqw' }} className="font-serif leading-[1.1] [overflow-wrap:anywhere]">{title}</span>
        <span style={{ color: palette[1] }} className="border-t border-current/20 pt-[7%] text-[5.7cqw] leading-tight opacity-80">{author}<span className="mt-[8%] block uppercase tracking-[0.12em] opacity-70">Edition independent</span></span>
      </div>
      {src && src !== failedSource && (
        <Image src={src} alt={imageAlt || `${creditedWork} — pictured edition cover`} fill sizes="(max-width: 640px) 112px, 180px" priority={priority}
          className="bg-[#12252a] object-contain" onError={() => setFailedSource(src)} />
      )}
    </div>
  );
}
