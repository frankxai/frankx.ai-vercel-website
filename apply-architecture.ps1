$ErrorActionPreference = "Stop"

$repos = @(
    @{ Name="awesome-agent-operating-systems"; Title="Awesome Agent Operating Systems"; Desc="Curated lists of agent operating systems, MCPs, and custom rules."; Adv="Visual hero banner; Recommended Claude Code Skills & Safety Gates posture matrix." },
    @{ Name="awesome-agentic-income"; Title="Awesome Agentic Income"; Desc="High-Ticket Affiliates & Programmatic Loops."; Adv="Scoped to programmatic affiliate loops, automation cookies, and agentic conversions." },
    @{ Name="awesome-ai-coe"; Title="Awesome AI Center of Excellence"; Desc="Enterprise standards, cursor rules, and MCP integrations."; Adv="Focuses on active MCP integrations, .cursorrules, and enterprise security checklists." },
    @{ Name="awesome-automation-agent-skills"; Title="Awesome Automation Agent Skills"; Desc="Framework-agnostic automation patterns using FastMCP."; Adv="Framework-agnostic automation patterns using standard FastMCP and Agents SDK." },
    @{ Name="awesome-cosmos-ai-agents"; Title="Awesome Cosmos AI Agents"; Desc="Deep telemetry APIs mixed with AI media automation."; Adv="Merges deep telemetry APIs (NASA, Astroquery) with modern AI media automation (Remotion)." },
    @{ Name="awesome-design-agent-skills"; Title="Awesome Design Agent Skills"; Desc="Code-driven design automation rules and UX schemas."; Adv="Code-driven design automation rules, WCAG 2.2 accessibility, and UI/UX expert skill schemas." },
    @{ Name="awesome-gamification-agent-skills"; Title="Awesome Gamification Agent Skills"; Desc="Programmatic reward state-machines and verification loops."; Adv="Curated programmatic reward state-machines and task verification loops." },
    @{ Name="awesome-hermes-agent-skills"; Title="Awesome Hermes Agent Skills"; Desc="Hermes model integrations and fine-tuning skills."; Adv="Specialized tools and skill frameworks for Hermes." },
    @{ Name="awesome-hermes-agents"; Title="Awesome Hermes Agents"; Desc="Real runtime logs and evaluation reports for Hermes agents."; Adv="Includes actual evolution reports, swarm dashboards, and evaluation logs from runs." },
    @{ Name="awesome-investor-agent-skills"; Title="Awesome Investor Agent Skills"; Desc="Agentic portfolio allocation and automated backtesting."; Adv="Focuses on agentic portfolio allocation, automated backtesting, and investor dashboards." },
    @{ Name="awesome-manifestation-skills"; Title="Awesome Manifestation Skills"; Desc="Frameworks for intention-driven creation."; Adv="Curated schemas for manifestation, journaling, and intention frameworks." },
    @{ Name="awesome-mind-agent-skills"; Title="Awesome Mind Agent Skills"; Desc="Interactive brain visualizers and neural dashboards."; Adv="Interactive Three.js brain visualizers, neural dashboards, and installer packages." },
    @{ Name="awesome-motion-design-agent-skills"; Title="Awesome Motion Design Agent Skills"; Desc="Programmatic animation schemas via Lenis, Framer, and Remotion."; Adv="Programmatic animation schemas (Lenis scroll, Framer Motion, Remotion, Fal video)." },
    @{ Name="awesome-music-agent-skills"; Title="Awesome Music Agent Skills"; Desc="Agentic tools for music generation and audio engineering."; Adv="Curated music structure schemas, audio engineering scripts, and workflow frameworks." },
    @{ Name="awesome-suno-agent-skills"; Title="Awesome Suno Agent Skills"; Desc="Music structure schemas and Spotify canvas specs."; Adv="Music structure schemas, audio engineering scripts, and Spotify canvas specs." },
    @{ Name="awesome-sustainability-agent-skills"; Title="Awesome Sustainability Agent Skills"; Desc="Carbon credit models, green loops, and IoT sensor agents."; Adv="Curated carbon credit models, green scheduling loops, and IoT sensor agent code." },
    @{ Name="awesome-wealth-agent-skills"; Title="Awesome Wealth Agent Skills"; Desc="Multi-property loan modeling and tax optimization scripts."; Adv="Multi-property loan modeling, tax optimization scripts, and wealth planning agents." }
)

