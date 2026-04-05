import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-video',
  standalone: true,
  template: `
    <div class="video-container">
      @if (videoUrl) {
        <iframe
          [src]="videoUrl"
          title="YouTube Wedding Chapel"
          width="560"
          height="315"
          loading="lazy"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen></iframe>
      }
    </div>
  `,
  styles: [`
    .video-container {
      position: relative;
      width: 100%;
      margin: auto;
      aspect-ratio: 16/9;
    }
    iframe, img {
      width: 100%;
      height: 100%;
      border-radius: 12px;
    }
    .thumbnail {
      position: relative;
      cursor: pointer;
    }
    .play-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 3rem;
      color: white;
      background: rgba(0,0,0,0.6);
      padding: 10px 20px;
      border-radius: 50%;
    }
  `]
})
export class YoutubeVideoComponent implements OnChanges {
  @Input() videoId = '';

  /** Cached so change detection does not assign a new [src] and reload the iframe. */
  videoUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['videoId']) {
      return;
    }
    const id = this.videoId.split('?')[0].trim();
    this.videoUrl = id
      ? this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${id}?autoplay=1`,
        )
      : null;
  }
}