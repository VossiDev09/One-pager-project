import { DOCUMENT, Injectable, inject } from '@angular/core';

/** Selector of the sticky header whose height offsets the scroll target. */
const HEADER_SELECTOR = '.site-header';

/** Extra breathing room above the target after accounting for the header. */
const SCROLL_OFFSET_PX = 16;

/**
 * Smoothly scrolls to an in-page section, compensating for the sticky header
 * and honouring the user's reduced-motion preference. Goes through the
 * injected `DOCUMENT` (and its `defaultView`) rather than the global
 * `document`/`window`, so it stays testable and safe outside the browser.
 */
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
