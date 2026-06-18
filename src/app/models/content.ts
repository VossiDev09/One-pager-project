/** A navigation entry that links to an in-page section by element id. */
export interface NavLink {
  readonly id: string;
  readonly label: string;
}

/** A short informational card shown in the "about" grid. */
export interface InfoCard {
  readonly title: string;
  readonly text: string;
}

/** A blog post teaser. */
export interface Post {
  readonly title: string;
  readonly text: string;
}

/** An external social-media link. */
export interface SocialLink {
  readonly label: string;
  readonly url: string;
}
