#!/usr/bin/env node

// src/linter/parser/handler.ts
import YAML from "yaml";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import { visit } from "unist-util-visit";

class ParserHandler {
  execute(input) {
    try {
      const { content } = input;
      const processor = unified().use(remarkParse).use(remarkFrontmatter, ["yaml"]);
      const ast = processor.parse(content);
      const blocks = [];
      const sections = [];
      const headingsWithLines = [];
      let blockIndex = 0;
      visit(ast, (node) => {
        if (node.type === "yaml") {
          const yamlNode = node;
          blocks.push({
            yaml: yamlNode.value,
            block: "frontmatter",
            startLine: node.position?.start.line ?? 1
          });
        }
        if (node.type === "code") {
          const codeNode = node;
          if (codeNode.lang === "yaml" || codeNode.lang === "yml") {
            blocks.push({
              yaml: codeNode.value,
              block: blockIndex,
              startLine: node.position?.start.line ?? 1
            });
            blockIndex++;
          }
        }
        if (node.type === "heading") {
          const heading = node;
          if (heading.depth === 2) {
            const text = this.extractHeadingText(heading.children);
            if (text) {
              sections.push(text);
              headingsWithLines.push({ text, line: node.position?.start.line ?? 1 });
            }
          }
        }
      });
      const contentLines = content.split(`
`);
      const documentSections = [];
      const firstHeading = headingsWithLines[0];
      if (firstHeading) {
        const firstHeadingLine = firstHeading.line;
        if (firstHeadingLine > 1) {
          documentSections.push({
            heading: "",
            content: contentLines.slice(0, firstHeadingLine - 1).join(`
`)
          });
        }
        for (let i = 0;i < headingsWithLines.length; i++) {
          const current = headingsWithLines[i];
          if (!current)
            continue;
          const next = headingsWithLines[i + 1];
          const startIdx = current.line - 1;
          const endIdx = next ? next.line - 1 : contentLines.length;
          documentSections.push({
            heading: current.text,
            content: contentLines.slice(startIdx, endIdx).join(`
`)
          });
        }
      } else {
        documentSections.push({
          heading: "",
          content
        });
      }
      if (blocks.length === 0) {
        return {
          success: false,
          error: {
            code: "NO_YAML_FOUND",
            message: "No YAML content found. Expected frontmatter (---) or fenced yaml code blocks.",
            recoverable: true
          }
        };
      }
      return this.mergeCodeBlocks(blocks, sections, documentSections);
    } catch (error) {
      return {
        success: false,
        error: {
          code: "UNKNOWN_ERROR",
          message: error instanceof Error ? error.message : String(error),
          recoverable: false
        }
      };
    }
  }
  mergeCodeBlocks(blocks, sections, documentSections) {
    const merged = {};
    const sourceMap = new Map;
    const seenSections = new Map;
    for (const block of blocks) {
      let parsed;
      try {
        parsed = YAML.parse(block.yaml);
        if (!parsed || typeof parsed !== "object")
          continue;
      } catch (error) {
        return {
          success: false,
          error: {
            code: "YAML_PARSE_ERROR",
            message: error instanceof Error ? error.message : String(error),
            recoverable: true
          }
        };
      }
      for (const key of Object.keys(parsed)) {
        const previousBlock = seenSections.get(key);
        if (previousBlock !== undefined) {
          const prevDesc = previousBlock === "frontmatter" ? "frontmatter" : `code block ${previousBlock + 1}`;
          const currDesc = block.block === "frontmatter" ? "frontmatter" : `code block ${block.block + 1}`;
          return {
            success: false,
            error: {
              code: "DUPLICATE_SECTION",
              message: `Section '${key}' is defined in both ${prevDesc} and ${currDesc}.`,
              recoverable: true
            }
          };
        }
        seenSections.set(key, block.block);
        sourceMap.set(key, { line: block.startLine, column: 0, block: block.block });
      }
      Object.assign(merged, parsed);
    }
    return {
      success: true,
      data: this.toDesignSystem(merged, sourceMap, sections, documentSections)
    };
  }
  toDesignSystem(raw, sourceMap, sections, documentSections) {
    const omittedRaw = raw["omitted"];
    let omitted = undefined;
    if (Array.isArray(omittedRaw)) {
      omitted = omittedRaw.map((item) => {
        if (typeof item === "string") {
          return { section: item };
        }
        if (item && typeof item === "object" && typeof item.section === "string") {
          const entry = { section: item.section };
          if (typeof item.reason === "string") {
            entry.reason = item.reason;
          }
          return entry;
        }
        return null;
      }).filter((item) => item !== null);
    }
    return {
      version: typeof raw["version"] === "string" ? raw["version"] : undefined,
      name: typeof raw["name"] === "string" ? raw["name"] : undefined,
      description: typeof raw["description"] === "string" ? raw["description"] : undefined,
      omitted,
      colors: raw["colors"],
      typography: raw["typography"],
      rounded: raw["rounded"],
      spacing: raw["spacing"],
      components: raw["components"],
      sourceMap,
      sections,
      documentSections,
      rawValues: raw
    };
  }
  extractHeadingText(children) {
    return children.map((c) => ("value" in c) ? c.value : "").join("").trim();
  }
}

// src/linter/parser/spec.ts
import { z } from "zod";
var ParserInputSchema = z.object({
  content: z.string().min(1, "Content must not be empty")
});
var ParserErrorCode = z.enum([
  "EMPTY_CONTENT",
  "NO_YAML_FOUND",
  "YAML_PARSE_ERROR",
  "DUPLICATE_SECTION",
  "UNKNOWN_ERROR"
]);
var SCHEMA_KEYS = [
  "version",
  "name",
  "description",
  "omitted",
  "colors",
  "typography",
  "rounded",
  "spacing",
  "components"
];

// src/linter/model/spec.ts
import { z as z3 } from "zod";

// src/linter/spec-config.ts
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { z as z2 } from "zod";
var PropertyDefSchema = z2.object({
  name: z2.string(),
  type: z2.string(),
  description: z2.string().optional()
});
var TypeDefSchema = z2.object({
  description: z2.string(),
  formats: z2.array(z2.string()).optional(),
  units: z2.array(z2.string()).optional(),
  note: z2.string().optional(),
  recommendation: z2.string().optional()
});
var ConfigSchema = z2.object({
  version: z2.string(),
  limits: z2.object({
    max_token_nesting_depth: z2.number().default(20),
    max_reference_depth: z2.number().default(10)
  }).prefault({}),
  units: z2.array(z2.string()).min(1),
  types: z2.record(z2.string(), TypeDefSchema),
  sections: z2.array(z2.object({
    canonical: z2.string(),
    aliases: z2.array(z2.string()).optional()
  })).min(1),
  typography_properties: z2.array(PropertyDefSchema).min(1),
  component_sub_tokens: z2.array(PropertyDefSchema).min(1),
  color_roles: z2.array(z2.string()).min(1),
  recommended_tokens: z2.record(z2.string(), z2.array(z2.string())),
  examples: z2.object({
    colors: z2.record(z2.string(), z2.string()),
    typography: z2.record(z2.string(), z2.record(z2.string(), z2.union([z2.string(), z2.number()]))),
    components: z2.record(z2.string(), z2.record(z2.string(), z2.string()))
  })
});
function loadSpecConfig(filePath) {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const yamlPath = filePath ? resolve(filePath) : resolve(currentDir, "./spec-config.yaml");
  const raw = parse(readFileSync(yamlPath, "utf-8"));
  return ConfigSchema.parse(raw);
}
var _cachedConfig;
function getSpecConfig() {
  if (!_cachedConfig) {
    _cachedConfig = loadSpecConfig();
  }
  return _cachedConfig;
}
var config = getSpecConfig();
var SPEC_VERSION = config.version;
var MAX_TOKEN_NESTING_DEPTH = config.limits.max_token_nesting_depth;
var MAX_REFERENCE_DEPTH = config.limits.max_reference_depth;
var STANDARD_UNITS = config.units;
var SPEC_TYPES = config.types;
var SECTIONS = config.sections;
var TYPOGRAPHY_PROPERTIES = config.typography_properties;
var COMPONENT_SUB_TOKENS = config.component_sub_tokens;
var CORE_COLOR_ROLES = config.color_roles;
var RECOMMENDED_TOKENS = config.recommended_tokens;
var EXAMPLES = config.examples;
var PRIMITIVE_TYPES = config.types;
var CANONICAL_ORDER = SECTIONS.map((s) => s.canonical);
var SECTION_ALIASES = Object.fromEntries(SECTIONS.flatMap((s) => (s.aliases ?? []).map((alias) => [alias, s.canonical])));
function resolveAlias(heading) {
  return SECTION_ALIASES[heading] ?? heading;
}
var VALID_TYPOGRAPHY_PROPS = TYPOGRAPHY_PROPERTIES.map((p) => p.name);
var VALID_COMPONENT_SUB_TOKENS = COMPONENT_SUB_TOKENS.map((p) => p.name);

