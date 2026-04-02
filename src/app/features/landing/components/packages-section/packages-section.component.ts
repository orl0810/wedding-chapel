import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';
import { ScrollService } from '../../../../core/services/scroll.service';

interface Package {
  key: string; // Used for i18n translation keys
  price: string;
  features: string[]; // Keys for i18n
}

@Component({
  selector: 'app-packages-section',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, ButtonComponent, TranslatePipe],
  template: `
    <section class="bg-primary-cream py-20 px-4" aria-labelledby="packages-title">
      <div class="container mx-auto">
        <app-section-title id="packages-title" [title]="'PACKAGES_TITLE' | translate" [subtitle]="'PACKAGES_SUBTITLE' | translate"></app-section-title>

        <div class="grid md:grid-cols-3 gap-8 mt-12">
          @for (pkg of packages; track pkg.key) {
            <div class="bg-white rounded-lg shadow-xl p-8 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300 animated-section">
              <div>
                <h3 class="text-3xl font-display font-bold text-accent-sapphire mb-4">
                  {{ ('PACKAGE_' + pkg.key + '_TITLE') | translate }}
                </h3>
                <p class="text-lg font-body text-text-dark opacity-80 mb-6">
                  {{ ('PACKAGE_' + pkg.key + '_DESC') | translate }}
                </p>
                <div class="text-5xl font-display font-extrabold text-secondary-gold mb-6">
                  {{ pkg.price | translate }}
                </div>
                <ul class="space-y-3 text-text-dark mb-8">
                  @for (featureKey of pkg.features; track $index) {
                    <li class="flex items-start gap-3">
                      <svg class="w-6 h-6 text-secondary-gold flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                      <span class="font-body text-lg">{{ ('PACKAGE_' + pkg.key + '_' + featureKey) | translate }}</span>
                    </li>
                  }
                </ul>
              </div>
              <app-button variant="primary" [fullWidth]="true" (click)="scrollToSection('contact')">
                {{ 'PACKAGES_CTA' | translate }}
              </app-button>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class PackagesSectionComponent {
  private scrollService = inject(ScrollService);

  packages: Package[] = [
    {
      key: 'INTIMATE',
      price: '$650',
      features: [
        'FEATURE_1', 'FEATURE_2', 'FEATURE_3', 'FEATURE_4', 'FEATURE_5'
      ]
    },
    {
      key: 'SIGNATURE',
      price: '$950',
      features: [
        'FEATURE_1', 'FEATURE_2', 'FEATURE_3', 'FEATURE_4', 'FEATURE_5', 'FEATURE_6'
      ]
    },
    {
      key: 'PREMIUM',
      price: '$1,950',
      features: [
        'FEATURE_1', 'FEATURE_2', 'FEATURE_3', 'FEATURE_4', 'FEATURE_5'
      ]
    }
  ];

  scrollToSection(id: string): void {
    this.scrollService.scrollToElementById(id);
  }
}
