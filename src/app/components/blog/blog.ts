import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Post } from '../../models/content';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.html',
  styleUrl: './blog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog {
  readonly posts = input.required<readonly Post[]>();
}
