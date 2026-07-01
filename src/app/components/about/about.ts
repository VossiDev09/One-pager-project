import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { InfoCard } from '../../models/content';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  readonly cards = input.required<readonly InfoCard[]>();
}
