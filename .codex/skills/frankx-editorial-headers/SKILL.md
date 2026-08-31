---
name: frankx-editorial-headers
description: Create, redesign, or review title-bearing editorial headers, article heroes, guide covers, and OG/social images for FrankX, Starlight, and Arcanea. Use when a user asks for a blog header, hero, cover, title or font on an image, brand or partner logos, social artwork, or a flagship editorial visual. Also use when a high-value article has decorative or text-free art that does not communicate its subject. Do not use for precise charts or data diagrams.
---

# FrankX Editorial Headers

Build a publication-grade editorial cover system, not a decorative image. The title is part of the composition, identity is exact, and the art explains the subject.

## Default contract

- On-page cover: generated, photographed, or illustrated art below; responsive live HTML title and exact SVG identity above. The title remains the page's single `h1`.
- Static OG/social cover: render the exact title, brand lockup, and any approved logos deterministically with HTML/CSS, Satori, SVG, or an equivalent layout engine.
- Never ask an image model to spell a headline or redraw a logo.
- A flagship article ships title-bearing desktop, mobile, and 1200×630 social treatments. A text-free hero is an explicit exception with a recorded reason.
- Use partner marks only when the subject requires them. Use official assets, record source and relationship, preserve clear space, and never imply endorsement.

Read [editorial-header-contract.md](references/editorial-header-contract.md) before producing a header. Read [brand-profiles.md](references/brand-profiles.md) when the target brand is known. For flagship work, read and update [benchmark-ledger.md](references/benchmark-ledger.md).

## Workflow

1. Route the work.
   - Assign `ESSENTIAL`, `EXPLAINER`, or `FLAGSHIP`.
   - Record brand, audience, article decision, desired reader feeling, and the visual job.
2. Audit the surface.
   - Capture the current desktop and mobile header before redesigning it.
   - State the failure in concrete terms: missing subject, weak hierarchy, unsafe crop, generic art, absent title, inaccurate logo, or illegible feed thumbnail.
3. Calibrate.
   - For `FLAGSHIP`, inspect four to six current publisher examples and record the URL, capture date, reusable principle, and what not to copy.
   - Keep references `reference-only` unless licensing explicitly permits reuse.
4. Produce exactly three materially different directions.
   - Change composition, information density, image-to-type ratio, and narrative posture—not merely color.
   - Name each direction and state its tradeoff.
   - Select one direction before implementation. If the user's brief already selects it, record that decision rather than blocking.
5. Build the two-layer cover.
   - Compose the art with a deliberate quiet field for type.
   - Add a contrast scrim, live title, deck, publisher lockup, optional editorial-reference mark, and a meaningful system rail or evidence label.
   - Set intentional line breaks; do not shrink a long title until it becomes timid.
6. Art-direct every rendition.
   - Desktop and mobile use different crop decisions.
   - OG/social exports bake exact type and marks into the raster or SVG.
   - Keep the same hierarchy, not necessarily the same coordinates.
7. Validate.
   - Create a header packet manifest and run `node scripts/validate-header-packet.mjs <manifest>` from the project root.
   - Inspect at desktop width, 390px mobile, and a 360×189 feed thumbnail.
   - Confirm one `h1`, readable contrast, safe crop, exact logo provenance, image dimensions, alt behavior, and reduced-motion neutrality.
8. Register and hand off.
   - Register on-page, mobile, OG, and social assets in the site's media registry when one exists.
   - Preserve the selected direction, benchmark ledger, typography sources, logo sources, and rejection reasons with the work.

## Quality gates

Reject the header when any of these are true:

- The image could accompany an unrelated AI article.
- The title is absent from a flagship cover or appears only as AI-generated pixels.
- The composition uses logo wallpaper, an invented mark, an unverified partner lockup, or language that implies sponsorship.
- Desktop simply center-crops to mobile.
- The title becomes unreadable at feed size, sits on a busy focal point, or wraps accidentally.
- Typography departs from the brand profile without a licensed, documented reason.
- Effects outnumber ideas: glow, border, blur, shadow, and gradient are stacked without a semantic job.
- The on-page cover duplicates the title in a second visual `h1`.

## Output

Return or persist:

- selected direction and two rejected directions;
- title, deck, eyebrow, and intentional line breaks;
- art source or generation prompt;
- font roles and license/source;
- logo asset, source, relationship, clear-space decision, and minimum size;
- desktop, mobile, OG, and requested social renditions;
- validated header packet and a short QA receipt.

Treat every correction as reusable evidence. Update the contract or a brand profile when a failure should not recur.