// src/linter/model/color-parser.ts
var CSS_NAMED_COLORS = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgrey: "#a9a9a9",
  darkgreen: "#006400",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategrey: "#2f4f4f",
  darkslategray: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  grey: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgrey: "#d3d3d3",
  lightgreen: "#90ee90",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslate: "#778899",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32",
  transparent: "#00000000"
};
var MAX_COLOR_MIX_DEPTH = 32;
function parseCssColor(colorStr, depth = 0) {
  if (typeof colorStr !== "string")
    return null;
  if (depth > MAX_COLOR_MIX_DEPTH)
    return null;
  const clean = colorStr.trim().toLowerCase();
  if (!clean)
    return null;
  if (clean.startsWith("#")) {
    if (!/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(clean)) {
      return null;
    }
    return parseHex(clean);
  }
  if (Object.prototype.hasOwnProperty.call(CSS_NAMED_COLORS, clean)) {
    return parseHex(CSS_NAMED_COLORS[clean]);
  }
  const parsedFunc = tokenizeFunc(clean);
  if (!parsedFunc) {
    return null;
  }
  const { name, args } = parsedFunc;
  switch (name) {
    case "rgb":
    case "rgba": {
      if (args.length !== 3 && args.length !== 4)
        return null;
      const rRaw = parsePercentOrNumber(args[0], 255);
      const gRaw = parsePercentOrNumber(args[1], 255);
      const bRaw = parsePercentOrNumber(args[2], 255);
      const aVal = args.length === 4 ? parseAlpha(args[3]) : 1;
      if (isNaN(rRaw) || isNaN(gRaw) || isNaN(bRaw) || isNaN(aVal))
        return null;
      const r = Math.max(0, Math.min(255, Math.round(rRaw)));
      const g = Math.max(0, Math.min(255, Math.round(gRaw)));
      const b = Math.max(0, Math.min(255, Math.round(bRaw)));
      const a = Math.max(0, Math.min(1, aVal));
      return makeResult(r, g, b, a);
    }
    case "hsl":
    case "hsla": {
      if (args.length !== 3 && args.length !== 4)
        return null;
      const h = parseHue(args[0]);
      const s = parsePercentOrNumber(args[1], 1);
      const l = parsePercentOrNumber(args[2], 1);
      const a = args.length === 4 ? parseAlpha(args[3]) : 1;
      if (isNaN(h) || isNaN(s) || isNaN(l) || isNaN(a))
        return null;
      const rgb = hslToRgb(h, s, l);
      return makeResult(rgb.r, rgb.g, rgb.b, a);
    }
    case "hwb": {
      if (args.length !== 3 && args.length !== 4)
        return null;
      const h = parseHue(args[0]);
      const w = parsePercentOrNumber(args[1], 1);
      const b = parsePercentOrNumber(args[2], 1);
      const a = args.length === 4 ? parseAlpha(args[3]) : 1;
      if (isNaN(h) || isNaN(w) || isNaN(b) || isNaN(a))
        return null;
      const rgb = hwbToRgb(h, w, b);
      return makeResult(rgb.r, rgb.g, rgb.b, a);
    }
    case "lab": {
      if (args.length !== 3 && args.length !== 4)
        return null;
      const l = parsePercentOrNumber(args[0], 100);
      const aVal = parseFloat(args[1]);
      const bVal = parseFloat(args[2]);
      const a = args.length === 4 ? parseAlpha(args[3]) : 1;
      if (isNaN(l) || isNaN(aVal) || isNaN(bVal) || isNaN(a))
        return null;
      const rgb = labToRgb(l, aVal, bVal);
      return makeResult(rgb.r, rgb.g, rgb.b, a);
    }
    case "lch": {
      if (args.length !== 3 && args.length !== 4)
        return null;
      const l = parsePercentOrNumber(args[0], 100);
      const c = parseFloat(args[1]);
      const h = parseHue(args[2]);
      const a = args.length === 4 ? parseAlpha(args[3]) : 1;
      if (isNaN(l) || isNaN(c) || isNaN(h) || isNaN(a))
        return null;
      const rgb = lchToRgb(l, c, h);
      return makeResult(rgb.r, rgb.g, rgb.b, a);
    }
    case "oklab": {
      if (args.length !== 3 && args.length !== 4)
        return null;
      const l = parsePercentOrNumber(args[0], 1);
      const aVal = parseFloat(args[1]);
      const bVal = parseFloat(args[2]);
      const a = args.length === 4 ? parseAlpha(args[3]) : 1;
      if (isNaN(l) || isNaN(aVal) || isNaN(bVal) || isNaN(a))
        return null;
      const rgb = oklabToRgb(l, aVal, bVal);
      return makeResult(rgb.r, rgb.g, rgb.b, a);
    }
    case "oklch": {
      if (args.length !== 3 && args.length !== 4)
        return null;
      const l = parsePercentOrNumber(args[0], 1);
      const c = parseFloat(args[1]);
      const h = parseHue(args[2]);
      const a = args.length === 4 ? parseAlpha(args[3]) : 1;
      if (isNaN(l) || isNaN(c) || isNaN(h) || isNaN(a))
        return null;
      const rgb = oklchToRgb(l, c, h);
      return makeResult(rgb.r, rgb.g, rgb.b, a);
    }
    case "color-mix": {
      const subArgs = splitByComma(clean.slice(10, -1));
      if (subArgs.length !== 3)
        return null;
      const spaceTokens = subArgs[0].trim().split(/\s+/);
      if (spaceTokens.length !== 2 || spaceTokens[0] !== "in" || spaceTokens[1] !== "srgb") {
        return null;
      }
      const parsed1 = parseColorWithWeight(subArgs[1]);
      const parsed2 = parseColorWithWeight(subArgs[2]);
      if (!parsed1 || !parsed2)
        return null;
      const c1 = parseCssColor(parsed1.colorStr, depth + 1);
      const c2 = parseCssColor(parsed2.colorStr, depth + 1);
      if (!c1 || !c2)
        return null;
      let w1 = parsed1.weight;
      let w2 = parsed2.weight;
      if (w1 === null && w2 === null) {
        w1 = 50;
        w2 = 50;
      } else if (w1 !== null && w2 === null) {
        w2 = 100 - w1;
      } else if (w2 !== null && w1 === null) {
        w1 = 100 - w2;
      } else if (w1 !== null && w2 !== null) {
        const sum = w1 + w2;
        if (sum === 0)
          return null;
        w1 = w1 / sum * 100;
        w2 = w2 / sum * 100;
      }
      const f1 = w1 / 100;
      const f2 = w2 / 100;
      const a1 = c1.a !== undefined ? c1.a : 1;
      const a2 = c2.a !== undefined ? c2.a : 1;
      const aMix = a1 * f1 + a2 * f2;
      let r = 0, g = 0, b = 0;
      if (aMix > 0) {
        r = Math.round((c1.r * a1 * f1 + c2.r * a2 * f2) / aMix);
        g = Math.round((c1.g * a1 * f1 + c2.g * a2 * f2) / aMix);
        b = Math.round((c1.b * a1 * f1 + c2.b * a2 * f2) / aMix);
      }
      return makeResult(Math.max(0, Math.min(255, r)), Math.max(0, Math.min(255, g)), Math.max(0, Math.min(255, b)), Math.max(0, Math.min(1, aMix)));
    }
    default:
      return null;
  }
}
function parseHex(hexStr) {
  let hex = hexStr;
  if (hex.length === 4) {
    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  } else if (hex.length === 5) {
    hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}${hex[4]}${hex[4]}`;
  }
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  let a;
  if (hex.length === 9) {
    a = parseInt(hex.slice(7, 9), 16) / 255;
  }
  return makeResult(r, g, b, a);
}
function makeResult(r, g, b, a) {
  const hexR = r.toString(16).padStart(2, "0");
  const hexG = g.toString(16).padStart(2, "0");
  const hexB = b.toString(16).padStart(2, "0");
  let hex = `#${hexR}${hexG}${hexB}`;
  if (a !== undefined && a < 1) {
    const hexA = Math.round(a * 255).toString(16).padStart(2, "0");
    hex += hexA;
  }
  const luminance = computeLuminance(r, g, b);
  return { hex, r, g, b, a, luminance };
}
function computeLuminance(r, g, b) {
  const linearize = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}
