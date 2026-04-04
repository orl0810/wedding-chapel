import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SocialLink {
  icon: string; // SVG path or class name
  url: string;
  name: string;
}

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex space-x-4">
      @for (link of socialLinks; track link.name) {
        <a [href]="link.url" target="_blank" rel="noopener noreferrer"
           class="text-primary-cream hover:text-secondary-gold transition-colors duration-300">
          <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path [attr.d]="link.icon"></path>
          </svg>
          <span class="sr-only">{{ link.name }}</span>
        </a>
      }
    </div>
  `,
})
export class SocialLinksComponent {
  @Input() socialLinks: SocialLink[] = [
    {
      icon: 'M16.983 2H7.017C4.254 2 2 4.254 2 7.017v9.966C2 19.746 4.254 22 7.017 22h9.966C19.746 22 22 19.746 22 16.983V7.017C22 4.254 19.746 2 16.983 2zM12 17.5c-3.033 0-5.5-2.467-5.5-5.5s2.467-5.5 5.5-5.5 5.5 2.467 5.5 5.5-2.467 5.5-5.5 5.5zm5.5-10.5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zM12 15.5c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4z', // Instagram icon
      url: 'https://www.instagram.com/miami_weddingofficiant/',
      name: 'Instagram'
    }
    // Add other social links as needed (Facebook, Pinterest, etc.)
  ];
}
