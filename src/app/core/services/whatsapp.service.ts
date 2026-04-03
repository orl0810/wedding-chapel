import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  private readonly phone = '13058703010';

  buildUrl(message?: string): string {
    const encoded = encodeURIComponent(
      message ??
        "Hi! I'm interested in booking a wedding ceremony in Miami. Could you share availability?"
    );
    return `https://wa.me/${this.phone}?text=${encoded}`;
  }

  buildBookingUrl(name: string, date: string, pkg: string): string {
    const msg = `Hi Juan Carlos! My name is ${name}. I'd like to book the ${pkg} package for ${date}. Please let me know your availability!`;
    return this.buildUrl(msg);
  }
}
