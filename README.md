# FrankX.ai

This repository contains the public source for [frankx.ai](https://frankx.ai),
Frank Riemer's website for AI architecture, creative work, books, music, research,
and digital products. The site uses the Next.js App Router, React, TypeScript, and
Tailwind CSS.

The repository is public so people can inspect the source and report problems.
Public access does not make the site, its code, or its content open source. The
root [LICENSE](LICENSE) reserves rights unless an explicit separate license
applies to a file or package directory.

![FrankX website](public/images/readme-hero.png)

## Visit the site

These top-level routes are present in the current source:

| Area            | Link                                                           |
| --------------- | -------------------------------------------------------------- |
| Home            | [frankx.ai](https://frankx.ai)                                 |
| Research        | [frankx.ai/research](https://frankx.ai/research)               |
| AI architecture | [frankx.ai/ai-architecture](https://frankx.ai/ai-architecture) |
| Cloud AI        | [frankx.ai/cloud](https://frankx.ai/cloud)                     |
| Products        | [frankx.ai/products](https://frankx.ai/products)               |
| Blog            | [frankx.ai/blog](https://frankx.ai/blog)                       |
| Books           | [frankx.ai/books](https://frankx.ai/books)                     |
| Music lab       | [frankx.ai/music-lab](https://frankx.ai/music-lab)             |
| Resources       | [frankx.ai/resources](https://frankx.ai/resources)             |
| About           | [frankx.ai/about](https://frankx.ai/about)                     |

## Repository map

- `app/` contains pages, layouts, and route handlers.
- `components/` contains shared React components.
- `content/` contains editorial content used by the site.
- `data/` contains structured content registries.
- `lib/` contains application utilities and integrations.
- `public/` contains static assets.
- `docs/` contains architecture, content, and operating documentation.

For more detail, see [the content system](docs/content-system.md) and
[the site map](docs/site-map.md).

## Local development

This project uses pnpm. The package manager and available scripts are defined in
[`package.json`](package.json), and `pnpm-lock.yaml` is the lockfile.

```bash
pnpm install
pnpm dev
```

The development server is available at `http://localhost:3000` by default.

Run the focused code checks with:

```bash
pnpm run type-check
pnpm run lint
```

Run a production build with:

```bash
pnpm run build
```

## Contributing

Public [bug reports](https://github.com/frankxai/frankx.ai-vercel-website/issues/new?template=bug.yml)
and [documentation feedback](https://github.com/frankxai/frankx.ai-vercel-website/issues/new?template=documentation.yml)
are welcome. Code or content contributions require agreed terms with the
maintainers before submission. To propose one, email [hello@frankx.ai](mailto:hello@frankx.ai)
with the idea and ask about contribution terms before opening a pull request.
Read [AGENTS.md](AGENTS.md) before making changes; it documents the repository's
current checks and branch process.

Do not report security vulnerabilities in a public issue. Follow the private
reporting instructions in [SECURITY.md](SECURITY.md).

## Licensing

The root [LICENSE](LICENSE) reserves rights unless an explicit separate license
applies to a file or package directory. It does not grant a general right to
copy, modify, or redistribute this repository.

Some self-contained packages have separate license files. Their licenses apply
only within their respective package directories:

- [`benchmarks/context-rot`](benchmarks/context-rot/LICENSE)
- [`benchmarks/retrieval-miss`](benchmarks/retrieval-miss/LICENSE)
- [`benchmarks/runaway-loop`](benchmarks/runaway-loop/LICENSE)
- [`templates/agent-payments-guard`](templates/agent-payments-guard/LICENSE)
- [`templates/context-kit`](templates/context-kit/LICENSE)
- [`templates/mcp-server-kit`](templates/mcp-server-kit/LICENSE)
- [`templates/multi-agent`](templates/multi-agent/LICENSE)
- [`templates/rag-starter`](templates/rag-starter/LICENSE)
- [`templates/swarm-governance-starter`](templates/swarm-governance-starter/LICENSE)

Third-party dependencies and vendored tools remain subject to their own licenses.

<!-- kernel:start v160ca677 -->
## Agent operating guidance

Repository agents use the shared Starlight operating contract in `AGENTS.md` alongside local instructions.
The contract asks agents to establish a useful outcome, select relevant skills, complete authorized work,
verify current sources, refine the actual artifact, and report evidence and remaining gates.
It covers human agency, privacy, rights, resource stewardship and bounded proactivity.
Repository identity, brand, canon, build commands and release gates remain local.

[Pinned contract](https://github.com/frankxai/Starlight-Intelligence-System/blob/794db1e51a55a128816f7aa266eb0ac1dbd452c3/docs/architecture/agents-md/band-a.md)
· [Projection and verification](https://github.com/frankxai/Starlight-Intelligence-System/blob/794db1e51a55a128816f7aa266eb0ac1dbd452c3/docs/architecture/AGENTS-MD-CONTRACT.md)

These files supply operating guidance. They do not activate an agent, grant tool permissions,
schedule recurring work, certify compliance or prove a live capability.
<!-- kernel:end -->

The MIT notice above covers the Omotenashi Kernel only and does not relicense
this repository.
