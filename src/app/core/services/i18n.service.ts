import { Injectable, signal, effect, computed, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

export type Language = 'en' | 'es';

@Injectable({
  providedIn: 'root'
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

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Initialize language from localStorage or default
    if (isPlatformBrowser(this.platformId)) {
      const storedLang = localStorage.getItem(this.LANG_KEY) as Language;
      if (storedLang && ['en', 'es'].includes(storedLang)) {
        this._currentLang.set(storedLang);
      }
    }

    // Effect to load translations when language changes
    effect(() => {
      this.loadTranslations(this._currentLang());
    });
  }

  private loadTranslations(lang: Language): void {
    this._isLoading.set(true);
    this.http.get<Record<string, string>>(`/assets/i18n/${lang}.json`).subscribe({
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
