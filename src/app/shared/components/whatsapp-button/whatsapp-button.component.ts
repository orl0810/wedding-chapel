import { Component, input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../core/services/i18n.service';
import { TranslatePipe } from '../../pipes/translate/translate.pipe';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <a [href]="whatsappLink()" target="_blank" rel="noopener noreferrer"
       class="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 z-50 flex items-center justify-center">
      <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="..."/>
      </svg>
    </a>
  `,
})
export class WhatsAppButtonComponent {
  private i18nService = inject(I18nService);

    phoneNumber = input('13058703010');
    defaultMessageKey = input('WHATSAPP_MESSAGE_DEFAULT');

  whatsappLink = computed(() => {
    const lang = this.i18nService.currentLang(); // signal
    const translations = this.i18nService.translations(); // signal

    const message =
      translations[this.defaultMessageKey()] ??
      "Hello! I'm interested in your wedding officiant services.";

    return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(message)}`;
  });
}