function parseHue(s) {
  const lower = s.trim().toLowerCase();
  let val = 0;
  if (lower.endsWith("deg")) {
    val = parseFloat(lower.slice(0, -3));
  } else if (lower.endsWith("grad")) {
    val = parseFloat(lower.slice(0, -4)) * 360 / 400;
  } else if (lower.endsWith("rad")) {
    val = parseFloat(lower.slice(0, -3)) * 180 / Math.PI;
  } else if (lower.endsWith("turn")) {
    val = parseFloat(lower.slice(0, -4)) * 360;
  } else {
    val = parseFloat(lower);
  }
  val = val % 360;
  if (val < 0)
    val += 360;
  return val;
}
function parsePercentOrNumber(s, refMax) {
  const trim = s.trim();
  if (trim.endsWith("%")) {
    return parseFloat(trim.slice(0, -1)) / 100 * refMax;
  }
  return parseFloat(trim);
}
function parseAlpha(s) {
  if (s === undefined)
    return 1;
  const trim = s.trim();
  if (trim.endsWith("%")) {
    return parseFloat(trim.slice(0, -1)) / 100;
  }
  return parseFloat(trim);
}
function tokenizeFunc(str) {
  const match = str.trim().match(/^([a-z-]{3,15})\((.*)\)$/i);
  if (!match)
    return null;
  const name = match[1].toLowerCase();
  const inner = match[2].trim();
  let coordStr = inner;
  let alphaStr = undefined;
  let slantIndex = -1;
  let depth = 0;
  for (let i = 0;i < inner.length; i++) {
    const char = inner[i];
    if (char === "(")
      depth++;
    else if (char === ")")
      depth--;
    else if (depth === 0 && char === "/") {
      slantIndex = i;
      break;
    }
  }
  if (slantIndex !== -1) {
    coordStr = inner.slice(0, slantIndex).trim();
    alphaStr = inner.slice(slantIndex + 1).trim();
  }
  const args = splitList(coordStr);
  if (alphaStr !== undefined) {
    args.push(alphaStr);
  }
  return { name, args };
}
function splitList(str) {
  const results = [];
  let current = "";
  let depth = 0;
  for (let i = 0;i < str.length; i++) {
    const char = str[i];
    if (char === "(") {
      depth++;
      current += char;
    } else if (char === ")") {
      depth--;
      current += char;
    } else if (depth === 0 && (char === "," || /\s/.test(char))) {
      if (current.trim()) {
        results.push(current.trim());
        current = "";
      }
    } else {
      current += char;
    }
  }
  if (current.trim()) {
    results.push(current.trim());
  }
  return results;
}
function splitByComma(str) {
  const results = [];
  let current = "";
  let depth = 0;
  for (let i = 0;i < str.length; i++) {
    const char = str[i];
    if (char === "(") {
      depth++;
      current += char;
    } else if (char === ")") {
      depth--;
      current += char;
    } else if (depth === 0 && char === ",") {
      results.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  if (current.trim()) {
    results.push(current.trim());
  }
  return results;
}
function parseColorWithWeight(subArg) {
  const parts = splitList(subArg.trim());
  if (parts.length === 0 || parts.length > 2)
    return null;
  if (parts.length === 1) {
    return { colorStr: parts[0], weight: null };
  }
  const p0 = parts[0];
  const p1 = parts[1];
  const isP0Weight = p0.endsWith("%");
  const isP1Weight = p1.endsWith("%");
  if (isP0Weight && !isP1Weight) {
    return { colorStr: p1, weight: parseFloat(p0.slice(0, -1)) };
  } else if (isP1Weight && !isP0Weight) {
    return { colorStr: p0, weight: parseFloat(p1.slice(0, -1)) };
  }
  return null;
}
function hslToRgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(h / 60 % 2 - 1));
  const m = l - c / 2;
  let r_ = 0, g_ = 0, b_ = 0;
  if (h < 60) {
    r_ = c;
    g_ = x;
    b_ = 0;
  } else if (h < 120) {
    r_ = x;
    g_ = c;
    b_ = 0;
  } else if (h < 180) {
    r_ = 0;
    g_ = c;
    b_ = x;
  } else if (h < 240) {
    r_ = 0;
    g_ = x;
    b_ = c;
  } else if (h < 300) {
    r_ = x;
    g_ = 0;
    b_ = c;
  } else {
    r_ = c;
    g_ = 0;
    b_ = x;
  }
  return {
    r: Math.max(0, Math.min(255, Math.round((r_ + m) * 255))),
    g: Math.max(0, Math.min(255, Math.round((g_ + m) * 255))),
    b: Math.max(0, Math.min(255, Math.round((b_ + m) * 255)))
  };
}
function hwbToRgb(h, w, b) {
  if (w + b >= 1) {
    const sum = w + b;
    const val = Math.max(0, Math.min(255, Math.round(w / sum * 255)));
    return { r: val, g: val, b: val };
  }
  const pure = hslToRgb(h, 1, 0.5);
  const r = Math.round(pure.r / 255 * (1 - w - b) * 255 + w * 255);
  const g = Math.round(pure.g / 255 * (1 - w - b) * 255 + w * 255);
  const bVal = Math.round(pure.b / 255 * (1 - w - b) * 255 + w * 255);
  return {
    r: Math.max(0, Math.min(255, r)),
    g: Math.max(0, Math.min(255, g)),
    b: Math.max(0, Math.min(255, bVal))
  };
}
function labToRgb(l, a, b) {
  const fy = (l + 16) / 116;
  const fx = a / 500 + fy;
  const fz = fy - b / 200;
  const e = 216 / 24389;
  const k = 24389 / 27;
  const fx3 = fx * fx * fx;
  const fz3 = fz * fz * fz;
  const xr = fx3 > e ? fx3 : (116 * fx - 16) / k;
  const yr = l > k * e ? fy * fy * fy : l / k;
  const zr = fz3 > e ? fz3 : (116 * fz - 16) / k;
  const Xn = 0.96422;
  const Yn = 1;
  const Zn = 0.82521;
  const x = xr * Xn;
  const y = yr * Yn;
  const z3 = zr * Zn;
  const x65 = 0.9555726312052288 * x - 0.02303316850884054 * y + 0.06316100215997245 * z3;
  const y65 = -0.02828971739420664 * x + 1.0099416310812543 * y + 0.021007716449297165 * z3;
  const z65 = 0.012298224741016325 * x - 0.02048298287477757 * y + 1.3299098463422234 * z3;
  const r_lin = 3.2404542 * x65 - 1.5371385 * y65 - 0.4985314 * z65;
  const g_lin = -0.969266 * x65 + 1.8760108 * y65 + 0.041556 * z65;
  const b_lin = 0.0556434 * x65 - 0.2040259 * y65 + 1.0572252 * z65;
  const gamma = (val) => {
    return val <= 0.0031308 ? 12.92 * val : 1.055 * Math.pow(val, 1 / 2.4) - 0.055;
  };
  return {
    r: Math.max(0, Math.min(255, Math.round(gamma(r_lin) * 255))),
    g: Math.max(0, Math.min(255, Math.round(gamma(g_lin) * 255))),
    b: Math.max(0, Math.min(255, Math.round(gamma(b_lin) * 255)))
  };
}
function lchToRgb(l, c, h) {
  const hRad = h * Math.PI / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);
  return labToRgb(l, a, b);
}
function oklabToRgb(l, a, b) {
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;
  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;
  const r_lin = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const g_lin = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const b_lin = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;
  const gamma = (val) => {
    return val <= 0.0031308 ? 12.92 * val : 1.055 * Math.pow(val, 1 / 2.4) - 0.055;
  };
  return {
    r: Math.max(0, Math.min(255, Math.round(gamma(r_lin) * 255))),
    g: Math.max(0, Math.min(255, Math.round(gamma(g_lin) * 255))),
    b: Math.max(0, Math.min(255, Math.round(gamma(b_lin) * 255)))
  };
}
function oklchToRgb(l, c, h) {
  const hRad = h * Math.PI / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);
  return oklabToRgb(l, a, b);
}

// src/linter/model/spec.ts
var SeveritySchema = z3.enum(["error", "warning", "info"]);
var VALID_TYPOGRAPHY_PROPS2 = VALID_TYPOGRAPHY_PROPS;
var VALID_COMPONENT_SUB_TOKENS2 = VALID_COMPONENT_SUB_TOKENS;
var ModelErrorCode = z3.enum([
  "INVALID_COLOR",
  "INVALID_DIMENSION",
  "INVALID_TYPOGRAPHY_PROP",
  "UNRESOLVED_REFERENCE",
  "CIRCULAR_REFERENCE",
  "REFERENCE_TO_NON_PRIMITIVE",
  "NESTING_DEPTH_EXCEEDED",
  "UNKNOWN_ERROR"
]);
var STANDARD_UNITS2 = new Set(STANDARD_UNITS);
var CSS_UNITS = new Set([
  "px",
  "cm",
  "mm",
  "in",
  "pt",
  "pc",
  "em",
  "rem",
  "ex",
  "ch",
  "cap",
  "ic",
  "lh",
  "rlh",
  "vh",
  "vw",
  "vmin",
  "vmax",
  "dvh",
  "dvw",
  "dvmin",
  "dvmax",
  "svh",
  "svw",
  "svmin",
  "svmax",
  "lvh",
  "lvw",
  "lvmin",
  "lvmax",
  "cqw",
  "cqh",
  "cqi",
  "cqb",
  "cqmin",
  "cqmax",
  "%"
]);
var MAX_DIMENSION_LENGTH = 64;
function parseDimensionParts(raw) {
  if (typeof raw !== "string")
    return null;
  if (raw.length > MAX_DIMENSION_LENGTH)
    return null;
  const match = raw.match(/^(-?\d*\.?\d+)([a-zA-Z%]+)$/);
  if (!match)
    return null;
  const value = parseFloat(match[1]);
  return Number.isNaN(value) ? null : { value, unit: match[2] };
}
function isValidColor(raw) {
  return parseCssColor(raw) !== null;
}
function isParseableDimension(raw) {
  const parts = parseDimensionParts(raw);
  return parts !== null && CSS_UNITS.has(parts.unit);
}
function isTokenReference(raw) {
  return /^\{[a-zA-Z0-9._-]+\}$/.test(raw);
}

// src/linter/model/handler.ts
var SCHEMA_KEY_SET = new Set(SCHEMA_KEYS);
var TYPOGRAPHY_PROP_SET = new Set(VALID_TYPOGRAPHY_PROPS2);

