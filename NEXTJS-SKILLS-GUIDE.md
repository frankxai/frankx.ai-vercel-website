# FrankX Next.js Skills Guide

## 🎯 Your Project Setup

**Current Status:**
- Next.js: 15.1.3 (Upgrade to 16 recommended)
- Location: C:\Users\Frank\FrankX
- Skills Available: ✅ Globally installed

## 🚀 How to Use in This Project

### Step 1: Upgrade to Next.js 16 (Recommended)

In Claude Code:
```bash
/skill nextjs-upgrade-assistant
```

This will guide you through upgrading FrankX to Next.js 16, enabling:
- Built-in MCP server access
- Partial Prerendering (PPR)
- Enhanced Server Actions
- Better performance optimizations

### Step 2: Start Development

```bash
cd "C:\Users\Frank\FrankX"
npm run dev
```

Once running, both MCP servers are active:
- ✅ next-devtools-mcp (documentation & codemods)
- ✅ Built-in Next.js MCP (real-time app insights)

### Step 3: Use Skills for Development

```bash
# Get expert help
/skill nextjs-expert
"How do I implement [feature] in FrankX?"

# Use agent team for complex tasks
/skill nextjs-agent-team
"Architecture Agent: Review FrankX structure"

# Optimize performance
/skill nextjs-agent-team
"Performance Agent: Audit FrankX"
```

## 📦 Available Skills

### 1. Next.js Expert (`/skill nextjs-expert`)
**Use for:**
- Building new features
- Debugging issues
- Learning patterns
- Code optimization

**Examples:**
```
"Add a contact form with Server Actions"
"Debug this hydration error in app/page.tsx"
"Optimize image loading in the blog"
"Add metadata for SEO to all pages"
```

### 2. Agent Team (`/skill nextjs-agent-team`)
**Use for:**
- Complete features
- Architecture decisions
- Multi-step processes
- Comprehensive audits

**Examples:**
```
"Build a newsletter subscription system"
"Architecture Agent: Design the new products section"
"Performance Agent: Full app optimization"
"Security Agent: Review authentication flow"
```

### 3. Upgrade Assistant (`/skill nextjs-upgrade-assistant`)
**Use for:**
- Migrating to Next.js 16
- Configuration updates
- Breaking change fixes
- Post-upgrade optimization

## 🎓 FrankX-Specific Use Cases

### Use Case 1: Add New Content Section
```bash
/skill nextjs-expert
"Create a new content section for [topic] using MDX and Server Components,
following FrankX's existing patterns in /app/"
```

### Use Case 2: Optimize Existing Pages
```bash
/skill nextjs-agent-team
"Performance Agent: Analyze FrankX performance and suggest optimizations
for Core Web Vitals"
```

### Use Case 3: Add Interactive Features
```bash
/skill nextjs-expert
"Add an interactive [feature] that works with FrankX's theme system
(next-themes with dark mode)"
```

### Use Case 4: Improve SEO
```bash
/skill nextjs-expert
"Enhance metadata and OpenGraph tags for better SEO across all FrankX pages"
```

## 🔧 FrankX Configuration Notes

Your project uses:
- **Framework:** Next.js 15.1.3 (App Router)
- **Styling:** Tailwind CSS + Framer Motion
- **Themes:** next-themes (dark mode)
- **Content:** MDX with gray-matter
- **Icons:** Lucide React

Skills are aware of these and will provide compatible solutions.

## 📊 Development Workflow

### Daily Development
1. Start dev server: `npm run dev`
2. Invoke skill: `/skill nextjs-expert`
3. Describe task or issue
4. Implement suggested solution
5. Skills automatically query MCP servers for context

### Feature Development
1. Plan: `/skill nextjs-agent-team` with Architecture Agent
2. Implement: `/skill nextjs-expert` for coding
3. Style: `/skill nextjs-agent-team` with UI/UX Agent
4. Test: `/skill nextjs-agent-team` with Testing Agent
5. Document: `/skill nextjs-agent-team` with Documentation Agent

