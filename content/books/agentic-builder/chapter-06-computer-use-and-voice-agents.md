# Computer Use and Voice Agents

> "Any sufficiently advanced technology is indistinguishable from magic."
> — Arthur C. Clarke

---

## I. Beyond Text

The first five chapters of this book treated agents as text-in, text-out systems. A user types a prompt. The agent reasons. The agent calls tools. The agent returns text.

This is the 2024 model of agentic AI. It is already obsolete.

The 2026 model has two additional modalities: computer use (the agent sees and controls a screen) and voice (the agent hears and speaks). These modalities do not replace text — they extend it. A text-only agent can call an API. A computer-use agent can operate any software that has a screen, whether or not it has an API. A voice agent can conduct a conversation in real time, with the latency and naturalism of a human phone call.

This chapter covers both modalities — the architecture, the implementation patterns, and the failure modes.

---

## II. Computer Use Architecture

Computer use gives an agent eyes and hands. The agent sees the screen (via screenshots), interprets what it sees (via vision models), decides what to do (via reasoning), and executes actions (via mouse clicks, keyboard inputs, and scroll commands).

The architecture has four components:

**Screen capture.** The system takes screenshots at defined intervals or after each action. Each screenshot is a complete representation of the current screen state — the agent's "perception" of the environment.

**Vision interpretation.** The screenshot is processed by a vision-language model (VLM) that extracts semantic understanding: what elements are on screen, where they are positioned, what text they contain, what state the application is in.

**Action planning.** Based on the interpreted screen state and the goal, the agent plans the next action: click this button, type this text, scroll to this section, switch to this tab.

**Action execution.** The planned action is executed through a controlled interface — typically a browser automation framework (Playwright) or a system-level input controller.

```typescript
// Simplified computer use loop
async function computerUseLoop(agent: Agent, goal: string) {
  let done = false
  while (!done) {
    const screenshot = await captureScreen()
    const understanding = await agent.interpret(screenshot, goal)

    if (understanding.goalAchieved) {
      done = true
      continue
    }

    const action = await agent.planAction(understanding)
    await executeAction(action) // click, type, scroll
    await wait(500) // allow screen to update
  }
}
```

The loop is deceptively simple. The complexity lives in the interpretation and planning steps — where the agent must understand what it sees well enough to determine the correct next action.

---

## III. When to Use Computer Use

Computer use is the right choice when:

**No API exists.** Many internal tools, legacy applications, and proprietary platforms have no API. The only interface is the GUI. Computer use lets an agent operate these tools the way a human would — by looking at the screen and clicking.

**The API is too complex.** Some platforms have APIs that are so complex, poorly documented, or rate-limited that it is more practical to operate the GUI. An agent that navigates a web dashboard can accomplish in 30 seconds what an API integration would require hours to build.

**The workflow is visual.** Design tools (Figma, Canva), spreadsheets (Google Sheets), and presentation tools (Google Slides) are inherently visual. The GUI is the natural interface for operations that involve spatial reasoning, visual layout, and design decisions.

Computer use is the wrong choice when:

**A reliable API exists.** API calls are faster, more reliable, and more precise than screen-based automation. If the platform offers an API, use it. Computer use is a fallback, not a default.

**The task requires high precision.** Computer use is probabilistic — the agent may misidentify a button, misread text, or click the wrong element. For tasks where a single error has high cost (financial transactions, production deployments, data deletion), prefer API-based tool calls with explicit confirmation.

**The task is latency-sensitive.** Each computer use step takes 1-3 seconds (screenshot, interpretation, action, wait). A 10-step workflow takes 10-30 seconds. An API call accomplishes the same result in milliseconds.

---

## IV. Voice Agent Architecture

Voice agents add real-time speech to the agentic stack. The user speaks; the agent listens, reasons, and responds with speech — all in under a second.

The voice architecture has five components:

**Speech-to-text (STT).** The user's audio is transcribed to text. Modern STT engines (Whisper, Deepgram, AssemblyAI) operate at near-human accuracy with latencies under 200ms.

