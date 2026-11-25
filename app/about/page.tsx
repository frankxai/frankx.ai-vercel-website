import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { FAQPageJsonLd } from "@/components/seo/JsonLd";
import { coreQualitiesNavigationEvent } from "@/lib/core-qualities-analytics";
import { createMetadata } from "@/lib/seo";
import { socialLinks } from "@/lib/social-links";
import styles from "./about.module.css";

export const metadata = createMetadata({
  title: "Frank Riemer — Founder Atelier",
  description:
    "Meet Frank Riemer, Amsterdam-based AI Architect, venture builder and independent investor. Explore the ventures, original research and free tools behind FrankX.",
  path: "/about",
  image: "/images/portraits/frank-presenting-oracle-2025.jpg",
});

const projects = [
  {
    name: "Starlight Intelligence",
    field: "Agent infrastructure",
    description:
      "I’m building a place for specialist agents to work from the same brief. The public studio lets you explore a completed mission, follow its sources and prepare a brief of your own.",
    href: "https://starlightintelligence.ai/missions?example=recorded",
    action: "Inspect a completed mission",
    image: "starlight",
    alt: "Starlight Intelligence homepage with its orbital installation and entry to the mission studio",
  },
  {
    name: "GenCreator",
    field: "Creator tools",
    description:
      "Turn a piece you wrote into drafts for several formats. Check each draft against your source and export the ones you approve.",
    href: "https://gencreator.ai/create",
    action: "Try Creator Studio",
    image: "gencreator",
    alt: "GenCreator’s live Creator Studio with its example source and draft controls",
  },
  {
    name: "Arcanea",
    field: "Original worlds",
    description:
      "A world I create through fiction, art and music. Start with the open library of poetry, legends and creative practices.",
    href: "https://www.arcanea.ai/library",
    action: "Enter the library",
    image: "arcanea",
    alt: "Arcanea’s public library showing searchable collections of original writing",
  },
  {
    name: "Agentic Income",
    field: "Independent business",
    description:
      "A seven-day challenge for testing a business idea with agents, from defining the offer to deciding whether the evidence supports a next step.",
    href: "https://www.agenticincome.ai/challenge",
    action: "Open the challenge",
    image: "agentic-income",
    alt: "The public Agentic Income challenge showing steps and their deliverables",
  },
] as const;

const startingPoints = [
  { audience: "AI builders", action: "Run a free skill", href: "/skills" },
  { audience: "Founders", action: "Review your AI stack", href: "/founder-stack" },
  { audience: "Creators", action: "Make a storyboard", href: "/guides/mini-me-storyboard" },
  { audience: "Investors & associates", action: "Start diligence", href: "#investors" },
  { audience: "Educators", action: "Try the teaching case", href: "/partnerships/universities/source-check" },
  { audience: "Technology partners", action: "Explore partnerships", href: "/partnerships" },
] as const;

const resources = [
  {
    label: "Original research",
    title: "Model Arena",
    description: "Inspect published model evaluations, their raw results and the limits of each comparison.",
    href: "/research/model-arena",
  },
  {
    label: "Developer guides",
    title: "Architecture in practice",
    description: "Start with a reference architecture and follow the implementation choices into the developer guides.",
    href: "/developers",
  },
  {
    label: "Free digital product",
    title: "Vibe OS",
    description: "Use the free guide to track your creative energy and plan deep work around the hours you focus best.",
    href: "/products/vibe-os/docs",
  },
] as const;

const questions = [
  {
    question: "Who is Frank Riemer?",
    answer:
      "I’m an AI Architect, founder, independent investor and musician based in Amsterdam. FrankX is where I share the research, software, books and music I make.",
  },
  {
    question: "How do you work with AI agents?",
    answer:
      "I give specialist agents a brief and a concrete job, such as researching a question, building a feature or checking a result. I decide what ships and stand behind the published work.",
  },
  {
    question: "Who is Mini Frank?",
    answer:
      "Mini Frank is my illustrated counterpart. I use him to tell stories about making music, working with AI and exploring ideas. The Mini Me Storyboard guide shares the process and prompts.",
  },
  {
    question: "Can we work together?",
    answer:
      "Bring a product you want to build, a question worth researching or a room of people who want to learn. The Connect page is where we can start the conversation.",
  },
];

const [starlight, ...otherProjects] = projects;

