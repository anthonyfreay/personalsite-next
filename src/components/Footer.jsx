'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icons from './Icons';
import styles from './Footer.module.css';

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
        <Link
          href="/live"
          className={`${styles.pages} ${isActive('/live') ? styles.footerActive : ''}`}
        >
          Live
        </Link>
        <Link
          href="/bw"
          className={`${styles.pages} ${isActive('/bw') ? styles.footerActive : ''}`}
        >
          B & W
        </Link>
        <Link
          href="/people"
          className={`${styles.pages} ${isActive('/people') ? styles.footerActive : ''}`}
        >
          People
        </Link>
        <Link
          href="/places"
          className={`${styles.pages} ${isActive('/places') ? styles.footerActive : ''}`}
        >
          Places
        </Link>
        <Link
          href="/cars"
          className={`${styles.pages} ${isActive('/cars') ? styles.footerActive : ''}`}
        >
          Cars
        </Link>
        <Link
          href="/events"
          className={`${styles.pages} ${isActive('/events') ? styles.footerActive : ''}`}
        >
          Events
        </Link>
        <Link
          href="/contact"
          className={`${styles.pages} ${isActive('/contact') ? styles.footerActive : ''}`}
        >
          Contact
        </Link>
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
