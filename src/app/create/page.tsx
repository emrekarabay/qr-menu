import { Metadata } from 'next';
import { CreateClient } from '@/features/menu-creator/CreateClient';
import tr from '@/data/locales-tr.json';

export const metadata: Metadata = {
  title: tr.creator.title + ' | QRMenu',
  description: tr.creator.subtitle,
};

export default function CreatePage() {
  return <CreateClient />;
}
