# Book experience revision

Implementation owner: Codex / OpenAI. Base: baea0d3f51e3e6aed77f7d389f21c1f11b5697e1.
Scope: existing public catalog, book landing pages and chapter reader. Owning quality programme: #706. Related proposals: #1082 (discovery study), #1097 (catalog counts and duplicate records). Preserve their intent without importing unrelated navigation changes.

## Reader and acceptance

A reader choosing a book needs an honest description, a readable cover, a clear edition status and a comfortable chapter page. The current desktop and 390px mobile catalog, Wordless Laws II landing and introduction were captured in the connected browser on 14 November 2026. Current failures: stale six-book headline, repeated registry records, ornamental light-only covers, low-contrast descriptions, unconditional PDF labels, no reading preferences.

## Three compared directions

| Direction | Composition | Type | Images and material | Interaction and motion |
|---|---|---|---|---|
| Reading room (selected) | Editorial masthead, featured physical jackets, searchable shelf, ruled chapter list | Existing Poppins display and Inter body; user-selectable Georgia reading face | Ink, linen weave, paper edge; original Nilo and Brio library scene | Local search and subject selection; quiet hover only; persistent reading settings |
| Cinema archive | Full-viewport still, one title at a time, sequential full-width scenes | Large sans title, compact mono metadata | Chapter stills with dramatic chiaroscuro | Scroll-led chapter reveals; reduced-motion static stills |
| Research desk | Dense index, evidence panels beside each excerpt | Compact sans headings, mono source identifiers | Annotated figures and source-page specimens | Evidence filters, expandable references; no ambient motion |

The reading room serves poetry, essays and fiction without turning every book into a product pitch. Cinema archive hides catalog breadth. Research desk is useful for individual evidence-heavy editions but misrepresents poetry. Selection is an implementation decision for a draft, not a human review attestation.

## Editorial boundaries

Shorten unsupported promises in the existing public summaries. Preserve all chapter URLs, author attribution, status and language variants. New titles are proposed editorial metadata; this does not rewrite downloaded historical PDFs or imply a new reviewed print edition. Book Two's introduction is revised in this branch; the remaining chapter manuscripts await source-by-source revision. Scientific rigor requires primary citations and contextual review, not a scientific-looking cover. Contemplative texts and Arcanea fiction remain identifiable as such.

## Character direction

Recovered Visual Studio index and Drive CAST-ATLAS.md identify Mini Frank, Nilo, Brio and Riff. Nilo has cream ceramic casing and camera eyes; Brio is copper, goggle-eyed, with one antenna. The original cast sheet was inspected before producing the reading-room scene. Queen selection remains unresolved. Vendor characters require their own asset/usage decisions; Claude and Codex must not be replaced with invented robots or presented as endorsers. New character art is an editorial candidate in this draft.

## Release conditions

Run repository type, lint, strict-language and build gates; verify catalog search/reset, all public book links, chapter rendering, 320/390px reflow, reading settings, blocked storage and reduced motion. Keep the PR draft until rendered evidence and a substantive different-provider review exist. A branch, generated illustration or test result is not a live deployment. Rollback is a revert; no account or database migration.

## Candidate provenance and verification

- All new/revised prose and code in this candidate were made with Codex / OpenAI. No human review attestation is recorded. Original author fields are preserved; generated prose does not assert autobiographical experiences.
- Book Two opening revision: `4f1bc5e52ec9f29bc82003589eb47f7ee44905f06fc8b8bf9d28a4f79a88c47b` (SHA-256). Its planning discussion was checked against the authors' University of Konstanz publication record and their NCI-hosted reference chapter. The NCI page identifies itself as no longer maintained. Other chapters' claims have not been source-verified by this revision.
- Reading-room illustration: `public/images/books/reading-room-nilo-brio-v1.webp`, SHA-256 `fc76af0575a70e18d4c5c28192b26b2df19d14604e0f1180b277a39b30f750c2`, 1536 × 1024, image/webp, 256148 bytes. Generated with the built-in image tool using the inspected original cast sheet as identity reference; a new scene, not an original character master. Review status: candidate.
- Illustration prompt: Nilo and Brio read one clothbound book together at an oak table in a late-night library; cream ceramic and black camera-eye Nilo, copper goggle-eyed Brio with one antenna and backpack; brass desk lamp, tactile linen jackets and fine paper, warm practical light and cool night shadows; preserve source silhouettes; no vendor characters, logos, holograms, glowing orbs or typography.
- Book Two cover illustration: `public/images/books/wordless-practice-nilo-brio-v1.webp`, SHA-256 `90a7dbb554422bf49de1357ffb809b4a16a26a0c991058cb86148320363a7597`, 1024 × 1536, image/webp, 173140 bytes. New candidate artwork generated from the same inspected cast sheet. Prompt: Nilo records a plan in a notebook while Brio places a wooden piece in a physical architectural model at an oak workbench; quiet ink-blue negative space above for editable jacket typography, copper desk lamp and raking practical light, original ceramic/copper silhouettes, no vendor characters, typography, holograms, orb, neon or fake scientific formulas. The new `coverTreatment` field preserves full illustration visibility independently of the default cloth treatment.
- Lockfile matched the existing local dependency tree byte-for-byte (`48166cd142da59cfd2274a5891ca28bda0e5fc4a7fd94fe0b5d20b68486eb762`). Reused that tree after installation exceeded memory. Installation-created workspace policy and file-mode changes were reverted.
- Full type-check and lint attempts exceeded sandbox memory (137; a 700 MB type-check attempt reached its heap limit). Scoped new component/type checking and book-directory lint passed. Full build completed prebuild, then was killed during production compilation (137). Do not report these full gates as passing.
- Existing reader and publication regression tests passed, rendering 187 available catalog chapters through the sanitizer with no missing manuscripts. New tests verify unique book IDs, existing chapter paths, subject/search intersection/reset and hostile/malformed reading-preference data.
- Local browser QA could not launch because Unix sockets are prohibited in this sandbox. The connected user browser cannot reach the sandbox's loopback service. Rendered candidate, preference persistence, reflow and accessibility checks remain open until a hosted preview can be inspected. No security or sandbox policy was weakened.
- The first cloud editorial audit rejected the introduction's closing metaphor as generic marketing framing. It was replaced with a concrete instruction to choose one observable commitment and record action. A slash-label review signal refers to arithmetic in the position-saving code, not visible copy.
- The first Git-sourced hosted preview reached READY at commit `17272f6f015c3e872e89ff0a80fb676f23b85737`; it demonstrates that candidate builds on Vercel's normal machine. Later cover/editorial changes require a fresh preview. The CI workflow's initial green result did not run the draft's full CI job; `ci:verify` was added to request it on the next source update. No human approval is implied.
