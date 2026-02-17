'use client';

import { ReactNode } from 'react';
import BlogSharePopover from './BlogSharePopover';

interface BlogArticleContentProps {
  children: ReactNode;
  postTitle: string;
  postSlug: string;
}

export default function BlogArticleContent({
  children,
  postTitle,
  postSlug,
}: BlogArticleContentProps) {
  return (
    <>
      <div className="article-prose">
        {children}
      </div>
      <BlogSharePopover postTitle={postTitle} postSlug={postSlug} />
    </>
  );
}
