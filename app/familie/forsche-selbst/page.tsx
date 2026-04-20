import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  ExternalLink,
  FileText,
  Heart,
  Library,
  MapPin,
  Mic,
  Quote,
  Sparkles,
  Users,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Forsche selbst — Wie man Vorfahren findet, ohne zu erfinden | FrankX',
  description: 'Ich habe einen Kandidaten gefunden — getauft 1729 in Freudental, Gründungssiedler einer Wolga-Kolonie. Ob er mein Vorfahr ist, weiß ich nicht. Hier ist, wie ich den Unterschied zwischen Hypothese und Beweis handhabe — und wie du es auch kannst.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Kandidat gefunden. Beweis offen. So forsche ich ehrlich.',
    description: 'Die Methode, um Familienforschung mit KI zu betreiben, ohne sich selbst zu belügen. Drei Bewegungen: zuhören, suchen, bewahren — mit Konfidenzlevel in jedem Schritt.',
    type: 'article',
    locale: 'de_DE',
  },
}

const werkzeuge = [
  {
    name: 'FamilySearch',
    url: 'https://www.familysearch.org',
    rolle: 'Das Fundament',
    notiz: '1.350+ Mikrofilme russlanddeutscher Quellen. Kirchenbücher von 1748 bis 1934. Kostenlos, dank der Mormonen-Gemeinschaft. Hier beginnt fast jede Recherche.',
  },
  {
    name: 'Volga German Institute',
    url: 'https://volgagermaninstitute.org',
    rolle: 'Die Kolonie-Datenbank',
    notiz: 'Für jede der 104 Wolgadeutschen Kolonien: Gründungsdatum, dokumentierte Familiennamen, Census-Daten. Hier habe ich Reimer in Reinwald gefunden.',
  },
  {
    name: 'wolgadeutsche.net',
    url: 'https://forum.wolgadeutsche.net',
    rolle: 'Die Community',
    notiz: 'Ein aktives deutschsprachiges Forum. Ganze Threads zu einzelnen Familiennamen. Menschen, die seit Jahrzehnten forschen. Man muss nur fragen.',
  },
  {
    name: 'AHSGR',
    url: 'https://ahsgr.org/research/',
    rolle: 'Die Transportakten',
    notiz: '62 freigegebene Deportations-Transportdateien von 1941. Wer wurde wohin gebracht. Die Brücke zwischen Wolga und Kasachstan.',
  },
  {
    name: 'Museum Detmold',
    url: 'https://www.russlanddeutsche.de',
    rolle: 'Das Archiv',
    notiz: 'Museum für russlanddeutsche Kulturgeschichte. 7.000 Bände. Eine eigene Arbeitsgemeinschaft für Familienforschung. Sie helfen per E-Mail.',
  },
  {
    name: 'Claude · ACOS',
    url: 'https://frankx.ai/acos',
    rolle: 'Das Agenten-Team',
    notiz: 'KI-Agenten, die parallel Quellen durchsuchen, Fakten gegenprüfen, und Hypothesen bewerten. Das System, das ich sonst für Oracle-Kunden baue — hier für etwas Persönlicheres.',
  },
]

const interviewFragen = [
  'Wie hießen eure Eltern? Und eure Großeltern?',
  'Wo seid ihr geboren? Wo aufgewachsen?',
  'Wann und warum seid ihr umgezogen?',
  'Was wart ihr von Beruf? Was eure Eltern?',
  'Welche Geschichten hat man euch erzählt?',
  'Gibt es Fotos, Briefe, Urkunden, die ihr aufgehoben habt?',
  'Wen habt ihr verloren im Krieg? In der Deportation?',
  'Was war euch immer wichtig, damit wir es nicht vergessen?',
]

