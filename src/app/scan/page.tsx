import { Metadata } from 'next';
import { ScanClient } from '@/features/qr-scanner/ScanClient';
import tr from '@/data/locales-tr.json';

export const metadata: Metadata = {
  title: tr.scanner.title + ' | QRMenu',
  description: tr.scanner.description,
};

export default function ScanPage() {
  return <ScanClient />;
}
