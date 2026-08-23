# Local Spline MCP Scene Contract

Scene: The Agentic Experience Compiler  
Status: do not run until visual direction A, B, or C is approved  
Recommended direction: C — Scene Graph Ledger  
Authoring surface: Spline V2 desktop on macOS or Windows  
Agent surface: Codex/ChatGPT desktop or another supported local MCP client

## Preflight

1. Install and open the current Spline desktop app.
2. In Spline, open **Settings → MCP** and enable the selected AI client.
3. Restart the AI client so it reloads the MCP configuration.
4. Confirm that Spline tools appear under the `Spline` namespace and the app reports a connected or starts-on-use state.
5. Close unrelated Spline 3D tabs or explicitly focus the target tab. Multiple sessions route into the same running editor and the most recently focused matching tab.
6. Create an evidence folder outside normal Git history for screenshots, MCP summaries, and exports.
7. Record the Spline plan, starting AI-credit balance, client, model, date, machine, operating system, and Spline version.
8. Assign one writer session. Reviewers do not mutate the scene.

Stop if the local connection cannot be verified. Do not simulate a successful MCP run in the article.

## Non-negotiable production boundaries

- Build one scene from primitives and procedural/simple materials.
- Use no third-party model, HDRI, texture, font file, audio file, or community remix in v1.
- Use two lights maximum.
- Keep essential text, controls, CTA, accessibility, analytics, secrets, and canonical state outside the scene.
- Use Spline variables only for bounded visual state.
- Never place API keys, tokens, personal data, or customer data in the scene or Code tab.
- Create a simplified mobile state and a reduced-motion state.
- Use automatic WebGPU with WebGL fallback.
- Build exactly one embed for the article.
- Preserve the editable `.spline` source before export.

Internal targets for the first lab:

- compressed runtime target below 1.5 MB; hard stop at 3 MB;
- fewer than 45,000 triangles;
- no more than six materials;
- two lights maximum;
- at most one restrained post-processing effect;
- no autoplay on the article;
- one 2.0–2.6 second signature state transition after explicit activation.

These are FrankX production caps, not Spline platform limits. If the Performance Panel cannot expose a named metric, record it as unavailable rather than estimating it.

## Canonical object and state model

Create this hierarchy with stable, lowercase names:

```text
agentic_experience_compiler
├── environment
│   ├── background
│   ├── key_light
│   └── rim_light
├── core
│   ├── intent
│   └── diagnostic_shell
├── design_layer
│   ├── agent
│   ├── spline_hana
│   └── scene_graph
├── runtime_layer
│   └── nextjs
├── distribution_layer
│   ├── vercel
│   └── derivative_media
├── signal_paths
└── camera_rig
```

Create these scene states:

- `poster`
- `design`
- `runtime`
- `distribution`
- `complete`
- `mobile_poster`
- `reduced_motion`

Create these public visual variables:

- `mode`: `poster | design | runtime | distribution | complete`
- `active_node`: one of the named architecture nodes or `none`
- `motion_enabled`: boolean
- `activation_complete`: boolean

Expected external events:

- `scene_ready`
- `first_interaction`
- `mode_changed`
- `node_selected`
- `scene_completed`

## Direction module

Paste only the approved module into the first authoring prompt.

### Direction A — Agentic Orrery

Build an obsidian experience kernel with orbiting architectural plates. Use smoked glass, black chrome, and restrained emerald/cyan signal lines. The single signature action separates the governed layers into a legible spatial system. Do not use a galaxy, portal, brain, sacred geometry, uncontrolled particles, or continuous camera orbit.

### Direction B — Spatial Field Manual

Build a warm-ivory exploded isometric specimen with matte planes, pearl glass, graphite structure, and oxidized-teal signals. The single signature action separates the layers for inspection and then reassembles them. Do not simulate paper scraps, magazine decoration, vintage UI, or beige lifestyle minimalism.

### Direction C — Scene Graph Ledger

Build a matte-carbon architecture artifact with a clear diagnostic shell and restrained emerald/cyan signal paths. The object visibly assembles through Design, Runtime, and Distribution states while the parent HTML ledger narrates each step. Do not create terminal rain, fake code, hacker styling, glowing agent-node clutter, or unreadable labels inside the scene.

## Pass 1 prompt — structure

Paste the approved direction module after this prompt.

```text
You are the single writer for a production Spline scene named “The Agentic Experience Compiler.”

Create a new Spline 3D file from primitives only. Before editing, restate the object hierarchy, scene states, camera plan, mobile simplification, and the constraints you will preserve. Then build only the structure pass.

The scene explains this architecture: Intent is transformed by an Agent through Spline/Hana into an editable Scene Graph; Next.js owns the application runtime; Vercel owns preview, production, measurement, and rollback; Derivative Media represents the reusable output system.

Use the exact stable object names from the supplied scene contract. Create the poster, design, runtime, distribution, complete, mobile_poster, and reduced_motion states. Establish the desktop camera and a simplified mobile camera. Keep architecture labels external to the scene unless a short node label is required for object selection.

Do not add final materials, textures, post-processing, particles, or scene-local business logic in this pass. Use no external assets. Use two placeholder lights maximum.

When the hierarchy and composition are complete:
1. report every created object and state;
2. identify any deviation from the contract;
3. capture a desktop poster screenshot;
4. capture the design, runtime, distribution, and complete states;
5. capture the mobile poster state; and
6. stop for review.
```

