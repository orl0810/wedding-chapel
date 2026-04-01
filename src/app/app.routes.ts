import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
 | Bilingual Ceremonies in Miami, FL',
    data: {
      description:
        'Licensed bilingual wedding officiant in Miami, FL. Serving Miami-Dade, Broward & Palm Beach. Personalized English & Spanish ceremonies. Book online.',
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
