'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/constants';
import { Menu, X } from 'lucide-react';
import Icons from './Icons';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/work', label: 'WORK' },
  { href: '/contact', label: 'CONTACT' },
];

// The six galleries that sit under Work, taken from the shared route table so
// adding a gallery there surfaces it here too.
const galleryLinks = ROUTES.filter(
  (route) => !['/', '/work', '/contact'].includes(route.path)
);
const galleryPaths = galleryLinks.map((route) => route.path);

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);
  const inWorkSection = pathname === '/work' || galleryPaths.includes(pathname);

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

      <div className={styles.navContainer}>
        {navLinks.map((link) =>
          link.href === '/work' && inWorkSection ? (
            // Inside the Work section, WORK also reveals the galleries. Opening
            // is driven by :hover and :focus-within in CSS rather than React
            // state, so it works for keyboard users and needs no hydration.
            <div key={link.href} className={styles.workGroup}>
              <Link
                href={link.href}
                className={`${styles.navItem} ${
                  pathname === link.href ? styles.activeNavLink : ''
                }`}
                aria-haspopup="true"
              >
                {link.label}
              </Link>

              <div className={styles.galleryPanel}>
                <ul className={styles.galleryList}>
                  {galleryLinks.map((route, i) => (
                    <li
                      key={route.path}
                      className={styles.galleryItem}
                      style={{ transitionDelay: `${40 + i * 35}ms` }}
                    >
                      <Link
                        href={route.path}
                        className={`${styles.galleryLink} ${
                          pathname === route.path ? styles.galleryLinkActive : ''
                        }`}
                      >
                        {route.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navItem} ${
                pathname === link.href ? styles.activeNavLink : ''
              }`}
            >
              {link.label}
            </Link>
          )
        )}
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
