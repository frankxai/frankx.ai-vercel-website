/**
 * /papa/ hub content — single source of truth for the inheritance teaching.
 *
 * Two languages tracked side-by-side: German is canonical, English is the
 * mirror for the public manifesto sections. Russian content lives only on
 * /papa/ru/ as a heritage acknowledgment.
 *
 * All draft content here is marked with `draft: true` until family witness
 * (per Starlight Board verdict 2026-05-05). The /papa/erbe/ page renders the
 * draft banner whenever any consumed entry has draft: true.
 *
 * Source spec: docs/superpowers/specs/2026-05-05-papa-hub-design.md
 */

export interface BilingualText {
  de: string
  en: string
}

export interface Principle {
  number: number
  title: BilingualText
  elaboration: BilingualText
  application: BilingualText
  draft: boolean
}

export interface Stage {
  number: number
  name: BilingualText
  qualities: BilingualText
  danger: BilingualText
  passage: BilingualText
  draft: boolean
}

export interface CodeEntry {
  domain: BilingualText
  standard: BilingualText
  draft: boolean
}

/** Witali Riemer — biographical record (mirrors .frankx/family/witali-riemer.md) */
export const witali = {
  fullName: 'Witali Riemer',
  born: '1969-09-08',
  bornLocation: 'Pavlovka, Kazakhstan',
  died: '2018-07-09',
  diedLocation: 'Seesen, Germany',
  ageAtDeath: 48,
  parents: ['Alexander Riemer', 'Paulina Riemer (geb. Schneider)'],
  spouse: 'Dora Riemer (geb. Gorte)',
  children: ['Frank Riemer'],
  heritage: 'Wolgadeutsche / Russlanddeutsche',
  languages: ['Deutsch', 'Russisch'],
} as const

