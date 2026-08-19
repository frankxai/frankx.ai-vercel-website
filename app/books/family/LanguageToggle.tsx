'use client';

import type { FamilyLocale } from './story-content';

type LanguageToggleProps = {
  locale: FamilyLocale;
  onChange: (locale: FamilyLocale) => void;
  label: string;
  compact?: boolean;
};

export default function LanguageToggle({
  locale,
  onChange,
  label,
  compact = false,
}: LanguageToggleProps) {
  return (
    <div
      className="inline-flex items-center rounded-full border border-white/10 bg-black/30 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.24)] backdrop-blur-xl"
      role="group"
      aria-label={label}
    >
      {(['en', 'de'] as const).map((option) => {
        const selected = option === locale;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={selected}
            lang={option}
            className={`min-h-11 min-w-11 rounded-full font-semibold tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80 ${
              compact ? 'px-3 text-[11px]' : 'px-4 text-xs'
            } ${selected ? 'bg-amber-300 text-stone-950' : 'text-stone-300 hover:text-white'}`}
          >
            {option.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
