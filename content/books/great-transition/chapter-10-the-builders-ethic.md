# The Builder's Ethic

> "With great power comes great responsibility."
> — Stan Lee, *Amazing Fantasy* #15, 1962

---

There is a question that most builders never ask, and it sits underneath everything else in this book like bedrock beneath soil. You can build an entire career without asking it. You can ship products, accumulate revenue, grow an audience. The question doesn't announce itself. It waits.

The question is: what is this for?

Not in the product sense — what problem does it solve, what market does it serve. That question gets asked constantly, obsessively, in every pitch deck and every product review. I mean the deeper version: when you build something that shapes how people think, work, create, or make decisions, what obligation comes with that? Is there one?

I've been building AI systems long enough to have watched the answer to that question change. A decade ago, the tools were limited enough that the question felt theoretical. A language model that could complete sentences was interesting but not consequential. A recommendation algorithm that surfaced relevant content was useful but not powerful enough to reshape behavior at scale. The ethical questions existed, but they had a seminar quality — worth discussing, not urgent.

That era is over. The tools are consequential now. A single person can build systems that reach millions. The intelligence layer doesn't just assist — it persuades, generates, decides, filters. Every builder working with these systems is making choices that ripple outward in ways that were previously reserved for large institutions with legal departments and compliance teams and ethics boards.

The builder's ethic is what you do when none of those structures apply to you. When you're one person, building fast, shipping to real users, and the only oversight is your own judgment.

---

## I. Extraction and Empowerment

There are two fundamental orientations in building, and most products reveal which one they follow within the first few minutes of use.

The first orientation is extraction. The product is designed to capture as much value from the user as possible — attention, data, money, dependency. The user is the resource. The metrics that matter are engagement time, lock-in, switching costs. The product gets better for the company as the user spends more; it does not necessarily get better for the user.

Social media is the canonical example, but it's far from the only one. Enterprise SaaS companies that make data export deliberately difficult are extractive. Productivity tools that create proprietary file formats are extractive. AI platforms that train on user inputs without disclosure and then compete with those same users are extractive. The pattern is always the same: the product's interests and the user's interests are misaligned, and the product is designed to obscure that misalignment.

The second orientation is empowerment. The product is designed to make the user more capable, more independent, more powerful. The best outcome for the product is a user who outgrows it — or who becomes so capable that the product becomes invisible infrastructure, like electricity. The metrics that matter are what the user accomplished, not how long they stayed.

I think about this distinction constantly because AI tools sit at the exact inflection point between these two orientations. An AI writing assistant can be designed to make you a better writer — surfacing patterns in your work, suggesting structural improvements, pushing you toward clarity. Or it can be designed to write for you, making you dependent on it, atrophying the very skill it's supposed to enhance. Same technology. Different ethic. Completely different outcome for the human on the other end.

The builders who are shaping this era are making that choice every day, usually without naming it. Every default setting, every onboarding flow, every pricing tier embeds an answer to the question: are we here to extract or to empower?

---

## II. The Open-Source Stance

In February 2023, an internal document leaked from Google. It was titled "We Have No Moat." The argument was stark: Google's AI advantages were being eroded not by OpenAI or Anthropic, but by the open-source community. While the major labs spent hundreds of millions training proprietary models, independent researchers and small teams were achieving comparable results through fine-tuning, quantization, and architectural innovations shared freely on GitHub and Hugging Face.

The document was controversial inside Google. Outside Google, it confirmed something that many builders already understood: openness is not just a philosophy. It is a competitive strategy.

But I want to push past the strategic argument, because I think there's an ethical one that matters more.

When Meta released LLaMA and then Llama 2 and then Llama 3 under permissive licenses, they made a choice that went beyond market positioning. They made powerful language models available to researchers, developers, and builders who could never have afforded to train them independently. A graduate student in Nairobi could run the same model that a well-funded startup in San Francisco was using. A clinic in rural India could build a diagnostic assistant on the same foundation as a hospital system in Boston.

That's not just strategy. That's distribution of power.

Open source, at its best, is an ethical stance: the belief that powerful tools should not be locked behind gates that only the wealthy and well-connected can pass through. The belief that the collective intelligence of thousands of contributors produces better, safer, more robust systems than any single organization working in isolation. The belief that transparency — the ability to inspect, audit, modify, and understand the systems that shape our lives — is a right, not a privilege.

