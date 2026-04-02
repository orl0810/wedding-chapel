import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';

interface Testimonial {
  nameKey: string;
  quoteKey: string;
  image: string; // Path to testimonial image
}

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, TranslatePipe],
  template: `
    <section class="py-20 px-4 bg-texture-subtle" aria-labelledby="testimonials-title">
      <div class="container mx-auto">
        <app-section-title id="testimonials-title" [title]="'TESTIMONIALS_TITLE' | translate" [subtitle]="'TESTIMONIALS_SUBTITLE' | translate"></app-section-title>

        <div class="grid md:grid-cols-3 gap-8 mt-12">
          @for (testimonial of testimonials; track testimonial.nameKey) {
            <div class="bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center animated-section transform hover:translate-y-[-5px] transition-transform duration-300">
              <img [src]="testimonial.image" [alt]="testimonial.nameKey | translate" class="w-24 h-24 rounded-full object-cover mb-6 border-4 border-secondary-gold">
              <p class="text-xl font-display italic text-text-dark mb-4 leading-relaxed">
                "{{ (testimonial.quoteKey) | translate }}"
              </p>
              <p class="font-body font-semibold text-accent-sapphire text-lg">
                - {{ (testimonial.nameKey) | translate }}
              </p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .bg-texture-subtle {
      background-image: url('/assets/images/subtle-texture.png'); /* Ensure this path is correct */
      background-size: cover;
      background-position: center;
    }
  `
})
export class TestimonialsSectionComponent {
  testimonials: Testimonial[] = [
    {
      nameKey: 'TESTIMONIAL_1_NAME',
      quoteKey: 'TESTIMONIAL_1_QUOTE',
      image: 'assets/images/testimonial-jovaleris-wilfredo.jpg'
    },
    {
      nameKey: 'TESTIMONIAL_2_NAME',
      quoteKey: 'TESTIMONIAL_2_QUOTE',
      image: 'assets/images/testimonial-daniela-austin.jpg'
    },
    {
      nameKey: 'TESTIMONIAL_3_NAME',
      quoteKey: 'TESTIMONIAL_3_QUOTE',
      image: 'assets/images/testimonial-sara-damian.jpg'
    }
  ];
}
