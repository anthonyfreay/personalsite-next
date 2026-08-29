'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import GalleryImage from '@/components/GalleryImage';
import gridStyles from '@/components/ImageGallery.module.css';
import masonryStyles from '@/components/MasonryImageGallery.module.css';
import styles from './Curate.module.css';

/**
 * Drag to reorder, click to mark for removal, Save to write the manifest.
 *
 * Working state is a plain array of entries plus a Set of removed `src`s, so a
 * removal is reversible until Save and does not disturb the drag indices. Only
 * kept entries are sent; the route handler rewrites the file to exactly that
 * order.
 *
 * Drag-and-drop is the native HTML5 API rather than a library: the list is one
 * flat grid of at most a few dozen tiles, which is well inside what dragover
 * reordering handles without jank.
 */

/*
  Which component each route renders, so the preview can use the same one.

  Not derived from anything -- it mirrors the split described in CLAUDE.md, and
  the only way to keep it honest is to import the very stylesheets the real
  galleries use (below) rather than restating their rules here. If a route
  changes component, this map is the single line to update.
*/
const LAYOUT = {
  bw: 'grid',
  live: 'grid',
  people: 'grid',
  cars: 'masonry',
  places: 'masonry',
  events: 'masonry',
};

// ImageGallery's fallback for entries that predate the width/height fields.
const FALLBACK_WIDTH = 1080;
const FALLBACK_HEIGHT = 1620;

// Matches the `sizes` each real gallery passes, so the browser picks the same
// candidate and the preview loads what production loads.
const SIZES = {
  grid: '(max-width: 640px) 50vw, (max-width: 1023px) 33vw, 450px',
  masonry: '(max-width: 900px) 50vw, (max-width: 1800px) 25vw, 450px',
};

