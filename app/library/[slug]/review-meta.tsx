import { Metadata } from 'next';
import { getReviewBySlug } from '@/data/book-reviews';
import type { BookReview } from '@/app/books/types';
import { sacredEditorial } from '@/data/sacred-editorial';
import { contemporaryEditorial } from '@/data/contemporary-editorial';

const guideRevised = (slug: string) => Boolean(sacredEditorial[slug] || contemporaryEditorial[slug]);

const SITE_URL = 'https://www.frankx.ai';

function absoluteUrl(src?: string) {
  if (!src) return undefined;
  if (/^https?:\/\//.test(src)) return src;
  return `${SITE_URL}${src.startsWith('/') ? '' : '/'}${src}`;
}

// Review pages are resolved on demand. Avoid enumerating the whole library on every deploy.

function truncate(text: string, limit = 158) {
  if (text.length <= limit) return text;
  return text.slice(0, limit - 1).trimEnd() + '…';
}

function reviewDescription(review: BookReview) {
  const lead = review.tldr ?? review.keyInsights[0];
  const credit = review.guide?.kind === 'Primary text' ? `${review.title} — ${review.author}` : `${review.title} by ${review.author}`;
  return truncate(`${credit}: ${lead}`);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) return {};

  const description = reviewDescription(review);
  const canonical = `${SITE_URL}/library/${review.slug}`;
  const ogImage = `${canonical}/opengraph-image`;
  const articleKind = review.guide ? 'Reading Guide & Editions' : 'Book Review & Key Insights';

  return {
    title: `${review.title} — ${articleKind}`,
    description,
    keywords: [
      ...review.categories,
      review.author,
      `${review.title} summary`,
      `${review.title} key insights`,
      'book review',
      'book summary',
    ],
    authors: [{ name: review.guide ? 'FrankX Library' : 'Frank Riemer' }],
    alternates: { canonical },
    openGraph: {
      title: `${review.title} — ${articleKind}`,
      description,
      type: 'article',
      url: canonical,
      siteName: 'FrankX Library',
      authors: [review.guide ? 'FrankX Library' : 'Frank Riemer'],
      publishedTime: review.reviewDate,
      modifiedTime: guideRevised(review.slug) ? '2026-09-25' : review.reviewDate,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630, alt: `${review.title} — FrankX reading guide` }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${review.title} — ${review.author}`,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-5 w-5 ${star <= rating ? 'text-amber-400' : 'text-white/10'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function JsonLd({ review }: { review: BookReview }) {
  const url = `${SITE_URL}/library/${review.slug}`;
  const description = reviewDescription(review);
  const reviewBody = review.tldr ?? review.keyInsights.join(' — ');
  const imageUrl = review.hasCover ? absoluteUrl(review.coverImage) : undefined;

  const graph: Array<Record<string, unknown>> = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Library', item: `${SITE_URL}/library` },
        { '@type': 'ListItem', position: 3, name: review.title, item: url },
      ],
    },
    {
      '@type': 'Article',
      headline: review.guide?.kind === 'Primary text' ? `${review.title} — Reading Guide` : `${review.title} by ${review.author} — Book Review & Key Insights`,
      description,
      url,
      ...(imageUrl ? { image: imageUrl } : {}),
      author: { '@type': 'Person', name: 'Frank', url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: 'FrankX',
        url: SITE_URL,
      },
      datePublished: review.reviewDate,
      dateModified: guideRevised(review.slug) ? '2026-09-25' : review.reviewDate,
      articleSection: review.categories,
      keywords: [...review.categories, review.author, 'book review'].join(', '),
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    },
    {
      '@type': 'Review',
      url,
      itemReviewed: {
        '@type': 'Book',
        name: review.title,
        author: { '@type': 'Person', name: review.author },
        ...(imageUrl ? { image: imageUrl } : {}),
        ...(review.publicationYear ? { datePublished: String(review.publicationYear) } : {}),
        ...(review.amazonUrl ? { sameAs: review.amazonUrl } : {}),
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody,
      author: { '@type': 'Person', name: 'Frank' },
      datePublished: review.reviewDate,
      publisher: { '@type': 'Organization', name: 'FrankX', url: SITE_URL },
    },
  ];

  if (review.guide) {
    // An editorial guide is not a personal review and carries no star rating.
    const reviewIndex = graph.findIndex(item => item['@type'] === 'Review');
    if (reviewIndex !== -1) graph.splice(reviewIndex, 1);
    const book = {
      '@type': 'Book', '@id': `${url}#book`, name: review.title,
      ...(review.guide.kind !== 'Primary text' ? { author: { '@type': 'Person', name: review.author } } : {}),
      subjectOf: { '@type': 'Article', '@id': url },
    };
    graph.push(book);
    const article = graph.find(item => item['@type'] === 'Article');
    if (article) {
      article.headline = `${review.title} — Reading Guide & Editions`;
      article.author = { '@type': 'Organization', name: 'FrankX Library', url: `${SITE_URL}/library` };
      article.about = { '@id': `${url}#book` };
      article.citation = review.guide.sources.map(source => ({ '@type': 'CreativeWork', name: source.title, url: source.url }));
      article.image = `${url}/opengraph-image`;
    }
  }

  if (review.faq && review.faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: review.faq.map((pair) => ({
        '@type': 'Question',
        name: pair.q,
        acceptedAnswer: { '@type': 'Answer', text: pair.a },
      })),
    });
  }

  if (review.quotes && review.quotes.length > 0) {
    review.quotes.forEach((quote) => {
      graph.push({
        '@type': 'Quotation',
        text: quote.text,
        spokenByCharacter: { '@type': 'Person', name: review.author },
        isPartOf: {
          '@type': 'Book',
          name: review.title,
          author: { '@type': 'Person', name: review.author },
        },
      });
    });
  }

  const data = {
    '@context': 'https://schema.org',
    '@graph': graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
