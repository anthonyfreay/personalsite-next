import PlacesClient from './PlacesClient';

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
  return (
    <>
      <h1 className="sr-only">Travel & Landscape Photography</h1>
      <PlacesClient />
    </>
  );
}
