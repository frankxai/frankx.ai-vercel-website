const fs = require('fs');
const path = require('path');

const logos = {
  'antigravity.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <defs>
    <linearGradient id="agGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06B6D4" />
      <stop offset="50%" stop-color="#3B82F6" />
      <stop offset="100%" stop-color="#10B981" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <circle cx="50" cy="50" r="42" stroke="url(#agGrad)" stroke-width="2" stroke-dasharray="6 4" opacity="0.4" />
  <ellipse cx="50" cy="50" rx="44" ry="18" stroke="url(#agGrad)" stroke-width="2.5" transform="rotate(-30, 50, 50)" opacity="0.8" />
  <ellipse cx="50" cy="50" rx="44" ry="18" stroke="url(#agGrad)" stroke-width="2.5" transform="rotate(30, 50, 50)" opacity="0.8" />
  <circle cx="50" cy="50" r="12" fill="#0A0A0B" stroke="url(#agGrad)" stroke-width="3" filter="url(#glow)" />
  <circle cx="50" cy="50" r="5" fill="#06B6D4" />
  <path d="M50 20 L50 28 M50 72 L50 80 M20 50 L28 50 M72 50 L80 50" stroke="#10B981" stroke-width="2" stroke-linecap="round" />
</svg>`,

  'hermes.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <defs>
    <linearGradient id="hermesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="50%" stop-color="#E11D48" />
      <stop offset="100%" stop-color="#FBBF24" />
    </linearGradient>
  </defs>
  <path d="M50 15 L50 85" stroke="url(#hermesGrad)" stroke-width="3.5" stroke-linecap="round" />
  <circle cx="50" cy="15" r="5" fill="#F59E0B" />
  <path d="M47 30 C30 20 15 28 12 45 C22 45 35 40 47 48" fill="none" stroke="url(#hermesGrad)" stroke-width="3" stroke-linecap="round" />
  <path d="M47 42 C32 36 22 42 18 55 C28 55 38 50 47 56" fill="none" stroke="url(#hermesGrad)" stroke-width="2.5" stroke-linecap="round" opacity="0.8" />
  <path d="M53 30 C70 20 85 28 88 45 C78 45 65 40 53 48" fill="none" stroke="url(#hermesGrad)" stroke-width="3" stroke-linecap="round" />
  <path d="M53 42 C68 36 78 42 82 55 C72 55 62 50 53 56" fill="none" stroke="url(#hermesGrad)" stroke-width="2.5" stroke-linecap="round" opacity="0.8" />
  <path d="M38 65 Q50 55 62 65 T50 78 T38 90" fill="none" stroke="#FBBF24" stroke-width="2" opacity="0.6" />
</svg>`,

  'openclaw.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <defs>
    <linearGradient id="clawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10B981" />
      <stop offset="50%" stop-color="#06B6D4" />
      <stop offset="100%" stop-color="#3B82F6" />
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="42" stroke="#1F2937" stroke-width="2" />
  <path d="M50 20 C42 20 38 32 46 42 L50 46 L54 42 C62 32 58 20 50 20 Z" fill="url(#clawGrad)" />
  <path d="M22 62 C22 54 34 50 44 58 L48 62 L44 66 C34 74 22 70 22 62 Z" fill="url(#clawGrad)" />
  <path d="M78 62 C78 54 66 50 56 58 L52 62 L56 66 C66 74 78 70 78 62 Z" fill="url(#clawGrad)" />
  <circle cx="50" cy="56" r="8" fill="#0A0A0B" stroke="#10B981" stroke-width="2.5" />
  <circle cx="50" cy="56" r="3.5" fill="#06B6D4" />
</svg>`,

  'frankx-omega.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <defs>
    <linearGradient id="omegaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="50%" stop-color="#10B981" />
      <stop offset="100%" stop-color="#06B6D4" />
    </linearGradient>
  </defs>
  <path d="M24 78 L38 78 C38 78 40 68 44 62 C34 56 30 44 34 32 C38 20 50 14 62 16 C74 18 82 28 82 40 C82 52 74 60 66 64 C70 70 72 78 72 78 L86 78" fill="none" stroke="url(#omegaGrad)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
  <polygon points="55,30 65,48 45,48" fill="none" stroke="#F59E0B" stroke-width="2" />
  <circle cx="55" cy="42" r="3" fill="#10B981" />
</svg>`,

  'cerebras.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <defs>
    <linearGradient id="csGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EF4444" />
      <stop offset="100%" stop-color="#F97316" />
    </linearGradient>
  </defs>
  <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" stroke="url(#csGrad)" stroke-width="4" fill="#0A0A0B" />
  <rect x="32" y="32" width="10" height="10" rx="2" fill="url(#csGrad)" />
  <rect x="46" y="32" width="10" height="10" rx="2" fill="url(#csGrad)" />
  <rect x="60" y="32" width="10" height="10" rx="2" fill="url(#csGrad)" />
  <rect x="32" y="46" width="10" height="10" rx="2" fill="url(#csGrad)" />
  <rect x="46" y="46" width="10" height="10" rx="2" fill="#F97316" />
  <rect x="60" y="46" width="10" height="10" rx="2" fill="url(#csGrad)" />
  <rect x="32" y="60" width="10" height="10" rx="2" fill="url(#csGrad)" />
  <rect x="46" y="60" width="10" height="10" rx="2" fill="url(#csGrad)" />
  <rect x="60" y="60" width="10" height="10" rx="2" fill="url(#csGrad)" />
</svg>`,

  'groq.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <defs>
    <linearGradient id="groqGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F43F5E" />
      <stop offset="100%" stop-color="#FB7185" />
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="42" stroke="#262626" stroke-width="3" fill="#0A0A0B" />
  <path d="M30 40 L50 25 L70 40 L70 60 L50 75 L30 60 Z" fill="none" stroke="url(#groqGrad)" stroke-width="4" stroke-linejoin="round" />
  <path d="M50 25 L50 75 M30 40 L70 60 M30 60 L70 40" stroke="url(#groqGrad)" stroke-width="2" opacity="0.7" />
  <circle cx="50" cy="50" r="5" fill="#FFFFFF" />
</svg>`,

  'nvidia.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <defs>
    <linearGradient id="nvGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#76B900" />
      <stop offset="100%" stop-color="#A3E635" />
    </linearGradient>
  </defs>
  <path d="M15 50 C15 30 35 15 55 15 C75 15 90 32 85 55 C80 72 65 85 48 85 C32 85 18 72 18 55 C18 42 28 32 40 32 C52 32 60 42 58 55 C56 62 48 68 42 66" fill="none" stroke="url(#nvGrad)" stroke-width="7" stroke-linecap="round" />
  <circle cx="42" cy="50" r="5" fill="#76B900" />
</svg>`
};

const repos = [
  'c:/Users/frank/starlight/repos/frankx.ai-vercel-website/public/images/logos',
  'c:/Users/frank/starlight/repos/FrankX/public/images/logos'
];

for (const [filename, content] of Object.entries(logos)) {
  for (const repo of repos) {
    fs.mkdirSync(repo, { recursive: true });
    fs.writeFileSync(path.join(repo, filename), content.trim(), 'utf8');
  }
  console.log('Successfully written vector logo:', filename);
}
