# FrankX Skills & MCP Architecture
**Date**: December 15, 2025
**Purpose**: Comprehensive inventory and strategic organization of Claude Code skills, MCP servers, agents, and automation systems

---

## Executive Summary

You have **three distinct but overlapping systems** for AI augmentation:

1. **Claude Code Skills** - Specialized knowledge bases for Claude Code sessions
2. **MCP Servers** - Protocol-based integrations for AI-to-data connections
3. **Agent Personalities** - Named personas for different types of work

**Current State**: Scattered across multiple directories with significant duplication
**Recommended State**: Unified, purpose-driven architecture with clear separation of concerns

---

## Current Inventory

### 1. Claude Code Skills (`Claude Frankx Skills/`)

**Location**: `/mnt/c/Users/Frank/FrankX/Claude Frankx Skills/`

**Current Skills** (15 total):
- `arcanea-lore/` - Arcanea project knowledge
- `claude-sdk/` - Claude Agent SDK expertise
- `frankx-content/` - Content creation guidelines
- `frankx-daily-execution/` - Daily workflow assistance
- `greek-philosopher/` - Philosophical thinking mode
- `gym-training-expert/` - Exercise science (2025 research)
- `health-nutrition-expert/` - Nutrition science (2025 research)
- `langgraph-patterns/` - LangGraph workflow patterns
- `mcp-architecture/` - MCP server design
- `openai-agentkit/` - OpenAI Agents SDK
- `oracle-adk/` - Oracle Agent Development Kit
- `oracle-agent-spec/` - Oracle Open Agent Specification
- `spartan-warrior/` - Discipline and motivation mode

**Status**: ✅ Well-organized, but duplicate with `.claude-nextjs-skills/`

---

### 2. NextJS Skills (`.claude-nextjs-skills/`)

**Location**: `/mnt/c/Users/Frank/FrankX/.claude-nextjs-skills/`

**Contains** (25+ skills):
- All skills from `Claude Frankx Skills/` (duplicated)
- Additional Next.js-specific skills:
  - `nextjs-expert.md` - Next.js development expertise
  - `nextjs-agent-team.md` - Multi-agent coordination
  - `nextjs-upgrade-assistant.md` - Version migration
  - `nextjs-react-expert/` - React patterns
- Additional specialized skills:
  - `framer-expert/` - Framer design/development
  - `frankx-brand/` - Brand guidelines
  - `oci-services-expert/` - Oracle Cloud
  - `oracle-database-expert/` - Database design
  - `product-management-expert/` - PM frameworks
  - `social-media-strategy/` - Social content
  - `suno-ai-mastery/` - Music generation
  - `suno-prompt-architect/` - Suno prompt engineering
  - `ui-ux-design-expert/` - Design systems
  - `video-production-workflow/` - Video creation
  - `web-design-expert.md` - Web design

**Status**: ⚠️ Duplicate structure, but has additional skills

---

### 3. Agent Personalities (`agents/`)

**Location**: `/mnt/c/Users/Frank/FrankX/agents/`

**Current Agents** (4 defined):
- `claude.md` - Story & Resonance Lead (copywriting, storytelling)
- `codex.md` - Technical implementation
- `creator.md` - Creator-focused work (7,969 bytes - substantial)
- `strategist.md` - Strategic planning (6,178 bytes)

**Status**: ✅ Clean separation, but not integrated with skills system

---

### 4. MCP Servers (`automation/mcp-servers/`)

**Location**: `/mnt/c/Users/Frank/FrankX/automation/mcp-servers/`

**Status**: ⚠️ Empty directory - intended for custom MCP servers but not populated

**Available MCP Servers** (via Claude Code):
- `nano-banana` - Image generation (Gemini)
- `next-devtools` - Next.js development tools
- (Others may be configured in Claude Desktop)

---

### 5. Slash Commands (`.claude/commands/`)

**Location**: `/mnt/c/Users/Frank/FrankX/.claude/commands/`

