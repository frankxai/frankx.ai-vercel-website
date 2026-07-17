# Grok Imagine Playbook — FrankX Book Cover Lab
**Use when:** generating cover plates with Grok `/imagine`  
**Save root:** `C:/Users/frank/starlight/repos/frankx.ai-vercel-website/public/images/books/cover-labs/<slug>/`  
**Also mirror:** `C:/Users/frank/brands/image-system/frankx/book-covers/cover-labs/`

---

## Best-way prompt structure (Grok)

Grok Imagine responds best to **clear scene + constraints + exact save path** in one message.

```text
Use /imagine to create a FLAT premium book cover graphic, vertical 2:3 portrait, print-quality.

BOOK TYPE LOCK (render exactly, do not change):
TITLE: <TITLE>
SUBTITLE: <SUBTITLE>
AUTHOR: Frank Riemer

CRAFT:
- Field pattern (quiet, 3-12% visibility): <PATTERN>
- One object mark: <OBJECT>
- Material: cloth / lacquer / ivory paper / iron — craftsman bookbinding quality
- Designer school energy (do NOT print the designer's name): <SCHOOL>

HARD RULES:
- FLAT cover design, full bleed — NOT a 3D photo of a hardcover on a table
- No robots, no neural network node clichés, no crypto icons, no watermarks
- No people faces
- Title must be large and legible at thumbnail
- Author line must say exactly: Frank Riemer

Save the image to:
C:/Users/frank/starlight/repos/frankx.ai-vercel-website/public/images/books/cover-labs/<slug>/v0N-<channel>.jpg
```

---

## CLI pattern

```bash
grok --always-approve --cwd "C:/Users/frank/starlight/repos/frankx.ai-vercel-website" --output-format plain --single "Use /imagine ... Save to C:/Users/frank/starlight/repos/frankx.ai-vercel-website/public/images/books/cover-labs/fable/v01-clothbound.jpg"
```

For each book, open `cover-labs/<slug>/LAB.md` — every variant prompt is already expanded for NB; adapt the TYPOGRAPHY + SCENE blocks into the Grok template above.

---

## Channel quick map

| v | channel | Grok emphasis |
|---|---------|----------------|
| 01 | clothbound | linen cloth, gold foil stamp, micro emboss |
| 02 | symbol | one pure mark, void |
| 03 | conceptual | scale joke / hierarchy punch |
| 04 | atmospheric | weather of light, literary |
| 05 | poster | limited palette icon |
| 06 | lettering | title is the art |
| 07 | generative | single gold parametric form |
| 08 | quiet-white | ivory paper, black type |
| 09 | rebel | crop marks, industrial stamp |
| 10 | liquid-inlay | one lacquer metal object, craftsman |

---

## After Grok output

1. Confirm file exists at absolute path  
2. Vision QA: title exact? author exact? flat not 3D mock?  
3. If type wrong → keep plate as background, overlay type in Claude Design / Figma  
4. Log path in `results.json`  

---

## Why Grok first, Claude Design second

| Stage | Tool |
|-------|------|
| Atmospheric plate + material craft | Grok Imagine / NB |
| Exact type, series consistency, print wrap | Claude Design / Figma / Affinity |
| Web components | frankx.ai books theme |

Never ship hallucinated titles from raw gen.