export default function CurateClient({ galleries }) {
  const [gallery, setGallery] = useState(galleries[0]);
  const [images, setImages] = useState([]);
  const [removed, setRemoved] = useState(new Set());
  const [baseline, setBaseline] = useState([]);
  const [status, setStatus] = useState({ state: 'loading' });
  const [compact, setCompact] = useState(false);
  const [hideRemoved, setHideRemoved] = useState(false);

  const dragFrom = useRef(null);
  // Bumped to re-run the load effect for the same gallery (the Revert button).
  const [reloads, setReloads] = useState(0);

  /*
    The effect owns loading, and every setState in it happens after an await, so
    switching galleries does not cascade renders. `status` starts as 'loading'
    and the select's onChange sets it back -- showing the spinner is a response
    to an event, not something the effect has to do synchronously.

    `active` drops a response whose gallery is no longer selected, which
    otherwise races a fast second switch and shows the wrong list.
  */
  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const response = await fetch(`/api/curate?gallery=${gallery}`);
        const data = await response.json();
        if (!active) return;
        if (!response.ok) throw new Error(data.error ?? 'Failed to load');
        setImages(data.images);
        setBaseline(data.images.map((image) => image.src));
        setRemoved(new Set());
        setStatus({ state: 'idle' });
      } catch (error) {
        if (active) setStatus({ state: 'error', message: error.message });
      }
    })();

    return () => { active = false; };
  }, [gallery, reloads]);

  const revert = useCallback(() => {
    setStatus({ state: 'loading' });
    setReloads((n) => n + 1);
  }, []);

  const selectGallery = useCallback((name) => {
    setStatus({ state: 'loading' });
    setGallery(name);
  }, []);

  const kept = useMemo(
    () => images.filter((image) => !removed.has(image.src)),
    [images, removed],
  );

  const dirty = useMemo(() => {
    const next = kept.map((image) => image.src);
    return next.length !== baseline.length || next.some((src, i) => src !== baseline[i]);
  }, [kept, baseline]);

  // Leaving with unsaved edits loses them silently otherwise -- the manifest is
  // only touched on Save.
  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (event) => event.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const toggleRemoved = useCallback((src) => {
    setRemoved((current) => {
      const next = new Set(current);
      if (next.has(src)) next.delete(src);
      else next.add(src);
      return next;
    });
  }, []);

  const moveTo = useCallback((from, to) => {
    if (from === to) return;
    setImages((current) => {
      const next = [...current];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }, []);

  const onDragOver = useCallback(
    (event, index) => {
      event.preventDefault();
      const from = dragFrom.current;
      if (from === null || from === index) return;
      moveTo(from, index);
      dragFrom.current = index;
    },
    [moveTo],
  );

  const save = useCallback(async () => {
    setStatus({ state: 'saving' });
    try {
      const response = await fetch('/api/curate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gallery, order: kept.map((image) => image.src) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? 'Failed to save');
      setImages(kept);
      setBaseline(kept.map((image) => image.src));
      setRemoved(new Set());
      setStatus({
        state: 'saved',
        message: `${data.kept} kept, ${data.removed} unregistered`,
      });
    } catch (error) {
      setStatus({ state: 'error', message: error.message });
    }
  }, [gallery, kept]);

  const layout = LAYOUT[gallery];
  const layoutStyles = layout === 'masonry' ? masonryStyles : gridStyles;

  /*
    Production markup, or a uniform grid for bulk reordering.

    In production mode the container and tile classes come from the real
    stylesheets and the photo renders through the real GalleryImage, so column
    count, gaps, aspect ratios and breakpoints are the site's own -- resize the
    window and it reflows exactly as the live gallery does.

    Compact mode squares every tile off. Dragging one photo across 61 events
    entries in true masonry means scrolling a very tall page; the uniform grid
    trades fidelity for reach.
  */
  const containerClass = compact
    ? styles.compactGrid
    : `${layoutStyles.masonryGrid ?? ''} ${layoutStyles.gallery ?? ''}`.trim();

  const visible = hideRemoved ? kept : images;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Curate</h1>
          <p className={styles.subtitle}>
            Drag to reorder. Click a tile to unregister it. Nothing is written until you save.
          </p>
        </div>

        <div className={styles.actions}>
          <select
            className={styles.select}
            value={gallery}
            onChange={(event) => selectGallery(event.target.value)}
            aria-label="Gallery"
          >
            {galleries.map((name) => (
              <option key={name} value={name}>
                /{name} · {LAYOUT[name]}
              </option>
            ))}
          </select>

          <button
            type="button"
            className={styles.reset}
            onClick={() => setCompact((value) => !value)}
            aria-pressed={compact}
          >
            {compact ? 'Production layout' : 'Compact grid'}
          </button>

          <button
            type="button"
            className={styles.reset}
            onClick={() => setHideRemoved((value) => !value)}
            aria-pressed={hideRemoved}
            disabled={removed.size === 0}
          >
            {hideRemoved ? 'Show removed' : 'Hide removed'}
          </button>

          <button
            type="button"
            className={styles.reset}
            onClick={revert}
            disabled={!dirty || status.state === 'saving'}
          >
            Revert
          </button>

          <button
            type="button"
            className={styles.save}
            onClick={save}
            disabled={!dirty || status.state === 'saving'}
          >
            {status.state === 'saving' ? 'Saving…' : 'Save'}
          </button>
        </div>
      </header>

      <p className={styles.status} role="status">
        {status.state === 'error' && <span className={styles.error}>{status.message}</span>}
        {status.state === 'loading' && 'Loading…'}
        {status.state === 'saved' && `Saved — ${status.message}`}
        {status.state === 'idle' && (
          dirty
            ? `${kept.length} kept, ${removed.size} marked for removal — unsaved`
            : `${kept.length} photos · ${layout} layout`
        )}
      </p>

      <div className={containerClass}>
        {visible.map((image) => {
          const index = images.indexOf(image);
          const isRemoved = removed.has(image.src);
          const position = kept.indexOf(image);

          return (
            <div
              key={image.src}
              className={`${layoutStyles.tile} ${styles.editTile} ${isRemoved ? styles.removed : ''}`}
              draggable
              onDragStart={() => { dragFrom.current = index; }}
              onDragOver={(event) => onDragOver(event, index)}
              onDragEnd={() => { dragFrom.current = null; }}
            >
              <button
                type="button"
                className={styles.hit}
                onClick={() => toggleRemoved(image.src)}
                aria-pressed={isRemoved}
                aria-label={
                  isRemoved
                    ? `Restore ${image.alt || image.src}`
                    : `Mark ${image.alt || image.src} for removal`
                }
              >
                <GalleryImage
                  src={image.hdSrc}
                  alt=""
                  width={image.width ?? FALLBACK_WIDTH}
                  height={image.height ?? FALLBACK_HEIGHT}
                  color={image.color}
                  sizes={SIZES[layout]}
                  className={compact ? styles.compactImage : ''}
                />
              </button>

              <span className={styles.badge}>{isRemoved ? '—' : position + 1}</span>
              <span className={styles.caption} title={image.alt}>
                {image.alt || 'no alt text'}
              </span>
            </div>
          );
        })}
      </div>
    </main>
  );
}
