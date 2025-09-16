import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { Lightbulb, AlertTriangle, Info, CheckCircle } from 'lucide-react'

interface CalloutProps {
  children: ReactNode
  type?: 'info' | 'warning' | 'tip' | 'success'
}

function Callout({ children, type = 'info' }: CalloutProps) {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800', 
    tip: 'bg-green-50 border-green-200 text-green-800',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800'
  }

  const icons = {
    info: <Info className="w-5 h-5" />,
    warning: <AlertTriangle className="w-5 h-5" />,
    tip: <Lightbulb className="w-5 h-5" />,
    success: <CheckCircle className="w-5 h-5" />
  }

  return (
    <div className={`p-4 rounded-lg border-l-4 ${styles[type]} my-6`}>
      <div className="flex items-start gap-3">
        {icons[type]}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

function CustomImage({ src, alt, ...props }: any) {
  return (
    <div className="relative my-8 overflow-hidden rounded-xl">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={400}
        className="w-full h-auto"
        {...props}
      />
    </div>
  )
}

export const mdxComponents = {
  // Text elements
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-6 pb-2 border-b border-gray-200">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
      {children}
    </h3>
  ),
  h4: ({ children }: { children: ReactNode }) => (
    <h4 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="text-lg leading-relaxed text-gray-700 mb-6">
      {children}
    </p>
  ),
  
  // Lists
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="list-disc list-inside text-lg text-gray-700 mb-6 space-y-2 ml-4">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="list-decimal list-inside text-lg text-gray-700 mb-6 space-y-2 ml-4">
      {children}
    </ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="text-gray-700">{children}</li>
  ),
  
  // Links
  a: ({ href, children }: { href: string; children: ReactNode }) => (
    <Link 
      href={href}
      className="text-purple-600 hover:text-purple-700 underline font-medium transition-colors"
    >
      {children}
    </Link>
  ),
  
  // Code
  code: ({ children }: { children: ReactNode }) => (
    <code className="bg-gray-100 text-purple-600 px-2 py-1 rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto my-6 text-sm">
      {children}
    </pre>
  ),
  
  // Blockquote
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-4 border-purple-500 pl-6 py-2 my-6 bg-purple-50 italic text-lg text-gray-800">
      {children}
    </blockquote>
  ),
  
  // Table
  table: ({ children }: { children: ReactNode }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-gray-300">
        {children}
      </table>
    </div>
  ),
  th: ({ children }: { children: ReactNode }) => (
    <th className="border border-gray-300 bg-gray-50 px-4 py-2 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }: { children: ReactNode }) => (
    <td className="border border-gray-300 px-4 py-2">
      {children}
    </td>
  ),
  
  // Custom components
  Image: CustomImage,
  Callout,
}