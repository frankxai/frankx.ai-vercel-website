/**
 * Serialize JSON-LD without allowing a value containing a closing script tag
 * to terminate the surrounding inline script element.
 */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