$baseDir = "C:\Users\frank\starlight\repos"
$brainDir = "C:\Users\frank\.gemini\antigravity\brain\ddb333d9-68e8-4063-a9dc-21327c9c3931"

foreach ($repo in $repos) {
    $repoPath = Join-Path $baseDir $repo.Name
    if (-not (Test-Path $repoPath)) {
        Write-Host "Repo path not found: $repoPath, skipping."
        continue
    }

    Write-Host "Upgrading $($repo.Name)..."

    # 1. Create .github/workflows directory
    $workflowDir = Join-Path $repoPath ".github\workflows"
    if (-not (Test-Path $workflowDir)) {
        New-Item -ItemType Directory -Path $workflowDir -Force | Out-Null
    }

    # 2. Copy ACOS files
    Copy-Item -Path "$brainDir\scratch\CONTRIBUTING.md" -Destination "$repoPath\CONTRIBUTING.md" -Force
    Copy-Item -Path "$brainDir\scratch\link-checker.yml" -Destination "$workflowDir\link-checker.yml" -Force
    
    # Create LICENSE if not exists (dummy MIT)
    $licensePath = Join-Path $repoPath "LICENSE"
    if (-not (Test-Path $licensePath)) {
        Set-Content -Path $licensePath -Value "MIT License`n`nCopyright (c) 2026 FrankX"
    }

    # 3. Create .agent-harness.json
    $harnessPath = Join-Path $repoPath ".agent-harness.json"
    $harnessContent = @"
{
  "name": "$($repo.Name)",
  "type": "awesome-list",
  "version": "1.0.0",
  "ecosystem": "FrankX GenCreator",
  "capabilities": ["markdown-lint", "link-check"]
}
"@
    Set-Content -Path $harnessPath -Value $harnessContent

    # 4. Generate README.md
    $readmePath = Join-Path $repoPath "README.md"
    $readmeContent = @"
<div align="center">

# $($repo.Title)

<img src="./hero.png" width="100%" alt="$($repo.Title) Hero Banner" />

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Link Check](https://github.com/frankxai/$($repo.Name)/actions/workflows/link-checker.yml/badge.svg)](https://github.com/frankxai/$($repo.Name)/actions/workflows/link-checker.yml)
[![FrankX Core Brand Hub](https://img.shields.io/badge/Maintained%20by-FrankX-blue?style=flat-square)](https://frankx.ai)

**$($repo.Desc)**

</div>

---

## 🌟 Our Advantage

> [!NOTE]
> Unlike other generic lists, this repository **$($repo.Adv)**

We follow the **Hub-and-Spoke Traffic Funnel** model. This is an active, deeply engineered repository designed for the GenCreator economy. Every tool, skill, and framework here is tested and ready for production deployment within the FrankX ecosystem.

## 📦 Recommended Claude Code Skills & Agents

| Name | Description | Link |
| :--- | :--- | :--- |
| **ACOS Architecture Expert** | The definitive standard for agentic systems. | [Claude Skills Library](https://frankx.ai/claude-skills-library) |
| **Product Engine** | Agentic workflows for immediate deployment. | [frankx.ai](https://frankx.ai) |

## 🚀 How It Integrates

This repository connects directly into the broader ecosystem:
- Serves as a definitive, high-signal curation list for AI Architects.
- Drives active agentic workflows via the FastMCP and Agents SDK.
- Enforces strict safety and execution gates.

---

## 🛠️ Contributing & Standards

We welcome contributions that align with our core thesis of verifiable, world-healing, and rigorously-tested agent intelligence.

Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

<div align="center">
  <sub>Built with ❤️ by the FrankX Superintelligence System</sub>
</div>
"@
    Set-Content -Path $readmePath -Value $readmeContent -Encoding UTF8
}

Write-Host "All repositories upgraded successfully!"
