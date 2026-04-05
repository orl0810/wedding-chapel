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
    return seg ? ['/', lang, seg] : ['/', lang];
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
    const lang = parts[0];
    if (lang !== 'en' && lang !== 'es') {
      return null;
    }
    const segment = parts[1] ?? '';
    if (!segment) {
      return 'home';
    }
    for (const key of Object.keys(PAGE_SEGMENTS) as PageKey[]) {
      if (PAGE_SEGMENTS[key][lang as SiteLang] === segment) {
        return key;
      }
    }
    return null;
  }
}
