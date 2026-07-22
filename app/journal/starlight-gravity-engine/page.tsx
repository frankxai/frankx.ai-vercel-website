import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const REPO = "https://github.com/frankxai/starlight-gravity-engine";

export const metadata: Metadata = {
  title:
    "The Starlight Gravity Engine: Human and Agentic Engineering for a Life People Want to Join | FrankX",
  description:
    "The next personal operating system will not merely manage tasks. It will compound the ideas, relationships, rooms and opportunities surrounding a human.",
  alternates: { canonical: "/journal/starlight-gravity-engine" },
  openGraph: {
    title: "The Starlight Gravity Engine",
    description:
      "The next personal operating system will not merely manage tasks. It will compound the ideas, relationships, rooms and opportunities surrounding a human.",
    url: "/journal/starlight-gravity-engine",
    type: "article",
  },
};

export default function StarlightGravityEssay() {
  return (
    <main className="min-h-screen bg-void text-white">
      <article className="mx-auto max-w-3xl px-6 py-20 lg:px-8 lg:py-28">
        <Link
          href="/starlight/gravity"
          className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-tech-light"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Starlight · Gravity Engine
        </Link>

        <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.24em] text-tech-light/80">
          Journal · Founder essay
        </p>
        <h1 className="mt-4 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-white sm:text-5xl">
          The Starlight Gravity Engine: Human and Agentic Engineering for a Life People Want to Join
        </h1>

        <p className="mt-8 border-l-2 border-tech-light/60 pl-5 text-lg leading-relaxed text-white/80 sm:text-xl">
          The next personal operating system will not merely manage tasks. It will compound the
          ideas, relationships, rooms and opportunities surrounding a human.
        </p>

        <div className="mt-12 space-y-6 text-base leading-relaxed text-white/70 sm:text-lg">
          <p>
            Some people bend the space around them. Ideas find them. Collaborators show up. Rooms
            form where they sit down. Opportunities arrive that no plan could have scheduled. We call
            it luck, or charisma, or being well-connected — and then we shrug, as if it were weather.
          </p>
          <p>
            It is not weather. It is <em>gravity</em>, and gravity can be engineered. Not
            manufactured, not faked, not automated into a spam cannon that messages a thousand
            strangers a templated compliment. Engineered the way a garden is engineered — by tending
            real things until they compound.
          </p>

          <h2 className="pt-4 text-2xl font-semibold tracking-tight text-white">
            Gravity is a product of five forces
          </h2>
          <p>
            Direction, Signal, Contribution, Convening, Reliability. A direction people can see. The
            signals you notice and actually keep. Generosity before the ask. The willingness to
            convene rather than merely attend. And promises that come true. It is a{" "}
            <em>product</em>, not a sum — a person with brilliant signal and zero reliability has
            almost no gravity, because the multiplication collapses. You cannot buy your way out of a
            weak force with a strong one. You can only raise the floor.
          </p>

          <h2 className="pt-4 text-2xl font-semibold tracking-tight text-white">
            What the agents are actually for
          </h2>
          <p>
            The temptation of this moment is to point the new machines at other people — to scrape,
            to score, to rank, to auto-message, to simulate warmth at scale. That road produces the
            opposite of gravity. It produces the uncanny, the resented, the blocked.
          </p>
          <p>
            Agents are not for manufacturing the forces. They are for removing the friction that
            keeps humans from expressing forces they already have. An agent can remember the person
            you met eighteen months ago and the thing they were struggling with. It can prepare you
            before the room so you arrive generous instead of scrambling. It can turn the note you
            scrawled after dinner into a publishable artifact by morning. It can notice a promise
            about to go stale and hand you the chance to keep it.
          </p>
          <p>
            Memory. Consistency. Preparation. Transformation. Cycle frequency. Those are the agentic
            contributions, and they are enormous. But an agent does not manufacture judgment,
            presence, generosity, trust, relationship intent, or identity. Those are yours. They are
            the only things that were ever going to create the gravity in the first place.
          </p>

          <h2 className="pt-4 text-2xl font-semibold tracking-tight text-white">
            The line we wrote into the code
          </h2>
          <p>
            The human decides who to trust, what things mean, who gets introduced, what gets said,
            and what gets published. Always. So we did not leave that to good intentions. Speculation
            about attraction, diagnosis, or hidden intent is refused at capture. A person record has
            no field for a score, because we made it structurally impossible to add one. An
            introduction cannot be made until both people have said yes. Nothing marked private can
            be published without a human, a provenance chain, and an explicit act of approval.
          </p>

          <h2 className="pt-4 text-2xl font-semibold tracking-tight text-white">The invitation</h2>
          <p>
            Build a direction people can see. Keep the signals you notice. Give first. Convene. Keep
            your word. Then let agents make each of those cheaper, faster, and more consistent than
            you could sustain alone — so the field around you compounds instead of leaking away.
          </p>
          <p>
            That is the engine. It runs on your own machine, owes nothing to the cloud, and works in
            fifteen minutes with any capable AI agent or a folder of files. It is open, and it is
            built to be joined.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-10 sm:flex-row sm:flex-wrap">
          <Link
            href={REPO}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-tech-light px-6 py-3 text-sm font-semibold text-void transition hover:bg-white"
          >
            Get the engine on GitHub
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/starlight/gravity"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white"
          >
            The Gravity Engine overview
          </Link>
          <Link
            href="/mvu"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white"
          >
            Most Valuable Unlock
          </Link>
        </div>
      </article>
    </main>
  );
}
