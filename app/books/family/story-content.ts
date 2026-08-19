export type FamilyLocale = 'en' | 'de';

export type StoryPage = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  deeperTitle: string;
  deeper: string[];
};

export type StoryLocale = {
  title: string;
  shortTitle: string;
  subtitle: string;
  dedication: string;
  audience: string;
  readingTime: string;
  coverKicker: string;
  coverNote: string;
  ui: {
    familyShelf: string;
    cover: string;
    listen: string;
    stop: string;
    download: string;
    begin: string;
    next: string;
    previous: string;
    readAgain: string;
    lookDeeper: string;
    swipeHint: string;
    page: string;
    of: string;
    narrationStarting: string;
    narrationStopped: string;
    narrationFinished: string;
    narrationUnavailable: string;
    localeLabel: string;
    complete: string;
    contents: string;
    sources: string;
    conversation: string;
    timeline: string;
    readingLenses: string;
    close: string;
  };
  pages: StoryPage[];
  lenses: { title: string; text: string }[];
  timeline: { date: string; event: string }[];
  conversation: string[];
  sourceIntro: string;
  colophon: string;
};

export const pageImages = [
  '/images/books/family/david/01-name.webp',
  '/images/books/family/david/01-name.webp',
  '/images/books/family/david/02-hills.webp',
  '/images/books/family/david/03-music.webp',
  '/images/books/family/david/04-valley.webp',
  '/images/books/family/david/05-friendship.webp',
  '/images/books/family/david/06-lamb.webp',
  '/images/books/family/david/07-songs.webp',
  '/images/books/family/david/08-shard.webp',
  '/images/books/family/david/09-five-stones.webp',
] as const;

