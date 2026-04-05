import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, TranslatePipe],
  template: `
    <section class="bg-wix-paper py-20 md:py-28 px-4" aria-labelledby="faq-heading">
      <div class="container mx-auto max-w-3xl">
        <app-section-title
          id="faq-heading"
          [title]="'FAQ_TITLE' | translate"
          [subtitle]="'FAQ_SUBTITLE' | translate"
          [wide]="true"
          [showRule]="true" />

        <div class="space-y-3 mt-2">
          @for (n of items; track n) {
            <details
              class="group border border-black/[0.08] bg-primary-cream/50 rounded-sm shadow-wix-soft open:shadow-wix-card transition-shadow">
              <summary
                class="cursor-pointer list-none flex items-center justify-between gap-4 px-5 py-4 font-display text-base md:text-lg text-accent-sapphire font-semibold [&::-webkit-details-marker]:hidden">
                <span>{{ ('FAQ_Q_' + n) | translate }}</span>
                <span
                  class="shrink-0 text-secondary-gold text-xl leading-none group-open:rotate-45 transition-transform"
                  aria-hidden="true"
                  >+</span
                >
              </summary>
              <div class="px-5 pb-5 pt-0 font-body text-text-dark/90 text-[15px] md:text-base leading-relaxed border-t border-black/[0.06]">
                <p class="pt-4 m-0">{{ ('FAQ_A_' + n) | translate }}</p>
              </div>
            </details>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    details summary::before {
      content: none;
    }
  `,
})
export class FaqSectionComponent {
  readonly items = [1, 2, 3, 4, 5] as const;
}
