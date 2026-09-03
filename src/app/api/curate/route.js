// Dev-only endpoint behind the /curate UI.
//
// GET  ?gallery=live   -> that gallery's entries in render order
// POST { gallery, order, moves } -> rewrite the manifest to that order, and
//                                   move `moves` ([{src, to}]) into other galleries
//
// Writing source files from an HTTP handler is only ever acceptable on a
// developer's own machine, so every method refuses outside `next dev`. The
// guard is a runtime check rather than a build-time one because a route
// handler is compiled either way -- this makes the deployed copy inert.

import { NextResponse } from 'next/server';
import { GALLERIES, isGallery, loadGallery, saveGallery } from '@/lib/galleries/manifest-io';

export const dynamic = 'force-dynamic';

const DEV = process.env.NODE_ENV === 'development';

const notFound = () => NextResponse.json({ error: 'Not found' }, { status: 404 });
const badRequest = (message) => NextResponse.json({ error: message }, { status: 400 });

export async function GET(request) {
  if (!DEV) return notFound();

  const gallery = request.nextUrl.searchParams.get('gallery');
  if (!gallery) return NextResponse.json({ galleries: GALLERIES });
  if (!isGallery(gallery)) return badRequest(`Unknown gallery: ${gallery}`);

  return NextResponse.json({ gallery, images: await loadGallery(gallery) });
}

export async function POST(request) {
  if (!DEV) return notFound();

  let body;
  try {
    body = await request.json();
  } catch {
    return badRequest('Body must be JSON');
  }

  const { gallery, order, moves = [] } = body ?? {};
  if (!isGallery(gallery)) return badRequest(`Unknown gallery: ${gallery}`);
  if (!Array.isArray(order)) return badRequest('order must be an array of src strings');
  if (order.some((src) => typeof src !== 'string')) return badRequest('order must contain only strings');

  // An empty order would silently blank a gallery; make that an explicit error
  // rather than something a stray click can do.
  if (order.length === 0) return badRequest('Refusing to empty a gallery');

  if (!Array.isArray(moves)) return badRequest('moves must be an array');
  if (moves.some((m) => typeof m?.src !== 'string' || typeof m?.to !== 'string')) {
    return badRequest('each move must be { src, to }');
  }

  try {
    return NextResponse.json(await saveGallery(gallery, order, moves));
  } catch (error) {
    return badRequest(error.message);
  }
}