I recognize the counterarguments. Some AI capabilities are dangerous and should not be freely distributed. Model weights in the wrong hands can be used for harm. There is a genuine tension between openness and safety, and reasonable people disagree about where the line should be drawn.

But the history of technology suggests that hoarding power under the banner of safety often serves the hoarder more than the public. The printing press was dangerous — it toppled monarchies and spread heresy. The internet was dangerous — it enabled fraud and radicalization. In both cases, the answer that history validated was not restriction but literacy. Not fewer presses, but more readers. Not less internet, but better judgment.

The builders who open-source their work are betting on literacy. They're betting that the best defense against misuse is widespread understanding, not concentrated control. I think they're right.

---

## III. The Accessibility Obligation

Here is a number that should bother every AI builder: as of early 2026, roughly 15% of knowledge workers use AI tools regularly in their work. Not occasionally, not experimentally — regularly, as part of their daily workflow. The remaining 85% are aware that the tools exist. Many have tried them. Most have not integrated them into how they actually work.

This is not a failure of the technology. The technology works. I've documented throughout this book what it can do. This is a failure of design, of communication, of the implicit assumption that powerful tools will find their audience on their own.

They don't. They never have. The history of technology adoption is the history of intermediaries — people and institutions that translate raw capability into usable form. The personal computer didn't reach the mainstream because the hardware improved. It reached the mainstream because VisiCalc gave accountants a reason to use it, because the Macintosh made the interface comprehensible, because Microsoft made the software available on the machines that businesses were already buying.

AI is in its VisiCalc moment. The capability is extraordinary. The interface — for most people — is still a blank text box with a blinking cursor. That cursor is an invitation and a barrier simultaneously. If you know what to ask, it's an invitation. If you don't, it's a wall.

The builders who take accessibility seriously are the ones building the bridges. They're creating templates, workflows, pre-built configurations, guided experiences. They're not dumbing down the technology — they're creating entry points. The difference matters. A dumbed-down tool limits what's possible. An accessible tool makes what's possible reachable.

I built ACOS — the Augmented Creator Operating System — with this principle at its core. The underlying capability is sophisticated: seventy-five skills, thirty-eight agents, prompt engineering patterns that took thousands of iterations to refine. But the entry point is a conversation. You describe what you're trying to do, and the system meets you where you are.

This is not charity. It's an obligation. When you understand how to use tools that can 10x someone's capability, and you keep that understanding locked in your own workflow, you're hoarding leverage. The same leverage that, distributed broadly, could reshape what's possible for millions of people who are smart, creative, and motivated but who happen not to have spent the last three years learning prompt engineering.

The builder's ethic includes a duty of translation — taking what works and making it work for people who don't have your context.

---

## IV. When Institutions Fail

In March 2023, an open letter signed by over a thousand technology leaders called for a six-month pause on the training of AI systems more powerful than GPT-4. The signatories included Elon Musk, Steve Wozniak, and Yoshua Bengio. The letter raised legitimate concerns about the pace of development outrunning our ability to understand and control the systems being built.

No pause happened. Training continued. The letter became a footnote.

I don't recount this to criticize the signatories — their concerns were real. I recount it because it illustrates something important about the current moment: the traditional mechanisms of institutional governance — regulations, industry agreements, professional codes of conduct — are operating at a speed that is structurally incompatible with the speed of AI development. By the time a regulation is drafted, debated, and enacted, the technology it was designed to govern has already evolved past the regulatory frame.

This is not a temporary condition. This is the new normal. The gap between institutional governance and technological capability is widening, not closing.

Which means that the ethical load is shifting to individual builders.

This is uncomfortable. It's much easier to operate within a framework — to follow rules that someone else wrote, to check compliance boxes, to defer to institutional judgment. When the institution fails to provide the framework, or provides one that's years out of date, the builder stands alone with their own judgment.

I've seen what this looks like inside enterprises. I've built AI Center of Excellence frameworks for organizations trying to govern their AI use responsibly. The six pillars — Strategy, Governance, Talent, Technology, Data, Ethics — exist precisely because institutions recognize the need for structure. But even the best institutional framework is only as good as the people implementing it. And for the growing army of solo builders and small teams, there is no institutional framework at all.

