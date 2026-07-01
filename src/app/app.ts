import { Component } from '@angular/core';
import { About } from './components/about/about';
import { Blog } from './components/blog/blog';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { PERSONAL_BOXES, POSTS, SOCIAL_LINKS } from './data/site-content';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Hero, About, Blog, Contact, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly personalBoxes = PERSONAL_BOXES;
  protected readonly posts = POSTS;
  protected readonly socialLinks = SOCIAL_LINKS;
}