/** The 10 principles — drafts from Frank's brief 2026-05-05, to refine with family stories */
export const principles: Principle[] = [
  {
    number: 1,
    title: { de: 'Stehe zu deinen Leuten.', en: 'Stand by your people.' },
    elaboration: {
      de: 'Wer zur Familie gehört, hat Vorrang. Bedingungslos, aber nicht unkritisch.',
      en: 'Family comes first. Unconditionally, but not uncritically.',
    },
    application: {
      de: 'Wenn jemand aus dem inneren Kreis dich braucht, sind die anderen Verpflichtungen sekundär — bis die Wichtigkeit echt geprüft ist.',
      en: 'When someone in the inner circle needs you, other obligations become secondary — until the urgency is honestly tested.',
    },
    draft: true,
  },
  {
    number: 2,
    title: { de: 'Arbeit vor Klage.', en: 'Work before complaint.' },
    elaboration: {
      de: 'Es ist erlaubt zu klagen — aber nicht bevor man die Sache angefasst hat.',
      en: 'Complaint is permitted — but not before you have actually touched the work.',
    },
    application: {
      de: 'Eine halbe Stunde anpacken, bevor du die ganze Sache schwer findest. Meist ist die Schwere weg.',
      en: 'Half an hour of doing before you decide it is hard. Most of the heaviness leaves on its own.',
    },
    draft: true,
  },
  {
    number: 3,
    title: {
      de: 'Werde nicht weich, wenn das Leben hart wird.',
      en: 'Do not become soft when life turns hard.',
    },
    elaboration: {
      de: 'Härte ist nicht das Ziel. Aber Selbstmitleid ist ein Loch, aus dem keine Familie steigt.',
      en: 'Hardness is not the goal. But self-pity is a hole no family climbs out of.',
    },
    application: {
      de: 'In der Krise: weniger sprechen, mehr tragen. Worte später.',
      en: 'In crisis: speak less, carry more. Words later.',
    },
    draft: true,
  },
  {
    number: 4,
    title: {
      de: 'Trage Verantwortung, ohne Beifall zu brauchen.',
      en: 'Carry responsibility without needing applause.',
    },
    elaboration: {
      de: 'Das Wichtigste, was Männer tun, sieht meist niemand. Niemand soll es sehen müssen.',
      en: 'The most important things men do are usually unseen. They should not have to be seen.',
    },
    application: {
      de: 'Tu die Sache, die niemand mitkriegt — und erzähl es nicht.',
      en: 'Do the thing nobody notices — and do not tell anyone.',
    },
    draft: true,
  },
  {
    number: 5,
    title: {
      de: 'Geld ist Würde, wenn es sauber verdient ist.',
      en: 'Money is dignity when earned cleanly.',
    },
    elaboration: {
      de: 'Geld an sich ist nichts. Sauber verdientes Geld ist Beweis, dass du gehalten hast, was du versprochen hast.',
      en: 'Money itself is nothing. Cleanly earned money is proof you kept what you promised.',
    },
    application: {
      de: 'Nimm keine Abkürzung, die dich zu jemandem macht, dem du selbst nicht vertraust.',
      en: 'Take no shortcut that turns you into someone you would not trust.',
    },
    draft: true,
  },
  {
    number: 6,
    title: {
      de: 'Familie ist keine Theorie. Familie ist Tat.',
      en: 'Family is not a theory. Family is action.',
    },
    elaboration: {
      de: 'Liebe, die nichts kostet, hat noch nichts bewiesen.',
      en: 'Love that costs nothing has not proven anything yet.',
    },
    application: {
      de: 'Frag nicht "wie geht es dir" — frag "was brauchst du" und lass die Antwort dich kosten.',
      en: 'Do not ask "how are you" — ask "what do you need" and let the answer cost you.',
    },
    draft: true,
  },
  {
    number: 7,
    title: {
      de: 'Sei nützlich, bevor du beeindruckend bist.',
      en: 'Be useful before being impressive.',
    },
    elaboration: {
      de: 'Beeindruckend zu sein ist Eitelkeit. Nützlich zu sein ist Charakter.',
      en: 'Impressive is vanity. Useful is character.',
    },
    application: {
      de: 'In jedem Raum: was würde hier konkret helfen? Mach das. Zuerst.',
      en: 'In every room: what would concretely help here? Do that. First.',
    },
    draft: true,
  },
  {
    number: 8,
    title: {
      de: 'Halte dein Wort, wenn niemand zusieht.',
      en: 'Keep your word when nobody is watching.',
    },
    elaboration: {
      de: 'Charakter ist, was du tust, wenn keiner es überprüft.',
      en: 'Character is what you do when nobody is checking.',
    },
    application: {
      de: 'Versprich weniger. Halte mehr. Sag deutlich nein, wenn du nein meinst.',
      en: 'Promise less. Keep more. Say no clearly when you mean no.',
    },
    draft: true,
  },
  {
    number: 9,
    title: {
      de: 'Beschütze, was dir anvertraut wurde.',
      en: 'Protect what was entrusted to you.',
    },
    elaboration: {
      de: 'Kinder, Eltern, Geheimnisse, Erbe, Körper — was dir gegeben wurde, gehört dir nicht. Es wurde dir geliehen.',
      en: 'Children, parents, secrets, inheritance, body — what was given to you is not yours. It was loaned.',
    },
    application: {
      de: 'Frage täglich: ist alles, was mir anvertraut wurde, bei mir sicherer als gestern?',
      en: 'Ask daily: is everything entrusted to me safer with me today than yesterday?',
    },
    draft: true,
  },
  {
    number: 10,
    title: {
      de: 'Werde so stabil, dass andere sich anlehnen können.',
      en: 'Become solid enough that others can lean.',
    },
    elaboration: {
      de: 'Das Ziel ist nicht, niemanden zu brauchen. Das Ziel ist, gebraucht werden zu können — ohne zu brechen.',
      en: 'The goal is not to need no one. The goal is to be leanable upon — without breaking.',
    },
    application: {
      de: 'Trainiere deinen Körper, deinen Charakter, deine Finanzen. Nicht für dich. Für die, die später kommen.',
      en: 'Train your body, your character, your finances. Not for yourself. For those who come later.',
    },
    draft: true,
  },
]

