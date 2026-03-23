import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

import JsonLd from '@/components/seo/JsonLd'

type BreadcrumbItem = {
  label: string
  href: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Generate BreadcrumbList Schema
  const schema = {
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://frankx.ai',
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: `https://frankx.ai${item.href}`,
      })),
    ],
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-sm text-white/50">
      <JsonLd type="BreadcrumbList" data={schema} />
      
      <Link
        href="/"
        className="flex items-center hover:text-white transition-colors"
        aria-label="Home"
      >
        <Home className="h-4 w-4" />
      </Link>

      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          <ChevronRight className="mx-2 h-4 w-4 opacity-50" />
          {index === items.length - 1 ? (
            <span className="font-medium text-white/90" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
