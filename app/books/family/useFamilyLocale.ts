'use client';

import { useEffect, useState } from 'react';
import { familyLocaleStorageKey, type FamilyLocale } from './story-content';

function preferredLocale(): FamilyLocale {
  try {
    const saved = window.localStorage.getItem(familyLocaleStorageKey);
    if (saved === 'en' || saved === 'de') return saved;
  } catch {
    // Storage can be unavailable in locked-down or private browser contexts.
  }
  return window.navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en';
}

export function useFamilyLocale() {
  const [locale, setLocale] = useState<FamilyLocale>('en');

  useEffect(() => {
    setLocale(preferredLocale());
  }, []);

  function updateLocale(nextLocale: FamilyLocale) {
    setLocale(nextLocale);
    try {
      window.localStorage.setItem(familyLocaleStorageKey, nextLocale);
    } catch {
      // The toggle should still work for this session when persistence is blocked.
    }
  }

  return { locale, setLocale: updateLocale };
}
