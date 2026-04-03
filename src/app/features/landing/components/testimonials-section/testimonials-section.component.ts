import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

interface Testimonial {
  nameKey: string;
  quoteKey: string;
  image: string;
}

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, TranslatePipe, RevealOnScrollDirective],
  template: `
    <section
      id="testimonials"
      class="py-20 md:py-28 px-4 bg-wix-paper border-y border-black/[0.06]"
      aria-labelledby="testimonials-title">
      <div class="container mx-auto max-w-6xl">
        <app-section-title
          id="testimonials-title"
          [title]="'TESTIMONIALS_TITLE' | translate"
          [subtitle]="'TESTIMONIALS_SUBTITLE' | translate"
          [wide]="true" />

        <div class="grid md:grid-cols-3 gap-8 md:gap-10 mt-6">
          @for (testimonial of testimonials; track testimonial.nameKey; let idx = $index) {
            <figure
              appReveal
              class="flex flex-col h-full bg-primary-cream/80 p-8 md:p-9 border border-black/[0.06] shadow-wix-soft transition-all duration-500 hover:shadow-wix-card"
              [class.reveal-delay-1]="idx === 1"
              [class.reveal-delay-2]="idx === 2">
              <div class="flex justify-center mb-6">
                <img
                  [src]="testimonial.image"
                  [alt]="testimonial.nameKey | translate"
                  class="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-secondary-gold/90 shadow-wix-soft"
                  loading="lazy" />
              </div>
              <blockquote
                class="flex-1 border-l-[3px] border-secondary-gold/70 pl-5 ml-1 md:ml-2">
                <p
                  class="font-display text-lg md:text-xl italic text-text-dark/95 leading-relaxed text-left">
                  {{ testimonial.quoteKey | translate }}
                </p>
              </blockquote>
              <figcaption
                class="text-center font-body font-semibold text-accent-sapphire text-sm uppercase tracking-widest pt-4 border-t border-secondary-gold/25">
                {{ testimonial.nameKey | translate }}
              </figcaption>
            </figure>
          }
        </div>
      </div>
    </section>
  `,
})
export class TestimonialsSectionComponent {
  testimonials: Testimonial[] = [
    {
      nameKey: 'TESTIMONIAL_1_NAME',
      quoteKey: 'TESTIMONIAL_1_QUOTE',
      image:
        '/assets/images/miami-officiant-marriage-certificate-south-florida-best-venues-florida-luxury-miami-56.jpg',
    },
    {
      nameKey: 'TESTIMONIAL_2_NAME',
      quoteKey: 'TESTIMONIAL_2_QUOTE',
      image:
        '/assets/images/miami-officiant-marriage-certificate-south-florida-best-venues-florida-luxury-miami21.png',
    },
    {
      nameKey: 'TESTIMONIAL_3_NAME',
      quoteKey: 'TESTIMONIAL_3_QUOTE',
      image:'/assets/images/miami-wedding-officiant-marriage-certificate-south-florida-best-venues-florida.jpg',
    },
  ];
}
