import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { I18nService } from '../../core/services/i18n.service';
import { PackagesSectionComponent } from './components/packages-section/packages-section.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { TestimonialsSectionComponent } from './components/testimonials-section/testimonials-section.component';
import { ContactBookingSectionComponent } from './components/contact-booking-section/contact-booking-section.component';
import { FooterSectionComponent } from './components/footer-section/footer-section.component';
import { ProcessSectionComponent } from './components/process-section/process-section.component';
import { WhyChooseSectionComponent } from './components/why-choose-section/why-choose-section.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    AboutSectionComponent,
    ProcessSectionComponent,
    PackagesSectionComponent,
    TestimonialsSectionComponent,
    WhyChooseSectionComponent,
    ContactBookingSectionComponent,
    FooterSectionComponent
  ],
  template: `
    <app-hero-section id="hero"></app-hero-section>
    <app-about-section id="about"></app-about-section>
    <app-process-section></app-process-section>
    <app-packages-section id="packages"></app-packages-section>
    <app-testimonials-section></app-testimonials-section>
    <app-why-choose-section></app-why-choose-section>
    <app-contact-booking-section></app-contact-booking-section>
    <app-footer-section></app-footer-section>
  `,
})
export class LandingComponent implements OnInit {
  private i18nService = inject(I18nService);

  ngOnInit(): void {
    // Ensure translations are loaded before rendering content
    // The @if in app.component.ts already handles this, but good to ensure here too.
    if (!this.i18nService.isInitialized()) {
      // Potentially show a loading spinner specific to the landing page
      console.log('Landing component waiting for i18n initialization...');
    }
  }
}
