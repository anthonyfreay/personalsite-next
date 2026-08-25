import ImageGallery from '@/components/ImageGallery';
import { people, withHd } from '@/lib/galleries';

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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Portrait Photography by Anthony Freay',
    description: 'Portraits by Anthony Freay. Capturing candid and lifestyle moments.',
    url: 'https://www.anthonyfreay.com/people',
    author: { '@type': 'Person', name: 'Anthony Freay', url: 'https://www.anthonyfreay.com' },
    image: imageData.map(img => ({
      '@type': 'Photograph',
      name: img.alt,
      url: `https://www.anthonyfreay.com${img.src}`,
      author: { '@type': 'Person', name: 'Anthony Freay' },
    })),
  };

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
      <div className="max-w-full mx-auto my-2.5 flex-1">
        <ImageGallery images={imageData} />
      </div>
    </div>
  );
}

const imageData = withHd(people);

export default People;
