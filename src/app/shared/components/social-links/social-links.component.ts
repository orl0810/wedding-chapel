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
           class="text-accent-sapphire hover:text-secondary-gold transition-colors duration-300">
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
      icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.417 2.818 8.131 6.746 9.486.5.089.682-.233.682-.525 0-.259-.008-.942-.013-1.858-2.731.595-3.303-1.316-3.303-1.316-.447-1.131-1.09-1.432-1.09-1.432-.892-.614.066-.6.066-.6 1.006.07 1.533 1.036 1.533 1.036.892 1.529 2.341 1.087 2.91.829.091-.643.349-1.087.634-1.339-2.224-.252-4.555-1.112-4.555-4.945 0-1.091.39-1.984 1.029-2.682-.103-.252-.447-1.272.096-2.651 0 0 .84-.27 2.75 1.025.799-.222 1.65-.333 2.5-.337.85.004 1.7.115 2.5.337 1.909-1.295 2.747-1.025 2.747-1.025.545 1.379.202 2.399.096 2.651.64.698 1.028 1.591 1.028 2.682 0 3.841-2.335 4.688-4.566 4.935.359.309.678.92.678 1.855 0 1.339-.013 2.419-.013 2.747 0 .295.18.619.688.525C19.182 20.148 22 16.435 22 12.017 22 6.484 17.523 2 12 2z', // GitHub icon (example, replace with Instagram)
      url: 'https://github.com/yourprofile',
      name: 'GitHub'
    },
    {
      icon: 'M16.983 2H7.017C4.254 2 2 4.254 2 7.017v9.966C2 19.746 4.254 22 7.017 22h9.966C19.746 22 22 19.746 22 16.983V7.017C22 4.254 19.746 2 16.983 2zM12 17.5c-3.033 0-5.5-2.467-5.5-5.5s2.467-5.5 5.5-5.5 5.5 2.467 5.5 5.5-2.467 5.5-5.5 5.5zm5.5-10.5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zM12 15.5c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4z', // Instagram icon
      url: 'https://www.instagram.com/weddingofficiant_miami/',
      name: 'Instagram'
    }
    // Add other social links as needed (Facebook, Pinterest, etc.)
  ];
}
