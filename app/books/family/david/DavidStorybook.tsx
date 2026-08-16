'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type TouchEvent,
} from 'react';
import LanguageToggle from '../LanguageToggle';
import {
  davidProgressStorageKey,
  davidSources,
  davidStory,
  pageImages,
  type FamilyLocale,
} from '../story-content';
import { useFamilyLocale } from '../useFamilyLocale';

const coverImage = '/images/books/family/david/cover.webp';

type NarrationSegment = {
  text: string;
  paragraph: number | null;
};

function SpeakerIcon({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      {active ? (
        <>
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18.5 5.5a9 9 0 0 1 0 13" />
        </>
      ) : (
        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      )}
    </svg>
  );
}

function Arrow({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-4 w-4 ${direction === 'left' ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
      <path d="M5 20h14" />
    </svg>
  );
}

function chooseVoice(locale: FamilyLocale) {
  const language = locale === 'de' ? 'de' : 'en';
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((voice) => voice.lang.toLowerCase().startsWith(language) && voice.localService) ??
    voices.find((voice) => voice.lang.toLowerCase().startsWith(language))
  );
}

export default function DavidStorybook() {
  const { locale, setLocale } = useFamilyLocale();
  const story = davidStory[locale];
  const totalPages = story.pages.length + 1;
  const [pageIndex, setPageIndex] = useState(0);
  const [narrationSupported, setNarrationSupported] = useState(false);
  const [narrating, setNarrating] = useState(false);
  const [activeParagraph, setActiveParagraph] = useState<number | null>(null);
  const [narrationStatus, setNarrationStatus] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const contentsRef = useRef<HTMLDetailsElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const narrationTokenRef = useRef(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const currentPage = pageIndex === 0 ? null : story.pages[pageIndex - 1];
  const imageSrc = pageIndex === 0 ? coverImage : (pageImages[pageIndex - 1] ?? coverImage);
  const isLastPage = pageIndex === totalPages - 1;
  const progress = ((pageIndex + 1) / totalPages) * 100;

  const pageLabel =
    pageIndex === 0
      ? story.ui.cover
      : `${story.ui.page} ${pageIndex} ${story.ui.of} ${story.pages.length}`;

  const narrationSegments = useMemo<NarrationSegment[]>(() => {
    if (!currentPage) {
      return [story.title, story.subtitle, story.dedication].map((text) => ({
        text,
        paragraph: null,
      }));
    }

    return [
      { text: currentPage.title, paragraph: null },
      ...currentPage.paragraphs.map((text, paragraph) => ({ text, paragraph })),
    ];
  }, [currentPage, story.dedication, story.subtitle, story.title]);

  const stopNarration = useCallback(
    (announce = true) => {
      narrationTokenRef.current += 1;
      utteranceRef.current = null;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setNarrating(false);
      setActiveParagraph(null);
      if (announce) setNarrationStatus(story.ui.narrationStopped);
    },
    [story.ui.narrationStopped],
  );

  const goToPage = useCallback(
    (nextPage: number) => {
      const clampedPage = Math.max(0, Math.min(totalPages - 1, nextPage));
      stopNarration(false);
      setNarrationStatus('');
      setPageIndex(clampedPage);
      window.localStorage.setItem(davidProgressStorageKey, String(clampedPage));
      contentsRef.current?.removeAttribute('open');
      window.requestAnimationFrame(() => {
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth';
        contentRef.current?.scrollTo({ top: 0, behavior });
        window.scrollTo({ top: 0, behavior });
      });
    },
    [stopNarration, totalPages],
  );

  useEffect(() => {
    setNarrationSupported('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window);
    const savedPage = Number.parseInt(
      window.localStorage.getItem(davidProgressStorageKey) ?? '0',
      10,
    );
    if (Number.isFinite(savedPage)) {
      setPageIndex(Math.max(0, Math.min(totalPages - 1, savedPage)));
    }

    return () => {
      narrationTokenRef.current += 1;
      window.speechSynthesis?.cancel();
    };
  }, [totalPages]);

  useEffect(() => {
    stopNarration(false);
    setNarrationStatus('');
  }, [locale, stopNarration]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest('button, a, summary, input, textarea, select')
      ) {
        return;
      }
      if (event.key === 'ArrowRight') goToPage(pageIndex + 1);
      if (event.key === 'ArrowLeft') goToPage(pageIndex - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPage, pageIndex]);

  function beginNarration() {
    if (!narrationSupported) {
      setNarrationStatus(story.ui.narrationUnavailable);
      return;
    }
    if (narrating) {
      stopNarration();
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();
    const token = narrationTokenRef.current + 1;
    narrationTokenRef.current = token;
    setNarrating(true);
    setActiveParagraph(null);
    setNarrationStatus(story.ui.narrationStarting);
    let segmentIndex = 0;

    const speakNext = () => {
      if (narrationTokenRef.current !== token) return;
      const segment = narrationSegments[segmentIndex];
      if (!segment) {
        utteranceRef.current = null;
        setNarrating(false);
        setActiveParagraph(null);
        setNarrationStatus(story.ui.narrationFinished);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(segment.text);
      const voice = chooseVoice(locale);
      if (voice) utterance.voice = voice;
      utterance.lang = locale === 'de' ? 'de-DE' : 'en-GB';
      utterance.rate = locale === 'de' ? 0.86 : 0.88;
      utterance.pitch = 1;
      utterance.onstart = () => {
        if (narrationTokenRef.current === token) setActiveParagraph(segment.paragraph);
      };
      utterance.onend = () => {
        segmentIndex += 1;
        speakNext();
      };
      utterance.onerror = () => {
        if (narrationTokenRef.current !== token) return;
        utteranceRef.current = null;
        setNarrating(false);
        setActiveParagraph(null);
        setNarrationStatus(story.ui.narrationStopped);
      };
      utteranceRef.current = utterance;
      synth.speak(utterance);
    };

    speakNext();
  }

  function handleTouchStart(event: TouchEvent<HTMLElement>) {
    const touch = event.changedTouches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    touchStartRef.current = null;
    if (!start || !touch) return;
    const horizontal = touch.clientX - start.x;
    const vertical = touch.clientY - start.y;
    if (Math.abs(horizontal) < 48 || Math.abs(horizontal) <= Math.abs(vertical)) return;
    goToPage(horizontal < 0 ? pageIndex + 1 : pageIndex - 1);
  }

  function changeLocale(nextLocale: FamilyLocale) {
    stopNarration(false);
    setLocale(nextLocale);
  }

  return (
    <main
      lang={locale}
      className="relative min-h-screen overflow-hidden bg-[#080807] pt-14 text-stone-100 sm:pt-16"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(251,191,36,0.11),transparent_30%),radial-gradient(circle_at_86%_85%,rgba(180,83,9,0.08),transparent_32%)]" />

      <header className="sticky top-14 z-40 border-b border-white/[0.07] bg-[#080807]/90 backdrop-blur-xl sm:top-16">
        <div className="mx-auto flex min-h-16 max-w-[1600px] items-center gap-2 px-3 sm:gap-3 sm:px-6 lg:px-8">
          <Link
            href="/books/family"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3 text-sm font-medium text-stone-300 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:px-4"
            aria-label={story.ui.familyShelf}
          >
            <span aria-hidden="true">←</span>
            <span className="hidden sm:inline">{story.ui.familyShelf}</span>
          </Link>

          <details ref={contentsRef} className="group relative min-w-0 flex-1">
            <summary className="mx-auto flex min-h-11 max-w-xl cursor-pointer list-none items-center justify-center rounded-full px-3 text-center text-sm font-medium text-stone-300 transition-colors hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 [&::-webkit-details-marker]:hidden">
              <span className="truncate">{story.shortTitle}</span>
              <span className="ml-2 text-[10px] text-stone-500 transition-transform group-open:rotate-180" aria-hidden="true">
                ▾
              </span>
            </summary>
            <div className="fixed left-1/2 top-[8.05rem] max-h-[72svh] w-[min(92vw,34rem)] -translate-x-1/2 overflow-y-auto rounded-3xl border border-white/10 bg-[#151411]/95 p-3 shadow-2xl backdrop-blur-2xl sm:top-[8.55rem] lg:absolute lg:top-[calc(100%+0.55rem)]">
              <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300/70">
                {story.ui.contents}
              </p>
              <button
                type="button"
                onClick={() => goToPage(0)}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                  pageIndex === 0 ? 'bg-amber-200/10 text-amber-100' : 'text-stone-300 hover:bg-white/[0.05]'
                }`}
              >
                <span className="w-6 text-xs tabular-nums text-stone-500">00</span>
                {story.ui.cover}
              </button>
              {story.pages.map((page, index) => (
                <button
                  key={page.eyebrow}
                  type="button"
                  onClick={() => goToPage(index + 1)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                    pageIndex === index + 1
                      ? 'bg-amber-200/10 text-amber-100'
                      : 'text-stone-300 hover:bg-white/[0.05]'
                  }`}
                >
                  <span className="w-6 shrink-0 text-xs tabular-nums text-stone-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="truncate">{page.title}</span>
                </button>
              ))}
            </div>
          </details>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={beginNarration}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:px-4 ${
                narrating
                  ? 'border-amber-200/40 bg-amber-200 text-stone-950'
                  : 'border-white/10 bg-white/[0.04] text-stone-200 hover:border-white/20 hover:bg-white/[0.07]'
              }`}
              aria-pressed={narrating}
              aria-label={narrating ? story.ui.stop : story.ui.listen}
            >
              <SpeakerIcon active={narrating} />
              <span className="hidden md:inline">{narrating ? story.ui.stop : story.ui.listen}</span>
            </button>
            <LanguageToggle
              locale={locale}
              onChange={changeLocale}
              label={story.ui.localeLabel}
              compact
            />
            <a
              href={
                locale === 'de'
                  ? '/books/david-und-das-lied-in-seinem-namen.pdf'
                  : '/books/david-and-the-song-inside-his-name.pdf'
              }
              download
              aria-label={story.ui.download}
              className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-white/10 px-3 text-sm font-semibold text-stone-200 transition-colors hover:border-white/20 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:px-4"
            >
              <DownloadIcon />
              <span className="hidden sm:inline">{story.ui.download}</span>
            </a>
          </div>
        </div>
        <div className="h-px bg-white/[0.04]">
          <div
            className="h-px bg-gradient-to-r from-amber-500 via-amber-200 to-orange-400 transition-[width] duration-500 motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <section className="relative mx-auto max-w-[1600px] px-3 pb-10 pt-3 sm:px-6 sm:pb-14 sm:pt-6 lg:px-8">
        <div className="overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#11100e] shadow-[0_35px_90px_rgba(0,0,0,0.4)] sm:rounded-[2rem] lg:grid lg:min-h-[calc(100svh-12.5rem)] lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">
          <div className="relative min-h-[330px] overflow-hidden bg-black sm:min-h-[500px] lg:min-h-full">
            <Image
              key={imageSrc}
              src={imageSrc}
              alt={
                pageIndex === 0
                  ? story.title
                  : locale === 'de'
                    ? `Illustration zu „${currentPage?.title}“`
                    : `Illustration for “${currentPage?.title}”`
              }
              fill
              priority={pageIndex <= 1}
              sizes="(max-width: 1024px) 100vw, 58vw"
              className={`object-cover motion-safe:animate-[fadeIn_500ms_ease-out] ${
                pageIndex === 0 ? 'object-[50%_32%]' : 'object-center'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#11100e]/55" />
            <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-md sm:left-6 sm:top-6">
              {pageLabel}
            </div>
            {pageIndex > 0 && (
              <p className="absolute bottom-5 left-5 right-5 max-w-xl text-xs leading-5 text-white/55 sm:bottom-7 sm:left-7">
                {story.ui.swipeHint}
              </p>
            )}
          </div>

          <div
            ref={contentRef}
            className="relative flex flex-col px-6 py-8 sm:px-10 sm:py-12 lg:max-h-[calc(100svh-12.5rem)] lg:overflow-y-auto lg:px-12 xl:px-16"
          >
            {pageIndex === 0 ? (
              <div className="my-auto">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300/80">
                  {story.coverKicker}
                </p>
                <h1 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-[-0.045em] text-balance sm:text-5xl xl:text-6xl">
                  {story.title}
                </h1>
                <p className="mt-6 text-lg leading-8 text-stone-300">{story.subtitle}</p>
                <div className="mt-8 border-l border-amber-300/40 pl-5">
                  <p className="font-serif-italic text-lg text-amber-100">{story.dedication}</p>
                  <p className="mt-3 text-sm leading-6 text-stone-400">{story.audience}</p>
                </div>
                <p className="mt-8 text-sm text-stone-500">
                  {story.readingTime} · {story.coverNote}
                </p>
                <button
                  type="button"
                  onClick={() => goToPage(1)}
                  className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-amber-300 px-6 text-sm font-bold text-stone-950 transition-colors hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#11100e]"
                >
                  {story.ui.begin}
                  <Arrow direction="right" />
                </button>
              </div>
            ) : currentPage ? (
              <article>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300/75">
                  {currentPage.eyebrow}
                </p>
                <h1 className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-balance sm:text-4xl xl:text-5xl">
                  {currentPage.title}
                </h1>
                <div className="mt-7 space-y-5">
                  {currentPage.paragraphs.map((paragraph, index) => (
                    <p
                      key={`${pageIndex}-${index}`}
                      className={`border-l pl-4 text-[1.05rem] leading-8 transition-colors duration-300 motion-reduce:transition-none sm:text-lg ${
                        activeParagraph === index
                          ? 'border-amber-300 text-amber-50'
                          : 'border-transparent text-stone-300'
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <details className="group mt-10 rounded-2xl border border-amber-200/15 bg-amber-100/[0.045] p-1">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 text-sm font-semibold text-amber-100 transition-colors hover:bg-amber-100/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 [&::-webkit-details-marker]:hidden">
                    {story.ui.lookDeeper}
                    <span
                      aria-hidden="true"
                      className="text-xs text-amber-300/70 transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-4 pb-5 pt-3">
                    <h2 className="font-display text-lg font-semibold text-amber-100">
                      {currentPage.deeperTitle}
                    </h2>
                    {currentPage.deeper.map((paragraph) => (
                      <p key={paragraph} className="mt-3 text-sm leading-6 text-stone-400">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </details>

                {isLastPage && (
                  <div className="mt-10 border-t border-white/10 pt-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/75">
                      {story.ui.complete}
                    </p>
                    <p className="mt-3 font-serif-italic text-xl leading-8 text-amber-100">
                      {locale === 'de'
                        ? 'Ein Name ist ein Samenkorn, kein Käfig.'
                        : 'A name is a seed, not a cage.'}
                    </p>
                  </div>
                )}
              </article>
            ) : null}
          </div>
        </div>

        <div className="sticky bottom-3 z-30 mx-auto mt-4 flex max-w-3xl items-center gap-2 rounded-full border border-white/10 bg-[#151411]/92 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:mt-6">
          <button
            type="button"
            onClick={() => goToPage(pageIndex - 1)}
            disabled={pageIndex === 0}
            aria-label={story.ui.previous}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-stone-200 transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 disabled:cursor-not-allowed disabled:text-stone-700 sm:px-5"
          >
            <Arrow direction="left" />
            <span className="hidden sm:inline">{story.ui.previous}</span>
          </button>
          <div className="min-w-0 flex-1 px-2 text-center">
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
              {pageLabel}
            </p>
            <div className="mx-auto mt-1.5 h-1 max-w-40 overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full bg-amber-300 transition-[width] duration-500 motion-reduce:transition-none"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => goToPage(isLastPage ? 0 : pageIndex + 1)}
            aria-label={isLastPage ? story.ui.readAgain : story.ui.next}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-amber-300 px-4 text-sm font-bold text-stone-950 transition-colors hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 sm:px-5"
          >
            <span className="hidden sm:inline">
              {isLastPage ? story.ui.readAgain : story.ui.next}
            </span>
            <Arrow direction="right" />
          </button>
        </div>

        {isLastPage && (
          <aside className="mx-auto mt-14 max-w-6xl space-y-14 pb-16 sm:mt-20">
            <section aria-labelledby="lenses-heading">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300/70">
                {locale === 'de' ? 'Nach der Geschichte' : 'After the story'}
              </p>
              <h2
                id="lenses-heading"
                className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl"
              >
                {story.ui.readingLenses}
              </h2>
              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {story.lenses.map((lens, index) => (
                  <div
                    key={lens.title}
                    className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6"
                  >
                    <span className="text-xs tabular-nums text-amber-300/60">
                      0{index + 1}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-semibold">{lens.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-stone-400">{lens.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section aria-labelledby="timeline-heading" className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <h2
                  id="timeline-heading"
                  className="font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl"
                >
                  {story.ui.timeline}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-stone-400">
                  {story.sourceIntro}
                </p>
              </div>
              <ol className="border-l border-amber-300/25 pl-6 sm:pl-8">
                {story.timeline.map((item) => (
                  <li key={item.date} className="relative pb-7 last:pb-0">
                    <span className="absolute -left-[1.78rem] top-1 h-2.5 w-2.5 rounded-full border-2 border-[#080807] bg-amber-300 sm:-left-[2.3rem]" />
                    <p className="text-xs font-semibold uppercase tracking-[0.13em] text-amber-300/70">
                      {item.date}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-stone-300">{item.event}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="conversation-heading">
              <h2
                id="conversation-heading"
                className="font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl"
              >
                {story.ui.conversation}
              </h2>
              <ol className="mt-7 grid gap-4 sm:grid-cols-2">
                {story.conversation.map((question, index) => (
                  <li
                    key={question}
                    className="flex gap-4 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 text-sm leading-6 text-stone-300"
                  >
                    <span className="shrink-0 font-semibold tabular-nums text-amber-300/70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {question}
                  </li>
                ))}
              </ol>
            </section>

            <section
              aria-labelledby="sources-heading"
              className="rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-6 sm:p-9"
            >
              <h2 id="sources-heading" className="font-display text-2xl font-semibold">
                {story.ui.sources}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-400">
                {story.sourceIntro}
              </p>
              <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {davidSources.map((source) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 text-sm leading-5 text-amber-200 underline decoration-amber-300/25 underline-offset-4 transition-colors hover:text-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                    >
                      {source.label[locale]}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-9 border-t border-white/[0.08] pt-7 text-xs leading-5 text-stone-500">
                {story.colophon}
              </p>
            </section>
          </aside>
        )}

        <p className="sr-only" aria-live="polite">
          {narrationStatus}
        </p>
      </section>
    </main>
  );
}
