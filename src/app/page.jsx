import HomeClient from './HomeClient';
import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_URL,
  DEFAULT_IMAGE_ABS,
} from '@/lib/constants';
import {
  siteGraphJsonLd,
} from '@/lib/structured-data';

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
  // Home needs no page-specific node beyond the site graph itself.
  const jsonLd = siteGraphJsonLd();

  return (
    <>
      {/*
        Server-rendered so the dark ground and scroll lock are in effect on the
        very first paint. Doing this from a useEffect (as it was) applied
        `position: fixed` to <body> after hydration and shifted the whole page:
        CLS 0.41 on this route. React removes this <style> on navigation away,
        so the lock is scoped to the home page without any cleanup code.
      */}
      <style>{`
        html, body {
          background-color: #090909;
          overflow: hidden;
          overscroll-behavior: none;
          height: 100%;
        }
      `}</style>
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
