import { DOCUMENT, Injectable, inject } from '@angular/core';

const HEADER_SELECTOR = '.site-header';

const SCROLL_OFFSET_PX = 16;
@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly document = inject(DOCUMENT);

  scrollToSection(sectionId: string): void {
    const view = this.document.defaultView;
    const target = this.document.getElementById(sectionId);
    if (!view || !target) {
      return;
    }

    const header = this.document.querySelector(HEADER_SELECTOR);
    const headerHeight = header instanceof HTMLElement ? header.offsetHeight : 0;
    const top =
      target.getBoundingClientRect().top + view.scrollY - headerHeight - SCROLL_OFFSET_PX;
    const reduceMotion = view.matchMedia('(prefers-reduced-motion: reduce)').matches;

    view.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
    view.history.replaceState(null, '', `#${sectionId}`);
  }
}
