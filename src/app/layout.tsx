import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/atoms/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // FOIT (flash of invisible text) önlemek için swap
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://qrmenu.app';

/**
 * ÖĞRENME NOTU: metadataBase neden zorunlu?
 * Next.js OG/Twitter kartlarında görseller için tam URL gerekir.
 * metadataBase olmadan '/og.png' gibi relative path'ler kırık görünür.
 * NEXT_PUBLIC_SITE_URL env değişkeni deploy platformunda (Vercel/Netlify) ayarlanmalıdır.
 */
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'QRMenu | Ücretsiz Dinamik QR Menü Oluşturucu',
    // Alt sayfalar "Özellikler | QRMenu" formatında görünür
    template: '%s | QRMenu',
  },
  description: 'İşletmeniz için saniyeler içinde dinamik QR menü oluşturun. Google Drive entegrasyonu ile menünüzü ücretsiz ve profesyonelce yönetin. Hesap açmadan, veri vermeden.',
  keywords: ['Dinamik QR Menü', 'QR Menü Oluştur', 'Ücretsiz QR Menü', 'Google Drive Menü Yönetimi', 'Restoran QR Menü', 'Dijital Menü'],
  authors: [{ name: 'Emre Karabay', url: 'https://github.com/emrekarabay' }],
  creator: 'Emre Karabay',

  // Arama motorlarına tam crawl izni
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph — LinkedIn, WhatsApp, Facebook paylaşım kartı
  // Görseli app/opengraph-image.tsx otomatik üretir ve buraya inject eder
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: 'en_US',
    url: BASE_URL,
    siteName: 'QRMenu',
    title: 'QRMenu | Ücretsiz Dinamik QR Menü Oluşturucu',
    description: 'Hesap açmadan, veri vermeden. Menünüzü oluşturun, Drive\'a yükleyin, QR kodunuzu alın.',
  },

  // Twitter/X paylaşım kartı
  twitter: {
    card: 'summary_large_image',
    title: 'QRMenu | Ücretsiz Dinamik QR Menü Oluşturucu',
    description: 'Hesap açmadan, veri vermeden. Menünüzü oluşturun, Drive\'a yükleyin, QR kodunuzu alın.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
