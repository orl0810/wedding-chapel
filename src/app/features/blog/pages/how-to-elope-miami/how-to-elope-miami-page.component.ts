import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { SeoService } from '../../../../core/services/seo.service';
import { I18nService } from '../../../../core/services/i18n.service';
import { LanguageUrlService } from '../../../../core/services/language-url.service';
import type { PageKey } from '../../../../routing/localized-page-meta';
import type { SiteLang } from '../../../../routing/localized-page-meta';
import { environment } from '../../../../../environments/environment';

const ARTICLE_SLUG = 'how-to-elope-in-miami';
const JSON_LD_ID = 'blog-posting-schema';
const FAQ_JSON_LD_ID = 'blog-faq-schema';

/**
 * Section-specific Unsplash imagery (same topic as adjacent copy — supports SEO alt text).
 * CDN params: format + crop + width + quality for LCP-friendly delivery.
 */
export const ARTICLE_IMAGES = {
  /** Hero: couple on the sand — reads immediately as beach wedding / elopement */
  hero: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1920&q=82',
  /** “Why Miami”: skyline + Atlantic — unmistakably Miami as a destination */
  miamiDestination:
    '/assets/images/miami-officiant-marriage-certificate-south-florida-best-venues-florida-luxury-miami-56.webp',
  /** Legal: rings + license paperwork — matches Florida marriage license copy */
  legalMarriageLicense:
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=960&q=82',
  /** Beach ceremony block: ocean-facing aisle / arch (verified CDN 200) */
  beachCeremony:
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=960&q=82',
  /** Courthouse & boutique hotels: private resort / terrace energy vs. public sand */
  civilOrBoutique:
    '/assets/images/miami-officiant-marriage-certificate-south-florida-best-venues-florida-luxury-miami2.webp',
  /** Best time / golden hour: couple at sunset on the beach */
  sunsetElopement:
    '/assets/images/MIAMI-WEDDING-OFFICIANT-MARRIAGE-CERTIFICATE-FLORIDA.webp',
  /** Costs / tips luxury strip: editorial tablescape + florals */
  luxurySetup:
    '/assets/images/miami-wedding-officiant-marriage-certificate-south-florida-best-venues-florida-luxury-miami.webp',
} as const;

@Component({
  selector: 'app-how-to-elope-miami-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './how-to-elope-miami-page.component.html',
  styleUrl: './how-to-elope-miami-page.component.scss',
})
export class HowToElopeMiamiPageComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  readonly i18n = inject(I18nService);
  private readonly languageUrl = inject(LanguageUrlService);

  readonly articleSlug = ARTICLE_SLUG;
  readonly img = ARTICLE_IMAGES;

  navPage(pageKey: PageKey): (string | SiteLang)[] {
    return this.languageUrl.navCommands(this.i18n.currentLang(), pageKey);
  }

  ngOnInit(): void {
    const data = this.route.snapshot.data as Record<string, unknown>;
    const lang = data['lang'] as SiteLang;
    const headline = data['jsonLdHeadline'] as string;
    const description = data['jsonLdDescription'] as string;
    const canonicalUrl = data['canonicalUrl'] as string;
    const routeOgImage = data['ogImage'] as string | undefined;
    const site = environment.siteUrl.replace(/\/$/, '');

    const heroImage = routeOgImage || ARTICLE_IMAGES.hero;
    const schemaImages = [
      heroImage,
      ARTICLE_IMAGES.miamiDestination,
      ARTICLE_IMAGES.beachCeremony,
      ARTICLE_IMAGES.sunsetElopement,
    ];

    this.seo.addJsonLd(
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline,
        description,
        image: schemaImages,
        datePublished: '2025-03-01',
        dateModified: '2025-03-01',
        author: {
          '@type': 'Organization',
          name: 'Miami Wedding Officiant',
          url: `${site}/en/`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Miami Wedding Officiant',
          url: `${site}/en/`,
          logo: {
            '@type': 'ImageObject',
            url: `${site}/brand/favicon-32x32.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        inLanguage: lang,
        url: canonicalUrl,
        isAccessibleForFree: true,
      },
      JSON_LD_ID
    );

    this.seo.addJsonLd(this.buildFaqSchema(lang), FAQ_JSON_LD_ID);
  }

  ngOnDestroy(): void {
    this.seo.removeJsonLd(JSON_LD_ID);
    this.seo.removeJsonLd(FAQ_JSON_LD_ID);
  }

  private buildFaqSchema(lang: SiteLang): Record<string, unknown> {
    const pairs =
      lang === 'es'
        ? [
            {
              q: '¿Se necesita permiso para casarse en la playa en Miami?',
              a: 'Depende del municipio y del tramo de arena. Muchas playas públicas exigen permiso u horarios para ceremonias y fotografía con trípode; tu oficiante o planner puede orientarte sobre normas locales y alternativas si preferís terraza privada.',
            },
            {
              q: '¿Cuánto tarda la licencia matrimonial de Florida?',
              a: 'Tras solicitarla en el condado, suele haber una espera antes de poder casaros legalmente salvo excepciones aplicables a no residentes. Confirmad siempre fechas con la oficina del clerk y coordinad la ceremonia dentro de la ventana válida.',
            },
            {
              q: '¿Puede ser la ceremonia bilingüe?',
              a: 'Sí. Muchas parejas eligen votos y guion mezclando español e inglés para familia y fotos naturales. Un oficiante con experiencia bilingüe ayuda con ritmo y firma en un solo día sin estrés.',
            },
          ]
        : [
            {
              q: 'Do you need a permit to elope on the beach in Miami?',
              a: 'Often yes—it depends on the municipality and beach segment. Many public beaches require permits or set rules for ceremonies and photography setups. Your officiant or planner can steer you toward compliant spots—or a private terrace backup.',
            },
            {
              q: 'How long does a Florida marriage license take?',
              a: 'After you apply with the county, there is typically a waiting period before the license is valid for ceremony—exceptions may apply for non-residents. Always confirm dates with the clerk and schedule your ceremony within the valid window.',
            },
            {
              q: 'Can our Miami elopement ceremony be bilingual?',
              a: 'Yes. Many couples blend English and Spanish for vows and storytelling so family can follow—and photos feel natural. A bilingual officiant keeps timing, signatures, and logistics smooth in one day.',
            },
          ];

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: pairs.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    };
  }
}
