import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SocialLink } from '../../models/content';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  readonly socials = input.required<readonly SocialLink[]>();
}
