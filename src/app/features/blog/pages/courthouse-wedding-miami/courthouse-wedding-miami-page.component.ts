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

const ARTICLE_SLUG = 'courthouse-wedding-miami';
const JSON_LD_ID = 'blog-posting-schema-courthouse-wedding-miami';
const FAQ_JSON_LD_ID = 'blog-faq-schema-courthouse-wedding-miami';

/** Imagery aligned to courthouse-wedding Miami story (Unsplash CDN). */
export const ARTICLE_IMAGES = {
  hero: '/assets/images/MIAMI-WEDDING-OFFICIANT-MARRIAGE-CERTIFICATE-FLORIDA.webp',
  downtownMiami:
    '/assets/images/miami-wedding-officiant-marriage-certificate-south-florida-best-venues-florida-luxury-miami5.webp',
  marriageLicenseDocs:
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=960&q=82',
  portraitsAfterCivil:
    'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=960&q=82',
  outdoorCeremonyOption:
    '/assets/images/miami-wedding-officiant-marriage-certificate-south-florida-best-venues-florida-luxury-miami.webp',
  boutiqueCelebration:
    '/assets/images/miami-officiant-marriage-certificate-south-florida-best-venues-florida-luxury-miami2.webp',
  editorialReception:
    '/assets/images/miami-officiant-marriage-certificate-south-florida-best-venues-florida-luxury-miami-56.webp',
} as const;

@Component({
  selector: 'app-courthouse-wedding-miami-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './courthouse-wedding-miami-page.component.html',
  styleUrl: './courthouse-wedding-miami-page.component.scss',
})
export class CourthouseWeddingMiamiPageComponent implements OnInit, OnDestroy {
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
      ARTICLE_IMAGES.downtownMiami,
      ARTICLE_IMAGES.portraitsAfterCivil,
      ARTICLE_IMAGES.outdoorCeremonyOption,
    ];

    this.seo.addJsonLd(
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline,
        description,
        image: schemaImages,
        datePublished: '2025-06-15',
        dateModified: '2025-06-15',
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
              q: '¿El condado Miami-Dade celebra ceremonias civiles en el mismo edificio del clerk?',
              a: 'Las opciones cambian según políticas del condado y disponibilidad. Muchas parejas tramitan la licencia en la oficina del clerk y luego celebran con un oficiante autorizado fuera del edificio; confirmá ceremonias civiles programadas directamente con Miami-Dade.',
            },
            {
              q: '¿Cuánto cuesta la licencia matrimonial para una courthouse wedding en Miami?',
              a: 'Los honorarios los fija el condado y pueden actualizarse; además puede haber cargos por copias certificadas. Presupuestá la licencia y cualquier cargo administrativo antes del día de la cita.',
            },
            {
              q: '¿Puede ser bilingüe una boda civil o la firma después del clerk?',
              a: 'Sí. Muchas parejas combinan el trámite del condado con una ceremonia guiada en español e inglés con un oficiante licenciado en Florida para que familia y documentación estén alineadas.',
            },
          ]
        : [
            {
              q: 'Does Miami-Dade perform courthouse ceremonies at the Clerk’s office?',
              a: 'Options vary by county policies and scheduling. Many couples obtain the marriage license through the Clerk, then marry with an authorized officiant outside the building—confirm whether civil ceremonies are offered on-site with Miami-Dade.',
            },
            {
              q: 'How much does a marriage license cost for a courthouse wedding in Miami?',
              a: 'Fees are set by the county and can change; certified copies may add cost. Budget the license fee plus any clerk processing charges before your appointment.',
            },
            {
              q: 'Can our courthouse wedding day include bilingual vows after the clerk steps?',
              a: 'Yes. Couples often pair county paperwork with a bilingual ceremony led by a Florida-licensed officiant so signatures, pacing, and family participation stay aligned.',
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
