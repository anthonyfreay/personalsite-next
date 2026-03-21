import PlacesClient from './PlacesClient';

const allImages = [
  { alt: 'Landscape photography', src: '/places/A7407286-scapes.webp' },
  { alt: 'Travel photography', src: '/places/A7405233-scapes.webp' },
  { alt: 'Scenic landscape', src: '/places/A7407228-scapes.webp' },
  { alt: 'Nature photography', src: '/places/RX703948-scapes.webp' },
  { alt: 'Landscape detail', src: '/places/A7204930-scapes.webp' },
  { alt: 'Travel moment', src: '/places/RX703316-scapes.webp' },
  { alt: 'Street photography', src: '/places/RX702154-scapes.webp' },
  { alt: 'Colorful landscape', src: '/places/A7205360-color.webp' },
  { alt: 'Travel photography by Anthony Freay', src: '/places/RX706732-color.webp' },
  { alt: 'Scenic photography', src: '/places/A7405906-color.webp' },
  { alt: 'Landscape composition', src: '/places/A7407432-scapes.webp' },
  { alt: 'Travel destination', src: '/places/A7206508-Edit-scapes.webp' },
  { alt: 'Nature landscape', src: '/places/RX702886-scapes.webp' },
  { alt: 'Scenic view', src: '/places/A7407357-scapes.webp' },
  { alt: 'Street scene', src: '/places/RX702276-scapes.webp' },
  { alt: 'Landscape photography detail', src: '/places/A7406572-scapes.webp' },
  { alt: 'HDR landscape', src: '/places/A7204586-HDR-scapes.webp' },
  { alt: 'Travel photography moment', src: '/places/A7401638-scapes.webp' },
  { alt: 'Colorful travel scene', src: '/places/A7405944-color.webp' },
  { alt: 'Scenic landscape photography', src: '/places/A7407519-scapes.webp' },
  { alt: 'Street photography detail', src: '/places/RX702351-scapes.webp' },
  { alt: 'Travel destination photography', src: '/places/A7405591-color.webp' },
  { alt: 'Landscape edit', src: '/places/A7406556-Edit-scapes.webp' },
  { alt: 'Beams', src: '/places/A7202190-scapes.webp' },
  { alt: 'Tree', src: '/places/A7406558-scapes.webp' },
  { alt: 'Coney Island Rollercoaster', src: '/places/RX706719-color.webp' },
  { alt: 'Charleston', src: '/places/A7406615-scapes.webp' },
  { alt: 'Queens', src: '/places/A7202338-scapes.webp' },
  { alt: 'Galapagos Summer', src: '/places/A7401731-Enhanced-NR-color.webp' },
  { alt: 'Multnomah Falls', src: '/places/A7204120-scapes.webp' },
  { alt: 'San Francisco Summer', src: '/places/A7205351-color.webp' },
  { alt: 'Catskills Lake', src: '/places/A7206286-scapes.webp' },
  { alt: 'Ice Rink', src: '/places/A7202369-scapes.webp' },
  { alt: 'Paradise', src: '/places/A7407416-scapes.webp' },
  { alt: 'Columbus Circle on a Rainy Weekday', src: '/places/DSC09254-scapes.webp' },
  { alt: 'Pigeon Guillemot on Oregon Coast', src: '/places/A7204896-scapes.webp' },
  { alt: 'City Stacks', src: '/places/A7202361-scapes.webp' },
  { alt: "Mom's Apartment", src: '/places/RX702292-scapes.webp' },
  { alt: 'JETski', src: '/places/A7407477-scapes.webp' },
  { alt: 'San Francisco street sign', src: '/places/A7205014-color.webp' },
  { alt: 'Teleferico Quito', src: '/places/RX703340-scapes.webp' },
  { alt: 'Sitting in the Sun', src: '/places/A7407441-scapes.webp' },
  { alt: 'Muir Woods', src: '/places/A7205161-color.webp' },
  { alt: 'San Francisco Sunset', src: '/places/A7205308-color.webp' },
  { alt: 'Kids in Galapagos', src: '/places/A7401603-scapes.webp' },
  { alt: 'Pretty Oregon Coast line', src: '/places/A7204601-HDR-scapes.webp' },
  { alt: 'Kids playing in the Sand', src: '/places/A7407388-scapes.webp' },
  { alt: 'Sea Lions on the Oregon Coast', src: '/places/A7204910-scapes.webp' },
  { alt: 'Garret Mountain Basketball Court', src: '/places/A7209983-Edit-scapes.webp' },
  { alt: 'Volcano in Ecuador', src: '/places/A7402155-HDR-scapes.webp' },
  { alt: 'Guayaquil Highway', src: '/places/RX702346-scapes.webp' },
  { alt: 'Tropical landscape', src: '/places/A7401732-Enhanced-NR-color.webp' },
];

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
