import ImageGallery from '@/components/ImageGallery';
import { bw, withHd } from '@/lib/galleries';

export const metadata = {
  title: 'Black & White | Anthony Freay',
  description: 'A collection of black and white photography by Anthony Freay. Rich, timeless, and classic shots.',
  alternates: {
    canonical: 'https://www.anthonyfreay.com/bw',
  },
  openGraph: {
    title: 'Black & White | Anthony Freay',
    description: 'A collection of black and white photography by Anthony Freay. Rich, timeless, and classic shots.',
    images: [{ url: 'https://www.anthonyfreay.com/covers/bw_cover.jpg', width: 1200, height: 630 }],
    url: 'https://www.anthonyfreay.com/bw',
  },
  twitter: {
    title: 'Black & White | Anthony Freay',
    description: 'A collection of black and white photography by Anthony Freay. Rich, timeless, and classic shots.',
    images: ['https://www.anthonyfreay.com/covers/bw_cover.jpg'],
  },
};

function BlackWhite() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Black & White Photography by Anthony Freay',
    description: 'A collection of black and white photography by Anthony Freay. Rich, timeless, and classic shots.',
    url: 'https://www.anthonyfreay.com/bw',
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
      <h1 className="sr-only">Black & White Photography</h1>
      <p className="sr-only">
        A collection of black and white photography by Anthony Freay, a NYC-based photographer.
        These timeless, high-contrast images capture concerts, street scenes, and candid moments
        across New York City and beyond.
      </p>
      <div className="max-w-full mx-auto my-2.5 flex-1">
        <ImageGallery images={imageData} />
      </div>
    </div>
  );
}

const imageData = withHd(bw);

export default BlackWhite;
