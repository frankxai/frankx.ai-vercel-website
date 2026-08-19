'use client';

import { useState } from 'react';
import type { Experiment } from '../types';

interface ExperimentCardProps {
  experiment: Experiment;
  borderClass?: string;
  accentColor?: string;
  bookSlug?: string;
  chapterSlug?: string;
}

export default function ExperimentCard({
  experiment,
  borderClass = 'border-amber-500/40',
  accentColor = '#fbbf24',
}: ExperimentCardProps) {
  const [copied, setCopied] = useState(false);

  const shareText = [
    `Experiment ${experiment.number}: ${experiment.title}`,
    '',
    `Hypothesis: "${experiment.hypothesis}"`,
    '',
    `Setup (${experiment.duration}): ${experiment.setup}`,
    '',
    `Track: ${experiment.track}`,
    '',
    `— from Wonderproof by Frank Riemer`,
  ].join('\n');

  const handleCopy = () => {
    navigator.clipboard
      .writeText(shareText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        // clipboard blocked in some environments — silent fail
      });
  };

  const hexBg = `${accentColor}18`;
  const hexBorder = `${accentColor}30`;
  const hexTag = `${accentColor}15`;
  const hexTagBorder = `${accentColor}25`;

  return (
    <div
      className={`relative rounded-2xl border-2 ${borderClass} bg-white/[0.03] overflow-hidden`}
      role="region"
      aria-label={`Experiment ${experiment.number}: ${experiment.title}`}
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-white/10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Flask icon */}
            <div
              className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: hexBg, border: `1px solid ${hexBorder}` }}
              aria-hidden="true"
            >
              <svg
                className="w-5 h-5"
                style={{ color: accentColor }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 01-.659 1.591l-2.634 2.634a2.25 2.25 0 01-1.591.659H9.084a2.25 2.25 0 01-1.591-.659L4.859 16.59A2.25 2.25 0 014.2 15m15.6 0H4.2"
                />
              </svg>
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-white/40 mb-0.5">
                Experiment {experiment.number}
              </div>
              <h3 className="text-lg font-semibold text-white leading-tight">
                {experiment.title}
              </h3>
            </div>
          </div>

          {/* Duration badge */}
          <div
            className="flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-mono"
            style={{
              backgroundColor: hexTag,
              color: accentColor,
              border: `1px solid ${hexTagBorder}`,
            }}
          >
            {experiment.duration}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="px-6 py-5 space-y-5">
        {/* Hypothesis */}
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-white/35 mb-1.5">
            Hypothesis
          </div>
          <p className="text-white/85 leading-relaxed italic">
            &ldquo;{experiment.hypothesis}&rdquo;
          </p>
        </div>

        {/* Setup */}
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-white/35 mb-1.5">
            Setup
          </div>
          <p className="text-white/70 leading-relaxed">{experiment.setup}</p>
        </div>

        {/* Track */}
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-white/35 mb-1.5">
            What to track
          </div>
          <p className="text-white/70 leading-relaxed">{experiment.track}</p>
        </div>

        {/* Result guide */}
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-4">
          <div className="text-xs font-mono uppercase tracking-widest text-white/35 mb-1.5">
            What it means
          </div>
          <p className="text-white/65 leading-relaxed text-sm">
            {experiment.whatItMeans}
          </p>
        </div>
      </div>

      {/* Share footer */}
      <div className="px-6 pb-5">
        <button
          type="button"
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white/90 text-sm font-medium transition-colors"
          aria-label="Copy experiment details to clipboard"
        >
          {copied ? (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copied to clipboard
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                />
              </svg>
              Share this experiment
            </>
          )}
        </button>
      </div>
    </div>
  );
}
