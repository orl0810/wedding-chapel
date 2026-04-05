import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outPath = path.join(root, 'dist', 'wedding-chapel', 'browser', 'sitemap.xml');

const site = (process.env.SITE_URL || 'https://miamiweddingsofficiant.com').replace(/\/$/, '');

/** Keep in sync with src/app/routing/localized-page-meta.ts PAGE_SEGMENTS */
const PAGE_SEGMENTS = {
  home: { en: '', es: '' },
  services: { en: 'services', es: 'servicios' },
  elopement: { en: 'elopement-miami', es: 'elopement-miami' },
  contact: { en: 'contact', es: 'contacto' },
  blog: { en: 'blog', es: 'blog' },
};

const PAGE_ORDER = ['home', 'services', 'elopement', 'contact', 'blog'];

function pagePath(lang, pageKey) {
  const seg = PAGE_SEGMENTS[pageKey][lang];
  return seg ? `/${lang}/${seg}/` : `/${lang}/`;
}

function absUrl(lang, pageKey) {
  return `${site}${pagePath(lang, pageKey)}`;
}

function hreflangBlock(pageKey) {
  const en = absUrl('en', pageKey);
  const es = absUrl('es', pageKey);
  return [
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(en)}" />`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(en)}" />`,
    `    <xhtml:link rel="alternate" hreflang="es" href="${escapeXml(es)}" />`,
  ].join('\n');
}

const today = new Date().toISOString().slice(0, 10);

const urlEntries = [];
for (const pageKey of PAGE_ORDER) {
  for (const lang of ['en', 'es']) {
    const loc = absUrl(lang, pageKey);
    urlEntries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
${hreflangBlock(pageKey)}
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${pageKey === 'home' ? '1.0' : '0.8'}</priority>
  </url>`);
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>
`;

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, xml, 'utf8');
console.log(`Wrote ${urlEntries.length} URLs to ${outPath}`);