export const davidStory: Record<FamilyLocale, StoryLocale> = {
  en: {
    title: 'David and the Song Inside His Name',
    shortTitle: 'The Song Inside His Name',
    subtitle: 'A story of shepherds, kings, songs, courage, and the meaning of being beloved',
    dedication: 'For David - from Uncle Frank',
    audience:
      'Written for five-year-old ears, with ideas that open differently at fifteen, twenty-five, and beyond.',
    readingTime: '12 minutes',
    coverKicker: 'A living family storybook',
    coverNote: 'Read quietly, listen aloud, or open the deeper layer together.',
    ui: {
      familyShelf: 'Family library',
      cover: 'Cover',
      listen: 'Listen',
      stop: 'Stop',
      download: 'PDF',
      begin: 'Begin the story',
      next: 'Next',
      previous: 'Back',
      readAgain: 'Read again',
      lookDeeper: 'For bigger readers',
      swipeHint: 'Swipe or use the arrow keys. Your place stays only in this browser.',
      page: 'Page',
      of: 'of',
      narrationStarting: 'Reading this page aloud.',
      narrationStopped: 'The reading has stopped.',
      narrationFinished: 'This page is finished.',
      narrationUnavailable: 'Read-aloud is not available in this browser.',
      localeLabel: 'Choose language',
      complete: 'The story is complete',
      contents: 'Story map',
      sources: 'Sources and context',
      conversation: 'Questions to carry home',
      timeline: 'A very long story, briefly',
      readingLenses: 'Three ways to read carefully',
      close: 'Close',
    },
    pages: [
      {
        eyebrow: 'The name with two doors',
        title: 'A small adventure in between',
        paragraphs: [
          'David had been called David every day of his life.',
          'At breakfast. On the playground. Whenever someone wanted him to please put on his shoes.',
          'But tonight, his name sounded different.',
          'It began with a D and ended with a D - two steady doors, with a small adventure hidden between them.',
          'A gold-bright bird landed on his book. “I am Dodi,” she said. “Names are stories other people begin before we are born. We do not have to repeat every old story. But we can listen.”',
        ],
        deeperTitle: 'A picture, not a word history',
        deeper: [
          'The two doors are a language-picture, not a claim about the name’s origin. Dodi poetically echoes an old Hebrew word for “my beloved.”',
        ],
      },
      {
        eyebrow: 'Beloved',
        title: 'A beginning, not a medal',
        paragraphs: [
          'Across centuries and countries, people carried the name in many sounds: David, Dawid, Dafydd, Davide, Dawud.',
          'Scholars still debate its oldest roots. Many people understand David to mean “beloved.”',
          '“Beloved,” David whispered. The word felt warm - and a little too large.',
          '“Not a medal,” Dodi said. “A beginning. Love can reach you before you earn it. Then it asks what you will do with it.”',
          'The golden thread slipped through the window, and the bedroom opened into a sky of older stars.',
        ],
        deeperTitle: 'The name’s ancient roots',
        deeper: [
          'David is usually connected to an ancient Semitic word-root about love or a beloved person, though its exact derivation remains debated. Careful storytelling can hold a likely meaning and honest uncertainty at the same time.',
        ],
      },
      {
        eyebrow: 'Before the crown',
        title: 'The hills taught him to listen',
        paragraphs: [
          'Before the crown came the sheep.',
          'Before the speeches came long hours of wind, bells, dust, and silence.',
          'The old stories remember a young shepherd named David. He learned the moods of the hills. He noticed when one lamb was missing. He practised his lyre until rough sounds became music, and his sling until movement became memory.',
          '“So greatness began quietly?” little David asked.',
          '“Most real things do,” Dodi said.',
        ],
        deeperTitle: 'What the old texts remember',
        deeper: [
          'The biblical books of Samuel introduce David as a shepherd, musician, and youngest son. Their precise scenes belong to ancient sacred narrative; hills, flocks, lyres, and sling practice also fit the world those texts describe.',
        ],
      },
      {
        eyebrow: 'Music for a storm',
        title: 'He made a little room inside it',
        paragraphs: [
          'King Saul carried weather inside him that nobody else could see.',
          'The stories say that young David played, and the king found relief.',
          'David could not command another person’s storm. He could not promise it would never return.',
          'But with patience, rhythm, and care, he could make a little room inside the storm - enough for one calmer breath.',
          '“Can art do that?” little David asked.',
          '“Sometimes,” Dodi said. “And sometimes help begins with one breath.”',
        ],
        deeperTitle: 'Care without a magic cure',
        deeper: [
          'In 1 Samuel, David’s playing brings Saul relief. This retelling treats music as care, not a guaranteed medical cure, and leaves room for the support real people need.',
        ],
      },
      {
        eyebrow: 'The valley',
        title: 'Courage remembered the practice',
        paragraphs: [
          'Then came the valley and the giant shadow.',
          'Everyone asked, “Who is big enough?” David asked a different question: “What have I practised?”',
          'He refused armour made for somebody else’s body. He chose a familiar sling and five smooth stones from the stream.',
          'Courage did not make him tall. Practice made him ready. He stepped forward, aimed - and the giant fell.',
          'For thousands of years, people have told this story whenever something small and determined faces something enormous.',
          'Dodi whispered, “Borrowed armour can weigh more than fear.”',
        ],
        deeperTitle: 'The ancient account is violent',
        deeper: [
          'The full account in 1 Samuel 17 is a battle story and includes more violence than this edition shows. Here, the lens stays on preparation, proportion, and David’s refusal to imitate his opponent’s kind of strength. Older readers can return to the complete text and ask what its violence meant in that world.',
        ],
      },
      {
        eyebrow: 'A friend chose friendship',
        title: 'Faithful when it cost something',
        paragraphs: [
          'After the cheering came jealousy. King Saul became afraid of David, and fear made danger where friendship might have grown.',
          'Saul’s son Jonathan could have treated David as a rival. Instead, he listened, warned him, and helped him find safety.',
          'A true friend does not make you smaller just to feel tall.',
          'A true friend tells the truth, keeps a promise, and protects what is good - even when loyalty costs comfort.',
          'Under the old stars, the two friends made a promise.',
          'Little David touched the cord of light between them. “Some courage carries two names,” he said.',
        ],
        deeperTitle: 'Friendship beside inherited power',
        deeper: [
          'The books of Samuel give the bond between David and Jonathan unusual emotional weight. Jonathan’s loyalty matters especially because he is Saul’s son and a possible heir: friendship asks him to resist fear, rivalry, and inherited power.',
        ],
      },
      {
        eyebrow: 'The crown and the mirror',
        title: 'What happens when truth finds you?',
        paragraphs: [
          'David became king, and power made his choices touch more lives. It did not make him unable to do wrong.',
          'One day, David took what was not his, and a good man was harmed.',
          'The prophet Nathan told a story about a rich man who took a poor family’s only little lamb. David grew angry at the man in the story.',
          'Then Nathan held up the mirror: “You are that man.”',
          'David did not call the mirror his enemy. He said, “I have done wrong.” That did not undo the harm. Truth was only the first stone on the road back.',
          '“A name does not promise you will never fail,” Dodi said. “It asks what you do when truth finds you.”',
        ],
        deeperTitle: 'Repair is larger than an apology',
        deeper: [
          'The adult account in 2 Samuel 11–12 concerns Bathsheba and Uriah: David abuses royal power, Uriah is killed, Nathan confronts the king, and consequences remain after confession. This child-safe version does not erase the wrong. It introduces the lasting idea that return begins where excuses end - while repair requires truth, changed action, and care for those harmed.',
        ],
      },
      {
        eyebrow: 'Songs for every weather',
        title: 'A prayer does not have to pretend',
        paragraphs: [
          'David’s story travelled not only through crowns. It travelled through songs.',
          'The Psalms make room for joy, fear, grief, gratitude, anger, trust, and regret. They taught generations that a prayer does not have to pretend the weather inside us is always sunny.',
          'In different homes and traditions, people remembered David differently: as king and singer, as ancestor, as the prophet Dawud whose praise mountains and birds echoed.',
          'The traditions do not tell every detail in the same way. But each places a question beside strength: What will power listen to?',
          '“Truth,” little David said.',
          '“And mercy,” Dodi added.',
        ],
        deeperTitle: 'Three living traditions',
        deeper: [
          'Judaism remembers David as a defining king of Israel, closely associated with Tehillim, the Psalms. Christianity places him in the ancestry and titles of Jesus, including “son of David.” Islam remembers Dawud as a prophet-king given the Zabur; the Qur’an connects him with wisdom, justice, repentance, iron, and creation joining his praise.',
          'The Book of Psalms contains 150 poems, songs, and prayers. Seventy-three carry headings that associate them with David; the collection also preserves other voices.',
        ],
      },
      {
        eyebrow: 'The broken stone',
        title: 'A shard is not the whole house',
        paragraphs: [
          'Many centuries later, people digging in the earth found pieces of a broken black stone.',
          'On one fragment, scholars read words meaning “House of David” - an ancient way to name a royal family or dynasty.',
          'The stone matters. But it does not prove every song, choice, or battle in the stories.',
          '“A shard is not the whole house,” Dodi said.',
          '“So stones and stories answer different questions?” David asked.',
          '“Exactly. A wise reader lets each kind of evidence say only what it can truly say.”',
        ],
        deeperTitle: 'What the Tel Dan Stele can tell us',
        deeper: [
          'The Tel Dan Stele is a royal inscription from the ninth century BCE, found in northern Israel. Its widely accepted reading includes “House of David,” the earliest known reference outside the Bible to a Davidic dynasty. That is evidence for a remembered royal house, not independent confirmation of every scene in Samuel. Archaeology and sacred story can touch without becoming interchangeable.',
        ],
      },
      {
        eyebrow: 'The song only you can finish',
        title: 'Being beloved carries responsibility',
        paragraphs: [
          'By morning, David was back in his room. Dodi placed five smooth stones before him.',
          'One for listening. One for practice. One for courage that protects. One for friendship that keeps faith. One for returning to truth after doing wrong.',
          'Being beloved did not mean always being applauded. It meant life had met him with love before he could earn it - and asked him to pass that love onward.',
          '“Do I need a crown?” David asked.',
          '“No.”',
          '“A giant?”',
          '“No. Whenever you listen closely, practise quietly, protect someone smaller, keep faith with a friend, or return to truth, your name becomes a song only you can finish.”',
          'The bird became a handful of morning light. David drew the first line of his song. Beside him, an ordinary stone had grown warm.',
        ],
        deeperTitle: 'The five stones are a new reading',
        deeper: [
          'The ancient account does not give David’s stones these five meanings. They are this book’s interpretive frame: one way to carry the valley story into ordinary life. A name is a seed, not a cage.',
        ],
      },
    ],
    lenses: [
      {
        title: 'Text',
        text: 'What the ancient biblical and Qur’anic passages actually say - including their differences and difficult parts.',
      },
      {
        title: 'Tradition',
        text: 'How Jewish, Christian, and Muslim communities have remembered, prayed with, taught, and interpreted David or Dawud.',
      },
      {
        title: 'History',
        text: 'What language study, archaeology, and comparison can responsibly suggest - and where the evidence stops.',
      },
    ],
    timeline: [
      { date: 'c. 1000 BCE', event: 'Traditional period of David’s reign' },
      { date: '9th century BCE', event: 'The Tel Dan Stele names a House of David' },
      {
        date: 'Centuries of composition',
        event: 'Samuel and the Psalms grow, are edited, copied, and passed onward',
      },
      {
        date: '7th century CE',
        event: 'The Qur’an speaks of Dawud as prophet, ruler, singer, and judge',
      },
      { date: 'Today', event: 'David remains one of the world’s most carried names' },
    ],
    conversation: [
      'Which of the five stones would help you today?',
      'Why did David refuse armour made for somebody else?',
      'What is the difference between saying sorry and making repair?',
      'Can somebody be brave and still need a friend?',
      'What can a broken stone tell us? What can it not tell us?',
      'If your name were a song, how would you want people to feel when they heard it?',
    ],
    sourceIntro:
      'This retelling keeps sacred text, living tradition, and historical evidence close - but never treats them as the same kind of source.',
    colophon:
      'Created for David by Uncle Frank. Story architecture, editorial research, design, and illustration production were developed with OpenAI assistance. This is a literary retelling, not a replacement for full sacred texts or historical scholarship.',
  },
  de: {
    title: 'David und das Lied in seinem Namen',
    shortTitle: 'Das Lied in seinem Namen',
    subtitle:
      'Eine Geschichte über Hirten, Könige, Lieder, Mut und darüber, was es heißt, geliebt zu sein',
    dedication: 'Für David - von Onkel Frank',
    audience:
      'Für fünfjährige Ohren geschrieben. Mit Gedanken, die sich mit fünfzehn, fünfundzwanzig und später neu öffnen.',
    readingTime: '12 Minuten',
    coverKicker: 'Ein lebendiges Familienbuch',
    coverNote: 'Leise lesen, vorlesen lassen oder gemeinsam die tiefere Ebene öffnen.',
    ui: {
      familyShelf: 'Familienbibliothek',
      cover: 'Umschlag',
      listen: 'Vorlesen',
      stop: 'Stopp',
      download: 'PDF',
      begin: 'Geschichte beginnen',
      next: 'Weiter',
      previous: 'Zurück',
      readAgain: 'Noch einmal lesen',
      lookDeeper: 'Für größere Leser',
      swipeHint: 'Wische oder nutze die Pfeiltasten. Dein Lesestand bleibt nur in diesem Browser.',
      page: 'Seite',
      of: 'von',
      narrationStarting: 'Diese Seite wird vorgelesen.',
      narrationStopped: 'Das Vorlesen wurde beendet.',
      narrationFinished: 'Diese Seite ist zu Ende.',
      narrationUnavailable: 'Vorlesen ist in diesem Browser nicht verfügbar.',
      localeLabel: 'Sprache wählen',
      complete: 'Die Geschichte ist zu Ende',
      contents: 'Weg durch die Geschichte',
      sources: 'Quellen und Hintergründe',
      conversation: 'Fragen für den Heimweg',
      timeline: 'Eine sehr lange Geschichte, ganz kurz',
      readingLenses: 'Drei Arten, aufmerksam zu lesen',
      close: 'Schließen',
    },
    pages: [
      {
        eyebrow: 'Der Name mit zwei Türen',
        title: 'Ein kleines Abenteuer dazwischen',
        paragraphs: [
          'David wurde jeden Tag seines Lebens David genannt.',
          'Beim Frühstück. Auf dem Spielplatz. Wenn jemand wollte, dass er endlich seine Schuhe anzog.',
          'Doch in dieser Nacht klang sein Name anders.',
          'Er begann mit einem D und endete mit einem D - zwei feste Türen, zwischen denen sich ein kleines Abenteuer verbarg.',
          'Ein goldleuchtender Vogel landete auf seinem Buch. „Ich heiße Dodi“, sagte sie. „Namen sind Geschichten, die andere beginnen, bevor wir geboren werden. Wir müssen nicht jede alte Geschichte wiederholen. Aber wir können ihr zuhören.“',
        ],
        deeperTitle: 'Ein Bild, keine Wortgeschichte',
        deeper: [
          'Die beiden Türen sind ein Sprachbild, keine Behauptung über die Herkunft des Namens. Dodi erinnert poetisch an ein altes hebräisches Wort für „mein Geliebter“.',
        ],
      },
      {
        eyebrow: 'Geliebt',
        title: 'Ein Anfang, keine Medaille',
        paragraphs: [
          'Über Jahrhunderte und Länder hinweg trugen Menschen den Namen in vielen Klängen: David, Dawid, Dafydd, Davide, Dawud.',
          'Fachleute diskutieren bis heute über seine ältesten Wurzeln. Viele verstehen David als „der Geliebte“.',
          '„Geliebt“, sagte David leise. Das Wort fühlte sich warm an - und ein wenig zu groß.',
          '„Keine Medaille“, sagte Dodi. „Ein Anfang. Liebe erreicht dich, bevor du sie verdienen kannst. Dann fragt sie, was du mit ihr tun wirst.“',
          'Der goldene Faden glitt durchs Fenster, und das Kinderzimmer öffnete sich zu einem Himmel voller älterer Sterne.',
        ],
        deeperTitle: 'Die alten Wurzeln des Namens',
        deeper: [
          'David wird meist mit einer alten semitischen Wortwurzel verbunden, die Liebe oder einen geliebten Menschen bezeichnet. Die genaue Herleitung bleibt jedoch umstritten. Gute Geschichtsschreibung kann eine wahrscheinliche Bedeutung und ehrliche Unsicherheit gleichzeitig tragen.',
        ],
      },
      {
        eyebrow: 'Vor der Krone',
        title: 'Die Hügel lehrten ihn zuzuhören',
        paragraphs: [
          'Vor der Krone kamen die Schafe.',
          'Vor den Reden kamen lange Stunden mit Wind, Glocken, Staub und Stille.',
          'Die alten Geschichten erinnern an einen jungen Hirten namens David. Er lernte die Stimmungen der Hügel. Er bemerkte, wenn ein Lamm fehlte. Er übte auf seiner Leier, bis raue Töne zu Musik wurden, und mit seiner Schleuder, bis Bewegung zu Erinnerung wurde.',
          '„Also begann Größe ganz leise?“, fragte der kleine David.',
          '„Die meisten echten Dinge beginnen so“, sagte Dodi.',
        ],
        deeperTitle: 'Woran die alten Texte erinnern',
        deeper: [
          'Die biblischen Samuelbücher stellen David als Hirten, Musiker und jüngsten Sohn seiner Familie vor. Die genauen Einzelheiten gehören zur alten heiligen Erzählung; Hügel, Herden, Leiern und Schleuderübungen passen zugleich in die Welt, die diese Texte beschreiben.',
        ],
      },
      {
        eyebrow: 'Musik für einen Sturm',
        title: 'Er schuf darin ein wenig Raum',
        paragraphs: [
          'König Saul trug ein Wetter in sich, das niemand sonst sehen konnte.',
          'Die Geschichten erzählen, dass der junge David spielte und der König Erleichterung fand.',
          'David konnte den Sturm in einem anderen Menschen nicht befehlen. Er konnte nicht versprechen, dass er nie zurückkehren würde.',
          'Doch mit Geduld, Rhythmus und Fürsorge konnte er im Sturm ein wenig Raum schaffen - genug für einen ruhigeren Atemzug.',
          '„Kann Kunst das tun?“, fragte der kleine David.',
          '„Manchmal“, sagte Dodi. „Und manchmal beginnt Hilfe mit einem einzigen Atemzug.“',
        ],
        deeperTitle: 'Fürsorge ohne Zauberheilung',
        deeper: [
          'Im ersten Samuelbuch bringt Davids Spiel Saul Erleichterung. Diese Nacherzählung behandelt Musik als Fürsorge, nicht als sichere medizinische Heilung, und lässt Raum für die Unterstützung, die wirkliche Menschen brauchen.',
        ],
      },
      {
        eyebrow: 'Das Tal',
        title: 'Der Mut erinnerte sich an das Üben',
        paragraphs: [
          'Dann kamen das Tal und der riesige Schatten.',
          'Alle fragten: „Wer ist groß genug?“ David stellte eine andere Frage: „Was habe ich geübt?“',
          'Er lehnte eine Rüstung ab, die für den Körper eines anderen gemacht war. Er wählte eine vertraute Schleuder und fünf glatte Steine aus dem Bach.',
          'Mut machte ihn nicht groß. Übung machte ihn bereit. Er trat vor, zielte - und der Riese fiel.',
          'Seit Tausenden von Jahren erzählen Menschen diese Geschichte, wenn etwas Kleines und Entschlossenes etwas Gewaltigem gegenübersteht.',
          'Dodi flüsterte: „Eine geliehene Rüstung kann schwerer sein als die Angst.“',
        ],
        deeperTitle: 'Die alte Erzählung ist gewaltsam',
        deeper: [
          'Das siebzehnte Kapitel des ersten Samuelbuchs erzählt von einer Schlacht und enthält mehr Gewalt, als diese Ausgabe zeigt. Hier bleibt der Blick auf Vorbereitung, Verhältnis und Davids Weigerung, die Art von Stärke seines Gegners nachzuahmen. Ältere Leser können zum vollständigen Text zurückkehren und fragen, was seine Gewalt in der damaligen Welt bedeutete.',
        ],
      },
      {
        eyebrow: 'Ein Freund wählte Freundschaft',
        title: 'Treue, als sie etwas kostete',
        paragraphs: [
          'Nach dem Jubel kam die Eifersucht. König Saul bekam Angst vor David, und aus Angst wurde Gefahr, wo Freundschaft hätte wachsen können.',
          'Sauls Sohn Jonathan hätte David als Rivalen behandeln können. Stattdessen hörte er zu, warnte ihn und half ihm, Sicherheit zu finden.',
          'Ein wirklicher Freund macht dich nicht kleiner, nur um sich selbst groß zu fühlen.',
          'Ein wirklicher Freund sagt die Wahrheit, hält sein Wort und schützt das Gute - selbst wenn Treue Bequemlichkeit kostet.',
          'Unter den alten Sternen gaben sich die beiden Freunde ein Versprechen.',
          'Der kleine David berührte das Lichtband zwischen ihnen. „Mancher Mut trägt zwei Namen“, sagte er.',
        ],
        deeperTitle: 'Freundschaft neben ererbter Macht',
        deeper: [
          'Die Samuelbücher geben der Verbindung zwischen David und Jonathan ungewöhnliches emotionales Gewicht. Jonathans Treue zählt besonders, weil er Sauls Sohn und möglicher Thronfolger ist: Freundschaft verlangt von ihm, Angst, Rivalität und geerbter Macht zu widerstehen.',
        ],
      },
      {
        eyebrow: 'Die Krone und der Spiegel',
        title: 'Was geschieht, wenn die Wahrheit dich findet?',
        paragraphs: [
          'David wurde König, und durch seine Macht berührten seine Entscheidungen mehr Leben. Sie machte ihn nicht unfähig, Unrecht zu tun.',
          'Eines Tages nahm David, was ihm nicht gehörte, und ein guter Mann kam zu Schaden.',
          'Der Prophet Nathan erzählte von einem reichen Mann, der einer armen Familie ihr einziges kleines Lamm nahm. David wurde zornig auf den Mann in der Geschichte.',
          'Dann hielt Nathan ihm den Spiegel vor: „Dieser Mann bist du.“',
          'David erklärte den Spiegel nicht zum Feind. Er sagte: „Ich habe Unrecht getan.“ Das machte den Schaden nicht rückgängig. Die Wahrheit war nur der erste Stein auf dem Weg zurück.',
          '„Ein Name verspricht nicht, dass du niemals scheiterst“, sagte Dodi. „Er fragt, was du tust, wenn die Wahrheit dich findet.“',
        ],
        deeperTitle: 'Wiedergutmachung ist mehr als eine Entschuldigung',
        deeper: [
          'Das elfte und zwölfte Kapitel des zweiten Samuelbuchs erzählen die erwachsene Geschichte von Batseba und Uria: David missbraucht königliche Macht, Uria wird getötet, Nathan stellt den König zur Rede, und die Folgen bleiben nach dem Geständnis bestehen. Diese kindgerechte Fassung löscht das Unrecht nicht aus. Sie führt in die bleibende Idee ein, dass Umkehr dort beginnt, wo Ausreden enden - während Wiedergutmachung Wahrheit, verändertes Handeln und Fürsorge für die Verletzten verlangt.',
        ],
      },
      {
        eyebrow: 'Lieder für jedes Wetter',
        title: 'Ein Gebet muss nichts vorspielen',
        paragraphs: [
          'Davids Geschichte reiste nicht nur durch Kronen. Sie reiste durch Lieder.',
          'Die Psalmen geben Freude, Angst, Trauer, Dankbarkeit, Zorn, Vertrauen und Reue Raum. Sie lehrten Generationen, dass ein Gebet nicht so tun muss, als sei das Wetter in uns immer sonnig.',
          'In verschiedenen Häusern und Traditionen erinnerten sich Menschen unterschiedlich an David: als König und Sänger, als Vorfahren, als Propheten Dawud, dessen Lob Berge und Vögel erwidern.',
          'Die Traditionen erzählen nicht jedes Detail gleich. Doch sie stellen eine Frage neben die Stärke: Worauf wird Macht hören?',
          '„Auf die Wahrheit“, sagte der kleine David.',
          '„Und auf Barmherzigkeit“, ergänzte Dodi.',
        ],
        deeperTitle: 'Drei lebendige Traditionen',
        deeper: [
          'Im Judentum wird David als prägender König Israels erinnert und eng mit den Tehillim, den Psalmen, verbunden. Das Christentum stellt ihn in die Herkunft und Titel Jesu, darunter „Sohn Davids“. Der Islam kennt Dawud als Propheten und König, dem der Zabur gegeben wurde; der Koran verbindet ihn mit Weisheit, Gerechtigkeit, Umkehr, Eisen und der Schöpfung, die in sein Lob einstimmt.',
          'Das Buch der Psalmen enthält 150 Gedichte, Lieder und Gebete. Dreiundsiebzig Psalmen tragen Überschriften, die sie mit David verbinden; die Sammlung bewahrt auch andere Stimmen.',
        ],
      },
      {
        eyebrow: 'Der zerbrochene Stein',
        title: 'Eine Scherbe ist nicht das ganze Haus',
        paragraphs: [
          'Viele Jahrhunderte später fanden Menschen beim Graben Teile eines zerbrochenen schwarzen Steins.',
          'Auf einem Bruchstück lesen Fachleute Worte mit der Bedeutung „Haus Davids“ - eine alte Bezeichnung für eine königliche Familie oder Dynastie.',
          'Der Stein ist wichtig. Doch er beweist nicht jedes Lied, jede Entscheidung oder jede Schlacht der Geschichten.',
          '„Eine Scherbe ist nicht das ganze Haus“, sagte Dodi.',
          '„Dann beantworten Steine und Geschichten verschiedene Fragen?“, fragte David.',
          '„Genau. Ein kluger Leser lässt jedes Zeugnis nur das erzählen, was es wirklich erzählen kann.“',
        ],
        deeperTitle: 'Was die Tel-Dan-Stele erzählen kann',
        deeper: [
          'Die Tel-Dan-Stele ist eine königliche Inschrift aus dem neunten Jahrhundert vor unserer Zeitrechnung, die im Norden Israels entdeckt wurde. Ihre weithin anerkannte Lesung enthält „Haus Davids“, den frühesten bekannten außerbiblischen Hinweis auf eine davidische Dynastie. Das ist ein Beleg für ein erinnertes Königshaus, keine unabhängige Bestätigung jeder Szene in Samuel. Archäologie und heilige Erzählung berühren sich, sind aber nicht austauschbar.',
        ],
      },
      {
        eyebrow: 'Das Lied, das nur du vollenden kannst',
        title: 'Geliebt zu sein trägt Verantwortung',
        paragraphs: [
          'Am Morgen war David wieder in seinem Zimmer. Dodi legte fünf glatte Steine vor ihn.',
          'Einen fürs Zuhören. Einen fürs Üben. Einen für Mut, der schützt. Einen für Freundschaft, die Wort hält. Einen für die Rückkehr zur Wahrheit, nachdem man falsch gehandelt hat.',
          'Geliebt zu sein bedeutete nicht, immer Beifall zu bekommen. Es bedeutete: Das Leben war ihm mit Liebe begegnet, bevor er sie verdienen konnte - und bat ihn, diese Liebe weiterzugeben.',
          '„Brauche ich eine Krone?“, fragte David.',
          '„Nein.“',
          '„Einen Riesen?“',
          '„Nein. Wann immer du genau zuhörst, still übst, jemanden Kleineren schützt, einem Freund die Treue hältst oder zur Wahrheit zurückkehrst, wird dein Name zu einem Lied, das nur du vollenden kannst.“',
          'Der Vogel wurde zu einer Handvoll Morgenlicht. David zeichnete die erste Linie seines Liedes. Neben ihm war ein gewöhnlicher Stein warm geworden.',
        ],
        deeperTitle: 'Die fünf Steine sind eine neue Lesart',
        deeper: [
          'Die alte Erzählung gibt Davids Steinen diese fünf Bedeutungen nicht. Sie sind der Deutungsrahmen dieses Buches: eine Möglichkeit, die Geschichte aus dem Tal in ein gewöhnliches Leben zu tragen. Ein Name ist ein Samenkorn, kein Käfig.',
        ],
      },
    ],
    lenses: [
      {
        title: 'Text',
        text: 'Was die alten biblischen und koranischen Passagen tatsächlich sagen - einschließlich ihrer Unterschiede und schwierigen Stellen.',
      },
      {
        title: 'Tradition',
        text: 'Wie jüdische, christliche und muslimische Gemeinschaften David oder Dawud erinnert, gebetet, gelehrt und gedeutet haben.',
      },
      {
        title: 'Geschichte',
        text: 'Was Sprachwissenschaft, Archäologie und Vergleich verantwortungsvoll nahelegen können - und wo die Belege enden.',
      },
    ],
    timeline: [
      { date: 'ca. 1000 v. Chr.', event: 'Traditionelle Zeit von Davids Herrschaft' },
      { date: '9. Jahrhundert v. Chr.', event: 'Die Tel-Dan-Stele nennt ein Haus Davids' },
      {
        date: 'Jahrhunderte der Entstehung',
        event: 'Samuelbücher und Psalmen wachsen, werden bearbeitet, kopiert und weitergegeben',
      },
      {
        date: '7. Jahrhundert n. Chr.',
        event: 'Der Koran spricht von Dawud als Prophet, Herrscher, Sänger und Richter',
      },
      { date: 'Heute', event: 'David gehört weiterhin zu den weltweit meistgetragenen Namen' },
    ],
    conversation: [
      'Welcher der fünf Steine würde dir heute helfen?',
      'Warum lehnte David eine Rüstung ab, die für jemand anderen gemacht war?',
      'Was ist der Unterschied zwischen einer Entschuldigung und Wiedergutmachung?',
      'Kann ein Mensch mutig sein und trotzdem einen Freund brauchen?',
      'Was kann uns ein zerbrochener Stein erzählen? Was kann er nicht erzählen?',
      'Wenn dein Name ein Lied wäre: Was sollten andere dabei fühlen?',
    ],
    sourceIntro:
      'Diese Nacherzählung hält heilige Texte, lebendige Traditionen und historische Belege nah beieinander - behandelt sie aber nie als dieselbe Art von Quelle.',
    colophon:
      'Für David von Onkel Frank geschaffen. Dramaturgie, redaktionelle Recherche, Gestaltung und Illustrationsproduktion entstanden mit Unterstützung von OpenAI. Dies ist eine literarische Nacherzählung und kein Ersatz für die vollständigen heiligen Texte oder historische Forschung.',
  },
};

