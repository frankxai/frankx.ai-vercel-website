import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    name: "epicways-intelligence-starter-kit",
    version: "0.1.0",
    releaseDate: "2026-06-23",
    publicPage: "https://frankx.ai/downloads/epicways-intelligence",
    assets: [
      {
        name: "epicways-intelligence-starter-kit-v0.1.0.zip",
        url: "https://frankx.ai/downloads/epicways-intelligence-starter-kit-v0.1.0.zip",
        checksumSha256:
          "12af97a15ecf6af2c18b01345231a8d0288bf4ec31454a1c4b7183b3b2f6009c",
        checksumUrl:
          "https://frankx.ai/downloads/epicways-intelligence-starter-kit-v0.1.0.sha256",
      },
    ],
    install: {
      use: "Download the ZIP, copy the folder into a private workspace, then start with 01-client-signal-brief.md.",
      codexPlugin:
        "codex://plugins/epicways-intelligence?marketplacePath=C%3A%5CUsers%5Cfrank%5C.agents%5Cplugins%5Cmarketplace.json",
    },
    loops: ["signal", "shape", "room", "memory", "growth"],
    privacy:
      "Keep client notes, names, recordings, and internal tensions in controlled private workspaces.",
  });
}