Do not proceed automatically. The visual critic must approve structure or return a ranked defect list.

## Structure critique rubric

Score 1–5:

- the operating boundary is understandable without decorative labels;
- Intent remains the visual origin;
- Design, Runtime, and Distribution are distinct but belong to one system;
- the composition survives at 390px width;
- no layer appears more authoritative than Next.js/Vercel for application truth;
- the signature action has one obvious start and end;
- prohibited visual patterns are absent.

Fix only contract defects. Capture replacement screenshots and record the fix list.

## Pass 2 prompt — material and light

```text
Continue as the only writer on the approved structure. Do not rename objects, change the hierarchy, or add external assets.

Apply the approved visual direction with a maximum of six reusable material assets and two lights. Use procedural/simple materials. Preserve strong silhouette, legible depth, and enough contrast for the static poster. Use emissive color only as a signal of state or data flow, never as decorative glow.

Build the poster, design, runtime, distribution, complete, mobile_poster, and reduced_motion material states. The reduced-motion state must read as finished without continuous movement. Keep post-processing off unless one effect materially improves hierarchy; if used, name it and justify it.

When complete:
1. report the material and lighting inventory;
2. capture the same desktop and mobile state set;
3. identify any accessibility or contrast concern;
4. identify any performance concern introduced by materials or lighting; and
5. stop for review.
```

## Pass 3 prompt — interaction, performance, and export

```text
Continue as the only writer on the approved structure and material system.

Add bounded scene interactions:
- external mode changes for design, runtime, distribution, and complete;
- hover/tap selection for named nodes;
- a scene_ready signal;
- first_interaction, mode_changed, node_selected, and scene_completed signals where the selected export supports them;
- one explicit activation transition lasting approximately 2.0–2.6 seconds;
- a reduced-motion path using discrete states and opacity rather than continuous orbit;
- a simplified touch-safe mobile composition.

Do not add authentication, payment logic, API secrets, analytics SDKs, customer data, or canonical product state. Keep parent-page behavior outside Spline.

Open the Spline Performance Panel. Optimize polygons, object count, materials, lights, compression, and post-processing against the FrankX caps. Use automatic WebGPU/WebGL rendering. Remove hidden or redundant geometry and reuse components/material assets.

When complete:
1. report object, triangle/polygon, material, light, texture, post-process, and estimated export-size metrics available in the panel;
2. capture the Performance Panel;
3. capture desktop, mobile, and reduced-motion final states;
4. verify every public variable and external event;
5. save an editable .spline source snapshot;
6. generate a draft Viewer/runtime export, not Production;
7. export a 2400px hero master, a 1600px poster, a 1200x630 social card, and a GLB interchange file;
8. record unsupported or degraded GLB features;
9. do not promote the Spline draft to Production; and
10. stop for integration review.
```

## Evidence record

Create `mcp-call-summary.md` with:

```text
date:
spline_version:
client:
model:
machine_os:
direction:
starting_spline_credits:
ending_spline_credits:
credit_delta:
structure_pass_calls:
material_pass_calls:
interaction_pass_calls:
rework_calls:
total_calls:
elapsed_human_time:
elapsed_agent_time:
unavailable_metrics:
errors_and_retries:
human_decisions:
```

Do not paste secrets, raw personal prompts, credentials, or customer data into the record.

## Export and naming contract

Use version `v1` unless a prior production source exists.

```text
agentic-experience-compiler-v1.spline
agentic-experience-compiler-v1.splinecode
agentic-experience-compiler-v1.glb
spline-mcp-hero-v1-2400.png
spline-mcp-poster-v1-1600.webp
spline-mcp-og-v1-1200x630.png
spline-mcp-loop-v1-16x9.mp4
spline-mcp-loop-v1-9x16.mp4
```

For every binary, record:

- byte size;
- SHA-256 checksum;
- owner and creator;
- creation method;
- rights basis;
- source scene version;
- export settings;
- known limitations;
- alt text or descriptive equivalent;
- intended placements.

Upload large artifacts to Vercel Blob. Do not add them to normal Git history. Git stores the manifest, article, integration code, and semantic asset IDs.

## Integration handoff

Provide the Web Integrator:

1. Spline draft Viewer/runtime URL;
2. owned poster path;
3. final source and export manifest;
4. event and variable names;
5. desktop/mobile/reduced-motion screenshots;
6. Performance Panel capture;
7. GLB limitation record;
8. rollback poster and explanatory copy;
9. source archive download URL; and
10. a statement of every unmet acceptance criterion.

The integrator creates a Git branch and Vercel Preview. Neither the Spline draft nor the Git branch is promoted to production without human approval of the complete evidence set.
