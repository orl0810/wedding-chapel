import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-why-choose-section',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, TranslatePipe, RevealOnScrollDirective],
  template: `
    <section id="why-us" class="bg-primary-cream py-20 md:py-28 px-4" aria-labelledby="why-heading">
      <div class="container mx-auto max-w-6xl">
        <app-section-title
          id="why-heading"
          [title]="'WHY_TITLE' | translate"
          [subtitle]="'WHY_SUBTITLE' | translate"
          [wide]="true" />

        <p
          appReveal
          class="text-center max-w-3xl mx-auto mb-14 md:mb-16 font-body text-base md:text-lg text-text-dark/90 leading-relaxed">
          {{ 'WHY_INTRO' | translate }}
        </p>

        <div class="grid sm:grid-cols-2 gap-6 md:gap-8">
          @for (i of cards; track i; let idx = $index) {
            <article
              appReveal
              class="bg-wix-paper p-8 md:p-10 shadow-wix-soft border border-black/[0.06] rounded-sm transition-shadow duration-500 hover:shadow-wix-card"
              [class.reveal-delay-1]="idx === 1"
              [class.reveal-delay-2]="idx === 2"
              [class.reveal-delay-3]="idx === 3">
              <h3
                class="font-display text-lg md:text-xl text-accent-sapphire mb-4 tracking-[0.08em] uppercase">
                {{ ('WHY_CARD_' + i + '_TITLE') | translate }}
              </h3>
              <p class="font-body text-text-dark/88 leading-relaxed text-[15px] md:text-base">
                {{ ('WHY_CARD_' + i + '_BODY') | translate }}
              </p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class WhyChooseSectionComponent {
  readonly cards = [1, 2, 3, 4] as const;
}
