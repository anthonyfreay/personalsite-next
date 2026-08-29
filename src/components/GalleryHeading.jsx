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
 * navigation.
 */
export default function GalleryHeading({ path, title }) {
  const label = ROUTES.find((route) => route.path === path)?.label;

  return (
    <h1 className={styles.heading}>
      {label ?? title}
      {label && <span className="sr-only"> — {title}</span>}
    </h1>
  );
}
