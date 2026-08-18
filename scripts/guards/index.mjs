/**
 * Master Prebuild Auto-Hook Guard Suite
 * Runs image configuration, domain taxonomy, and visual registry validations before builds.
 */

import { verifyImageConfig } from './verify-image-patterns.mjs';
import { verifyDomainTaxonomy } from './verify-domain-taxonomy.mjs';
import { verifyInfographicsRegistry } from './verify-infographics-registry.mjs';

export async function runAllGuards() {
  console.log('\n🛡️  [Auto-Hooks] Running Starlight & FrankX Prebuild Guard Suite...');
  
  try {
    verifyImageConfig();
    verifyDomainTaxonomy();
    verifyInfographicsRegistry();
    console.log('✨ [Auto-Hooks] All prebuild guards passed successfully!\n');
    return true;
  } catch (error) {
    console.error('❌ [Auto-Hooks] Prebuild Guard Failure:', error.message);
    process.exit(1);
  }
}

if (process.argv[1] && process.argv[1].endsWith('index.mjs')) {
  runAllGuards();
}
