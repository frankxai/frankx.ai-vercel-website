import { NextResponse } from "next/server"
import { AGENT_RESULTS } from "@/components/agent-arena/GauntletMatrix"

export async function GET() {
  const data = {
    _schema: "https://frankx.ai/schemas/agent-arena-v1.json",
    _updated: "2026-08-25",
    _description: "FrankX Agent Arena: Standardized 5-Gauntlet Benchmark for Autonomous Coding Agents & Harnesses",
    gauntlets: [
      { id: "g1_build", name: "Gauntlet 1: Full-Stack Code Build", target: "Next.js 15 + Stripe Webhooks" },
      { id: "g2_debug", name: "Gauntlet 2: Adversarial Debugging", target: "Broken Docker Subnets & Deadlocks" },
      { id: "g3_memory", name: "Gauntlet 3: Context & Long-Horizon Memory", target: "40-Turn State Recall" },
      { id: "g4_mcp", name: "Gauntlet 4: MCP Tool Mesh Hygiene", target: "5 Disparate MCP Servers" },
      { id: "g5_costOutcome", name: "Gauntlet 5: Cost-per-Merged-Outcome", target: "Normalized Dollars Spent / PR" },
    ],
    contestants: AGENT_RESULTS,
    methodologyUrl: "https://frankx.ai/agent-arena#methodology",
    receiptsBase: "https://github.com/frankxai/starlight-evals/tree/main/rounds",
  }

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
    },
  })
}
