// Glass material tokens.
//
// These names mirror the canonical --sl-* tokens in
// repos/starlight-design-intelligence/packages/materials/src/tokens/tokens.css.
// Nothing here is a second palette: if a value changes upstream, change it there
// and regenerate, then update this mirror. Material-specific constants (rim angle,
// dispersion offsets, grain, tier blur) live here because the materials package
// does not carry composition constants.

export const palette = {
  surface: "#070a10",
  onSurface: "#fbf6eb",
  ivory: "#ede6d8",
  paper: "#efede7",
  accent: "#c9a15c",
  accentBright: "#f0c87e",
  signal: "#82d8e6",
  hairline: "rgba(251,246,235,.10)",
  highlight: "rgba(251,246,235,.18)",
  muted: "rgba(251,246,235,.68)",
  subtle: "rgba(251,246,235,.50)",
  glassOpaque: "#111113",
} as const;

export type Material = "orbital" | "liquid";
export type SignalState = "fresh" | "stale";

export interface MaterialSpec {
  label: string;
  caption: string;
  /** Radius of the pane. Orbital is a structure, so it takes the larger radius. */
  radius: number;
  /** Blur in px at the CSS tier. The package's base tier is 24px saturate 1.35. */
  blur: number;
  saturate: number;
}

export const materials: Record<Material, MaterialSpec> = {
  orbital: {
    label: "Orbital",
    caption: "A system with layers. Clarity is the data.",
    radius: 22,
    blur: 24,
    saturate: 1.35,
  },
  liquid: {
    label: "Liquid",
    caption: "The surface answers to a press, then settles.",
    radius: 20,
    blur: 26,
    saturate: 1.5,
  },
};

export const stateSpec: Record<SignalState, { saturate: number; brightness: number; chip: string }> = {
  // Fresh glass stays clear. Stale glass frosts and desaturates: freshness is a
  // visual property, never an animated number. (starlight/design.md §10)
  fresh: { saturate: 1, brightness: 1, chip: "24 up" },
  stale: { saturate: 0.55, brightness: 0.9, chip: "stale · 74 d" },
};

/** Composition constants, mirrored from the glass lab preview. */
export const composition = {
  rimAngle: "118deg",
  dispersionPx: 1.5,
  grainOpacity: 0.035,
  pressMs: 120,
  stateMs: 220,
  revealMs: 420,
  pressScale: 0.97,
} as const;

/** The device gate, as documented by @starlight/materials/src/gate/glass-gate.ts. */
export const gate = {
  frameBudgetMs: 8,
  probeFrames: 12,
  minWidthPx: 900,
  minDeviceMemoryGb: 4,
  failsClosedOn: ["prefers-reduced-motion", "prefers-reduced-transparency", "saveData"] as const,
} as const;
