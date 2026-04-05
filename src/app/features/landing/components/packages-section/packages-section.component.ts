import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';
import { ScrollService } from '../../../../core/services/scroll.service';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

interface Package {
  key: string;
  priceKey: string;
  features: string[];
}

@Component({
  selector: 'app-packages-section',
  standalone: true,
  imports: [
    CommonModule,
    SectionTitleComponent,
    ButtonComponent,
    TranslatePipe,
    RevealOnScrollDirective,
  ],
  template: `
    <section id="packages" class="bg-primary-cream py-20 md:py-28 px-4" aria-labelledby="packages-title">
      <div class="container mx-auto max-w-7xl">
        <app-section-title
          id="packages-title"
          [title]="'SERVICES_SECTION_H2' | translate"
          [subtitle]="'SERVICES_SECTION_SUBTITLE' | translate"
          [wide]="true" />

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20">
          @for (svc of serviceTypes; track svc.key; let idx = $index) {
            <article
              appReveal
              class="bg-wix-paper border border-black/[0.07] rounded-sm shadow-wix-soft p-6 md:p-7 text-center sm:text-left"
              [class.reveal-delay-1]="idx === 1"
              [class.reveal-delay-2]="idx === 2"
              [class.reveal-delay-3]="idx === 3">
              <h3 class="text-lg md:text-xl font-display font-semibold text-accent-sapphire mb-3 leading-snug">
                {{ ('SERVICE_TYPE_' + svc.key + '_TITLE') | translate }}
              </h3>
              <p class="font-body text-[15px] md:text-base text-text-dark/88 leading-relaxed m-0">
                {{ ('SERVICE_TYPE_' + svc.key + '_BODY') | translate }}
              </p>
            </article>
          }
        </div>

        <h3
          class="text-2xl md:text-3xl font-display font-semibold text-center text-accent-sapphire mb-10 md:mb-12">
          {{ 'PACKAGES_TIER_HEADING' | translate }}
        </h3>

        <div class="grid lg:grid-cols-3 gap-8 md:gap-10 mt-4 md:mt-8">
          @for (pkg of packages; track pkg.key; let idx = $index) {
            <article
              appReveal
              class="group relative flex flex-col bg-wix-paper border border-black/[0.07] rounded-sm shadow-wix-soft pt-10 px-8 pb-8 transition-all duration-500 hover:shadow-wix-card hover:-translate-y-1"
              [class.reveal-delay-1]="idx === 1"
              [class.reveal-delay-2]="idx === 2">
              <div
                class="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-secondary-gold to-transparent opacity-90"></div>
              <div class="flex-1">
                <h3
                  class="text-xl md:text-2xl font-display font-semibold text-accent-sapphire mb-2 leading-snug min-h-[3.5rem]">
                  {{ ('PACKAGE_' + pkg.key + '_TITLE') | translate }}
                </h3>
                <p
                  class="text-4xl md:text-5xl font-display font-bold text-secondary-gold mb-8 tracking-tight">
                  {{ pkg.priceKey | translate }}
                </p>
                <ul class="space-y-4 text-text-dark mb-10">
                  @for (featureKey of pkg.features; track $index) {
                    <li class="flex gap-3 items-start">
                      <span
                        class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-gold"
                        aria-hidden="true"></span>
                      <span class="font-body text-[15px] md:text-base leading-relaxed text-text-dark/90">
                        {{ ('PACKAGE_' + pkg.key + '_' + featureKey) | translate }}
                      </span>
                    </li>
                  }
                </ul>
              </div>
              <app-button variant="primary" [fullWidth]="true" (click)="scrollToSection('contact')">
                {{ 'PACKAGES_CTA' | translate }}
              </app-button>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class PackagesSectionComponent {
  private scrollService = inject(ScrollService);

  readonly serviceTypes = [
    { key: 'BEACH' },
    { key: 'COURTHOUSE' },
    { key: 'BACKYARD' },
    { key: 'VENUE' },
  ] as const;

  packages: Package[] = [
    {
      key: 'INTIMATE',
      priceKey: 'PACKAGE_INTIMATE_PRICE',
      features: ['FEATURE_1', 'FEATURE_2', 'FEATURE_3', 'FEATURE_4', 'FEATURE_5'],
    },
    {
      key: 'SIGNATURE',
      priceKey: 'PACKAGE_SIGNATURE_PRICE',
      features: ['FEATURE_1', 'FEATURE_2', 'FEATURE_3', 'FEATURE_4', 'FEATURE_5', 'FEATURE_6'],
    },
    {
      key: 'PREMIUM',
      priceKey: 'PACKAGE_PREMIUM_PRICE',
      features: ['FEATURE_1', 'FEATURE_2', 'FEATURE_3', 'FEATURE_4', 'FEATURE_5'],
    },
  ];

  scrollToSection(id: string): void {
    this.scrollService.scrollToElementById(id);
  }
}
