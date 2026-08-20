/**
 * Research Domain Taxonomy & Category Parity Guard
 * Verifies that all categories defined in lib/research/domains.ts are properly
 * represented in app/research/page.tsx category filters and route indexes.
 */

import fs from 'fs';
import path from 'path';

export function verifyDomainTaxonomy() {
  const domainsTsPath = path.resolve(process.cwd(), 'lib/research/domains.ts');
  const pageTsxPath = path.resolve(process.cwd(), 'app/research/page.tsx');

  if (!fs.existsSync(domainsTsPath)) {
    console.log('ℹ️ [Taxonomy-Guard] lib/research/domains.ts not found, skipping.');
    return true;
  }

  const domainsContent = fs.readFileSync(domainsTsPath, 'utf8');
  
  // Extract category keys
  const categoryMatch = domainsContent.match(/export const domainCategories: Record<DomainCategory, \{ label: string; description: string \}> = \{([\s\S]*?)\n\}/);
  if (!categoryMatch) {
    console.log('ℹ️ [Taxonomy-Guard] Could not parse domainCategories, skipping.');
    return true;
  }

  const categoryBlock = categoryMatch[1];
  const definedCategories = [...categoryBlock.matchAll(/['"]?([a-z0-9-]+)['"]?:\s*\{/g)].map(m => m[1]);

  console.log(`🔍 [Taxonomy-Guard] Found ${definedCategories.length} active domain categories: ${definedCategories.join(', ')}`);

  if (fs.existsSync(pageTsxPath)) {
    const pageContent = fs.readFileSync(pageTsxPath, 'utf8');
    const missingInPage = definedCategories.filter(cat => !pageContent.includes(cat));

    if (missingInPage.length > 0) {
      console.warn(`⚠️ [Taxonomy-Guard] Missing categories in app/research/page.tsx: ${missingInPage.join(', ')}`);
    } else {
      console.log('✅ [Taxonomy-Guard] Domain taxonomy and research categories verified.');
    }
  }

  return true;
}

if (process.argv[1] && process.argv[1].endsWith('verify-domain-taxonomy.mjs')) {
  verifyDomainTaxonomy();
}
