import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'en' },
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
