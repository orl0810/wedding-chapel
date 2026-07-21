import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';
import { ScrollService } from '../../../../core/services/scroll.service';
import { WhatsappService } from '../../../../core/services/whatsapp.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TranslatePipe],
  template: `
    <section
      class="relative min-h-screen flex flex-col justify-center items-center text-white overflow-hidden"
      aria-label="Hero Section - Wedding Officiant">
      <img
        src="/assets/images/hero-wedding-officiant-miami-1920.webp"
        srcset="
          /assets/images/hero-wedding-officiant-miami-640.webp 640w,
          /assets/images/hero-wedding-officiant-miami-960.webp 960w,
          /assets/images/hero-wedding-officiant-miami-1280.webp 1280w,
          /assets/images/hero-wedding-officiant-miami-1920.webp 1920w
        "
        sizes="100vw"
        width="1920"
        height="1280"
        loading="eager"
        fetchpriority="high"
        decoding="sync"
        alt=""
        class="pointer-events-none absolute inset-0 h-full w-full object-cover object-center" />
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
          (click)="sendWhatsAppMessage()">
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
  private whatsappService = inject(WhatsappService);

  scrollToSection(id: string): void {
    this.scrollService.scrollToElementById(id);
  }

  sendWhatsAppMessage(): void {
    this.whatsappService.buildUrl();
    window.open(this.whatsappService.buildUrl(), '_blank');
  }
}
