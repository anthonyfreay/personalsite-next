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
  applicationName: 'Anthony Freay',
  authors: [{ name: 'Anthony Freay', url: SITE_URL }],
  creator: 'Anthony Freay',
  publisher: 'Anthony Freay',
  keywords: [
    'Anthony Freay',
    'NYC photographer',
    'New York photographer',
    'concert photography',
    'live music photography',
    'portrait photography',
    'event photography',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
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
        {/*
          Typekit is render-blocking and its faces ship as font-display:auto,
          which is why the navbar wordmark - not an image - was the LCP element
          at 5.4s in a production Lighthouse run. Preconnecting saves the DNS +
          TLS round trips to both hosts (~340ms measured). crossOrigin is
          required: the CSS pulls font files as CORS requests, and without it
          the browser opens a second, unusable connection.

          The remaining win is font-display: swap, which cannot be set from
          here - it is an @font-face descriptor, and ?display=swap is ignored by
          Typekit (verified). It has to be changed in the Adobe Fonts web
          project settings.
        */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
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
