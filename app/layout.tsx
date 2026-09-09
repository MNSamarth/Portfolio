import type { Metadata } from 'next';
import { IBM_Plex_Mono, Instrument_Sans } from 'next/font/google';
import './globals.css';
import '../visuals.css';

const instrumentSans = Instrument_Sans({ variable: '--font-instrument', subsets: ['latin'], display: 'swap' });
const ibmPlexMono = IBM_Plex_Mono({ variable: '--font-plex-mono', subsets: ['latin'], weight: ['400', '500'], display: 'swap' });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Samarth Mandagere — Software Engineer',
  description: 'Software Engineer building backend systems and intelligent products. M.S. Computer Science at USC, graduating May 2027.',
  keywords: ['Samarth Mandagere', 'Software Engineer', 'Backend Engineer', 'AI Integration', 'USC'],
  authors: [{ name: 'Samarth Mandagere' }],
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Samarth Mandagere — Software Engineer',
    description: 'Backend systems · AI integration · product engineering.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Samarth Mandagere, Software Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samarth Mandagere — Software Engineer',
    description: 'Backend systems · AI integration · product engineering.',
    images: ['/og.png'],
  },
};

const themeScript = `
  document.documentElement.classList.add('js');
  try {
    const saved = localStorage.getItem('samarth-theme');
    document.documentElement.dataset.theme = saved === 'light' ? 'light' : 'dark';
  } catch (_) {
    document.documentElement.dataset.theme = 'dark';
  }
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className={`${instrumentSans.variable} ${ibmPlexMono.variable}`}>{children}</body>
    </html>
  );
}