**Current Commands** (30+ defined):
- `/review-content` - Content review workflow
- `/nextjs-deploy` - Deployment workflow
- `/frankx-ai-tech` - AI & tech content
- `/ux-design` - UX design workflow
- `/products-creation` - Product creation
- `/generate-social` - Social media generation
- `/mcp-status` - MCP server status
- `/classify-content` - Content routing
- `/frankx-book-conscious` - Spiritual fiction
- `/automation-dev` - Automation development
- `/oracle-work` - Oracle day job
- `/frankx-music` - Music production
- `/polish-content` - Content polishing
- `/frankx-golden-age-book` - Golden age books
- `/arcanea-dev` - Arcanea development
- `/council` - Superintelligent council
- `/arcanea-build` - Build diagnostics
- `/frankx-book-business` - Business books
- `/frankx-conscious` - Conscious content
- `/starlight-intelligence` - Strategic AI
- `/frankx-book-fantasy` - Fantasy writing
- `/frankx-personal-dev` - Personal development
- `/generate-images` - Image generation
- `/frankx-book-creator` - Creator books
- `/frankx-general` - General content

**Plus plugin commands**:
- `/agent-sdk-dev:new-sdk-app` - Agent SDK creation
- `/pr-review-toolkit:review-pr` - PR reviews
- `/commit-commands:*` - Git operations
- `/feature-dev:feature-dev` - Feature development
- `/code-review:code-review` - Code review

**Status**: ✅ Extensive and well-organized

---

## Analysis: Overlaps & Gaps

### Duplication Issues

**Problem 1: Two Skills Directories**
- `Claude Frankx Skills/` (15 skills)
- `.claude-nextjs-skills/` (25+ skills)
- **13 skills duplicated** between both locations

**Problem 2: Unclear Purpose**
- Skills are mixed: personal (gym, nutrition), technical (MCP, agents), business (Oracle)
- No clear organization principle

**Problem 3: Agent Personalities Separate**
- Agent personalities in `/agents/` don't reference skills
- No integration between "Claude the Story Lead" and the skills system

---

### Architectural Questions

**Question 1: What's the difference between a "skill" and an "agent"?**
- **Skill**: Domain knowledge (e.g., "MCP Architecture Expert")
- **Agent**: Personality + workflow (e.g., "Claude: Story & Resonance Lead")
- **Current Reality**: These are conflated

**Question 2: When should something be a skill vs slash command?**
- **Skill**: Reusable knowledge invoked dynamically
- **Slash Command**: Specific workflow with fixed steps
- **Current Reality**: Some commands do what skills should do

**Question 3: Where do custom MCP servers fit?**
- **Should be**: In `automation/mcp-servers/` with proper structure
- **Currently**: Empty directory, servers configured elsewhere

---

## Recommended Architecture

### Proposed Structure

```
/mnt/c/Users/Frank/FrankX/
│
├── .claude/                          # Claude Code configuration
│   ├── commands/                     # ✅ Keep as-is (slash commands)
│   └── settings.local.json          # ✅ Keep as-is
│
├── .claude-skills/                   # 🆕 UNIFIED skills directory
│   ├── README.md                    # Index of all skills
│   ├── SKILL_TEMPLATE.md            # Template for new skills
│   │
│   ├── technical/                   # Technical domain expertise
│   │   ├── mcp-architecture/
│   │   ├── claude-sdk/
│   │   ├── langgraph-patterns/
│   │   ├── openai-agentkit/
│   │   ├── oracle-adk/
│   │   ├── oracle-agent-spec/
│   │   ├── nextjs-expert/
│   │   ├── framer-expert/
│   │   └── ui-ux-design-expert/
│   │
│   ├── business/                    # Business domain expertise
│   │   ├── oracle-work/            # Oracle Cloud/consulting
│   │   ├── product-management/
│   │   └── social-media-strategy/
│   │
│   ├── creative/                    # Creative domain expertise
│   │   ├── frankx-brand/
│   │   ├── frankx-content/
│   │   ├── suno-ai-mastery/
│   │   ├── suno-prompt-architect/
│   │   └── video-production/
│   │
│   ├── personal/                    # Personal domain expertise
│   │   ├── greek-philosopher/
│   │   ├── spartan-warrior/
│   │   ├── gym-training-expert/
│   │   └── health-nutrition-expert/
│   │
│   └── projects/                    # Project-specific knowledge
│       ├── arcanea-lore/
│       └── frankx-daily-execution/
│
├── .claude-agents/                   # 🆕 Agent personality system
│   ├── README.md                    # Agent architecture docs
│   ├── AGENT_TEMPLATE.md            # Template for new agents
│   │
│   ├── claude.md                    # Story & Resonance Lead
│   ├── codex.md                     # Technical Implementation
│   ├── creator.md                   # Creator Intelligence Guide
│   ├── strategist.md                # Strategic Planning
│   │
│   └── councils/                    # Multi-agent councils
│       ├── superintelligent-council.md
│       └── creation-council.md
│
├── automation/
│   ├── mcp-servers/                 # 🆕 Custom MCP servers
│   │   ├── README.md               # MCP server docs
│   │   ├── frankx-content-mcp/     # Content CMS integration
│   │   ├── arcanea-db-mcp/         # Arcanea database
│   │   └── music-lab-mcp/          # Music library integration
│   │
│   └── agents/                      # 🆕 Autonomous agent scripts
│       ├── daily-workflow-agent/
│       └── content-processor-agent/
│
└── docs/
    └── FRANKX_SKILL_AND_MCP_ARCHITECTURE.md  # This document
```