/** The 6 stages of becoming solid */
export const stages: Stage[] = [
  {
    number: 1,
    name: { de: 'Der Junge', en: 'The Boy' },
    qualities: {
      de: 'Hofft auf Rettung. Erwartet, dass jemand erscheint.',
      en: 'Hopes for rescue. Expects someone to appear.',
    },
    danger: {
      de: 'Kann jahrzehntelang Junge bleiben — auch mit grauen Haaren.',
      en: 'Can stay a boy for decades — even with grey hair.',
    },
    passage: {
      de: 'Erkenntnis: niemand kommt. Du bist es selbst.',
      en: 'Realisation: no one is coming. You are it.',
    },
    draft: true,
  },
  {
    number: 2,
    name: { de: 'Der Rebell', en: 'The Rebel' },
    qualities: {
      de: 'Lehnt jede Autorität ab. Definiert sich durch das, was er ablehnt.',
      en: 'Rejects every authority. Defines himself by what he refuses.',
    },
    danger: {
      de: 'Bleibt reaktiv. Hat noch nichts gebaut, nur abgerissen.',
      en: 'Stays reactive. Has built nothing yet, only torn down.',
    },
    passage: {
      de: 'Eigene Werte aufbauen, nicht nur fremde ablehnen.',
      en: 'Build your own values, not only reject others.',
    },
    draft: true,
  },
  {
    number: 3,
    name: { de: 'Der Strebende', en: 'The Striver' },
    qualities: {
      de: 'Beweist sich. Sammelt Resultate. Will gesehen werden.',
      en: 'Proves himself. Collects results. Wants to be seen.',
    },
    danger: {
      de: 'Erfolgs-Hunger ohne Sättigung. Familie wird optional.',
      en: 'Success-hunger without satiety. Family becomes optional.',
    },
    passage: {
      de: 'Lerne: die Beweise sind genug. Jetzt baue für andere.',
      en: 'Learn: the proofs are enough. Now build for others.',
    },
    draft: true,
  },
  {
    number: 4,
    name: { de: 'Der Bauende', en: 'The Builder' },
    qualities: {
      de: 'Übernimmt Verantwortung. Repariert, was kaputt ist. Wird verlässlich.',
      en: 'Takes responsibility. Repairs what is broken. Becomes reliable.',
    },
    danger: {
      de: 'Vergisst sich selbst. Wird zur Last-Tragerin ohne eigenes Leben.',
      en: 'Forgets himself. Becomes a load-bearer with no life of his own.',
    },
    passage: {
      de: 'Die Verantwortung ist gewählt — nicht erlitten. Daran erinnerst du dich.',
      en: 'The responsibility is chosen — not endured. Remember that.',
    },
    draft: true,
  },
  {
    number: 5,
    name: { de: 'Der Vater', en: 'The Father' },
    qualities: {
      de: 'Wird Quelle. Andere holen sich von ihm Rat, Wärme, Korrektur, Segen.',
      en: 'Becomes a source. Others draw from him counsel, warmth, correction, blessing.',
    },
    danger: {
      de: 'Verwechselt Verantwortung mit Kontrolle. Hilft, ohne loszulassen.',
      en: 'Confuses responsibility with control. Helps without letting go.',
    },
    passage: {
      de: 'Lerne zu segnen, ohne zu lenken.',
      en: 'Learn to bless without steering.',
    },
    draft: true,
  },
  {
    number: 6,
    name: { de: 'Der Älteste', en: 'The Elder' },
    qualities: {
      de: 'Übergibt. Gibt weiter, ohne Anspruch auf das, was daraus wird.',
      en: 'Hands over. Transmits without claim on what becomes of it.',
    },
    danger: {
      de: 'Wird unsichtbar — und bitter — wenn die Übergabe nicht stattfindet.',
      en: 'Becomes invisible — and bitter — if the handover does not happen.',
    },
    passage: {
      de: 'Letzter Schritt: das Loslassen ist die Krönung, nicht der Verlust.',
      en: 'Final step: letting go is the crowning, not the loss.',
    },
    draft: true,
  },
]

/** Discipline codes — short, daily-prompt-style */
export const disciplineCodes: BilingualText[] = [
  {
    de: 'Tu das Notwendige vor dem Erwünschten.',
    en: 'Do the necessary thing before the desired thing.',
  },
  {
    de: 'Wache nicht in eine Stimmung auf, sondern in eine Verantwortung.',
    en: 'Wake into a responsibility, not a mood.',
  },
  { de: 'Repariere, was du kaputt gemacht hast.', en: 'Repair what you broke.' },
  { de: 'Beende, was deinen Namen trägt.', en: 'Finish what carries your name.' },
  {
    de: 'Lagere dein Rückgrat nicht aus.',
    en: 'Do not outsource your backbone.',
  },
  {
    de: 'Lass Bequemlichkeit nicht mit Pflicht verhandeln.',
    en: 'Do not let comfort negotiate with duty.',
  },
  {
    de: 'Baue Können auf, bevor du Respekt verlangst.',
    en: 'Build skill before you demand respect.',
  },
  { de: 'Mach weiter, wenn niemand klatscht.', en: 'Keep going when nobody claps.' },
  {
    de: 'Sei schwerer zu korrumpieren als zu beeindrucken.',
    en: 'Be harder to corrupt than to impress.',
  },
]

