import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    data: {
      description: 'Celebrate your love with a personalized, bilingual wedding ceremony in Miami & South Florida. Experienced officiant for luxury weddings, beach elopements, and vow renewals.',
      ogTitle: 'Miami Wedding Officiant — Unique, Bilingual & Beautiful Ceremonies',
      ogDescription: 'Bilingual wedding officiant in Miami & South Florida. Personalized English and Spanish ceremonies, elopements, and vow renewals.',
      ogImage: 'https://jcamilomb.wixsite.com/weddingofficiant/assets/images/miami-wedding-officiant-marriage-certificate-south-florida-best-venues-florida-luxury.jpg', // Placeholder
      canonicalUrl: 'https://yourdomain.com/'
    }
  },
  // Add other routes here if the application expands (e.g., /privacy, /blog)
  // { path: '**', redirectTo: '' } // Catch-all for 404, redirect to home
];
