import { Injectable, Optional, Inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import {
  PAGE_SEGMENTS,
  type PageKey,
  type SiteLang,
} from '../../routing/localized-page-meta';

@Injectable({
  providedIn: 'root',
})
export class LanguageUrlService {
  private readonly baseHref: string;

  constructor(@Optional() @Inject(APP_BASE_HREF) appBaseHref?: string) {
    this.baseHref = ((appBaseHref || '/') as string).replace(/\/$/, '');
  }

  /** Router commands for `routerLink` / `navigate` (no trailing slash; server normalizes). */
  navCommands(lang: SiteLang, pageKey: PageKey): (string | SiteLang)[] {
    const seg = PAGE_SEGMENTS[pageKey][lang];
    const prefix = lang === 'es' ? ['/', 'es'] : ['/'];
    return seg ? [...prefix, seg] : prefix;
  }

  /**
   * Like `navCommands`, but keeps a blog post slug when switching language
   * (e.g. `/blog/how-to-elope-in-miami` → `/es/blog/how-to-elope-in-miami`).
   */
  navCommandsForPath(pathname: string, targetLang: SiteLang): (string | SiteLang)[] {
    let rest = pathname;
    if (this.baseHref && this.baseHref !== '/' && rest.startsWith(this.baseHref)) {
      rest = rest.slice(this.baseHref.length) || '/';
    }
    const parts = rest.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
    const isSpanish = parts[0] === 'es';
    const segment = parts[isSpanish ? 1 : 0] ?? '';
    const blogSlug = parts[isSpanish ? 2 : 1];
    if (segment === 'blog' && blogSlug) {
      return targetLang === 'es'
        ? ['/', 'es', 'blog', blogSlug]
        : ['/', 'blog', blogSlug];
    }
    return this.navCommands(targetLang, this.pageKeyFromPath(pathname) ?? 'home');
  }

  pageKeyFromPath(pathname: string): PageKey | null {
    if (!pathname) {
      return null;
    }
    let rest = pathname;
    if (this.baseHref && this.baseHref !== '/' && rest.startsWith(this.baseHref)) {
      rest = rest.slice(this.baseHref.length) || '/';
    }
    const parts = rest.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
    const lang: SiteLang = parts[0] === 'es' ? 'es' : 'en';
    const segment = parts[0] === 'es' ? (parts[1] ?? '') : (parts[0] ?? '');
    if (!segment) {
      return 'home';
    }
    for (const key of Object.keys(PAGE_SEGMENTS) as PageKey[]) {
      if (PAGE_SEGMENTS[key][lang] === segment) {
        return key;
      }
    }
    return null;
  }
}
