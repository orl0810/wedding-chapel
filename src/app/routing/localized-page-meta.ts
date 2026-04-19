import { environment } from '../../environments/environment';

export type PageKey = 'home' | 'services' | 'elopement' | 'contact' | 'blog';
export type SiteLang = 'en' | 'es';

/** Localized URL segment per page (empty string = locale home). */
export const PAGE_SEGMENTS: Record<PageKey, Record<SiteLang, string>> = {
  home: { en: '', es: '' },
  services: { en: 'services', es: 'servicios' },
  elopement: { en: 'elopement-miami', es: 'elopement-miami' },
  contact: { en: 'contact', es: 'contacto' },
  blog: { en: 'blog', es: 'blog' },
};

const siteBase = environment.siteUrl.replace(/\/$/, '');
const heroOgImage = `${siteBase}/assets/images/miami-wedding-officiant-marriage-certificate-south-florida-best-venues-florida-luxury.jpg`;

export function absolutePageUrl(lang: SiteLang, pageKey: PageKey): string {
  const seg = PAGE_SEGMENTS[pageKey][lang];
  const path = seg ? `/${lang}/${seg}/` : `/${lang}/`;
  return `${siteBase}${path}`;
}

export function hreflangTriple(pageKey: PageKey): { hreflang: string; href: string }[] {
  return [
    { hreflang: 'x-default', href: absolutePageUrl('en', pageKey) },
    { hreflang: 'en', href: absolutePageUrl('en', pageKey) },
    { hreflang: 'es', href: absolutePageUrl('es', pageKey) },
  ];
}

type PageCopy = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  includeLocalBusinessSchema?: boolean;
  initialSectionId?: string;
};

