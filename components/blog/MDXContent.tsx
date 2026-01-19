import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import remarkGfm from 'remark-gfm'
import { mdxComponents } from './MDXComponents'

interface MDXContentProps {
  source: string
}

export async function MDXContent({ source }: MDXContentProps) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    development: false,
    baseUrl: import.meta.url,
  })

  return <Content components={mdxComponents} />
}
