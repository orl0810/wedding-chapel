import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [attr.type]="type" [ngClass]="getButtonClasses()">
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() fullWidth: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  getButtonClasses(): string {
    const baseClasses = 'font-body font-semibold rounded-full transition-all duration-300 ease-in-out flex items-center justify-center';
    const sizeClasses = {
      'sm': 'px-4 py-2 text-sm',
      'md': 'px-6 py-3 text-base',
      'lg': 'px-8 py-4 text-lg',
    }[this.size];

    const variantClasses = {
      'primary':
        'bg-secondary-gold text-white hover:bg-accent-sapphire shadow-wix-soft hover:shadow-wix-card ring-1 ring-black/5',
      'secondary':
        'bg-accent-sapphire text-white hover:bg-secondary-gold shadow-wix-soft hover:shadow-wix-card',
      'outline':
        'border-2 border-secondary-gold text-secondary-gold hover:bg-secondary-gold hover:text-white bg-white/80',
    }[this.variant];

    const widthClass = this.fullWidth ? 'w-full' : 'w-auto';

    return `${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass}`;
  }
}
