import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialLinksComponent } from '../../../../shared/components/social-links/social-links.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';
import { LanguageSwitcherComponent } from '../../../../shared/components/language-switcher/language-switcher.component';
import { I18nService, Language } from '../../../../core/services/i18n.service';

@Component({
  selector: 'app-footer-section',
  standalone: true,
  imports: [CommonModule, SocialLinksComponent, TranslatePipe, LanguageSwitcherComponent],
  template: `
    <footer class="bg-accent-sapphire text-text-light py-12 px-4">
      <div class="container mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
        <!-- Brand/Logo -->
        <div>
          <a routerLink="/" class="text-primary-cream text-3xl font-display font-bold hover:text-secondary-gold transition-colors">
            Miami Wedding Officiant
          </a>
          <p class="mt-4 text-sm opacity-80">{{ 'FOOTER_COPYRIGHT' | translate }}</p>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="text-xl font-display font-semibold text-secondary-gold mb-4">{{ 'FOOTER_CONTACT_INFO' | translate }}</h4>
          <address class="not-italic space-y-2 font-body">
            <p>{{ 'FOOTER_ADDRESS' | translate }}</p>
            <p><a href="tel:+13058703010" class="hover:text-secondary-gold transition-colors">305 870 3010</a></p>
            <p><a href="mailto:vuelvealser@gmail.com" class="hover:text-secondary-gold transition-colors">vuelvealser@gmail.com</a></p>
          </address>
        </div>

        <!-- Social Links & Language -->
        <div class="flex flex-col items-center md:items-end space-y-6">
          <app-social-links></app-social-links>
          <app-language-switcher [currentLang]="i18nService.currentLang()" (langChange)="onLangChange($event)"></app-language-switcher>
        </div>
      </div>
    </footer>
  `,
})
export class FooterSectionComponent {
  public i18nService = inject(I18nService);

  onLangChange(lang: Language): void {
    this.i18nService.setLanguage(lang);
  }
}
