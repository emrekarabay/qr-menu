'use client';

import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { useMounted } from '@/hooks/useMounted';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

// Tüm iç sayfalarda tekrar eden Header + Footer sarmalayıcısını tek bileşene çekiyoruz
export function PageLayout({ children, className }: PageLayoutProps) {
  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <main className={`min-h-screen flex flex-col${className ? ` ${className}` : ''}`}>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
