/**
 * TwoLayerSignature — the page's one memorable visual.
 *
 * Thesis made literal: Van Ede is the HUMAN layer (top lane, white/zinc nodes),
 * FrankX is the INTELLIGENCE layer (bottom lane, emerald nodes). The two
 * interlock at a central seam that softly pulses. Everything else on the page
 * stays quiet so this restraint reads as deliberate.
 *
 * Pure SVG + Tailwind — no JS animation engine. The single `animate-pulse`
 * seam is disabled automatically by the global `prefers-reduced-motion` rule
 * in app/globals.css, so this stays static-render and a11y clean.
 *
 * Tech-spectrum only (emerald #10b981) per the partnerships brand contract —
 * never mix soul/amber on a partnership surface.
 */

// Node x-positions across an 800-wide viewBox — offset lanes so the connectors
// weave rather than run straight (the "interlock").
const HUMAN_X = [140, 340, 540, 660]
const INTEL_X = [240, 440, 600, 740]
const HUMAN_Y = 56
const INTEL_Y = 168
const SEAM_X = 400

export function TwoLayerSignature() {
  return (
    <figure className="m-0">
      {/* Lane labels — HTML (not foreignObject) so they stay crisp + accessible */}
      <div className="mb-3 flex items-center justify-between gap-4 px-1">
        <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-zinc-400 font-medium">
          Van Ede &middot; the human layer
        </span>
        <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-emerald-400/80 font-medium">
          FrankX &middot; the intelligence layer
        </span>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-6">
        <svg
          viewBox="0 0 800 224"
          className="w-full h-auto"
          role="img"
          aria-label="Two interlocking layers: Van Ede's human coaching layer above, FrankX's intelligence layer below, meeting at a shared seam."
          fill="none"
        >
          {/* Lane guide rails */}
          <line x1="40" y1={HUMAN_Y} x2="760" y2={HUMAN_Y} stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
          <line x1="40" y1={INTEL_Y} x2="760" y2={INTEL_Y} stroke="rgba(16,185,129,0.22)" strokeWidth="1" />

          {/* Weave connectors — each human node reaches toward an intelligence node */}
          {HUMAN_X.map((hx, i) => {
            const ix = INTEL_X[i]
            return (
              <path
                key={`weave-${i}`}
                d={`M ${hx} ${HUMAN_Y} C ${hx} 112, ${ix} 112, ${ix} ${INTEL_Y}`}
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="1.5"
              />
            )
          })}

          {/* Central seam — where the two layers meet. The one moving element. */}
          <line
            x1={SEAM_X}
            y1={HUMAN_Y}
            x2={SEAM_X}
            y2={INTEL_Y}
            stroke="rgba(16,185,129,0.55)"
            strokeWidth="2"
          />
          <circle cx={SEAM_X} cy="112" r="26" fill="rgba(16,185,129,0.10)" className="animate-pulse" />
          <circle cx={SEAM_X} cy="112" r="7" fill="#10b981" />
          <circle cx={SEAM_X} cy="112" r="13" stroke="rgba(16,185,129,0.45)" strokeWidth="1.5" />

          {/* Human layer nodes (top) */}
          {HUMAN_X.map((hx, i) => (
            <g key={`human-${i}`}>
              <circle cx={hx} cy={HUMAN_Y} r="9" fill="#0a0a0b" stroke="rgba(255,255,255,0.65)" strokeWidth="2" />
              <circle cx={hx} cy={HUMAN_Y} r="3" fill="rgba(255,255,255,0.85)" />
            </g>
          ))}

          {/* Intelligence layer nodes (bottom) */}
          {INTEL_X.map((ix, i) => (
            <g key={`intel-${i}`}>
              <circle cx={ix} cy={INTEL_Y} r="9" fill="#0a0a0b" stroke="#10b981" strokeWidth="2" />
              <circle cx={ix} cy={INTEL_Y} r="3" fill="#10b981" />
            </g>
          ))}
        </svg>
      </div>

      <figcaption className="mt-3 px-1 text-sm text-zinc-400 leading-relaxed">
        Human guidance, amplified by intelligence. The coach stays in the room.
        The intelligence does the heavy lifting around them.
      </figcaption>
    </figure>
  )
}
