import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

export const metadata = {
  title: 'Page Not Found | Anthony Freay',
  description: 'The page you are looking for could not be found.',
  robots: { index: false, follow: true },
};

const galleryRoutes = ROUTES.filter(
  (route) => route.path !== '/' && route.path !== '/work' && route.path !== '/contact'
);

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-20px py-25 min-h-[60vh]">
      <h1 className="text-64px font-bold">404</h1>
      <p className="text-20px mt-15px">This page could not be found.</p>
      <p className="mt-10px max-w-700px">
        The link may be out of date, or the page may have moved. You can browse the
        photography portfolio below, or head back to the homepage.
      </p>

      <div className="flex flex-wrap justify-center gap-6 mt-25px">
        <Link href="/" className="underline hover:text-accent-1 transition-colors">
          Home
        </Link>
        <Link href="/work" className="underline hover:text-accent-1 transition-colors">
          Work
        </Link>
        <Link href="/contact" className="underline hover:text-accent-1 transition-colors">
          Contact
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-15px">
        {galleryRoutes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className="hover:text-accent-1 transition-colors"
          >
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