export default function ForscheSelbstPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      {/* ═══════════════════════════════════════════════════════════════
          HERO — The discovery leads
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 via-stone-950/40 to-[#0a0a0b]" />
          <div className="absolute top-20 left-1/3 h-[600px] w-[600px] rounded-full bg-amber-600/6 blur-[140px]" />
          <div className="absolute top-40 right-1/4 h-[400px] w-[400px] rounded-full bg-emerald-600/4 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 pb-16 pt-28 sm:pt-36">
          <Link
            href="/familie"
            className="mb-12 inline-flex items-center gap-2 text-sm text-white/25 transition-colors hover:text-white/50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Familie
          </Link>

          {/* Hook — honest framing */}
          <p className="mb-6 font-serif text-sm uppercase tracking-[0.25em] text-amber-400/50">
            Was ich gefunden habe — und was ich noch nicht weiß
          </p>

          <h1 className="mb-8 font-serif text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ein
            <span className="bg-gradient-to-r from-amber-200 via-amber-100 to-white bg-clip-text text-transparent">
              {' '}Kandidat{' '}
            </span>
            aus
            <br />
            dem Jahr 1729.
          </h1>

          <div className="mb-10 space-y-5 font-serif text-lg leading-[1.75] text-white/60">
            <p>
              Johann Konrad Reimer. Getauft am 6. Mai 1729 in der evangelischen
              Kirche in Freudental, 35 Kilometer nördlich von Stuttgart.
              Gründungssiedler der Kolonie Reinwald an der Wolga, 1766.
            </p>
            <p>
              Ein KI-Agenten-Team hat diesen Mann gefunden. Er existiert. Er ist
              archivisch belegt. Und er könnte mein Ur-ur-ur-urgroßvater sein.
              Er könnte es aber auch nicht sein.
            </p>
            <p className="text-white/50">
              Weil zwischen ihm (1798 letzter Census-Eintrag) und meinem bekannten
              Urgroßvater Christian Riemer (Karaganda, 1914) 116 Jahre liegen —
              116 Jahre ohne dokumentierte Kette. Das ist der Unterschied zwischen
              einem plausiblen Kandidaten und einem bewiesenen Vorfahren.
            </p>
          </div>

          {/* Lead with honesty */}
          <div className="border-l-2 border-amber-400/30 pl-6">
            <p className="font-serif text-base leading-relaxed text-white/70">
              Was ich hier beschreibe, ist nicht, wie man Ahnen findet. Es ist,
              wie man Kandidaten findet — und dann ehrlich mit ihnen umgeht. Wie
              man Hypothesen von Beweisen unterscheidet, und beides transparent
              macht. Diese Disziplin ist der Unterschied zwischen Familienforschung
              und Folklore.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WHY NOW — The urgency, quietly
      ═══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <p className="mb-6 font-serif text-sm uppercase tracking-[0.25em] text-white/30">
            Warum jetzt
          </p>
          <h2 className="mb-8 font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl">
            Was vor fünf Jahren unmöglich war, dauert heute einen Nachmittag.
          </h2>

          <div className="space-y-5 font-serif text-base leading-[1.8] text-white/55">
            <p>
              Archive sind digitalisiert. KI-Agenten können in Minuten Quellen
              lesen, für die ein Mensch Wochen bräuchte. Übersetzungen alter
              Handschriften, Abgleich mit hundert Datenbanken gleichzeitig,
              Konfidenz-Bewertung jeder Aussage — alles ist möglich.
            </p>
            <p>
              Gleichzeitig wird das Zeitfenster kleiner. Unsere Großeltern sind
              die letzten, die die Originalgeschichte noch erzählen können. Nicht
              als Zweitquelle, sondern als Erinnerung. Einmal verloren ist für
              immer verloren.
            </p>
            <p>
              Das hier ist kein Hobby. Es ist Bewahrung. Und es ist
              zum ersten Mal in der Geschichte für jede Familie erreichbar.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          THE METHOD — Three movements, not five steps
      ═══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <p className="mb-6 font-serif text-sm uppercase tracking-[0.25em] text-amber-400/50">
            Die Methode
          </p>
          <h2 className="mb-12 font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl">
            Vier Bewegungen. Eine Disziplin.
          </h2>

          <div className="space-y-16">
            {/* Movement 1 */}
            <div>
              <div className="mb-6 flex items-baseline gap-4">
                <span className="font-serif text-5xl font-light text-amber-400/40">I.</span>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-white">
                    Zuhören
                  </h3>
                  <p className="mt-1 font-serif text-sm italic text-white/30">
                    Bevor Archive, kommen Menschen.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pl-0 sm:pl-12 font-serif text-base leading-[1.8] text-white/55">
                <p>
                  Nimm dein Handy. Setz dich zu deiner Oma, deinem Opa, deinen
                  Eltern. Stell eine Frage, dann noch eine, dann noch eine. Drück
                  auf Aufnahme und lass laufen. Was du suchst, ist nicht nur
                  Daten — du suchst den Ton, die Pausen, die Namen, die sie
                  beiläufig erwähnen.
                </p>
                <p>
                  Später, wenn du Archive durchsuchst, wirst du diese Aufnahmen
                  wieder hören. Dann macht plötzlich ein Name Sinn. Dann erkennst
                  du einen Ort. Dann schließt sich ein Kreis.
                </p>
              </div>

              {/* Interview Questions — elegant list */}
              <div className="mt-8 sm:ml-12 rounded-2xl border border-amber-500/10 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-2">
                  <Mic className="h-4 w-4 text-amber-400/60" />
                  <p className="font-serif text-xs uppercase tracking-[0.15em] text-amber-400/60">
                    Was du fragen kannst
                  </p>
                </div>
                <ul className="space-y-3">
                  {interviewFragen.map((frage, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 font-serif text-base leading-relaxed text-white/60"
                    >
                      <Quote className="mt-1.5 h-3 w-3 flex-shrink-0 text-amber-400/30" />
                      {frage}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-serif text-sm italic text-white/30">
                  Es gibt keine falsche Reihenfolge. Es gibt keine falschen
                  Antworten. Es gibt nur Stille — oder das Gegenteil davon.
                </p>
              </div>
            </div>

            {/* Movement 2 */}
            <div>
              <div className="mb-6 flex items-baseline gap-4">
                <span className="font-serif text-5xl font-light text-emerald-400/40">II.</span>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-white">
                    Suchen
                  </h3>
                  <p className="mt-1 font-serif text-sm italic text-white/30">
                    Lass die Agenten parallel arbeiten.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pl-0 sm:pl-12 font-serif text-base leading-[1.8] text-white/55">
                <p>
                  Hier kommt die KI ins Spiel — aber anders, als du vielleicht
                  denkst. Nicht als Orakel, das eine Antwort ausspuckt. Sondern
                  als ein Team von Rechercheuren, die parallel mehrere Archive
                  durchforsten, Ergebnisse gegenprüfen, und dir sagen, was
                  verlässlich ist und was nicht.
                </p>
                <p>
                  Ein guter Prompt startet mit einem Ort, einem Namen, einem
                  Zeitraum. Dann lässt du den Agenten Quellen aufzählen, die
                  er tatsächlich verifizieren kann. Was er nicht findet, markiert
                  er als offen. Das ist wichtiger als alles, was er findet.
                </p>
              </div>

              {/* Prompt Example */}
              <div className="mt-8 sm:ml-12 rounded-2xl border border-emerald-500/10 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-2">
                  <Brain className="h-4 w-4 text-emerald-400/60" />
                  <p className="font-serif text-xs uppercase tracking-[0.15em] text-emerald-400/60">
                    Der erste Prompt
                  </p>
                </div>
                <div className="rounded-xl bg-white/[0.03] p-5 font-mono text-sm leading-[1.7] text-white/50">
                  <span className="text-emerald-400/60">&gt; </span>
                  Ich suche nach dem Familiennamen <span className="text-white/80">[Dein Name]</span>
                  {' '}in russlanddeutschen Genealogie-Quellen.
                  <br />
                  <br />
                  Durchsuche bitte parallel:
                  <br />
                  — FamilySearch (Samara Church Books 1748-1934)
                  <br />
                  — Volga German Institute (Surnames-Register)
                  <br />
                  — wolgadeutsche.net Forum-Archive
                  <br />
                  — AHSGR Surname Charts
                  <br />
                  <br />
                  Für jeden Treffer: Jahr, Kolonie, verifizierbare Quelle,
                  Konfidenz-Level. Was nicht belegt ist, markiere als Hypothese.
                </div>
                <p className="mt-4 font-serif text-sm italic text-white/35">
                  Genau dieser Prompt hat Reimer in Reinwald gefunden.
                </p>
              </div>
            </div>

            {/* Movement 3 — Verifizieren (the critical step) */}
            <div>
              <div className="mb-6 flex items-baseline gap-4">
                <span className="font-serif text-5xl font-light text-rose-400/40">III.</span>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-white">
                    Verifizieren
                  </h3>
                  <p className="mt-1 font-serif text-sm italic text-white/30">
                    Vom Kandidaten zum Beweis.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pl-0 sm:pl-12 font-serif text-base leading-[1.8] text-white/55">
                <p>
                  Das hier ist die Bewegung, die die meisten Familienforscher
                  überspringen. Sie finden einen plausiblen Kandidaten, jubeln,
                  und erzählen der Familie, sie stamme von dort ab. Das ist
                  Folklore, keine Forschung.
                </p>
                <p>
                  Ein Kandidat wird erst zum Vorfahren, wenn die Kette
                  dazwischen — Generation für Generation — durch Dokumente
                  belegt ist. Kirchenbücher, Census-Listen, Taufzeugnisse,
                  Heiratsregister. Jedes Glied einzeln.
                </p>
                <p>
                  Bei mir fehlen zwischen dem Kandidaten von 1798 und dem
                  gesicherten Urgroßvater von 1914 genau 116 Jahre. Das sind
                  etwa vier Generationen. Ohne diese vier Generationen ist die
                  Zuordnung eine Hypothese — keine Tatsache. Und ich schreibe
                  es genau so auf.
                </p>
              </div>

              <div className="mt-8 sm:ml-12 rounded-2xl border border-rose-500/10 bg-gradient-to-br from-rose-500/5 via-transparent to-transparent p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-rose-400/60" />
                  <p className="font-serif text-xs uppercase tracking-[0.15em] text-rose-400/60">
                    Die vier Konfidenzstufen
                  </p>
                </div>
                <ul className="space-y-3 font-serif text-sm leading-relaxed text-white/55">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5">🟢</span>
                    <span><span className="text-white/80">Verifiziert.</span> Durch mindestens eine primäre Archivquelle belegt. Kirchenbuch, Urkunde, Census-Eintrag. Kann zitiert werden.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5">🟡</span>
                    <span><span className="text-white/80">Überlieferung.</span> Von lebenden Familienmitgliedern berichtet. Wertvoll — aber nicht unabhängig bestätigt. Kann trügen.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5">🔍</span>
                    <span><span className="text-white/80">Hypothese.</span> Plausibel, aber unbewiesen. Ein Kandidat. Darf benannt werden — mit dem Label „Hypothese" davor.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5">🔴</span>
                    <span><span className="text-white/80">Unbekannt.</span> Noch nicht erforscht. Die ehrlichste Kategorie — und oft die größte, wenn man beginnt.</span>
                  </li>
                </ul>
                <p className="mt-5 font-serif text-sm italic text-white/35">
                  Jede Aussage auf unserer Familien-Seite trägt eines dieser
                  Zeichen. Das ist nicht Bescheidenheit. Das ist die Grundlage
                  von Vertrauen.
                </p>
              </div>
            </div>

            {/* Movement 4 — Bewahren */}
            <div>
              <div className="mb-6 flex items-baseline gap-4">
                <span className="font-serif text-5xl font-light text-violet-400/40">IV.</span>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-white">
                    Bewahren
                  </h3>
                  <p className="mt-1 font-serif text-sm italic text-white/30">
                    Schreibe so, dass deine Enkel es noch lesen.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pl-0 sm:pl-12 font-serif text-base leading-[1.8] text-white/55">
                <p>
                  Jede Erkenntnis bekommt einen Status. Verifiziert, wenn ein
                  Archiv es bestätigt. Überlieferung, wenn es von der Familie
                  kommt. Hypothese, wenn es plausibel, aber unbelegt ist.
                  Unbekannt, wenn du es noch nicht weißt.
                </p>
                <p>
                  Diese Ehrlichkeit ist das, was Familienforschung von Folklore
                  unterscheidet. Deine Enkel werden es dir danken, dass du
                  klar gemacht hast, was Wissen ist und was Erinnerung.
                </p>
                <p>
                  Teile dann, was du weißt. In der Familie. Im{' '}
                  <a
                    href="https://forum.wolgadeutsche.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400/80 underline underline-offset-4 decoration-violet-400/30 hover:decoration-violet-400/70"
                  >
                    wolgadeutsche.net Forum
                  </a>
                  . Bei{' '}
                  <a
                    href="https://www.wikitree.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400/80 underline underline-offset-4 decoration-violet-400/30 hover:decoration-violet-400/70"
                  >
                    WikiTree
                  </a>
                  . Oft hat jemand anders ein Puzzlestück, das dein Bild
                  vervollständigt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WHAT I USED — Tools with personality
      ═══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <p className="mb-6 font-serif text-sm uppercase tracking-[0.25em] text-white/30">
            Was ich benutzt habe
          </p>
          <h2 className="mb-4 font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl">
            Alles, was ich für den Reinwald-Kandidaten benutzt habe.
          </h2>
          <p className="mb-12 font-serif text-base leading-relaxed text-white/45">
            Keine Affiliate-Links. Keine Kurse. Alles frei verfügbar. Die
            Reihenfolge, in der ich sie tatsächlich benutzt habe — um zu einer
            Hypothese zu kommen, nicht zu einer Gewissheit.
          </p>

          <div className="space-y-4">
            {werkzeuge.map((w, i) => (
              <a
                key={w.name}
                href={w.url}
                target={w.url.startsWith('http') ? '_blank' : undefined}
                rel={w.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group block rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-1 flex items-baseline gap-3 flex-wrap">
                      <h3 className="font-serif text-lg font-semibold text-white">
                        {w.name}
                      </h3>
                      <span className="font-serif text-xs uppercase tracking-wider text-amber-400/50">
                        {w.rolle}
                      </span>
                    </div>
                    <p className="font-serif text-sm leading-relaxed text-white/45">
                      {w.notiz}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 flex-shrink-0 text-white/20 transition-colors group-hover:text-white/50" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PROOF — Not salesy, just honest about the source
      ═══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="rounded-3xl border border-amber-500/10 bg-gradient-to-br from-amber-950/30 via-transparent to-transparent p-8 sm:p-12">
            <p className="mb-6 font-serif text-sm uppercase tracking-[0.25em] text-amber-400/50">
              Ein Hinweis in eigener Sache
            </p>
            <div className="space-y-4 font-serif text-base leading-[1.8] text-white/60">
              <p>
                Das Agenten-System, das die Reinwald-Recherche gemacht hat, ist
                dasselbe, das ich als AI Architect bei Oracle für Fortune-500-Unternehmen
                baue. Nur dass es hier keine Enterprise-Anwendung war, sondern
                die Frage: wer waren meine Vorfahren.
              </p>
              <p>
                Ich nenne es{' '}
                <Link
                  href="/acos"
                  className="text-amber-400/80 underline underline-offset-4 decoration-amber-400/30 hover:decoration-amber-400/70"
                >
                  ACOS — den Agentic Creator OS
                </Link>
                . Ein Personal AI Center of Excellence, vereinfacht gesagt. Die
                gleiche Architektur, die bei Oracle Millionen kostet, hier als
                Framework für alles, was dir wichtig ist. Familienforschung ist
                nur eine Anwendung davon.
              </p>
              <p className="text-white/45">
                Du brauchst ACOS nicht, um das hier zu tun. Claude oder ChatGPT
                reichen. Ich erwähne es nur, weil Leute fragen, wie ich es
                konkret gemacht habe.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/acos"
                className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-5 py-2.5 font-serif text-sm font-medium text-amber-200 transition-all hover:bg-amber-500/20"
              >
                Mehr über ACOS
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/familie/geschichte/wolgadeutsche"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 font-serif text-sm font-medium text-white/50 transition-all hover:bg-white/10"
              >
                Die ganze Reinwald-Geschichte
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          ARCHIVE LIBRARY — For those who want more
      ═══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <p className="mb-6 font-serif text-sm uppercase tracking-[0.25em] text-white/30">
            Wenn du tiefer gehen willst
          </p>
          <h2 className="mb-4 font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl">
            Die Archive selbst.
          </h2>
          <p className="mb-12 font-serif text-base leading-relaxed text-white/45">
            Für den Fall, dass du direkt mit den Menschen sprechen willst, die
            die Originaldokumente verwalten. Sie antworten auf E-Mails. Sie helfen.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <ArchiveCard
              icon={Library}
              name="Museum Detmold"
              ort="Deutschland"
              detail="Familienforschungs-Arbeitsgruppe"
              contact="museum@russlanddeutsche.de"
              url="https://www.russlanddeutsche.de"
            />
            <ArchiveCard
              icon={FileText}
              name="Staatsarchiv Karaganda"
              ort="Kasachstan"
              detail="Deportationsakten, Siedlerdateien"
              contact="de.archiv.kz2022@gmail.com"
              url="https://de-archiv.kz"
            />
            <ArchiveCard
              icon={Library}
              name="LMDR Bibliothek"
              ort="Stuttgart"
              detail="Landsmannschaft der Deutschen aus Russland"
              url="https://lmdr.de"
            />
            <ArchiveCard
              icon={Library}
              name="GRHC · NDSU"
              ort="North Dakota, USA"
              detail="Germans from Russia Heritage Collection"
              url="https://library.ndsu.edu/grhc"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CLOSING — The soft call to action
      ═══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <Sparkles className="mx-auto mb-6 h-8 w-8 text-amber-400/40" />
          <h2 className="mb-6 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Deine Familie hat auch eine Geschichte —<br />die meisten Kapitel noch unbewiesen.
          </h2>
          <div className="space-y-5 font-serif text-lg leading-[1.8] text-white/55">
            <p>
              Das ist keine Schwäche. Das ist der ehrliche Ausgangspunkt. Jede
              wirkliche Familienforschung beginnt mit weißen Flecken, nicht
              mit Stammbäumen.
            </p>
            <p>
              Was immer du findest — teile es mit mir, wenn du magst. Ich
              sammle diese Geschichten. Nicht für ein Produkt. Nur weil die
              Methode besser wird, je mehr Menschen sie ehrlich anwenden.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/familie/mitmachen"
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-6 py-3 font-serif text-sm font-medium text-amber-200 transition-all hover:bg-amber-500/20"
            >
              <Heart className="h-4 w-4" />
              Etwas mit mir teilen
            </Link>
            <Link
              href="/familie/geschichte"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-serif text-sm font-medium text-white/50 transition-all hover:bg-white/10"
            >
              Die ganze Riemer-Gorte-Geschichte
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-3xl px-6 py-8 text-center">
          <p className="font-serif text-xs italic text-white/25">
            Mit Dank an alle, die diese Archive pflegen. Ohne euch wäre nichts davon möglich.
          </p>
        </div>
      </section>
    </main>
  )
}

// ─── Local component: Archive card ──────────────────────────────────

function ArchiveCard({
  icon: Icon,
  name,
  ort,
  detail,
  contact,
  url,
}: {
  icon: React.ElementType
  name: string
  ort: string
  detail: string
  contact?: string
  url?: string
}) {
  const content = (
    <div className="h-full rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all group-hover:border-white/[0.12] group-hover:bg-white/[0.04]">
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-4 w-4 text-white/30" />
        <h3 className="font-serif text-base font-semibold text-white/85">{name}</h3>
      </div>
      <p className="mb-0.5 flex items-center gap-1.5 text-xs text-white/35">
        <MapPin className="h-3 w-3" /> {ort}
      </p>
      <p className="mt-2 font-serif text-sm leading-relaxed text-white/45">{detail}</p>
      {contact && (
        <p className="mt-3 font-mono text-xs text-amber-400/50">{contact}</p>
      )}
    </div>
  )

  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" className="group block h-full">
      {content}
    </a>
  ) : (
    <div className="group h-full">{content}</div>
  )
}