class ModelHandler {
  execute(input) {
    try {
      const findings = [];
      const symbolTable = new Map;
      const colors = new Map;
      const typography = new Map;
      const rounded = new Map;
      const spacing = new Map;
      if (input.colors) {
        const isCollision = buildCollisionGuard("colors", findings);
        forEachLeaf(input.colors, (name, raw) => {
          if (isCollision(name))
            return;
          if (typeof raw === "string" && isTokenReference(raw)) {
            symbolTable.set(`colors.${name}`, raw);
          } else if (isValidColor(raw)) {
            const resolved = parseColor(raw);
            colors.set(name, resolved);
            symbolTable.set(`colors.${name}`, resolved);
          } else {
            findings.push({
              severity: "error",
              path: `colors.${name}`,
              message: `'${raw}' is not a valid color. Expected a CSS color value (e.g., #ffffff, rgb(0 0 0), oklch(0.5 0.2 240)).`
            });
            symbolTable.set(`colors.${name}`, raw);
          }
        }, "", 0, findings, "colors");
      }
      if (input.typography) {
        for (const [name, props] of Object.entries(input.typography)) {
          const resolved = parseTypography(props, `typography.${name}`, findings);
          typography.set(name, resolved);
          symbolTable.set(`typography.${name}`, resolved);
        }
      }
      if (input.rounded) {
        const isCollision = buildCollisionGuard("rounded", findings);
        forEachLeaf(input.rounded, (name, raw) => {
          if (isCollision(name))
            return;
          if (typeof raw === "string") {
            if (isParseableDimension(raw)) {
              const resolved = parseDimension(raw);
              if (resolved.unit !== "px" && resolved.unit !== "rem" && resolved.unit !== "em") {
                findings.push({
                  severity: "error",
                  path: `rounded.${name}`,
                  message: `'${raw}' has an invalid unit '${resolved.unit}'. Only px, rem, and em are allowed.`
                });
              }
              rounded.set(name, resolved);
              symbolTable.set(`rounded.${name}`, resolved);
            } else if (!isTokenReference(raw)) {
              findings.push({
                severity: "error",
                path: `rounded.${name}`,
                message: `'${raw}' is not a valid dimension.`
              });
              symbolTable.set(`rounded.${name}`, raw);
            } else {
              symbolTable.set(`rounded.${name}`, raw);
            }
          }
        }, "", 0, findings, "rounded");
      }
      if (input.spacing) {
        const isCollision = buildCollisionGuard("spacing", findings);
        forEachLeaf(input.spacing, (name, raw) => {
          if (isCollision(name))
            return;
          if (isParseableDimension(raw)) {
            const resolved = parseDimension(raw);
            spacing.set(name, resolved);
            symbolTable.set(`spacing.${name}`, resolved);
          } else {
            symbolTable.set(`spacing.${name}`, raw);
          }
        }, "", 0, findings, "spacing");
      }
      for (const [key, value] of symbolTable) {
        if (typeof value !== "string" || !isTokenReference(value))
          continue;
        const resolved = resolveReference(symbolTable, value.slice(1, -1), new Set);
        if (resolved === null || typeof resolved !== "object" || !("type" in resolved))
          continue;
        if (key.startsWith("colors.") && resolved.type === "color") {
          const name = key.slice("colors.".length);
          colors.set(name, resolved);
          symbolTable.set(key, resolved);
        } else if (key.startsWith("rounded.") && resolved.type === "dimension") {
          const name = key.slice("rounded.".length);
          rounded.set(name, resolved);
          symbolTable.set(key, resolved);
        } else if (key.startsWith("spacing.") && resolved.type === "dimension") {
          const name = key.slice("spacing.".length);
          spacing.set(name, resolved);
          symbolTable.set(key, resolved);
        }
      }
      const components = new Map;
      if (input.components) {
        for (const [compName, props] of Object.entries(input.components)) {
          const properties = new Map;
          const unresolvedRefs = [];
          for (const [propName, rawValue] of Object.entries(props)) {
            if (typeof rawValue === "number" || typeof rawValue === "boolean") {
              properties.set(propName, rawValue);
            } else if (isTokenReference(rawValue)) {
              const refPath = rawValue.slice(1, -1);
              const resolved = resolveReference(symbolTable, refPath, new Set);
              if (resolved !== null) {
                properties.set(propName, resolved);
              } else {
                unresolvedRefs.push(rawValue);
                properties.set(propName, rawValue);
              }
            } else if (isValidColor(rawValue)) {
              properties.set(propName, parseColor(rawValue));
            } else if (isParseableDimension(rawValue)) {
              properties.set(propName, parseDimension(rawValue));
            } else {
              properties.set(propName, rawValue);
            }
          }
          components.set(compName, { properties, unresolvedRefs });
        }
      }
      const unknownKeys = [...input.sourceMap.keys()].filter((key) => !SCHEMA_KEY_SET.has(key));
      const unknownKeyValues = {};
      if (input.rawValues) {
        for (const key of unknownKeys) {
          if (Object.prototype.hasOwnProperty.call(input.rawValues, key)) {
            unknownKeyValues[key] = input.rawValues[key];
          }
        }
      }
      return {
        designSystem: {
          name: input.name,
          description: input.description,
          omitted: input.omitted,
          colors,
          typography,
          rounded,
          spacing,
          components,
          symbolTable,
          sections: input.sections,
          unknownKeys,
          unknownKeyValues
        },
        findings
      };
    } catch (error) {
      return {
        designSystem: {
          colors: new Map,
          typography: new Map,
          rounded: new Map,
          spacing: new Map,
          components: new Map,
          symbolTable: new Map
        },
        findings: [
          {
            severity: "error",
            message: `Unexpected error during model building: ${error instanceof Error ? error.message : String(error)}`
          }
        ]
      };
    }
  }
}
function buildCollisionGuard(category, findings) {
  const seenKeys = new Set;
  const seenNormalized = new Map;
  return (name) => {
    const normalized = name.replace(/\./g, "-");
    if (seenKeys.has(name)) {
      findings.push({
        severity: "error",
        path: `${category}.${name}`,
        message: `Duplicate token path '${category}.${name}' detected.`
      });
      return true;
    }
    if (seenNormalized.has(normalized)) {
      findings.push({
        severity: "error",
        path: `${category}.${name}`,
        message: `Grouped ${category} token flattens to '${normalized}', which is already defined.`
      });
      return true;
    }
    seenKeys.add(name);
    seenNormalized.set(normalized, name);
    return false;
  };
}
function parseColor(raw) {
  const parsed = parseCssColor(raw);
  if (!parsed) {
    throw new Error(`Invalid color: ${raw}`);
  }
  return {
    type: "color",
    ...parsed
  };
}
function parseDimension(raw) {
  if (typeof raw !== "string") {
    throw new Error(`parseDimension expected a string, got ${typeof raw}. ` + `This usually indicates a malformed token in your design file.`);
  }
  const value = raw.trim();
  if (value === "") {
    throw new Error('parseDimension received an empty string. Please provide a valid dimension (e.g., "16px", "1.5rem").');
  }
  const parts = parseDimensionParts(value);
  if (!parts) {
    throw new Error(`Invalid dimension: ${raw}`);
  }
  return {
    type: "dimension",
    value: parts.value,
    unit: parts.unit
  };
}
function parseTypography(props, path, findings) {
  const result = { type: "typography" };
  if (typeof props["fontFamily"] === "string") {
    const ff = props["fontFamily"];
    if (isValidColor(ff)) {
      findings.push({
        severity: "error",
        path: `${path}.fontFamily`,
        message: `'${ff}' appears to be a color, not a valid font family.`
      });
    }
    result.fontFamily = ff;
  }
  if (props["fontWeight"] !== undefined) {
    const fw = props["fontWeight"];
    let fwValue;
    if (typeof fw === "number") {
      fwValue = fw;
    } else if (typeof fw === "string") {
      const parsed = Number(fw);
      if (!isNaN(parsed)) {
        fwValue = parsed;
      }
    }
    if (fwValue === undefined) {
      findings.push({
        severity: "error",
        path: `${path}.fontWeight`,
        message: `'${fw}' is not a valid font weight. Expected a number.`
      });
    } else {
      result.fontWeight = fwValue;
    }
  }
  if (typeof props["fontFeature"] === "string")
    result.fontFeature = props["fontFeature"];
  if (typeof props["fontVariation"] === "string")
    result.fontVariation = props["fontVariation"];
  const dimensionProps = ["fontSize", "lineHeight", "letterSpacing"];
  for (const prop of dimensionProps) {
    const raw = props[prop];
    if (typeof raw === "string") {
      if (isParseableDimension(raw)) {
        const parsed = parseDimension(raw);
        if (parsed.unit !== "px" && parsed.unit !== "rem" && parsed.unit !== "em") {
          findings.push({
            severity: "error",
            path: `${path}.${prop}`,
            message: `'${raw}' has an invalid unit '${parsed.unit}'. Only px, rem, and em are allowed.`
          });
        }
        result[prop] = parsed;
      } else if (prop === "lineHeight" && /^\d*\.?\d+$/.test(raw)) {
        result[prop] = {
          type: "dimension",
          value: parseFloat(raw),
          unit: ""
        };
      } else if (!isTokenReference(raw)) {
        findings.push({
          severity: "error",
          path: `${path}.${prop}`,
          message: `'${raw}' is not a valid dimension.`
        });
      }
    }
  }
  for (const key of Object.keys(props)) {
    if (!TYPOGRAPHY_PROP_SET.has(key)) {
      findings.push({
        severity: "warning",
        path: `${path}.${key}`,
        message: `'${key}' is not a recognized typography property. Valid properties: ${VALID_TYPOGRAPHY_PROPS2.join(", ")}.`
      });
    }
  }
  return result;
}
function resolveReference(symbolTable, path, visited, depth = 0) {
  if (depth > MAX_REFERENCE_DEPTH)
    return null;
  if (visited.has(path))
    return null;
  visited.add(path);
  const value = symbolTable.get(path);
  if (value === undefined)
    return null;
  if (typeof value === "string" && isTokenReference(value)) {
    const innerPath = value.slice(1, -1);
    return resolveReference(symbolTable, innerPath, visited, depth + 1);
  }
  return value;
}
function contrastRatio(a, b) {
  const L1 = Math.max(a.luminance, b.luminance);
  const L2 = Math.min(a.luminance, b.luminance);
  return (L1 + 0.05) / (L2 + 0.05);
}
function forEachLeaf(obj, fn, prefix = "", depth = 0, findings, rootPath) {
  if (depth > MAX_TOKEN_NESTING_DEPTH) {
    if (findings && rootPath) {
      if (!findings.some((f) => f.path === rootPath && f.message.includes("nesting depth"))) {
        findings.push({
          severity: "error",
          path: rootPath,
          message: `Token nesting depth exceeds maximum allowed depth of ${MAX_TOKEN_NESTING_DEPTH}.`
        });
      }
    }
    return;
  }
  for (const [key, value] of Object.entries(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      forEachLeaf(value, fn, fullPath, depth + 1, findings, rootPath);
    } else {
      fn(fullPath, value);
    }
  }
}

// src/linter/linter/rules/broken-ref.ts
function brokenRef(state) {
  const findings = [];
  for (const [compName, comp] of state.components) {
    for (const ref of comp.unresolvedRefs) {
      findings.push({
        path: `components.${compName}`,
        message: `Reference ${ref} does not resolve to any defined token.`
      });
    }
    for (const [propName] of comp.properties) {
      if (!VALID_COMPONENT_SUB_TOKENS2.includes(propName)) {
        findings.push({
          severity: "warning",
          path: `components.${compName}.${propName}`,
          message: `'${propName}' is not a recognized component sub-token. Valid sub-tokens: ${VALID_COMPONENT_SUB_TOKENS2.join(", ")}.`
        });
      }
    }
  }
  return findings;
}
var brokenRefRule = {
  name: "broken-ref",
  severity: "error",
  description: "Broken/circular references and unknown component sub-tokens.",
  run: brokenRef
};

// src/linter/linter/rules/missing-primary.ts
function missingPrimary(state) {
  if (state.colors.size > 0 && !state.colors.has("primary")) {
    return [{
      path: "colors",
      message: "No 'primary' color defined. The agent will auto-generate key colors, reducing your control over the palette."
    }];
  }
  return [];
}
var missingPrimaryRule = {
  name: "missing-primary",
  severity: "warning",
  description: "Missing primary color — warns when colors are defined but no 'primary' exists.",
  run: missingPrimary
};

