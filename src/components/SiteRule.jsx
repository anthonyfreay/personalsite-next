'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icons from './Icons';
import styles from './SiteRule.module.css';

/*
  The one-line rule that replaced the footer.

  The old footer listed every gallery a second time - the same seven names the
  /work tiles directly above it already carried - and repeated the five social
  icons from the home navbar, under a black slab in a green that appeared
  nowhere else on the site. Its only unique jobs were the social links, the
  résumé and the copyright, and those fit on one line.

  Gallery-to-gallery navigation did not disappear with it: it moved into the
  navbar's Work dropdown, which does that job properly rather than as a side
  effect of scrolling to the bottom.

  Hidden on the home page, which is a full-bleed hero and owns its own footer
  space - same rule the old footer followed.
*/
export default function SiteRule() {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  return (
    <div className={styles.rule}>
      <span className={styles.status}>New York, NY — booking now</span>

      <div className={styles.links}>
        <Link
          href="/contact"
          className={`${styles.textLink} ${pathname === '/contact' ? styles.current : ''}`}
        >
          Contact
        </Link>
        <a
          href="/resume"
          className={styles.textLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Résumé
        </a>

        {/*
          The résumé already has a text link here, so the icon row drops its
          duplicate. The home navbar keeps all five, where there is no text.
        */}
        <Icons iconSize={17} className={styles.icons} gap="" showResume={false} />

        <span className={styles.copyright}>© {new Date().getFullYear()}</span>
      </div>
    </div>
  );
}
