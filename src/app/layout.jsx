import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL, DEFAULT_IMAGE_ABS } from '@/lib/constants';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_IMAGE_ABS,
        width: 1200,
        height: 630,
        alt: 'Anthony Freay — Photographer & Software Engineer',
      },
    ],
    siteName: 'Anthony Freay',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_IMAGE_ABS],
    creator: '@anthonyfreay',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon_io/favicon-512x512.png" />
        <link rel="icon" type="image/png" sizes="256x256" href="/favicon_io/favicon-256x256.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon_io/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/favicon_io/apple-touch-icon.png" />
        <link rel="stylesheet" href="https://use.typekit.net/waf4zxp.css" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#F5F5F5" />
      </head>
      <body className="bg-brand-light text-brand-text font-sans">
        <GoogleAnalytics gaId="G-5RYLFVDX71" />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
