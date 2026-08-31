# Connect authority journey — release receipt

Date: 2026-08-24  
Owner: Frank Riemer  
Route: `/connect`  
Linked surfaces in scope: `/partnerships`, `/investor`

## Release thesis

Replace the obsolete link hub with a relationship-first authority journey: one clear proposition, real documentary proof, inspectable work, and a direct human next step. Present Frank as an AI Architect who owns the judgment and result—not as a synthetic persona or a wall of equal-weight links.

## Direction gate

Exactly three directions were compared:

1. Working Intelligence — selected
2. Engineer's Atelier
3. Field Dossier

Working Intelligence won because it best combines operator authority, documentary evidence, and a low-friction conversation path without reading like a consultancy template or a personal portfolio.

## Visual evidence

- Before, desktop: `current-production-desktop-1920x1080.png`
- Before, mobile: `current-production-mobile-390x844-webshot.png`
- Selected direction: `direction-01-working-intelligence.png`
- Preview, Connect desktop: `preview-3b740d4-desktop-1920x1080.png`
- Preview, Connect mobile: `preview-3b740d4-mobile-390x844.png`
- Preview, Partnerships desktop: `preview-3b740d4-partnerships-desktop-1920x1080.png`
- Preview, Partnerships mobile: `preview-3b740d4-partnerships-mobile-390x844.png`
- Preview, Investor desktop: `preview-3b740d4-investor-desktop-1920x1080.png`
- Production, Connect desktop: `production-38f4f44-connect-desktop-1920x1080.png`
- Production, Connect mobile: `production-38f4f44-connect-mobile-390x844.png`
- Production, Partnerships desktop: `production-38f4f44-partnerships-desktop-1920x1080.png`
- Production, Partnerships mobile: `production-38f4f44-partnerships-mobile-390x844.png`
- Production, Investor desktop: `production-38f4f44-investor-desktop-1920x1080.png`

The visual preview predates only non-layout release fixes: the privacy-link capitalisation, JSON-LD type alignment, and explicit transition-property declarations.

## Verification

- TypeScript: pass
- ESLint, all changed files: pass
- Release foundation contract: 23/23 pass
- Mechanical web guidelines, all changed UI files: pass with zero warnings
- Contract Guard: pass
- Starlight design contract: pass
- Preview build: pass at commit `3b740d4`
- Preview route markers: pass for `/connect`, `/partnerships`, and `/investor`
- Owned portrait and workshop assets: HTTP 200
- Independent security reviewer: pass on the release candidate
- CI, Merge Gate, Media Guard, Contract Guard, mechanical interface gate, design contract, and Vercel preview: pass
- Release candidate: `ab7f398c9a93c03d3c56979a2a42c91881582272`
- Merged through PR #539
- Main merge commit: `38f4f44f36e78ff101afc183efd0d4092f6be712`

## Production gate

Complete.

- Production deployment: `dpl_8LQUfxVBAEKBZ26ZR5Fn3ML3XQAQ`
- Production commit: `38f4f44f36e78ff101afc183efd0d4092f6be712`
- Deployment state: READY with aliases `www.frankx.ai` and `frankx.ai`
- `/connect`, `/partnerships`, `/investor`, and every destination linked from Connect: HTTP 200
- Owned portrait and workshop image assets: HTTP 200 with valid image content types
- Production visual inspection: pass at 1920×1080 desktop and 390×844 mobile
- Production runtime logs: zero `error` or `fatal` entries in the post-deploy verification window
