## Intent

Task or Frank's words this serves (link or quote), and the one outcome it should produce.

## Change

What changed and why this approach.

## Evidence

Commands run with results, preview URL, screenshots or measurements.

- Tests: `<N> pass, 0 fail` (command run: ...)
- Checks: lint / typecheck / build results, or why not run
- UI changes: screenshots committed under docs/design/<scope>/screens/ at 1440, 768, 390 px, or 'no UI change'
- Design lock: path to docs/design/<scope>/design-lock.md, or 'no UI change'
- Stacks on: #<PR> / <branch>, or 'main'
- Independent review: requested from <Cloudflare Starlight Review | Grok | Codex> on <head sha>
- Risk: what could break, and how it was checked

<!--
Only if this PR touches a protected surface (.github/protected-surfaces.json): copy the brief below OUT of this
comment and fill it in (text inside the comment is ignored by the Surface Guard check).
Kind: evolve (improve in place) or rearchitect (new structure; needs Frank's surface-approved label, re-applied
after any new commit).
Keeps: "job: how it survives" for every job of that surface, separated by ";". For the homepage the jobs are
identity, orientation, portfolio proof, founder relevance, human proof, trust, conversion. Example:
Keeps: identity: portrait and bio line unchanged; orientation: same section order; ...

### Surface change brief
Surface: homepage
Kind: evolve
Intent:
Keeps:
Changes:
Evidence:
-->
