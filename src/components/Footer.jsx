'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icons from './Icons';
import { ROUTES } from '@/lib/constants';
import styles from './Footer.module.css';

/*
  The footer lists every route except the two reached from the navbar instead:
  the home page (the wordmark) and /work.

  Sourced from ROUTES rather than written out, so a label cannot drift between
  the footer, the navbar's centred gallery title and the 404 page - which is
  exactly what happened when /live became "Live Music" and only the footer
  still said "Live". ROUTES order is the display order.
*/
const NAVBAR_ONLY = new Set(['/', '/work']);
const footerRoutes = ROUTES.filter((route) => !NAVBAR_ONLY.has(route.path));

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (isHome) {
    return null;
  }

  const isActive = (path) => pathname === path;

  return (
    <footer className={styles.footer}>
      <div className={styles.pageSection}>
        {footerRoutes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={`${styles.pages} ${isActive(route.path) ? styles.footerActive : ''}`}
          >
            {route.label}
          </Link>
        ))}
      </div>
      <div className={styles.pageSection}>
        <Icons className={styles.footerIcons} />
      </div>
      <p className={styles.copyright}>
        Copyright © {new Date().getFullYear()} All Rights Reserved.
      </p>
    </footer>
  );
}
