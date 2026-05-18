import { Metadata } from 'next';
import { HowItWorksClient } from '@/features/how-it-works/HowItWorksClient';
import tr from '@/data/locales-tr.json';

export const metadata: Metadata = {
  title: tr.seo.howItWorks.title,
  description: tr.seo.howItWorks.description,
};

export default function HowItWorks() {
  return <HowItWorksClient />;
}
