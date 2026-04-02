import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, TranslatePipe],
  template: `
    <section class="container mx-auto py-20 px-4" aria-labelledby="about-title">
      <app-section-title id="about-title" [title]="'ABOUT_TITLE' | translate"></app-section-title>

      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="order-2 md:order-1 space-y-6 text-text-dark animated-section">
          <p class="text-lg leading-relaxed font-body">
            {{ 'ABOUT_INTRO' | translate }}
          </p>
          <ul class="space-y-3 text-lg font-body list-disc list-inside">
            <li class="flex items-center gap-2">
              <svg class="w-5 h-5 text-secondary-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              <span>{{ 'ABOUT_TRUST_1' | translate }}</span>
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-5 h-5 text-secondary-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              <span>{{ 'ABOUT_TRUST_2' | translate }}</span>
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-5 h-5 text-secondary-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
              <span>{{ 'ABOUT_TRUST_3' | translate }}</span>
            </li>
          </ul>
        </div>
        <div class="order-1 md:order-2 flex justify-center animated-section animation-delay-200">
          <img src="assets/images/officiant-photo.jpg" alt="Juan Camilo Méndez - Miami Wedding Officiant" class="rounded-lg shadow-xl max-w-full h-auto object-cover border-4 border-secondary-gold transform hover:scale-105 transition-transform duration-500" loading="lazy">
        </div>
      </div>
    </section>
  `,
  styles: `
    img {
      max-width: 400px; /* Constrain image size */
      aspect-ratio: 3/4; /* Example aspect ratio */
    }
  `
})
export class AboutSectionComponent { }
