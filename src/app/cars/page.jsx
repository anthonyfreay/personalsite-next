import CarsClient from './CarsClient';

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
  return (
    <>
      <h1 className="sr-only">Automotive Photography</h1>
      <CarsClient />
    </>
  );
}
