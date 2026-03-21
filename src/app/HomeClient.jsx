'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icons from '@/components/Icons';
import styles from './HomeClient.module.css';

// tone: 'light' = bright image (navbar should use dark text)
// tone: 'dark'  = dark image (navbar should use light text)
// fit:  'all'     = works on all viewports
// fit:  'desktop' = only show on desktop/large viewports
// fit:  'mobile'  = only show on mobile/small viewports
const HERO_IMAGES = [
  { id: 'A7401065', tone: 'dark', fit: 'all' },
  { id: 'A7401198', tone: 'dark', fit: 'all' },
  { id: 'A7401678', tone: 'dark', fit: 'all' },
  { id: 'A7403629', tone: 'dark', fit: 'all' },
  { id: 'A7406572', tone: 'dark', fit: 'desktop' },
  { id: 'DSC02013', tone: 'dark', fit: 'desktop' },
  { id: 'A7407224', tone: 'dark', fit: 'all' },
  { id: 'A7404001', tone: 'dark', fit: 'desktop' },
  { id: 'A7402016', tone: 'light', fit: 'all' },
  { id: 'A7401863', tone: 'light', fit: 'all' },
  { id: 'DSC05693', tone: 'dark', fit: 'all' },
  { id: 'A7403664', tone: 'dark', fit: 'desktop' },
  { id: 'A7407848', tone: 'dark', fit: 'desktop' },
];

const FADE_DURATION = 800;
const SLIDE_INTERVAL = 5000;

const getImageUrl = (imageId, size) => {
  return `/home/${size}-wallpaper-${imageId}-20260213.webp`;
};

const getResponsiveSize = () => {
  if (typeof window === 'undefined') return 'compressed';
  const width = window.innerWidth;
  if (width > 1368) return 'full';
  if (width > 842) return 'large';
  return 'large';
};

const isMobile = (width) => width <= 842;

const buildPlaylist = (width) =>
  HERO_IMAGES.filter((img) => {
    if (img.fit === 'desktop') return !isMobile(width);
    if (img.fit === 'mobile') return isMobile(width);
    return true;
  });

