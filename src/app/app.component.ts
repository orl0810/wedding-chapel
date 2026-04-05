import { Component, OnInit, inject, effect, signal, HostListener } from '@angular/core';
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
      <header class="fixed w-full z-50 overflow-visible bg-primary-cream/95 backdrop-blur-md border-b border-black/[0.06] py-3 md:py-4 shadow-wix-soft">
        <nav class="container relative z-50 mx-auto flex justify-between items-center px-4 max-w-7xl">
          <a [routerLink]="navPage('home')" (click)="closeMobileNav()" class="text-accent-sapphire text-xl md:text-2xl font-display font-semibold hover:text-secondary-gold transition-colors duration-300 tracking-tight">
            Miami Wedding Officiant
          </a>
          <div class="flex items-center gap-3 md:gap-6">
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
            <button
              type="button"
              class="lg:hidden relative z-50 p-1 -mr-1 text-accent-sapphire rounded-md hover:bg-black/[0.04] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-gold/60"
              (click)="toggleMobileNav()"
              [attr.aria-expanded]="mobileNavOpen()"
              aria-controls="mobile-nav-panel"
              [attr.aria-label]="mobileNavOpen() ? 'Close menu' : 'Open menu'"
            >
              @if (mobileNavOpen()) {
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              } @else {
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              }
            </button>
          </div>
        </nav>
      </header>

      @if (mobileNavOpen()) {
        <div class="lg:hidden fixed inset-x-0 top-20 bottom-0 z-[60]">
          <button
            type="button"
            tabindex="-1"
            class="absolute inset-0 z-0 bg-black/40"
            (click)="closeMobileNav()"
            aria-label="Close menu"
          ></button>
          <div
            id="mobile-nav-panel"
            class="relative z-10 max-h-full overflow-y-auto border-b border-white/10 bg-accent-sapphire/97 backdrop-blur-md shadow-lg text-white"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <ul class="container mx-auto px-4 py-4 max-w-7xl flex flex-col gap-1 font-body text-sm uppercase tracking-[0.12em] text-white">
              <li>
                <a [routerLink]="navPage('home')" (click)="closeMobileNav()" class="block py-3 px-2 rounded-md text-white hover:text-secondary-gold hover:bg-white/10 transition-colors">{{ 'NAV_HOME' | translate }}</a>
              </li>
              <li>
                <a [routerLink]="navPage('services')" (click)="closeMobileNav()" class="block py-3 px-2 rounded-md text-white hover:text-secondary-gold hover:bg-white/10 transition-colors">{{ 'NAV_SERVICES' | translate }}</a>
              </li>
              <li>
                <button type="button" (click)="scrollToSectionAndClose('process')" class="w-full text-left py-3 px-2 rounded-md text-white hover:text-secondary-gold hover:bg-white/10 transition-colors uppercase tracking-[0.12em]">{{ 'NAV_PROCESS' | translate }}</button>
              </li>
              <li>
                <button type="button" (click)="scrollToSectionAndClose('about')" class="w-full text-left py-3 px-2 rounded-md text-white hover:text-secondary-gold hover:bg-white/10 transition-colors uppercase tracking-[0.12em]">{{ 'NAV_ABOUT' | translate }}</button>
              </li>
              <li>
                <button type="button" (click)="scrollToSectionAndClose('areas')" class="w-full text-left py-3 px-2 rounded-md text-white hover:text-secondary-gold hover:bg-white/10 transition-colors uppercase tracking-[0.12em]">{{ 'NAV_AREAS' | translate }}</button>
              </li>
              <li>
                <button type="button" (click)="scrollToSectionAndClose('testimonials')" class="w-full text-left py-3 px-2 rounded-md text-white hover:text-secondary-gold hover:bg-white/10 transition-colors uppercase tracking-[0.12em]">{{ 'NAV_TESTIMONIALS' | translate }}</button>
              </li>
              <li>
                <button type="button" (click)="scrollToSectionAndClose('faq')" class="w-full text-left py-3 px-2 rounded-md text-white hover:text-secondary-gold hover:bg-white/10 transition-colors uppercase tracking-[0.12em]">{{ 'NAV_FAQ' | translate }}</button>
              </li>
              <li>
                <a [routerLink]="navPage('contact')" (click)="closeMobileNav()" class="block py-3 px-2 rounded-md text-white hover:text-secondary-gold hover:bg-white/10 transition-colors">{{ 'NAV_CONTACT' | translate }}</a>
              </li>
              <li>
                <a [routerLink]="navPage('blog')" (click)="closeMobileNav()" class="block py-3 px-2 rounded-md text-white hover:text-secondary-gold hover:bg-white/10 transition-colors">{{ 'NAV_BLOG' | translate }}</a>
              </li>
            </ul>
          </div>
        </div>
      }

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

  readonly mobileNavOpen = signal(false);

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

    let previousNavUrl: string | null = null;
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        applyRouteSeo();
        const next = event.urlAfterRedirects;
        if (previousNavUrl !== null && next !== previousNavUrl) {
          this.closeMobileNav();
        }
        previousNavUrl = next;
      });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.mobileNavOpen()) {
      this.closeMobileNav();
    }
  }

  toggleMobileNav(): void {
    this.mobileNavOpen.update((open) => !open);
  }

  closeMobileNav(): void {
    this.mobileNavOpen.set(false);
  }

  scrollToSectionAndClose(id: string): void {
    this.closeMobileNav();
    this.scrollToSection(id);
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
