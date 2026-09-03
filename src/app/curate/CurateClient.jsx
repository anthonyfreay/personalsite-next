'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import GalleryImage from '@/components/GalleryImage';
import gridStyles from '@/components/ImageGallery.module.css';
import masonryStyles from '@/components/MasonryImageGallery.module.css';
import { GALLERY_LAYOUT, layoutOptions } from '@/lib/galleries/layout';
import styles from './Curate.module.css';

/**
 * Drag to reorder, click to mark for removal, Save to write the manifest.
 *
 * Working state is a plain array of entries plus a Set of removed `src`s, so a
 * removal is reversible until Save and does not disturb the drag indices. Only
 * kept entries are sent; the route handler rewrites the file to exactly that
 * order.
 *
 * Selecting tiles enables two actions. Swap, at exactly two, exchanges their
 * positions: dragging is the wrong tool for trading photos that are screens
 * apart, since it means hauling one tile the whole way and displacing
 * everything in between. Send moves any number to another gallery, appending
 * them to the bottom of it.
 *
 * A send is staged, like a removal: the tiles mark as outgoing and stay
 * reversible until Save, which writes both manifests in one request. Nothing
 * about a move is cheap to undo once written -- it renames files and records a
 * redirect -- so it waits for the same deliberate click as everything else.
 *
 * Drag-and-drop is the native HTML5 API rather than a library: the list is one
 * flat grid of at most a few dozen tiles, which is well inside what dragover
 * reordering handles without jank.
 */

