# Book journey evidence

Issue [809](https://github.com/frankxai/frankx.ai-vercel-website/issues/809) owns free PDF delivery. The integration retains PR 810's implementation and the consent and Redis repairs already on main.

CI runs the production build in a disposable cloud runner, then follows the shelf, book, first chapter, next chapter, previous chapter and return-to-shelf journey at 1440, 768 and 375 pixels. The mobile pass requests reduced motion and uses touch navigation. It verifies the PDF link's keyboard focus, keyboard activation, interrupted-navigation recovery and server-rendered availability without JavaScript. Registered PDFs must redirect to their exact catalogued Blob destination, serve as PDF attachments and return HTTP 200. Unknown books, unknown files and priced products must retain their denial behavior.

Download the `book-journey-<revision>` artifact from the CI run. Each PNG has a `.vis.provenance.json` companion. `manifest.json` records the source revision, viewport, real URLs, checks and failures. A partial run retains completed screens and its failure. The artifact also contains generation and capture-feedback ledgers; importing captures into the estate requires appending those entries to the existing estate ledgers. Automated captures record no human taste preference.

The runner needs no application secrets and does not submit newsletter, purchase or email forms. The server runs with preview analytics behavior. It closes its browser and server after each run. This is evidence for the tested build; verify the accepted Vercel deployment separately before declaring production repaired.

The source journey map is [saved in FigJam](https://www.figma.com/board/5ycG7mAq4Qk5D7OxXBKrHw). Append reviewed captures with their revision and viewport to the corresponding states. Screenshots preserve visual evidence; use Figma's webpage capture when editable layers are needed. Figma Starter supports this mapping, while official Code Connect has a separate plan requirement. Keep component paths and Figma node IDs in the existing design authority's versioned mappings.

This pilot covers book reading and registered free PDF delivery. It does not establish full-site journey coverage, completed file transfers, screen-reader usability, human visual acceptance or conversion improvement.
