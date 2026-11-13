export interface ReadingPreferences {
  size: 'standard' | 'large' | 'larger';
  face: 'sans' | 'serif';
  width: 'comfortable' | 'wide';
  tone: 'ink' | 'warm';
}

export const defaultReadingPreferences: ReadingPreferences = { size: 'standard', face: 'sans', width: 'comfortable', tone: 'ink' };
export const readingPreferencesKey = 'frankx:reading-preferences:v1';

export function parseReadingPreferences(raw: string | null): ReadingPreferences {
  try {
    const value: unknown = JSON.parse(raw ?? 'null');
    if (!value || typeof value !== 'object') return { ...defaultReadingPreferences };
    const data = value as Record<string, unknown>;
    return {
      size: data.size === 'large' || data.size === 'larger' ? data.size : 'standard',
      face: data.face === 'serif' ? 'serif' : 'sans',
      width: data.width === 'wide' ? 'wide' : 'comfortable',
      tone: data.tone === 'warm' ? 'warm' : 'ink',
    };
  } catch { return { ...defaultReadingPreferences }; }
}
