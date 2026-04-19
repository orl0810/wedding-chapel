import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { TranslatePipe } from '../../shared/pipes/translate/translate.pipe';
import { I18nService } from '../../core/services/i18n.service';
import type { SiteLang } from '../../routing/localized-page-meta';

/** Single-language strings per post for the blog index (/en/blog, /es/blog). */
type BlogIndexCard = {
  slug: string;
  title: Record<SiteLang, string>;
  description: Record<SiteLang, string>;
  /** i18n key for CTA link label */
  readMoreKey: string;
};

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './blog-page.component.html',
})
export class BlogPageComponent {
  readonly i18n = inject(I18nService);

  readonly blogPosts: BlogIndexCard[] = [
    {
      slug: 'courthouse-wedding-miami',
      readMoreKey: 'BLOG_READ_ARTICLE',
      title: {
        en: 'Getting Married at Miami Courthouse: Step-by-Step',
        es: 'Casarse por lo civil en Miami en el juzgado (paso a paso)',
      },
      description: {
        en:
          'Miami-Dade Clerk checklist, Florida license basics, budgeting, timelines, FAQs, and bilingual ceremony guidance—Spanish version included on the article page.',
        es:
          'Guía práctica: licencia en Florida, trámites en Miami-Dade, costos, cronograma y preguntas frecuentes—versión bilingüe dentro del artículo.',
      },
    },
    {
      slug: 'how-to-elope-in-miami',
      readMoreKey: 'BLOG_READ_ARTICLE',
      title: {
        en: 'How to Elope in Miami: Complete 2025 Guide',
        es: 'Cómo casarse en Miami en una ceremonia íntima (Guía 2025)',
      },
      description: {
        en:
          'Hero layout, cost table, timeline, FAQs, and photography CTAs—plus a fully localized Spanish guide with on-page language switching.',
        es:
          'Diseño editorial, tabla de costos, línea de tiempo, FAQs y CTAs para fotografía—con guía en español en la misma página.',
      },
    },
  ];
}