**Intent understanding.** The transcribed text is processed by the language model to understand what the user wants. This is the same reasoning step as in text-based agents, but with additional challenges: spoken language is less structured than written language, contains filler words, and often includes corrections mid-sentence.

**Reasoning and tool use.** The agent reasons about the intent, optionally calls tools, and generates a text response. This step is identical to text-based agents.

**Text-to-speech (TTS).** The text response is converted to natural-sounding speech. Modern TTS systems (ElevenLabs, OpenAI TTS, Cartesia) produce speech that is nearly indistinguishable from human voice.

**Conversation management.** The system manages turn-taking, interruption handling, and conversation state. This is the most complex component — because spoken conversation is fundamentally different from text chat.

---

## V. The Voice Agent Challenge: Latency

Voice agents have a constraint that text agents do not: latency is perceived differently.

In text, a 3-second delay between prompt and response is acceptable — users expect AI to "think." In voice, a 3-second delay is perceived as a system failure. Human conversation has a natural response latency of 200-400ms. Any delay beyond 1 second is experienced as awkward. Beyond 2 seconds, the user assumes the system is broken.

This latency constraint shapes the entire voice agent architecture:

**Streaming responses.** Instead of waiting for the complete response before speaking, the agent begins speaking as soon as the first sentence is generated. This requires streaming both the LLM output and the TTS synthesis.

**Speculative processing.** While the user is still speaking, the agent begins processing the likely intent based on the partial transcript. When the user finishes, the agent has already started reasoning — reducing perceived latency by 500-1000ms.

**Response chunking.** Long responses are broken into conversational chunks. Instead of delivering a 200-word answer in one breath, the agent delivers 2-3 sentences, pauses for acknowledgment, and continues. This mirrors human conversation patterns and reduces the perception of monologue.

**Fallback responses.** When the agent needs more time to reason (complex tool calls, multi-step reasoning), it uses a filler response: "Let me check that for you" or "One moment while I look that up." These fillers are pre-generated and delivered instantly, buying time for the reasoning step.

---

## VI. Combining Modalities

The most powerful agents combine all three modalities: text, computer use, and voice.

Consider a real-world scenario: an AI assistant that helps a user navigate a complex enterprise application.

**Voice:** "Can you show me last month's sales by region?"

**Text reasoning:** The agent interprets the request, identifies the relevant application (Salesforce), and plans the navigation steps.

**Computer use:** The agent opens Salesforce, navigates to Reports, selects the Regional Sales report, applies the date filter for last month, and captures a screenshot of the results.

**Voice response:** "Here are last month's regional sales. North America led with $2.3M, followed by EMEA at $1.8M. Would you like me to drill into any specific region?"

Three modalities. One workflow. The user never types, never clicks, never navigates. They speak a question and receive an answer — with the agent handling all the intermediate complexity.

This is the vision of agentic AI in 2026: systems that perceive (see the screen, hear the voice), reason (understand the intent, plan the actions), and act (click, type, speak) — operating across all the modalities that humans use to interact with computers.

---

## VII. Building Responsibly

Multimodal agents are powerful — and power requires responsibility.

**Computer use safety:** An agent with computer use capabilities can do anything a human can do on a computer — including destructive actions. Always implement confirmation gates before destructive operations (deleting data, sending messages, making purchases). Never give a computer use agent unsupervised access to production systems.

**Voice privacy:** Voice agents process spoken language, which may contain sensitive information spoken casually. Implement clear data handling policies: what is recorded, what is transcribed, what is stored, and what is deleted. Give users explicit control over recording.

**Deepfake prevention:** Voice synthesis technology can clone voices with minimal sample audio. Never use voice cloning to impersonate individuals without explicit consent. The trust cost of voice deepfakes far exceeds any efficiency gain.

**Graceful degradation:** Multimodal systems fail in multimodal ways. The screen capture may fail. The voice may be unintelligible. The TTS may sound unnatural. Design every multimodal agent with graceful fallbacks: if voice fails, fall back to text. If computer use fails, fall back to API calls. If all else fails, ask the human for help.

The agentic builder's responsibility is not just to build systems that work. It is to build systems that fail safely, operate transparently, and respect the humans they serve.
