'use client';

import { useEffect, useRef, useState } from 'react';
import type { TOCItem } from '../types';

interface BookTOCProps {
  items: TOCItem[];
  activeClass: string;
  mode?: 'desktop' | 'mobile';
}

export default function BookTOC({ items, activeClass, mode = 'desktop' }: BookTOCProps) {
  const [activeId, setActiveId] = useState('');
  const disclosure = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActiveId(entry.target.id);
    }, { rootMargin: '-15% 0px -65% 0px' });
    for (const item of items) {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [items]);

  const links = (
    <ol className="space-y-1">
      {items.map(item => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={activeId === item.id ? 'location' : undefined}
            onClick={() => {
              if (disclosure.current) disclosure.current.open = false;
              setActiveId(item.id);
              // Native hash/history navigation remains available without scripts.
              document.getElementById(item.id)?.focus({ preventScroll: true });
            }}
            className={`flex min-h-11 items-center rounded-lg px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors motion-reduce:transition-none ${item.level === 3 ? 'pl-6' : ''} ${activeId === item.id ? activeClass : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );

  if (mode === 'mobile') return (
    <details
      ref={disclosure}
      data-book-toc="mobile"
      className="rounded-xl border border-white/15 bg-white/[0.02]"
      onKeyDown={event => {
        if (event.key === 'Escape' && disclosure.current?.open) {
          event.preventDefault();
          disclosure.current.open = false;
          disclosure.current.querySelector('summary')?.focus();
        }
      }}
    >
      <summary className="min-h-11 cursor-pointer rounded-xl px-4 py-3 text-sm font-medium text-white/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Contents</summary>
      <nav aria-label="Chapter contents" className="px-2 pb-3">{links}</nav>
    </details>
  );

  return (
    <nav aria-label="Chapter contents" data-book-toc="desktop" className="max-h-[calc(100dvh-10rem)] overflow-y-auto overscroll-contain">
      <h2 className="mb-4 px-3 text-sm font-semibold text-white/85">Contents</h2>
      {links}
    </nav>
  );
}
