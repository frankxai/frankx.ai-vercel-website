# Character references for website agents

Start here before placing Mini Frank, Echo or another mini companion.

1. Read `public/media/characters.json` for the four existing public guide examples. Resolve a semantic key with `node scripts/resolve-character-media.mjs <key>`. The resolver checks the bytes and refuses scenes pending review.
2. For identity or a new scene, use the existing private coordination repository `frankxai/content-os`, `knowledge/media/README.md` and `knowledge/media/reference-index.json`, through an authorized GitHub connection. Its `character-reference-routes.json` covers the recovered cast, brand studies and source-canon references. That index points to recovered model sheets, the installed `mini-me-storyboard` reference bundle and existing private storage. If access is unavailable, report that missing access; do not substitute a guessed likeness.
3. Read the selected edition’s STYLE-BIBLE and latest owner corrections before generation. Nilo, Brio and Riff have no approved provider/model assignments. Echo scene studies do not establish core-cast canon. Do not average conflicting likeness editions.
4. Use a checked existing public path in the website, for example `/images/guides/mini-me/collection-02-01.svg`. Keep its original aspect ratio, write scene-specific alt text and preserve provenance. Existing publication does not make a scene an identity sheet or prove its teaching claims.
5. New private originals remain in the existing VIS workflow. Its authorized workstation owns the catalog writes. Use its accepted storage policy; the private hub records the R2 exception. Once release is approved, deliver the website derivative through the existing Vercel Blob manifest (`lib/blob-assets-manifest.json`, `lib/blob-cdn.ts`) or the established small-static-asset path. Record checksum, source, selected edition, rights and release decision before adding the public reference.

GitHub stores discovery instructions and versioned manifests. The existing DAM stores originals and provenance. Blob serves approved website derivatives. This public manifest is a projection of existing website files, not a replacement DAM or private inventory. Never copy private Drive/Library IDs, recovery URLs, credentials or unreleased model-sheet bytes into it.

Echo’s piano scene and song-brief poster are pending scene review for new placements. Their current guide URLs remain intact. The separate private lab’s timing exercise uses an exact diagram corresponding to its audio; its earlier boards are retained as review material.

Run `node scripts/resolve-character-media.mjs --check` after changing public examples. Hash changes require an actual review and manifest update. A missing or review-held key must fail visibly; there is no fallback to another character.