/*
  Which component each route renders, and with which options, so the preview
  can use the same ones.

  Both come from `@/lib/galleries/layout` rather than a copy kept here. The
  copy is exactly how this drifted before: /sports gained a mobile row grid
  and curate carried on previewing it as multicol masonry, so the tool used to
  order the gallery no longer showed the gallery. Importing the real
  stylesheets (below) keeps the rules honest; importing the real config keeps
  the choice of rules honest too.
*/
const LAYOUT = Object.fromEntries(
  Object.entries(GALLERY_LAYOUT).map(([name, { component }]) => [name, component]),
);

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
  // At most two, and the tiles enforce it: with two picked, every other
  // selector is disabled rather than quietly displacing one of them.
  const [selected, setSelected] = useState([]);
  // src -> target gallery, for tiles staged to move out on the next Save.
  const [outgoing, setOutgoing] = useState({});

  /*
    The site navbar is sticky at top: 0, so the toolbar has to start below it.
    Measured rather than hardcoded: the height is a product of the navbar's own
    padding and type, and a stale constant here would silently tuck the
    controls underneath it -- exactly the thing this is meant to fix.
  */
  const [navOffset, setNavOffset] = useState(0);
  useEffect(() => {
    const nav = document.querySelector('nav');
    if (!nav) return undefined;
    const sync = () => setNavOffset(nav.getBoundingClientRect().height);
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

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
        setSelected([]);
        setOutgoing({});
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

  // An outgoing tile is neither kept nor removed: it leaves this gallery for
  // another one, so it is excluded from `order` and sent under `moves`.
  const kept = useMemo(
    () => images.filter((image) => !removed.has(image.src) && !outgoing[image.src]),
    [images, removed, outgoing],
  );

  const moves = useMemo(
    () => Object.entries(outgoing).map(([src, to]) => ({ src, to })),
    [outgoing],
  );

  const dirty = useMemo(() => {
    if (moves.length) return true;
    const next = kept.map((image) => image.src);
    return next.length !== baseline.length || next.some((src, i) => src !== baseline[i]);
  }, [kept, baseline, moves]);

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

  // Uncapped: Send takes any number. Swap gates itself on exactly two rather
  // than the selection refusing a third, which would make Send single-file.
  const toggleSelected = useCallback((src) => {
    setSelected((current) =>
      current.includes(src) ? current.filter((value) => value !== src) : [...current, src]
    );
  }, []);

  /*
    Exchange the two selected entries in place. Everything else keeps its index,
    which is the whole point of the feature, and the selection is cleared so the
    button cannot be pressed twice and silently undo itself.
  */
  const swap = useCallback(() => {
    if (selected.length !== 2) return;
    setImages((current) => {
      const [a, b] = selected.map((src) => current.findIndex((image) => image.src === src));
      if (a === -1 || b === -1) return current;
      const next = [...current];
      [next[a], next[b]] = [next[b], next[a]];
      return next;
    });
    setSelected([]);
  }, [selected]);

  /*
    Stage the selected tiles for another gallery. Marking one for removal and
    for a move at once is contradictory, so a send clears any removal on those
    same tiles rather than leaving both flags set.
  */
  const sendTo = useCallback((target) => {
    if (!target || selected.length === 0) return;
    setOutgoing((current) => {
      const next = { ...current };
      selected.forEach((src) => { next[src] = target; });
      return next;
    });
    setRemoved((current) => {
      const next = new Set(current);
      selected.forEach((src) => next.delete(src));
      return next;
    });
    setSelected([]);
  }, [selected]);

  const cancelSend = useCallback((src) => {
    setOutgoing((current) => {
      const next = { ...current };
      delete next[src];
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
        body: JSON.stringify({ gallery, order: kept.map((image) => image.src), moves }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? 'Failed to save');
      setImages(kept);
      setBaseline(kept.map((image) => image.src));
      setRemoved(new Set());
      setSelected([]);
      setOutgoing({});
      const sent = data.moved?.length
        ? `, ${data.moved.length} sent to ${[...new Set(data.moved.map((m) => `/${m.gallery}`))].join(', ')}`
        : '';
      setStatus({
        state: 'saved',
        message: `${data.kept} kept, ${data.removed} unregistered${sent}`,
      });
    } catch (error) {
      setStatus({ state: 'error', message: error.message });
    }
  }, [gallery, kept, moves]);

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
  const options = layoutOptions(gallery);

  /*
    Compact mode is the one deliberate departure from production: it squares
    every tile off so a photo can be dragged across 58 entries without
    scrolling a very tall page. Production mode takes the real container
    classes, including the per-route ones, so the preview reflows exactly as
    the live route does at every breakpoint.
  */
  const containerClass = compact
    ? styles.compactGrid
    : [
        layoutStyles.masonryGrid,
        layoutStyles.gallery,
        options.spanWideOnMobile ? masonryStyles.alignedMobile : '',
      ].filter(Boolean).join(' ');

  const visible = hideRemoved ? kept : images;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Curate</h1>
          <p className={styles.subtitle}>
            Drag to reorder, or select two tiles and swap them. Select any number and
            send them to another gallery, where they land at the bottom. Click a tile to
            unregister it. Nothing is written until you save.
          </p>
        </div>

      </header>

      {/*
        Sticky, because Swap and Send act on a selection made anywhere in the
        gallery -- with 58 events tiles the controls were a long scroll away
        from the photo you had just picked. The title and instructions above
        are read once and are free to scroll off.
      */}
      <div className={styles.toolbar} style={{ top: navOffset }}>
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
            onClick={swap}
            disabled={selected.length !== 2}
          >
            Swap
          </button>

          {/*
            Resets to its placeholder after each send, so the control never
            reads as though a target is still armed.
          */}
          <select
            className={styles.select}
            value=""
            onChange={(event) => sendTo(event.target.value)}
            disabled={selected.length === 0}
            aria-label={`Send ${selected.length} selected to another gallery`}
          >
            <option value="">
              {selected.length ? `Send ${selected.length} to…` : 'Send to…'}
            </option>
            {galleries
              .filter((name) => name !== gallery)
              .map((name) => (
                <option key={name} value={name}>
                  /{name}
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

        <p className={styles.status} role="status">
          {status.state === 'error' && <span className={styles.error}>{status.message}</span>}
          {status.state === 'loading' && 'Loading…'}
          {status.state === 'saved' && `Saved — ${status.message}`}
          {status.state === 'idle' && (
            dirty
              ? [
                  `${kept.length} kept`,
                  `${removed.size} marked for removal`,
                  moves.length ? `${moves.length} to send` : '',
                ].filter(Boolean).join(', ') + ' — unsaved'
              : `${kept.length} photos · ${layout} layout`
          )}
        </p>
      </div>

      <div className={containerClass}>
        {visible.map((image) => {
          const index = images.indexOf(image);
          const isRemoved = removed.has(image.src);
          const sendingTo = outgoing[image.src];
          const position = kept.indexOf(image);
          const isSelected = selected.includes(image.src);
          // Deselecting stays available, or a full pair would be a dead end.
          const selectable = isSelected || selected.length < 2;

          return (
            <div
              key={image.src}
              className={[
                layoutStyles.tile,
                // Landscape tiles span both columns below 900px on routes that
                // opt in, exactly as they do on the live gallery.
                !compact && options.spanWideOnMobile && image.width > image.height
                  ? masonryStyles.wide
                  : '',
                styles.editTile,
                isRemoved ? styles.removed : '',
                sendingTo ? styles.outgoing : '',
                isSelected ? styles.selected : '',
              ].filter(Boolean).join(' ')}
              draggable
              onDragStart={() => { dragFrom.current = index; }}
              onDragOver={(event) => onDragOver(event, index)}
              onDragEnd={() => { dragFrom.current = null; }}
            >
              <button
                type="button"
                className={styles.hit}
                onClick={() =>
                  sendingTo ? cancelSend(image.src) : toggleRemoved(image.src)
                }
                aria-pressed={isRemoved}
                aria-label={
                  sendingTo
                    ? `Keep ${image.alt || image.src} in /${gallery}`
                    : isRemoved
                      ? `Restore ${image.alt || image.src}`
                      : `Mark ${image.alt || image.src} for removal`
                }
              >
                <GalleryImage
                  // The base file, matching what the real grids render since
                  // image optimization was turned off. Previewing -hd here
                  // would show a sharper tile than production serves.
                  src={image.src}
                  alt=""
                  width={image.width ?? FALLBACK_WIDTH}
                  height={image.height ?? FALLBACK_HEIGHT}
                  color={image.color}
                  sizes={SIZES[layout]}
                  className={compact ? styles.compactImage : ''}
                />
              </button>

              {/*
                A sibling of the hit button rather than a child: nesting a
                control inside a button is invalid, and stacking it on top keeps
                selecting separate from marking for removal.
              */}
              <button
                type="button"
                className={styles.selectBox}
                onClick={() => toggleSelected(image.src)}
                aria-pressed={isSelected}
                disabled={!selectable}
                aria-label={
                  isSelected
                    ? `Deselect ${image.alt || image.src}`
                    : `Select ${image.alt || image.src} to swap`
                }
              >
                {isSelected ? '✓' : ''}
              </button>

              {/*
                An outgoing tile has no position left in this gallery, so the
                badge names where it is going instead of a number.
              */}
              <span className={styles.badge}>
                {sendingTo ? `→ ${sendingTo}` : isRemoved ? '—' : position + 1}
              </span>
              {/*
                The alt text is what is being edited, so it is what is shown.
                An entry whose hover label differs carries it alongside, rather
                than curate implying the tile reads as its alt.
              */}
              <span className={styles.caption} title={image.alt}>
                {image.caption
                  ? `${image.caption} — ${image.alt || 'no alt text'}`
                  : image.alt || 'no alt text'}
              </span>
            </div>
          );
        })}
      </div>
    </main>
  );
}
