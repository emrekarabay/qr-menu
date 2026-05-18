'use client';

import { Languages } from 'lucide-react';
import { useMenuStore } from '@/store/useMenuStore';

// Header'dan ayrıştırılmış bağımsız dil değiştirici atom
export function LanguageToggle() {
  const { language, setLanguage } = useMenuStore();

  return (
    <button
      onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-muted transition-colors text-sm font-semibold"
    >
      <Languages size={18} />
      <span className="uppercase">{language}</span>
    </button>
  );
}
