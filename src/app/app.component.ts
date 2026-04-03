import { Component, OnInit, inject, signal, effect, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SeoService } from './core/services/seo.service';
import { I18nService, Language } from './core/services/i18n.service';
import { filter, map } from 'rxjs/operators';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { TranslatePipe } from './shared/pipes/translate/translate.pipe';
import { LanguageSwitcherComponent } from './shared/components/language-switcher/language-switcher.component';
import { WhatsAppButtonComponent } from './shared/components/whatsapp-button/whatsapp-button.component';
import { ScrollService } from './core/services/scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    TranslatePipe,
    LanguageSwitcherComponent,
    WhatsAppButtonComponent
  ],
  template: `
    @if (i18nService.isInitialized()) {
      <header class="fixed w-full z-50 bg-primary-cream/95 backdrop-blur-md border-b border-black/[0.06] py-3 md:py-4 shadow-wix-soft">
        <nav class="container mx-auto flex justify-between items-center px-4 max-w-7xl">
          <a routerLink="/" class="text-accent-sapphire text-xl md:text-2xl font-display font-semibold hover:text-secondary-gold transition-colors duration-300 tracking-tight">
            Miami Wedding Officiant
          </a>
          <div class="flex items-center gap-4 md:gap-6">
            <ul class="hidden lg:flex flex-wrap justify-end gap-x-5 gap-y-2 font-body text-sm md:text-[15px] text-text-dark uppercase tracking-[0.12em]">
              <li><a (click)="scrollToSection('hero')" class="hover:text-secondary-gold transition-colors cursor-pointer">{{ 'NAV_HOME' | translate }}</a></li>
              <li><a (click)="scrollToSection('process')" class="hover:text-secondary-gold transition-colors cursor-pointer">{{ 'NAV_PROCESS' | translate }}</a></li>
              <li><a (click)="scrollToSection('packages')" class="hover:text-secondary-gold transition-colors cursor-pointer">{{ 'NAV_SERVICES' | translate }}</a></li>
              <li><a (click)="scrollToSection('testimonials')" class="hover:text-secondary-gold transition-colors cursor-pointer">{{ 'NAV_TESTIMONIALS' | translate }}</a></li>
              <li><a (click)="scrollToSection('why-us')" class="hover:text-secondary-gold transition-colors cursor-pointer">{{ 'NAV_WHY' | translate }}</a></li>
              <li><a (click)="scrollToSection('contact')" class="hover:text-secondary-gold transition-colors cursor-pointer">{{ 'NAV_CONTACT' | translate }}</a></li>
            </ul>
            <app-language-switcher [currentLang]="i18nService.currentLang()" (langChange)="onLangChange($event)"></app-language-switcher>
          </div>
          <!-- Mobile menu button (Hamburger icon) -->
          <button class="md:hidden text-accent-sapphire text-2xl">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </nav>
      </header>

      <main class="pt-20"> <!-- Padding to account for fixed header -->
        <router-outlet></router-outlet>
      </main>

      <app-whatsapp-button></app-whatsapp-button>
    } @else {
      <div class="flex items-center justify-center min-h-screen text-accent-sapphire text-xl font-display">
        Loading...
      </div>
    }
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private seoService = inject(SeoService);
  public i18nService = inject(I18nService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private scrollService = inject(ScrollService);
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      // Update language for SEO when it changes
      const lang = this.i18nService.currentLang();
      // Potentially update HTML lang attribute here if needed, or rely on SSR
      if (isPlatformBrowser(this.platformId)) {
        this.document.documentElement.lang = lang;
      }
    });
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child && child.firstChild) {
          child = child.firstChild;
        }
        return child?.snapshot.data;
      })
    ).subscribe((data: any) => {
      if (data) {
        this.seoService.updateSeoTags({
          description: data['description'],
          ogTitle: data['ogTitle'],
          ogDescription: data['ogDescription'],
          ogImage: data['ogImage'],
          canonicalUrl: data['canonicalUrl']
        });
        this.seoService.addLocalBusinessSchema();
      }
    });
  }

  onLangChange(lang: Language): void {
    this.i18nService.setLanguage(lang);
  }

  scrollToSection(id: string): void {
    this.scrollService.scrollToElementById(id);
  }
}
