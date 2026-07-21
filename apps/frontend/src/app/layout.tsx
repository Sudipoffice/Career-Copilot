import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from '@/components/providers/providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: {
    default: 'Career Copilot AI',
    template: '%s | Career Copilot AI',
  },
  description:
    'AI-powered career preparation platform. Analyze resumes, match job descriptions, improve ATS scores, and prepare for interviews with personalized AI-generated questions and study plans.',
  keywords: ['career', 'resume', 'job search', 'interview preparation', 'AI', 'ATS'],
  authors: [{ name: 'Career Copilot AI' }],
  openGraph: {
    title: 'Career Copilot AI',
    description: 'Land your dream job with AI-powered career preparation',
    siteName: 'Career Copilot AI',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
