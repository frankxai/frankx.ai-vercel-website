# Agentic product development research candidate

The request is to replace thin research with decision-oriented evidence and improve discovery across the research estate. This candidate adds three linked dossiers at existing URLs:

| URL | Research question | Distinct scope |
| --- | --- | --- |
| `/research/agentic-product-development` | Which execution layer supports a complete product workflow? | Seven execution ecosystems, managed/local boundaries, protocols, acceptance contract and proposed workload experiment |
| `/research/coding-agents-full-stack` | What must a coding harness preserve and verify? | Repository work, long-session handover, browser acceptance, productivity evidence and release receipts |
| `/research/agentic-evals-swe-bench-trajectories` | What evidence justifies releasing the workload? | Benchmark validity, task denominators, study design, sustained execution and accepted-outcome economics |

The source review is directed, not a systematic review or exhaustive census. It checks selected current official interfaces and material empirical corrections as of 9 October 2026. Provider documentation establishes documented behavior; it does not prove comparative performance or customer success. The proposed evaluation contract has not been executed.

## Publication state

`data/research/dossier-candidates.json` is the server-only content model for preview review. It drives the three dossiers and preview hub discovery. Production cannot expose it: `canReviewDossiers` accepts a Vercel preview, or local development without a Vercel environment, and explicitly rejects production. All candidate metadata is noindex. The public source/approved-claim registries, sitemap and research feed remain held.

`scripts/check-research-publication.mjs` requires a named human reviewer and externally verified exact-revision review attestation. That requirement has not been satisfied and has not been weakened. Promotion must connect the reviewed material to that gate; copying candidate sources into the approved registry or toggling a preview flag is not a publication procedure.

`research-packet.json` applies the refined ACOS contract in HOLD/PREVIEW state. Discovery claims remain marked revise until their final wording/bindings receive acceptance. No first-party experiment is asserted. Source retrieval records retain observed date precision rather than invented clock times. Media reference inspection timestamps are separately recorded.

## Evidence and corrections

The product and coding dossiers use current OpenAI, Anthropic, Google ADK, LangGraph/Deep Agents, Vercel and Cloudflare documentation. MCP 2026-07-28, Agent Skills and A2A are treated as distinct interoperability boundaries. Availability, checkpoint semantics, side effects and data handling retain their documented limitations.

The evaluation companion preserves the selected 138-problem denominator in OpenAI's February SWE-bench audit and its July retraction of the SWE-Bench Pro recommendation. The METR early-2025 randomized study, compromised later experiment and 2026 self-report survey are interpreted separately. No leaderboard ranking or universal productivity multiplier is published.

The Google ADK graph and MCP demonstration have repository license bases; captions retain attribution and license links. The A2A figure uses the official documentation's stated Apache-2.0 license. The LangChain video is its official click-to-load YouTube embed. The OpenAI architecture figure remains link-only because no reuse basis was established. The MCP file was inspected with ffprobe: video stream only, 1280×454.

## Estate audit and expansion

`research-audit.json` enumerates 104 topic domains, nine auxiliary pages, seven hubs and three endpoints at production base `de765f28dcbc8a3249d212352a9decfd0bee791c`. It records implementation evidence, defects, related-route gaps, intent overlap and proposed research waves. This is a source/repository audit; it is not a claim that every live page was individually rendered.

103 domain routes were held placeholders. Existing unmounted generated claims are preserved as archival material and are not reactivated. The current proof wave covers the three P0 dossiers above. The next research wave covers MCP/tool execution, orchestration and sandbox/security; memory, telemetry and A2A follow. Each needs its own source method and publication review. The remaining topic domains are explicitly unfinished.

This change also removes the obsolete sourceCount filter that hid real topics, corrects the Visual Catalog canonical and per-topic social metadata, and marks the empty Architecture of Intelligence series as a proposed agenda. Its URL remains intact. The previous duplicate RSS export is preserved in `legacy-rss.xml`; the application route continues to own `/rss.xml`, and the old generator skips static emission when that route exists.

## Verification

Candidate integrity and production-isolation tests run through prebuild and merge checks. Independent source and website review receipts are attached. Conditional findings were applied: current ADK language support, use-step durability, Puppeteer-specific modal scope, reported-study labels, protocol citations, correct existing eval URL, privacy-enhanced video CSP and a consent panel that can grow on narrow screens.

Rendered screenshots, activated video behavior, keyboard navigation and deployment/source binding belong in the final release receipt. Performance field metrics, comparative benchmark results and human acceptance cannot be inferred from a build or screenshot. Open verification boundaries must remain explicit.
