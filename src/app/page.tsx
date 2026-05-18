import { Metadata } from 'next';
import { HomeClient } from '@/features/home/HomeClient';
import tr from '@/data/locales-tr.json';

/**
 * ÖĞRENME NOTU: Neden Server Component?
 * 1. SEO ve Metadata: Metadata API sadece Server Component'lerde çalışır. 
 *    generateMetadata ile dinamik veya statik SEO ayarları yapılır.
 * 2. Performans: Sayfanın iskeleti sunucuda hazırlanır, tarayıcıya daha az JS gönderilir.
 * 3. Best Practice: App Router mimarisinde sayfalar varsayılan olarak Server Component olmalıdır.
 */

export const metadata: Metadata = {
  title: tr.seo.home.title,
  description: tr.seo.home.description,
};

export default function Home() {
  return <HomeClient />;
}