---

## Category Definitions

### 1. **Skills** (`.claude-skills/`)

**Purpose**: Reusable domain expertise that Claude Code can invoke

**When to create a skill**:
- You need specialized knowledge repeatedly
- The knowledge is comprehensive (500+ words)
- It applies across multiple projects/contexts

**Structure**:
```
/technical/mcp-architecture/
├── SKILL.md           # Main knowledge base
├── examples/          # Code examples
└── references/        # External docs
```

**Example**: "MCP Architecture Expert" - when you need to design/build MCP servers

---

### 2. **Agents** (`.claude-agents/`)

**Purpose**: Named personalities with specific workflows and tones

**When to create an agent**:
- You need consistent personality/voice
- The agent has specific directives and priorities
- It coordinates across multiple skills

**Structure**:
```markdown
# Agent Name

## Mission
Clear statement of purpose

## Capabilities
What skills/tools this agent uses

## Personality
Voice, tone, style

## Directives
Specific instructions and priorities

## Skills Activated
- technical/nextjs-expert
- creative/frankx-brand
```

**Example**: "Claude: Story & Resonance Lead" - narrative voice + copywriting skills

---

### 3. **Slash Commands** (`.claude/commands/`)

**Purpose**: Fixed workflows with specific steps

**When to create a command**:
- Workflow has defined sequence
- Steps rarely change
- Often involves multiple tools/services

**Example**: `/review-content` - specific review workflow for content

---

### 4. **MCP Servers** (`automation/mcp-servers/`)

**Purpose**: Protocol-based integrations for AI-to-data

**When to create MCP server**:
- Need to expose data/APIs to AI
- Want reusable integration across AI tools
- Building custom data sources

**Example**: `frankx-content-mcp` - expose blog posts, products to any AI

---

## Migration Plan

### Phase 1: Consolidate Skills (1-2 hours)

**Goal**: Merge duplicate skills into unified structure

**Actions**:
1. Create `.claude-skills/` directory with categories
2. Move skills from `Claude Frankx Skills/` to appropriate categories
3. Move skills from `.claude-nextjs-skills/` (keep originals as backup)
4. Update SKILL.md files to reference new locations
5. Create `.claude-skills/README.md` with skill index

**Bash script**:
```bash
# Create new structure
mkdir -p .claude-skills/{technical,business,creative,personal,projects}

# Move technical skills
mv "Claude Frankx Skills/mcp-architecture" .claude-skills/technical/
mv "Claude Frankx Skills/claude-sdk" .claude-skills/technical/
# ... etc

# Archive old directories
mv "Claude Frankx Skills" .archive/old-skills-backup-$(date +%Y%m%d)
mv ".claude-nextjs-skills" .archive/nextjs-skills-backup-$(date +%Y%m%d)
```

---

### Phase 2: Restructure Agents (30 min)

**Goal**: Separate agent personalities from skills

**Actions**:
1. Create `.claude-agents/` directory
2. Move agent files from `agents/` to `.claude-agents/`
3. Add skill references to each agent
4. Create agent template

