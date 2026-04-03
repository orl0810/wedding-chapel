import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="text-center mb-12 md:mb-16" [class.max-w-4xl]="!wide" [class.mx-auto]="!wide" [class.w-full]="wide">
      @if (eyebrow) {
        <p class="text-xs md:text-sm font-body uppercase tracking-[0.28em] text-secondary-gold mb-4 animate-fade-in-up">
          {{ eyebrow }}
        </p>
      }
      <h2
        class="text-3xl sm:text-4xl md:text-5xl font-display font-semibold mb-4 md:mb-5 leading-tight animate-fade-in-up px-2"
        [class.text-accent-sapphire]="!onDark"
        [class.text-text-light]="onDark"
        [class.animation-delay-100]="!!eyebrow">
        {{ title }}
      </h2>
      @if (subtitle) {
        <p
          class="text-base md:text-lg font-body max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200 px-2"
          [class.text-text-dark]="!onDark"
          [class.text-text-light/85]="onDark"
          [class.opacity-90]="!onDark">
          {{ subtitle }}
        </p>
      }
      @if (showRule) {
        <div
          class="w-16 md:w-24 h-0.5 bg-secondary-gold mx-auto mt-8 rounded-full animate-fade-in-up animation-delay-300"
          [class.opacity-90]="onDark"></div>
      }
    </div>
  `,
  styles: `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(18px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      opacity: 0;
      animation: fadeInUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    .animation-delay-100 { animation-delay: 0.12s; }
    .animation-delay-200 { animation-delay: 0.22s; }
    .animation-delay-300 { animation-delay: 0.32s; }
    @media (prefers-reduced-motion: reduce) {
      .animate-fade-in-up {
        opacity: 1;
        animation: none;
        transform: none;
      }
    }
  `,
})
export class SectionTitleComponent {
  @Input() title: string = '';
  @Input() subtitle?: string;
  /** Small uppercase line above the title (e.g. PROCESS) */
  @Input() eyebrow?: string;
  /** Light text for dark section backgrounds */
  @Input() onDark = false;
  @Input() showRule = true;
  /** Use full width for long headings */
  @Input() wide = false;
}
