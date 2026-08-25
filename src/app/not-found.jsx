import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import styles from './not-found.module.css';

export const metadata = {
  title: 'Page Not Found | Anthony Freay',
  description: 'The page you are looking for could not be found.',
  robots: { index: false, follow: true },
};

const galleryRoutes = ROUTES.filter(
  (route) => route.path !== '/' && route.path !== '/work' && route.path !== '/contact'
);

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.lead}>This page could not be found.</p>
      <p className={styles.body}>
        The link may be out of date, or the page may have moved. You can browse the
        photography portfolio below, or head back to the homepage.
      </p>

      <div className={styles.primaryLinks}>
        <Link href="/">Home</Link>
        <Link href="/work">Work</Link>
        <Link href="/contact">Contact</Link>
      </div>

      <div className={styles.galleryLinks}>
        {galleryRoutes.map((route) => (
          <Link key={route.path} href={route.path}>
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
