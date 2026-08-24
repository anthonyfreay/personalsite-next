import HomeClient from './HomeClient';
import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_URL,
  DEFAULT_IMAGE_ABS,
} from '@/lib/constants';

export const metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: DEFAULT_IMAGE_ABS, width: 1200, height: 630 }],
    url: SITE_URL,
  },
  twitter: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_IMAGE_ABS],
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Anthony Freay',
    url: SITE_URL,
    jobTitle: 'Photographer & Software Engineer',
    description: SITE_DESCRIPTION,
    image: DEFAULT_IMAGE_ABS,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'New York',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
    sameAs: [
      'https://www.instagram.com/anthonyfreay',
      'https://www.linkedin.com/in/anthonyfreay',
      'https://github.com/anthonyfreay',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">Anthony Freay | Photographer & Software Engineer</h1>
      <p className="sr-only">
        Anthony Freay is a photographer, software engineer, and designer based in New York, NY.
        His work focuses on collaboration and attention to detail to create clean, authentic
        imagery. This portfolio collects live music and concert photography, black and white
        work, portraits, travel and street scenes, automotive photography, and event coverage
        shot across New York City and beyond.
      </p>
      <HomeClient />
    </>
  );
}
