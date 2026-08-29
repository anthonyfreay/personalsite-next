'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Icons from './Icons';
import { ROUTES } from '@/lib/constants';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/work', label: 'WORK' },
  { href: '/contact', label: 'CONTACT' },
];

/*
  The gallery routes, which get their name shown in the middle of the navbar.
  Everything in ROUTES except the pages that are not galleries.
*/
const NON_GALLERY = new Set(['/', '/work', '/contact']);
const galleryLabel = (pathname) =>
  NON_GALLERY.has(pathname)
    ? null
    : ROUTES.find((route) => route.path === pathname)?.label ?? null;

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const label = galleryLabel(pathname);
  const [open, setOpen] = useState(false);

  if (isHome) {
    return (
      <nav className={styles.homeNavbar}>
        <Link href="/" className={`${styles.homeBrand} no-underline`}>
          ANTHONY FREAY
        </Link>

        <div className={styles.homeNavIconsWrapper}>
          <Icons iconSize={15} className={styles.homeNavIcons} gap="" />
        </div>

        <Link href="/work" className="no-underline">
          <button className={styles.homeEnterButton}>Enter</button>
        </Link>
      </nav>
    );
  }

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={`${styles.brand} no-underline`}>
        ANTHONY FREAY
      </Link>

      {/*
        The gallery name, centred in the bar. aria-hidden because the page's
        own <h1> already announces the gallery - this is the visible treatment
        of that same title, not a second one. Below 800px it is hidden and the
        h1 becomes visible above the grid instead, where the longer labels have
        room the navbar cannot give them.
      */}
      {label && (
        <span className={styles.galleryTitle} aria-hidden="true">
          {label}
        </span>
      )}

      <div className={styles.navContainer}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.navItem} ${pathname === link.href ? styles.activeNavLink : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <button
        className={styles.toggle}
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ''}`}>
        <div className={`${styles.mobileMenuInner} ${open ? styles.mobileMenuExpanded : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileNavItem} ${pathname === link.href ? styles.activeNavLink : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