### Performance Review
1. Audit: `/skill nextjs-agent-team` → "Performance Agent: full audit"
2. Fix issues: Follow Performance Agent recommendations
3. Verify: Re-run audit to confirm improvements
4. Deploy: Push optimized version

## 🎯 Priority Tasks for FrankX

### Immediate (This Week)
1. ⬆️ **Upgrade to Next.js 16**
   ```bash
   /skill nextjs-upgrade-assistant
   ```

2. 🔍 **Performance Audit**
   ```bash
   /skill nextjs-agent-team
   "Performance Agent: Complete audit of FrankX"
   ```

3. 📱 **Mobile Optimization**
   ```bash
   /skill nextjs-agent-team
   "UI/UX Agent: Improve mobile experience"
   ```

### Short-term (This Month)
4. 🔒 **Security Review**
   ```bash
   /skill nextjs-agent-team
   "Security Agent: Audit FrankX security"
   ```

5. ⚡ **Enable PPR** (After Next.js 16 upgrade)
   ```bash
   /skill nextjs-expert
   "Enable and implement Partial Prerendering"
   ```

6. 📈 **SEO Enhancement**
   ```bash
   /skill nextjs-expert
   "Comprehensive SEO optimization with metadata API"
   ```

## 🐛 Common FrankX Issues & Solutions

### Issue: Slow Page Loads
```bash
/skill nextjs-agent-team
"Performance Agent: Why are my pages loading slowly?
Project uses MDX content and has dynamic routes."
```

### Issue: Dark Mode Flickering
```bash
/skill nextjs-expert
"Fix dark mode flickering with next-themes.
Currently using: [paste your theme setup]"
```

### Issue: Type Errors After Update
```bash
/skill nextjs-expert
"Fix TypeScript errors in [file path].
Error: [paste error]"
```

## 🔗 Quick Links

- **Skills Location:** `~/.claude/skills/` (Linux) or symlinked to `.claude-nextjs-skills/`
- **Quick Reference:** `~/.claude/skills/QUICK-REFERENCE.md`
- **Full Documentation:** `~/.claude/skills/README-NEXTJS-SKILLS.md`
- **MCP Status:** Run `claude mcp list` in terminal

## 📚 Learning Resources

### Within Claude Code
```bash
# Learn Server Components
/skill nextjs-expert
"Teach me Server Components with examples for FrankX"

# Learn Server Actions
/skill nextjs-expert
"Show me Server Actions patterns I can use in FrankX"

# Learn Optimization
/skill nextjs-agent-team
"Performance Agent: Explain optimization strategies"
```

### External
- Next.js Docs: https://nextjs.org/docs
- FrankX GitHub: [your repo URL]
- Vercel Deployment: [your deployment URL]

## 💡 Pro Tips for FrankX

1. **Always Use Dev Server**
   - Enables both MCP servers
   - Real-time insights and documentation
   - Better debugging capabilities

2. **Start with Architecture**
   - Use Architecture Agent for new sections
   - Prevents rework and maintains consistency
   - Aligns with existing FrankX patterns

3. **Optimize as You Build**
   - Performance Agent can review before completion
   - Easier than optimizing later
   - Better user experience from start

4. **Document New Patterns**
   - Use Documentation Agent for complex features
   - Helps team understand your code
   - Makes maintenance easier

5. **Security First**
   - Security Agent reviews all data handling
   - Validates inputs in Server Actions
   - Protects user data from start

## 🎉 Success Metrics

Track your improvements:
- ⚡ Page load time: [baseline] → [target]
- 🎯 Lighthouse score: [baseline] → 95+
- 📦 Bundle size: [baseline] → [optimized]
- ♿ Accessibility: [baseline] → 100
- 🔒 Security score: [baseline] → A+

## 🤝 Getting Help

```bash
# For Next.js questions
/skill nextjs-expert
"[Your question about Next.js]"

# For complex projects
/skill nextjs-agent-team
"[Describe your project or issue]"

# For upgrades
/skill nextjs-upgrade-assistant
"I want to upgrade FrankX to Next.js 16"
```

---

**Built for FrankX** 🚀 | Let's make this the best Next.js project ever!

Start by upgrading to Next.js 16 and enabling all the latest features.
