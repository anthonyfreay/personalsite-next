import PlacesClient from './PlacesClient';
import { places as allImages } from '@/lib/galleries';


export const metadata = {
  title: 'Places | Anthony Freay',
  description: 'Travel and street photography by Anthony Freay. Exploring cities, landscapes, and the moments in between.',
  alternates: {
    canonical: 'https://www.anthonyfreay.com/places',
  },
  openGraph: {
    title: 'Places | Anthony Freay',
    description: 'Travel and street photography by Anthony Freay. Exploring cities, landscapes, and the moments in between.',
    images: [{ url: 'https://www.anthonyfreay.com/places/A7406615-scapes.webp', width: 1200, height: 630 }],
    url: 'https://www.anthonyfreay.com/places',
  },
  twitter: {
    title: 'Places | Anthony Freay',
    description: 'Travel and street photography by Anthony Freay. Exploring cities, landscapes, and the moments in between.',
    images: ['https://www.anthonyfreay.com/places/A7406615-scapes.webp'],
  },
};

export default function Places() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Travel & Landscape Photography by Anthony Freay',
    description: 'Travel and street photography by Anthony Freay. Exploring cities, landscapes, and the moments in between.',
    url: 'https://www.anthonyfreay.com/places',
    author: { '@type': 'Person', name: 'Anthony Freay', url: 'https://www.anthonyfreay.com' },
    image: allImages.map(img => ({
      '@type': 'Photograph',
      name: img.alt,
      url: `https://www.anthonyfreay.com${img.src}`,
      author: { '@type': 'Person', name: 'Anthony Freay' },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">Travel & Landscape Photography</h1>
      <p className="sr-only">
        Travel and landscape photography by Anthony Freay, a New York City-based photographer.
        This gallery spans destinations from the Oregon Coast and San Francisco to the Galapagos
        Islands, Ecuador, and street scenes across NYC — landscapes and environments from around the world.
      </p>
      <PlacesClient />
    </>
  );
}