/** Emotional backbone — the rare definition Frank named in his brief */
export const backbone: { headline: BilingualText; pillars: BilingualText[] } = {
  headline: {
    de: 'Rückgrat ist die Fähigkeit, tief zu fühlen, ohne instabil, bitter oder unbrauchbar zu werden.',
    en: 'Backbone is the capacity to feel deeply without becoming unstable, bitter, or useless.',
  },
  pillars: [
    {
      de: 'Trauer ohne Zusammenbruch',
      en: 'Grief without collapse',
    },
    {
      de: 'Liebe ohne Schwäche',
      en: 'Love without weakness',
    },
    {
      de: 'Wut ohne Zerstörung',
      en: 'Anger without destruction',
    },
    {
      de: 'Druck ohne Panik',
      en: 'Pressure without panic',
    },
    {
      de: 'Stille ohne Vermeidung',
      en: 'Silence without avoidance',
    },
    {
      de: 'Loyalität ohne Selbstauslöschung',
      en: 'Loyalty without self-erasure',
    },
    {
      de: 'Zärtlichkeit ohne Verlust der Stärke',
      en: 'Tenderness without loss of strength',
    },
  ],
}

/** Responsibility models — adult-initiation language */
export const responsibilityModels: BilingualText[] = [
  {
    de: 'Familiendruck tragen, ohne ihn zur Last zu machen.',
    en: 'Carrying family pressure without making it a burden on others.',
  },
  {
    de: 'Versorgen, ohne grollend zu werden.',
    en: 'Providing without becoming resentful.',
  },
  { de: 'Führen, ohne zu kontrollieren.', en: 'Leading without controlling.' },
  {
    de: 'Beschützen, ohne zu dominieren.',
    en: 'Protecting without dominating.',
  },
  {
    de: 'Arbeiten, ohne die Seele zu verlieren.',
    en: 'Working without losing your soul.',
  },
  {
    de: 'Helfen, ohne Schwäche zu ermöglichen.',
    en: 'Helping without enabling weakness.',
  },
  { de: 'Verlässlich werden.', en: 'Becoming dependable.' },
  {
    de: 'Entscheidungen unter Druck treffen.',
    en: 'Making decisions under pressure.',
  },
  {
    de: 'Die Person sein, die andere anrufen, wenn es ernst wird.',
    en: 'Being the person others call when things turn serious.',
  },
]

/** Money / Work / Dignity — Frank's most economically-loaded section */
export const workMoneyDignity: { headline: BilingualText; principles: BilingualText[] } = {
  headline: {
    de: 'Geld ist nichts zum Anbeten. Geld ist gespeicherte Verantwortung.',
    en: 'Money is not for worship. Money is stored responsibility.',
  },
  principles: [
    { de: 'Sauber verdienen.', en: 'Earn clean.' },
    {
      de: 'Bettle nicht, wenn du bauen kannst.',
      en: 'Do not beg when you can build.',
    },
    {
      de: 'Zeig nicht, was du nicht stabilisiert hast.',
      en: 'Do not flex what you have not stabilized.',
    },
    {
      de: 'Deine Arbeit soll deine Familie sicherer machen.',
      en: 'Your work should make your family safer.',
    },
    {
      de: 'Reichtum ohne Würde macht einen Mann kleiner.',
      en: 'Wealth without dignity makes a man smaller.',
    },
    {
      de: 'Schulden stehlen zukünftige Autorität.',
      en: 'Debt steals future authority.',
    },
    { de: 'Können ist besser als Glück.', en: 'Skill is better than luck.' },
    {
      de: 'Eigentum ist die erwachsene Form von Ehrgeiz.',
      en: 'Ownership is the adult form of ambition.',
    },
    {
      de: 'Versorgen zuerst, glänzen später.',
      en: 'Provide first, perform later.',
    },
  ],
}