// src/linter/linter/rules/contrast-ratio.ts
var WCAG_AA_MINIMUM = 4.5;
function contrastCheck(state) {
  const findings = [];
  for (const [compName, comp] of state.components) {
    const bgValue = comp.properties.get("backgroundColor");
    const textValue = comp.properties.get("textColor");
    if (!bgValue || !textValue)
      continue;
    const bgColor = resolveToColor(bgValue);
    const textColor = resolveToColor(textValue);
    if (!bgColor || !textColor)
      continue;
    const ratio = contrastRatio(bgColor, textColor);
    if (ratio < WCAG_AA_MINIMUM) {
      findings.push({
        path: `components.${compName}`,
        message: `textColor (${textColor.hex}) on backgroundColor (${bgColor.hex}) has contrast ratio ${ratio.toFixed(2)}:1, below WCAG AA minimum of ${WCAG_AA_MINIMUM}:1.`
      });
    }
  }
  return findings;
}
function resolveToColor(value) {
  if (typeof value === "object" && value !== null && "type" in value && value.type === "color") {
    return value;
  }
  return null;
}
var contrastCheckRule = {
  name: "contrast-ratio",
  severity: "warning",
  description: "WCAG contrast ratio — warns when component backgroundColor/textColor pairs fall below the AA minimum of 4.5:1.",
  run: contrastCheck
};

// src/linter/linter/rules/orphaned-tokens.ts
function colorFamily(name) {
  let n = name;
  n = n.replace(/^on-/, "");
  n = n.replace(/^inverse-/, "");
  n = n.replace(/^on-/, "");
  n = n.replace(/-container.*$/, "");
  n = n.replace(/-fixed.*$/, "");
  n = n.replace(/-(dim|bright|tint|variant)$/, "");
  return n;
}
var MD3_STANDARD_FAMILIES = new Set([
  "primary",
  "secondary",
  "tertiary",
  "error",
  "surface",
  "background",
  "outline"
]);
function orphanedTokens(state) {
  if (state.components.size === 0)
    return [];
  const referencedPaths = new Set;
  for (const [, comp] of state.components) {
    for (const [, value] of comp.properties) {
      if (typeof value === "object" && value !== null && "type" in value) {
        for (const [key, symValue] of state.symbolTable) {
          if (symValue === value) {
            referencedPaths.add(key);
          }
        }
      }
    }
  }
  const referencedFamilies = new Set;
  for (const path of referencedPaths) {
    if (path.startsWith("colors.")) {
      referencedFamilies.add(colorFamily(path.slice("colors.".length)));
    }
  }
  const findings = [];
  for (const [name] of state.colors) {
    const path = `colors.${name}`;
    if (referencedPaths.has(path))
      continue;
    const family = colorFamily(name);
    if (referencedFamilies.has(family))
      continue;
    if (MD3_STANDARD_FAMILIES.has(family))
      continue;
    findings.push({
      path,
      message: `'${name}' is defined but never referenced by any component.`
    });
  }
  return findings;
}
var orphanedTokensRule = {
  name: "orphaned-tokens",
  severity: "warning",
  description: "Orphaned tokens — tokens defined but never referenced by any component.",
  run: orphanedTokens
};

// src/linter/linter/rules/token-summary.ts
function tokenSummary(state) {
  const parts = [];
  if (state.colors.size > 0)
    parts.push(`${state.colors.size} color${state.colors.size !== 1 ? "s" : ""}`);
  if (state.typography.size > 0)
    parts.push(`${state.typography.size} typography scale${state.typography.size !== 1 ? "s" : ""}`);
  if (state.rounded.size > 0)
    parts.push(`${state.rounded.size} rounding level${state.rounded.size !== 1 ? "s" : ""}`);
  if (state.spacing.size > 0)
    parts.push(`${state.spacing.size} spacing token${state.spacing.size !== 1 ? "s" : ""}`);
  if (state.components.size > 0)
    parts.push(`${state.components.size} component${state.components.size !== 1 ? "s" : ""}`);
  if (parts.length > 0) {
    return [{
      message: `Design system defines ${parts.join(", ")}.`
    }];
  }
  return [];
}
var tokenSummaryRule = {
  name: "token-summary",
  severity: "info",
  description: "Token count summary — emits an info diagnostic summarizing how many tokens are defined.",
  run: tokenSummary
};

// src/linter/linter/rules/missing-sections.ts
function missingSections(state) {
  const findings = [];
  const omitted = new Set((state.omitted ?? []).map((section) => section.section.toLowerCase()));
  const sections = [
    { map: state.spacing, name: "spacing", fallback: "Layout spacing will fall back to agent defaults." },
    { map: state.rounded, name: "rounded", fallback: "Corner rounding will fall back to agent defaults." }
  ];
  for (const { map, name, fallback } of sections) {
    if (omitted.has(name))
      continue;
    if (map.size === 0 && state.colors.size > 0) {
      findings.push({
        path: name,
        message: `No '${name}' section defined. ${fallback}`
      });
    }
  }
  return findings;
}
var missingSectionsRule = {
  name: "missing-sections",
  severity: "info",
  description: "Missing sections — notes when optional sections (spacing, rounded) are absent.",
  run: missingSections
};

// src/linter/linter/rules/section-order.ts
var ORDER_MAP = new Map(CANONICAL_ORDER.map((s, i) => [s, i]));
function sectionOrder(state) {
  const findings = [];
  const sections = state.sections ?? [];
  if (sections.length === 0)
    return findings;
  const knownSections = sections.map(resolveAlias).filter((s) => ORDER_MAP.has(s));
  for (let i = 0;i < knownSections.length - 1; i++) {
    const current = knownSections[i];
    const next = knownSections[i + 1];
    if (!current || !next)
      continue;
    const currentIdx = ORDER_MAP.get(current);
    const nextIdx = ORDER_MAP.get(next);
    if (currentIdx === undefined || nextIdx === undefined)
      continue;
    if (currentIdx > nextIdx) {
      findings.push({
        message: `Section '${current}' appears before '${next}', which is out of order. Expected order: ${CANONICAL_ORDER.join(", ")}`
      });
      break;
    }
  }
  return findings;
}
var sectionOrderRule = {
  name: "section-order",
  severity: "warning",
  description: "Section order — warns when sections are out of canonical order.",
  run: sectionOrder
};

// src/linter/linter/rules/missing-typography.ts
function missingTypography(state) {
  const omitted = new Set((state.omitted ?? []).map((section) => section.section.toLowerCase()));
  if (omitted.has("typography")) {
    return [];
  }
  if (state.typography.size === 0 && state.colors.size > 0) {
    return [{
      path: "typography",
      message: "No typography tokens defined. Agents will use default font choices, reducing your control over the design system's typographic identity."
    }];
  }
  return [];
}
var missingTypographyRule = {
  name: "missing-typography",
  severity: "warning",
  description: "Missing typography — warns when colors are defined but no typography tokens exist.",
  run: missingTypography
};

