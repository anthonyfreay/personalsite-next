import CarsClient from './CarsClient';
import { cars as allImages } from '@/lib/galleries';


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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Automotive Photography by Anthony Freay',
    description: 'Automotive photography by Anthony Freay. Classic cars, modern designs, and everything in between.',
    url: 'https://www.anthonyfreay.com/cars',
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
      <h1 className="sr-only">Automotive Photography</h1>
      <p className="sr-only">
        Automotive photography by Anthony Freay, a NYC-based photographer with an eye for
        classic and modern vehicles. This gallery spans vintage American classics, European
        sports cars, and contemporary designs — shot in both color and black and white.
      </p>
      <CarsClient />
    </>
  );
}
