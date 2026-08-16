'use client';

import { useEffect, useState } from 'react';
import { familyLocaleStorageKey, type FamilyLocale } from './story-content';

function preferredLocale(): FamilyLocale {
  const saved = window.localStorage.getItem(familyLocaleStorageKey);
  if (saved === 'en' || saved === 'de') return saved;
  return window.navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en';
}

export function useFamilyLocale() {
  const [locale, setLocale] = useState<FamilyLocale>('en');

  useEffect(() => {
    setLocale(preferredLocale());
  }, []);

  function updateLocale(nextLocale: FamilyLocale) {
    setLocale(nextLocale);
    window.localStorage.setItem(familyLocaleStorageKey, nextLocale);
  }

  return { locale, setLocale: updateLocale };
}
