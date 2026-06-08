/**
 * Safe JSON-LD serialization for inline <script type="application/ld+json">.
 *
 * JSON.stringify alone is unsafe inside a <script> element: a literal "</script>"
 * (or U+2028/U+2029) inside any string value can break out of the script context
 * (a stored-XSS vector if data ever includes attacker-influenced text). Escaping
 * `<`, `>`, `&`, and the JS line separators to their \uXXXX forms keeps the JSON
 * semantically identical while making it impossible to close the script tag.
 */
export function ldJson(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029")
}
