import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SocialLinksComponent } from '../../../../shared/components/social-links/social-links.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';
import { LanguageSwitcherComponent } from '../../../../shared/components/language-switcher/language-switcher.component';
import { I18nService } from '../../../../core/services/i18n.service';
import { LanguageUrlService } from '../../../../core/services/language-url.service';

@Component({
  selector: 'app-footer-section',
  standalone: true,
  imports: [CommonModule, RouterLink, SocialLinksComponent, TranslatePipe, LanguageSwitcherComponent],
  template: `
    <footer id="footer" class="bg-accent-sapphire text-text-light py-14 md:py-16 px-4 border-t border-white/10">
      <div class="container mx-auto max-w-6xl grid md:grid-cols-3 gap-10 md:gap-12 text-center md:text-left">
        <div>
          <a
            [routerLink]="languageUrl.navCommands(i18nService.currentLang(), 'home')"
            class="text-primary-cream text-2xl md:text-3xl font-display font-semibold hover:text-secondary-gold transition-colors duration-300 inline-block">
            Miami Wedding Officiant
          </a>
          <p class="mt-3 font-body text-text-light/85 text-sm md:text-base">{{ 'FOOTER_NAME' | translate }}</p>
          <p class="mt-4 text-sm text-text-light/70 font-body">{{ 'FOOTER_COPYRIGHT' | translate }}</p>
        </div>

        <div>
          <h4 class="text-lg font-display font-semibold text-secondary-gold mb-4 tracking-wide">
            {{ 'FOOTER_CONTACT_INFO' | translate }}
          </h4>
          <address class="not-italic space-y-2 font-body text-text-light/90 text-sm md:text-base">
            <p>{{ 'FOOTER_ADDRESS' | translate }}</p>
            <p>
              <a href="tel:+13058703010" class="hover:text-secondary-gold transition-colors">305 870 3010</a>
            </p>
            <p>
              <a href="mailto:vuelvealser@gmail.com" class="hover:text-secondary-gold transition-colors"
                >vuelvealser@gmail.com</a
              >
            </p>
          </address>
        </div>

        <div class="flex flex-col items-center md:items-end justify-between gap-8">
          <app-social-links></app-social-links>
          <app-language-switcher [currentLang]="i18nService.currentLang()"></app-language-switcher>
        </div>
      </div>
    </footer>
  `,
})
export class FooterSectionComponent {
  public i18nService = inject(I18nService);
  public languageUrl = inject(LanguageUrlService);
}
