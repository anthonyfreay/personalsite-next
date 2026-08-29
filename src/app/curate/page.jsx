// Dev-only gallery curation tool. Not part of the public site.
//
// Reorder photos or drop them from a gallery, then write the new order back to
// src/lib/galleries/<gallery>.js as a reviewable diff. Runs only under
// `npm run dev`; a production build renders the 404 page instead.

import { notFound } from 'next/navigation';
import { GALLERIES } from '@/lib/galleries/manifest-io';
import CurateClient from './CurateClient';

export const metadata = {
  title: 'Curate',
  robots: { index: false, follow: false },
};

export default function CuratePage() {
  if (process.env.NODE_ENV !== 'development') notFound();

  return <CurateClient galleries={GALLERIES} />;
}
