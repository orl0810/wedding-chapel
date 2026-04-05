import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-service-areas-section',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, TranslatePipe, RevealOnScrollDirective],
  template: `
    <section
      id="areas"
      class="bg-primary-cream py-20 md:py-28 px-4 border-y border-black/[0.06]"
      aria-labelledby="areas-heading">
      <div class="container mx-auto max-w-6xl">
        <app-section-title
          id="areas-heading"
          [title]="'AREAS_TITLE' | translate"
          [subtitle]="'AREAS_SUBTITLE' | translate"
          [wide]="true" />

        <ul class="flex flex-wrap justify-center gap-3 md:gap-4 list-none p-0 m-0 max-w-4xl mx-auto">
          @for (key of areaKeys; track key; let idx = $index) {
            <li
              appReveal
              class="rounded-sm border border-black/[0.08] bg-wix-paper px-4 py-2.5 md:px-5 md:py-3 font-body text-sm md:text-base text-text-dark/90 shadow-wix-soft"
              [class.reveal-delay-1]="idx === 1"
              [class.reveal-delay-2]="idx === 2"
              [class.reveal-delay-3]="idx === 3">
              {{ ('AREA_' + key) | translate }}
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class ServiceAreasSectionComponent {
  readonly areaKeys = ['MIAMI_BEACH', 'CORAL_GABLES', 'BRICKELL', 'KEY_BISCAYNE', 'FORT_LAUDERDALE'] as const;
}
