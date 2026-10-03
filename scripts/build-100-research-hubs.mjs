/**
 * Historical generator for the 100 research hubs.
 *
 * The old script labeled Google Scholar search URLs as journals, called an
 * internal /research/[slug] page official peer review, and assigned
 * confidence high, evidenceQuality rct, and replicationStatus replicated
 * from a domain letter grade. Those strings are not citations.
 *
 * Issue 824. Public registries stay as reviewed records. This file refuses
 * to write them.
 */
console.error('Research generation is fail-closed. A search page is not a citation, and a letter grade is not a replication. See issue 824.')
process.exit(1)
