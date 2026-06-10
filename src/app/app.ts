import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('one-pager');
  protected readonly personalBoxes = [
    { title: 'Box 1', text: 'Inhalt für Box 1' },
    { title: 'Box 2', text: 'Inhalt für Box 2' },
    { title: 'Box 3', text: 'Inhalt für Box 3' },
  ];
  protected readonly posts = [
    { title: 'Box 1', text: 'Inhalt für Box 1' },
    { title: 'Box 2', text: 'Inhalt für Box 2' },
    { title: 'Box 3', text: 'Inhalt für Box 3' },
  ]
}
