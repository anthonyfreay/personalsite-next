import { ROUTES } from '@/lib/constants';
import styles from './GalleryHeading.module.css';

/**
 * The visible title above a gallery grid.
 *
 * One `<h1>` serves both audiences rather than two competing ones. Sighted
 * users see the short nav label ("Live"), and the longer descriptive title
 * that used to be the sr-only heading ("Concert Photography") stays in the
 * accessible name via an sr-only span. That keeps the phrasing search engines
 * and screen readers were already getting, without printing SEO copy at the
 * top of a photo grid, and avoids a second h1 on the page.
 *
 * The label is sourced from ROUTES so the heading, navbar and footer cannot
 * drift apart; `title` remains per-route because it is descriptive copy, not
 * navigation. A route may set `heading` to present its title differently from
 * its nav label - /live is "live music" here but "Live" in the footer.
 */
export default function GalleryHeading({ path, title }) {
  const route = ROUTES.find((route) => route.path === path);
  // A route's own `heading` wins over its nav label, and is printed verbatim
  // so the casing it declares survives the uppercase treatment.
  const shown = route?.heading ?? route?.label;

  return (
    <h1 className={`${styles.heading} ${route?.heading ? styles.verbatim : ''}`}>
      {shown ?? title}
      {shown && <span className="sr-only"> — {title}</span>}
    </h1>
  );
}
