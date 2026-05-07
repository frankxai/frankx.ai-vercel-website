import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  Clock,
  Heart,
  Mic,
  Printer,
  Quote,
  Sparkles,
  Users,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Interview-Kit — Fragen für die Großeltern',
  description: 'Strukturierte Fragenkataloge für die Gespräche mit Opa David, Oma Dorothea, Oma Paulina und Opa Alexander. Ausdruckbar, respektvoll, sanft.',
  robots: { index: false, follow: false },
}

interface InterviewSet {
  person: string
  linie: string
  priorität: string
  farbe: string
  hintergrund: string
  kernfragen: { thema: string; fragen: string[] }[]
}

const interviews: InterviewSet[] = [
  {
    person: 'Opa David Gorte',
    linie: 'Gorte-Linie',
    priorität: 'Höchste — Eltern-Namen sind völlig unbekannt',
    farbe: 'from-amber-500/10 to-transparent border-amber-500/20',
    hintergrund:
      'Wir kennen David. Wir kennen seine zehn Kinder teilweise. Wir wissen nichts über seine Eltern. Jede Information, die er weitergeben kann, öffnet die Gorte-Linie rückwärts.',
    kernfragen: [
      {
        thema: 'Deine eigenen Eltern',
        fragen: [
          'Wie hieß dein Vater? Wann wurde er geboren? Wo?',
          'Wie hieß deine Mutter mit Mädchennamen? Wann wurde sie geboren? Wo?',
          'Was waren sie von Beruf? Was haben sie gemacht?',
          'Hast du Fotos von ihnen?',
          'Wie alt warst du, als du sie verloren hast? Wie sind sie gestorben?',
          'Was haben sie über ihre eigenen Eltern erzählt — also deine Großeltern?',
        ],
      },
      {
        thema: 'Deine Geschwister',
        fragen: [
          'Wie viele Geschwister hattest du?',
          'Was waren ihre Namen, in der Reihenfolge der Geburt?',
          'Wer war älter, wer jünger?',
          'Leben noch welche? Wo?',
        ],
      },
      {
        thema: 'Deine eigenen zehn Kinder',
        fragen: [
          'Könnten wir gemeinsam alle zehn Kinder aufschreiben — Namen, Geburtsjahre, wo sie heute leben?',
          'Gibt es Geschichten über Geburten, die du uns erzählen magst?',
        ],
      },
      {
        thema: 'Orte und Herkunft',
        fragen: [
          'Wo bist du geboren?',
          'Wie hieß das Dorf, aus dem die Familie Gorte ursprünglich kam?',
          'Gibt es Erzählungen, woher die Gortes nach Karaganda kamen?',
          'Wann habt ihr das Dorf verlassen?',
        ],
      },
      {
        thema: 'Dokumente und Erinnerungsstücke',
        fragen: [
          'Hast du Geburtsurkunden, Hochzeitsurkunden, Pässe, Briefe?',
          'Gibt es Fotos aus der Zeit in Kasachstan?',
          'Gibt es Kirchenbücher oder alte Bibeln mit Familiennamen?',
          'Dürfen wir das alles einmal gemeinsam durchgehen?',
        ],
      },
    ],
  },
  {
    person: 'Oma Dorothea Gorte (geb. Prager)',
    linie: 'Prager-Linie',
    priorität: 'Höchste — Prager-Eltern komplett unbekannt',
    farbe: 'from-amber-500/10 to-transparent border-amber-500/20',
    hintergrund:
      'Dorotheas Geburtsname Prager öffnet eine eigene Linie — aber nur, wenn wir ihre Eltern kennen. Der Name könnte auf böhmische oder sudetendeutsche Herkunft hinweisen, aber ohne konkrete Namen bleibt alles Spekulation.',
    kernfragen: [
      {
        thema: 'Deine Eltern (Prager-Seite)',
        fragen: [
          'Wie hieß dein Vater — der Prager? Wann und wo wurde er geboren?',
          'Wie hieß deine Mutter mit ihrem Mädchennamen?',
          'Waren deine Eltern auch in Kasachstan? Oder woanders?',
          'Haben sie die Kriegszeit erlebt? Was haben sie dir erzählt?',
        ],
      },
      {
        thema: 'Der Name Prager',
        fragen: [
          'Weißt du, woher der Name Prager kommt? Hat jemand in der Familie darüber gesprochen?',
          'Gab es eine Verbindung zu Prag, zu Böhmen, zu Tschechien?',
          'Wie haben eure Nachbarn eure Familie wahrgenommen — als deutsch, als deutsch-böhmisch, anders?',
        ],
      },
      {
        thema: 'Deine Geschwister',
        fragen: [
          'Hattest du Geschwister? Wie viele? Namen?',
          'Wer ist geblieben, wer ist weggezogen?',
          'Könnte einer deiner Geschwister noch mehr über die Eltern wissen?',
        ],
      },
      {
        thema: 'Deine frühen Jahre',
        fragen: [
          'Wo bist du aufgewachsen?',
          'Wie war dein Elternhaus?',
          'Welche Sprachen wurden zuhause gesprochen? Deutsch, Russisch, etwas Drittes?',
          'Gibt es Lieder oder Gedichte, die deine Mutter dir beigebracht hat?',
        ],
      },
      {
        thema: 'Dokumente',
        fragen: [
          'Besitzt du noch Dokumente von vor der Ausreise?',
          'Fotos von deinen Eltern, deiner Familie?',
          'Wäre es möglich, sie abzufotografieren?',
        ],
      },
    ],
  },
  {
    person: 'Opa Alexander Riemer',
    linie: 'Riemer-Linie',
    priorität: 'Höchste — er ist die direkte Brücke zu Christian (1914)',
    farbe: 'from-cyan-500/10 to-transparent border-cyan-500/20',
    hintergrund:
      'Alexander ist Christians Sohn. Alles, was wir über Christians Eltern, seine Herkunftskolonie, seine Zeit in der Trudarmee wissen können, geht über Alexander. Er ist die wichtigste Quelle der gesamten Riemer-Forschung.',
    kernfragen: [
      {
        thema: 'Dein Vater Christian',
        fragen: [
          'Wann und wo genau wurde dein Vater Christian geboren?',
          'Wie hießen seine Eltern — also deine Großeltern?',
          'Was hat er dir über seine Kindheit erzählt?',
          'Welche Sprache hat er als Kind gesprochen?',
          'Hat er von Geschwistern erzählt?',
        ],
      },
      {
        thema: 'Die Herkunfts-Kolonie',
        fragen: [
          'Hat Christian erwähnt, aus welchem Dorf die Familie kam?',
          'Gab es einen Namen wie Reinwald, Katharinenstadt, Orlovsky — oder ein anderer?',
          'War die Familie schon lange in Karaganda, oder sind sie erst später gekommen?',
          'Gab es eine Geschichte über die Reise, die Deportation, die Flucht?',
        ],
      },
      {
        thema: 'Die Trudarmee',
        fragen: [
          'Hat Christian über die Trudarmee gesprochen?',
          'Wo war er im Einsatz? Wie lange?',
          'Wie hat er das Lager überlebt?',
          'Gab es andere aus der Familie, die auch eingezogen wurden?',
        ],
      },
      {
        thema: 'Deine Mutter',
        fragen: [
          'Wie hieß Christians Frau — also deine Mutter?',
          'Woher kam sie? Aus welcher Familie?',
          'Wann und wo haben sie geheiratet?',
        ],
      },
      {
        thema: 'Dokumente, Fotos, Briefe',
        fragen: [
          'Besitzt du noch Christians Geburtsurkunde, Pass, Sondersiedler-Ausweis?',
          'Gibt es Fotos von ihm als jungem Mann? Als Kind?',
          'Hat er Briefe hinterlassen, Notizen, ein Tagebuch?',
          'Könnten wir alles gemeinsam ansehen und digital fotografieren?',
        ],
      },
    ],
  },
  {
    person: 'Oma Paulina Riemer (geb. Schneider)',
    linie: 'Schneider-Linie',
    priorität: 'Hoch — Franz und Amalia Schneider bekannt, Herkunftskolonie offen',
    farbe: 'from-cyan-500/10 to-transparent border-cyan-500/20',
    hintergrund:
      'Wir kennen die Namen von Paulinas Eltern — Franz und Amalia Schneider. Aber wir wissen nicht, aus welcher Kolonie sie kamen. Schneider-Familien gab es in Moor, Beauregard, Straub und vielen anderen Kolonien. Ohne die richtige Kolonie ist weitere Forschung blockiert.',
    kernfragen: [
      {
        thema: 'Deine Eltern Franz und Amalia',
        fragen: [
          'Wo wurden Franz und Amalia geboren?',
          'Aus welchem Dorf oder welcher Kolonie kamen sie ursprünglich?',
          'Was waren sie von Beruf?',
          'Wie haben sie sich kennengelernt?',
          'Wann sind sie gestorben? Wo?',
        ],
      },
      {
        thema: 'Amalias Geburtsname',
        fragen: [
          'Wie hieß deine Mutter Amalia mit Geburtsnamen — bevor sie Franz heiratete?',
          'Weißt du, wie ihre Eltern hießen?',
        ],
      },
      {
        thema: 'Deine Geschwister',
        fragen: [
          'Wie viele Geschwister hattest du?',
          'Was waren ihre Namen?',
          'Leben noch welche?',
          'Könntest du uns alle aufschreiben — mit Geburtsjahren, falls du sie erinnerst?',
        ],
      },
      {
        thema: 'Die Schneider-Linie zurück',
        fragen: [
          'Haben deine Eltern von ihren eigenen Eltern erzählt — also deinen Großeltern?',
          'Gab es Geschichten über die alte Heimat an der Wolga?',
          'Habt ihr Kontakt zu anderen Schneider-Familien gehabt?',
        ],
      },
      {
        thema: 'Deine Ehe mit Alexander',
        fragen: [
          'Wie hast du Alexander kennengelernt?',
          'Wann und wo habt ihr geheiratet?',
          'Gibt es Hochzeitsfotos?',
        ],
      },
    ],
  },
]

