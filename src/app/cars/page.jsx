import GalleryHeading from '@/components/GalleryHeading';
import CarsClient from './CarsClient';
import { cars as allImages } from '@/lib/galleries';
import {
  imageGalleryJsonLd,
  breadcrumbJsonLd,
  siteGraphJsonLd,
} from '@/lib/structured-data';


export const metadata = {
  title: 'Cars | Anthony Freay',
  description: 'Automotive photography by Anthony Freay. Classic cars, modern designs, and everything in between.',
  alternates: {
    canonical: 'https://www.anthonyfreay.com/cars',
  },
  openGraph: {
    title: 'Cars | Anthony Freay',
    description: 'Automotive photography by Anthony Freay. Classic cars, modern designs, and everything in between.',
    images: [{ url: 'https://www.anthonyfreay.com/covers/cars_cover.jpg', width: 1200, height: 630 }],
    url: 'https://www.anthonyfreay.com/cars',
  },
  twitter: {
    title: 'Cars | Anthony Freay',
    description: 'Automotive photography by Anthony Freay. Classic cars, modern designs, and everything in between.',
    images: ['https://www.anthonyfreay.com/covers/cars_cover.jpg'],
  },
};

export default function Cars() {
  const jsonLd = siteGraphJsonLd([
    imageGalleryJsonLd({
      name: 'Automotive Photography by Anthony Freay',
      description: 'Automotive photography by Anthony Freay. Classic cars, modern designs, and everything in between.',
      path: '/cars',
      images: allImages,
    }),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Work', path: '/work' },
      { name: 'Cars', path: '/cars' },
    ]),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GalleryHeading path="/cars" title="Automotive Photography" />
      <p className="sr-only">
        Automotive photography by Anthony Freay, a NYC-based photographer with an eye for
        classic and modern vehicles. This gallery spans vintage American classics, European
        sports cars, and contemporary designs — shot in both color and black and white.
      </p>
      <CarsClient />
    </>
  );
}