function ProjectImage({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className={styles.projectImage}>
      <Image
        src={`/images/about/atelier/${project.image}.webp`}
        alt={project.alt}
        width={960}
        height={600}
        sizes={project === starlight ? "(max-width: 850px) 92vw, 51vw" : "(max-width: 680px) 92vw, 29vw"}
      />
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <FAQPageJsonLd faqs={questions} id="about-faq" />
      <div className={styles.paper}>
        <div className={styles.wrap}>
          <div className={styles.masthead}>
            <p className={styles.eyebrow}>The founder atelier</p>
            <nav aria-label="About page chapters" className={styles.chapterNav}>
              <a href="#the-work">Ventures</a>
              <a href="#publication">Research &amp; tools</a>
              <a href="#connect">Work together</a>
            </nav>
          </div>
          <section className={styles.hero} aria-labelledby="about-title">
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Amsterdam, Netherlands</p>
              <h1 id="about-title">Frank <em>Riemer</em></h1>
              <p className={styles.role}>AI Architect, venture builder &amp; independent investor</p>
              <p className={styles.intro}>
                I worked on enterprise AI at Oracle. Today I build agent
                systems and creator tools, and publish the code and research
                behind them here on FrankX.
              </p>
              <TrackedLink
                href="#start-with-the-work"
                eventName="about_explore_work"
                eventProperties={{ placement: "hero" }}
                className={styles.primary}
              >
                Find your starting point <ArrowDown size={17} aria-hidden="true" />
              </TrackedLink>
            </div>
            <figure className={styles.heroArt}>
              <div className={styles.heroFrame}>
                <Image
                  src="/images/portraits/frank-presenting-oracle-2025.jpg"
                  alt="Frank Riemer on stage presenting how AI workflows evolve from prompts into agents"
                  width={1920}
                  height={1440}
                  fetchPriority="high"
                  loading="eager"
                  sizes="(max-width: 680px) 92vw, (max-width: 1320px) 47vw, 640px"
                />
              </div>
              <figcaption>
                <span>Presenting agent workflows at Oracle</span>
                <span>2025</span>
              </figcaption>
            </figure>
          </section>
          <section
            id="start-with-the-work"
            aria-labelledby="starting-points-title"
            className={styles.start}
          >
            <h2 id="starting-points-title">Start with the work.</h2>
            <ul className={styles.startingPoints}>
              {startingPoints.map((point) => (
                <li key={point.href}>
                  <a href={point.href}>
                    <span className={styles.eyebrow}>{point.audience}</span>
                    <span className={styles.quickAction}>
                      {point.action} <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section id="the-work" className={styles.ventures} aria-labelledby="work-title">
        <div className={styles.wrap}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>Venture portfolio</p>
              <h2 id="work-title">What I’m building.</h2>
            </div>
            <Link href="/ecosystem" prefetch={false} className={styles.textLink}>
              View the system map <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <article className={styles.featured}>
            <ProjectImage project={starlight} />
            <div className={styles.featuredCopy}>
              <p className={styles.eyebrow}>{starlight.field}</p>
              <h3>{starlight.name}</h3>
              <p>{starlight.description}</p>
              <a href={starlight.href} className={styles.textLink}>
                {starlight.action} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </article>
          <div className={styles.projectGrid}>
            {otherProjects.map((project) => (
              <article key={project.name} className={styles.project}>
                <ProjectImage project={project} />
                <p className={styles.eyebrow}>{project.field}</p>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <a href={project.href} className={styles.textLink}>
                  {project.action} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.paper}>
        <div className={styles.wrap}>
          <section id="publication" className={styles.publication} aria-labelledby="publication-title">
            <div className={styles.publicationIntro}>
              <p className={styles.eyebrow}>The FrankX publication</p>
              <h2 id="publication-title">Read it. <em>Run it.</em></h2>
              <p>I publish the tests, templates and source code so you can make your own call about what to use.</p>
              <div className={styles.publicationLinks}>
                <Link href="/research" prefetch={false} className={styles.textLink}>
                  Read the research <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <a href="https://github.com/frankxai/skills" className={styles.textLink}>
                  Get the free skills on GitHub <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <Link href="/products" prefetch={false} className={styles.textLink}>
                  Browse digital products <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <ul className={styles.resourceList}>
              {resources.map((resource) => (
                <li key={resource.href}>
                  <Link href={resource.href} prefetch={false}>
                    <span className={styles.eyebrow}>{resource.label}</span>
                    <span className={styles.resourceTitle}>
                      {resource.title} <ArrowUpRight size={20} aria-hidden="true" />
                    </span>
                    <span className={styles.resourceDescription}>{resource.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section id="my-story" className={styles.story} aria-labelledby="story-title">
            <div>
              <p className={styles.eyebrow}>A personal note</p>
              <h2 id="story-title">Building runs<br className={styles.storyBreak} /> in the family.</h2>
            </div>
            <div className={styles.storyCopy}>
              <p className={styles.lead}>
                My father built houses. I grew up with the idea that you could make
                something other people would build their lives around.
              </p>
              <p>
                My grandparents survived displacement in Kazakhstan. My parents
                came to Germany in the 1990s and started again with very little.
                My father, Witali, helped displaced families find their footing.
                He died in 2019, and his example stays with me.
              </p>
              <p>
                My materials became software, music and stories. At Oracle I saw
                what happens when AI moves from a demo into an enterprise. That
                experience shapes how I build now. For anyone using my work,
                there should be a way to inspect the source, run it and keep a
                copy they can build on.
              </p>
              <div className={styles.inlineLinks}>
                <a className={styles.textLink} href="https://www.linkedin.com/posts/frank-x-riemer_after-almost-5-years-today-im-saying-goodbye-activity-7466943560559427584-nEGk">
                  My note on leaving Oracle <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <Link href="/journal" prefetch={false} className={styles.textLink}>
                  Founder journal <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          <section id="mini-frank" className={styles.character} aria-labelledby="character-title">
            <figure className={styles.characterArt}>
              <Image
                src="/images/guides/mini-me/collection-01-01.svg"
                alt="Mini Frank and Echo making music on oversized piano keys"
                width={1122}
                height={1402}
                sizes="(max-width: 680px) 92vw, 42vw"
              />
              <figcaption>Mini Frank and Echo, from the original Mini Me series</figcaption>
            </figure>
            <div>
              <p className={styles.eyebrow}>From the creative studio</p>
              <h2 id="character-title">Same curiosity.<br /> Smaller shoes.</h2>
              <p>
                Mini Frank is my illustrated counterpart. He gets to make music
                on enormous piano keys and bring his coding companions on the
                road. The storyboard guide shows how I keep a character
                recognisable from one scene to the next.
              </p>
              <Link href="/guides/mini-me-storyboard" prefetch={false} className={styles.textLink}>
                Make your own Mini Me <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>
      </div>

      <section id="connect" className={styles.join} aria-labelledby="connect-title">
        <div className={styles.wrap}>
          <div className={styles.joinIntro}>
            <p className={styles.eyebrow}>Work together</p>
            <h2 id="connect-title">What are you building?</h2>
            <p>Bring a live product, a research question or a room of people ready to build.</p>
          </div>
          <div className={styles.joinGrid}>
            <article id="investors">
              <h3>Investors &amp; venture associates</h3>
              <p>
                Start with the public work. For a portfolio review, send the
                questions you want to examine. I share relevant materials by request.
              </p>
              <TrackedLink
                href="/connect"
                prefetch={false}
                eventName="about_connect"
                eventProperties={{ placement: "investor" }}
                className={styles.primary}
              >
                Request a venture conversation <ArrowRight size={17} aria-hidden="true" />
              </TrackedLink>
              <Link href="/investor" prefetch={false} className={styles.textLink}>
                See my independent investing work <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </article>
            <article>
              <h3>Research, teaching &amp; technology partners</h3>
              <p>
                For a joint build or a workshop, bring a problem and the people
                who would use the result. The public source-check exercise shows
                how I teach judgment with AI.
              </p>
              <Link href="/partnerships" prefetch={false} className={styles.primary}>
                Explore partnership formats <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/partnerships/universities/source-check" prefetch={false} className={styles.textLink}>
                Run the teaching case <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </article>
          </div>
          <div className={styles.socials}>
            <TrackedLink
              href="/connect"
              prefetch={false}
              eventName="about_connect"
              eventProperties={{ placement: "closing" }}
              className={styles.textLink}
            >
              Contact Frank <ArrowUpRight size={16} aria-hidden="true" />
            </TrackedLink>
            <a href={socialLinks.github} className={styles.textLink}>GitHub <ArrowUpRight size={16} aria-hidden="true" /></a>
            <a href={socialLinks.linkedin} className={styles.textLink}>LinkedIn <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <div className={styles.paper}>
        <section className={`${styles.wrap} ${styles.questions}`} aria-labelledby="questions-title">
          <div>
            <h2 id="questions-title">More about Frank.</h2>
            <p>FrankX is my independent work. I make the final call on what becomes public.</p>
            <TrackedLink
              href="/qualities"
              prefetch={false}
              {...coreQualitiesNavigationEvent({
                source: "about",
                placement: "principles",
                destination: "overview",
              })}
              className={styles.textLink}
            >
              The four governing qualities <ArrowUpRight size={16} aria-hidden="true" />
            </TrackedLink>
          </div>
          <div>
            {questions.map((item) => (
              <details key={item.question}>
                <summary>{item.question}<Plus size={17} aria-hidden="true" /></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