const PAGE_COPY: Record<PageKey, Record<SiteLang, PageCopy>> = {
  home: {
    en: {
      title: 'Wedding Officiant Miami | Bilingual Ceremonies & Elopements',
      description:
        'Bilingual wedding officiant in Miami, FL. Beach elopements, courthouse & backyard ceremonies. Serving Miami-Dade & Broward. Book today!',
      ogTitle: 'Wedding Officiant Miami | Bilingual Ceremonies & Elopements',
      ogDescription:
        'Bilingual wedding officiant in Miami. Beach elopements, courthouse and backyard ceremonies. Serving Miami-Dade & Broward.',
      ogImage: heroOgImage,
      includeLocalBusinessSchema: true,
    },
    es: {
      title: 'Oficiante de Bodas en Miami | Ceremonias Bilingües y Elopements',
      description:
        'Oficiante de bodas licenciado en Miami. Bodas en la playa, juzgado y jardín. Bilingüe EN/ES. Sirviendo Miami-Dade y Broward. ¡Reserva hoy!',
      ogTitle: 'Oficiante de Bodas en Miami | Ceremonias Bilingües y Elopements',
      ogDescription:
        'Oficiante de bodas licenciado en Miami. Ceremonias en la playa, juzgado y jardín. Bilingüe inglés/español. Miami-Dade y Broward.',
      ogImage: heroOgImage,
      includeLocalBusinessSchema: true,
    },
  },
  services: {
    en: {
      title: 'Miami Wedding Officiant Services | Beach, Courthouse & Venue Ceremonies',
      description:
        'Wedding officiant services in Miami: beach elopements, courthouse signings, backyard and hotel ceremonies. Bilingual English/Spanish. Packages from $650.',
      ogTitle: 'Miami Wedding Officiant Services | Beach, Courthouse & Venues',
      ogDescription:
        'Personalized officiant services across Miami-Dade and Broward—beach, legal, home, and venue ceremonies with bilingual scripting.',
      ogImage: heroOgImage,
      includeLocalBusinessSchema: false,
      initialSectionId: 'packages',
    },
    es: {
      title: 'Servicios de Oficiante de Bodas en Miami | Playa, Juzgado y Hoteles',
      description:
        'Servicios de ceremonias en Miami: bodas en la playa, firma en juzgado, casa y hoteles. Oficiante bilingüe. Paquetes desde $650.',
      ogTitle: 'Servicios de Oficiante de Bodas en Miami',
      ogDescription:
        'Ceremonias personalizadas en Miami-Dade y Broward: playa, legal, hogar y venue, con guión bilingüe.',
      ogImage: heroOgImage,
      includeLocalBusinessSchema: false,
      initialSectionId: 'packages',
    },
  },
  elopement: {
    en: {
      title: 'Elopement Miami | Beach & Intimate Wedding Officiant',
      description:
        'Plan a Miami elopement with a officiant: sunrise or sunset beach ceremonies, micro-weddings, and simple legal signings. Bilingual support.',
      ogTitle: 'Elopement Miami | Beach Wedding Officiant',
      ogDescription:
        'Intimate Miami elopements on the sand or at your chosen spot—calm planning, bilingual ceremony, license guidance.',
      ogImage: heroOgImage,
      includeLocalBusinessSchema: false,
      initialSectionId: 'packages',
    },
    es: {
      title: 'Elopement en Miami | Oficiante para Bodas Íntimas en la Playa',
      description:
        'Elopement en Miami con oficiante licenciado: ceremonias en la playa al amanecer o atardecer, micro-bodas y firmas legales. Apoyo bilingüe.',
      ogTitle: 'Elopement Miami | Ceremonias en la Playa',
      ogDescription:
        'Elopements íntimos en Miami—planificación clara, ceremonia bilingüe y orientación sobre la licencia matrimonial.',
      ogImage: heroOgImage,
      includeLocalBusinessSchema: false,
      initialSectionId: 'packages',
    },
  },
  contact: {
    en: {
      title: 'Contact Miami Wedding Officiant | Book Your Ceremony',
      description:
        'Contact a Miami wedding officiant for availability, pricing, and bilingual ceremony planning. Call (305) 870-3010 or send a message.',
      ogTitle: 'Contact | Miami Wedding Officiant',
      ogDescription: 'Reach out to book your Miami ceremony date and discuss beach, venue, or courthouse options.',
      ogImage: heroOgImage,
      includeLocalBusinessSchema: false,
      initialSectionId: 'footer',
    },
    es: {
      title: 'Contacto — Oficiante de Bodas en Miami | Reserva tu Ceremonia',
      description:
        'Contacta al oficiante de bodas en Miami para disponibilidad, precios y planificación bilingüe. Tel. (305) 870-3010 o mensaje.',
      ogTitle: 'Contacto | Oficiante de Bodas Miami',
      ogDescription: 'Escríbenos para reservar tu fecha y hablar de ceremonia en la playa, venue o juzgado.',
      ogImage: heroOgImage,
      includeLocalBusinessSchema: false,
      initialSectionId: 'footer',
    },
  },
  blog: {
    en: {
      title: 'Miami Wedding Officiant Blog | Elopements & Ceremony Tips',
      description:
        'Articles on Miami beach elopements, Florida marriage licenses, bilingual ceremonies, and planning tips from a local wedding officiant.',
      ogTitle: 'Blog | Miami Wedding Officiant',
      ogDescription: 'Guides and ideas for couples marrying in Miami and South Florida.',
      ogImage: heroOgImage,
      includeLocalBusinessSchema: false,
    },
    es: {
      title: 'Blog del Oficiante de Bodas en Miami | Elopements y Consejos',
      description:
        'Artículos sobre elopements en Miami, licencias matrimoniales en Florida, ceremonias bilingües y planificación con un oficiante local.',
      ogTitle: 'Blog | Oficiante de Bodas Miami',
      ogDescription: 'Guías e ideas para parejas que se casan en Miami y el sur de Florida.',
      ogImage: heroOgImage,
      includeLocalBusinessSchema: false,
    },
  },
};

/** Route `data` consumed by AppComponent and SeoService. */
export function buildSeoRouteData(pageKey: PageKey, lang: SiteLang): Record<string, unknown> {
  const copy = PAGE_COPY[pageKey][lang];
  const canonicalUrl = absolutePageUrl(lang, pageKey);
  return {
    pageKey,
    lang,
    title: copy.title,
    description: copy.description,
    ogTitle: copy.ogTitle,
    ogDescription: copy.ogDescription,
    ogImage: copy.ogImage,
    canonicalUrl,
    ogUrl: canonicalUrl,
    hreflangAlternates: hreflangTriple(pageKey),
    includeLocalBusinessSchema: copy.includeLocalBusinessSchema === true,
    initialSectionId: copy.initialSectionId,
  };
}
