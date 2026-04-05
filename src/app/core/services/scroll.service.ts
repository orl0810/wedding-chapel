import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  scrollToElementById(id: string, options?: { silent?: boolean }): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    const element = this.document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    }
    if (!options?.silent) {
      console.warn(`Element with ID '${id}' not found for scrolling.`);
    }
    return false;
  }

  /** Retries for deferred blocks, hydration, or scroll restoration finishing after navigation. */
  scrollToElementByIdWhenReady(id: string, maxAttempts = 40, intervalMs = 50): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    let attempt = 0;
    const tick = (): void => {
      const silent = attempt < maxAttempts - 1;
      if (this.scrollToElementById(id, { silent }) || attempt >= maxAttempts) {
        return;
      }
      attempt += 1;
      setTimeout(tick, intervalMs);
    };
    tick();
  }
}
