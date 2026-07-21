import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let document: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
    document = TestBed.inject(DOCUMENT);
  });

  afterEach(() => {
    document.head
      .querySelectorAll('meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"]')
      .forEach((element) => element.remove());
  });

  it('renders complete landing-page social metadata', () => {
    const image = 'https://example.com/assets/images/hero-social-preview.webp';

    service.updateSeoTags({
      title: 'Landing title',
      description: 'Landing description',
      ogTitle: 'Social title',
      ogDescription: 'Social description',
      ogType: 'website',
      ogUrl: 'https://example.com/',
      ogImage: image,
      ogImageSecureUrl: image,
      ogImageType: 'image/webp',
      ogImageWidth: 1200,
      ogImageHeight: 600,
      ogImageAlt: 'Wedding ceremony in Miami',
      canonicalUrl: 'https://example.com/',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Social title',
      twitterDescription: 'Social description',
      twitterImage: image,
      twitterImageAlt: 'Wedding ceremony in Miami',
    });

    expect(metaProperty('og:type')).toBe('website');
    expect(metaProperty('og:title')).toBe('Social title');
    expect(metaProperty('og:description')).toBe('Social description');
    expect(metaProperty('og:url')).toBe('https://example.com/');
    expect(metaProperty('og:image')).toBe(image);
    expect(metaProperty('og:image:secure_url')).toBe(image);
    expect(metaProperty('og:image:type')).toBe('image/webp');
    expect(metaProperty('og:image:width')).toBe('1200');
    expect(metaProperty('og:image:height')).toBe('600');
    expect(metaProperty('og:image:alt')).toBe('Wedding ceremony in Miami');
    expect(metaName('twitter:card')).toBe('summary_large_image');
    expect(metaName('twitter:title')).toBe('Social title');
    expect(metaName('twitter:description')).toBe('Social description');
    expect(metaName('twitter:image')).toBe(image);
    expect(metaName('twitter:image:alt')).toBe('Wedding ceremony in Miami');
    expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe(
      'https://example.com/'
    );
  });

  it('removes optional image metadata when the next route omits it', () => {
    service.updateSeoTags({
      description: 'Landing description',
      ogImageSecureUrl: 'https://example.com/image.webp',
      ogImageType: 'image/webp',
      ogImageWidth: 1200,
      ogImageHeight: 600,
      ogImageAlt: 'Landing image',
      twitterImageAlt: 'Landing image',
    });

    service.updateSeoTags({ description: 'Another page' });

    expect(metaProperty('og:image:secure_url')).toBeNull();
    expect(metaProperty('og:image:type')).toBeNull();
    expect(metaProperty('og:image:width')).toBeNull();
    expect(metaProperty('og:image:height')).toBeNull();
    expect(metaProperty('og:image:alt')).toBeNull();
    expect(metaName('twitter:image:alt')).toBeNull();
  });

  function metaProperty(property: string): string | null {
    return document
      .querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
      ?.getAttribute('content') ?? null;
  }

  function metaName(name: string): string | null {
    return document
      .querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
      ?.getAttribute('content') ?? null;
  }
});
