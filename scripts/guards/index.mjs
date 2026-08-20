/**
 * Master Prebuild Guard Runner
 * Orchestrates image patterns, taxonomy validation, and visual asset registry checks.
 */

import { verifyImagePatterns } from './verify-image-patterns.mjs';
import { verifyDomainTaxonomy } from './verify-domain-taxonomy.mjs';
import { verifyInfographicsRegistry } from './verify-infographics-registry.mjs';

console.log('\n🛡️  [Auto-Hooks] Running Starlight & FrankX Prebuild Guard Suite...');

try {
  verifyImagePatterns();
  verifyDomainTaxonomy();
  verifyInfographicsRegistry();
  console.log('✨ [Auto-Hooks] All prebuild guards passed successfully!\n');
  process.exit(0);
} catch (error) {
  console.error('❌ [Auto-Hooks] Prebuild guard failure:', error);
  process.exit(1);
}
