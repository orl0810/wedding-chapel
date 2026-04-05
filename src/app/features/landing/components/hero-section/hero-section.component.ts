import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';
import { ScrollService } from '../../../../core/services/scroll.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ButtonComponent, TranslatePipe],
  template: `
    <section
      class="relative min-h-screen flex flex-col justify-center items-center text-white overflow-hidden"
      aria-label="Hero Section - Wedding Officiant">
      <picture class="pointer-events-none absolute inset-0 z-0 block">
        <source
          type="image/webp"
          srcset="/assets/images/miami-wedding-officiant-marriage-certificate-south-florida-best-venues-florida-luxury.webp" />
        <img
          ngSrc="/assets/images/miami-wedding-officiant-marriage-certificate-south-florida-best-venues-florida-luxury.jpg"
          fill
          priority
          sizes="100vw"
          alt=""
          class="object-cover object-center" />
      </picture>
      <div class="absolute inset-0 z-[1] bg-gradient-to-b from-accent-sapphire/75 via-accent-sapphire/55 to-accent-sapphire/80"></div>
      <div class="absolute inset-0 z-[1] bg-black/20"></div>

      <div class="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-4 max-w-5xl pt-32 sm:pt-24 pb-36">
          <h1
          class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold leading-[1.15] mb-6 md:mb-8 tracking-tight text-text-light animate-fade-in-up drop-shadow-md">
          {{ 'HERO_HEADLINE' | translate }}
        </h1>
        <p
          class="text-lg md:text-xl lg:text-2xl font-body font-light mb-10 md:mb-12 text-text-light/95 max-w-2xl animate-fade-in-up [animation-delay:0.2s] [animation-fill-mode:both]">
          {{ 'HERO_SUBHEADLINE' | translate }}
        </p>
        <app-button
          variant="primary"
          size="lg"
          class="animate-fade-in-up [animation-delay:0.4s] [animation-fill-mode:both]"
          (click)="scrollToSection('contact')">
          {{ 'HERO_CTA_BOOK' | translate }}
        </app-button>
      </div>

      <div class="absolute bottom-0 left-0 right-0 z-10 border-t border-white/15 bg-black/35 backdrop-blur-[2px] py-3 md:py-4 overflow-hidden">
  <div class="marquee-track hover:[animation-play-state:paused]">
    <div class="marquee-content">
      @for (i of marqueeItems; track i) {
        <span class="shrink-0 font-display text-[11px] sm:text-sm md:text-base uppercase tracking-[0.08em] sm:tracking-[0.14em] md:tracking-[0.2em] text-white/90 whitespace-nowrap">
          {{ 'HERO_HEADLINE' | translate }}
        </span>
      }
    </div>
    <div class="marquee-content" aria-hidden="true">
      @for (i of marqueeItems; track i) {
        <span class="shrink-0 font-display text-[11px] sm:text-sm md:text-base uppercase tracking-[0.08em] sm:tracking-[0.14em] md:tracking-[0.2em] text-white/90 whitespace-nowrap">
          {{ 'HERO_HEADLINE' | translate }}
        </span>
      }
    </div>
  </div>
</div>
    </section>
  `,
  styles: `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    opacity: 0;
    animation: fadeInUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

.marquee-track {
  display: flex;
  flex-wrap: nowrap;
  width: max-content;
}

.marquee-content {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 4rem;
  padding: 0 2rem;
  animation: marquee 80s linear infinite;
}

.marquee-track:hover .marquee-content {
  animation-play-state: paused;
}

  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in-up {
      opacity: 1;
      animation: none;
      transform: none;
    }
    .animate-marquee-track {
      animation: none;
    }
  }
`
})
export class HeroSectionComponent {
  private scrollService = inject(ScrollService);
  readonly marqueeHalves = [0, 1] as const;
  readonly marqueeItems = [0, 1, 2, 3, 4, 5] as const;

  scrollToSection(id: string): void {
    this.scrollService.scrollToElementById(id);
  }
}
