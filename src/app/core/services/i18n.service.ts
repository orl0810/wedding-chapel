import { Injectable, signal, computed, inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import en from '../../i18n/en.json';
import es from '../../i18n/es.json';

export type Language = 'en' | 'es';

const translations: Record<Language, Record<string, unknown>> = { en, es };

@Injectable({ providedIn: 'root' })
export class I18nService {
  private platformId = inject(PLATFORM_ID);

  readonly currentLang = signal<Language>(this.getInitialLang());
  readonly t = computed(() => translations[this.currentLang()]);

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
      document.documentElement.lang = lang;
    }
  }

  /** Resolve a dot-notation key: t('hero.title') */
  translate(key: string): string {
    const keys = key.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any = this.t();
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) return key;
    }
    return String(result);
  }

  private getInitialLang(): Language {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('lang') as Language | null;
      if (stored === 'en' || stored === 'es') return stored;
      const browser = navigator.language.slice(0, 2);
      if (browser === 'es') return 'es';
    }
    return 'en';
  }
}
