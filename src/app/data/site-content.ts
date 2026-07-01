import { InfoCard, NavLink, Post, SocialLink } from '../models/content';

export const NAV_LINKS: readonly NavLink[] = [
  { id: 'ueber-mich', label: 'Über mich' },
  { id: 'blog', label: 'Blog' },
  { id: 'start', label: 'Sport Blog' },
  { id: 'links', label: 'Links' },
  { id: 'kontakt', label: 'Kontakt' },
];

export const PERSONAL_BOXES: readonly InfoCard[] = [
  {
    title: '🥇 Erster Sieg im BMX',
    text: 'In der Saison 2023 gewann ich mein erstes BMX-Rennen in der Altersklasse 13/14.',
  },
  {
    title: '🏆 Erster Cupsieg',
    text: 'In derselben Saison wurde ich dann OWL-Meister.',
  },
  {
    title: '🏃 Erster Lauf',
    text: '2026 startete ich mit dem Lauftraining und steigerte mich innerhalb von zwei Monaten von 2 km auf 9 km.',
  },
];

export const POSTS: readonly Post[] = [
  { title: 'Erster Lauf', text: 'Bei meinem ersten Lauf bin ich 2,7 km durchgelaufen mit einer Geschwindigkeit von 5:50/km und habe trotz Lungenschmerzen nicht aufgehört.' },
  { title: 'Erstes Mal über 5 km', text: 'Mein zweiter Meilenstein: mein erster Lauf über 5 km. Ich schaffte eine Gesamtstrecke von 7,5 km, war aber deutlich langsamer (6:30/km) und musste wegen Schmerzen im Fuß aufhören, nicht wegen der Ausdauer.' },
  { title: 'Erster <10-km-Lauf', text: 'Bei meinem ersten Lauf über 10 km bin ich 12 km gelaufen bei einer Geschwindigkeit von 6:20/km. Leider suche ich immer noch nach einer Lösung für meine starken Fußschmerzen.' },
];

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: 'Instagram', url: 'https://www.instagram.com' },
  { label: 'Tiktok', url: 'https://www.tiktok.com' },
  { label: 'Youtube', url: 'https://www.youtube.com' },
];
