import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [ngClass]="getButtonClasses()">
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() fullWidth: boolean = false;

  getButtonClasses(): string {
    const baseClasses = 'font-body font-semibold rounded-full transition-all duration-300 ease-in-out flex items-center justify-center';
    const sizeClasses = {
      'sm': 'px-4 py-2 text-sm',
      'md': 'px-6 py-3 text-base',
      'lg': 'px-8 py-4 text-lg',
    }[this.size];

    const variantClasses = {
      'primary': 'bg-secondary-gold text-white hover:bg-accent-sapphire shadow-lg hover:shadow-xl',
      'secondary': 'bg-accent-sapphire text-white hover:bg-secondary-gold shadow-lg hover:shadow-xl',
      'outline': 'border-2 border-secondary-gold text-secondary-gold hover:bg-secondary-gold hover:text-white',
    }[this.variant];

    const widthClass = this.fullWidth ? 'w-full' : 'w-auto';

    return `${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass}`;
  }
}
