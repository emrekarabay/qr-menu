import { Metadata } from 'next';
import { StaticPageClient } from '@/features/static-pages/StaticPageClient';
import tr from '@/data/locales-tr.json';

export const metadata: Metadata = {
  title: tr.terms.title + ' | QRMenu',
};

export default function Terms() {
  return <StaticPageClient pageKey="terms" />;
}
