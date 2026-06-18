import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NAV_LINKS } from '../../data/site-content';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly scrollService = inject(ScrollService);

  protected readonly links = NAV_LINKS;

  protected navigate(event: Event, sectionId: string): void {
    event.preventDefault();
    this.scrollService.scrollToSection(sectionId);
  }
}
