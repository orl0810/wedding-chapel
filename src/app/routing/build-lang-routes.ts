import { Routes } from '@angular/router';
import {
  type PageKey,
  type SiteLang,
  PAGE_SEGMENTS,
  buildSeoRouteData,
} from './localized-page-meta';

const PAGE_ORDER: PageKey[] = ['home', 'services', 'elopement', 'contact', 'blog'];

export function buildLangRoutes(lang: SiteLang): Routes {
  return PAGE_ORDER.map((pageKey) => {
    const path = PAGE_SEGMENTS[pageKey][lang];
    return {
      path: path === '' ? '' : path,
      loadComponent: () =>
        import('../features/landing/landing.component').then((m) => m.LandingComponent),
      data: buildSeoRouteData(pageKey, lang),
    };
  });
}
