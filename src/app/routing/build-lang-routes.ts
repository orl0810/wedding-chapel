import { Routes } from '@angular/router';
import {
  type PageKey,
  type SiteLang,
  PAGE_SEGMENTS,
  buildSeoRouteData,
} from './localized-page-meta';
import { buildBlogArticleRouteData } from '../features/blog/blog-article-meta';

const PAGE_ORDER: PageKey[] = ['home', 'services', 'elopement', 'contact', 'blog'];

function loadPageComponent(pageKey: PageKey) {
  return () =>
    import('../features/landing/landing.component').then((m) => m.LandingComponent);
}

export function buildLangRoutes(lang: SiteLang): Routes {
  return PAGE_ORDER.map((pageKey) => {
    const path = PAGE_SEGMENTS[pageKey][lang];
    if (pageKey === 'blog') {
      return {
        path: path === '' ? '' : path,
        loadComponent: () =>
          import('../features/blog/blog-shell.component').then((m) => m.BlogShellComponent),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../features/blog/blog-page.component').then((m) => m.BlogPageComponent),
            data: buildSeoRouteData('blog', lang),
          },
          {
            path: 'how-to-elope-in-miami',
            loadComponent: () =>
              import(
                '../features/blog/pages/how-to-elope-miami/how-to-elope-miami-page.component'
              ).then((m) => m.HowToElopeMiamiPageComponent),
            data: buildBlogArticleRouteData('how-to-elope-in-miami', lang),
          },
          {
            path: 'courthouse-wedding-miami',
            loadComponent: () =>
              import(
                '../features/blog/pages/courthouse-wedding-miami/courthouse-wedding-miami-page.component'
              ).then((m) => m.CourthouseWeddingMiamiPageComponent),
            data: buildBlogArticleRouteData('courthouse-wedding-miami', lang),
          },
        ],
      };
    }
    return {
      path: path === '' ? '' : path,
      loadComponent: loadPageComponent(pageKey),
      data: buildSeoRouteData(pageKey, lang),
    };
  });
}