export const davidSources = [
  {
    label: { en: '1 Samuel 17 - David and Goliath', de: '1. Samuel 17 - David und Goliat' },
    href: 'https://www.sefaria.org/I_Samuel.17',
  },
  {
    label: { en: '2 Samuel 12 - Nathan’s parable', de: '2. Samuel 12 - Nathans Gleichnis' },
    href: 'https://www.sefaria.org/II_Samuel.12?lang=en',
  },
  { label: { en: 'Psalm 23', de: 'Psalm 23' }, href: 'https://www.sefaria.org/Psalms.23' },
  {
    label: { en: 'BibleProject - Book of Psalms guide', de: 'BibleProject - Einführung in die Psalmen' },
    href: 'https://bibleproject.com/guides/book-of-psalms/',
  },
  { label: { en: 'Qur’an 38:18–26 - Dawud', de: 'Koran 38:18–26 - Dawud' }, href: 'https://quran.com/sad/18' },
  { label: { en: 'Qur’an 34:10–11 - Dawud', de: 'Koran 34:10–11 - Dawud' }, href: 'https://quran.com/saba/10-11' },
  {
    label: { en: 'Museum of the Bible - Tel Dan Stele', de: 'Museum of the Bible - Tel-Dan-Stele' },
    href: 'https://www.museumofthebible.org/exhibits/teldanstelemotb',
  },
  {
    label: {
      en: 'University of Warsaw - the name David and its roots',
      de: 'Universität Warschau - der Name David und seine Wurzeln',
    },
    href: 'https://repozytorium.uw.edu.pl/server/api/core/bitstreams/1de5eaea-08d9-4ae9-985e-0d5a14cb4633/content',
  },
] as const;

