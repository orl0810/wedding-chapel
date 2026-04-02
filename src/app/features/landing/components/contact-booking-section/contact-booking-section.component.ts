import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';

@Component({
  selector: 'app-contact-booking-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionTitleComponent, ButtonComponent, TranslatePipe],
  template: `
    <section class="bg-accent-sapphire text-text-light py-20 px-4" aria-labelledby="contact-title">
      <div class="container mx-auto">
        <app-section-title id="contact-title" [title]="'CONTACT_TITLE' | translate" [subtitle]="'CONTACT_SUBTITLE' | translate"></app-section-title>

        <div class="grid md:grid-cols-2 gap-12 mt-12">
          <!-- Contact Form -->
          <div class="bg-primary-cream text-text-dark p-8 rounded-lg shadow-xl animated-section">
            <h3 class="text-3xl font-display font-bold text-accent-sapphire mb-6">{{ 'FORM_CONTACT_TITLE' | translate }}</h3>
            <form [formGroup]="contactForm" (ngSubmit)="onContactSubmit()" class="space-y-6">
              <div>
                <label for="contactName" class="block text-sm font-medium text-gray-700">{{ 'FORM_NAME' | translate }}<span class="text-red-500">*</span></label>
                <input id="contactName" type="text" formControlName="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary-gold focus:ring-secondary-gold bg-white p-2">
                @if (contactForm.get('name')?.invalid && (contactForm.get('name')?.dirty || contactForm.get('name')?.touched)) {
                  <p class="text-red-500 text-sm mt-1">{{ 'FORM_REQUIRED_FIELD' | translate }}</p>
                }
              </div>
              <div>
                <label for="contactEmail" class="block text-sm font-medium text-gray-700">{{ 'FORM_EMAIL' | translate }}<span class="text-red-500">*</span></label>
                <input id="contactEmail" type="email" formControlName="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary-gold focus:ring-secondary-gold bg-white p-2">
                @if (contactForm.get('email')?.invalid && (contactForm.get('email')?.dirty || contactForm.get('email')?.touched)) {
                  @if (contactForm.get('email')?.errors?.['required']) {
                    <p class="text-red-500 text-sm mt-1">{{ 'FORM_REQUIRED_FIELD' | translate }}</p>
                  }
                  @if (contactForm.get('email')?.errors?.['email']) {
                    <p class="text-red-500 text-sm mt-1">{{ 'FORM_INVALID_EMAIL' | translate }}</p>
                  }
                }
              </div>
              <div>
                <label for="contactMessage" class="block text-sm font-medium text-gray-700">{{ 'FORM_DETAILS' | translate }}<span class="text-red-500">*</span></label>
                <textarea id="contactMessage" formControlName="message" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary-gold focus:ring-secondary-gold bg-white p-2"></textarea>
                @if (contactForm.get('message')?.invalid && (contactForm.get('message')?.dirty || contactForm.get('message')?.touched)) {
                  <p class="text-red-500 text-sm mt-1">{{ 'FORM_REQUIRED_FIELD' | translate }}</p>
                }
              </div>
              <app-button type="submit">{{ 'FORM_SUBMIT' | translate }}</app-button>
            </form>
          </div>

          <!-- Booking Form -->
          <div class="bg-primary-cream text-text-dark p-8 rounded-lg shadow-xl animated-section animation-delay-200">
            <h3 class="text-3xl font-display font-bold text-accent-sapphire mb-6">{{ 'FORM_BOOKING_TITLE' | translate }}</h3>
            <form [formGroup]="bookingForm" (ngSubmit)="onBookingSubmit()" class="space-y-6">
              <div>
                <label for="bookingCoupleName" class="block text-sm font-medium text-gray-700">{{ 'FORM_COUPLE_NAME' | translate }}<span class="text-red-500">*</span></label>
                <input id="bookingCoupleName" type="text" formControlName="coupleName" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary-gold focus:ring-secondary-gold bg-white p-2">
                @if (bookingForm.get('coupleName')?.invalid && (bookingForm.get('coupleName')?.dirty || bookingForm.get('coupleName')?.touched)) {
                  <p class="text-red-500 text-sm mt-1">{{ 'FORM_REQUIRED_FIELD' | translate }}</p>
                }
              </div>
              <div>
                <label for="bookingEmail" class="block text-sm font-medium text-gray-700">{{ 'FORM_EMAIL' | translate }}<span class="text-red-500">*</span></label>
                <input id="bookingEmail" type="email" formControlName="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary-gold focus:ring-secondary-gold bg-white p-2">
                @if (bookingForm.get('email')?.invalid && (bookingForm.get('email')?.dirty || bookingForm.get('email')?.touched)) {
                  @if (bookingForm.get('email')?.errors?.['required']) {
                    <p class="text-red-500 text-sm mt-1">{{ 'FORM_REQUIRED_FIELD' | translate }}</p>
                  }
                  @if (bookingForm.get('email')?.errors?.['email']) {
                    <p class="text-red-500 text-sm mt-1">{{ 'FORM_INVALID_EMAIL' | translate }}</p>
                  }
                }
              </div>
              <div>
                <label for="bookingPhone" class="block text-sm font-medium text-gray-700">{{ 'FORM_PHONE' | translate }}</label>
                <input id="bookingPhone" type="tel" formControlName="phone" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary-gold focus:ring-secondary-gold bg-white p-2">
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="bookingDate" class="block text-sm font-medium text-gray-700">{{ 'FORM_DATE' | translate }}<span class="text-red-500">*</span></label>
                  <input id="bookingDate" type="date" formControlName="date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary-gold focus:ring-secondary-gold bg-white p-2">
                  @if (bookingForm.get('date')?.invalid && (bookingForm.get('date')?.dirty || bookingForm.get('date')?.touched)) {
                    <p class="text-red-500 text-sm mt-1">{{ 'FORM_REQUIRED_FIELD' | translate }}</p>
                  }
                </div>
                <div>
                  <label for="bookingTime" class="block text-sm font-medium text-gray-700">{{ 'FORM_TIME' | translate }}</label>
                  <input id="bookingTime" type="time" formControlName="time" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary-gold focus:ring-secondary-gold bg-white p-2">
                </div>
              </div>
              <div>
                <label for="bookingLocation" class="block text-sm font-medium text-gray-700">{{ 'FORM_LOCATION' | translate }}<span class="text-red-500">*</span></label>
                <input id="bookingLocation" type="text" formControlName="location" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary-gold focus:ring-secondary-gold bg-white p-2">
                @if (bookingForm.get('location')?.invalid && (bookingForm.get('location')?.dirty || bookingForm.get('location')?.touched)) {
                  <p class="text-red-500 text-sm mt-1">{{ 'FORM_REQUIRED_FIELD' | translate }}</p>
                }
              </div>
              <div>
                <label for="bookingPackage" class="block text-sm font-medium text-gray-700">{{ 'FORM_PACKAGE_INTEREST' | translate }}</label>
                <select id="bookingPackage" formControlName="packageInterest" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary-gold focus:ring-secondary-gold bg-white p-2">
                  <option value="">{{ 'FORM_SELECT_PACKAGE' | translate }}</option>
                  <option value="intimate">{{ 'PACKAGE_INTIMATE_TITLE' | translate }}</option>
                  <option value="signature">{{ 'PACKAGE_SIGNATURE_TITLE' | translate }}</option>
                  <option value="premium">{{ 'PACKAGE_PREMIUM_TITLE' | translate }}</option>
                </select>
              </div>
              <div>
                <label for="bookingDetails" class="block text-sm font-medium text-gray-700">{{ 'FORM_DETAILS' | translate }}</label>
                <textarea id="bookingDetails" formControlName="details" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary-gold focus:ring-secondary-gold bg-white p-2"></textarea>
              </div>
              <app-button type="submit">{{ 'FORM_SUBMIT' | translate }}</app-button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    input[type="date"]::-webkit-calendar-picker-indicator {
      filter: invert(40%) sepia(30%) saturate(600%) hue-rotate(340deg) brightness(80%) contrast(80%);
    }
    input[type="time"]::-webkit-calendar-picker-indicator {
      filter: invert(40%) sepia(30%) saturate(600%) hue-rotate(340deg) brightness(80%) contrast(80%);
    }
  `
})
export class ContactBookingSectionComponent {
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
      alert('Thank you for your message! We will get back to you soon.');
      this.contactForm.reset();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  onBookingSubmit(): void {
    if (this.bookingForm.valid) {
      console.log('Booking Form Submitted:', this.bookingForm.value);
      alert('Thank you for your booking inquiry! We will contact you to confirm the details.');
      this.bookingForm.reset();
    } else {
      this.bookingForm.markAllAsTouched();
    }
  }
}