**Example updated agent**:
```markdown
# Claude - Story & Resonance Lead

## Mission
Voice of FrankX - narrative, essays, soul of content

## Skills Activated
- creative/frankx-brand
- creative/frankx-content
- creative/suno-prompt-architect (when music-related)

## Capabilities
- Copywriting (landing pages, emails)
- Storytelling (blog posts, books)
- Creative direction (visuals, mood)

## Personality
Cinematic, honest, hopeful. Musician, explorer, friend.
No corporate jargon. Words: Ritual, Artifact, Signal, Noise.

## Directives
1. Hook First - compelling start
2. Show Don't Tell - metaphors, examples
3. Rhythm - musical cadence, varied sentence length
```

---

### Phase 3: Build Custom MCP Servers (As needed)

**Goal**: Create reusable integrations for FrankX data

**Priority MCP Servers**:

**1. FrankX Content MCP** (Highest priority)
- Exposes blog posts, products, courses
- Allows AI to search/reference your content
- Prevents regenerating what you've already written

**2. Arcanea Database MCP** (If Arcanea needs it)
- Direct database queries
- Game data integration
- Player stats and progress

**3. Music Lab MCP** (For music workflows)
- Access to 500+ songs
- Metadata and prompts
- Suno integration

**Implementation**: Use MCP Architecture skill to guide development

---

## Decision Framework: Skill vs Agent vs Command vs MCP

### Use a **Skill** when:
- ✅ You need specialized knowledge repeatedly
- ✅ Content is educational/reference material
- ✅ Applies across contexts
- ❌ NOT personality-dependent
- ❌ NOT a fixed workflow

**Example**: "MCP Architecture Expert" - technical knowledge

---

