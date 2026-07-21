import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Language } from '../../../core/services/i18n.service';
import { LanguageUrlService } from '../../../core/services/language-url.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block text-left">
      <button
        (click)="toggleDropdown()"
        type="button"
        class="inline-flex justify-center items-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold text-text-dark shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
        id="language-menu-button"
        [attr.aria-expanded]="isOpen"
        aria-controls="language-menu"
        aria-haspopup="menu">
        {{ currentLang.toUpperCase() }}
        <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>

      @if (isOpen) {
        <div id="language-menu" class="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="language-menu-button">
          <div class="py-1" role="none">
            <button (click)="selectLang('en')" type="button" class="w-full text-left text-text-dark block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">English</button>
            <button (click)="selectLang('es')" type="button" class="w-full text-left text-text-dark block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">Español</button>
          </div>
        </div>
      }
    </div>
  `,
})
export class LanguageSwitcherComponent {
  @Input() currentLang: Language = 'en';

  private router = inject(Router);
  private languageUrl = inject(LanguageUrlService);
  isOpen: boolean = false;

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectLang(lang: Language): void {
    this.isOpen = false;
    const path = this.router.url.split('?')[0];
    void this.router.navigate(this.languageUrl.navCommandsForPath(path, lang));
  }
}
