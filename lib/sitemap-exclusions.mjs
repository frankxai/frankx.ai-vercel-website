export function isExcludedFromSitemap(pathname, redirectSources) {
  // Hardcoded exclusions
  if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
    return true
  }
  if (pathname === '/products/agentic-creator-os' || pathname === '/sis' || pathname === '/links') {
    return true
  }

  // Dynamic exclusions from redirects
  for (const source of redirectSources) {
    if (!source.includes(':')) {
      if (pathname === source) {
        return true
      }
    }
  }

  return false
}
