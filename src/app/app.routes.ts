import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'es',
    loadChildren: () => import('./pages/es/es.routes').then((m) => m.ES_ROUTES),
  },
  // Preserve old English links while keeping unprefixed URLs canonical.
  { path: 'en', pathMatch: 'full', redirectTo: '/' },
  { path: 'en/services', pathMatch: 'full', redirectTo: '/services' },
  { path: 'en/elopement-miami', pathMatch: 'full', redirectTo: '/elopement-miami' },
  { path: 'en/contact', pathMatch: 'full', redirectTo: '/contact' },
  { path: 'en/blog', pathMatch: 'full', redirectTo: '/blog' },
  { path: 'en/blog/:slug', pathMatch: 'full', redirectTo: '/blog/:slug' },
  {
    path: '',
    loadChildren: () => import('./pages/en/en.routes').then((m) => m.EN_ROUTES),
  },
  { path: '**', redirectTo: '/' },
];
