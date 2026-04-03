import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appReveal]',
  standalone: true,
  host: { class: 'reveal-on-scroll' },
})
export class RevealOnScrollDirective implements OnInit, AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.el.nativeElement.classList.add('reveal-visible');
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (typeof IntersectionObserver === 'undefined') {
      this.el.nativeElement.classList.add('reveal-visible');
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.el.nativeElement.classList.add('reveal-visible');
      return;
    }
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add('reveal-visible');
          this.observer?.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
