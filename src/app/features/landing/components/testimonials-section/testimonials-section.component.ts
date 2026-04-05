import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

interface Testimonial {
  nameKey: string;
  quoteKey: string;
  typeKey: string;
  imageWebp: string;
  imageFallback: string;
}

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, SectionTitleComponent, TranslatePipe, RevealOnScrollDirective],
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
          [wide]="false" />

        <div class="grid md:grid-cols-3 gap-8 md:gap-10 mt-6">
          @for (testimonial of testimonials; track testimonial.nameKey; let idx = $index) {
            <figure
              appReveal
              class="flex flex-col h-full bg-primary-cream/80 p-8 md:p-9 border border-black/[0.06] shadow-wix-soft transition-all duration-500 hover:shadow-wix-card"
              [class.reveal-delay-1]="idx === 1"
              [class.reveal-delay-2]="idx === 2">
              <div class="relative mx-auto mb-4 h-20 w-20 md:h-24 md:w-24 shrink-0">
                <picture class="block h-full w-full overflow-hidden rounded-full border-2 border-secondary-gold/90 shadow-wix-soft">
                  <source type="image/webp" [attr.srcset]="testimonial.imageWebp" />
                  <img
                    [ngSrc]="testimonial.imageFallback"
                    width="96"
                    height="96"
                    sizes="96px"
                    [alt]="testimonial.nameKey | translate"
                    class="h-full w-full object-cover" />
                </picture>
              </div>
              <p
                class="text-center text-secondary-gold text-sm tracking-[0.2em] mb-2"
                aria-label="5 out of 5 stars">
                ★★★★★
              </p>
              <p
                class="text-center font-body text-xs md:text-sm uppercase tracking-widest text-text-dark/70 mb-6">
                {{ testimonial.typeKey | translate }}
              </p>
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
      typeKey: 'TESTIMONIAL_1_TYPE',
      imageWebp:
        '/assets/images/miami-officiant-marriage-certificate-south-florida-best-venues-florida-luxury-miami-56.webp',
      imageFallback:
        '/assets/images/miami-officiant-marriage-certificate-south-florida-best-venues-florida-luxury-miami-56.jpg',
    },
    {
      nameKey: 'TESTIMONIAL_2_NAME',
      quoteKey: 'TESTIMONIAL_2_QUOTE',
      typeKey: 'TESTIMONIAL_2_TYPE',
      imageWebp:
        '/assets/images/miami-officiant-marriage-certificate-south-florida-best-venues-florida-luxury-miami21.webp',
      imageFallback:
        '/assets/images/miami-officiant-marriage-certificate-south-florida-best-venues-florida-luxury-miami21.png',
    },
    {
      nameKey: 'TESTIMONIAL_3_NAME',
      quoteKey: 'TESTIMONIAL_3_QUOTE',
      typeKey: 'TESTIMONIAL_3_TYPE',
      imageWebp: '/assets/images/miami-wedding-officiant-marriage-certificate-south-florida-best-venues-florida.webp',
      imageFallback:
        '/assets/images/miami-wedding-officiant-marriage-certificate-south-florida-best-venues-florida.jpg',
    },
  ];
}
