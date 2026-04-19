import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'en' },
  /**
   * Without language prefix, `/blog` used to hit `**` → redirect to `/en` (home).
   * Send bare `/blog` URLs to the English blog index (matches x-default hreflang pattern).
   */
  { path: 'blog', pathMatch: 'full', redirectTo: '/en/blog' },
  {
    path: 'blog/:slug',
    pathMatch: 'full',
    redirectTo: '/en/blog/:slug',
  },
  {
    path: 'en',
    loadChildren: () => import('./pages/en/en.routes').then((m) => m.EN_ROUTES),
  },
  {
    path: 'es',
    loadChildren: () => import('./pages/es/es.routes').then((m) => m.ES_ROUTES),
  },
  { path: '**', redirectTo: 'en' },
];
