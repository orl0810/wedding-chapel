import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  readonly i18n = inject(I18nService);
  t = (k: string) => this.i18n.translate(k);

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
