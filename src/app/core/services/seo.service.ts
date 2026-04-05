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
  ogUrl?: string;
  canonicalUrl?: string;
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
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    if (data.ogImage) {
      this.metaService.updateTag({ property: 'og:image', content: data.ogImage });
    }

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
      { hreflang: 'x-default', href: `${base}/en/` },
      { hreflang: 'en', href: `${base}/en/` },
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
      image: `${base}/favicon.ico`,
      url: `${base}/en/`,
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
      priceRange: '$650 - $1950',
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
