import { InfoCard, NavLink, Post, SocialLink } from '../models/content';

/**
 * Static page content. Kept separate from components so copy can change
 * without touching presentation logic. Section ids must match the element
 * ids rendered by the corresponding components for in-page navigation.
 */

export const NAV_LINKS: readonly NavLink[] = [
  { id: 'ueber-mich', label: 'Über mich' },
  { id: 'blog', label: 'Blog' },
  { id: 'start', label: 'Sport Blog' },
  { id: 'links', label: 'Links' },
  { id: 'kontakt', label: 'Kontakt' },
];

export const PERSONAL_BOXES: readonly InfoCard[] = [
  { title: 'Box 1', text: 'Inhalt für Box 1' },
  { title: 'Box 2', text: 'Inhalt für Box 2' },
  { title: 'Box 3', text: 'Inhalt für Box 3' },
];

export const POSTS: readonly Post[] = [
  { title: 'Box 1', text: 'Inhalt für Box 1' },
  { title: 'Box 2', text: 'Inhalt für Box 2' },
  { title: 'Box 3', text: 'Inhalt für Box 3' },
];

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: 'Instagram', url: 'https://www.instagram.com' },
  { label: 'Tiktok', url: 'https://www.tiktok.com' },
  { label: 'Youtube', url: 'https://www.youtube.com' },
];
