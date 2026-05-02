import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';
import { BookingService } from '../../../../core/services/booking.service';

@Component({
  selector: 'app-contact-booking-section',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    SectionTitleComponent,
    ButtonComponent,
    TranslatePipe,
    RevealOnScrollDirective,
  ],
  template: `<!-- <div
            appReveal
            class="bg-wix-paper text-text-dark p-8 md:p-10 rounded-sm shadow-wix-card border border-black/[0.06]">
            <h3 class="text-2xl md:text-3xl font-display font-semibold text-accent-sapphire mb-6">
              {{ 'FORM_CONTACT_TITLE' | translate }}
            </h3>
            <form [formGroup]="contactForm" (ngSubmit)="onContactSubmit()" class="space-y-5">
              <div>
                <label for="contactName" class="block text-sm font-medium text-text-dark/80"
                  >{{ 'FORM_NAME' | translate }}<span class="text-red-600">*</span></label
                >
                <input
                  id="contactName"
                  type="text"
                  formControlName="name"
                  class="mt-1.5 block w-full rounded-sm border border-black/15 bg-white px-3 py-2.5 font-body text-text-dark shadow-sm focus:border-secondary-gold focus:outline-none focus:ring-2 focus:ring-secondary-gold/30" />
                @if (contactForm.get('name')?.invalid && (contactForm.get('name')?.dirty || contactForm.get('name')?.touched)) {
                  <p class="text-red-600 text-sm mt-1">{{ 'FORM_REQUIRED_FIELD' | translate }}</p>
                }
              </div>
              <div>
                <label for="contactEmail" class="block text-sm font-medium text-text-dark/80"
                  >{{ 'FORM_EMAIL' | translate }}<span class="text-red-600">*</span></label
                >
                <input
                  id="contactEmail"
                  type="email"
                  formControlName="email"
                  class="mt-1.5 block w-full rounded-sm border border-black/15 bg-white px-3 py-2.5 font-body text-text-dark shadow-sm focus:border-secondary-gold focus:outline-none focus:ring-2 focus:ring-secondary-gold/30" />
                @if (contactForm.get('email')?.invalid && (contactForm.get('email')?.dirty || contactForm.get('email')?.touched)) {
                  @if (contactForm.get('email')?.errors?.['required']) {
                    <p class="text-red-600 text-sm mt-1">{{ 'FORM_REQUIRED_FIELD' | translate }}</p>
                  }
                  @if (contactForm.get('email')?.errors?.['email']) {
                    <p class="text-red-600 text-sm mt-1">{{ 'FORM_INVALID_EMAIL' | translate }}</p>
                  }
                }
              </div>
              <div>
                <label for="contactMessage" class="block text-sm font-medium text-text-dark/80"
                  >{{ 'FORM_DETAILS' | translate }}<span class="text-red-600">*</span></label
                >
                <textarea
                  id="contactMessage"
                  formControlName="message"
                  rows="4"
                  class="mt-1.5 block w-full rounded-sm border border-black/15 bg-white px-3 py-2.5 font-body text-text-dark shadow-sm focus:border-secondary-gold focus:outline-none focus:ring-2 focus:ring-secondary-gold/30"></textarea>
                @if (contactForm.get('message')?.invalid && (contactForm.get('message')?.dirty || contactForm.get('message')?.touched)) {
                  <p class="text-red-600 text-sm mt-1">{{ 'FORM_REQUIRED_FIELD' | translate }}</p>
                }
              </div>
              <app-button variant="primary" [type]="'submit'">{{ 'FORM_SUBMIT' | translate }}</app-button>
            </form>
          </div> -->
    <section
  class="relative bg-accent-sapphire text-text-light py-20 md:py-28 px-4 overflow-hidden"
  aria-labelledby="contact-title">

  <div
    class="pointer-events-none absolute inset-0 opacity-[0.07]"
    style="background-image: radial-gradient(circle at 20% 30%, #fff 0%, transparent 45%), radial-gradient(circle at 80% 70%, #B89B77 0%, transparent 40%);"></div>

  <div class="container mx-auto max-w-6xl relative z-10">

    <app-section-title
      id="contact-title"
      [title]="'CONTACT_TITLE' | translate"
      [subtitle]="'CONTACT_SUBTITLE' | translate"
      [onDark]="true"
      [wide]="true" />

      <div
        class="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-8 mb-10 md:mb-12 font-body text-text-light/95 text-sm md:text-base">
        <a href="tel:+13058703010" class="hover:text-secondary-gold transition-colors font-semibold tracking-wide">
          {{ 'CONTACT_PHONE_DISPLAY' | translate }}
        </a>
        <span class="hidden sm:inline text-text-light/40" aria-hidden="true">|</span>
        <a href="mailto:vuelvealser@gmail.com" class="hover:text-secondary-gold transition-colors break-all">
          {{ 'CONTACT_EMAIL_DISPLAY' | translate }}
        </a>
      </div>

      <div class="grid md:grid-cols-2 gap-8 md:gap-10 mt-4 md:mt-8 items-stretch">

      <!-- ① Cinematic banner image — full width, fixed height -->
      <div class="relative min-h-[320px] self-stretch overflow-hidden rounded-sm shadow-wix-card md:min-h-0 md:h-full">
        <picture class="absolute inset-0 block h-full w-full">
          <source
            type="image/webp"
            srcset="/assets/images/miami-officiant-marriage-south-florida-best-venues-florida-luxury-miami2.webp" />
          <img
            ngSrc="/assets/images/miami-officiant-marriage-south-florida-best-venues-florida-luxury-miami2.jpg"
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            alt="Juan Camilo Méndez - Miami Wedding Officiant"
            class="border border-black/10 object-cover object-center" />
        </picture>
      </div>

      <!-- ② Form card -->
        <div appReveal class="bg-wix-paper text-text-dark p-8 md:p-10 rounded-sm shadow-wix-card border border-black/[0.06] reveal-delay-1">

        <h3 class="text-2xl md:text-3xl font-display font-semibold text-accent-sapphire mb-6">
          {{ 'FORM_BOOKING_TITLE' | translate }}
        </h3>

        <form [formGroup]="bookingForm" (ngSubmit)="onBookingSubmit()" class="space-y-5">

          <!-- Full-width: couple name -->
          <div>
            <label for="bookingCoupleName" class="block text-sm font-medium text-text-dark/80">
              {{ 'FORM_COUPLE_NAME' | translate }}<span class="text-red-600">*</span>
            </label>
            <input id="bookingCoupleName" type="text" formControlName="coupleName"
              class="mt-1.5 block w-full rounded-sm border border-black/15 bg-white px-3 py-2.5 font-body text-text-dark shadow-sm focus:border-secondary-gold focus:outline-none focus:ring-2 focus:ring-secondary-gold/30" />
            @if (bookingForm.get('coupleName')?.invalid && (bookingForm.get('coupleName')?.dirty || bookingForm.get('coupleName')?.touched)) {
              <p class="text-red-600 text-sm mt-1">{{ 'FORM_REQUIRED_FIELD' | translate }}</p>
            }
          </div>

          <!-- 2-col: email + phone -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="bookingEmail" class="block text-sm font-medium text-text-dark/80">
                {{ 'FORM_EMAIL' | translate }}<span class="text-red-600">*</span>
              </label>
              <input id="bookingEmail" type="email" formControlName="email"
                class="mt-1.5 block w-full rounded-sm border border-black/15 bg-white px-3 py-2.5 font-body text-text-dark shadow-sm focus:border-secondary-gold focus:outline-none focus:ring-2 focus:ring-secondary-gold/30" />
              @if (bookingForm.get('email')?.invalid && (bookingForm.get('email')?.dirty || bookingForm.get('email')?.touched)) {
                @if (bookingForm.get('email')?.errors?.['required']) {
                  <p class="text-red-600 text-sm mt-1">{{ 'FORM_REQUIRED_FIELD' | translate }}</p>
                }
                @if (bookingForm.get('email')?.errors?.['email']) {
                  <p class="text-red-600 text-sm mt-1">{{ 'FORM_INVALID_EMAIL' | translate }}</p>
                }
              }
            </div>
            <div>
              <label for="bookingPhone" class="block text-sm font-medium text-text-dark/80">
                {{ 'FORM_PHONE' | translate }}
              </label>
              <input id="bookingPhone" type="tel" formControlName="phone"
                class="mt-1.5 block w-full rounded-sm border border-black/15 bg-white px-3 py-2.5 font-body text-text-dark shadow-sm focus:border-secondary-gold focus:outline-none focus:ring-2 focus:ring-secondary-gold/30" />
            </div>
          </div>

          <!-- 2-col: date + time -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="bookingDate" class="block text-sm font-medium text-text-dark/80">
                {{ 'FORM_DATE' | translate }}<span class="text-red-600">*</span>
              </label>
              <input id="bookingDate" type="date" formControlName="date"
                class="mt-1.5 block w-full rounded-sm border border-black/15 bg-white px-3 py-2.5 font-body text-text-dark shadow-sm focus:border-secondary-gold focus:outline-none focus:ring-2 focus:ring-secondary-gold/30" />
              @if (bookingForm.get('date')?.invalid && (bookingForm.get('date')?.dirty || bookingForm.get('date')?.touched)) {
                <p class="text-red-600 text-sm mt-1">{{ 'FORM_REQUIRED_FIELD' | translate }}</p>
              }
            </div>
            <div>
              <label for="bookingTime" class="block text-sm font-medium text-text-dark/80">
                {{ 'FORM_TIME' | translate }}
              </label>
              <input id="bookingTime" type="time" formControlName="time"
                class="mt-1.5 block w-full rounded-sm border border-black/15 bg-white px-3 py-2.5 font-body text-text-dark shadow-sm focus:border-secondary-gold focus:outline-none focus:ring-2 focus:ring-secondary-gold/30" />
            </div>
          </div>

          <!-- Full-width: location -->
          <div>
            <label for="bookingLocation" class="block text-sm font-medium text-text-dark/80">
              {{ 'FORM_LOCATION' | translate }}<span class="text-red-600">*</span>
            </label>
            <input id="bookingLocation" type="text" formControlName="location"
              class="mt-1.5 block w-full rounded-sm border border-black/15 bg-white px-3 py-2.5 font-body text-text-dark shadow-sm focus:border-secondary-gold focus:outline-none focus:ring-2 focus:ring-secondary-gold/30" />
            @if (bookingForm.get('location')?.invalid && (bookingForm.get('location')?.dirty || bookingForm.get('location')?.touched)) {
              <p class="text-red-600 text-sm mt-1">{{ 'FORM_REQUIRED_FIELD' | translate }}</p>
            }
          </div>

          <!-- Full-width: package -->
          <div>
            <label for="bookingPackage" class="block text-sm font-medium text-text-dark/80">
              {{ 'FORM_PACKAGE_INTEREST' | translate }}
            </label>
            <select id="bookingPackage" formControlName="packageInterest"
              class="mt-1.5 block w-full rounded-sm border border-black/15 bg-white px-3 py-2.5 font-body text-text-dark shadow-sm focus:border-secondary-gold focus:outline-none focus:ring-2 focus:ring-secondary-gold/30">
              <option value="">{{ 'FORM_SELECT_PACKAGE' | translate }}</option>
              <option value="intimate">{{ 'PACKAGE_INTIMATE_TITLE' | translate }}</option>
              <option value="signature">{{ 'PACKAGE_SIGNATURE_TITLE' | translate }}</option>
              <option value="deluxe">{{ 'PACKAGE_DELUXE_TITLE' | translate }}</option>
            </select>
          </div>

          <!-- Full-width: details -->
          <div class="py-3">
            <label for="bookingDetails" class="block text-sm font-medium text-text-dark/80">
              {{ 'FORM_BOOKING_DETAILS' | translate }}
            </label>
            <textarea id="bookingDetails" formControlName="details" rows="3"
              class="mt-1.5 block w-full rounded-sm border border-black/15 bg-white px-3 py-2.5 font-body text-text-dark shadow-sm focus:border-secondary-gold focus:outline-none focus:ring-2 focus:ring-secondary-gold/30"></textarea>
          </div>

          <app-button variant="primary" [type]="'submit'">
            {{ 'FORM_SUBMIT' | translate }}
          </app-button>

        </form>
      </div>
        </div>

  </div>
</section>
  `,
  styles: `
    input[type='date']::-webkit-calendar-picker-indicator,
    input[type='time']::-webkit-calendar-picker-indicator {
      opacity: 0.55;
    }
  `,
})
export class ContactBookingSectionComponent {
  
    protected readonly bookingService = inject(BookingService);
 
  contactForm: FormGroup;
  bookingForm: FormGroup;

  constructor() {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required),
    });

    this.bookingForm = new FormGroup({
      coupleName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
      date: new FormControl('', Validators.required),
      time: new FormControl(''),
      location: new FormControl('', Validators.required),
      packageInterest: new FormControl(''),
      details: new FormControl(''),
    });
  }

  onContactSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Contact Form Submitted:', this.contactForm.value);

      this.bookingService
      .submitBooking(this.contactForm.getRawValue() as any)
      .subscribe({
        next: () => this.contactForm.reset(),
        error: () => { /* Errors handled inside service */ },
      });

    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  onBookingSubmit(): void {
    if (this.bookingForm.valid) {
      console.log('Booking Form Submitted:', this.bookingForm.value);
      alert('Thank you for your booking inquiry! We will contact you to confirm the details.');

      this.bookingService
      .submitBooking(this.bookingForm.getRawValue() as any)
      .subscribe({
        next: () => this.contactForm.reset(),
        error: () => { console.error('Error submitting booking form'); },
      });

    } else {
      this.bookingForm.markAllAsTouched();
    }
  }
}
