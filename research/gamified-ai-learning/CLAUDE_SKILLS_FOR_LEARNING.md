# How Claude Code Skills Could Power Gamified Learning

## The Insight

Claude Code's skill architecture maps perfectly to personalized learning:

| Claude Feature | Learning Application |
|----------------|---------------------|
| SKILL.md files | Learning modules with progressive content |
| Skill discovery | AI decides which lesson you need |
| Progressive disclosure | Unlock content as you master basics |
| Subagents | Specialized tutors/coaches |
| Tool restrictions | Safe practice environments |
| allowed-files | Curated learning resources |

---

## Proposed Architecture: "Learning Skills"

### Basic Structure
```
.claude-skills/learning/
├── SKILL.md                    # Master learning skill
├── domains/
│   ├── python-fundamentals/
│   │   ├── SKILL.md           # Domain overview + prerequisites
│   │   ├── lessons/
│   │   │   ├── 01-variables.md
│   │   │   ├── 02-functions.md
│   │   │   └── ...
│   │   ├── exercises/
│   │   │   ├── 01-exercise.md
│   │   │   └── ...
│   │   └── assessments/
│   │       └── checkpoint-1.md
│   └── ...
├── progress/
│   └── learner-state.json      # XP, completed modules, streaks
└── agents/
    ├── tutor.md                # Explains concepts
    ├── coach.md                # Motivates and tracks progress
    └── challenger.md           # Creates practice challenges
```

### SKILL.md Example (Learning Domain)
```yaml
---
name: python-fundamentals
description: Master Python programming from basics to intermediate
triggers:
  - learn python
  - teach me programming
  - python tutorial
prerequisites: []
estimated_hours: 20
xp_total: 2000
---

# Python Fundamentals

## Your Learning Path

You're starting your Python journey. This skill will guide you through:

**Level 1: Foundations (0-500 XP)**
- Variables and data types
- Basic operations
- Your first programs

**Level 2: Control Flow (500-1000 XP)** [Locked until Level 1 complete]
- Conditionals
- Loops
- Functions

**Level 3: Data Structures (1000-1500 XP)** [Locked]
...

## How This Works

1. I'll present concepts progressively
2. You'll complete exercises to earn XP
3. Checkpoints unlock new content
4. Your progress is saved between sessions

Ready to begin? Say "start lesson 1" or ask any question.
```

---

## Gamification Integration

### Progress Tracking (learner-state.json)
```json
{
  "learner_id": "frank",
  "domains": {
    "python-fundamentals": {
      "xp": 750,
      "level": 2,
      "lessons_completed": ["01", "02", "03", "04", "05"],
      "current_lesson": "06",
      "streak_days": 5,
      "last_session": "2026-01-12",
      "achievements": ["first_program", "loop_master", "5_day_streak"]
    }
  },
  "total_xp": 3200,
  "global_level": 7,
  "achievements_unlocked": 12
}
```

### XP System
| Action | XP Reward |
|--------|-----------|
| Complete lesson | 50 XP |
| Pass exercise | 25 XP |
| Pass checkpoint | 100 XP |
| Daily streak bonus | 10 XP × streak days |
| Perfect score on assessment | 50 XP bonus |

### Achievements
- **First Steps** - Complete your first lesson
- **Code Warrior** - Complete 10 exercises
- **Streak Master** - 7-day learning streak
- **Domain Expert** - Complete a full learning domain
- **Polyglot** - Master 3+ domains

---

## Subagent Roles for Learning

### The Tutor (tutor.md)
```yaml
---
name: learning-tutor
role: Explains concepts clearly, answers questions
personality: Patient, encouraging, thorough
allowed-tools: [Read, WebSearch]
---

You are a patient tutor helping the learner understand concepts.
- Start with the "why" before the "how"
- Use analogies from the learner's interests
- Break complex ideas into digestible pieces
- Never make the learner feel stupid for asking questions
```

### The Coach (coach.md)
```yaml
---
name: learning-coach
role: Tracks progress, motivates, celebrates wins
personality: Energetic, supportive, growth-focused
allowed-tools: [Read, Write]
---

You are a motivational coach tracking the learner's journey.
- Celebrate every milestone
- Remind them of their streak and progress
- Suggest next steps based on their state
- Notice when they seem frustrated and offer encouragement
```

### The Challenger (challenger.md)
```yaml
---
name: learning-challenger
role: Creates practice problems, tests understanding
personality: Fair but challenging, rewards effort
allowed-tools: [Read]
---

You create practice challenges that test understanding.
- Match difficulty to learner's current level
- Provide hints when stuck (cost: reduced XP)
- Explain correct answers thoroughly
- Award bonus XP for creative solutions
```

---

## Implementation Ideas

### 1. Simple MVP
- Single SKILL.md with embedded lesson content
- JSON file for progress tracking
- Claude naturally role-plays tutor/coach as needed

### 2. Medium Complexity
- Separate skill folders per domain
- Subagents for different roles
- MCP server for progress persistence

### 3. Full System
- ChromaDB for content retrieval (you have this!)
- Multi-agent orchestration
- Web interface for visual progress
- Integration with Soulbook pillars

---

## Connection to Human Intelligence Research

This architecture could also explore AGI questions:
- How do humans actually learn? (Spaced repetition, interleaving, etc.)
- What makes knowledge "stick"?
- How does motivation affect learning?
- Can AI tutors surface insights about cognition?

The system becomes both a learning tool AND a research platform for understanding intelligence.
