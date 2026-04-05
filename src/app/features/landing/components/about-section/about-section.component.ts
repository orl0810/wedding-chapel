import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../shared/pipes/translate/translate.pipe';
import { RevealOnScrollDirective } from '../../../../shared/directives/reveal-on-scroll.directive';
import { SectionTitleComponent } from "../../../../shared/components/section-title/section-title.component";
import { YoutubeVideoComponent } from "../../../../shared/components/youtube-video/youtube-video.component";

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule, TranslatePipe, RevealOnScrollDirective, SectionTitleComponent, YoutubeVideoComponent],
  template: `
    <section id="about" class="bg-wix-warm py-20 md:py-28 px-4 border-b border-black/[0.06]" aria-label="About">
      <div class="container mx-auto max-w-6xl">
        <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div appReveal class="order-2 md:order-1 space-y-6 md:space-y-8 text-text-dark">

          <app-section-title
          id="about-title"
          [title]="'ABOUT_TITLE' | translate"
          [wide]="true" />
          
            <p class="text-base md:text-lg leading-relaxed font-body text-text-dark/95">
              {{ 'ABOUT_P1' | translate }}
            </p>
            <p class="text-base md:text-lg leading-relaxed font-body text-text-dark/95">
              {{ 'ABOUT_P2' | translate }}
            </p>
            <p class="text-base md:text-lg leading-relaxed font-body text-text-dark/95 italic border-l-4 border-secondary-gold/80 pl-5">
              {{ 'ABOUT_P3' | translate }}
            </p>
          </div>
          <div appReveal class="order-1 md:order-2 flex justify-center reveal-delay-1">
              <app-youtube-video class="max-w-full object-cover border border-black/10 w-full transition-transform duration-700 ease-out" videoId="5VYZgXbb6I4"></app-youtube-video>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutSectionComponent {}
