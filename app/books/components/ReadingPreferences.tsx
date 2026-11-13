'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { defaultReadingPreferences, parseReadingPreferences, readingPreferencesKey, type ReadingPreferences as Preferences } from '../lib/reading-preferences';
import styles from './ReadingPreferences.module.css';

/** Wrap server-rendered content; do not move the markdown renderer across this boundary. */
export default function ReadingPreferences({ children, bookSlug, chapterSlug, chapterNumber, chapterTitle }: {
  children: ReactNode; bookSlug: string; chapterSlug: string; chapterNumber: number; chapterTitle: string;
}) {
  const [preferences, setPreferences] = useState<Preferences>(defaultReadingPreferences);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [resumePercent, setResumePercent] = useState<number | null>(null);
  const surface = useRef<HTMLDivElement>(null);
  useEffect(() => {
    try { setPreferences(parseReadingPreferences(window.localStorage.getItem(readingPreferencesKey))); }
    catch { setStorageAvailable(false); }
  }, []);
  useEffect(() => {
    setResumePercent(null);
    const key = `frankx:reading:${bookSlug}`;
    try {
      const saved = JSON.parse(window.localStorage.getItem(key) ?? 'null');
      if (saved?.chapterSlug === chapterSlug && typeof saved.scrollPct === 'number' && Number.isFinite(saved.scrollPct) && saved.scrollPct > 3 && saved.scrollPct < 95) setResumePercent(saved.scrollPct);
    } catch { /* Reading still works without storage. */ }
    let timer: ReturnType<typeof setTimeout> | undefined;
    let scrolled = false;
    function save() {
      if (!scrolled) return;
      const article = surface.current?.querySelector('article');
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const available = Math.max(1, rect.height - window.innerHeight);
      const scrollPct = Math.max(0, Math.min(100, -rect.top / available * 100));
      try { window.localStorage.setItem(key, JSON.stringify({ chapterSlug, chapterNumber, chapterTitle, scrollPct, updatedAt: Date.now() })); }
      catch { setStorageAvailable(false); }
    }
    function onScroll() { scrolled = true; clearTimeout(timer); timer = setTimeout(save, 300); }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pagehide', save);
    return () => { clearTimeout(timer); save(); window.removeEventListener('scroll', onScroll); window.removeEventListener('pagehide', save); };
  }, [bookSlug, chapterSlug, chapterNumber, chapterTitle]);
  function resume() {
    const article = surface.current?.querySelector('article');
    if (!article || resumePercent === null) return;
    const rect = article.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + rect.top + Math.max(0, rect.height - window.innerHeight) * resumePercent / 100, behavior: 'instant' });
    setResumePercent(null);
  }
  function update<K extends keyof Preferences>(key: K, value: Preferences[K]) {
    const next = { ...preferences, [key]: value };
    setPreferences(next);
    try { window.localStorage.setItem(readingPreferencesKey, JSON.stringify(next)); setStorageAvailable(true); }
    catch { setStorageAvailable(false); }
  }
  return (
    <div ref={surface} className={styles.surface} data-reading-size={preferences.size} data-reading-face={preferences.face} data-reading-width={preferences.width} data-reading-tone={preferences.tone}>
      {resumePercent !== null && <div className={styles.resume}><button type="button" onClick={resume}>Return to saved position · {Math.round(resumePercent)}%</button></div>}
      <details className={styles.settings}>
        <summary>Reading settings <span aria-hidden="true">Aa</span></summary>
        <div className={styles.controls}>
          <label>Text size<select value={preferences.size} onChange={event => update('size', event.target.value as Preferences['size'])}><option value="standard">Standard</option><option value="large">Large</option><option value="larger">Larger</option></select></label>
          <label>Typeface<select value={preferences.face} onChange={event => update('face', event.target.value as Preferences['face'])}><option value="sans">Sans serif</option><option value="serif">Book serif</option></select></label>
          <label>Line width<select value={preferences.width} onChange={event => update('width', event.target.value as Preferences['width'])}><option value="comfortable">Comfortable</option><option value="wide">Wide</option></select></label>
          <label>Page tone<select value={preferences.tone} onChange={event => update('tone', event.target.value as Preferences['tone'])}><option value="ink">Night ink</option><option value="warm">Warm charcoal</option></select></label>
        </div>
        <p>{storageAvailable ? 'Preferences stay in this browser.' : 'Browser storage is unavailable. Preferences apply for this page only.'}</p>
      </details>
      {children}
    </div>
  );
}
