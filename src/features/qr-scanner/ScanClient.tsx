'use client';

import { PageLayout } from '@/components/organisms/PageLayout';
import { QRScanner } from '@/features/qr-scanner/QRScanner';
import { useMenuStore } from '@/store/useMenuStore';
import { translations } from '@/lib/i18n';

export function ScanClient() {
  const { language } = useMenuStore();
  const t = translations[language].scanner;

  return (
    <PageLayout>
      <div className="flex-1 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-muted-foreground">{t.description}</p>
        </div>
        <QRScanner />
      </div>
    </PageLayout>
  );
}
