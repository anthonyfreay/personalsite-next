import GalleryHeading from '@/components/GalleryHeading';
import SportsClient from './SportsClient';
import { sports as allImages } from '@/lib/galleries';
import {
  imageGalleryJsonLd,
  breadcrumbJsonLd,
  siteGraphJsonLd,
} from '@/lib/structured-data';

/*
  The OG image is the gallery's own cover frame rather than a covers/*.jpg like
  /bw and /cars use. It is a portrait crop, so the social card letterboxes it
  instead of filling the 1.91:1 box -- an accepted trade for previewing the
  actual photograph rather than a concert shot from another gallery.
*/
export const metadata = {
  title: 'Sports | Anthony Freay',
  description: 'Sports photography by Anthony Freay. Football, tennis and cycling, from the stands and the roadside.',
  alternates: {
    canonical: 'https://www.anthonyfreay.com/sports',
  },
  openGraph: {
    title: 'Sports | Anthony Freay',
    description: 'Sports photography by Anthony Freay. Football, tennis and cycling, from the stands and the roadside.',
    images: [{ url: 'https://www.anthonyfreay.com/sports/DSC02801-sports-hd.webp' }],
    url: 'https://www.anthonyfreay.com/sports',
  },
  twitter: {
    title: 'Sports | Anthony Freay',
    description: 'Sports photography by Anthony Freay. Football, tennis and cycling, from the stands and the roadside.',
    images: ['https://www.anthonyfreay.com/sports/DSC02801-sports-hd.webp'],
  },
};

export default function Sports() {
  const jsonLd = siteGraphJsonLd([
    imageGalleryJsonLd({
      name: 'Sports Photography by Anthony Freay',
      description: 'Sports photography by Anthony Freay. Football, tennis and cycling, from the stands and the roadside.',
      path: '/sports',
      images: allImages,
    }),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Work', path: '/work' },
      { name: 'Sports', path: '/sports' },
    ]),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GalleryHeading path="/sports" title="Sports Photography" />
      <p className="sr-only">
        Sports photography by Anthony Freay, a New York City-based photographer.
        This gallery spans La Liga football at Sevilla&apos;s Ramón Sánchez-Pizjuán and
        France internationals, tennis at the US Open, and road cycling — shot from the
        stands, the sideline and the roadside.
      </p>
      <SportsClient />
    </>
  );
}
