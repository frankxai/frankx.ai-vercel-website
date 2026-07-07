# Verification Gate

## Must Pass
- Asset is stored in `public/images/social/frankx-loop-20260702/` or another explicit repo path.
- Source prompt is logged verbatim.
- Source image path from `C:/Users/frank/.codex/generated_images/...` is logged when available.
- FrankX brand pack is reflected: obsidian/graphite base, emerald/cyan tech signal, optional amber business signal, direct commercial clarity.
- Surface is clear: social square, social portrait, OG/wide, website hero, blog hero, or infographic frame.
- Actual export has been inspected.
- Score is recorded using the 30 point premium gate.

## Commands
```powershell
git status --short
Get-ChildItem -LiteralPath public/images/social/frankx-loop-20260702 -File
python C:\Users\frank\starlight\repos\design-agent-standards\scripts\validate_design_evidence.py docs/visual-loop/design-loop-evidence.frankx-image-loop-2026-07-02.json
```

## Manual Checks
- First read works in 3 seconds.
- No generic SaaS gradient, cute bot, generic brain, stock-photo laptop, random node/orbit cliche, or unreadable fake UI.
- Crop works for intended surface.
- Text is either absent or clean enough to publish.
- Image has a concrete metaphor tied to FrankX strategy, not only mood.
- Provenance is `generated-owned`.

## Reject If
- The subject is unclear or interchangeable with any AI brand.
- The asset depends on garbled text, fake UI, fake logos, or unsupported metrics.
- It cannot be inspected in the final crop.
- It scores below 22.