### Use an **Agent** when:
- ✅ You need consistent personality/voice
- ✅ Coordinates multiple skills
- ✅ Has specific priorities and directives
- ❌ NOT just knowledge (that's a skill)
- ❌ NOT a one-time workflow

**Example**: "Claude: Story Lead" - personality + copywriting

---

### Use a **Slash Command** when:
- ✅ Fixed sequence of steps
- ✅ Combines multiple tools/services
- ✅ User triggers explicitly
- ❌ NOT reusable knowledge
- ❌ NOT variable based on context

**Example**: `/review-content` - specific workflow

---

### Use an **MCP Server** when:
- ✅ Need to expose data to AI
- ✅ Want reusable across AI tools
- ✅ Data changes frequently
- ❌ NOT static knowledge
- ❌ NOT just for Claude Code

**Example**: `frankx-content-mcp` - dynamic content access

---

## Examples: Applying the Framework

### Example 1: "I want AI to help with music production"

**Options**:
1. **Skill**: `creative/suno-ai-mastery/` - Suno expertise and patterns
2. **Agent**: "Frequency Alchemist" - personality for music creation
3. **Command**: `/frankx-music` - triggers music workflow
4. **MCP**: `music-lab-mcp` - exposes your 500+ songs to AI

**Recommended**:
- Use **Skill** for Suno knowledge
- Use **Agent** for creative music direction
- Use **Command** to trigger full production workflow
- Use **MCP** to reference existing music

---

### Example 2: "I want AI to understand Arcanea"

**Options**:
1. **Skill**: `projects/arcanea-lore/` - world building, game mechanics
2. **Agent**: "Arcanea Architect" - game design personality
3. **Command**: `/arcanea-dev` - development workflow
4. **MCP**: `arcanea-db-mcp` - live game database

**Recommended**:
- Use **Skill** for lore/design knowledge
- Use **Agent** for game design decisions
- Use **Command** for deployment workflow
- Use **MCP** for database queries

---

### Example 3: "I want AI to write in FrankX voice"

**Options**:
1. **Skill**: `creative/frankx-brand/` - brand guidelines
2. **Agent**: "Claude: Story Lead" - personality + voice
3. **Command**: `/polish-content` - editing workflow
4. **MCP**: `frankx-content-mcp` - existing content reference

**Recommended**:
- Use **Skill** for brand rules
- Use **Agent** for writing with personality
- Use **Command** for editing process
- Use **MCP** to avoid repeating yourself

---

## Plugin Marketplace: When & How

### Current State: NOT NEEDED YET

**Why**:
- You're organizing YOUR OWN skills/MCPs first
- Need foundation before opening to others
- Marketplace requires infrastructure + users

---

### Future State: "FrankX Intelligence Extensions"

**Timeline**:
- **Months 1-3**: Organize your own skills/MCPs (THIS DOCUMENT)
- **Months 4-6**: Build 5-10 exemplar MCP servers
- **Months 7-9**: Document "How to Build FrankX Extensions"
- **Months 10-12**: Open curated marketplace

**What You'd Offer**:
1. **FrankX Official Extensions** (you create)
   - Content Intelligence MCP
   - Music Lab MCP
   - Creator Workflow Skills

2. **Community Extensions** (others create)
   - Custom MCP servers for your platform
   - Specialized skills for niche use cases
   - Agent personalities for different industries

3. **Extension Marketplace Features**:
   - Discovery and search
   - Ratings and reviews
   - Automated installation
   - Version management
   - Revenue sharing (80/20 split)

---

### Marketplace Architecture (Future)

```
/app/extensions/
├── page.tsx                    # Marketplace homepage
├── [slug]/                     # Individual extension pages
│   └── page.tsx
├── browse/                     # Browse by category
├── submit/                     # Extension submission
└── api/
    ├── install/                # Extension installation
    ├── search/                 # Extension search
    └── analytics/              # Usage tracking

/automation/extension-registry/
├── schema.json                 # Extension manifest schema
├── approved/                   # Approved extensions
└── pending/                    # Pending review

Extension Manifest Example:
{
  "name": "Notion Creator Hub MCP",
  "type": "mcp-server",
  "category": "productivity",
  "author": "community-member",
  "version": "1.0.0",
  "description": "Connect AI to your Notion workspace",
  "install_command": "npx @frankx/mcp-notion",
  "configuration": { ... },
  "price": 0, // or 9.99
  "revenue_share": 0.80
}
```

---

## Immediate Next Steps

### Step 1: Audit & Document (30 min)
- [x] Create this document
- [ ] Review with Frank
- [ ] Decide on migration timeline

### Step 2: Consolidate Skills (1-2 hours)
- [ ] Create `.claude-skills/` structure
- [ ] Move and categorize skills
- [ ] Update references in commands
- [ ] Archive old directories
- [ ] Create skill index

### Step 3: Upgrade Agents (30 min)
- [ ] Create `.claude-agents/` directory
- [ ] Add skill references to agents
- [ ] Create agent template
- [ ] Document agent council pattern

### Step 4: Plan Custom MCPs (Research phase)
- [ ] List desired integrations
- [ ] Prioritize by impact
- [ ] Design first MCP (Content or Music Lab)
- [ ] Build and test

### Step 5: Document Patterns (Ongoing)
- [ ] Update CLAUDE.md with new structure
- [ ] Create skill development guide
- [ ] Create MCP development guide
- [ ] Build extension submission template (for future)

---

## Success Metrics

### Immediate (This Week)
- ✅ Unified skills directory structure
- ✅ No duplicate skills
- ✅ Clear agent-skill separation
- ✅ Documentation complete

### Short-term (This Month)
- 🎯 5+ skills actively used per week
- 🎯 2+ custom MCP servers operational
- 🎯 Agents reference skills consistently

### Long-term (This Quarter)
- 🎯 Extension marketplace design complete
- 🎯 3+ community members using your MCPs
- 🎯 Documentation becomes course content

---

## Questions for Frank

1. **Skill Consolidation**: Approve the `.claude-skills/` structure?
2. **Agent System**: Keep 4 main agents or expand?
3. **Priority MCPs**: Which should we build first (Content, Music Lab, Arcanea)?
4. **Marketplace Timeline**: When do you want to open to community?
5. **Public vs Private**: Which skills/MCPs should be open source?

---

## Conclusion

You have an impressive foundation of skills, agents, and automation. The current structure works but has duplication and unclear boundaries.

**The path forward**:
1. Consolidate into purpose-driven architecture
2. Build custom MCPs for your unique data
3. Document everything (it becomes content/courses)
4. Eventually open marketplace when you have users

**Key Insight**: Your skills/MCPs aren't just tools—they're **intellectual property** that become courses, consulting frameworks, and marketplace products.

**Next Action**: Review this doc, approve structure, execute Phase 1 consolidation.

---

*This document is living—update as architecture evolves.*