const ethische_leitlinien = [
  'Frag immer, bevor du die Aufnahme startest. „Darf ich unser Gespräch aufnehmen, damit ich später nichts vergesse?"',
  'Lass Pausen stehen. Manche der besten Antworten kommen nach fünf Sekunden Stille.',
  'Korrigiere nicht. Wenn etwas widersprüchlich klingt, notiere es und frag später — nicht sofort.',
  'Manche Themen sind schwer. Krieg, Verlust, Deportation. Geh sanft vor. Wenn sie nicht reden wollen, dränge nicht.',
  'Ein Gespräch reicht selten. Plane drei, vier, fünf Besuche. Jedes Mal erinnert sich etwas Neues.',
  'Bedanke dich. Mach klar, dass du das Erzählte bewahren wirst. Das ist für viele Großeltern wichtiger als jede Antwort.',
]

export default function InterviewKitPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-950/25 via-stone-950/40 to-[#0a0a0b]" />
          <div className="absolute top-20 left-1/3 h-[500px] w-[500px] rounded-full bg-rose-600/6 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 pb-12 pt-28 sm:pt-32">
          <Link
            href="/familie"
            className="mb-8 inline-flex items-center gap-2 text-sm text-white/25 transition-colors hover:text-white/50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Familie
          </Link>

          <div className="mb-4 flex items-center gap-3">
            <Mic className="h-8 w-8 text-rose-400" />
            <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Interview-Kit
            </h1>
          </div>

          <p className="max-w-2xl font-serif text-lg leading-relaxed text-white/55">
            Vier strukturierte Fragenkataloge — für die Gespräche, die nicht
            warten können. Nimm dein Handy, setz dich hin, drück auf Aufnahme.
            Was du heute fängst, existiert in hundert Jahren noch.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            <HeroMeta icon={Users} text="4 Großeltern" />
            <HeroMeta icon={Clock} text="60–90 Min pro Gespräch" />
            <HeroMeta icon={Heart} text="Für die Familie" />
          </div>
        </div>
      </section>

      {/* Ethische Leitlinien */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <p className="mb-4 font-serif text-xs uppercase tracking-[0.2em] text-white/30">
            Bevor du beginnst
          </p>
          <h2 className="mb-6 font-serif text-2xl font-semibold text-white">
            Sechs sanfte Leitlinien.
          </h2>

          <div className="space-y-3">
            {ethische_leitlinien.map((leitlinie, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-400/60" />
                <p className="font-serif text-sm leading-relaxed text-white/60">
                  {leitlinie}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interview-Sets */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <p className="mb-4 font-serif text-xs uppercase tracking-[0.2em] text-white/30">
            Die Fragenkataloge
          </p>
          <h2 className="mb-12 font-serif text-2xl font-semibold text-white">
            Vier Gespräche, vier Linien.
          </h2>

          <div className="space-y-12">
            {interviews.map((set) => (
              <article
                key={set.person}
                className={`rounded-3xl border bg-gradient-to-br ${set.farbe} p-6 sm:p-8`}
              >
                <p className="mb-2 font-serif text-xs uppercase tracking-[0.15em] text-white/40">
                  {set.linie}
                </p>
                <h3 className="mb-3 font-serif text-2xl font-bold text-white sm:text-3xl">
                  {set.person}
                </h3>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-[11px] font-medium text-rose-300">
                  {set.priorität}
                </div>
                <p className="mb-8 font-serif text-base leading-relaxed text-white/60">
                  {set.hintergrund}
                </p>

                <div className="space-y-6">
                  {set.kernfragen.map((block) => (
                    <div
                      key={block.thema}
                      className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6"
                    >
                      <h4 className="mb-4 font-serif text-sm font-semibold uppercase tracking-wider text-white/70">
                        {block.thema}
                      </h4>
                      <ul className="space-y-3">
                        {block.fragen.map((frage, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 font-serif text-base leading-relaxed text-white/60"
                          >
                            <Quote className="mt-1.5 h-3 w-3 flex-shrink-0 text-white/25" />
                            <span>{frage}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Print tip */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 text-center">
            <Printer className="mx-auto mb-3 h-6 w-6 text-white/40" />
            <h2 className="mb-3 font-serif text-lg font-semibold text-white">
              Zum Mitnehmen
            </h2>
            <p className="mx-auto max-w-lg font-serif text-sm leading-relaxed text-white/50">
              Diese Seite lässt sich direkt ausdrucken — drücke Cmd/Strg+P. Nimm
              sie ausgedruckt mit zum Besuch. Ein Stift dazu. Oder ein Handy mit
              Sprachmemo-App. Das reicht.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-3xl px-6 py-8 text-center">
          <p className="mb-4 font-serif text-xs italic text-white/25">
            „Was wir nicht fangen, verschwindet. Was wir fangen, bleibt."
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/familie"
              className="font-serif text-xs text-white/25 transition-colors hover:text-white/50"
            >
              Familie
            </Link>
            <span className="text-white/10">·</span>
            <Link
              href="/familie/geschichte/offene-fragen"
              className="font-serif text-xs text-white/25 transition-colors hover:text-white/50"
            >
              Offene Fragen
            </Link>
            <span className="text-white/10">·</span>
            <Link
              href="/familie/mitmachen"
              className="font-serif text-xs text-white/25 transition-colors hover:text-white/50"
            >
              Mitmachen
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function HeroMeta({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
      <Icon className="h-3.5 w-3.5 text-white/40" />
      <span className="font-serif text-xs text-white/50">{text}</span>
    </div>
  )
}
