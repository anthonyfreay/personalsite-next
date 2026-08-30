'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import Icons from './Icons';
import { ROUTES } from '@/lib/constants';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/work', label: 'WORK' },
  { href: '/contact', label: 'CONTACT' },
];

/*
  The gallery routes, which get their name shown in the middle of the navbar
  and fill the Work dropdown. Everything in ROUTES except the pages that are
  not galleries.
*/
const NON_GALLERY = new Set(['/', '/work', '/contact']);
const galleryRoutes = ROUTES.filter((route) => !NON_GALLERY.has(route.path));
const galleryLabel = (pathname) =>
  NON_GALLERY.has(pathname)
    ? null
    : galleryRoutes.find((route) => route.path === pathname)?.label ?? null;

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const label = galleryLabel(pathname);
  const [open, setOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const workRef = useRef(null);

  /*
    The dropdown opens on hover, so it also has to close on the two things a
    mouse user never does: Escape, and a click somewhere else.
  */
  useEffect(() => {
    if (!workOpen) {
      return;
    }

    const onPointerDown = (event) => {
      if (workRef.current && !workRef.current.contains(event.target)) {
        setWorkOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setWorkOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [workOpen]);

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

  const isGallery = galleryRoutes.some((route) => route.path === pathname);

  /*
    No dropdown on /work itself. The tile grid on that page already lists every
    gallery, larger and with a photograph attached, so a menu of the same seven
    names is a worse copy of what the user is already looking at. WORK stays in
    the bar as the current page, without a disclosure.
  */
  const showWorkMenu = pathname !== '/work';

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
        {/*
          WORK stays a link to /work - the tile grid is still a real page - but
          it now also opens the galleries directly. Before this, moving from
          /live to /cars meant going back to /work first, or scrolling to the
          footer. The footer did that job badly; this does it properly.
        */}
        <div
          ref={workRef}
          className={styles.workMenu}
          onMouseEnter={showWorkMenu ? () => setWorkOpen(true) : undefined}
          onMouseLeave={showWorkMenu ? () => setWorkOpen(false) : undefined}
        >
          {/*
            WORK is a button, not a link, wherever the menu exists. Hover is not
            available on touch, so if it navigated on tap the dropdown would be
            unreachable on every phone and tablet - the tap would land on /work
            before the menu ever opened.

            On /work itself there is no menu, so it degrades to a plain current
            label rather than a button that does nothing.
          */}
          {showWorkMenu ? (
            <>
              <button
                type="button"
                className={`${styles.navItem} ${styles.workTrigger} ${
                  isGallery ? styles.activeNavLink : ''
                }`}
                onClick={() => setWorkOpen((value) => !value)}
                aria-expanded={workOpen}
                aria-controls="work-galleries"
              >
                WORK
                <ChevronDown size={16} aria-hidden="true" className={styles.workChevron} />
              </button>

              <div
                id="work-galleries"
                className={`${styles.dropdown} ${workOpen ? styles.dropdownOpen : ''}`}
              >
                {galleryRoutes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    className={`${styles.dropdownItem} ${
                      pathname === route.path ? styles.dropdownItemCurrent : ''
                    }`}
                    onClick={() => setWorkOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <span className={`${styles.navItem} ${styles.activeNavLink}`}>WORK</span>
          )}
        </div>

        <Link
          href="/contact"
          className={`${styles.navItem} ${
            pathname === '/contact' ? styles.activeNavLink : ''
          }`}
          onClick={() => setWorkOpen(false)}
        >
          CONTACT
        </Link>
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

          {/*
            No disclosure on mobile - the sheet has the room, and the galleries
            are the reason most people open this menu at all. Dropped on /work
            for the same reason as the desktop dropdown: the tiles below are
            already this list.
          */}
          {showWorkMenu && (
            <div className={styles.mobileGalleries}>
              {galleryRoutes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className={`${styles.mobileGalleryItem} ${
                    pathname === route.path ? styles.dropdownItemCurrent : ''
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
