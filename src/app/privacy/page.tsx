import { Metadata } from 'next';
import { StaticPageClient } from '@/features/static-pages/StaticPageClient';
import tr from '@/data/locales-tr.json';

export const metadata: Metadata = {
  title: tr.privacy.title + ' | QRMenu',
};

export default function Privacy() {
  return <StaticPageClient pageKey="privacy" />;
}
