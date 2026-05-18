import { Metadata } from 'next';
import { FeaturesClient } from '@/features/features-page/FeaturesClient';
import tr from '@/data/locales-tr.json';

export const metadata: Metadata = {
  title: tr.seo.features.title,
  description: tr.seo.features.description,
};

export default function Features() {
  return <FeaturesClient />;
}
