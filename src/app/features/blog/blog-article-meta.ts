import { environment } from '../../../environments/environment';
import type { SiteLang } from '../../routing/localized-page-meta';

const siteBase = environment.siteUrl.replace(/\/$/, '');

/** Slugs listed here are included in `scripts/generate-sitemap.mjs` (keep in sync). */
export const BLOG_ARTICLE_SLUGS = [
  'how-to-elope-in-miami',
  'courthouse-wedding-miami',
] as const;

export type BlogArticleSlug = (typeof BLOG_ARTICLE_SLUGS)[number];

export function absoluteBlogArticleUrl(lang: SiteLang, slug: string): string {
  return `${siteBase}/${lang}/blog/${slug}/`;
}

export function hreflangArticleTriple(slug: string): { hreflang: string; href: string }[] {
  return [
    { hreflang: 'x-default', href: absoluteBlogArticleUrl('en', slug) },
    { hreflang: 'en', href: absoluteBlogArticleUrl('en', slug) },
    { hreflang: 'es', href: absoluteBlogArticleUrl('es', slug) },
  ];
}

type ArticlePageCopy = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  /** JSON-LD BlogPosting headline (matches page language). */
  headline: string;
};

/** Per-article SEO copy (title/description/OG must stay aligned with JSON-LD headline). */
const ARTICLE_REGISTRY: Record<BlogArticleSlug, Record<SiteLang, ArticlePageCopy>> = {
  'how-to-elope-in-miami': {
    en: {
      title: 'How to Elope in Miami: Complete 2025 Guide | Legal Steps & Best Spots',
      description:
        'Learn how to elope in Miami in 2025: Florida marriage license rules, beach and courthouse locations, timing, realistic costs, and officiant tips for a stress-free intimate wedding.',
      ogTitle: 'How to Elope in Miami: Complete 2025 Guide',
      ogDescription:
        'Step-by-step guide to eloping in Miami—license requirements, top locations, seasons, budgets, and planning tips from a local wedding officiant.',
      ogImage:
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1920&q=82',
      headline: 'How to Elope in Miami: Complete 2025 Guide',
    },
    es: {
      title:
        'Cómo casarse en Miami en una ceremonia íntima (Guía 2025) | Licencia y mejores lugares',
      description:
        'Planificá una boda pequeña en Miami: licencia matrimonial en Florida, playas y juzgados, mejor época, presupuesto realista y ceremonia bilingüe con oficiante local.',
      ogTitle: 'Cómo casarse en Miami en una ceremonia íntima (Guía 2025)',
      ogDescription:
        'Pasos claros para una ceremonia íntima en Miami: trámites en Florida, ubicaciones, temporadas, costos y consejos de planificación.',
      ogImage:
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1920&q=82',
      headline: 'Cómo casarse en Miami en una ceremonia íntima (Guía 2025)',
    },
  },
  'courthouse-wedding-miami': {
    en: {
      title:
        'Getting Married at Miami Courthouse: Step-by-Step | Courthouse Wedding Miami Guide',
      description:
        'Courthouse wedding Miami guide: marriage license steps at Miami-Dade Clerk, IDs and fees, scheduling, witnesses, and what to expect for a civil ceremony or license pickup—plus bilingual officiant tips.',
      ogTitle: 'Getting Married at Miami Courthouse: Step-by-Step',
      ogDescription:
        'Plan a courthouse wedding in Miami: Florida license rules, Miami-Dade Clerk checklist, timeline, costs, and ceremony vs. license-only paths explained clearly.',
      ogImage:
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=82',
      headline: 'Getting Married at Miami Courthouse: Step-by-Step',
    },
    es: {
      title:
        'Casarse por lo civil en Miami en el juzgado (paso a paso) | Guía 2025',
      description:
        'Guía para una boda civil tipo “courthouse wedding” en Miami: licencia en Florida, trámites en el condado Miami-Dade, documentos, costos y opciones de ceremonia civil u oficiante.',
      ogTitle: 'Casarse por lo civil en Miami en el juzgado (paso a paso)',
      ogDescription:
        'Pasos claros para casarte por lo civil en Miami: requisitos del clerk, licencia matrimonial, testigos y planificación de ceremonia o firma.',
      ogImage:
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=82',
      headline: 'Casarse por lo civil en Miami en el juzgado (paso a paso)',
    },
  },
};

export function buildBlogArticleRouteData(
  slug: BlogArticleSlug,
  lang: SiteLang
): Record<string, unknown> {
  const article = ARTICLE_REGISTRY[slug];
  if (!article) {
    throw new Error(`Unknown blog article slug: ${slug}`);
  }
  const copy = article[lang];
  const canonicalUrl = absoluteBlogArticleUrl(lang, slug);
  return {
    pageKey: 'blog',
    lang,
    title: copy.title,
    description: copy.description,
    ogTitle: copy.ogTitle,
    ogDescription: copy.ogDescription,
    ogImage: copy.ogImage,
    ogUrl: canonicalUrl,
    canonicalUrl,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    twitterTitle: copy.ogTitle,
    twitterDescription: copy.ogDescription,
    twitterImage: copy.ogImage,
    hreflangAlternates: hreflangArticleTriple(slug),
    includeLocalBusinessSchema: false,
    blogArticleSlug: slug,
    jsonLdHeadline: copy.headline,
    jsonLdDescription: copy.description,
  };
}
