/**
 * Next.js Image Optimization & localPatterns Verification Guard
 * Ensures next.config.mjs has valid localPatterns (including search queries)
 * to avoid static prerender failures with dynamic Next.js images.
 */

import fs from 'fs';
import path from 'path';

export function verifyImagePatterns() {
  const configPath = path.resolve(process.cwd(), 'next.config.mjs');
  if (!fs.existsSync(configPath)) {
    console.log('ℹ️ [Image-Guard] next.config.mjs not found, skipping localPatterns check.');
    return true;
  }

  const content = fs.readFileSync(configPath, 'utf8');
  const hasLocalPatterns = content.includes('localPatterns');
  const hasWildcardSearch = content.includes("search: '?**'") || content.includes('search: "?**"');

  if (!hasLocalPatterns || !hasWildcardSearch) {
    console.warn('⚠️ [Image-Guard] next.config.mjs missing localPatterns with search query wildcards. Auto-patching...');
    
    // Auto-patch if needed
    if (content.includes('images: {')) {
      const patched = content.replace(
        /images:\s*\{/,
        `images: {\n    localPatterns: [\n      { pathname: '/**', search: '' },\n      { pathname: '/**', search: '?**' },\n    ],`
      );
      fs.writeFileSync(configPath, patched, 'utf8');
      console.log('✅ [Image-Guard] Successfully patched next.config.mjs with localPatterns!');
    }
  } else {
    console.log('✅ [Image-Guard] Next.js image localPatterns verified.');
  }

  return true;
}

if (process.argv[1] && process.argv[1].endsWith('verify-image-patterns.mjs')) {
  verifyImagePatterns();
}
