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

  scrollToElementById(
    id: string,
    options?: {
      silent?: boolean;
      behavior?: ScrollBehavior;
      block?: ScrollLogicalPosition;
    },
  ): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    const element = this.document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: options?.behavior ?? 'smooth',
        block: options?.block ?? 'start',
      });
      return true;
    }
    if (!options?.silent) {
      console.warn(`Element with ID '${id}' not found for scrolling.`);
    }
    return false;
  }

  /** Retries for deferred blocks, hydration, or scroll restoration finishing after navigation. */
  scrollToElementByIdWhenReady(
    id: string,
    opts?: {
      maxAttempts?: number;
      intervalMs?: number;
      behavior?: ScrollBehavior;
      block?: ScrollLogicalPosition;
    },
  ): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const maxAttempts = opts?.maxAttempts ?? 40;
    const intervalMs = opts?.intervalMs ?? 50;
    const behavior = opts?.behavior ?? 'smooth';
    const block = opts?.block ?? 'start';
    let attempt = 0;
    const tick = (): void => {
      const silent = attempt < maxAttempts - 1;
      if (
        this.scrollToElementById(id, { silent, behavior, block }) ||
        attempt >= maxAttempts
      ) {
        return;
      }
      attempt += 1;
      setTimeout(tick, intervalMs);
    };
    tick();
  }
}
