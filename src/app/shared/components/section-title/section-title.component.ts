import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center mb-12">
      <h2 class="text-4xl md:text-5xl font-display font-semibold text-accent-sapphire mb-4 animated-text">
        {{ title }}
      </h2>
      @if (subtitle) {
        <p class="text-lg md:text-xl font-body text-text-dark max-w-2xl mx-auto opacity-80 animated-text delay-100">
          {{ subtitle }}
        </p>
      }
      <div class="w-24 h-1 bg-secondary-gold mx-auto mt-6 rounded-full animated-line delay-200"></div>
    </div>
  `,
  styles: `
    .animated-text {
      opacity: 0;
      transform: translateY(20px);
      animation: fadeInUp 0.8s ease-out forwards;
    }
    .animated-line {
      opacity: 0;
      transform: scaleX(0);
      animation: scaleXIn 0.8s ease-out 0.3s forwards;
    }
    @keyframes scaleXIn {
      from { opacity: 0; transform: scaleX(0); }
      to { opacity: 1; transform: scaleX(1); }
    }
  `
})
export class SectionTitleComponent {
  @Input() title: string = '';
  @Input() subtitle?: string;
}
