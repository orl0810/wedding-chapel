import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';

@Component({
  selector: 'app-social-proof-bar',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div
      id="social-proof"
      class="relative z-20 -mt-px border-y border-white/15 bg-accent-sapphire/95 text-text-light backdrop-blur-sm">
      <div
        class="container mx-auto max-w-6xl px-4 py-4 md:py-5 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-10 text-center sm:text-left">
        <div class="flex items-center gap-2 font-display text-sm md:text-base tracking-wide" aria-label="Rating">
          <span class="text-secondary-gold text-lg md:text-xl" aria-hidden="true">{{ stars }}</span>
          <span class="font-semibold">{{ 'SOCIAL_PROOF_RATING' | translate }}</span>
        </div>
        <span class="hidden sm:block h-4 w-px bg-white/25" aria-hidden="true"></span>
        <p class="font-body text-sm md:text-base text-text-light/95 max-w-md">
          {{ 'SOCIAL_PROOF_CEREMONIES' | translate }}
        </p>
        <span class="hidden sm:block h-4 w-px bg-white/25" aria-hidden="true"></span>
        <p
          class="inline-flex items-center rounded-sm border border-secondary-gold/50 bg-white/5 px-3 py-1.5 font-body text-xs md:text-sm uppercase tracking-[0.14em] text-secondary-gold">
          {{ 'SOCIAL_PROOF_BILINGUAL_BADGE' | translate }}
        </p>
      </div>
    </div>
  `,
})
export class SocialProofBarComponent {
  readonly stars = '★★★★★';
}