export const familyCopy = {
  en: {
    eyebrow: 'FrankX family library',
    title: 'Four names. Four worlds waiting to open.',
    intro:
      'A private-feeling shelf made for shared reading: gentle enough for bedtime, intelligent enough to return to years later.',
    available: 'Read now',
    growing: 'Story seed',
    open: 'Open David’s story',
    language: 'Language',
    back: 'All books',
    privacy: 'First names only. Reading progress stays on this device.',
    children: {
      amilina: {
        name: 'Amilina',
        note: 'A future story about tenderness, attention, and the courage to notice.',
      },
      'alea-sophia': {
        name: 'Alea Sophia',
        note: 'A future story where chance meets wisdom and curiosity learns to choose.',
      },
      david: {
        name: 'David',
        note: 'Shepherds, songs, courage, repair, and the responsibility inside “beloved.”',
      },
      adam: {
        name: 'Adam',
        note: 'A future story about earth, breath, beginnings, and caring for what is given.',
      },
    },
  },
  de: {
    eyebrow: 'FrankX Familienbibliothek',
    title: 'Vier Namen. Vier Welten, die sich öffnen wollen.',
    intro:
      'Ein persönliches Regal zum gemeinsamen Lesen: sanft genug fürs Zubettgehen, klug genug, um Jahre später zurückzukehren.',
    available: 'Jetzt lesen',
    growing: 'Geschichtenkeim',
    open: 'Davids Geschichte öffnen',
    language: 'Sprache',
    back: 'Alle Bücher',
    privacy: 'Nur Vornamen. Der Lesestand bleibt auf diesem Gerät.',
    children: {
      amilina: {
        name: 'Amilina',
        note: 'Eine künftige Geschichte über Zärtlichkeit, Aufmerksamkeit und den Mut, genau hinzusehen.',
      },
      'alea-sophia': {
        name: 'Alea Sophia',
        note: 'Eine künftige Geschichte, in der Zufall auf Weisheit trifft und Neugier wählen lernt.',
      },
      david: {
        name: 'David',
        note: 'Hirten, Lieder, Mut, Wiedergutmachung und die Verantwortung im Wort „geliebt“.',
      },
      adam: {
        name: 'Adam',
        note: 'Eine künftige Geschichte über Erde, Atem, Anfänge und die Sorge für das, was uns anvertraut ist.',
      },
    },
  },
} as const;

export const familyLocaleStorageKey = 'frankx:family:locale';
export const davidProgressStorageKey = 'frankx:family:david:page';