// src/linter/linter/rules/levenshtein.ts
function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_2, j) => i === 0 ? j : j === 0 ? i : 0));
  for (let i = 1;i <= m; i++) {
    for (let j = 1;j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

// src/linter/linter/rules/unknown-key.ts
var MAX_TYPO_DISTANCE = 2;
function unknownKey(state) {
  const knownSet = new Set(SCHEMA_KEYS);
  return (state.unknownKeys ?? []).flatMap((key) => {
    if (knownSet.has(key))
      return [];
    let bestMatch;
    let bestDist = Infinity;
    for (const known of SCHEMA_KEYS) {
      if (Math.abs(key.length - known.length) > MAX_TYPO_DISTANCE)
        continue;
      const dist = levenshtein(key.toLowerCase(), known.toLowerCase());
      if (dist < bestDist) {
        bestDist = dist;
        bestMatch = known;
      }
    }
    if (bestDist <= MAX_TYPO_DISTANCE && bestMatch) {
      return [{
        path: key,
        message: `Unknown key "${key}" — did you mean "${bestMatch}"?`
      }];
    }
    return [];
  });
}
var unknownKeyRule = {
  name: "unknown-key",
  severity: "warning",
  description: "Unknown key — warns when a top-level YAML key looks like a typo of a known schema key.",
  run: unknownKey
};

// src/linter/linter/rules/token-like-ignored.ts
var HEX_COLOR_RE = /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
var CSS_DIMENSION_RE = /^-?\d*\.?\d+[a-zA-Z%]+$/;
var MAX_TOKEN_VALUE_LENGTH = 64;
var TYPOGRAPHY_PROPS = new Set(["fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing"]);
function isTokenLikeMap(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const obj = value;
  return hasTokenLikeContent(obj);
}
function hasTokenLikeContent(obj) {
  for (const [key, val] of Object.entries(obj)) {
    if (TYPOGRAPHY_PROPS.has(key))
      return true;
    if (typeof val === "string") {
      if (val.length <= MAX_TOKEN_VALUE_LENGTH && (HEX_COLOR_RE.test(val) || CSS_DIMENSION_RE.test(val)))
        return true;
    } else if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      if (hasTokenLikeContent(val))
        return true;
    }
  }
  return false;
}
function tokenLikeIgnored(state) {
  const unknownKeys = state.unknownKeys ?? [];
  const unknownKeyValues = state.unknownKeyValues ?? {};
  const findings = [];
  for (const key of unknownKeys) {
    const value = unknownKeyValues[key];
    if (isTokenLikeMap(value)) {
      findings.push({
        path: key,
        message: `"${key}" looks like a design-token map but is not a recognized schema key ` + `(colors, typography, spacing, rounded, components). ` + `It will be silently ignored by export commands. ` + `Rename it to a supported key or move its values under a recognized section.`
      });
    }
  }
  return findings;
}
var tokenLikeIgnoredRule = {
  name: "token-like-ignored",
  severity: "warning",
  description: "Warns when a top-level YAML key looks like a design-token map but is not " + "part of the recognized export schema and will be silently ignored.",
  run: tokenLikeIgnored
};

// src/linter/linter/rules/omitted.ts
function omittedRules(state) {
  const findings = [];
  if (!state.omitted)
    return findings;
  const validSections = new Set(["colors", "typography", "spacing", "rounded", "components"]);
  for (const item of state.omitted) {
    const sectionName = item.section.toLowerCase();
    if (!validSections.has(sectionName)) {
      findings.push({
        severity: "warning",
        rule: "unknown-omission",
        path: "omitted",
        message: `unknown section name '${item.section}' in omitted key`
      });
      continue;
    }
    let isPresent = false;
    if (sectionName === "colors" && state.colors && state.colors.size > 0)
      isPresent = true;
    if (sectionName === "typography" && state.typography && state.typography.size > 0)
      isPresent = true;
    if (sectionName === "spacing" && state.spacing && state.spacing.size > 0)
      isPresent = true;
    if (sectionName === "rounded" && state.rounded && state.rounded.size > 0)
      isPresent = true;
    if (sectionName === "components" && state.components && state.components.size > 0)
      isPresent = true;
    if (isPresent) {
      findings.push({
        severity: "warning",
        rule: "redundant-omission",
        path: "omitted",
        message: `${sectionName} listed in omitted but ${sectionName} tokens are defined — omitted declaration has no effect`
      });
    } else {
      findings.push({
        severity: "info",
        rule: "declared-omission",
        path: `omitted.${sectionName}`,
        message: `${sectionName} intentionally omitted — no ${sectionName} tokens will be validated`
      });
    }
  }
  return findings;
}
var omittedRule = {
  name: "omitted-rules",
  severity: "info",
  description: "Validates omitted sections and alerts on redundant or unknown entries.",
  run: omittedRules
};

// src/linter/linter/rules/index.ts
var DEFAULT_RULE_DESCRIPTORS = [
  brokenRefRule,
  missingPrimaryRule,
  contrastCheckRule,
  orphanedTokensRule,
  tokenSummaryRule,
  missingSectionsRule,
  missingTypographyRule,
  sectionOrderRule,
  unknownKeyRule,
  tokenLikeIgnoredRule,
  omittedRule
];
function toLintRule(descriptor) {
  return (state) => descriptor.run(state).map((finding) => ({
    severity: finding.severity ?? descriptor.severity,
    path: finding.path,
    message: finding.message,
    rule: finding.rule ?? descriptor.name
  }));
}
var DEFAULT_RULES = DEFAULT_RULE_DESCRIPTORS.map(toLintRule);

// src/linter/linter/runner.ts
function isDescriptorArray(rules) {
  return rules.length > 0 && typeof rules[0] === "object" && "run" in rules[0];
}
function runLinter(state, rules = DEFAULT_RULES) {
  const findings = isDescriptorArray(rules) ? rules.flatMap((desc) => desc.run(state).map((f) => ({
    severity: f.severity ?? desc.severity,
    path: f.path,
    message: f.message
  }))) : rules.flatMap((rule) => rule(state));
  return {
    findings,
    summary: {
      errors: findings.filter((d) => d.severity === "error").length,
      warnings: findings.filter((d) => d.severity === "warning").length,
      infos: findings.filter((d) => d.severity === "info").length
    }
  };
}
function preEvaluate(state, rules = DEFAULT_RULES) {
  const { findings } = runLinter(state, rules);
  const fixes = [];
  const improvements = [];
  const suggestions = [];
  for (const d of findings) {
    const entry = { path: d.path ?? "", findings: [d] };
    if (d.severity === "error")
      fixes.push(entry);
    else if (d.severity === "warning")
      improvements.push(entry);
    else
      suggestions.push(entry);
  }
  return { fixes, improvements, suggestions };
}

// src/linter/tailwind/handler.ts
class TailwindEmitterHandler {
  execute(state) {
    return {
      success: true,
      data: {
        theme: {
          extend: {
            colors: this.mapColors(state),
            fontFamily: this.mapFontFamilies(state),
            fontSize: this.mapFontSizes(state),
            borderRadius: this.mapDimensions(state.rounded),
            spacing: this.mapDimensions(state.spacing)
          }
        }
      }
    };
  }
  mapColors(state) {
    const result = {};
    for (const [name, color] of state.colors) {
      result[name] = color.hex;
    }
    return result;
  }
  mapFontFamilies(state) {
    const result = {};
    for (const [name, typo] of state.typography) {
      if (typo.fontFamily) {
        result[name] = [typo.fontFamily];
      }
    }
    return result;
  }
  mapFontSizes(state) {
    const result = {};
    for (const [name, typo] of state.typography) {
      if (typo.fontSize) {
        const meta = {};
        if (typo.lineHeight)
          meta["lineHeight"] = this.dimToString(typo.lineHeight);
        if (typo.letterSpacing)
          meta["letterSpacing"] = this.dimToString(typo.letterSpacing);
        if (typo.fontWeight !== undefined)
          meta["fontWeight"] = String(typo.fontWeight);
        result[name] = [this.dimToString(typo.fontSize), meta];
      }
    }
    return result;
  }
  mapDimensions(dims) {
    const result = {};
    for (const [name, dim] of dims) {
      result[name] = this.dimToString(dim);
    }
    return result;
  }
  dimToString(dim) {
    return `${dim.value}${dim.unit}`;
  }
}

// src/linter/lint.ts
function lint(content, options) {
  const parser = new ParserHandler;
  const model = new ModelHandler;
  const tailwind = new TailwindEmitterHandler;
  const parseResult = parser.execute({ content });
  if (!parseResult.success) {
    if (parseResult.error.recoverable) {
      const emptyParsed = { sourceMap: new Map };
      const { designSystem: designSystem2 } = model.execute(emptyParsed);
      const sections = extractSectionsFromContent(content);
      return {
        designSystem: designSystem2,
        findings: [{
          severity: "warning",
          message: parseResult.error.message
        }],
        summary: { errors: 0, warnings: 1, infos: 0 },
        tailwindConfig: tailwind.execute(designSystem2),
        sections: sections.map((s) => s.heading).filter(Boolean),
        documentSections: sections
      };
    }
    throw new Error(`Parse failed: ${parseResult.error.message}`);
  }
  const { designSystem, findings: modelFindings } = model.execute(parseResult.data);
  const lintResult = runLinter(designSystem, options?.rules);
  const tailwindConfig = tailwind.execute(designSystem);
  const findings = [...modelFindings, ...lintResult.findings];
  const summary = {
    errors: modelFindings.filter((d) => d.severity === "error").length + lintResult.summary.errors,
    warnings: modelFindings.filter((d) => d.severity === "warning").length + lintResult.summary.warnings,
    infos: modelFindings.filter((d) => d.severity === "info").length + lintResult.summary.infos
  };
  return {
    designSystem,
    findings,
    summary,
    tailwindConfig,
    sections: parseResult.data.sections ?? [],
    documentSections: parseResult.data.documentSections ?? []
  };
}
function extractSectionsFromContent(content) {
  const lines = content.split(`
`);
  const sections = [];
  const headingPattern = /^## (.+)$/;
  let currentStart = 0;
  let currentHeading = "";
  for (let i = 0;i < lines.length; i++) {
    const line = lines[i];
    if (!line)
      continue;
    const match = headingPattern.exec(line);
    if (match) {
      if (i > 0) {
        sections.push({
          heading: currentHeading,
          content: lines.slice(currentStart, i).join(`
`)
        });
      }
      currentHeading = match[1] ?? "";
      currentStart = i;
    }
  }
  sections.push({
    heading: currentHeading,
    content: lines.slice(currentStart).join(`
`)
  });
  return sections;
}
// src/linter/tailwind/v4/handler.ts
var VALID_TOKEN_NAME = /^[a-zA-Z0-9][a-zA-Z0-9-]*$/;

class TailwindV4EmitterHandler {
  execute(state) {
    const theme = {};
    const allNames = [
      ...state.colors.keys(),
      ...state.typography.keys(),
      ...state.rounded.keys(),
      ...state.spacing.keys()
    ];
    for (const name of allNames) {
      if (!VALID_TOKEN_NAME.test(name)) {
        return {
          success: false,
          error: {
            code: "INVALID_TOKEN_NAME",
            message: `Token name "${name}" is not a valid CSS identifier for Tailwind v4 export (must match /^[a-zA-Z0-9][a-zA-Z0-9-]*$/).`
          }
        };
      }
    }
    if (state.colors.size > 0) {
      const colors = {};
      for (const [name, color] of state.colors) {
        colors[name] = color.hex;
      }
      theme.colors = colors;
    }
    const fontFamily = {};
    const fontSize = {};
    const lineHeight = {};
    const letterSpacing = {};
    const fontWeight = {};
    for (const [name, typo] of state.typography) {
      if (typo.fontFamily)
        fontFamily[name] = cssStringLiteral(typo.fontFamily);
      if (typo.fontSize)
        fontSize[name] = dimToString(typo.fontSize);
      if (typo.lineHeight)
        lineHeight[name] = dimToString(typo.lineHeight);
      if (typo.letterSpacing)
        letterSpacing[name] = dimToString(typo.letterSpacing);
      if (typo.fontWeight !== undefined)
        fontWeight[name] = String(typo.fontWeight);
    }
    if (Object.keys(fontFamily).length > 0)
      theme.fontFamily = fontFamily;
    if (Object.keys(fontSize).length > 0)
      theme.fontSize = fontSize;
    if (Object.keys(lineHeight).length > 0)
      theme.lineHeight = lineHeight;
    if (Object.keys(letterSpacing).length > 0)
      theme.letterSpacing = letterSpacing;
    if (Object.keys(fontWeight).length > 0)
      theme.fontWeight = fontWeight;
    if (state.rounded.size > 0) {
      theme.borderRadius = mapDimensions(state.rounded);
    }
    if (state.spacing.size > 0) {
      theme.spacing = mapDimensions(state.spacing);
    }
    return { success: true, data: { theme } };
  }
}
function mapDimensions(dims) {
  const out = {};
  for (const [name, dim] of dims) {
    out[name] = dimToString(dim);
  }
  return out;
}
function dimToString(dim) {
  return `${dim.value}${dim.unit}`;
}
function cssStringLiteral(value) {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/[\n\r\f]/g, (c) => `\\${c.charCodeAt(0).toString(16)} `)}"`;
}
// src/linter/tailwind/v4/serialize.ts
var CATEGORIES = [
  ["colors", "--color-"],
  ["fontFamily", "--font-"],
  ["fontSize", "--text-"],
  ["lineHeight", "--leading-"],
  ["letterSpacing", "--tracking-"],
  ["fontWeight", "--font-weight-"],
  ["borderRadius", "--radius-"],
  ["spacing", "--spacing-"]
];
function serializeToCss(data) {
  const lines = [];
  for (const [category, prefix] of CATEGORIES) {
    const entries = data[category];
    if (!entries)
      continue;
    for (const [name, value] of Object.entries(entries)) {
      lines.push(`  ${prefix}${name}: ${value};`);
    }
  }
  if (lines.length === 0)
    return `@theme {
}
`;
  return `@theme {
${lines.join(`
`)}
}
`;
}
// src/linter/dtcg/handler.ts
var DTCG_SCHEMA_URL = "https://www.designtokens.org/schemas/2025.10/format.json";