So what do you do?

You build your own. Not a bureaucratic compliance checklist — a personal ethic. A set of principles that you apply to every decision, every feature, every default setting. Here is what mine looks like:

First, transparency. If my system uses someone's data, they know. If it makes a decision that affects them, they can see how. If it has limitations, those limitations are documented, not hidden.

Second, reversibility. Nothing I build should lock someone in. Export your data. Take your content. Leave whenever you want. If my product can't survive without switching costs, it doesn't deserve to survive.

Third, proportionality. The power of the tool should match the sophistication of the user. Don't give a novice a loaded weapon and call it empowerment. Build guardrails that protect without patronizing.

Fourth, honesty about capability. Don't claim your AI can do what it can't. Don't market certainty when the outputs are probabilistic. Don't dress up a language model's confident-sounding guesses as expertise.

These aren't novel principles. They're basic. And that's the point — the ethical framework for building in the AI age doesn't require moral philosophy. It requires the discipline to apply basic principles consistently, especially when moving fast makes it tempting to skip them.

---

## V. The Weight of Defaults

There's a concept in behavioral economics called the default effect: people tend to stick with whatever option is pre-selected. Organ donation rates differ dramatically between countries that require people to opt in versus countries that require people to opt out. The technology is the same. The medicine is the same. The default is different. And the default determines the outcome for millions of people.

Every builder sets defaults. And in AI systems, defaults carry extraordinary weight.

When you set the default privacy setting, you're deciding how millions of people's data will be handled — because most of them will never change it. When you set the default response style of an AI assistant, you're shaping how millions of conversations will flow. When you decide what the AI shows first, suggests first, recommends first, you're shaping perception at a scale that used to require a television network.

I watched the early social media platforms learn this lesson the hard way — or, more accurately, learn it and then exploit it. Facebook's default news feed algorithm optimized for engagement, which in practice meant optimizing for outrage, because outrage generates more clicks than nuance. The default was extractive. The company knew it was extractive. Internal research, later leaked by Frances Haugen, confirmed that the platform's design was causing measurable harm. The default stayed.

The AI builders of this generation have the opportunity — and I'd argue the obligation — to set better defaults. Not because they're more virtuous than the social media founders. Because they've seen what happens when you don't.

A language model's default should be honest, not confident. It should say "I'm not sure" rather than fabricate an answer that sounds authoritative. A recommendation system's default should be diverse, not narrow — showing people things they might not have sought out, rather than feeding them more of what they've already consumed. An AI assistant's default should be empowering, not addictive — helping the user build capability, not dependency.

These are design choices. They're made by builders. And they matter more than most builders realize, because the default is where most users will stay.

---

## VI. The Long View

I want to end this chapter with something that has been on my mind for months.

The tools we're building now will outlast us. Not the specific products — those will be replaced, upgraded, forgotten. But the patterns we establish, the norms we set, the expectations we create in users about what AI should do and how it should behave — those will persist. They'll become the foundation that the next generation of builders builds on.

The early web developers established norms that we still live with. The convention that websites should be free and ad-supported — that was a choice made by specific people in the mid-1990s. The convention that user data is a currency to be traded — that was a choice. The convention that growth matters more than sustainability — that was a choice. Each of those choices seemed reasonable at the time. Each of them created consequences that we're still dealing with thirty years later.

We are in that same moment now with AI. The choices being made in 2025 and 2026 — about data ownership, about transparency, about accessibility, about the relationship between human judgment and machine capability — will shape the next thirty years of how these systems work.

That's a weight. It should feel like one. And the builders who take it seriously — who slow down long enough to ask not just "can I build this?" but "should I build this, and if so, how?" — those are the builders whose work will age well.

The ones who ship fast without thinking will build things that work. Some of them will build things that make money. But the things that last — the things that people look back on and say, that was built right — those come from builders who carried the weight and didn't set it down.

The builder's ethic is not a constraint. It's a craft. And like all craft, it shows in the finished work — in the details that nobody notices until they're absent.

---

*Next: The Infinite Game — why the builders who last are the ones who optimize for learning over winning.*
