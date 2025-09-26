const MOJIBAKE_PATTERN = /(?:\u00c3|\u00c2|\u00e2|\u00a2|\u0153|\u2122|\uFFFD)/;

const CP1252_REVERSE: Record<number, number> = {
  0x20ac: 0x80,
  0x201a: 0x82,
  0x0192: 0x83,
  0x201e: 0x84,
  0x2026: 0x85,
  0x2020: 0x86,
  0x2021: 0x87,
  0x02c6: 0x88,
  0x2030: 0x89,
  0x0160: 0x8a,
  0x2039: 0x8b,
  0x0152: 0x8c,
  0x017d: 0x8e,
  0x2018: 0x91,
  0x2019: 0x92,
  0x201c: 0x93,
  0x201d: 0x94,
  0x2022: 0x95,
  0x2013: 0x96,
  0x2014: 0x97,
  0x02dc: 0x98,
  0x2122: 0x99,
  0x0161: 0x9a,
  0x203a: 0x9b,
  0x0153: 0x9c,
  0x017e: 0x9e,
  0x0178: 0x9f
};

type AnyRecord = Record<string, unknown>;

function decodeLayer(text: string): { next: string; changed: boolean } {
  let hasHighCodePoints = false;
  const bytes: number[] = [];

  for (const char of text) {
    const codePoint = char.codePointAt(0);
    if (codePoint === undefined) {
      continue;
    }

    if (codePoint <= 0xff) {
      if (codePoint > 0x7f) {
        hasHighCodePoints = true;
      }
      bytes.push(codePoint);
      continue;
    }

    const mapped = CP1252_REVERSE[codePoint];
    if (mapped === undefined) {
      return { next: text, changed: false };
    }

    hasHighCodePoints = true;
    bytes.push(mapped);
  }

  if (!hasHighCodePoints) {
    return { next: text, changed: false };
  }

  const decoded = decodeBytes(bytes);
  return { next: decoded, changed: decoded !== text };
}

function decodeBytes(bytes: number[]): string {
  if (typeof TextDecoder !== 'undefined') {
    return new TextDecoder('utf-8', { fatal: false }).decode(Uint8Array.from(bytes));
  }

  if (typeof Buffer !== 'undefined') {
    return Buffer.from(bytes).toString('utf8');
  }

  let result = '';
  for (const byte of bytes) {
    result += String.fromCharCode(byte);
  }
  return result;
}

function decodeMojibake(text: string): string {
  let current = text;

  for (let i = 0; i < 3 && MOJIBAKE_PATTERN.test(current); i += 1) {
    const { next, changed } = decodeLayer(current);
    if (!changed) {
      break;
    }
    current = next.normalize('NFC');
  }

  return current;
}

export function sanitizeText(value: string): string {
  if (typeof value !== 'string' || value.length === 0) {
    return value;
  }

  let result = value.replace(/\u00a0/g, ' ').replace(/\u200b/gi, '').normalize('NFC');

  if (MOJIBAKE_PATTERN.test(result)) {
    const decoded = decodeMojibake(result);
    if (!MOJIBAKE_PATTERN.test(decoded)) {
      result = decoded;
    } else {
      result = decoded
        .replace(/\u00c2(?=\s)/g, '')
        .replace(/\u00c2(?=[^\w])/g, '');
    }
  }

  return result;
}

export function sanitizeDeepInPlace<T>(subject: T): T {
  if (typeof subject === 'string') {
    return sanitizeText(subject) as unknown as T;
  }

  if (subject === null || subject === undefined) {
    return subject;
  }

  if (Array.isArray(subject)) {
    for (let i = 0; i < subject.length; i += 1) {
      subject[i] = sanitizeDeepInPlace(subject[i]);
    }
    return subject;
  }

  if (subject instanceof Date || typeof subject === 'function') {
    return subject;
  }

  if (typeof subject === 'object') {
    const record = subject as AnyRecord;
    for (const key of Object.keys(record)) {
      record[key] = sanitizeDeepInPlace(record[key]);
    }
  }

  return subject;
}