class DtcgEmitterHandler {
  execute(state) {
    const file = {
      $schema: DTCG_SCHEMA_URL
    };
    if (state.name || state.description) {
      file.$description = state.description || state.name;
    }
    const colorGroup = this.mapColors(state);
    if (colorGroup)
      file["color"] = colorGroup;
    const spacingGroup = this.mapDimensionGroup(state.spacing);
    if (spacingGroup)
      file["spacing"] = spacingGroup;
    const roundedGroup = this.mapDimensionGroup(state.rounded);
    if (roundedGroup)
      file["rounded"] = roundedGroup;
    const typographyGroup = this.mapTypography(state);
    if (typographyGroup)
      file["typography"] = typographyGroup;
    return { success: true, data: file };
  }
  mapColors(state) {
    if (state.colors.size === 0)
      return null;
    const group = { $type: "color" };
    for (const [name, color] of state.colors) {
      group[name] = {
        $value: this.colorToValue(color)
      };
    }
    return group;
  }
  colorToValue(color) {
    return {
      colorSpace: "srgb",
      components: [
        this.round(color.r / 255),
        this.round(color.g / 255),
        this.round(color.b / 255)
      ],
      hex: color.hex.toLowerCase()
    };
  }
  mapDimensionGroup(dims) {
    if (dims.size === 0)
      return null;
    const group = { $type: "dimension" };
    for (const [name, dim] of dims) {
      group[name] = {
        $value: this.dimToValue(dim)
      };
    }
    return group;
  }
  dimToValue(dim) {
    return { value: dim.value, unit: dim.unit };
  }
  mapTypography(state) {
    if (state.typography.size === 0)
      return null;
    const group = {};
    for (const [name, typo] of state.typography) {
      group[name] = {
        $type: "typography",
        $value: this.typographyToValue(typo)
      };
    }
    return group;
  }
  typographyToValue(typo) {
    const value = {};
    if (typo.fontFamily)
      value.fontFamily = typo.fontFamily;
    if (typo.fontSize)
      value.fontSize = this.dimToValue(typo.fontSize);
    if (typo.fontWeight !== undefined)
      value.fontWeight = typo.fontWeight;
    if (typo.letterSpacing)
      value.letterSpacing = this.dimToValue(typo.letterSpacing);
    if (typo.lineHeight) {
      value.lineHeight = typo.lineHeight.value;
    }
    return value;
  }
  round(n) {
    return Math.round(n * 1000) / 1000;
  }
}
// src/linter/css-vars/handler.ts
class CssVarsEmitterHandler {
  execute(state) {
    const declarations = [];
    for (const [name, color] of state.colors) {
      declarations.push({
        name: `color-${this.cssSafe(name)}`,
        value: color.hex.toLowerCase()
      });
    }
    this.mapDimensionGroup(declarations, "spacing", state.spacing);
    this.mapDimensionGroup(declarations, "rounded", state.rounded);
    return { success: true, data: { declarations } };
  }
  mapDimensionGroup(declarations, group, dims) {
    for (const [name, dim] of dims) {
      declarations.push({
        name: `${group}-${this.cssSafe(name)}`,
        value: this.dimToString(dim)
      });
    }
  }
  dimToString(dim) {
    return `${dim.value}${dim.unit}`;
  }
  cssSafe(name) {
    return name.replace(/\./g, "-");
  }
}
// src/linter/css-vars/serialize.ts
function serializeCssVars(declarations, options = {}) {
  const variablePrefix = options.prefix ? `${options.prefix}-` : "";
  const lines = declarations.map((declaration) => `  --${variablePrefix}${declaration.name}: ${declaration.value};`);
  if (lines.length === 0)
    return `:root {
}
`;
  return `:root {
${lines.join(`
`)}
}
`;
}
// src/linter/fixer/handler.ts
function fixSectionOrder(input) {
  const { sections } = input;
  const prelude = sections.find((s) => s.heading === "");
  const known = sections.filter((s) => {
    if (s.heading === "")
      return false;
    return CANONICAL_ORDER.includes(resolveAlias(s.heading));
  });
  const unknown = sections.filter((s) => {
    if (s.heading === "")
      return false;
    return !CANONICAL_ORDER.includes(resolveAlias(s.heading));
  });
  known.sort((a, b) => {
    return CANONICAL_ORDER.indexOf(resolveAlias(a.heading)) - CANONICAL_ORDER.indexOf(resolveAlias(b.heading));
  });
  const resultSections = [];
  if (prelude)
    resultSections.push(prelude);
  resultSections.push(...known);
  resultSections.push(...unknown);
  const fixedContent = resultSections.map((s) => s.content).join(`
`);
  const beforeOrder = sections.map((s) => s.heading).filter((h) => h !== "");
  const afterOrder = resultSections.map((s) => s.heading).filter((h) => h !== "");
  return {
    success: true,
    fixedContent,
    details: {
      beforeOrder,
      afterOrder
    }
  };
}
// src/index.ts
import { defineCommand as defineCommand5, runMain } from "citty";

// src/version.ts
import { readFileSync as readFileSync2 } from "node:fs";
import { resolve as resolve2, dirname as dirname2 } from "node:path";
import { fileURLToPath as fileURLToPath2 } from "node:url";
var VERSION = (() => {
  try {
    const currentDir = dirname2(fileURLToPath2(import.meta.url));
    const pkgPath = resolve2(currentDir, "../package.json");
    const pkg = JSON.parse(readFileSync2(pkgPath, "utf-8"));
    return pkg.version ?? "0.0.0";
  } catch {
    return "0.0.0";
  }
})();

// src/commands/lint.ts
import { defineCommand } from "citty";

// src/utils.ts
import { readFileSync as readFileSync3 } from "node:fs";

class FileReadError extends Error {
  filePath;
  code = "FILE_READ_ERROR";
  constructor(filePath, cause) {
    super(cause instanceof Error ? cause.message : String(cause), { cause });
    this.filePath = filePath;
    this.name = "FileReadError";
  }
  get friendlyMessage() {
    const errCode = this.cause?.code;
    if (errCode === "ENOENT") {
      return `"${this.filePath}" not found. Create a DESIGN.md file or pass "-" to read from stdin.`;
    }
    if (errCode === "EACCES") {
      return `"${this.filePath}" could not be read: permission denied.`;
    }
    return `"${this.filePath}" could not be read: ${this.message}`;
  }
}
async function readInput(filePath, stdin = process.stdin) {
  if (filePath === "-") {
    if (stdin.isTTY) {
      process.stderr.write(`Reading from stdin… Press Ctrl+D when done.
`);
    }
    const chunks = [];
    for await (const chunk of stdin) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks).toString("utf-8");
  }
  try {
    return readFileSync3(filePath, "utf-8");
  } catch (error) {
    throw new FileReadError(filePath, error);
  }
}
function formatOutput(data, args) {
  if (args.format === "markdown" || args.format === "md") {
    return formatAsMarkdown(data);
  }
  return JSON.stringify(data, null, 2);
}
function formatAsMarkdown(data) {
  if (typeof data !== "object" || data === null) {
    return String(data);
  }
  const obj = data;
  if (isLintOutput(obj)) {
    return formatLintAsMarkdown(obj);
  }
  let result = "";
  if (typeof obj.summary === "string") {
    result += `# ${obj.summary}

`;
  }
  if (obj.details) {
    result += `## Details

`;
    result += formatAsText(obj.details);
    result += `
`;
  }
  if (obj.patches && Array.isArray(obj.patches) && obj.patches.length > 0) {
    result += `## Patches

`;
    result += formatAsText(obj.patches);
    result += `
`;
  }
  return result || formatAsText(data);
}
function isLintOutput(obj) {
  if (!Array.isArray(obj.findings))
    return false;
  if (typeof obj.summary !== "object" || obj.summary === null)
    return false;
  const s = obj.summary;
  return typeof s.errors === "number" && typeof s.warnings === "number" && typeof s.infos === "number";
}
function formatLintAsMarkdown(obj) {
  const summary = obj.summary;
  const findings = obj.findings;
  let result = `# Lint Report

`;
  result += `**${summary.errors} errors**, **${summary.warnings} warnings**, **${summary.infos} infos**
`;
  if (findings.length > 0) {
    result += `
## Findings

`;
    for (const f of findings) {
      const location = f.path ? ` \`${f.path}\`:` : ":";
      result += `- **${f.severity}**${location} ${f.message}
`;
    }
  }
  return result;
}
function formatAsText(data, indent = 0) {
  if (data === null || data === undefined)
    return "null";
  if (typeof data === "string")
    return data;
  if (typeof data === "number" || typeof data === "boolean")
    return String(data);
  if (Array.isArray(data)) {
    return data.map((item) => `${"  ".repeat(indent)}- ${formatAsText(item, indent + 1)}`).join(`
`);
  }
  if (typeof data === "object") {
    return Object.entries(data).map(([key, val]) => {
      const valStr = typeof val === "object" && val !== null ? `
` + formatAsText(val, indent + 1) : " " + formatAsText(val, indent + 1);
      return `${"  ".repeat(indent)}${key}:${valStr}`;
    }).join(`
`);
  }
  return String(data);
}
function diffMaps(before, after) {
  const added = [];
  const removed = [];
  const modified = [];
  for (const key of after.keys()) {
    if (!before.has(key)) {
      added.push(key);
    } else if (JSON.stringify(before.get(key)) !== JSON.stringify(after.get(key))) {
      modified.push(key);
    }
  }
  for (const key of before.keys()) {
    if (!after.has(key)) {
      removed.push(key);
    }
  }
  return { added, removed, modified };
}

