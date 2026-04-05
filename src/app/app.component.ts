import { Component, OnInit, inject, effect } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SeoService } from './core/services/seo.service';
import { I18nService } from './core/services/i18n.service';
import { filter } from 'rxjs/operators';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TranslatePipe } from './shared/pipes/translate/translate.pipe';
import { LanguageSwitcherComponent } from './shared/components/language-switcher/language-switcher.component';
import { WhatsAppButtonComponent } from './shared/components/whatsapp-button/whatsapp-button.component';
import { ScrollService } from './core/services/scroll.service';
import { LanguageUrlService } from './core/services/language-url.service';
import type { PageKey, SiteLang } from './routing/localized-page-meta';

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
          <a [routerLink]="navPage('home')" class="text-accent-sapphire text-xl md:text-2xl font-display font-semibold hover:text-secondary-gold transition-colors duration-300 tracking-tight">
            Miami Wedding Officiant
          </a>
          <div class="flex items-center gap-4 md:gap-6">
            <ul class="hidden lg:flex flex-wrap justify-end gap-x-5 gap-y-2 font-body text-sm md:text-[15px] text-text-dark uppercase tracking-[0.12em]">
              <li><a [routerLink]="navPage('home')" class="hover:text-secondary-gold transition-colors cursor-pointer">{{ 'NAV_HOME' | translate }}</a></li>
              <li><a [routerLink]="navPage('services')" class="hover:text-secondary-gold transition-colors cursor-pointer">{{ 'NAV_SERVICES' | translate }}</a></li>
              <li><a (click)="scrollToSection('process')" class="hover:text-secondary-gold transition-colors cursor-pointer">{{ 'NAV_PROCESS' | translate }}</a></li>
              <li><a (click)="scrollToSection('about')" class="hover:text-secondary-gold transition-colors cursor-pointer">{{ 'NAV_ABOUT' | translate }}</a></li>
              <li><a (click)="scrollToSection('areas')" class="hover:text-secondary-gold transition-colors cursor-pointer">{{ 'NAV_AREAS' | translate }}</a></li>
              <li><a (click)="scrollToSection('testimonials')" class="hover:text-secondary-gold transition-colors cursor-pointer">{{ 'NAV_TESTIMONIALS' | translate }}</a></li>
              <li><a (click)="scrollToSection('faq')" class="hover:text-secondary-gold transition-colors cursor-pointer">{{ 'NAV_FAQ' | translate }}</a></li>
              <li><a [routerLink]="navPage('contact')" class="hover:text-secondary-gold transition-colors cursor-pointer">{{ 'NAV_CONTACT' | translate }}</a></li>
              <li><a [routerLink]="navPage('blog')" class="hover:text-secondary-gold transition-colors cursor-pointer">{{ 'NAV_BLOG' | translate }}</a></li>
            </ul>
            <app-language-switcher [currentLang]="i18nService.currentLang()"></app-language-switcher>
          </div>
          <!-- Mobile menu button (Hamburger icon) -->
          <!-- <button class="md:hidden text-accent-sapphire text-2xl">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button> -->
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
  private languageUrl = inject(LanguageUrlService);
  private document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      this.document.documentElement.lang = this.i18nService.currentLang();
    });
  }

  ngOnInit(): void {
    const applyRouteSeo = (): void => {
      let route = this.activatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }
      const data = route.snapshot.data as Record<string, unknown>;
      if (!data || !Object.keys(data).length) {
        return;
      }
      this.seoService.updateSeoTags({
        title: data['title'] as string | undefined,
        description: data['description'] as string,
        ogTitle: data['ogTitle'] as string | undefined,
        ogDescription: data['ogDescription'] as string | undefined,
        ogImage: data['ogImage'] as string | undefined,
        ogUrl: data['ogUrl'] as string | undefined,
        canonicalUrl: data['canonicalUrl'] as string | undefined,
        hreflangAlternates: data['hreflangAlternates'] as
          | { hreflang: string; href: string }[]
          | undefined,
      });
      if (data['includeLocalBusinessSchema']) {
        this.seoService.addLocalBusinessSchema();
      } else {
        this.seoService.removeJsonLd('local-business-schema');
      }
    };

    applyRouteSeo();
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => applyRouteSeo());
  }

  navPage(pageKey: PageKey): (string | SiteLang)[] {
    return this.languageUrl.navCommands(this.i18nService.currentLang(), pageKey);
  }

  scrollToSection(id: string): void {
    const lang = this.i18nService.currentLang();
    const path = this.router.url.split('?')[0];
    const pageKey = this.languageUrl.pageKeyFromPath(path) ?? 'home';
    if (pageKey === 'home') {
      this.scrollService.scrollToElementByIdWhenReady(id);
    } else {
      void this.router.navigate(['/', lang], { fragment: id });
    }
  }
}
