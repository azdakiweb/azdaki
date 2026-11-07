import type { Metadata, Viewport } from 'next';
import { Noto_Sans_Georgian, Noto_Serif_Georgian } from 'next/font/google';
import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { isLocale, locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { resolveLocale, siteUrl, type LocaleParams } from '@/lib/page';
import '@/styles/globals.css';

const serif = Noto_Serif_Georgian({
  subsets: ['georgian', 'latin'],
  variable: '--font-serif',
  display: 'swap',
  fallback: ['Sylfaen', 'Georgia', 'serif'],
});
const sans = Noto_Sans_Georgian({
  subsets: ['georgian', 'latin'],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['Sylfaen', 'system-ui', 'sans-serif'],
});

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const viewport: Viewport = { themeColor: '#781F24' };

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : 'ka');
  return {
    metadataBase: new URL(siteUrl),
    title: { default: `${t.brand} | ${t.tagline}`, template: `%s | ${t.brand}` },
    description: t.slogan,
    openGraph: { siteName: t.brand, images: ['/og.jpg'], type: 'website' },
  };
}

export default async function LocaleLayout({ children, params }: LocaleParams & { children: ReactNode }) {
  const { locale, t } = await resolveLocale(params);
  return (
    <html lang={locale} className={`${serif.variable} ${sans.variable}`}>
      {/* Browser extensions add attributes to <body> before React loads. */}
      <body suppressHydrationWarning>
        <a href="#main" className="skip">
          {t.skip}
        </a>
        <Header locale={locale} t={t} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer locale={locale} t={t} />
      </body>
    </html>
  );
}