// src/commands/lint.ts
var lint_default = defineCommand({
  meta: {
    name: "lint",
    description: "Validate a DESIGN.md file for structural correctness."
  },
  args: {
    file: {
      type: "positional",
      description: 'Path to DESIGN.md (use "-" for stdin)',
      required: true
    },
    format: {
      type: "string",
      description: "Output format: json or text",
      default: "json"
    }
  },
  async run({ args }) {
    let content;
    try {
      content = await readInput(args.file);
    } catch (error) {
      if (error instanceof FileReadError) {
        process.stderr.write(`Error: ${error.friendlyMessage}
`);
        process.exitCode = 2;
        return;
      }
      throw error;
    }
    const report = lint(content);
    const output = {
      findings: report.findings,
      summary: report.summary
    };
    console.log(formatOutput(output, args));
    process.exitCode = report.summary.errors > 0 ? 1 : 0;
  }
});

// src/commands/diff.ts
import { defineCommand as defineCommand2 } from "citty";
var diff_default = defineCommand2({
  meta: {
    name: "diff",
    description: "Compare two DESIGN.md files and report changes."
  },
  args: {
    before: {
      type: "positional",
      description: 'Path to the "before" DESIGN.md',
      required: true
    },
    after: {
      type: "positional",
      description: 'Path to the "after" DESIGN.md',
      required: true
    },
    format: {
      type: "string",
      description: "Output format: json or text",
      default: "json"
    }
  },
  async run({ args }) {
    let beforeContent, afterContent;
    try {
      beforeContent = await readInput(args.before);
      afterContent = await readInput(args.after);
    } catch (error) {
      if (error instanceof FileReadError) {
        process.stderr.write(`Error: ${error.friendlyMessage}
`);
        process.exitCode = 2;
        return;
      }
      throw error;
    }
    const beforeReport = lint(beforeContent);
    const afterReport = lint(afterContent);
    const diff = {
      tokens: {
        colors: diffMaps(beforeReport.designSystem.colors, afterReport.designSystem.colors),
        typography: diffMaps(beforeReport.designSystem.typography, afterReport.designSystem.typography),
        rounded: diffMaps(beforeReport.designSystem.rounded, afterReport.designSystem.rounded),
        spacing: diffMaps(beforeReport.designSystem.spacing, afterReport.designSystem.spacing),
        components: diffMaps(serializeComponents(beforeReport.designSystem.components), serializeComponents(afterReport.designSystem.components))
      },
      findings: {
        before: beforeReport.summary,
        after: afterReport.summary,
        delta: {
          errors: afterReport.summary.errors - beforeReport.summary.errors,
          warnings: afterReport.summary.warnings - beforeReport.summary.warnings
        }
      },
      regression: afterReport.summary.errors > beforeReport.summary.errors || afterReport.summary.warnings > beforeReport.summary.warnings
    };
    console.log(formatOutput(diff, args));
    process.exitCode = diff.regression ? 1 : 0;
  }
});
function serializeComponents(components) {
  const result = new Map;
  for (const [name, comp] of components) {
    result.set(name, Object.fromEntries(comp.properties));
  }
  return result;
}

// src/commands/export.ts
import { defineCommand as defineCommand3 } from "citty";
var FORMATS = ["css-tailwind", "json-tailwind", "tailwind", "dtcg", "css-vars"];
var export_default = defineCommand3({
  meta: {
    name: "export",
    description: "Export DESIGN.md tokens to other formats. `css-tailwind` emits Tailwind v4 CSS @theme; `json-tailwind` emits Tailwind v3 theme.extend JSON; `tailwind` is an alias for `json-tailwind`; `dtcg` emits W3C Design Tokens; `css-vars` emits CSS custom properties."
  },
  args: {
    file: {
      type: "positional",
      description: 'Path to DESIGN.md (use "-" for stdin)',
      required: true
    },
    format: {
      type: "string",
      description: `Output format: ${FORMATS.join(", ")}`,
      required: true
    },
    prefix: {
      type: "string",
      description: "Optional CSS custom property prefix for css-vars output.",
      required: false
    }
  },
  async run({ args }) {
    const format = args.format;
    const prefix = typeof args.prefix === "string" ? args.prefix : undefined;
    if (!FORMATS.includes(format)) {
      console.error(JSON.stringify({
        error: "INVALID_FORMAT",
        message: `Invalid format "${format}". Valid formats: ${FORMATS.join(", ")}`
      }));
      process.exitCode = 1;
      return;
    }
    let content;
    try {
      content = await readInput(args.file);
    } catch (error) {
      if (error instanceof FileReadError) {
        process.stderr.write(`Error: ${error.friendlyMessage}
`);
        process.exitCode = 2;
        return;
      }
      throw error;
    }
    const report = lint(content);
    if (format === "css-tailwind") {
      const handler = new TailwindV4EmitterHandler;
      const result = handler.execute(report.designSystem);
      if (!result.success) {
        console.error(JSON.stringify({ error: result.error.code, message: result.error.message }));
        process.exitCode = 1;
        return;
      }
      process.stdout.write(serializeToCss(result.data.theme));
    } else if (format === "json-tailwind" || format === "tailwind") {
      const handler = new TailwindEmitterHandler;
      const result = handler.execute(report.designSystem);
      if (!result.success) {
        console.error(JSON.stringify({ error: result.error.code, message: result.error.message }));
        process.exitCode = 1;
        return;
      }
      console.log(JSON.stringify(result.data, null, 2));
    } else if (format === "dtcg") {
      const handler = new DtcgEmitterHandler;
      const result = handler.execute(report.designSystem);
      if (!result.success) {
        console.error(JSON.stringify({ error: result.error.code, message: result.error.message }));
        process.exitCode = 1;
        return;
      }
      console.log(JSON.stringify(result.data, null, 2));
    } else if (format === "css-vars") {
      const handler = new CssVarsEmitterHandler;
      const result = handler.execute(report.designSystem);
      if (!result.success) {
        console.error(JSON.stringify({ error: result.error.message }));
        process.exitCode = 1;
        return;
      }
      console.log(serializeCssVars(result.data.declarations, { prefix }));
    }
    process.exitCode = 0;
  }
});

// src/commands/spec.ts
import { defineCommand as defineCommand4 } from "citty";

// src/linter/spec-gen/spec-helpers.ts
import { readFileSync as readFileSync4 } from "node:fs";
import { resolve as resolve3, dirname as dirname3 } from "node:path";
import { fileURLToPath as fileURLToPath3 } from "node:url";
function getSpecContent(specPath) {
  if (specPath) {
    return readFileSync4(specPath, "utf-8");
  }
  const currentDir = dirname3(fileURLToPath3(import.meta.url));
  const bundledPath = resolve3(currentDir, "spec.md");
  try {
    return readFileSync4(bundledPath, "utf-8");
  } catch {
    const fallbackPath = resolve3(currentDir, "../linter/spec.md");
    try {
      return readFileSync4(fallbackPath, "utf-8");
    } catch {}
  }
  const devPath = resolve3(currentDir, "../../../../../docs/spec.md");
  try {
    return readFileSync4(devPath, "utf-8");
  } catch {
    throw new Error(`Failed to load spec.md.
` + `  Bundled path: ${bundledPath}
` + `  Dev path:     ${devPath}
` + `If running from a built bundle, ensure the build script copies docs/spec.md into dist/.`);
  }
}
function getRulesTable(rules) {
  let table = `| Rule | Severity | What it checks |
`;
  table += `|------|----------|----------------|
`;
  for (const rule of rules) {
    table += `| ${rule.name} | ${rule.severity} | ${rule.description} |
`;
  }
  return table;
}

// src/commands/spec.ts
var spec_default = defineCommand4({
  meta: {
    name: "spec",
    description: "Output the DESIGN.md format specification."
  },
  args: {
    rules: {
      type: "boolean",
      description: "Append the active linting rules table."
    },
    rulesOnly: {
      type: "boolean",
      description: "Output only the active linting rules table."
    },
    format: {
      type: "string",
      description: "Output format (markdown, json).",
      default: "markdown"
    }
  },
  async run({ args }) {
    const rulesTable = getRulesTable(DEFAULT_RULE_DESCRIPTORS);
    if (args.format === "json") {
      const jsonOutput = {};
      if (args.rulesOnly) {
        jsonOutput.rules = DEFAULT_RULE_DESCRIPTORS.map((r) => ({
          name: r.name,
          severity: r.severity,
          description: r.description
        }));
      } else {
        jsonOutput.spec = getSpecContent();
        if (args.rules) {
          jsonOutput.rules = DEFAULT_RULE_DESCRIPTORS.map((r) => ({
            name: r.name,
            severity: r.severity,
            description: r.description
          }));
        }
      }
      console.log(JSON.stringify(jsonOutput, null, 2));
      return;
    }
    if (args.rulesOnly) {
      console.log(rulesTable);
      return;
    }
    let output = getSpecContent();
    if (args.rules) {
      output += `

## Active Linting Rules

` + rulesTable;
    }
    console.log(output);
  }
});

// src/index.ts
var main = defineCommand5({
  meta: {
    name: "design.md",
    version: VERSION,
    description: "Agent-first CLI for DESIGN.md — the hands and eyes for design system work."
  },
  subCommands: {
    lint: lint_default,
    diff: diff_default,
    export: export_default,
    spec: spec_default
  }
});
runMain(main);
