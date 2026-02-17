'use client';

import Link from 'next/link';
import { ArrowRight, Twitter, Linkedin, Share2 } from 'lucide-react';
import BlogFeedback from './BlogFeedback';
import { EmailSignup } from '@/components/email-signup';
import { siteConfig } from '@/lib/seo';

interface BlogPostEndZoneProps {
  postSlug: string;
  postTitle: string;
  postDescription: string;
  relatedPosts?: Array<{
    slug: string;
    title: string;
    description: string;
    category: string;
    readingTime: string;
  }>;
}

export default function BlogPostEndZone({
  postSlug,
  postTitle,
  postDescription,
  relatedPosts = [],
}: BlogPostEndZoneProps) {
  const postUrl = `${siteConfig.url}/blog/${postSlug}`;

  return (
    <div className="mt-16 mb-12 space-y-0">
      {/* Divider */}
      <div className="border-t border-white/10 mb-8" />

      {/* Feedback */}
      <BlogFeedback postSlug={postSlug} postTitle={postTitle} />

      {/* Share buttons */}
      <div className="py-6">
        <p className="text-center text-white/50 text-sm font-medium mb-4">
          Share this article
        </p>
        <div className="flex items-center justify-center gap-3">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}&via=frankxeth`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
          >
            <Twitter className="h-4 w-4" />
            Share on X
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
          >
            <Linkedin className="h-4 w-4" />
            Share on LinkedIn
          </a>
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(postUrl);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
          >
            <Share2 className="h-4 w-4" />
            Copy link
          </button>
        </div>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="pt-8 pb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Related articles</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-emerald-400">{post.category}</span>
                  <span className="text-xs text-white/40">•</span>
                  <span className="text-xs text-white/40">{post.readingTime}</span>
                </div>
                <h4 className="text-base font-semibold text-white group-hover:text-emerald-100 transition-colors mb-2">
                  {post.title}
                </h4>
                <p className="text-sm text-white/60 line-clamp-2 mb-3">{post.description}</p>
                <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 group-hover:gap-2.5 transition-all">
                  Read article
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter signup */}
      <div className="max-w-md mx-auto pt-8 pb-2">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3">
            <span className="text-base">✨</span>
            <span className="text-xs font-medium text-emerald-400">Weekly Intelligence</span>
          </div>
          <p className="text-white/60 text-sm">
            Join 1,000+ creators receiving weekly field notes on AI systems, music, and strategy
          </p>
        </div>
        <EmailSignup
          listType="newsletter"
          placeholder="Enter your email"
          buttonText="Subscribe"
          compact
        />
        <p className="text-center text-white/30 text-xs mt-3">No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  );
}
