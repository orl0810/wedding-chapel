import { Injectable, Renderer2, RendererFactory2, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

interface SeoData {
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private renderer: Renderer2;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  updateSeoTags(data: SeoData): void {
    // Set Title
    this.titleService.setTitle(data.title);

    // Update Meta Description
    this.metaService.updateTag({ name: 'description', content: data.description });
    this.metaService.updateTag({ property: 'og:description', content: data.ogDescription || data.description });

    // Update Open Graph Tags
    this.metaService.updateTag({ property: 'og:title', content: data.ogTitle || data.title });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    if (data.ogImage) {
      this.metaService.updateTag({ property: 'og:image', content: data.ogImage });
    }
    if (data.ogUrl) {
      this.metaService.updateTag({ property: 'og:url', content: data.ogUrl });
    } else if (isPlatformBrowser(this.platformId)) {
      this.metaService.updateTag({ property: 'og:url', content: this.document.URL });
    }

    // Add Canonical URL
    this.setCanonicalUrl(data.canonicalUrl);
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
      this.renderer.setAttribute(link, 'href', this.document.URL.split('?')[0]); // Clean URL
    }
  }

  // Inject JSON-LD Structured Data
  addJsonLd(schema: object, id: string = 'json-ld-schema'): void {
    if (isPlatformBrowser(this.platformId)) {
      let script = this.document.getElementById(id) as HTMLScriptElement;
      if (!script) {
        script = this.renderer.createElement('script');
        this.renderer.setAttribute(script, 'type', 'application/ld+json');
        this.renderer.setAttribute(script, 'id', id);
        this.renderer.appendChild(this.document.head, script);
      }
      script.textContent = JSON.stringify(schema);
    }
  }

  removeJsonLd(id: string = 'json-ld-schema'): void {
    if (isPlatformBrowser(this.platformId)) {
      const script = this.document.getElementById(id);
      if (script) {
        this.renderer.removeChild(this.document.head, script);
      }
    }
  }

  // Example for LocalBusiness Schema
  addLocalBusinessSchema(): void {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Miami Wedding Officiant",
      "image": "https://yourdomain.com/assets/images/officiant-logo.png", // Replace with actual logo/image
      "url": "https://yourdomain.com/",
      "telephone": "+13058703010",
      "email": "mailto:vuelvealser@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "7218 West 4th Ave",
        "addressLocality": "Hialeah",
        "addressRegion": "FL",
        "postalCode": "33014", // Assuming a postal code for Hialeah
        "addressCountry": "US"
      },
      "priceRange": "$650 - $1950",
      "hasMap": "https://www.google.com/maps/place/7218+W+4th+Ave,+Hialeah,+FL", // Replace with actual map link
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "09:00",
          "closes": "20:00"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/weddingofficiant_miami/"
      ]
    };
    this.addJsonLd(schema, 'local-business-schema');
  }
}
