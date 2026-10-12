/**
 * FrankX validated claims registry.
 *
 * Empty until a claim has an individual primary source, a locator, and a
 * review receipt. A search URL, a self-reference, or a letter grade is not
 * a confidence level, an RCT, or a replication.
 *
 * Freshness Rules:
 * - Current: validated within 30 days
 * - Aging: 31-90 days old
 * - Stale: >90 days (needs re-validation)
 */

export type ConfidenceLevel = 'high' | 'medium-high' | 'medium' | 'low';
export type FreshnessStatus = 'current' | 'aging' | 'stale';

/**
 * Evidence Quality Rating
 * Based on hierarchy of evidence (Oxford CEBM)
 */
export type EvidenceQuality =
  | 'meta-analysis'        // Systematic review of RCTs
  | 'rct'                  // Randomized controlled trial
  | 'cohort'               // Prospective cohort study
  | 'case-control'         // Case-control study
  | 'case-series'          // Case series/reports
  | 'observational'        // Cross-sectional/observational
  | 'expert-consensus'     // Expert opinion/consensus
  | 'industry-report'      // Market research/industry data
  | 'preprint'             // Not yet peer-reviewed
  | 'company-claim';       // Self-reported by company

/**
 * Scientific Consensus Level
 * How agreed-upon is this finding in the field?
 */
export type ConsensusLevel =
  | 'established'          // Textbook-level consensus
  | 'strong'               // Most experts agree
  | 'emerging'             // Growing evidence, debate active
  | 'contested'            // Significant disagreement
  | 'preliminary';         // Early-stage, limited data

export interface ValidatedClaim {
  id: string;
  claim: string;
  value: string;
  sources: {
    name: string;
    url?: string;
    date?: string;
    type?: 'journal' | 'conference' | 'preprint' | 'news' | 'report' | 'official';
  }[];
  validatedDate: string; // ISO date
  confidence: ConfidenceLevel;
  category: string;
  crossRefCount: number;
  // Academic credibility fields
  evidenceQuality?: EvidenceQuality;
  consensusLevel?: ConsensusLevel;
  limitations?: string[];
  replicationStatus?: 'replicated' | 'single-study' | 'mixed';
}

export interface ResearchBrief {
  slug: string;
  title: string;
  description: string;
  tldr: string; // 50-word AI-quotable summary
  category: string;
  lastValidated: string;
  methodology: string;
  sourceCount: number;
  claims: ValidatedClaim[];
  implications: string[];
  relatedArticles: string[];
  // FAQ for schema markup
  faqs?: { question: string; answer: string }[];
  // Academic credibility fields
  limitations?: string[];
  whatWeDontKnow?: string[];
  versionHistory?: { version: string; date: string; changes: string }[];
}

// Calculate freshness status based on validation date
export function getFreshnessStatus(validatedDate: string): FreshnessStatus {
  const validated = new Date(validatedDate);
  const now = new Date();
  const daysDiff = Math.floor((now.getTime() - validated.getTime()) / (1000 * 60 * 60 * 24));

  if (daysDiff <= 30) return 'current';
  if (daysDiff <= 90) return 'aging';
  return 'stale';
}

export function getFreshnessLabel(status: FreshnessStatus): string {
  switch (status) {
    case 'current': return 'Current (updated recently)';
    case 'aging': return 'Aging (may need review)';
    case 'stale': return 'Stale (needs re-validation)';
  }
}

export const validatedClaims: ValidatedClaim[] = []

export const researchBriefs: Record<string, ResearchBrief> = {}

export function getClaimById(id: string): ValidatedClaim | undefined {
  return validatedClaims.find(c => c.id === id);
}

export function getClaimsByCategory(category: string): ValidatedClaim[] {
  return validatedClaims.filter(c => c.category === category);
}

export function getClaimsByConfidence(confidence: ConfidenceLevel): ValidatedClaim[] {
  return validatedClaims.filter(c => c.confidence === confidence);
}

export function getResearchBrief(slug: string): ResearchBrief | undefined {
  return researchBriefs[slug];
}

export function getClaimCountForDomain(slug: string): number {
  return validatedClaims.filter(c => c.id.startsWith(slug)).length;
}
