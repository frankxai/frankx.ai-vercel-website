import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
} from "lucide-react";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { FAQPageJsonLd } from "@/components/seo/JsonLd";
import { coreQualitiesNavigationEvent } from "@/lib/core-qualities-analytics";
import { createMetadata } from "@/lib/seo";
import { socialLinks } from "@/lib/social-links";
import styles from "./about.module.css";

export const metadata = createMetadata({
  title: "About Frank Riemer",
  description:
    "AI Architect, founder and musician in Amsterdam. Meet Frank Riemer through the systems, music and miniature worlds he creates, and the ideas behind them.",
  path: "/about",
  image: "/images/portraits/frank-presenting-oracle-2025.jpg",
});

const questions = [
  {
    question: "Who is Frank Riemer?",
    answer:
      "I’m an AI Architect, founder and musician based in Amsterdam. My work connects AI systems, software, research, books and music. FrankX is where I share what I’m building and what I learn along the way.",
  },
  {
    question: "How do you work with AI agents?",
    answer:
      "I give specialist agents context and a concrete job: research a question, challenge a design, build a feature or check a result. I direct the work and own the final judgment. The workspace page shows the method.",
  },
  {
    question: "Who is Mini Frank?",
    answer:
      "Mini Frank is my illustrated counterpart. I use miniature scenes to tell stories about making things, working with AI and exploring ideas. The Mini Me Storyboard guide shares the character references, scene decisions and reusable prompts.",
  },
  {
    question: "Can we work together?",
    answer:
      "Yes. Bring a product you want to build, a question worth researching or a room of people who want to learn. The Connect page is the place to start a conversation.",
  },
];
const practices = [
  {
    title: "Build something useful.",
    text: "Start with the person who will use it. Make a working version. Find where it breaks. Improve the part that matters.",
  },
  {
    title: "Keep the ability to choose.",
    text: "Own your work, understand your tools and keep your data portable. A system should give you more room to act.",
  },
  {
    title: "Make room for feeling.",
    text: "A song, a character or a carefully designed interface can make an idea stay with someone. That deserves as much care as the engineering.",
  },
  {
    title: "Pass the method on.",
    text: "Share enough of the process that someone else can make their own version. Teaching is part of building.",
  },
];
const worlds = [
  {
    name: "Starlight Intelligence",
    detail: "The systems I’m building to work with AI agents.",
    href: "https://starlightintelligence.ai",
  },
  {
    name: "GenCreator",
    detail: "Creative workflows from an idea to a finished piece.",
    href: "https://gencreator.ai",
  },
  {
    name: "Arcanea",
    detail: "An original world for stories, characters and music.",
    href: "https://arcanea.ai",
  },
];

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <FAQPageJsonLd faqs={questions} id="about-faq" />
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.heroCopy}>
          <p className={styles.byline}>
            Frank Riemer <span>Amsterdam</span>
          </p>
          <h1 id="about-title">
            AI, music &amp;
            <br />
            imagination.
          </h1>
          <p className={styles.role}>AI Architect. Founder. Musician.</p>
          <p className={styles.intro}>
            I build AI systems, make music and create worlds. FrankX is where I
            share the work, the experiments and what I learn along the way.
          </p>
          <p className={styles.intro}>
            The question behind it all: how much can we create when we have
            better tools, more freedom and people we love building with?
          </p>
          <TrackedLink
            href="#the-work"
            eventName="about_explore_work"
            eventProperties={{ placement: "hero" }}
            className={styles.primary}
          >
            Explore my work <ArrowDown size={17} aria-hidden="true" />
          </TrackedLink>
          <nav className={styles.chapterNav} aria-label="About page chapters">
            <a href="#my-story">My story</a>
            <a href="#mini-frank">Mini Frank</a>
            <a href="#connect">Build together</a>
          </nav>
        </div>
        <figure className={styles.heroArt}>
          <Image
            src="/images/guides/mini-me/collection-02-01.svg"
            alt="Mini Frank standing on a travel bag at a station, with illustrated coding companions. The artwork reads: I brought backup."
            width={941}
            height={1672}
            priority
            sizes="(max-width: 700px) 90vw, 44vw"
          />
          <figcaption>
            Mini Frank · A little imagination, out in the world.
          </figcaption>
        </figure>
      </section>

      <section
        id="my-story"
        className={styles.story}
        aria-labelledby="story-title"
      >
        <div>
          <p className={styles.label}>The person behind the work</p>
          <h2 id="story-title">
            Building runs
            <br />
            in the family.
          </h2>
          <figure className={styles.portrait}>
            <Image
              src="/images/portraits/frank-presenting-oracle-2025.jpg"
              alt="Frank presenting during his time at Oracle"
              width={1200}
              height={800}
              sizes="(max-width: 700px) 90vw, 40vw"
            />
            <figcaption>
              From enterprise AI to building independently.
            </figcaption>
          </figure>
        </div>
        <div className={styles.storyCopy}>
          <p className={styles.lead}>
            My father built houses. I grew up with the idea that you could make
            something other people would build their lives around.
          </p>
          <p>
            I come from a Volga German family shaped by migration and
            rebuilding. My grandparents survived displacement in Kazakhstan. My
            parents came to Germany in the 1990s and started again with very
            little.
          </p>
          <p>
            My father, Witali, helped displaced families find their footing. He
            died from cancer in 2019. His example stays with me in the work I
            choose to do.
          </p>
          <p>
            My materials became software, music and stories. Working in
            enterprise AI at Oracle gave me experience with the questions
            companies face when they put these tools to work. Now, in Amsterdam,
            I’m building my own products and sharing the process.
          </p>
          <p>
            I want this work to give people more independence: the ability to
            build an idea, understand the systems they use and make something of
            their own.
          </p>
          <Link href="/journal" className={styles.textLink}>
            Read my founder journal{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section
        id="the-work"
        className={styles.work}
        aria-labelledby="work-title"
      >
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.label}>What I spend my days making</p>
            <h2 id="work-title">
              Code, sound
              <br />
              and stories.
            </h2>
          </div>
          <p>
            Engineering teaches me to make things work. Music teaches me to
            listen. Worldbuilding gives my imagination somewhere to go.
          </p>
        </div>
        <div className={styles.workSpread}>
          <figure className={styles.musicArt}>
            <Image
              src="/images/guides/mini-me/collection-01-01.svg"
              alt="Mini Frank and Echo, an original music companion, making music on oversized piano keys. The artwork reads: A feeling. Then a song."
              width={1122}
              height={1402}
              sizes="(max-width: 700px) 90vw, 48vw"
            />
            <figcaption>
              Echo · An original FrankX character from the Mini Me series.
            </figcaption>
          </figure>
          <div className={styles.workLinks}>
            <Link href="/ai-architecture">
              <span className={styles.workCategory}>AI architecture</span>
              <h3>From idea to working system.</h3>
              <p>
                Architectures, agent workflows and practical decisions you can
                use in your own builds.
              </p>
              <span className={styles.linkLabel}>
                Explore the architectures{" "}
                <ArrowUpRight size={19} aria-hidden="true" />
              </span>
            </Link>
            <Link href="/music">
              <span className={styles.workCategory}>Music</span>
              <h3>A feeling becomes a song.</h3>
              <p>
                My music lives here alongside the experiments and creative
                process behind it. Put something on while you explore.
              </p>
              <span className={styles.linkLabel}>
                Find your soundtrack{" "}
                <ArrowUpRight size={19} aria-hidden="true" />
              </span>
            </Link>
            <Link href="/books">
              <span className={styles.workCategory}>Writing</span>
              <h3>Give an idea room to grow.</h3>
              <p>
                Books and essays let me stay with a question longer, follow its
                connections and put what I learn into words.
              </p>
              <span className={styles.linkLabel}>
                Browse the books <ArrowUpRight size={19} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
        <div className={styles.worlds} aria-label="Projects founded by Frank">
          <p>The projects I’m building</p>
          {worlds.map((world) => (
            <a
              key={world.name}
              href={world.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>
                {world.name}
                <ArrowUpRight size={18} aria-hidden="true" />
              </h3>
              <span>{world.detail}</span>
            </a>
          ))}
        </div>
      </section>

      <section
        id="mini-frank"
        className={styles.character}
        aria-labelledby="character-title"
      >
        <div className={styles.characterCopy}>
          <p className={styles.label}>Meet my illustrated counterpart</p>
          <h2 id="character-title">
            Same curiosity.
            <br />
            Smaller shoes.
          </h2>
          <p className={styles.lead}>
            It started with a photo and a thought: what would a tiny version of
            me get up to?
          </p>
          <p>
            Mini Frank climbs into the work. He makes music on enormous piano
            keys, travels with little companions and untangles the occasional
            coding disaster.
          </p>
          <p>
            The scenes let me give an idea a face, a setting and a little
            humour. The character stays recognisably me. The world around him
            can change.
          </p>
          <Link href="/guides/mini-me-storyboard" className={styles.primary}>
            Make your own Mini Me <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <p className={styles.caption}>
            The storyboard guide includes the process, character decisions and
            prompts from the original series. The companions are illustrations;
            their appearance does not imply endorsement by their source brands.
          </p>
        </div>
        <figure className={styles.comicArt}>
          <Image
            src="/images/guides/mini-me/collection-02-03.svg"
            alt="A three-panel Mini Frank comic: a small code change becomes a tangled red knot, then Frank and his coding companions work through it together."
            width={941}
            height={1672}
            sizes="(max-width: 700px) 90vw, 40vw"
          />
          <figcaption>
            A small change. One more thing. Then a closer look.
          </figcaption>
        </figure>
      </section>

      <section className={styles.principles} aria-labelledby="principles-title">
        <div>
          <p className={styles.label}>How I think</p>
          <h2 id="principles-title">
            What matters
            <br />
            in the making.
          </h2>
          <TrackedLink
            href="/qualities"
            {...coreQualitiesNavigationEvent({
              source: "about",
              placement: "principles",
              destination: "overview",
            })}
            className={styles.textLink}
          >
            The four governing qualities{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </TrackedLink>
        </div>
        <div>
          {practices.map((practice) => (
            <article key={practice.title}>
              <h3>{practice.title}</h3>
              <p>{practice.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.questions} aria-labelledby="questions-title">
        <h2 id="questions-title">A little more context.</h2>
        {questions.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
        <p className={styles.caption}>
          FrankX is independent from Oracle. My former role informs the work.
          Published positions and final decisions are mine.{" "}
          <Link href="/workspace">See how the workspace runs.</Link>
        </p>
      </section>

      <section
        id="connect"
        className={styles.connect}
        aria-labelledby="connect-title"
      >
        <p className={styles.label}>
          Based in Amsterdam. Open to a good conversation.
        </p>
        <h2 id="connect-title">
          What are you
          <br />
          building?
        </h2>
        <p>
          A product, a research question, a creative project or a room full of
          curious people. Tell me what you have in mind.
        </p>
        <TrackedLink
          href="/connect"
          eventName="about_connect"
          eventProperties={{ placement: "closing" }}
          className={styles.primary}
        >
          Let’s talk <ArrowUpRight size={18} aria-hidden="true" />
        </TrackedLink>
        <div className={styles.socials}>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={17} aria-hidden="true" />
            LinkedIn
          </a>
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={17} aria-hidden="true" />
            GitHub
          </a>
          <Link href="/partnerships">
            Explore collaborations <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
