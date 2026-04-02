import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';
import { ScrollService } from '../../../../core/services/scroll.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TranslatePipe],
  template: `
    <section class="relative h-screen flex items-center justify-center text-white overflow-hidden bg-hero-pattern bg-cover bg-center" aria-label="Hero Section - Wedding Officiant">
      <div class="absolute inset-0 bg-accent-sapphire opacity-50"></div>
      <div class="relative z-10 text-center px-4 max-w-4xl">
        <h1 class="text-5xl md:text-7xl font-display font-bold leading-tight mb-6 animate-fadeInUp text-text-light text-shadow-subtle">
          {{ 'HERO_HEADLINE' | translate }}
        </h1>
        <p class="text-xl md:text-2xl font-body mb-10 animate-fadeInUp animation-delay-300 text-text-light opacity-90 text-shadow-subtle">
          {{ 'HERO_SUBHEADLINE' | translate }}
        </p>
        <app-button variant="primary" size="lg" class="animate-fadeInUp animation-delay-600" (click)="scrollToSection('contact')">
          {{ 'HERO_CTA_BOOK' | translate }}
        </app-button>
      </div>
    </section>
  `,
  styles: `
    .bg-hero-pattern {
      background-image: url('/assets/images/hero-bg.jpg'); /* Ensure this path is correct */
    }
    .animation-delay-300 { animation-delay: 0.3s; }
    .animation-delay-600 { animation-delay: 0.6s; }
  `
})
export class HeroSectionComponent {
  private scrollService = inject(ScrollService);

  scrollToSection(id: string): void {
    this.scrollService.scrollToElementById(id);
  }
}
