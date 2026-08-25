# Graph Engineering Research and Evidence Ledger

**Research cutoff:** 24 August 2026

**Source policy:** primary sources first—official product documentation, first-party engineering posts, original papers, and canonical repositories. Secondary pages were used only to inspect search intent, not to establish technical claims.

**Primary URL count:** 125 unique sources in this ledger. Published articles use the relevant subset rather than repeating the full inventory.

## Research verdict

“Graph engineering” is a credible emerging umbrella formalized in the 21 August 2026 survey/position paper [*Graph Engineering in the Era of LLM Agents: From Individual Intelligence to System Intelligence*](https://arxiv.org/abs/2608.21156) and its companion [Awesome Graph Engineering](https://github.com/DEEP-JLU/Awesome-Graph-Engineering) repository.

The underlying techniques are established:

- graph-structured reasoning;
- knowledge and retrieval graphs;
- DAG scheduling and parallel tool execution;
- finite-state workflows;
- multi-agent communication topologies;
- runtime state and provenance;
- fault and recovery graphs;
- offline workflow search;
- versioned agent self-improvement.

This survey’s **unified framing is new**. It has not been validated as one integrated discipline or a universal replacement for loop engineering.

The defensible editorial definition is:

> **Graph engineering is the discipline of making an agent system’s organization explicit, executable, observable, recoverable, and—under controlled evaluation—evolvable.**

It is not an Anthropic paper or an official Anthropic term.

## Evidence grades

| Grade | Meaning |
|---|---|
| A | Peer-reviewed empirical result or mature first-party production primitive, within the stated scope |
| B | Strong preprint, official implementation evidence, or credible benchmark with meaningful limitations |
| C | Design/position paper, early preview, small pilot, or unvalidated architectural claim |
| U | Unverified social claim or unsupported attribution |

Grades describe support for the narrow claim—not the general popularity or quality of a project.

## Conceptual lineage

The graph-engineering survey models an individual agent approximately as:

\[
A_i=\operatorname{Loop}(F_i,H_i;s_i^t)
\]

where \(F_i\) is the model, \(H_i\) the harness, and \(s_i^t\) evolving state. Its shorthand is effectively:

\[
\text{Agent}=\operatorname{Loop}(\text{LLM}+\text{Harness})
\]

A system is modeled as:

\[
\mathcal S^t=(\mathcal A^t,\mathcal R^t,\mathcal E^t,\Pi^t,\mathbf x^t)
\]

covering agents, resources, environment, coordination mechanisms, and system state.

The paper’s proposed evolution is cumulative rather than substitutive:

| Paradigm | Primary object | What it adds | What it cannot solve alone |
|---|---|---|---|
| Prompt engineering | Instruction/model interaction | Task framing and constraints | Durable state, tools, recovery |
| Context engineering | Information supplied to a model | Retrieval, evidence selection, context lifecycle | Execution authority and cross-node coordination |
| Harness engineering | Runtime around a model | Tools, memory, permissions, validators, observability | Organization among independent loops |
| Loop engineering | Stateful repeated action | Observe–reason–act–verify cycles, budgets, stop rules | Explicit parallelism and cross-agent dependencies |
| Graph engineering | Organization of components and loops | Task, workflow, agent, communication, state, and evolution structures | Truth, aligned values, causal certainty, or strong models automatically |

Treat this as the paper’s synthesis, not a universally accepted maturity ladder.

## Do not collapse these graph classes

| Graph class | Nodes and edges | Main purpose | Not equivalent to |
|---|---|---|---|
| Reasoning graph | Candidate thoughts and contribution/refinement relations | Structured inference | Agent orchestration |
| Knowledge/retrieval graph | Entities, claims, sources, temporal relations | Context assembly and global sensemaking | Workflow scheduling |
| Program/code graph | Files, symbols, calls, imports, dataflow | Repository navigation and impact analysis | Team topology |
| Task/workflow graph | Executable steps and dependencies | Routing, scheduling, gates, retries | Knowledge truth |
| Agent/communication graph | Roles, models, humans, message channels | Delegation, ownership, influence | Runtime history |
| State/provenance/recovery graph | Events, artifacts, versions, checkpoints, compensation | Traceability, replay, recovery | Causal proof |
| Ontology | Types, relations, authorities, evidence classes | Shared semantics and governance | Truth engine or value system |

The ontology defines the semantic model. Task, agent, and state graphs instantiate it. The runtime enforces transitions, permissions, validation, and recovery.

## Dynamic versus evolving

- **Static graph:** authored before execution.
- **Dynamic graph:** changes inside one execution through branching, spawning, pruning, rerouting, or replanning.
- **Evolving graph:** persists validated structural changes across executions.

Credible persistent evolution requires:

\[
\text{execute}\rightarrow\text{observe}\rightarrow
\text{structural credit assignment}\rightarrow
\text{propose mutation}\rightarrow
\text{validate}\rightarrow
\text{commit or rollback}
\]

That implies graph/version IDs, provenance, held-out evaluation, safety checks, replay, rollback, and separation of proposal from commit. Dynamic routing alone is not self-evolution.

## Official Anthropic/Claude evidence

### Terminology conclusion

No first-party Anthropic source reviewed uses graph engineering as an official doctrine. The truth-safe mapping is:

| Graph concept | Anthropic vocabulary |
|---|---|
| Runtime loop | Gather context → take action → verify → repeat |
| Worker nodes | Subagents or agent-team members |
| Edges | Delegation, messages, task outputs, pipeline data |
| Control flow | Workflows and dynamic workflows |
| Shared state | Files, Git, task lists, session event logs |
| Context policy | `CLAUDE.md`, rules, Skills |
| Capability boundary | Tools and MCP |
| Enforcement | Hooks, permissions, sandboxes |
| Quality | Evaluator–optimizer, tests, voting, adversarial review |
| Recovery | Checkpoints, commits, resumable sessions, external artifacts |

### Primary ledger

| Date | Source | Supported claim | Grade |
|---|---|---|---:|
| 2024-12-19 | [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | Distinguishes predefined workflows from autonomous agents; documents routing, parallelization, orchestrator-workers, evaluator–optimizer, and loops; recommends starting simple | A |
| 2025-06-13 | [Multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system) | Lead plans, delegates parallel subagents, and synthesizes; reports +90.2% on an internal research eval; about 15× chat token usage; best for broad parallel work | B—internal benchmark |
| 2025-09-29 | [Context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | Retrieve context just in time through paths, queries, links, and tools rather than preloading everything | A |
| 2025-11-26 | [Long-running harnesses](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) | Progress artifacts, feature-state files, commits, clean handoffs, smoke tests, and end-to-end verification preserve work across context windows | A |
| 2026-01-23 | [When to use multi-agent systems](https://claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them) | Start with one agent; multi-agent systems earn cost through context protection, true parallelism, or specialization; tests reported roughly 3–10× token use | B—first-party tests |
| 2026-02-05 | [Parallel Claude compiler experiment](https://www.anthropic.com/engineering/building-c-compiler) | 16 agents, ~2,000 sessions, ~$20k API spend; parallelism required separable work and still caused duplication/merge conflict | B—experiment |
| 2026-03-24 | [Harness design for long-running apps](https://www.anthropic.com/engineering/harness-design-long-running-apps) | Planner, generator and evaluator roles coordinate through structured artifacts and explicit criteria over multi-hour builds | A—design guidance |
| 2026-04-02 | [Agent Harness Design](https://claude.com/blog/harnessing-claudes-intelligence) | Defines the harness as loop, tools, context management and guardrails; better models can justify removing scaffolding | A |
| 2026-04-08 | [Scaling managed agents](https://www.anthropic.com/engineering/managed-agents) | Separate model brain, execution hands, and durable session event log; keep credentials outside sandbox | A |
| 2026-05-28 | [Introducing dynamic workflows](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code) | Current page marks task-specific workflow generation generally available and warns about higher token consumption | A |
| 2026-06-02 | [A harness for every task](https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code) | Claude Code authors/runs JavaScript workflows for classify/act, fan-out/synthesize, adversarial verification, generate/filter, tournaments, loop-until-done | A |
| 2026-06-30 | [Loop engineering](https://claude.com/blog/getting-started-with-loops) | Claude Code team defines loops as repeated cycles until a stop condition and names turn-based, goal-based, time-based and proactive loops | A |
| 2026-07-22 | [Verification loops with Skills](https://claude.com/blog/building-verification-loops-in-claude-code-with-skills) | Repeatable verification checks can be encoded as Skills and chained into end-to-end verification flows | A |
| 2026-07-24 | [New context-engineering rules](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models) | Anthropic reports removing more than 80% of Claude Code’s system prompt for newer models with no measured evaluation loss | B—first-party case |
| Live | [Dynamic workflows](https://code.claude.com/docs/en/workflows) | Script owns loops, branching, and intermediate results; up to 16 concurrent and 1,000 total agents per run; session-bound resumption and no ordinary mid-run input | A—capability, not recommendation |
| Live | [Agent teams](https://code.claude.com/docs/en/agent-teams) | Lead + peer sessions, shared task list, direct messages; experimental; start around 3–5 teammates; avoid same-file edits | A—experimental primitive |
| Live | [Subagents](https://code.claude.com/docs/en/sub-agents) | Isolated contexts, custom tools/permissions, optional Skills/memory; returns summaries to caller | A |
| Live | [Skills](https://code.claude.com/docs/en/skills) | On-demand `SKILL.md` procedures with scopes, optional forked context and tool restrictions | A |
| Live | [Memory and CLAUDE.md](https://code.claude.com/docs/en/memory) | Persistent context, not deterministic policy; keep concise and move procedures into Skills | A |
| Live | [Hooks](https://code.claude.com/docs/en/hooks-guide) | Deterministic lifecycle controls; command hooks safer than experimental agent-based hooks | A |
| Live | [Agent View](https://code.claude.com/docs/en/agent-view) | Local supervisor for independent background full sessions in worktrees; research preview | C—research preview |
| Live | [Cross-session messaging](https://code.claude.com/docs/en/cross-session-messaging) | Independent same-machine sessions can list and message one another; plain-text messages, not shared history or files | A |
| Live | [Secure Agent SDK deployment](https://code.claude.com/docs/en/agent-sdk/secure-deployment) | Sandbox, allowlist egress, least privilege, and keep credentials outside agent environment | A |

### Official Anthropic GitHub repositories

| Repository | Status on 24 August 2026 | Use |
|---|---|---|
| [anthropics/claude-code](https://github.com/anthropics/claude-code) | v2.1.241; public but all-rights-reserved, not an open-source CLI core | Product distribution, plugins, issues and release evidence |
| [claude-agent-sdk-typescript](https://github.com/anthropics/claude-agent-sdk-typescript) | v0.3.241 | Current TypeScript Agent SDK |
| [claude-agent-sdk-python](https://github.com/anthropics/claude-agent-sdk-python) | v0.2.143 | Current Python Agent SDK |
| [claude-code-action](https://github.com/anthropics/claude-code-action) | v1.0.201 | GitHub issue, review and implementation automation |
| [claude-code-security-review](https://github.com/anthropics/claude-code-security-review) | Active; README says it is not hardened against prompt injection | Trusted-PR review only |
| [skills](https://github.com/anthropics/skills) | Active examples | Skill authoring examples, not orchestration |
| [claude-cookbooks](https://github.com/anthropics/claude-cookbooks) | Active recipes | SDK, eval and multi-agent patterns |
| [agent-sdk-workshop](https://github.com/anthropics/agent-sdk-workshop) | Current workshop | Educational construction of tools, subagents, hooks and memory |
| [cwc-long-running-agents](https://github.com/anthropics/cwc-long-running-agents) | Event demo; explicitly not maintained | Evidence-contract and evaluator ideas, not a supported template |
| [riv2025 long-horizon demo](https://github.com/anthropics/riv2025-long-horizon-coding-agent-demo) | Archived 7 May 2026 | Historical reference only |

No official Anthropic graph-engineering repository was found.

## Official OpenAI/Codex evidence

| Source | Supported claim | Grade |
|---|---|---:|
| [Codex subagents](https://developers.openai.com/codex/agent-configuration/subagents) | Current Codex releases enable subagent workflows; parallel work helps read-heavy exploration/tests/triage; parallel write-heavy work risks conflicts; every subagent adds token use | A |
| [AGENTS.md](https://developers.openai.com/codex/agent-configuration/agents-md) | Codex layers global and repository instructions with closer path precedence | A |
| [Build Skills](https://developers.openai.com/codex/build-skills) | Skills use progressive disclosure and package `SKILL.md`, scripts, references, assets, and agent metadata; repository skills load from `.agents/skills` | A |
| [Codex SDK](https://developers.openai.com/codex/codex-sdk) | TypeScript and Python SDKs start, continue, and resume coding threads; Python exposes sandbox presets | A |
| [Codex App Server](https://developers.openai.com/codex/app-server) | Deep product integration for auth, history, approvals, and streamed events; Codex SDK preferred for jobs/CI | A |
| [Codex changelog](https://developers.openai.com/codex/changelog) | `codex mcp-server` deprecated on 2026-08-24; App Server is the current integration path | A |
| [Agents SDK orchestration](https://openai.github.io/openai-agents-js/guides/agents/#orchestration) | Handoffs transfer conversation ownership; agents-as-tools keep manager ownership; split specialists only when contracts/policies/tools differ | A |
| [Agents SDK tracing](https://openai.github.io/openai-agents-js/guides/tracing/) | Traces model calls, tools, handoffs, guardrails, and custom spans | A |
| [Agents SDK HITL](https://openai.github.io/openai-agents-js/guides/human-in-the-loop/) | Approval can pause consequential tool execution and resume serialized state | A |
| [Harness engineering](https://openai.com/index/harness-engineering/) | Humans steer, agents execute; team invests in environment, intent, and feedback loops; reported ~1,500 PRs with three engineers over five months | B—first-party case study |
| [OpenAI Symphony](https://github.com/openai/symphony) and [spec](https://github.com/openai/symphony/blob/main/SPEC.md) | Issue-to-agent supervisor with isolated workspaces, in-repo policy, observability; explicit engineering preview, not a general distributed scheduler | B/C—preview |

## Official Hermes, xAI, and Google evidence

| Platform | Supported claim | Boundary | Sources |
|---|---|---|---|
| Hermes Agent | Kanban is a durable SQLite task graph with named profile workers, dependencies, review, block/unblock, crash reclaim, comments, attachments, worktrees, idempotency keys, and APIs | Worker/fleet plane, not Temporal-style event replay | [Kanban](https://hermes-agent.nousresearch.com/docs/user-guide/features/kanban), [worker lanes](https://hermes-agent.nousresearch.com/docs/user-guide/features/kanban-worker-lanes), [delegation](https://hermes-agent.nousresearch.com/docs/user-guide/features/delegation), [API](https://hermes-agent.nousresearch.com/docs/user-guide/features/api-server) |
| Grok Build | Parallel coding subagents/worktrees, codebase graph indexing, planning/review gates, headless JSON and ACP | Coding graph, not a business workflow DSL | [Repo](https://github.com/xai-org/grok-build), [overview](https://docs.x.ai/build/overview), [launch](https://x.ai/news/grok-build-cli), [open source](https://x.ai/news/grok-build-open-source) |
| Antigravity SDK + ADK 2.0 | Antigravity is the coding orchestration surface; Google positions ADK 2.0 as the graph runtime once routing becomes explicit/complex | Do not imply identical state/durability guarantees | [Google I/O architecture](https://cloud.google.com/blog/topics/developers-practitioners/io26-news-for-agent-developers-on-google-cloud), [pipeline codelab](https://codelabs.developers.google.com/autonomous-ai-developer-pipelines-antigravity), [SDK](https://github.com/google-antigravity/antigravity-sdk-python) |

## Stanford 2026 evidence

Stanford supports the broader architectural shift, but no official source reviewed declares a Stanford discipline called graph engineering.

| Source | What it supports | What it does not support |
|---|---|---|
| [CS329Z: Engineering AI Agents](https://cs329z.stanford.edu/) | Tentative Fall 2026 course spanning compound systems, RAG, tools, loops, frameworks, memory, multi-agent systems, data, evaluation, safety and production | Not a certification; not yet delivered as of 24 August; not titled graph engineering |
| [M* SAIL article](https://ai.stanford.edu/blog/mstar/), [paper](https://arxiv.org/abs/2606.12688), [repo](https://github.com/mstar-project/mstar) | Component nodes, tensor edges, named Walk subgraphs, Sequential/Parallel/Loop/Streaming composition and logical/physical separation for composite multimodal serving | Not an agent workflow runtime; inter-model agentic serving is roadmap language |
| [SPRINT project](https://scalingintelligence.stanford.edu/pubs/sprint/), [paper](https://arxiv.org/abs/2506.05745), [repo](https://github.com/ShayanTalaei/SPRINT) | Dependency-DAG construction and concurrent execution for long reasoning traces; peer-reviewed at NeurIPS 2025 | Not durable multi-agent business state; repository has no license |
| [AgentFlow project](https://agentflow.stanford.edu/), [paper](https://arxiv.org/abs/2510.05592), [repo](https://github.com/lupantech/AgentFlow) | Planner, executor, verifier and generator coordinated by evolving memory and trained inside a live loop | Modular loop/MDP, not a graph formalism or durable scheduler |
| [Information-theoretic design](https://hazyresearch.stanford.edu/blog/2025-12-29-agentic-it), [paper](https://arxiv.org/abs/2512.21720), [repo](https://github.com/shizhehe/agentic-information-theory) | Principled communication and model-capacity allocation in hierarchical agent systems | Not arbitrary graph topology |
| [Archon project](https://scalingintelligence.stanford.edu/pubs/archon/), [paper](https://arxiv.org/abs/2409.15254), [repo](https://github.com/scalingintelligence/archon) | Search over layered inference architectures using generation, ranking, fusion, critique and verification | Not persistent runtime state; venue metadata is inconsistent, so cite as the 2024 preprint |
| [Meta-agent inefficiency preprint](https://arxiv.org/abs/2510.06711) | Negative evidence: automated agent-design search may fail to amortize its cost and can reduce behavioral diversity | Four-benchmark setup; do not universalize |
| [Correctness-gated workflow](https://cs.stanford.edu/people/brando9/2026/04/13/correctness-gated-multi-agent-workflow.html), [repo](https://github.com/brando90/agents-config) | Practical worktrees, modular context, multi-model review and formal-verification ideas | Personal Stanford-hosted article, not institutional policy or peer-reviewed evidence |

Exclusions:

- [Stanford Graph Learning Workshop](https://dsa.stanford.edu/events/conference/stanford-graph-learning-workshop-2026) concerns graph machine learning and relational models; it is not validation of agent workflow graph engineering.
- The social-media “Claude Certified Architect in six hours” claim does not describe CS329Z. Official Anthropic credentials require supervised, identity-verified exams; course attendance alone is not certification.

## Paper evidence ledger

### Foundation, reasoning, and retrieval

| Work | Contribution | Evidence | Caveat | Grade |
|---|---|---|---|---:|
| [ReAct](https://arxiv.org/abs/2210.03629) | Interleaves reasoning with actions/observations; canonical serial loop baseline | ICLR 2023 empirical evaluation | No explicit multi-ready scheduler or persistent graph | A |
| [Graph of Thoughts](https://arxiv.org/abs/2308.09687) / [code](https://github.com/spcl/graph-of-thoughts) | Graph nodes are thoughts; supports generate, aggregate, refine, rank, recur | AAAI 2024; reported ~62% improvement and >31% cost reduction on one sorting setup | Narrow tasks, older models, not multi-agent execution | A within scope |
| [Microsoft GraphRAG](https://arxiv.org/abs/2404.16130) / [project](https://www.microsoft.com/en-us/research/project/graphrag/) | Entity/relation graph + hierarchical community summaries for global questions | Two ~1M-token corpora; 125 questions per comparison | No gold answers; LLM judge; indexing cost; graph-free baseline sometimes competitive | B |
| [CodexGraph](https://arxiv.org/abs/2408.03910) | Code repository structural graph queried by an agent | NAACL 2025; several code benchmarks | Repository context interface, not scheduler | A within scope |
| [ARISE](https://arxiv.org/abs/2605.03117) / [code](https://github.com/FARD-Lab/ARISE) | Typed repository property graph with structural and intra-procedural dataflow tools | SWE-bench Lite host improvements and localization gains | Python only; mixed host results; more tokens; one patch per instance | B |

### Task, workflow, and state graphs

| Work | Contribution | Evidence | Caveat | Grade |
|---|---|---|---|---:|
| [LLMCompiler](https://arxiv.org/abs/2312.04511) / [code](https://github.com/SqueezeAILab/LLMCompiler) | Request → dataflow DAG; parallel dispatch and some replanning | ICML 2024; reported maxima up to 3.7× latency, 6.7× cost reduction, ~9pp accuracy | Maxima vary by task; no persistent state/governance | A within scope |
| [StateFlow](https://arxiv.org/abs/2403.11322) | Finite-state workflows separate process grounding from action execution | COLM 2024; gains on SQL, Bash, ALFWorld and lower reported API cost | Human-authored static FSM; narrow environments | A within scope |
| [TaskBench](https://arxiv.org/abs/2311.18760) / [code](https://github.com/microsoft/JARVIS/tree/main/taskbench) | Tool-graph benchmark for decomposition, selection, parameters | NeurIPS 2024; 17,331 generated samples | Synthetic; structural agreement ≠ safe execution | A benchmark |
| [WorFBench](https://arxiv.org/abs/2410.07869) / [code](https://github.com/zjunlp/WorFBench) | Graph-plan benchmark using subgraph matching | Shows gap between sequence and graph planning | Gold graph can penalize valid alternatives | B |
| [Plan-over-Graph](https://arxiv.org/abs/2502.14563) | Abstract task graphs and parallel execution plans | Preprint benchmark results | Planning only; no state/recovery/side-effect evidence | B |
| [Scheduler-Theoretic Graph Harness](https://arxiv.org/abs/2604.11378) | Immutable DAG plans, ready-set scheduling, contracts, bounded recovery | Design argument | No implementation or benchmark | C |
| [Agint](https://arxiv.org/abs/2511.19635) | Typed, effect-aware code DAG compiler/interpreter/runtime proposal | Workshop/design work | No quantitative evaluation; broader benchmarks deferred | C |
| [GraphFlow](https://arxiv.org/abs/2605.22566) | Global operation graph + task-specific subgraph selection + KV caching | ICML 2026; five benchmarks; reported ~4× memory reduction and +4.95pp average | Offline GPT-4o traces; constrained operations; not persistent evolution | A/B within setup |

### Agent and communication graphs

| Work | Contribution | Evidence | Caveat | Grade |
|---|---|---|---|---:|
| [GPTSwarm](https://arxiv.org/abs/2402.16823) / [code](https://github.com/metauto-ai/GPTSwarm) | Agent systems as computation DAGs; optimize edges/prompts | ICML 2024; several tasks | DAG-only; costly task-specific search; one run ~50M prompt tokens | A within scope |
| [DyLAN](https://arxiv.org/abs/2310.02170) / [code](https://github.com/SALT-NLP/DyLAN) | Dynamic team selection and early stopping via agent importance | COLM 2024; reported HumanEval/WebShop gains | Cost excludes some optimization; human-authored roles; adversarial pools fail | A within scope |
| [G-Designer](https://arxiv.org/abs/2410.11782) / [code](https://github.com/yanweiyue/GDesigner) | Learns sparse task-conditioned communication graphs | ICML 2025; six benchmarks; reported max 95.33% prompt-token reduction | Fixed five-agent pool; maximum claim; narrow robustness test | A within scope |
| [Graph-of-Agents](https://arxiv.org/abs/2604.17148) / [code](https://github.com/UNITES-Lab/GoA) | Select specialists then bidirectional message passing and pooling | ICLR 2026; six-model pool, three selected agents | Larger scale untested; selection relies on model cards/self-ranking | A/B |
| [MAST](https://arxiv.org/abs/2503.13657) / [data](https://github.com/multi-agent-systems-failure-taxonomy/MAST) | 14 multi-agent failure modes | NeurIPS 2025; 1,642 traces, seven systems | Observational, not causal; different tasks; much LLM annotation | A diagnostic evidence |

### Workflow search and evolution

| Work | Contribution | Evidence | Caveat | Grade |
|---|---|---|---|---:|
| [ADAS / Meta Agent Search](https://arxiv.org/abs/2408.08435) / [code](https://github.com/ShengranHu/ADAS) | Meta-agent writes and evaluates code-defined systems | ICLR 2025; several held-out QA tasks | Offline search; optimizes performance, not safety/cost/latency | A within scope |
| [AFlow](https://arxiv.org/abs/2410.10762) / [code](https://github.com/FoundationAgents/AFlow) | MCTS over code-represented workflows | ICLR 2025; six benchmarks | Search cost excluded from inference comparison; human operators | A within scope |
| [EvoFlow](https://arxiv.org/abs/2502.07373) / [code](https://github.com/bingreeky/EvoFlow) | Population evolution with retrieval/crossover/mutation and Pareto cost | Six benchmark families | Labeled benchmark feedback; not unsupervised continual deployment | B |
| [EvoMAC](https://arxiv.org/abs/2410.16946) | Test-time network revision using generated tests/environment feedback | 53 web/game tasks, 616 requirements, HumanEval | Per-task adaptation, small domain; tests can overfit | B |
| [Darwin Gödel Machine](https://arxiv.org/abs/2505.22954) / [code](https://github.com/jennyzzt/dgm) | Versioned self-modification with archive lineage and branching | ICLR 2026; SWE-bench improvements across runs | ~$22k/two weeks for one run; benchmark selection/leakage risk; coding only | A/B—strong but costly |

## Cross-paper conclusions

1. **Evidence is component-level.** No unified peer-reviewed benchmark validates the full task + agent + state + ontology + persistent-evolution stack.
2. **Graph value is conditional.** Structure helps when it matches real dependency, process, retrieval, or communication structure.
3. **Overhead is material.** Indexing, search, extra model calls, maintenance, generated supervision, and coordination are often omitted from headline cost comparisons.
4. **Sparse beats indiscriminate communication.** Several strong systems select or prune agents and edges rather than maximizing them.
5. **Dynamic is not evolving.** Runtime routing, offline design search, per-task adaptation, and persistent versioned evolution are different claims.
6. **Structural fidelity is not outcome correctness.** Matching a reference graph does not prove safe execution or correct side effects.
7. **Provenance is not causality.** Dependency and time help localize failure but do not establish semantic cause.
8. **Ontology is governance, not truth.** It can type claims and evidence; it cannot guarantee them.

## Ranked repository/runtime matrix

Rank by the job, not by stars. Versions and status were checked on 24 August 2026.

| Job | First choice | Call | Freshness and primary risk |
|---|---|---|---|
| Durable multi-day process | [Temporal](https://github.com/temporalio/temporal) | **Adopt** | Server v1.31.2; deterministic workflow and idempotent-activity discipline required |
| Typed stateful agent graph | [LangGraph](https://github.com/langchain-ai/langgraph) | **Adopt** | Core 1.2.11; node retries restart work, so side effects need idempotency |
| Google-native state graph | [ADK 2.0](https://github.com/google/adk-python) | **Pilot** | v2.7.1; GA but still young after a breaking 2.x redesign |
| Compact tool/handoff loop | [OpenAI Agents SDK](https://github.com/openai/openai-agents-python) | **Adopt** | v0.22.0 and pre-1.0; not a durable DAG runtime |
| GitHub automation | [GitHub Agentic Workflows](https://github.com/github/gh-aw) | **Pilot** | Public preview at v0.86.2; compiled Actions control plane, not a general app runtime |
| Ticket-to-code dispatch | [OpenAI Symphony](https://github.com/openai/symphony) | **Pilot** | v0.0.2 engineering preview; in-memory authoritative scheduler state |
| Autonomous worker fleet | [Hermes Agent](https://github.com/NousResearch/hermes-agent) | **Pilot** | v0.20.5; high churn, pin and verify a release |
| Evolving temporal memory | [Graphiti](https://github.com/getzep/graphiti) | **Pilot** | v0.29.3; extraction quality, schema drift and graph operations remain |
| Google coding harness | [Antigravity SDK](https://github.com/google-antigravity/antigravity-sdk-python) | **Pilot** | 0.1.x alpha; compiled/opaque inner harness and rapid churn |
| xAI coding harness | [Grok Build](https://github.com/xai-org/grok-build) | **Reference / bounded use** | No GitHub releases; public snapshot is synced from an internal monorepo |
| Multimodal model serving | [Stanford M*](https://github.com/mstar-project/mstar) | **Domain pilot / watch** | Active research runtime; model component graph, not agent control graph |
| Parallel-reasoning research | [SPRINT](https://github.com/ShayanTalaei/SPRINT) | **Watch** | No release or license file; no default reuse rights |
| Trainable planner research | [AgentFlow](https://github.com/lupantech/AgentFlow) | **Watch** | Research stack, not a durable production scheduler |
| Corpus GraphRAG | [Microsoft GraphRAG](https://github.com/microsoft/graphrag) | **Maintain/evaluate only** | v3.1.2, but repository says it is largely in maintenance mode |

Default production composition: **LangGraph for explicit state-graph semantics plus Temporal for durability**. In a Google-native estate, pilot **ADK 2.0 plus Temporal**. Use an SDK-only loop when the problem does not require graph state or durable recovery.

## Screenshot claim audit

| Claim visible in supplied examples | Verdict | Basis |
|---|---|---|
| “Anthropic leaked a $3.4M file” that creates a $120k/month engineering team in ten minutes | **U — unsupported / likely fabricated marketing** | No official Anthropic article, document, paper, release, or repository supports the artifact or valuation |
| “Five roles, zero hires, costs $0” | **False as stated** | Anthropic documents material token usage and a ~$20k compiler experiment; a free config file does not make model execution free |
| “Microsoft and Google have been using this file” | **U — unverified** | No first-party source found |
| “Graph Engineering: Opus 5 Edition” branded as an Anthropic/Boris Cherny field note | **U — likely unofficial or fabricated** | No matching official paper or document; Anthropic uses dynamic workflow/harness terminology |
| Free course automatically gives “official Claude Certified Architect” status | **Misleading/false** | Anthropic’s certification requires a supervised, identity-verified exam; attendance alone is not certification |
| “Anatoli Kopadze, Head of Claude Code” | **False attribution** | Official Anthropic materials identify [Boris Cherny](https://www.anthropic.com/webinars/claude-code-for-financial-services-boris-cherny) as Head of Claude Code |
| “85% of our engineers run dozens or hundreds of agents” | **U — unverified** | No first-party transcript, post, or documentation found |
| “Dozens to hundreds of agents” as a capability | **Verified with qualification** | Claude dynamic workflows support this scale of calls, with explicit caps; this is not a default or adoption statistic |

## Editorial truth rules

1. Call graph engineering an **emerging synthesis**, not an Anthropic invention.
2. Attribute vendor primitives using the vendor’s terminology.
3. Separate research-paper results from production guarantees.
4. Label internal benchmarks and headline maxima.
5. Never equate agent count with system intelligence.
6. Separate execution, context, code, communication, and provenance graphs.
7. Distinguish session state from durable workflow history.
8. Distinguish dynamic routing from persistent self-evolution.
9. Treat repository stars as volatile popularity signals—not evidence of reliability.
10. Require direct primary evidence for role titles, quotes, certifications, adoption percentages, and “leak” claims.

## Safe high-level claims

- Graph engineering extends loop engineering by organizing multiple loops, deterministic steps, state, evidence, and control.
- Explicit graphs can make dependencies, parallelism, permissions, recovery, and observability easier to reason about.
- Graphs help when their structure matches the task; they add overhead when it does not.
- Sparse, selective topologies have outperformed indiscriminate communication on cost and reliability in several studied settings; test the result on your workload.
- Production systems need durable external state and evidence; context compaction alone is not persistence.
- An ontology can govern meaning and evidence classes but cannot guarantee truth.
- Multi-agent scale is an optimization for separable work, not a maturity badge.
