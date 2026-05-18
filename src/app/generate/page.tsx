import { Metadata } from 'next';
import { GenerateClient } from '@/features/qr-generator/GenerateClient';
import tr from '@/data/locales-tr.json';

export const metadata: Metadata = {
  title: tr.generator.title + ' | QRMenu',
  description: tr.generator.description,
};

export default function GeneratePage() {
  return <GenerateClient />;
}
