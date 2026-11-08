# Reference lock

Author: opencode/designer subagent. Date: 2026-11-08. Session: local.

Eight screens read on 2026-11-08. Refero MCP was not available in this session and the shared `browse` seat was not installed, so these were read as live pages through a fetch/render pipeline rather than captured as images. That limits the evidence to structure, hierarchy and copy, not pixel finish. The rule column is what I am actually taking.

| # | Source | What it does | The rule I am taking |
|---|---|---|---|
| 1 | Distill, index, https://distill.pub/ | Lists every article as a dated column, with the review status set as a small label directly above the title. | The evidence label belongs with the work, immediately before the title, never in a legend at the top of the page. |
| 2 | Our World in Data, Artificial Intelligence, https://ourworldindata.org/artificial-intelligence | Opens with the argument, then 35 key charts, each carrying its own source, licence note and a position count. | One chart per claim, with source and date inside the figure, never a summary number whose provenance sits elsewhere. |
| 3 | arXiv, cs.AI recent, https://arxiv.org/list/cs.AI/recent | Every entry begins with its identifier and format links, before the title and authors. | The identifier comes first, so a reader can check the thing before deciding to read it. |
| 4 | GitHub, frankxai/frankx.ai-vercel-website, https://github.com/frankxai/frankx.ai-vercel-website | States what the repository is, a route table, a repository map, then the licence terms. | Inspection is the pitch: link the file tree instead of describing how open you are. |
| 5 | Linear, changelog, https://linear.app/changelog | Gives one dated entry real space and narrative, then runs a long, quiet, dated list underneath. | One story gets the room; everything else is a row with a date and no decoration. |
| 6 | Gwern.net, index, https://gwern.net/ | Declares its own state at the top (`status: in progress`, `confidence: log`) before any content. | The page states its own completeness rather than implying that it is finished. |
| 7 | Datasette, global-power-plants, https://datasette.io/global-power-plants | Puts licence, source, row count and the database download in the first screen. | If a dataset exists, its size, licence and download belong above the fold. |
| 8 | Simon Willison's Weblog, https://simonwillison.net/ | A dated stream where every item ends in tags and quoted material names its speaker. | Every item ends with the handles that let a reader follow it or verify it. |

## What I did not use

- Card grids of research thumbnails: none of the eight leads with images, and the brief puts the evidence first.
- Hero statistics bands: Our World in Data and Distill both bury counts inside content, so A's counters panel is the comp's one concession and is deliberately quiet.
- Sticky filter bars: Linear and arXiv filter by section or tag in navigation, not with a toolbar over the list. A's cards/table switch is a view control, not a filter, for that reason.