/** "For those who built it alone" — the public service section */
export const forTheFatherless: { framing: BilingualText; lines: BilingualText[] } = {
  framing: {
    de: 'Dies ist eine Übersetzung eines Sohnes von einem Vater. Kein Programm, keine Anleitung, kein universaler Anspruch — nur das, was ich aus seiner Lebenszeit mitnehmen durfte und gerne weitergebe.',
    en: 'This is one son\'s translation of one father. Not a program, not a manual, not a universal claim — only what I was allowed to take from his life, freely shared.',
  },
  lines: [
    {
      de: 'Wer ohne Vater aufwuchs, hat nicht weniger Wert. Aber mehr Arbeit.',
      en: 'Growing up without a father does not make you worth less. It makes more work.',
    },
    {
      de: 'Du musst dir selbst die Standards beibringen, die andere geerbt haben.',
      en: 'You will have to teach yourself the standards others inherited.',
    },
    {
      de: 'Such dir Männer, deren Charakter du respektierst — und beobachte, wie sie Probleme lösen.',
      en: 'Find men whose character you respect — and watch how they handle problems.',
    },
    {
      de: 'Lies, was solide Männer geschrieben haben. Marc Aurel ist 1.900 Jahre alt und immer noch verfügbar.',
      en: 'Read what solid men have written. Marcus Aurelius is 1,900 years old and still available.',
    },
    {
      de: 'Dein Charakter ist nicht erlassen, weil du ihn ohne Vater bauen musst. Die Verantwortung bleibt deine.',
      en: 'Your character is not excused because you had to build it without a father. The responsibility is still yours.',
    },
    {
      de: 'Wenn du eines Tages selbst Vater wirst — sei der, den du gebraucht hättest.',
      en: 'If one day you become a father — be the one you would have needed.',
    },
  ],
}

/** Inheritance chain — Frank's own architecture line, for /papa/erbe/ closer */
export const inheritanceChain: BilingualText[] = [
  { de: 'Vater', en: 'Father' },
  { de: 'Erbe', en: 'Inheritance' },
  { de: 'Synthese', en: 'Synthesis' },
  { de: 'System', en: 'System' },
  { de: 'Weitergabe', en: 'Transmission' },
]

/** Manifesto opening — Frank's verbatim text from the brief */
export const manifesto: BilingualText = {
  de: `Ich bin hier, um das Beste zu bewahren, was mein Vater mir gegeben hat — und es denen verfügbar zu machen, die niemanden hatten, der es ihnen weitergab.

Für meine Familie.
Für meine Nichten und Neffen.
Für die Cousinen, Verwandten und Freunde, die ihn liebten.
Für alle, die seine Stärke spürten, ohne die Prinzipien dahinter je ganz zu verstehen.

Und für die, die ohne die Stimme eines Vaters aufgewachsen sind.

Dies ist ein lebendiges Archiv aus Geschichten, Standards, Disziplin-Codes, emotionalem Rückgrat, Verantwortungsmodellen, männlicher Initiation, Lebensnavigation, Arbeit, Geld, Würde — und davon, solide zu werden, wenn niemand einen rettet.

Nicht, um einen Mann zum Idol zu machen.

Sondern, um das Gold herauszuziehen.

Zu erinnern, was gut war.
Zu benennen, was stark war.
Zu vergeben, was menschlich war.
Weiterzugeben, was nicht verloren gehen darf.

Manche erben Geld.
Manche erben Eigentum.
Manche erben Selbstvertrauen.
Manche erben die Stimme eines Vaters in sich.

Dieses Projekt ist für die, die es nicht taten.

Und für die von uns, die es taten — und nun die Verantwortung tragen, es weiterzugeben.`,
  en: `I am here to preserve the best of what my father gave me — and make it available to those who never had someone to hand it down.

For my family.
For my nieces and nephews.
For the cousins, relatives, and friends who loved him.
For everyone who felt his strength but never fully understood the principles behind it.

And for those who grew up without a father's voice.

This is a living archive of stories, standards, discipline codes, emotional backbone, responsibility models, masculine initiation, life navigation, work, money, dignity, and becoming solid when nobody saves you.

Not to turn one man into an idol.

But to extract the gold.

To remember what was good.
To name what was strong.
To forgive what was human.
To transmit what must not be lost.

Some people inherit money.
Some inherit property.
Some inherit confidence.
Some inherit a father's voice inside them.

This project is for those who did not.

And for those of us who did — and now carry the responsibility to pass it on.`,
}

/** Russian heritage line — minimal, for /papa/ru/ */
export const russianHeritage = {
  title: 'Папа',
  subtitle: 'Что мне дал мой отец',
  lead:
    'Мой отец, Виталий Ример, родился 8 сентября 1969 года в Павловке, Казахстан, и умер 9 июля 2018 года в Зезене, Германия. Поволжский немец из семьи, депортированной Сталиным в Казахстан в 1941 году. Эта страница признаёт его русские корни.',
  attribution: 'Witali Riemer (1969–2018) · Wolgadeutsche / Russlanddeutsche',
} as const
