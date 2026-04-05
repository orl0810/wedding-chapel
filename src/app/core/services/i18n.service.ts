import { Injectable, signal, effect, computed, PLATFORM_ID, Inject, Optional } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

export type Language = 'en' | 'es';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private readonly DEFAULT_LANG: Language = 'en';
  private readonly LANG_KEY = 'app_lang';

  private _currentLang = signal<Language>(this.DEFAULT_LANG);
  private _translations = signal<Record<string, string>>({});
  private _isLoading = signal<boolean>(true);

  public currentLang = this._currentLang.asReadonly();
  public translations = this._translations.asReadonly();
  public isLoading = this._isLoading.asReadonly();
  public isInitialized = computed(() => Object.keys(this._translations()).length > 0 && !this._isLoading());

  private readonly baseHref: string;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    @Optional() @Inject(APP_BASE_HREF) private appBaseHref?: string
  ) {
    this.baseHref = ((this.appBaseHref || '/') as string).replace(/\/$/, '');

    let initial: Language = this.DEFAULT_LANG;
    const fromPath = this.peekLangFromPath(this.document.location?.pathname);
    if (fromPath) {
      initial = fromPath;
    } else if (isPlatformBrowser(this.platformId)) {
      const storedLang = localStorage.getItem(this.LANG_KEY) as Language;
      if (storedLang && ['en', 'es'].includes(storedLang)) {
        initial = storedLang;
      }
    }
    this._currentLang.set(initial);

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        const fromRouter = this.peekLangFromPath(this.router.url.split('?')[0]);
        if (fromRouter) {
          this.setLanguage(fromRouter);
        }
      });

    effect(() => {
      this.loadTranslations(this._currentLang());
    });
  }

  private peekLangFromPath(path: string | undefined): Language | null {
    if (!path) {
      return null;
    }
    const prefix = this.baseHref && this.baseHref !== '/' ? this.baseHref : '';
    let rest = path;
    if (prefix && rest.startsWith(prefix)) {
      rest = rest.slice(prefix.length) || '/';
    }
    const first = rest.replace(/^\//, '').split('/')[0];
    if (first === 'en' || first === 'es') {
      return first;
    }
    return null;
  }

  private getTranslationUrl(lang: Language): string {
    return `${this.baseHref}/assets/i18n/${lang}.json`.replace(/\/\/+/g, '/');
  }

  private loadTranslations(lang: Language): void {
    this._isLoading.set(true);
    this.http.get<Record<string, string>>(this.getTranslationUrl(lang)).subscribe({
      next: (data) => {
        this._translations.set(data);
        this._isLoading.set(false);
      },

      error: (error) => {
        console.error(`Failed to load translations for ${lang}`, error);
        // Fallback to default language if loading fails
        if (lang !== this.DEFAULT_LANG) {
          this._currentLang.set(this.DEFAULT_LANG);
        } else {
          this._isLoading.set(false); // Stop loading even if default fails
        }
      }
    });
  }

  public setLanguage(lang: Language): void {
    if (this._currentLang() !== lang) {
      this._currentLang.set(lang);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.LANG_KEY, lang);
      }
    }
  }

  public translate(key: string): string {
    return this._translations()[key] || key;
  }
}
