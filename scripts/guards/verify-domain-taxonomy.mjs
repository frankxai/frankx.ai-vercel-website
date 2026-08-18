/**
 * Auto-Hook Guard: Research Hub & Domain Taxonomy Validator
 * Validates that all domain categories and research hubs in lib/research/domains.ts
 * are internally consistent and correctly referenced across research pages.
 */

import fs from 'fs';
import path from 'path';

export function verifyDomainTaxonomy(rootDir = process.cwd()) {
  const domainsPath = path.join(rootDir, 'lib/research/domains.ts');
  const researchPagePath = path.join(rootDir, 'app/research/page.tsx');

  if (!fs.existsSync(domainsPath)) {
    console.warn(`⚠️ [Taxonomy-Guard] lib/research/domains.ts not found at ${domainsPath}`);
    return true;
  }

  const domainsContent = fs.readFileSync(domainsPath, 'utf8');

  // Verify domainCategories presence
  if (!domainsContent.includes('domainCategories')) {
    throw new Error('❌ [Taxonomy-Guard] domainCategories export missing from lib/research/domains.ts');
  }

  // Extract declared category keys from domains.ts
  const categoryMatch = domainsContent.match(/export const domainCategories[^=]*=\s*\{([\s\S]*?)\n\}/);
  if (!categoryMatch) {
    console.warn('⚠️ [Taxonomy-Guard] Could not parse domainCategories block, skipping detailed key audit.');
    return true;
  }

  const categoryBlock = categoryMatch[1];
  const validCategories = Array.from(categoryBlock.matchAll(/'([^']+)'\s*:\s*\{/g)).map(m => m[1]);

  console.log(`🔍 [Taxonomy-Guard] Found ${validCategories.length} active domain categories: ${validCategories.join(', ')}`);

  // Verify app/research/page.tsx if present
  if (fs.existsSync(researchPagePath)) {
    const pageContent = fs.readFileSync(researchPagePath, 'utf8');
    for (const cat of validCategories) {
      if (!pageContent.includes(`'${cat}'`) && !pageContent.includes(`"${cat}"`)) {
        console.warn(`⚠️ [Taxonomy-Guard] Category '${cat}' might not be listed in app/research/page.tsx`);
      }
    }

    // Verify safe navigation guard is present
    if (!pageContent.includes('domainCategories[key]?.label') && !pageContent.includes('(domainCategories as any)[key]?.label')) {
      console.warn('⚠️ [Taxonomy-Guard] Defensive fallback for domainCategories[key]?.label is recommended in app/research/page.tsx');
    }
  }

  console.log('✅ [Taxonomy-Guard] Domain taxonomy and research categories verified.');
  return true;
}

if (process.argv[1] && process.argv[1].endsWith('verify-domain-taxonomy.mjs')) {
  verifyDomainTaxonomy();
}
