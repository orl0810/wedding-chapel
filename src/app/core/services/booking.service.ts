// src/app/core/services/booking.service.ts

import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, throwError } from 'rxjs';

// ============================================================
// Types
// ============================================================

export interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  date: string;
  location: string;
  package: string;
  message?: string;
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  error?: string;
  errors?: Array<{ field: string; message: string }>;
}

export type BookingStatus = 'idle' | 'loading' | 'success' | 'error';

// ============================================================
// Service
// ============================================================

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly http = inject(HttpClient);

  // --- Signals ---
  // WHY Signals: Reactive state without RxJS overhead for simple UI states.
  readonly status = signal<BookingStatus>('idle');
  readonly errorMessage = signal<string | null>(null);
  readonly fieldErrors = signal<Record<string, string>>({});
  readonly bookingId = signal<string | null>(null);

  // Derived state — no need for separate boolean signals
  readonly isLoading = computed(() => this.status() === 'loading');
  readonly isSuccess = computed(() => this.status() === 'success');
  readonly hasError  = computed(() => this.status() === 'error');

  submitBooking(payload: BookingPayload) {
    // Reset state before new submission
    this.status.set('loading');
    this.errorMessage.set(null);
    this.fieldErrors.set({});
    this.bookingId.set(null);

    return this.http
      .post<BookingResponse>(environment.bookingFunctionUrl, payload)
      .pipe(
        tap((response) => {
          if (response.success) {
            this.status.set('success');
            this.bookingId.set(response.bookingId ?? null);
          }
        }),
        catchError((err: HttpErrorResponse) => {
          this.status.set('error');

          // Field-level validation errors from Edge Function (400)
          if (err.status === 400 && err.error?.errors) {
            const fieldMap: Record<string, string> = {};
            for (const e of err.error.errors) {
              fieldMap[e.field] = e.message;
            }
            this.fieldErrors.set(fieldMap);
            this.errorMessage.set('Please fix the errors below.');
          } else {
            // Generic server error
            this.errorMessage.set(
              err.error?.error ?? 'Something went wrong. Please try again.'
            );
          }

          return throwError(() => err);
        })
      );
  }

  reset() {
    this.status.set('idle');
    this.errorMessage.set(null);
    this.fieldErrors.set({});
    this.bookingId.set(null);
  }
}
