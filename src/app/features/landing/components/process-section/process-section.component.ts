import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-process-section',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, TranslatePipe, RevealOnScrollDirective],
  template: `
    <section
      id="process"
      class="relative bg-wix-paper py-20 md:py-28 px-4 border-y border-black/[0.06]"
      aria-labelledby="process-heading">
      <div class="container mx-auto max-w-4xl">
        <app-section-title
          id="process-heading"
          [title]="'PROCESS_TITLE' | translate"
          [subtitle]="'PROCESS_SUBTITLE' | translate"
          [showRule]="true" />

        <!-- <p class="text-center font-body text-sm uppercase tracking-[0.2em] text-secondary-gold mb-10">
          {{ 'PROCESS_LABEL' | translate }}
        </p> -->

        <ol class="space-y-10 md:space-y-12 list-none p-0 m-0">
          @for (n of steps; track n; let idx = $index) {
            <li
              appReveal
              class="relative"
              [class.reveal-delay-1]="idx === 1"
              [class.reveal-delay-2]="idx === 2"
              [class.reveal-delay-3]="idx === 3"
              [class.reveal-delay-4]="idx === 4">
              <p class="font-body text-base md:text-lg text-text-dark/95 font-semibold leading-relaxed">
                {{ ('PROCESS_STEP_TITLE_' + n) | translate }}
              </p><p class="font-body text-base md:text-lg text-text-dark/95 leading-relaxed">
                {{ ('PROCESS_STEP_' + n) | translate }}
              </p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class ProcessSectionComponent {
  readonly steps = [1, 2, 3, 4] as const;
}
