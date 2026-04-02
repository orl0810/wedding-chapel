import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    data: {
      description: 'Celebrate your love with a personalized, bilingual wedding ceremony in Miami & South Florida. Experienced officiant for luxury weddings, beach elopements, and vow renewals.',
      ogTitle: 'Miami Wedding Officiant - Your Dream Ceremony',
      ogDescription: 'Crafting heartfelt English and Spanish ceremonies for unforgettable moments in Miami, Broward, and Palm Beach Counties.',
      ogImage: 'https://jcamilomb.wixsite.com/weddingofficiant/assets/images/hero-bg.jpg', // Placeholder
      canonicalUrl: 'https://yourdomain.com/'
    }
  },
  // Add other routes here if the application expands (e.g., /privacy, /blog)
  // { path: '**', redirectTo: '' } // Catch-all for 404, redirect to home
];
