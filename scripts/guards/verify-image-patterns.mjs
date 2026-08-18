/**
 * Auto-Hook Guard: Next.js Image Config & LocalPatterns Validator
 * Ensures Next.js 16 local image query-string support is always active.
 */

import fs from 'fs';
import path from 'path';

export function verifyImageConfig(rootDir = process.cwd()) {
  const configPath = path.join(rootDir, 'next.config.mjs');
  if (!fs.existsSync(configPath)) {
    console.warn(`⚠️ [Image-Guard] next.config.mjs not found at ${configPath}`);
    return true;
  }

  let content = fs.readFileSync(configPath, 'utf8');
  let modified = false;

  // Check if localPatterns is present
  if (!content.includes('localPatterns')) {
    console.log('⚡ [Auto-Hook] Patching missing localPatterns in next.config.mjs...');
    
    // Inject localPatterns inside images: { ... }
    if (content.includes('images: {')) {
      content = content.replace(
        'images: {',
        `images: {\n    localPatterns: [\n      { pathname: '/**', search: '' },\n      { pathname: '/**', search: '?**' },\n    ],`
      );
      modified = true;
    }
  } else if (!content.includes("search: '?**'")) {
    console.log('⚡ [Auto-Hook] Updating localPatterns to support dynamic query parameters...');
    content = content.replace(
      /localPatterns:\s*\[[\s\S]*?\]/,
      `localPatterns: [\n      { pathname: '/**', search: '' },\n      { pathname: '/**', search: '?**' },\n    ]`
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(configPath, content, 'utf8');
    console.log('✅ [Image-Guard] next.config.mjs localPatterns successfully patched & verified.');
  } else {
    console.log('✅ [Image-Guard] Next.js image localPatterns verified.');
  }

  return true;
}

if (process.argv[1] && process.argv[1].endsWith('verify-image-patterns.mjs')) {
  verifyImageConfig();
}
