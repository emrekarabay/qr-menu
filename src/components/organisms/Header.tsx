'use client';

import { QrCode } from 'lucide-react';
import { ThemeToggle } from '@/components/molecules/ThemeToggle';
import { LanguageToggle } from '@/components/molecules/LanguageToggle';
import { useMenuStore } from '@/store/useMenuStore';
import { translations } from '@/lib/i18n';
import { useMounted } from '@/hooks/useMounted';
import Link from 'next/link';

export function Header() {
  const { language } = useMenuStore();
  const mounted = useMounted();
  const t = translations[language].nav;

  if (!mounted) return null;

  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
        {/* Logo Section */}
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <div className="bg-primary p-1.5 rounded-lg">
              <QrCode className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">QR<span className="text-primary">Menu</span></span>
          </Link>
        </div>

        {/* Navigation - Centered */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="/how-it-works" className="hover:text-foreground transition-colors">{t.howItWorks}</Link>
          <Link href="/features" className="hover:text-foreground transition-colors">{t.features}</Link>
        </nav>

        {/* Controls Section */}
        <div className="flex-1 flex items-center justify-end gap-3">
          <LanguageToggle />
          <ThemeToggle />
          <Link href="/create" className="hidden sm:block bg-foreground text-background px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
            {t.designMenu}
          </Link>
        </div>
      </div>
    </header>
  );
}
