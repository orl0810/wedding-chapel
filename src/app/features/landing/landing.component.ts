import { Component, OnDestroy, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

import { I18nService } from '../../core/services/i18n.service';
import { ScrollService } from '../../core/services/scroll.service';
import { PackagesSectionComponent } from './components/packages-section/packages-section.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { TestimonialsSectionComponent } from './components/testimonials-section/testimonials-section.component';
import { ContactBookingSectionComponent } from './components/contact-booking-section/contact-booking-section.component';
import { FooterSectionComponent } from './components/footer-section/footer-section.component';
import { ProcessSectionComponent } from './components/process-section/process-section.component';
import { SocialProofBarComponent } from './components/social-proof-bar/social-proof-bar.component';
import { ServiceAreasSectionComponent } from './components/service-areas-section/service-areas-section.component';
import { FaqSectionComponent } from './components/faq-section/faq-section.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    SocialProofBarComponent,
    PackagesSectionComponent,
    ProcessSectionComponent,
    AboutSectionComponent,
    ServiceAreasSectionComponent,
    TestimonialsSectionComponent,
    FaqSectionComponent,
    ContactBookingSectionComponent,
    FooterSectionComponent,
  ],
  template: `
    <app-hero-section id="hero"></app-hero-section>
    <app-social-proof-bar></app-social-proof-bar>
    <app-packages-section></app-packages-section>
    <app-process-section></app-process-section>
    <app-about-section></app-about-section>
    <app-service-areas-section></app-service-areas-section>
    @defer (on viewport) {
      <app-testimonials-section></app-testimonials-section>
    } @placeholder {
      <div class="min-h-[28rem] bg-wix-paper border-y border-black/[0.06]" aria-hidden="true"></div>
    }
    @defer (on viewport) {
      <app-faq-section></app-faq-section>
    } @placeholder {
      <div class="min-h-[22rem] bg-primary-cream/40 border-y border-black/[0.06]" aria-hidden="true"></div>
    }
    @defer (on viewport) {
      <app-contact-booking-section></app-contact-booking-section>
    } @placeholder {
      <div class="min-h-[40rem] bg-accent-sapphire/[0.06]" aria-hidden="true"></div>
    }
    <app-footer-section></app-footer-section>
  `,
})
export class LandingComponent implements OnInit, OnDestroy {
  private i18nService = inject(I18nService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private scrollService = inject(ScrollService);
  private platformId = inject(PLATFORM_ID);
  private navSub?: Subscription;

  ngOnInit(): void {
    if (!this.i18nService.isInitialized()) {
      console.log('Landing component waiting for i18n initialization...');
    }
    this.scrollToRouteSection();
    this.navSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.scrollToRouteSection());
  }

  ngOnDestroy(): void {
    this.navSub?.unsubscribe();
  }

  private scrollToRouteSection(): void {
    let r = this.route;
    while (r.firstChild) {
      r = r.firstChild;
    }
    const id = r.snapshot.data['initialSectionId'] as string | undefined;
    if (!id || !isPlatformBrowser(this.platformId)) {
      return;
    }
    setTimeout(() => this.scrollService.scrollToElementById(id), 0);
  }
}