export default function HomeClient() {
  const [currentTone, setCurrentTone] = useState(HERO_IMAGES[0]?.tone || 'dark');
  const initialSrc = getImageUrl(HERO_IMAGES[0].id, 'compressed');
  const topLayerRef = useRef(null);
  const middleLayerRef = useRef(null);
  const bottomLayerRef = useRef(null);
  const indexRef = useRef(0);
  const sizeRef = useRef('compressed');
  const widthRef = useRef(1024);
  const playlistRef = useRef(HERO_IMAGES);
  const timerRef = useRef(null);
  const navRef = useRef(null);
  const fadingRef = useRef(false);

  // Home page setup: dark theme, scroll lock
  useEffect(() => {
    const root = document?.documentElement;
    if (!root) return undefined;

    root.classList.add('home-dark');

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#090909');
    }

    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalWidth = document.body.style.width;
    const originalHeight = document.body.style.height;

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';

    return () => {
      root.classList.remove('home-dark');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#F5F5F5');
      }
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = originalWidth;
      document.body.style.height = originalHeight;
    };
  }, []);

  // Navbar tone class
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('hero-tone-light', 'hero-tone-dark');
    root.classList.add(`hero-tone-${currentTone}`);
    return () => {
      root.classList.remove('hero-tone-light', 'hero-tone-dark');
    };
  }, [currentTone]);

  // Slideshow engine
  // 3 layers: ring[0] = top (z-index 3), ring[1] = middle (z-index 2), ring[2] = bottom (z-index 1)
  // Current image is always ring[0]. Next image is pre-loaded in ring[1].
  // Crossfade = fade out ring[0], revealing ring[1]. Then rotate: [1,2,0] and load next into new ring[1].
  useEffect(() => {
    const layers = [topLayerRef.current, middleLayerRef.current, bottomLayerRef.current];
    if (layers.some((l) => !l)) return;

    // ring[i] = index into layers array. ring[0] is the topmost visible layer.
    let ring = [0, 1, 2];

    const setZOrder = () => {
      layers[ring[0]].style.zIndex = '3';
      layers[ring[1]].style.zIndex = '2';
      layers[ring[2]].style.zIndex = '1';
    };

    // Initialize
    const sz = getResponsiveSize();
    const width = window.innerWidth;
    sizeRef.current = sz;
    widthRef.current = width;
    playlistRef.current = buildPlaylist(width);
    const pl = playlistRef.current;

    // All layers start fully opaque
    layers.forEach((l) => { l.style.opacity = '1'; l.style.transition = 'none'; });
    setZOrder();

    if (pl.length) {
      layers[ring[0]].src = getImageUrl(pl[0].id, sz);
      indexRef.current = 0;
      // Pre-load next image into ring[1]
      if (pl.length > 1) {
        layers[ring[1]].src = getImageUrl(pl[1].id, sz);
        layers[ring[1]].style.opacity = '0';
      }
    }

    const scheduleNext = () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const p = playlistRef.current;
        if (p.length < 2) return;
        const nextIdx = (indexRef.current + 1) % p.length;
        crossfadeTo(nextIdx);
      }, SLIDE_INTERVAL);
    };

    const crossfadeTo = (idx) => {
      if (fadingRef.current) return;
      clearTimeout(timerRef.current);
      fadingRef.current = true;

      const p = playlistRef.current;
      if (!p.length) { fadingRef.current = false; return; }
      indexRef.current = idx;
      setCurrentTone(p[idx]?.tone || 'dark');

      const topLayer = layers[ring[0]];
      // Ensure ring[1] is visible before fading out ring[0]
      layers[ring[1]].style.opacity = '1';
      // ring[1] already has the next image loaded — just fade out ring[0]
      topLayer.style.transition = `opacity ${FADE_DURATION}ms ease-in-out`;
      topLayer.style.opacity = '0';

      const onDone = () => {
        topLayer.removeEventListener('transitionend', onDone);
        // Reset the faded-out layer
        topLayer.style.transition = 'none';
        topLayer.style.opacity = '1';

        // Rotate ring: [0,1,2] → [1,2,0]
        ring = [ring[1], ring[2], ring[0]];
        setZOrder();

        fadingRef.current = false;

        // Pre-load the NEXT next image into ring[1] (which is now the middle layer)
        const nextNextIdx = (indexRef.current + 1) % p.length;
        layers[ring[1]].src = getImageUrl(p[nextNextIdx].id, sizeRef.current);
        layers[ring[1]].style.opacity = '0';

        scheduleNext();
      };

      topLayer.addEventListener('transitionend', onDone, { once: true });
    };

    const hardCutTo = (idx) => {
      clearTimeout(timerRef.current);
      fadingRef.current = false;

      const p = playlistRef.current;
      if (!p.length) return;
      indexRef.current = idx;
      setCurrentTone(p[idx]?.tone || 'dark');

      // Reset all layers
      layers.forEach((l) => { l.style.transition = 'none'; l.style.opacity = '1'; });
      ring = [0, 1, 2];
      setZOrder();

      // Set current image on top
      layers[ring[0]].src = getImageUrl(p[idx].id, sizeRef.current);
      // Pre-load next
      const nextIdx = (idx + 1) % p.length;
      layers[ring[1]].src = getImageUrl(p[nextIdx].id, sizeRef.current);
      layers[ring[1]].style.opacity = '0';

      scheduleNext();
    };

    navRef.current = { crossfadeTo, hardCutTo };
    scheduleNext();

    const handleResize = () => {
      const newSz = getResponsiveSize();
      const width = window.innerWidth;
      sizeRef.current = newSz;
      widthRef.current = width;
      playlistRef.current = buildPlaylist(width);
      if (indexRef.current >= playlistRef.current.length) indexRef.current = 0;
      hardCutTo(indexRef.current);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Click left half → previous (hard cut), right half → next (hard cut)
  const handleClick = (e) => {
    if (e.target.closest('a, button')) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pl = playlistRef.current;
    if (!pl.length || !navRef.current) return;

    if (x < rect.width / 2) {
      const prevIdx = (indexRef.current - 1 + pl.length) % pl.length;
      navRef.current.hardCutTo(prevIdx);
    } else {
      const nextIdx = (indexRef.current + 1) % pl.length;
      navRef.current.hardCutTo(nextIdx);
    }
  };

  return (
    <div
      className={`relative w-screen h-screen bg-brand-dark flex flex-col overflow-hidden ${styles.main} ${styles.animateFadeInPage}`}
      onClick={handleClick}
      role="presentation"
    >
      <Image
        ref={topLayerRef}
        src={initialSrc}
        alt=""
        fill
        sizes="100vw"
        className={`absolute inset-0 w-full h-full object-cover ${styles.bgLayer}`}
        priority
        decoding="async"
      />
      <Image
        ref={middleLayerRef}
        src={initialSrc}
        alt=""
        fill
        sizes="100vw"
        className={`absolute inset-0 w-full h-full object-cover ${styles.bgLayer}`}
        loading="eager"
        decoding="async"
      />
      <Image
        ref={bottomLayerRef}
        src={initialSrc}
        alt=""
        fill
        sizes="100vw"
        className={`absolute inset-0 w-full h-full object-cover ${styles.bgLayer}`}
        loading="eager"
        decoding="async"
      />
      <div className={`absolute inset-0 ${styles.gradientOverlay}`} />
      <div
        className={`flex flex-col flex-1 overflow-hidden ${styles.overlay} ${styles.animateFadeInDown}`}
      >
      </div>
    </div>
  );
}
