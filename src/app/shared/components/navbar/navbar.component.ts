import {
  Component, HostListener, signal, inject, OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { I18nService, Language } from '../../../core/services/i18n.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  readonly i18n = inject(I18nService);

  readonly isScrolled  = signal(false);
  readonly menuOpen    = signal(false);
  readonly languages: Language[] = ['en', 'es'];

  ngOnInit(): void {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 60);
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.menuOpen.set(false);
  }

  setLang(lang: Language): void {
    this.i18n.setLanguage(lang);
  }

  t(key: string): string {
    return this.i18n.translate(key);
  }
}
