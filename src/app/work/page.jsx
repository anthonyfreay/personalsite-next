import WorkClient from './WorkClient';
import {
  breadcrumbJsonLd,
  siteGraphJsonLd,
} from '@/lib/structured-data';

export const metadata = {
  title: 'Work | Anthony Freay',
  description: 'A collection of photography work by Anthony Freay, showcasing portraits, concerts, and events.',
  alternates: {
    canonical: 'https://www.anthonyfreay.com/work',
  },
  openGraph: {
    title: 'Work | Anthony Freay',
    description: 'A collection of photography work by Anthony Freay, showcasing portraits, concerts, and events.',
    images: [
      {
        url: 'https://www.anthonyfreay.com/covers/live_cover.jpg',
        width: 1200,
        height: 630,
      },
    ],
    url: 'https://www.anthonyfreay.com/work',
  },
  twitter: {
    title: 'Work | Anthony Freay',
    description: 'A collection of photography work by Anthony Freay, showcasing portraits, concerts, and events.',
    images: ['https://www.anthonyfreay.com/covers/live_cover.jpg'],
  },
};

export default function Work() {
  const jsonLd = siteGraphJsonLd([
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Work', path: '/work' },
    ]),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">Photography Portfolio</h1>
      <p className="sr-only">
        The photography portfolio of Anthony Freay, a New York City-based photographer.
        Browse seven collections: live music and concert photography, candid event
        coverage, portraits of people, sports photography from football, tennis and
        cycling, automotive photography, black and white work, and travel and landscape
        scenes from places around the world.
      </p>
      <WorkClient />
    </>
  );
}
