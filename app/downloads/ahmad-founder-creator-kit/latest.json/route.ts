import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    name: "ahmad-founder-creator-kit",
    version: "0.1.0",
    releaseDate: "2026-06-26",
    publicPage: "https://frankx.ai/downloads/ahmad-founder-creator-kit",
    checksumSha256:
      "a6ecf681c0009f570c52840dbc7086d4ec2d93d2cb394f6b1ad421ab0c5bd745",
    assets: [
      {
        name: "ahmad-founder-creator-kit-v0.1.0.zip",
        url: "https://frankx.ai/downloads/ahmad-founder-creator-kit-v0.1.0.zip",
        checksumSha256:
          "a6ecf681c0009f570c52840dbc7086d4ec2d93d2cb394f6b1ad421ab0c5bd745",
        checksumUrl:
          "https://frankx.ai/downloads/ahmad-founder-creator-kit-v0.1.0.sha256",
      },
    ],
    install: {
      start:
        "Download the ZIP, copy the folder into a private workspace, then read README.md and 01-founder-operating-map.md.",
      acos:
        "Install ACOS only when Ahmad wants Codex or Claude to help run the workflows: https://frankx.ai/downloads/preview/agentic-creator-os",
      github:
        "Recommended future source of truth: frankxai/ahmad-founder-creator-kit. Hidden until the repo exists.",
      localLab:
        "Use install/ACOS-CODEX-CLAUDE-HERMES.md before adding OpenClaw, voice, or Hermes-style operator routines.",
    },
    agents: [
      "founder-chief-of-staff",
      "repo-accelerator",
      "openclaw-jarvis-operator",
      "swarm-operator",
      "content-strategist",
      "image-director",
      "video-producer",
      "carousel-publisher",
      "podcast-producer",
      "academy-architect",
      "growth-analyst",
      "brand-guardian",
    ],
    skills: ["ahmad-founder-creator-os"],
    privacy:
      "Keep private notes, credentials, client details, internal strategy, and local agent logs out of public pages. Publish only approved patterns and public-safe language.",
  });
}
