# AI-Powered Workflows with AFFiNE + MCP

Real-world workflow examples combining AFFiNE, Claude, and MCP servers for supercharged productivity.

## Table of Contents

1. [Knowledge Base Management](#knowledge-base-management)
2. [Project Planning & Execution](#project-planning--execution)
3. [Content Creation Workflows](#content-creation-workflows)
4. [Architecture & Diagramming](#architecture--diagramming)
5. [Cross-Platform Automation](#cross-platform-automation)

---

## Knowledge Base Management

### Workflow 1: Daily Notes + Task Extraction

**Goal**: Maintain daily notes in Obsidian, extract tasks to Plane

**Steps:**

1. **Morning**: Create daily note in Obsidian
   ```markdown
   # 2025-01-16

   ## Tasks
   - [ ] Review PR #123
   - [ ] Write blog post on MCP
   - [ ] Update AFFiNE roadmap

   ## Notes
   - Had idea for AI music feature...
   ```

2. **Ask Claude**:
   ```
   "Read my Obsidian daily note for today and create tasks in Plane project 'FrankX AI'"
   ```

3. **Claude will**:
   - Parse the daily note via Obsidian MCP
   - Extract tasks from checkboxes
   - Create issues in Plane via Plane MCP
   - Link back to Obsidian note in issue description

**Result**: Tasks synced from personal notes to project management.

---

### Workflow 2: Research Compilation

**Goal**: Gather web research into AFFiNE knowledge base

**Steps:**

1. **Ask Claude**:
   ```
   "Research 'Model Context Protocol best practices' and create an AFFiNE note with summary"
   ```

2. **Claude will**:
   - Search the web for MCP documentation
   - Synthesize key findings
   - Create structured Markdown in your vault
   - Add tags and frontmatter
   - Save to AFFiNE/Obsidian

**Result**: Organized research notes without manual copy-paste.

---

## Project Planning & Execution

### Workflow 3: Roadmap → Issues → Diagram

**Goal**: Convert high-level roadmap to actionable tasks with visual diagram

**Steps:**

1. **Create roadmap in AFFiNE**:
   ```
   Q1 2025 FrankX AI Roadmap
   - Voice synthesis integration
   - Vibe OS mobile app
   - AI Music Academy courses
   ```

2. **Ask Claude**:
   ```
   "Take my AFFiNE roadmap 'Q1 2025 FrankX AI Roadmap':
   1. Break into GitHub issues with estimates
   2. Create tasks in Plane
   3. Generate Excalidraw Gantt chart"
   ```

3. **Claude will**:
   - Parse roadmap structure
   - Create GitHub issues with labels/milestones
   - Create Plane tasks with cycles
   - Generate Excalidraw timeline diagram
   - Link all three platforms

**Result**: Complete project setup from single source of truth.

---

### Workflow 4: Sprint Planning

**Goal**: Plan next sprint based on current velocity

**Steps:**

1. **Ask Claude**:
   ```
   "Analyze my Plane workspace:
   - Review completed tasks from last sprint
   - Calculate velocity
   - Suggest tasks for next sprint
   - Create new sprint cycle in Plane
   - Update my Obsidian sprint planning note"
   ```

2. **Claude will**:
   - Pull Plane data via MCP
   - Calculate metrics
   - Recommend tasks
   - Create cycle
   - Document in Obsidian

**Result**: Data-driven sprint planning with full documentation.

---

## Content Creation Workflows

### Workflow 5: Blog Post Draft → Review → Publish

**Goal**: AI-assisted content creation with human review

**Steps:**

1. **Initial draft**:
   ```
   "Write a blog post about 'AI-Powered Knowledge Management with AFFiNE and MCP':
   - Save draft to Obsidian
   - Create outline in Excalidraw
   - Add to content calendar in Plane"
   ```

2. **Claude creates**:
   - Draft Markdown in Obsidian vault
   - Visual outline in Excalidraw
   - Task in Plane for review

3. **Review & Edit**:
   - Edit draft in Obsidian
   - Ask Claude: "Improve the section on MCP servers"

4. **Publish**:
   ```
   "Publish my blog post:
   - Convert Markdown to HTML
   - Generate meta tags
   - Create social media snippets
   - Mark Plane task complete"
   ```

**Result**: End-to-end content workflow with AI assistance.

---

### Workflow 6: Meeting Notes → Action Items

**Goal**: Extract action items from meeting transcripts

**Steps:**

1. **After meeting**: Paste transcript into AFFiNE/Obsidian

2. **Ask Claude**:
   ```
   "Analyze my meeting note 'Product Strategy 2025-01-16':
   - Extract action items
   - Assign to team members in Plane
   - Create follow-up tasks
   - Send summary via email"
   ```

3. **Claude will**:
   - Parse meeting notes
   - Identify action items
   - Create Plane issues with assignments
   - Generate summary

**Result**: Automatic task creation from unstructured notes.

---

## Architecture & Diagramming

### Workflow 7: Code → Architecture Diagram

**Goal**: Generate system diagrams from codebase

**Steps:**

1. **Ask Claude**:
   ```
   "Analyze my FrankX codebase and create an Excalidraw architecture diagram showing:
   - Frontend components (Next.js)
   - API routes
   - Supabase integration
   - External services (OpenAI, Suno)
   Save to diagrams/frankx-architecture.excalidraw"
   ```

2. **Claude will**:
   - Scan codebase structure
   - Identify key components
   - Generate Excalidraw diagram
   - Save to Git-tracked location

3. **Iterate**:
   ```
   "Update the diagram to show data flow for the AI music generation feature"
   ```

**Result**: Living architecture documentation synced with code.

---

### Workflow 8: Brainstorm → Mindmap

**Goal**: Visual brainstorming session

**Steps:**

1. **Start canvas**: Open http://localhost:3000 (Excalidraw)

2. **Ask Claude**:
   ```
   "Let's brainstorm features for Vibe OS 2.0.
   Create a mindmap in Excalidraw with main branches:
   - Core features
   - User experience
   - Monetization
   - Technical architecture"
   ```

3. **Collaborate**:
   - Claude generates initial mindmap
   - You add ideas visually or via chat
   - Claude updates diagram in real-time

4. **Export**:
   ```
   "Convert this mindmap to:
   - Markdown outline in Obsidian
   - Task list in Plane
   - GitHub project board"
   ```

**Result**: Visual brainstorm → actionable project structure.

---

## Cross-Platform Automation

### Workflow 9: GitHub → Plane → Docs

**Goal**: Sync development workflow across platforms

**Steps:**

1. **GitHub PR created**: Developer opens PR

2. **Ask Claude**:
   ```
   "New PR #456 'Add voice synthesis':
   - Update Plane task 'Voice Synthesis Integration' to 'In Review'
   - Create review checklist in Obsidian
   - Add PR link to AFFiNE roadmap
   - Update Excalidraw project board"
   ```

3. **Claude orchestrates**:
   - Plane MCP updates task status
   - Obsidian MCP creates review checklist
   - Excalidraw MCP moves card on kanban

**Result**: Single command syncs entire workflow.

---

### Workflow 10: Weekly Review Automation

**Goal**: Automated weekly productivity review

**Steps:**

1. **Friday afternoon**:
   ```
   "Generate my weekly review:
   - Completed tasks from Plane (last 7 days)
   - Notes created in Obsidian (this week)
   - GitHub commits and PRs
   - Create summary in AFFiNE
   - Generate metrics dashboard in Excalidraw
   - Email to myself"
   ```

2. **Claude compiles**:
   - Plane task data
   - Obsidian note count
   - GitHub activity
   - Creates visualizations
   - Saves review document

**Result**: Comprehensive weekly review with zero manual work.

---

## Advanced Workflows

### Workflow 11: AI-Powered Documentation

**Goal**: Keep documentation in sync with code changes

**Setup**: Git hook on commit

**Steps:**

1. **After code commit**:
   ```bash
   # .git/hooks/post-commit
   claude-cli "Code commit detected:
   - Analyze changed files
   - Update relevant Obsidian docs
   - Update architecture diagrams
   - Create Plane task if breaking changes"
   ```

2. **Claude automatically**:
   - Reviews diff
   - Updates documentation
   - Regenerates diagrams
   - Creates tasks for review

**Result**: Documentation never gets stale.

---

### Workflow 12: Customer Feedback → Product Roadmap

**Goal**: Systematically process user feedback

**Steps:**

1. **Receive feedback**: Email, Twitter, Discord, etc.

2. **Ask Claude**:
   ```
   "I received this customer feedback: [paste]

   Please:
   - Summarize key points
   - Check if similar requests exist in Plane
   - Add to 'Feature Requests' Obsidian note
   - Update priority on roadmap
   - Create Excalidraw impact/effort matrix"
   ```

3. **Claude processes**:
   - Extracts themes
   - Searches Plane for duplicates
   - Updates knowledge base
   - Visualizes priorities

**Result**: Customer-driven product development, fully tracked.

---

## Workflow Templates

### Template: Project Kickoff

```
"Start new project '[PROJECT_NAME]':
1. Create project in Plane
2. Create Obsidian folder with:
   - README.md
   - requirements.md
   - meeting-notes/
3. Create Excalidraw initial architecture diagram
4. Create GitHub repo
5. Link everything together
6. Generate project kickoff checklist"
```

### Template: Bug Triage

```
"Bug reported: [BUG_DESCRIPTION]

Please:
1. Create GitHub issue
2. Create Plane task in 'Bugs' project
3. Add to bug tracking Obsidian note
4. If critical, create Excalidraw incident timeline
5. Notify team via Slack (if MCP available)"
```

### Template: Learning Session

```
"I want to learn about [TOPIC]:
1. Research and compile resources
2. Create Obsidian learning note with structure
3. Create Excalidraw concept map
4. Generate practice exercises
5. Create Plane tasks for hands-on projects
6. Schedule in calendar"
```

---

## Tips for Effective Workflows

### 1. Be Specific with Claude

**Bad**:
```
"Update my tasks"
```

**Good**:
```
"Review my Plane project 'FrankX AI', mark completed tasks,
move in-progress tasks to next sprint, and update the
Excalidraw sprint board"
```

### 2. Chain Operations

Combine multiple MCP servers in one request:
```
"Create task in Plane, add note in Obsidian, draw diagram in Excalidraw"
```

### 3. Use Templates

Save common workflows as Obsidian templates or Claude slash commands.

### 4. Leverage Context

Claude can see your entire workspace:
```
"Based on my recent Obsidian notes, suggest Plane tasks for this week"
```

### 5. Iterate Visually

For diagrams:
```
"Create diagram" → Review → "Add authentication flow" → Review → "Export to PNG"
```

---

## Workflow Metrics

Track your productivity:

```
"Generate productivity report:
- Tasks completed (Plane)
- Notes created (Obsidian)
- Diagrams generated (Excalidraw)
- Time saved compared to manual workflows
Create Excalidraw dashboard"
```

---

## Next Steps

1. **Start small**: Pick one workflow to implement
2. **Customize**: Adapt examples to your specific needs
3. **Automate**: Set up recurring workflows with cron or GitHub Actions
4. **Share**: Document your own workflows for future reference

**Pro tip**: Ask Claude to help you design workflows specific to your work!

```
"I'm a [YOUR_ROLE] working on [YOUR_PROJECTS].
Design 3 custom workflows using AFFiNE + MCP that would
save me the most time."
```

---

Your AI-powered productivity system awaits! 🚀
