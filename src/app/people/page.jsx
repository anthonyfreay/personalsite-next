import ImageGallery from '@/components/ImageGallery';
import { people, withHd } from '@/lib/galleries';
import {
  imageGalleryJsonLd,
  breadcrumbJsonLd,
  siteGraphJsonLd,
} from '@/lib/structured-data';

export const metadata = {
  title: 'People | Anthony Freay',
  description: 'Portraits by Anthony Freay. Capturing candid and lifestyle moments.',
  alternates: {
    canonical: 'https://www.anthonyfreay.com/people',
  },
  openGraph: {
    title: 'People | Anthony Freay',
    description: 'Portraits by Anthony Freay. Capturing candid and lifestyle moments.',
    images: [{ url: 'https://www.anthonyfreay.com/covers/people_cover.jpg', width: 1200, height: 630 }],
    url: 'https://www.anthonyfreay.com/people',
  },
  twitter: {
    title: 'People | Anthony Freay',
    description: 'Portraits by Anthony Freay. Capturing candid and lifestyle moments.',
    images: ['https://www.anthonyfreay.com/covers/people_cover.jpg'],
  },
};

function People() {
  const jsonLd = siteGraphJsonLd([
    imageGalleryJsonLd({
      name: 'Portrait Photography by Anthony Freay',
      description: 'Portraits by Anthony Freay. Capturing candid and lifestyle moments.',
      path: '/people',
      images: imageData,
    }),
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Work', path: '/work' },
      { name: 'People', path: '/people' },
    ]),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="sr-only">Portrait Photography</h1>
      <p className="sr-only">
        Portrait and lifestyle photography by Anthony Freay, based in New York City.
        This gallery features candid and environmental portraits shot across NYC landmarks,
        studios, parks, and neighborhoods — capturing genuine moments and personality.
      </p>
      <div className="w-full my-2.5 flex-1">
        <ImageGallery images={imageData} />
      </div>
    </div>
  );
}

const imageData = withHd(people);

export default People;
