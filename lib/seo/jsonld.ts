/**
 * Safe JSON-LD serialization for inline <script type="application/ld+json">.
 *
 * JSON.stringify alone is unsafe inside a <script> element: a literal "</script>"
 * (or U+2028/U+2029) inside any string value can break out of the script context
 * (a stored-XSS vector if data ever includes attacker-influenced text). Escaping
 * `<`, `>`, `&`, and the JS line separators to their \uXXXX forms keeps the JSON
 * semantically identical while making it impossible to close the script tag.
 *
 * Single-pass replacement; returns "" if the value cannot be serialized so a
 * malformed payload yields an empty (harmless) script rather than crashing render.
 */
const ESCAPE_MAP: Record<string, string> = {
  "<": "\\u003c",
  ">": "\\u003e",
  "&": "\\u0026",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029",
}

export function ldJson(data: unknown): string {
  try {
    const json = JSON.stringify(data)
    if (typeof json !== "string") return ""
    return json.replace(/[<>&\u2028\u2029]/g, (m) => ESCAPE_MAP[m] ?? m)
  } catch (error) {
    console.error("[ldJson] Serialization failed:", error)
    return ""
  }
}
