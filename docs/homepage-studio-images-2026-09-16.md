# Homepage studio image restoration

## Decision and scope

The homepage's AI Architecture and Music Lab image URLs point to files absent from the production repository. A live browser confirmed a completed image request with `naturalWidth: 0`. Restore these images and clarify their click destinations inside the existing sections.

- User job: recognize architecture or music work and enter the relevant hub or guide.
- Classification: bounded media restoration and additive visual polish; no section reorder or replacement.
- Base revision: `932991358e7848496a5ec82f26e4adf852e8c033`.
- Related quality issue: #706. This repair does not complete that broader acquisition program.
- Maker: Codex. Independent review required before release.
- Generation: built-in image_gen, two original assets; no third-party reference images.
- Budget: two image generations, one implementation branch, one focused independent review; no dependency changes.
- Acceptance: both images decode, the image and primary CTA open the same hub, all six guide destinations remain available, reserved media dimensions prevent shifts, focus is visible, reduced motion disables hover transforms, release checks pass.
- Stop condition: a failed required release check or conflicting source change remains unresolved.

## Preservation matrix

| Value | Current evidence | Treatment | Result |
|---|---|---|---|
| Identity and voice | Existing hero and authored copy | No change | Preserved |
| AI architecture authority | Architecture hub and three guides | Original emerald architectural image; existing destinations | Improved |
| Music and creative proof | Featured release, Music Lab and three guides | Original amber studio image; existing destinations | Improved |
| Products and tools | ProductsTools | No change | Preserved |
| Books, library, articles | Existing three sections | No change | Preserved |
| Founder pathways | Hero, atlas, product routes | No change | Preserved |
| Human Layer boundaries | Existing routes and scope | No change | Preserved |
| Conversion and newsletter | Existing CTAs and forms | No change | Preserved |
| Accessibility and motion | Focus and reduced-motion classes | Clear image destination, stronger guide contrast, bounded CTA width | Improved |
| SEO and structured data | app/page.tsx | No change | Preserved |

## Visual and interaction decisions

Use complementary cinematic workspaces: graphite, glass and emerald light for architecture; piano, walnut and amber light for music. The generated scenes are conceptual illustrations, not photographs of Frank's actual facilities.

Remove the decorative numbered image markers and changing “Current path” caption. They suggest the image follows a selected guide, although it always opens the hub. Keep the three independent guide links and their analytics. Replace the overlay with a stable, visible destination label. Keep the images free of baked-in text.

## Recovery

Revert this isolated pull request to restore the previous markup. Retain all existing page URLs and keep the new image files versioned alongside the source so deployment cannot omit them.
