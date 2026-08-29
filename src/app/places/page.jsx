import GalleryHeading from '@/components/GalleryHeading';
import PlacesClient from './PlacesClient';
import { places as allImages } from '@/lib/galleries';
import {
  imageGalleryJsonLd,
  breadcrumbJsonLd,
  siteGraphJsonLd,
} from '@/lib/structured-data';


export const metadata = {
  title: 'Places | Anthony Freay',
  description: 'Travel and street photography by Anthony Freay. Exploring cities, landscapes, and the moments in between.',
  alternates: {
    canonical: 'https://www.anthonyfreay.com/places',
  },
  openGraph: {
    title: 'Places | Anthony Freay',
    description: 'Travel and street photography by Anthony Freay. Exploring cities, landscapes, and the moments in between.',
    images: [{ url: 'https://www.anthonyfreay.com/places/A7406615-places.webp', width: 1200, height: 630 }],
    url: 'https://www.anthonyfreay.com/places',
  },
  twitter: {
    title: 'Places | Anthony Freay',
    description: 'Travel and street photography by Anthony Freay. Exploring cities, landscapes, and the moments in between.',
    images: ['https://www.anthonyfreay.com/places/A7406615-places.webp'],
  },
};

export default function Places() {
  const jsonLd = siteGraphJsonLd([
    imageGalleryJsonLd({
      name: 'Travel & Landscape Photography by Anthony Freay',
      description: 'Travel and street photography by Anthony Freay. Exploring cities, landscapes, and the moments in between.',
      path: '/places',
      images: allImages,
    }),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Work', path: '/work' },
      { name: 'Places', path: '/places' },
    ]),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GalleryHeading path="/places" title="Travel & Landscape Photography" />
      <p className="sr-only">
        Travel and landscape photography by Anthony Freay, a New York City-based photographer.
        This gallery spans destinations from the Oregon Coast and San Francisco to the Galapagos
        Islands, Ecuador, and street scenes across NYC — landscapes and environments from around the world.
      </p>
      <PlacesClient />
    </>
  );
}
