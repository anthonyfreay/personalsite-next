import CarsClient from './CarsClient';

const allImages = [
  { alt: 'Luxury car detail shot', src: '/cars/A7406517-Enhanced-NR-color.webp' },
  { alt: 'Classic automobile photography', src: '/cars/A7405676-color.webp' },
  { alt: 'Automotive photography by Anthony Freay', src: '/cars/A7204618-color.webp' },
  { alt: 'Black and white car portrait', src: '/cars/A7406721-bw.webp' },
  { alt: 'Sports car in color', src: '/cars/A7409382-color.webp' },
  { alt: 'Modern automobile design', src: '/cars/A7409342-color.webp' },
  { alt: 'Classic car in black and white', src: '/cars/DSC04341-bw.webp' },
  { alt: 'Vintage car photography', src: '/cars/A7200465-color.webp' },
  { alt: 'Luxury vehicle detail', src: '/cars/A7200477-color.webp' },
  { alt: 'Automotive photography', src: '/cars/A7200475-color.webp' },
  { alt: 'Car in monochrome', src: '/cars/A7406716-bw.webp' },
  { alt: 'Classic automobile portrait', src: '/cars/A7200462-color.webp' },
  { alt: 'Vehicle detail shot', src: '/cars/A7200488-color.webp' },
  { alt: 'Modern car photography', src: '/cars/A7408915-color.webp' },
  { alt: 'Automotive detail by Anthony Freay', src: '/cars/A7406778-color.webp' },
  { alt: 'Black and white automotive', src: '/cars/A7406726-bw.webp' },
  { alt: 'Car in natural light', src: '/cars/A7406734-color.webp' },
  { alt: 'Monochrome car portrait', src: '/cars/A7406717-bw.webp' },
  { alt: 'Automotive photography detail', src: '/cars/A7209958-color.webp' },
  { alt: 'Classic car in color', src: '/cars/A7200461-color.webp' },
];

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
