import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    name: "jojo-hospitality-intelligence-kit",
    version: "0.1.0",
    releaseDate: "2026-06-25",
    publicPage: "https://frankx.ai/downloads/jojo-hospitality-intelligence-kit",
    checksumSha256:
      "901c4600d01fd74bda5b781cbb79d6c803d3669c70069e6d41349cf0a13dff8a",
    assets: [
      {
        name: "jojo-hospitality-intelligence-kit-v0.1.0.zip",
        url: "https://frankx.ai/downloads/jojo-hospitality-intelligence-kit-v0.1.0.zip",
        checksumSha256:
          "901c4600d01fd74bda5b781cbb79d6c803d3669c70069e6d41349cf0a13dff8a",
        checksumUrl:
          "https://frankx.ai/downloads/jojo-hospitality-intelligence-kit-v0.1.0.sha256",
      },
    ],
    install: {
      start:
        "Download the ZIP, copy the folder into a private workspace, then read README.md and 01-owner-operating-map.md.",
      acos:
        "Install ACOS only after one workflow proves useful: https://frankx.ai/downloads/preview/agentic-creator-os",
      github:
        "Private source of truth: frankxai/hospitality-intelligence-system.",
    },
    agents: [
      "booking-concierge-agent",
      "guest-memory-agent",
      "service-briefing-agent",
      "review-reputation-agent",
      "menu-story-agent",
      "event-arrangement-agent",
      "team-training-agent",
      "hotel-ops-steward",
    ],
    privacy:
      "Keep guest names, preferences, allergies, payment data, private notes, staff records, and internal operating details in private workspaces. Publish only approved, non-private patterns.",
  });
}
