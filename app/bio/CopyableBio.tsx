'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface Props {
  label: string;
  content: string;
  /** If true, renders simple markdown emphasis (asterisks → italic). */
  markdown?: boolean;
}

/**
 * One-block bio with a single copy-to-clipboard affordance.
 * Visual: minimal — left-aligned label, body, right-aligned ghost copy button.
 */
export default function CopyableBio({ label, content, markdown }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard refused — silently fail; user can select manually.
    }
  }

  // Lightweight asterisk-to-italic rendering — no full markdown parser needed.
  const parts = markdown
    ? content.split(/(\*[^*]+\*)/g).map((seg, i) =>
        seg.startsWith('*') && seg.endsWith('*') ? (
          <em key={i} className="italic text-white/80">
            {seg.slice(1, -1)}
          </em>
        ) : (
          <span key={i}>{seg}</span>
        )
      )
    : [content];

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] tracking-[0.25em] uppercase text-emerald-400/60 font-medium">
          {label}
        </p>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy bio to clipboard'}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-white/55 hover:text-white hover:bg-white/5 transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" /> Copy
            </>
          )}
        </button>
      </div>
      <p className="text-base lg:text-lg text-white/75 leading-[1.7] whitespace-pre-line">
        {parts}
      </p>
    </div>
  );
}
