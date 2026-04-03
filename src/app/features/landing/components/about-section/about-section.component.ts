import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule, TranslatePipe, RevealOnScrollDirective],
  template: `
    <section id="about" class="bg-wix-warm py-20 md:py-28 px-4 border-b border-black/[0.06]" aria-label="About">
      <div class="container mx-auto max-w-6xl">
        <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div appReveal class="order-2 md:order-1 space-y-6 md:space-y-8 text-text-dark">
            <p class="text-base md:text-lg leading-relaxed font-body text-text-dark/95">
              {{ 'ABOUT_P1' | translate }}
            </p>
            <p class="text-base md:text-lg leading-relaxed font-body text-text-dark/95">
              {{ 'ABOUT_P2' | translate }}
            </p>
            <p class="text-base md:text-lg leading-relaxed font-body text-text-dark/95 italic border-l-4 border-secondary-gold/80 pl-5">
              {{ 'ABOUT_P3' | translate }}
            </p>
          </div>
          <div appReveal class="order-1 md:order-2 flex justify-center reveal-delay-1">
            <img
              src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80"
              alt="Juan Camilo Méndez - Miami Wedding Officiant"
              class="rounded-sm shadow-wix-card max-w-full h-auto object-cover border border-black/10 w-full max-w-md aspect-[4/5] hover:scale-[1.02] transition-transform duration-700 ease-out"
              loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutSectionComponent {}
