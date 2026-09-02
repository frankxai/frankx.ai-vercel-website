# Rights and Textual Integrity Gate

This corpus separates five rights-bearing objects:

1. the historical work;
2. the chosen edition or critical apparatus;
3. the digital transcription or database;
4. the translation;
5. editorial notes, introductions, images, and annotations.

Public-domain status for one object does not clear the others.

## Publication modes

| Mode | Use |
| --- | --- |
| `full` | The exact item and edition are cleared for repository publication. |
| `excerpt` | A short, necessary passage is cleared and precisely attributed. |
| `locator-only` | Store metadata, thematic notes, and a link; do not store source text. |
| `private-research` | Owner-controlled research material that must not ship publicly. |

## Hard gates

- Never ingest a modern translation because the ancient author is public
  domain.
- Never treat an online reading copy as permission to redistribute it.
- Never publish OCR without checking it against page images or a second
  independent witness.
- Never present normalized spelling as a diplomatic transcription.
- Never use a generated paraphrase under a `translation` label.
- Poetry defaults to `locator-only` whenever rights are unresolved.
- Every original-language file carries source, edition, textual-status, and
  rights metadata in its header.

## Current author decisions

| Author | Default mode | Reason |
| --- | --- | --- |
| Augustine through Kierkegaard | Original-language public-domain witnesses may be ingested after edition review. | The underlying historical works are old; modern editions and translations still require separate review. |
| Simone Weil | `locator-only` pending item-level review | The author died in 1943, but posthumous publication, editors, introductions, and translations create edition-specific rights questions. |
| Thomas Merton | `locator-only` | The Thomas Merton Center directs quotation permissions to publishers and expressly excludes poetry from its stated prose fair-use convention. |

## Jurisdiction notes

- EU copyright generally runs for the author's life plus seventy years, with
  separate rules for anonymous, posthumous, critical, and scientific editions.
- Project Gutenberg states copyright status for the United States and warns
  users to check other jurisdictions.
- Repository publication is global. A source marked public domain in one
  country is not automatically cleared here.

These notes are operational gates, not blanket legal conclusions. Each ledger
row records the actual evidence used for its decision.

## File-level notice

Third-party source texts do not inherit the repository's general license.
Their file headers and ledger rows control. Original FrankX commentary and composition remain governed by the repository licensing policy.

