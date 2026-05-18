'use client';

import { QrCode } from 'lucide-react';
import { useMenuStore } from '@/store/useMenuStore';
import { translations } from '@/lib/i18n';
import Link from 'next/link';

export function Footer() {
  const { language } = useMenuStore();
  const t = translations[language].footer;
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-muted/30 py-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <QrCode className="text-white" size={20} />
          </div>
          <span className="text-lg font-bold tracking-tight">QRMenu</span>
        </Link>

        <p className="text-muted-foreground text-sm text-center md:text-left">
          © {year} <a href="https://github.com/emrekarabay" target="_blank" rel="noreferrer" className="font-black text-foreground hover:text-primary transition-colors">Emre Karabay</a>. {t.tagline}
        </p>

        <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/privacy" className="hover:text-foreground transition-colors">{t.privacy}</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">{t.terms}</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">{t.contact}</Link>
        </div>
      </div>
    </footer>
  );
}
