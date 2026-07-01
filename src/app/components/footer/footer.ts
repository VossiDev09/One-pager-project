import { ChangeDetectionStrategy, Component } from '@angular/core';

type FooterEntry = {
  title: string;
  content: string[];
};

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly entries: readonly FooterEntry[] = [
    {
      title: 'Impressum',
      content: [
        'Telefon: 01234 / 567890',
        'E-Mail: Tim.Vosshans@csbme.de',
      ],
    },
    {
      title: 'Datenschutz',
      content: [
        'Wir verarbeiten Ihre Daten nur zur Bearbeitung Ihrer Anfrage.',
        'Ihre Informationen werden nicht an Dritte weitergegeben.',
        'Sie können jederzeit Auskunft über gespeicherte Daten verlangen.',
      ],
    },
  ];

  protected activeEntry: string | null = 'Impressum';

  protected get activeEntryData(): FooterEntry | null {
    return this.entries.find((entry) => entry.title === this.activeEntry) ?? null;
  }

  protected toggleEntry(title: string): void {
    this.activeEntry = this.activeEntry === title ? null : title;
  }
}
