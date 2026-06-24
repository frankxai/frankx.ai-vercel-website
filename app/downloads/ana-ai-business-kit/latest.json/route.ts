import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    name: "ana-ai-business-kit",
    version: "0.1.0",
    releaseDate: "2026-06-24",
    publicPage: "https://frankx.ai/downloads/ana-ai-business-kit",
    checksumSha256:
      "1a32030bb99f90f5b2a7c2d5dd82822ab7b686a59c105524dfcee5e52d0f979d",
    assets: [
      {
        name: "ana-ai-business-kit-v0.1.0.zip",
        url: "https://frankx.ai/downloads/ana-ai-business-kit-v0.1.0.zip",
        checksumSha256:
          "1a32030bb99f90f5b2a7c2d5dd82822ab7b686a59c105524dfcee5e52d0f979d",
        checksumUrl: "https://frankx.ai/downloads/ana-ai-business-kit-v0.1.0.sha256",
      },
    ],
    install: {
      start:
        "Download the ZIP, copy the folder into a private workspace, then read README.md and 01-offer-map.md.",
      acos:
        "Install ACOS only when Ana wants Codex or Claude to help run the workflows: https://frankx.ai/downloads/preview/agentic-creator-os",
      github:
        "Recommended future source of truth: frankxai/ana-ai-business-kit. Hidden until the repo exists.",
    },
    agents: [
      "mirror-agent",
      "research-curator",
      "library-cartographer",
      "blog-publisher",
      "workshop-architect",
      "brand-guardian",
      "offer-builder",
      "freedom-engine-steward",
    ],
    privacy:
      "Keep client names, notes, personal stories, and session records in private workspaces. Publish only approved patterns and public-safe language.",
  });
}
