'use client';

import { PageLayout } from '@/components/organisms/PageLayout';
import { useMenuStore } from '@/store/useMenuStore';
import { translations } from '@/lib/i18n';

interface StaticPageClientProps {
  pageKey: 'privacy' | 'terms';
}

/**
 * ÖĞRENME NOTU: Reusable Client Components
 * Benzer yapıdaki sayfalar için ortak bir Client Component kullanarak
 * kod tekrarını önler ve bakımı kolaylaştırırız.
 */
export function StaticPageClient({ pageKey }: StaticPageClientProps) {
  const { language } = useMenuStore();
  const t = translations[language][pageKey];
  const common = translations[language].common;

  return (
    <PageLayout>
      <section className="flex-1 max-w-3xl mx-auto px-4 py-20 w-full">
        <h1 className="text-4xl font-bold mb-10">{t.title}</h1>
        <div className="premium-card p-10 prose prose-slate dark:prose-invert">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {t.content}
          </p>
          <p className="mt-6 text-muted-foreground">
            {common.dataBrowserNote}
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
