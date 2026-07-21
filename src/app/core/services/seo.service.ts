import { Injectable, Renderer2, RendererFactory2, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

export interface SeoData {
  title?: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageSecureUrl?: string;
  ogImageType?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogImageAlt?: string;
  ogUrl?: string;
  canonicalUrl?: string;
  /** Defaults to `website`; use `article` for blog posts. */
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterImageAlt?: string;
  /** When set, replaces default en/es home alternates (same URL triple as canonical per language). */
  hreflangAlternates?: { hreflang: string; href: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private renderer: Renderer2;
  private hreflangLinkEls: HTMLLinkElement[] = [];

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  updateSeoTags(data: SeoData): void {
    const pageTitle = data.title ?? data.ogTitle ?? 'Wedding Chapel';
    this.titleService.setTitle(pageTitle);

    this.metaService.updateTag({ name: 'description', content: data.description });
    this.metaService.updateTag({
      property: 'og:description',
      content: data.ogDescription || data.description,
    });

    const ogTitle = data.ogTitle ?? pageTitle;
    this.metaService.updateTag({ property: 'og:title', content: ogTitle });
    this.metaService.updateTag({ property: 'og:type', content: data.ogType ?? 'website' });
    if (data.ogImage) {
      this.metaService.updateTag({ property: 'og:image', content: data.ogImage });
    } else {
      this.metaService.removeTag('property="og:image"');
    }
    this.updateOptionalPropertyTag('og:image:secure_url', data.ogImageSecureUrl);
    this.updateOptionalPropertyTag('og:image:type', data.ogImageType);
    this.updateOptionalPropertyTag('og:image:width', data.ogImageWidth);
    this.updateOptionalPropertyTag('og:image:height', data.ogImageHeight);
    this.updateOptionalPropertyTag('og:image:alt', data.ogImageAlt);

    const ogUrl =
      data.ogUrl ??
      (isPlatformBrowser(this.platformId)
        ? this.document.URL.split('?')[0]
        : undefined);
    if (ogUrl) {
      this.metaService.updateTag({ property: 'og:url', content: ogUrl });
    }

    this.setCanonicalUrl(data.canonicalUrl);
    this.setHreflangAlternates(data.hreflangAlternates);

    const twCard = data.twitterCard ?? 'summary_large_image';
    this.metaService.updateTag({ name: 'twitter:card', content: twCard });
    this.metaService.updateTag({
      name: 'twitter:title',
      content: data.twitterTitle ?? ogTitle,
    });
    this.metaService.updateTag({
      name: 'twitter:description',
      content: data.twitterDescription ?? data.ogDescription ?? data.description,
    });
    const twImage = data.twitterImage ?? data.ogImage;
    if (twImage) {
      this.metaService.updateTag({ name: 'twitter:image', content: twImage });
    } else {
      this.metaService.removeTag('name="twitter:image"');
    }
    this.updateOptionalNameTag('twitter:image:alt', data.twitterImageAlt ?? data.ogImageAlt);
  }

  private updateOptionalPropertyTag(
    property: string,
    content: string | number | undefined
  ): void {
    if (content !== undefined) {
      this.metaService.updateTag({ property, content: String(content) });
    } else {
      this.metaService.removeTag(`property="${property}"`);
    }
  }

  private updateOptionalNameTag(name: string, content: string | undefined): void {
    if (content !== undefined) {
      this.metaService.updateTag({ name, content });
    } else {
      this.metaService.removeTag(`name="${name}"`);
    }
  }

  private setCanonicalUrl(url?: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'canonical');
      this.renderer.appendChild(this.document.head, link);
    }
    if (url) {
      this.renderer.setAttribute(link, 'href', url);
    } else if (isPlatformBrowser(this.platformId)) {
      this.renderer.setAttribute(link, 'href', this.document.URL.split('?')[0]);
    }
  }

  /** Per-page alternates or default en/es home (x-default → English). */
  private setHreflangAlternates(overrides?: { hreflang: string; href: string }[]): void {
    const base = environment.siteUrl.replace(/\/$/, '');
    const alternates = overrides ?? [
      { hreflang: 'x-default', href: `${base}/` },
      { hreflang: 'en', href: `${base}/` },
      { hreflang: 'es', href: `${base}/es/` },
    ];

    for (const el of this.hreflangLinkEls) {
      if (el.parentNode) {
        this.renderer.removeChild(el.parentNode, el);
      }
    }
    this.hreflangLinkEls = [];

    for (const alt of alternates) {
      const link = this.renderer.createElement('link') as HTMLLinkElement;
      this.renderer.setAttribute(link, 'rel', 'alternate');
      this.renderer.setAttribute(link, 'hreflang', alt.hreflang);
      this.renderer.setAttribute(link, 'href', alt.href);
      this.renderer.appendChild(this.document.head, link);
      this.hreflangLinkEls.push(link);
    }
  }

  addJsonLd(schema: object, id: string = 'json-ld-schema'): void {
    let script = this.document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      const el = this.renderer.createElement('script') as HTMLScriptElement;
      this.renderer.setAttribute(el, 'type', 'application/ld+json');
      this.renderer.setAttribute(el, 'id', id);
      this.renderer.appendChild(this.document.head, el);
      script = el;
    }
    script.textContent = JSON.stringify(schema);
  }

  removeJsonLd(id: string = 'json-ld-schema'): void {
    const script = this.document.getElementById(id);
    if (script?.parentNode) {
      this.renderer.removeChild(script.parentNode, script);
    }
  }

  addLocalBusinessSchema(): void {
    const base = environment.siteUrl.replace(/\/$/, '');
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Miami Wedding Officiant',
      image: [`${base}/brand/og-share.webp`, `${base}/brand/apple-touch-icon.png`],
      url: `${base}/`,
      telephone: '+13058703010',
      email: 'vuelvealser@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '7218 West 4th Ave',
        addressLocality: 'Hialeah',
        addressRegion: 'FL',
        postalCode: '33014',
        addressCountry: 'US',
      },
      priceRange: '$290 - $690',
      hasMap: 'https://www.google.com/maps/place/7218+W+4th+Ave,+Hialeah,+FL',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '09:00',
          closes: '20:00',
        },
      ],
      sameAs: ['https://www.instagram.com/miami_weddingofficiant/'],
    };
    this.addJsonLd(schema, 'local-business-schema');
  }
}
